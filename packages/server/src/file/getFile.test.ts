// import {getFile} from "./getFile";
import request from 'supertest'
import app from '../index'

test('get uploaded file', async () => {
  const response = await request(app.callback()).get('/file/6247a03c00a7e4ef00ae0ac3');
  console.log({ response })
  expect(response.status).toBe(200);
});
