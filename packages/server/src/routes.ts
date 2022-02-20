import Router from 'koa-router'
import multer from '@koa/multer'
import {uploadFile} from "./file/uploadFile";
import {getFile} from "./file/getFile";

const upload = multer();

const router = new Router({
  prefix: "/api"
})

router.get("/status", async (context) => {
  return context.response.body = {
    online: true,
  }
})

router.post("/upload", upload.single('document'), uploadFile)
router.get("/file/:id", getFile)

export default router
