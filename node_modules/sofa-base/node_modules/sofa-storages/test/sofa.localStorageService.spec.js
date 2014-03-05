'use strict';
/* global sofa */
describe('sofa.storages', function () {

    describe('sofa.LocalStorageService', function () {

        var localStorageService;

        beforeEach(function () {
            localStorageService = new sofa.LocalStorageService();
        });

        it('should be defined', function () {
            expect(localStorageService).toBeDefined();
        });

        it('should be an object', function () {
            expect(typeof localStorageService).toBe('object');
        });

        it('should have a method set', function () {
            expect(localStorageService.set).toBeDefined();
        });

        it('should have a method get', function () {
            expect(localStorageService.get).toBeDefined();
        });

        it('should have a method remove', function () {
            expect(localStorageService.remove).toBeDefined();
        });

        it('should have a method clear', function () {
            expect(localStorageService.clear).toBeDefined();
        });

        describe('sofa.LocalStorageService#set', function () {

            it('should be a function', function () {
                expect(typeof localStorageService.set).toBe('function');
            });

            it('should set a value by given id', function () {
                localStorageService.set('foo', 'bar');
                expect(localStorageService.get('foo')).toEqual('bar');
            });
        });

        describe('sofa.LocalStorageService#get', function () {

            it('should be a function', function () {
                expect(typeof localStorageService.get).toBe('function');
            });

            it('should get a value by given id', function () {
                localStorageService.set('foo', 'bar');
                expect(localStorageService.get('foo')).toEqual('bar');
            });
        });

        describe('sofa.LocalStorageService#remove', function () {

            it('should be a function', function () {
                expect(typeof localStorageService.remove).toBe('function');
            });

            it('should remove value by given id', function () {
                localStorageService.set('foo', 'bar');
                expect(localStorageService.get('foo')).toEqual('bar');
                localStorageService.remove('foo');
                expect(localStorageService.get('foo')).toBeUndefined();
            });
        });

        describe('sofa.LocalStorageService#clear', function () {

            it('should be a function', function () {
                expect(typeof localStorageService.clear).toBe('function');
            });

            it('shoul clear storage', function () {
                localStorageService.set('foo', 'bar');
                expect(localStorageService.get('foo')).toEqual('bar');
                localStorageService.clear();
                expect(localStorageService.get('foo')).toBeUndefined();
            });
        });
    });
});
