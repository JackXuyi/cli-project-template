import { createPool } from 'mysql'

import config from '../config'

const { db } = config

const pool = createPool(db)

export default pool
