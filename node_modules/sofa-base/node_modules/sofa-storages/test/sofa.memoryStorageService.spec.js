'use strict';
/* global sofa */
describe('sofa.storages', function () {

    describe('sofa.MemoryStorageService', function () {

        var memoryStorageService;

        beforeEach(function () {
            memoryStorageService = new sofa.MemoryStorageService();
        });

        it('should be defined', function () {
            expect(memoryStorageService).toBeDefined();
        });

        it('should be an object', function () {
            expect(typeof memoryStorageService).toBe('object');
        });

        it('should have a method set', function () {
            expect(memoryStorageService.set).toBeDefined();
        });

        it('should have a method get', function () {
            expect(memoryStorageService.get).toBeDefined();
        });

        it('should have a method remove', function () {
            expect(memoryStorageService.remove).toBeDefined();
        });

        it('should have a method clear', function () {
            expect(memoryStorageService.clear).toBeDefined();
        });

        describe('sofa.MemoryStorageService#set', function () {

            it('should be a function', function () {
                expect(typeof memoryStorageService.set).toBe('function');
            });

            it('should set a value by given id', function () {
                memoryStorageService.set('foo', 'bar');
                expect(memoryStorageService.get('foo')).toEqual('bar');
            });
        });

        describe('sofa.MemoryStorageService#get', function () {

            it('should be a function', function () {
                expect(typeof memoryStorageService.get).toBe('function');
            });

            it('should get a value by given id', function () {
                memoryStorageService.set('foo', 'bar');
                expect(memoryStorageService.get('foo')).toEqual('bar');
            });
        });

        describe('sofa.MemoryStorageService#remove', function () {

            it('should be a function', function () {
                expect(typeof memoryStorageService.remove).toBe('function');
            });

            it('should remove value by given id', function () {
                memoryStorageService.set('foo', 'bar');
                expect(memoryStorageService.get('foo')).toEqual('bar');
                memoryStorageService.remove('foo');
                expect(memoryStorageService.get('foo')).toBeUndefined();
            });
        });

        describe('sofa.MemoryStorageService#clear', function () {

            it('should be a function', function () {
                expect(typeof memoryStorageService.clear).toBe('function');
            });

            it('shoul clear storage', function () {
                memoryStorageService.set('foo', 'bar');
                expect(memoryStorageService.get('foo')).toEqual('bar');
                memoryStorageService.clear();
                expect(memoryStorageService.get('foo')).toBeUndefined();
            });
        });
    });
});
