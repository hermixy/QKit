/*******************************************************************************
*                                                                              *
*  Map class implementation.                                                   *
*                                                                              *
*  Copyright (C) 2013 Kirill Chuvilin.                                         *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   *
*                                                                              *
*  This file is a part of the QKit project.                                    *
*  https://github.com/QKit/QKit                                                *
*                                                                              *
*  $QT_BEGIN_LICENSE:LGPL$                                                     *
*                                                                              *
*  GNU Lesser General Public License Usage                                     *
*  This file may be used under the terms of the GNU Lesser General Public      *
*  License version 3.0 as published by the Free Software Foundation and        *
*  appearing in the file LICENSE.LGPL included in the packaging of this file.  *
*  Please review the following information to ensure the GNU Lesser General    *
*  Public License version 3.0 requirements will be met:                        *
*  http://www.gnu.org/licenses/old-licenses/lgpl.html.                         *
*                                                                              *
*  GNU General Public License Usage                                            *
*  Alternatively, this file may be used under the terms of the GNU General     *
*  Public License version 3.0 as published by the Free Software Foundation     *
*  and appearing in the file LICENSE.GPL included in the packaging of this     *
*  file. Please review the following information to ensure the GNU General     *
*  Public License version 3.0 requirements will be met:                        *
*  http://www.gnu.org/copyleft/gpl.html.                                       *
*                                                                              *
*  This file is distributed in the hope that it will be useful, but WITHOUT    *
*  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or       *
*  FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for    *
*  more details.                                                               *
*                                                                              *
*  $QT_END_LICENSE$                                                            *
*                                                                              *
*******************************************************************************/

/*!
 * \brief Map class.
 */
/*!
 * Map()
 * \brief Construct an empty map.
 */
/*!
 * Map(map)
 * \brief Construct a copy of map.
 * \param map the map to copy
 */
function Map() {
    if (arguments[0] instanceof Map) { // if Map(map)
        if (!(this instanceof Map)) return new Map(arguments[0]); // create new object if function was called without 'new' operator
        Map.superClass.apply(this); // super class constructor
        this.__qkit__data = {}; // internal hash object
        for (var key in arguments[0].__qkit__data) { // for all keys in map
            this.__qkit__data[key] = arguments[0].__qkit__data[key].slice(0); // copy values array
        }
        this.__qkit__size = arguments[0].__qkit__size; // amount of objects
    } else { // if Map()
        if (!(this instanceof Map)) return new Map(); // create new object if function was called without 'new' operator
        Map.superClass.apply(this); // super class constructor
        this.__qkit__data = {}; // internal hash object
        this.__qkit__size = 0; // number of (key, value) pairs
    }
}
Map.inheritFrom(Object); // super class


/*!
 * \brief Remove all items from the map.
 */
Map.prototype.clear = function() {
    this.__qkit__data = {}; // clear data
    this.__qkit__size = 0; // reset size
}


/*!
 * \brief Check a key in the map.
 * \return true if the map contains an item with the given key, false otherwise
 * \param key the key to check
 */
Map.prototype.contains = function(key) {
    if (key === undefined) return false; // return if key is undefined
    return this.__qkit__data[key] !== undefined;
}


/*!
 * \brief Get items count.
 * \return the number of items associated with key
 * \param key the key items associated with (in undefined all items will be count)
 */
Map.prototype.count = function(key) {
    if (key === undefined) return this.__qkit__size; // return all items number if key is undefined
    var keyValues = this.__qkit__data[key]; // array of values associated with the key
    if (keyValues === undefined) return 0; // return if there are no items associated with the key
    return keyValues.length; // return items array length
}


/*!
 * \brief Executes a provided function once per vector element.
 * \param callback function to execute for each element - function(key, value, map)
 * \param thisArg object to use as this when executing callback
 */
Map.prototype.forEach = function(callback, thisArg) {
    var keys = []; // array of keys
    var values = []; // array of values arrays
    var key; // key iterator
    for (key in this.__qkit__data) { // for all keys
        keys.push(key); // add the key
        values.push(this.__qkit__data[key].slice(0)); // add a copy of the values array
    }
    var nKeys = keys.length; // number of keys
    for (var iKey =0; iKey < nKeys; iKey++) { // for all keys
        key = keys[iKey]; // key
        var keyValues = values[iKey]; // array of values associated with the key
        var nValues = keyValues.length; // number of values associater with the key
        for (var iValue = 0; iValue < nValues; iValue++) { // for all values
            callback.apply(thisArg, [key, keyValues[iValue], this]); // apply callback function
        }
    }
}


