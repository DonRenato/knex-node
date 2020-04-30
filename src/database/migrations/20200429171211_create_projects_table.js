const { onUpdateTrigger } = require('../../../knexfile')

exports.up = async knex => knex.schema.createTable('projects',table =>{
    table.increments('id')
    table.text('title').unique().notNullable()
    
    table.integer('user_id')
         .references('users.id')
         .notNullable()
         .onDelete('CASCADE')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  
}).then(() => knex.raw(onUpdateTrigger('projects')));

exports.down = knex => knex.schema.dropTable('projects');
