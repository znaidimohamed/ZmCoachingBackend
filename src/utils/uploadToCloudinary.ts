import { cloudinary } from "../config/cloudinary";

export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
  resourceType: "image" | "raw" = "image"
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: false,
    },
      (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });
};