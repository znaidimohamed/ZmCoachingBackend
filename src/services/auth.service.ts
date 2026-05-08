import { User, IUser } from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
}

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const user: IUser | null = await User.findOne({
    email: email.toLowerCase(),
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.isActive) {
    throw new Error("This account is disabled");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  };
};

export const registerUser = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    password: hashedPassword,
    role: "user",
  });

  const token = generateToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  };
};