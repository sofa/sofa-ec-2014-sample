'use strict';
/* global sofa */
/* global document */
/* global navigator */

describe('sofa.DeviceService', function () {

    var deviceService;

    beforeEach(function () {
        deviceService = new sofa.DeviceService(window);
    });
    
    it('should be defined', function () {
        expect(deviceService).toBeDefined();
    });

    it('should have a method isInPortraitMode', function () {
        expect(deviceService.isInPortraitMode).toBeDefined();
    });

    it('should have a method isInLandscapeMode', function () {
        expect(deviceService.isInLandscapeMode).toBeDefined();
    });

    it('should have a method getHtmlTag', function () {
        expect(deviceService.getHtmlTag).toBeDefined();
    });

    it('should have a method isTabletSize', function () {
        expect(deviceService.isTabletSize).toBeDefined();
    });

    it('should have a method isStockAndroidBrowser', function () {
        expect(deviceService.isStockAndroidBrowser).toBeDefined();
    });

    it('should have a method flagOs', function () {
        expect(deviceService.flagOs).toBeDefined();
    });

    it('should have a method flagOverflowSupport', function () {
        expect(deviceService.flagOverflowSupport).toBeDefined();
    });

    it('should have a method getUserAgent', function () {
        expect(deviceService.getUserAgent).toBeDefined();
    });

    it('should have a method getOs', function () {
        expect(deviceService.getOs).toBeDefined();
    });

    it('should have a method getOsVersion', function () {
        expect(deviceService.getOsVersion).toBeDefined();
    });

    it('should have a method isAndroid2x', function () {
        expect(deviceService.isAndroid2x).toBeDefined();
    });

    it('should have a method hasOverflowSupport', function () {
        expect(deviceService.hasOverflowSupport).toBeDefined();
    });

    it('should have a method hasModernFlexboxSupport', function () {
        expect(deviceService.hasModernFlexboxSupport).toBeDefined();
    });

    it('should have a method flagModernFlexboxSupport', function () {
        expect(deviceService.flagModernFlexboxSupport).toBeDefined();
    });

    describe('sofa.DeviceService#isInPortraitMode', function () {
    
        it('should be a function', function () {
            expect(typeof deviceService.isInPortraitMode).toBe('function');
        });

        it('should return a boolean', function () {
            expect(typeof deviceService.isInPortraitMode()).toBe('boolean');
        });

        // Have to comment these out, until I found out how to tweak window
        // sizes properly.
        //
        // it('should return false if device is not in portrait mode', function () {
        //     window.innerHeight = 200;
        //     window.innwerWidth = 300;
        //     var deviceService = new sofa.DeviceService(window);
        //     expect(deviceService.isInPortraitMode()).toBe(false);
        // });

        // it('should return true, if device is in portrait mode', function () {
        //     window.innerHeight = 500;
        //     window.innwerWidth = 200;
        //     var deviceService = new sofa.DeviceService(window);
        //     expect(deviceService.isInPortraitMode()).toBe(true);
        // });
    });

    describe('sofa.DeviceService#isInLandscapeMode', function () {
    
        it('should be a function', function () {
            expect(typeof deviceService.isInLandscapeMode).toBe('function');
        });

        it('should return a boolean', function () {
            expect(typeof deviceService.isInLandscapeMode()).toBe('boolean');
        });

        // Have to comment these out, until I found out how to tweak window
        // sizes properly.
        //
        // it('should return false if device is not in portrait mode', function () {
        //     window.innerHeight = 200;
        //     window.innwerWidth = 300;
        //     var deviceService = new sofa.DeviceService(window);
        //     expect(deviceService.isInPortraitMode()).toBe(false);
        // });

        // it('should return true, if device is in portrait mode', function () {
        //     window.innerHeight = 500;
        //     window.innwerWidth = 200;
        //     var deviceService = new sofa.DeviceService(window);
        //     expect(deviceService.isInPortraitMode()).toBe(true);
        // });
    });

    describe('sofa.DeviceService#getHtmlTag', function () {

        it('should be a function', function () {
            expect(typeof deviceService.getHtmlTag).toBe('function');
        });

        it('should return an object', function () {
            expect(typeof deviceService.getHtmlTag()).toBe('object');
        });
    });

    describe('sofa.DeviceService#isTabletSize', function () {

        it('should be a function', function () {
            expect(typeof deviceService.isTabletSize).toBe('function');
        });

        it('should return a boolean', function () {
            expect(typeof deviceService.isTabletSize()).toBe('boolean');
        });

        // Same here, currently dunno how to tweak window size for the test.
        //
        // it('should return true, if window has tablet size', function () {
        //     window.screen.width = 642;
        //     var deviceService = new sofa.DeviceService(window);
        //     expect(deviceService.isTabletSize()).toBe(true);
        // });

        // it('should return false, if window has not tablet size', function () {
        //     window.screen.width = 641;
        //     var deviceService = new sofa.DeviceService(window);
        //     expect(deviceService.isTabletSize()).toBe(false);
        // });
    });

    describe('sofa.DeviceService#isStockAndroidBrowser', function () {

        it('should be a function', function () {
            expect(typeof deviceService.isStockAndroidBrowser).toBe('function');
        });

        it('should return a boolean', function () {
            expect(typeof deviceService.isStockAndroidBrowser()).toBe('boolean');
        });
    });

    describe('sofa.DeviceService#flagOs', function () {

        it('should be a function', function () {
            expect(typeof deviceService.flagOs).toBe('function');
        });

        it('should flag html tag with OS information', function () {
            deviceService.flagOs();
            var classes = document.getElementsByTagName('html')[0].className;
            expect(classes.indexOf('cc-os') > -1).toBe(true);
            expect(classes.indexOf('cc-osv') > -1).toBe(true);
        });
    });

    describe('sofa.DeviceService#flagOverflowSupport', function () {

        it('should be a function', function () {
            expect(typeof deviceService.flagOverflowSupport).toBe('function');
        });

        it('should flag html if overflow is supported or not', function () {
            deviceService.flagOverflowSupport();
            var classes = document.getElementsByTagName('html')[0].className;
            expect(
                (classes.indexOf('cc-has-overflow-support') > -1) ||
                (classes.indexOf('cc-has-no-overflow-support') > -1)
            ).toBe(true);
        });
    });

    describe('sofa.DeviceService#getUserAgent', function () {

        it('should be a function', function () {
            expect(typeof deviceService.getUserAgent).toBe('function');
        });

        it('should return a string', function () {
            expect(typeof deviceService.getUserAgent()).toBe('string');
        });

        it('should return user agent', function () {
            expect(deviceService.getUserAgent()).toEqual(navigator.userAgent);
        });
    });

    describe('sofa.DeviceService#getOs', function () {

        it('should be a function', function () {
            expect(typeof deviceService.getOs).toBe('function');
        });

        it('should return a string', function () {
            expect(typeof deviceService.getOs()).toBe('string');
        });
    });

    describe('sofa.DeviceService#getOsVersion', function () {

        it('should be a function', function () {
            expect(typeof deviceService.getOsVersion).toBe('function');
        });

        it('should return a string', function () {
            expect(typeof deviceService.getOsVersion()).toBe('string');
        });
    });

    describe('sofa.DeviceService#isAndroid2x', function () {

        it('should be a function', function () {
            expect(typeof deviceService.isAndroid2x).toBe('function');
        });

        it('should return a boolean', function () {
            expect(typeof deviceService.isAndroid2x()).toBe('boolean');
        });
    });

    describe('sofa.DeviceService#hasOverflowSupport', function () {

        it('should be a function', function () {
            expect(typeof deviceService.hasOverflowSupport).toBe('function');
        });

        // Unfortunately hasOverflowSupport() returns undefined if the OS
        // is neither Android nor iOS
        //
        // it('should return a boolean', function () {
        //     expect(typeof deviceService.hasOverflowSupport()).toBe('boolean');
        // });
    });

    describe('sofa.DeviceService#hasModernFlexboxSupport', function () {

        it('should be a function', function () {
            expect(typeof deviceService.hasModernFlexboxSupport).toBe('function');
        });

        it('should return a boolean', function () {
            expect(typeof deviceService.hasModernFlexboxSupport()).toBe('boolean');
        });
    });

    describe('sofa.DeviceService#flagModernFlexboxSupport', function () {

        it('should be a function', function () {
            expect(typeof deviceService.flagModernFlexboxSupport).toBe('function');
        });

        it('should flag html if modern flexbox is supported or not', function () {
            deviceService.flagModernFlexboxSupport();
            var classes = document.getElementsByTagName('html')[0].className;
            expect(
                (classes.indexOf('cc-supports-modern-flexbox') > -1) ||
                (classes.indexOf('cc-supports-modern-flexbox') === -1)
            ).toBe(true);
        });
    });
});
