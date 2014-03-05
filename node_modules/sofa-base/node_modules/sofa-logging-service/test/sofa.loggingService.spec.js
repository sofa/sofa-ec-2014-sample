'use strict';
/* global sofa */

describe('sofa.loggingService', function () {

    var loggingService;

    beforeEach(function () {
        loggingService = new sofa.LoggingService(new sofa.ConfigService());
    });

    it('should be defined', function () {
        expect(loggingService).toBeDefined();
    });

    it('should be an object', function () {
        expect(typeof loggingService).toBe('object');
    });

    it('should have a method info', function () {
        expect(loggingService.info).toBeDefined();
    });

    it('should have a method log', function () {
        expect(loggingService.log).toBeDefined();
    });

    it('should have a method warn', function () {
        expect(loggingService.warn).toBeDefined();
    });

    it('should have a method error', function () {
        expect(loggingService.error).toBeDefined();
    });

    describe('sofa.LoggingService#info', function () {
        
        it('should be a function', function () {
            expect(typeof loggingService.info).toBe('function');
        });

        it('should log via console.info', function () {
            spyOn(console, 'info');
            loggingService.info('foo');
            expect(console.info).toHaveBeenCalled();
        });

        it('should log the given message', function () {
            spyOn(console, 'info');
            loggingService.info('foo');
            expect(console.info).toHaveBeenCalledWith('foo');
        });
    });

    describe('sofa.LoggingService#log', function () {

        it('should be a function', function () {
            expect(typeof loggingService.log).toBe('function');
        });

        it('should log via console.log', function () {
            spyOn(console, 'log');
            loggingService.log('foo');
            expect(console.log).toHaveBeenCalled();
        });

        it('should log the given message', function () {
            spyOn(console, 'log');
            loggingService.log('foo');
            expect(console.log).toHaveBeenCalledWith('foo');
        });
    });

    describe('sofa.LoggingService#warn', function () {

        it('should be a function', function () {
            expect(typeof loggingService.warn).toBe('function');
        });

        it('should log via console.warn', function () {
            spyOn(console, 'warn');
            loggingService.warn('foo');
            expect(console.warn).toHaveBeenCalled();
        });

        it('should log the given message', function () {
            spyOn(console, 'warn');
            loggingService.warn('foo');
            expect(console.warn).toHaveBeenCalledWith('foo');
        });
    });

    describe('sofa.LoggingService#error', function () {

        it('should be a function', function () {
            expect(typeof loggingService.error).toBe('function');
        });

        it('should log via console.error', function () {
            spyOn(console, 'error');
            loggingService.error('foo');
            expect(console.error).toHaveBeenCalled();
        });

        it('should log the given message', function () {
            spyOn(console, 'error');
            loggingService.error('foo');
            expect(console.error).toHaveBeenCalledWith('foo');
        });
    });
});
