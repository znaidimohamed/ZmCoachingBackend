import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

export const signIn = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required",
      });
      return;
    }

    const data = await loginUser(email, password);

    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Login failed",
    });
  }
};

export const signUp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      res.status(400).json({
        message: "All fields are required",
      });
      return;
    }

    const data = await registerUser({
      fullName,
      email,
      password,
    });

    res.status(201).json(data);
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Signup failed",
    });
  }
};