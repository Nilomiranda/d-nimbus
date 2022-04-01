import { httpClient } from '../config/httpClient'
import { FileInterface } from '../interfaces/file'

export const uploadFile = async (payload: FormData): Promise<FileInterface> => (await httpClient.post('/upload', payload))?.data

export const downloadFile = async (id: string) => httpClient.get(`/file/${id}/download`, { responseType: 'blob' })