/*!
 * \brief Insert an item with the given key and the given value.
 *   If there is already an item with the key, that item's value is replaced with value.
 *   If there are multiple items with the key, the most recently inserted item's value is replaced with value.
 * \param key the key
 * \param value the value to insert
 */
Map.prototype.insert = function(key, value) {
    if (key === undefined) return; // return if key is undefined
    if (value === undefined) value = null; // default value
    if (this.__qkit__data[key] === undefined) { // if there are no items associated with the key
        this.__qkit__data[key] = [value]; // create new values array
        this.__qkit__size++; // increase the size
    } else { // if there are items associated with the key
        this.__qkit__data[key][this.__qkit__data[key].length - 1] = value; // replace the most recently inserted value
    }
}


/*!
 * \brief Insert an item with the given key and the given value.
 *   If there is already an item with the same key in the map, this function will simply create a new one.
 * \param key the key
 * \param value the value to insert
 */
Map.prototype.insertMulti = function(key, value) {
    if (key === undefined) return; // return if key is undefined
    if (value === undefined) value = null; // default value
    if (this.__qkit__data[key] === undefined) { // if there are no items associated with the key
        this.__qkit__data[key] = [value]; // create new values array
    } else { // if there are items associated with the key
        this.__qkit__data[key].push(value); // add new value to values array
    }
    this.__qkit__size++; // increase the size
}


/*!
 * \brief Test the map for emptiness.
 * \return true if the map contains no elements, false otherwise
 */
Map.prototype.isEmpty = function() { return this.__qkit__size === 0; }


/*!
 * \brief Get a key associated with the given value.
 * \return the first key with the given value or undefined if the map contains no item with the given value
 * \param value the value to search
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
Map.prototype.key = function(value, compareFunction) {
    if (value === undefined) return undefined; // return if value is undefined
    if (compareFunction === undefined) compareFunction = function(value1, value2) { return value1 === value2; } // use strict equality if compare function is undefined
    for (var key in this.__qkit__data) { // for all keys
        var keyValues = this.__qkit__data[key]; // array of values associated with the key
        var iValue = keyValues.length; // value iterator
        while (iValue--) if (compareFunction(keyValues[iValue], value)) return key; // return the key if its values array contains the value
    }
    return undefined; // no key was found
}


/*!
 * \brief Get keys associated with the given value.
 *   Keys that occur multiple times in the map also occur multiple times in the list.
 * \return an instance of Array with keys
 * \param value the value to search (in undefined all keys will be added)
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
Map.prototype.keys = function(value, compareFunction) {
    var keys = []; // array with keys
    if (compareFunction === undefined) compareFunction = function(value1, value2) { return value1 === value2; } // use strict equality if compare function is undefined
    for (var key in this.__qkit__data) { // for all keys
        var keyValues = this.__qkit__data[key]; // array of values associated with the key
        var iValue = keyValues.length; // value iterator
        if (value === undefined) { // if value is undefined
            while (iValue--) keys.push(key); // add the key for each value
        } else { // if value is defined
            while (iValue--) if (compareFunction(keyValues[iValue], value)) keys.push(key); // add the key if its values array contains the value
        }
    }
    return keys;
}


/*!
 * \brief Remove all the items that have the given key from the map.
 * \return the number of items removed
 * \param key the key of items to remove
 */
Map.prototype.remove = function(key) {
    if (key === undefined) return 0; // return if key is undefined
    var keyValues = this.__qkit__data[key]; // array of values associated with the key
    if (keyValues === undefined) return 0; // return if this map doesn't contain the key
    var count = keyValues.lenght; // count of items to be removed
    delete this.__qkit__data[key]; // remove values from this map
    this.__qkit__size -= count; // decrease the size
    return count;
}


/*!
 * \brief Get the map size.
 * \return the number of (key, value) pairs in the map
 */
Map.prototype.size = function() { return this.__qkit__size; }


/*!
 * \brief Swap other map with this map.
 * \param map the map to swap with
 */
Map.prototype.swap = function(map) {
    if (!(map instanceof Map)) return; // return if type is not valid
    var temp = this.__qkit__data; // backup this data
    this.__qkit__data = map.__qkit__data; // update this data
    map.__qkit__data = temp; // update map data
    temp = this.__qkit__size; // backup this size
    this.__qkit__size = map.__qkit__size; // update this size
    map.__qkit__size = temp; // update map size
}


