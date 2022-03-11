import { KoaContext } from '../globalInterfaces'
import fs from 'fs'
import { Storage } from '@google-cloud/storage'

const storage = new Storage()

export const downloadFile = async (context: KoaContext) => {
	const { params, response, prisma } = context
	const { id } = params

	const file = await prisma.file.findUnique({
		where: {
			id,
		},
	})

	const something = await storage.bucket('d-number_bucket').file(`files/${file.uuid}${file.name}`).createReadStream()

	return (response.body = something)
}
