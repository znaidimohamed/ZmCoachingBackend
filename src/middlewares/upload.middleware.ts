import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/transformations";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

export const uploadTransformationImages = multer({ storage }).fields([
  { name: "beforeImage", maxCount: 1 },
  { name: "afterImage", maxCount: 1 },
]);