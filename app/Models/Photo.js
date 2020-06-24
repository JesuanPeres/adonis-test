'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Photo extends Model {

  product(){
    return this.belongsTo('App/Models/Product', 'product', 'id')
  }
}

module.exports = Photo
