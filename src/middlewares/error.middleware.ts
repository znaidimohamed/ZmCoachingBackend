import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`
  });
};

export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(error.statusCode || 500).json({
    message: error.message || "Internal server error"
  });
};