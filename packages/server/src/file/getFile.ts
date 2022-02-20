import {KoaContext} from "../globalInterfaces";

export const getFile = async (context: KoaContext) => {
  const { params, prisma, response } = context;
  const { id } = params;

  try {
    const file = await prisma.file.findUnique({
      where: {
        id
      }
    });

    response.status = 200;
    return response.body = {
      ...file,
    }
  } catch (err) {
    response.status = 404;
    return response.body = {
      error: "File not found."
    }
  }
}
