// Cloudinary configuration and upload service
// Using unsigned upload preset for simplicity (no backend needed)

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

export const cloudinaryService = {
  // Upload image to Cloudinary
  async uploadImage(file: File, folder?: string): Promise<string> {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error("Cloudinary configuration is missing. Please check your .env file.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    
    if (folder) {
      formData.append("folder", folder);
    }

    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        const errorMessage = error.error?.message || "Failed to upload image";
        console.error("Cloudinary API Error - Full Response:", JSON.stringify(error, null, 2));
        console.error("Request URL:", CLOUDINARY_UPLOAD_URL);
        console.error("Cloud Name:", CLOUDINARY_CLOUD_NAME);
        console.error("Upload Preset:", CLOUDINARY_UPLOAD_PRESET);
        console.error("Error Details:", error);
        throw new Error(errorMessage);
      }

      const data: CloudinaryUploadResponse = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  },

  // Delete image from Cloudinary (requires signed requests or backend)
  // For now, we'll just delete from Firestore - images in Cloudinary will remain
  // To properly delete, you'd need a backend endpoint with Cloudinary admin API
  async deleteImage(publicId: string): Promise<void> {
    // Note: This requires Cloudinary admin API which needs backend
    // For free tier, we'll just leave images in Cloudinary
    // They won't be accessible if not referenced, but will take up storage
    console.log("Image deletion requires backend. Public ID:", publicId);
  },
};

