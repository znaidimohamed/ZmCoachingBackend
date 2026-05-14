import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (_req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

export const uploadNutritionPdf = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
}).single("pdf");