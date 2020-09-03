import { ConnectionOptions } from 'typeorm'

const dbOptions: ConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'official',
  password: 'official',
  database: 'official',
  charset: 'utf8mb4',
  entities: ['src/entity/*.{js,ts}'],
  logging: true,
}

export default {
  db: dbOptions,
}
