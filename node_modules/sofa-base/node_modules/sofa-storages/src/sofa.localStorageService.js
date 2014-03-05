'use strict';
/* global sofa */
/* global store */
/**
 * @name LocalStorageService
 * @namespace sofa.LocalStorageService
 *
 * @description
 * We just wrap store.js in a service here.
 */
sofa.define('sofa.LocalStorageService', function () {
    return store;
});
