'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PhotoSchema extends Schema {
  up () {
    this.create('photos', (table) => {
      table.increments()
      table.string('url', 254).notNullable()
      table.integer('product').unsigned().notNullable()
      table.timestamps()

      table.foreign('product').references('id').inTable('products')
    })
  }

  down () {
    this.drop('photos')
  }
}

module.exports = PhotoSchema
