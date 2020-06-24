'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.text('details')
      table.integer('owner').unsigned().notNullable()
      table.float('price')
      table.timestamps()

      table.foreign('owner').references('id').inTable('users')
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
