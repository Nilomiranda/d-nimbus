import Koa from 'koa'
import dotenv from 'dotenv'
import cors from '@koa/cors'
import router from './routes'
import bodyParser from 'koa-bodyparser'
import { PrismaClient } from '@prisma/client'
import Bree from 'bree'
import path from 'path'

const prisma = new PrismaClient()
const app = new Koa()

dotenv.config()

app.listen(process.env.PORT, () => {
  console.log(`Application running on port ${process.env.PORT}`)
})

prisma?.$connect().then(() => {
  console.log("Successfully connected to prisma client")
}).catch(err => {
  console.error("Error trying to connect to prisma client", err)
})

app.context.prisma = prisma

app.use(cors({
  allowMethods: ['OPTIONS', 'GET', 'HEAD', 'POST', 'DELETE', 'PATCH'],
}))

app.use(bodyParser())
app.use(router.routes())

export default app;

// const bree = new Bree({
//   root: false,
//   jobs: [
//     {
//       name: 'jobName',
//       interval: 'Every 1 day',
//       path: path.join(__dirname, '../jobs', 'jobName.js')
//     },
//   ]
// })
//
// bree.stop().then(() => {
//   bree.start()
// })
