const storage = require('lowdb/lib/storages/file-async')
const low = require('lowdb')
const path = require('path')
const config = require('conf/config.json')
const assert = require('assert')

assert('db_path' in config, 'Provide db_path in configs.')
const lowdb = low(config.db_path, { storage })

class Store {
  constructor (name) {
    this._name = name
  };

  set knownListings (value) {
    if (!Array.isArray(value)) throw Error('Not a valid array')

    lowdb
      .set(this._name, value)
      .write()
  }

  get knownListings () {
    return lowdb
      .get(this._name)
      .value() || []
  }
}

module.exports = Store
