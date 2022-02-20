import {KoaContext} from "../globalInterfaces";
import { addHours } from 'date-fns'
import Chance from 'chance'
import { Storage } from '@google-cloud/storage'

const storage = new Storage()

const chance = new Chance();

export const uploadFile = async (context: KoaContext) => {
  const { file, prisma, response } = context;

  // size in bites
  const { originalname, mimetype, buffer, size } = file;
  const googleCloudFile = storage.bucket('d-number_bucket').file(`files/${originalname}`)
  const uuid = chance.guid({ version: 5 })

  try {
    await googleCloudFile.save(buffer)

    const savedFile = await prisma.file.create({
      data: {
        name: originalname,
        expiresIn: addHours(new Date(), 24),
        uuid,
        mimeType: mimetype,
        size
      }
    })

    if (savedFile) {
      response.status = 200;
      return response.body = {
        ...savedFile
      }
    }
    response.status = 500;
    return response.body = {
      error: 'File not saved.'
    }
  } catch (err) {
    console.error('uploadFile:error::', err)

    response.status = 500;
    return response.body = {
      error: 'File not saved.'
    }
  }
}
