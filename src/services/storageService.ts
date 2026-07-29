import { supabase } from './supabase';

export const BUCKET_NAME = 'payment-proofs';

/**
 * Upload payment proof screenshot to Supabase Storage bucket
 * Returns public access URL of uploaded image
 */
export async function uploadPaymentProof(file: File, registrationId: string): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop() || 'png';
    const cleanRegId = registrationId.replace(/[^a-zA-Z0-9-]/g, '_');
    const fileName = `${cleanRegId}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.warn('Supabase storage upload error:', error.message);
      // Return base64 data URL fallback if storage bucket fails
      return await fileToBase64(file);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Storage upload exception, falling back to base64 encoding:', err);
    return await fileToBase64(file);
  }
}

/**
 * Convert File object to Base64 String as fallback
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
