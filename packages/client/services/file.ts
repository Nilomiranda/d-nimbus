import { httpClient } from '../config/httpClient'
import { FileInterface } from '../interfaces/file'

export const uploadFile = async (payload: FormData): Promise<FileInterface> => (await httpClient.post('/upload', payload))?.data

export const getFile = async (id: string): Promise<FileInterface> => (await httpClient.get(`/file/${id}`))?.data

export const downloadFile = async (id: string) => httpClient.get(`/file/${id}/download`, { responseType: 'blob' })
