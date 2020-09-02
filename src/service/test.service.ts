import db from '../tools/db'

class Test {
  private readonly dbConnection = Object.freeze(db)

  public async getTestData() {
    const result = await new Promise((resolve, reject) => {
      this.dbConnection.query('SELECT * FROM official.test', (error, res) => {
        if (error) {
          reject(error)
        } else {
          resolve(res)
        }
      })
    })
    console.log('result', result)
    return result
  }
}

export default new Test()
