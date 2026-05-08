import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/training-pdfs";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDF files are allowed"));
};

export const uploadTrainingPdf = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("pdf");