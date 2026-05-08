import { IUser, User, UserRole } from "../models/user.model";
import { hashPassword } from "../utils/hash";

interface CreateUserInput {
  fullName: string;
  email: string;
  password: string;
  role?: UserRole;
}

interface UpdateUserProfileInput {
  age?: number;
  height?: number;
  weight?: number;
  goal?: string;
  activityLevel?: string;
  phone?: string;
}

export const createUserByAdmin = async ({
  fullName,
  email,
  password,
  role = "user",
}: CreateUserInput) => {
  const existingUser: IUser | null = await User.findOne({
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
    role,
  });

  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    age: user.age,
    height: user.height,
    weight: user.weight,
    goal: user.goal,
    activityLevel: user.activityLevel,
    phone: user.phone,
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
};

export const getAllUsers = async () => {
  const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });

  return users.map((user) => ({
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    age: user.age,
    height: user.height,
    weight: user.weight,
    goal: user.goal,
    activityLevel: user.activityLevel,
    phone: user.phone,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));
};

export const toggleUserStatus = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.isActive = !user.isActive;
  await user.save();

  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    age: user.age,
    height: user.height,
    weight: user.weight,
    goal: user.goal,
    activityLevel: user.activityLevel,
    phone: user.phone,
    isActive: user.isActive,
  };
};

export const updateUserProfileByAdmin = async (
  userId: string,
  data: UpdateUserProfileInput
) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      age: data.age,
      height: data.height,
      weight: data.weight,
      goal: data.goal,
      activityLevel: data.activityLevel,
      phone: data.phone,
    },
    {
      new: true,
      runValidators: true,
      select: "-password",
    }
  );

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    age: user.age,
    height: user.height,
    weight: user.weight,
    goal: user.goal,
    activityLevel: user.activityLevel,
    phone: user.phone,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const getMyProfile = async (userId: string) => {
  const user = await User.findById(userId, { password: 0 });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    age: user.age,
    height: user.height,
    weight: user.weight,
    goal: user.goal,
    activityLevel: user.activityLevel,
    phone: user.phone,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};