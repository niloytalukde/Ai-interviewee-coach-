import { CloudinaryStorage } from "multer-storage-cloudinary";
import { uploadCloudinary } from "./cloudinary.config";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: uploadCloudinary,
  params: async (req, file) => {
    const baseName = file.originalname
      .toLowerCase()
      .replace(/\.[^/.]+$/, "") // remove extension
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    return {
      resource_type: "raw",        // ✅ REQUIRED
      folder: "cvs",               // ✅ RECOMMENDED
      public_id: `${Date.now()}-${baseName}`, // ✅ CLEAN NAME
    };
  },
});

export const multerUpload = multer({ storage });
