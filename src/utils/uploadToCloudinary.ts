import path from "path";
import { cloudinary } from "../config/cloudinary";

export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
  resourceType: "image" | "raw" = "image",
  originalName?: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const ext = originalName ? path.extname(originalName) : "";
    const baseName = originalName
      ? path.basename(originalName, ext).replace(/[^a-zA-Z0-9-_]/g, "-")
      : "file";

    const options: any = {
      folder,
      resource_type: resourceType,
    };

    if (resourceType === "raw") {
      options.public_id = `${Date.now()}-${baseName}${ext || ".pdf"}`;
    }

    const stream = cloudinary.uploader.upload_stream(
      options,
      (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });
};