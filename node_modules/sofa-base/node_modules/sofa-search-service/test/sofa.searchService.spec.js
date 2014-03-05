'use strict';
/* global AsyncSpec */

describe('sofa.SearchService', function () {

    var searchService, searchUrl, storeCode, searchFields, configService, q;

    var createHttpService = function () {
        return new cc.mocks.httpService(new cc.QService());
    };

    beforeEach(function () {
        configService = new sofa.ConfigService();
        q = new sofa.QService();

        searchUrl = configService.get('searchUrl') + '?callback=JSON_CALLBACK&len=100';
        storeCode = configService.get('storeCode');
        searchFields = 'text, categoryUrlKey, categoryName, productUrlKey, productImageUrl';

        sofa.Config.searchDebounceMs = 50;
        searchService = new sofa.SearchService(configService, createHttpService(), q);
    });

    it('should be defined', function () {
        expect(searchService).toBeDefined();
    });

    it('should be an object', function () {
        expect(typeof searchService).toBe('object');
    });

    it('should have a method search', function () {
        expect(searchService.search).toBeDefined();
    });

    describe('sofa.SearchService#search', function () {

        it('should be a function', function () {
            expect(typeof searchService.search).toBe('function');
        });

        describe('async tests', function () {

            var async = new AsyncSpec(this),
                httpService;

            beforeEach(function () {
                httpService = createHttpService();
                searchService = new sofa.SearchService(configService, httpService, q);
            });

            async.it('should normalize umlauts', function (done) {

                var umlauts = 'áàâäúùûüóòôöéèêëß';
                var normalizedUmlauts = 'aaaauuuuooooeeeess';
                var reversedNormalizedUmlauts = 'sseeeeoooouuuuaaaa';

                var searchCommand = '(text:' + normalizedUmlauts + '* OR reverse_text:' + reversedNormalizedUmlauts + '*) AND storeCode:' + configService.get('storeCode');

                httpService.when('JSONP', searchUrl, {
                    q: searchCommand,
                    fetch: searchFields
                }).respond({
                    results: [
                        'car',
                        'carmaker'
                    ]
                });

                searchService
                    .search(umlauts)
                    .then(function (response) {
                        expect(response).toBeDefined();
                        done();
                    });
            });

            async.it('should call #search() 3 times but only make 2 requests which respond out of order', function (done) {
                /*
                Ok, this test is scary so let's break down what it does.

                It makes three calls to the searchService in a very specific order and timing.

                0ms  : searchService.search('ca');
                0ms  : searchService.search('car');
                50ms : searchService.search('carm');

                The first call with the searchString 'ca' should not even hit the backend
                as we debounce calls by a configureable time span.

                The second and the third call DO hit the backend. However, the call for
                'car' takes longer than the call for 'carm' which would normally result
                in showing the user results for 'car' even so 'carm' was what he had on
                the screen when he finished typing. But our searchService knows how to
                deal with out-of-order-responses. This test proofs everything.
                */

                //the number of actual requests made against the backend
                var EXPECTED_OUTGOING_REQUESTS_COUNT = 2;
                //the number of requests returned to the user code by the searchService
                var EXPECTED_RETURNED_REQUESTS = 1;

                //that's the response for the first request, it takes longer then the second
                //so that it arrives *after* the second request
                httpService.when('JSONP', searchUrl, { q: '(text:car* OR reverse_text:rac*) AND storeCode:' + storeCode, fetch: searchFields }).respond({
                    results: [
                        'car',
                        'carmaker'
                    ]
                }, 150);

                //the response for the second request returns much quicker.
                httpService.when('JSONP', searchUrl, { q: '(text:carm* OR reverse_text:mrac*) AND storeCode:' + storeCode, fetch: searchFields }).respond({
                    results: [
                        'carmaker'
                    ]
                }, 50);

                var handledRequests = 0;
                //let's call this request zero because it will never hit the backend since searchService.search()
                //internally debounces calls by a configured time span.
                searchService.search('ca');

                //that's the first real request that hit's the backend
                searchService
                    .search('car')
                    .then(function () {
                        //this should not happen because the request for 'car' should
                        //be cancelled out by the request for 'carm'
                        handledRequests++;
                    });

                //that's the second request. It needs to run x ms after the last call, otherwise it
                //would directly cancel out the previous so that the previous would not even hit the backend
                setTimeout(function () {
                    searchService
                        .search('carm')
                        .then(function (response) {
                            handledRequests++;
                            expect(response).toBeDefined();
                            var results = response.data.results;
                            expect(results).toBeDefined();
                            expect(results[0]).toEqual('carmaker');
                        });
                }, 50);

                setTimeout(function () {
                    expect(handledRequests).toEqual(EXPECTED_RETURNED_REQUESTS);
                    expect(httpService.getRequestQueue().length).toEqual(EXPECTED_OUTGOING_REQUESTS_COUNT);

                    var httpCallParams = httpService.getLastCallParams();
                    expect(httpCallParams.url).toEqual(searchUrl);
                    done();
                }, 250);
            });

            async.it('calls #search 2 times and also makes 2 and also makes 2 request to the search backend', function (done) {

                /*
                In this case the second request does not cancel out the first one because the first one is long
                finished. So this test is basically just proving that we can use the searchService.search() method
                multiple times on it's own.
                */

                //the number of actual requests made against the backend
                var EXPECTED_OUTGOING_REQUESTS_COUNT = 2;
                //the number of requests returned to the user code by the searchService
                var EXPECTED_RETURNED_REQUESTS = 2;

                httpService.when('JSONP', searchUrl, { q: '(text:car* OR reverse_text:rac*) AND storeCode:' + storeCode, fetch: searchFields }).respond({
                    results: [
                        'car',
                        'carmaker'
                    ]
                }, 25);

                httpService.when('JSONP', searchUrl, { q: '(text:carm* OR reverse_text:mrac*) AND storeCode:' + storeCode, fetch: searchFields }).respond({
                    results: [
                        'carmaker'
                    ]
                }, 25);

                var handledRequests = 0;

                //that's the first real request that hit's the backend
                searchService
                    .search('car')
                    .then(function (response) {
                        //this should not happen because the request for 'car' should
                        //be cancelled out by the request for 'carm'
                        handledRequests++;
                        expect(response).toBeDefined();
                        var results = response.data.results;
                        expect(results).toBeDefined();
                        expect(results[0]).toEqual('car');
                        expect(results[1]).toEqual('carmaker');
                    });

                setTimeout(function () {
                    searchService
                        .search('carm')
                        .then(function (response) {
                            handledRequests++;
                            expect(response).toBeDefined();
                            var results = response.data.results;
                            expect(results).toBeDefined();
                            expect(results[0]).toEqual('carmaker');
                        });
                }, 100);

                setTimeout(function () {
                    expect(handledRequests).toEqual(EXPECTED_RETURNED_REQUESTS);
                    expect(httpService.getRequestQueue().length).toEqual(EXPECTED_OUTGOING_REQUESTS_COUNT);

                    var httpCallParams = httpService.getLastCallParams();
                    expect(httpCallParams.url).toEqual(searchUrl);
                    done();
                }, 250);
            });

            async.it('should group responses by given grouping definition', function (done) {

                var searchString = 'f';
                var searchCommand = '(text:' + searchString + '* OR reverse_text:' + searchString + '*) AND storeCode:' + configService.get('storeCode');

                httpService.when('JSONP', searchUrl, { q: searchCommand, fetch: searchFields }).respond({
                    results: [
                        {
                            categoryName: 'A',
                            categoryUrlKey: '_A',
                            text: 'Product of A 1'
                        },
                        {
                            categoryName: 'B',
                            categoryUrlKey: '_B',
                            text: 'Product of B 1'
                        },
                        {
                            categoryName: 'A',
                            categoryUrlKey: '_A',
                            text: 'Product of A 2'
                        }
                    ]
                });

                searchService
                    .search(searchString, { groupKey: 'categoryUrlKey', groupText: 'categoryName'})
                    .then(function (response) {
                        expect(response).toBeDefined();
                        var results = response.data.results;
                        var groupedResults = response.data.groupedResults;
                        expect(results).toBeDefined();
                        expect(results[0].text).toEqual('Product of A 1');
                        expect(results[1].text).toEqual('Product of B 1');

                        expect(groupedResults[0].groupKey).toEqual('_A');
                        expect(groupedResults[1].groupKey).toEqual('_B');

                        expect(groupedResults[0].groupText).toEqual('A');
                        expect(groupedResults[1].groupText).toEqual('B');

                        expect(groupedResults[0].items.length).toEqual(2);
                        expect(groupedResults[1].items.length).toEqual(1);
                        done();
                    });
            });
        });
    });
});
