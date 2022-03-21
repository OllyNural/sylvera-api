import { Knex, knex } from 'knex';

const config: Knex.Config = {
  client: 'better-sqlite3',
  connection: {
    filename: './src/database/customers.db',
  },
};

const knexInstance = knex(config);

export default knexInstance;