/*!
 * \brief Removes the item with the given key from the map and returns the value associated with it.
 *   If the item does not exist in the map, the function returns undefined.
 *   If there are multiple items for key in the map, only the most recently inserted one is removed and returned.
 * \param key the key of item to remove
 */
Map.prototype.take = function(key) {
    if (key === undefined) return undefined; // return if key is undefined
    if (this.__qkit__data[key] === undefined) return undefined; // return if key is undefined
    this.__qkit__size--; // decrease the size
    if (this.__qkit__data[key].length > 1) { // if values array contains more than one value
        return this.__qkit__data[key].pop(); // return popped value
    } else { // if values array contains only one value
        var value = this.__qkit__data[key][0]; // the only value of array
        delete this.__qkit__data[key]; // no more items with the key
        return value;
    }
}


/*!
 * \brief Get keys associated with the given value.
 *   Keys that occur multiple times in the map occur only once in the returned list.
 * \return an instance of Array with keys
 * \param value the value to search (in undefined all keys will be added)
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
Map.prototype.uniqueKeys = function(value, compareFunction) {
    var keys = []; // array with keys
    if (compareFunction === undefined) compareFunction = function(value1, value2) { return value1 === value2; } // use strict equality if compare function is undefined
    for (var key in this.__qkit__data) { // for all keys
        if (value === undefined) { // if value is undefined
            keys.push(key); // add the key
        } else { // if value is defined
            var keyValues = this.__qkit__data[key]; // array of values associated with the key
            var iValue = keyValues.length; // value iterator
            while (iValue--) { // for all values in the array
                if (compareFunction(keyValues[iValue], value)) {
                    keys.push(key); // add the key if its values array contains the value
                    break; // stop the cicle
                }
            }
        }
    }
    return keys;
}


/*!
 * \brief Insert all the items in the other map into this map.
 *   If a key is common to both maps, the resulting map will contain the key multiple times.
 * \return this map
 * \param map the map to unite with
 */
Map.prototype.unite = function(map) {
    if (!(map instanceof Map)) return; // return if map is not valid
    for (var key in map.__qkit__data) { // for all keys in map
        if (this.__qkit__data[key] === undefined) { // if this map doesn't contain values associated with the key
            this.__qkit__data[key] = map.__qkit__data[key].slice(0); // copy values array
        } else { // if this map contains values associated with the key
            var keyValues = this.__qkit__data[key]; // array of values associated with the key
            var mapKeyValues = map.__qkit__data[key]; // array of the map values associated with the key
            var nMapValues = mapKeyValues.lenght; // number of the map values associated with the key
            for (var iMapValue = 0; iMapValue < nMapValues; iMapValue++) keyValues.push(mapKeyValues[iValue]); // copy all values to the array
        }
    }
    this.__qkit__size += map.__qkit__size; // increase the size
}


/*!
 * \brief Get value by key.
 *   If there are multiple items for key in the map, the value of the most recently inserted one is returned.
 * \return the value associated with the given key or defaultValue
 * \param key the key associated with the value
 * \param defaultValue value to return if the map contains no item with the given key
 */
Map.prototype.value = function(key, defaultValue) {
    if (key === undefined) return undefined; // return if key is undefined
    if (this.__qkit__data[key] === undefined) return defaultValue; // return default value if the map contains no item with the given key
    return this.__qkit__data[key][this.__qkit__data[key].length - 1]; // return the most recently inserted value
}


/*!
 * \brief Generate array with values associated with the given key from the most recently inserted to the least recently inserted one.
 * \return generated instance of Array
 * \param key the key associated with the values (if undefined values for all the keys will be added)
 */
Map.prototype.values = function(key) {
    var values = []; // result array of values
    var keyValues; // array of values associated with the key
    var iValue; // value iterator
    if (key === undefined) { // if key is undefined
        for (key in this.__qkit__data) { // for all keys
            keyValues = this.__qkit__data[key]; // array of values associated with the key
            iValue = keyValues.length; // value iterator
            while (iValue--) values.push(keyValues[iValue]); // add all values to the result array
        }
    } else { // if key is defined
        keyValues = this.__qkit__data[key]; // array of values associated with the key
        if (keyValues === undefined) return []; // return empty array if the map doesn't contain values associated with the key
        iValue = keyValues.length; // value iterator
        while (iValue--) values.push(keyValues[iValue]); // add all values to the result array
    }
    return values;
}