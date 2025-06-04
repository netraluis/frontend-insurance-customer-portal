import { supabase } from './supabase-client'

export async function uploadFileToSupabase(file: File | Blob, path: string, bucket = 'claims-uploads') {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: true,
  })
  if (error) throw error

  // Obtener URL pública o firmada
  // Pública:
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl

  // Firmada (expira en 7 días):
//   const { data: signedUrlData } = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 60 * 24 * 7)
//   return signedUrlData?.signedUrl
}