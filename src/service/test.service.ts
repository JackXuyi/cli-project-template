import { getRepository } from 'typeorm'

import TestEntity from '../entity/test.entity'

class Test {
  public async getTestData() {
    const result = await getRepository(TestEntity).find()
    console.log('result', result)
    return result
  }
}

export default new Test()
