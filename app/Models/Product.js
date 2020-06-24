'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  owner(){
    return this.belongsTo('App/Models/User', 'owner', 'id')
  }

  photo(){
    return this.hasOne('App/Models/Photo', 'id', 'product')
  }
}

module.exports = Product
