import { Server } from 'http'
import run from '../app/index'
import connections from '../app/config/database'
const request = require('supertest')

describe('create-user', () => {

  let server: Server
  beforeAll(() => {
    server = run('3003')
  })

  afterAll(async () => {
    await server.close()
    connections.end() //关闭连接池
    console.log('server closed')
  })


  it('POST /users create', async () => {
    const result = await request(server)
      .post('/users')
      .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMyIsInBhc3N3b3JkIjoiMjM0IiwiaWQiOjksImlhdCI6MTY5NTUzNzg1MCwiZXhwIjoxNjk4MTI5ODUwfQ.OgvkWkg6tWr__FLAHXS-Jthq4BVZQG7-6eqDaZ_Auj9TDzp-DDQlD-g_oq8dm94OiURE6tcL3_D_AebzvGzQiIcYJ5cE4m3E8u52MrW5JnmMWNjnue-FwTFuCRe3qNaganHWNRYhXabUtlaiATZ4snHw6F-kVzvqPVihBC0USD-bTHe7c8rhq5pjZXZ6LzOD1aVWqQc0Ca2RM6NrfhEISAl3UCmHzJQ0CqAjeIq5Pn7EGfS7rJDlz-79VelMa-PdFbLn3_T5i7sgjSfd16ed6XC6ISAto-9yp_eoMSL1EK51q486M2llFbXN6223XPwWmNiaF4auL8ITP3UFoijWpA')
      .send({
        "username": "5432",
        "password": "234"
      })
    // .then((data: any) => {
    //   console.log(data.status)
    // })

    console.log(result.status) //200
    console.log(result.body) //{ code: 999, message: '用户名已存在' }

    expect(result.body.code).toBe(200)
  })
})


