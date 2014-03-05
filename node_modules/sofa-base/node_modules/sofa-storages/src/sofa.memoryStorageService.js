'use strict';
/* global sofa */
/**
 * @name MemoryStorageService
 * @namespace sofa.MemoryStorageService
 *
 * @description
 * Simple memory storage service. Provides methods to get and set values in form
 * of simple key - value pairs.
 */
sofa.define('sofa.MemoryStorageService', function () {

    var _storage = {};

    /**
     * @method set
     * @memberof sofa.MemoryStorageService
     *
     * @description
     * Sets a value by a given id.
     *
     * @param {string} id Identifier
     * @param {object} data Any kind of data to store under given id.
     */
    var set = function (id, data) {
        _storage[id] = data;
    };

    /**
     * @method get
     * @memberof sofa.MemoryStorageService
     *
     * @description
     * Gets a value by a given id.
     *
     * @param {string} id Identifier
     *
     * @return {object} Stored data.
     */
    var get = function (id) {
        return _storage[id];
    };

    /**
     * @method remove
     * @memberof sofa.MemoryStorageService
     *
     * @description
     * Removes a value by a given id.
     *
     * @param {string} id Identifier
     */
    var remove = function (id) {
        delete _storage[id];
    };

    /**
     * @method clear
     * @memberof sofa.MemoryStorageService
     *
     * @description
     * Clear memory storage.
     */
    var clear = function () {
        _storage = {};
    };

    return {
        set: set,
        get: get,
        remove: remove,
        clear: clear
    };
});
