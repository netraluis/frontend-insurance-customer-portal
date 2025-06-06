import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { uploadFileToSupabase } from "./upload-file-to-supbase"
import { supabase } from "./supabase-client";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function uploadBlobsAndGetUrls(files: { name: string; type: string; url: string }[], claimNumber: string) {
  const uploadedUrls = []

  for (const file of files) {
    // Solo sube si la url es tipo blob:
    if (file.url.startsWith('blob:')) {
      // Recupera el Blob real desde la URL temporal
      const response = await fetch(file.url)
      const blob = await response.blob()

      // Define el path en el bucket (puedes personalizarlo)
      const path = `${claimNumber}/${file.name}`

      // Sube el archivo y obtiene la URL firmada
      const signedUrl = await uploadFileToSupabase(blob, path, 'claim-uploads')
      uploadedUrls.push({
        name: file.name,
        type: file.type,
        url: signedUrl,
      })
    }
  }

  return uploadedUrls // array de { name, type, url }
}

export async function uploadPdfToStorage(buffer: Buffer, claimNumber: string): Promise<string | null> {
  const fileName = `${claimNumber}/pdf/${claimNumber}.pdf`
  const { error } = await supabase.storage
    .from('claim-uploads') 
    .upload(fileName, buffer, {
      contentType: 'application/pdf',
      upsert: true,
    })

  if (error) {
    console.error('Error uploading PDF:', error)
    return null
  }

  const { data: publicUrlData } = supabase
    .storage
    .from('claim-uploads')
    .getPublicUrl(fileName)

  return publicUrlData?.publicUrl || null
}