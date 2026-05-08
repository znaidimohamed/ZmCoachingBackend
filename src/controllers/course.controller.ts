import { Request, Response } from "express";
import { Course } from "../models/course.model";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const {
      title,
      category,
      description,
      price,
      duration,
      level,
      features,
      isPopular,
    } = req.body;

    if (!title || !category || !description || !price) {
      return res.status(400).json({
        message: "title, category, description and price are required",
      });
    }

    const course = await Course.create({
      title,
      category,
      description,
      price,
      duration,
      level,
      features: Array.isArray(features)
        ? features
        : String(features)
            .split("\n")
            .map((f) => f.trim())
            .filter(Boolean),
      isPopular: isPopular === true || isPopular === "true",
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to create course",
    });
  }
};

export const getCourses = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const filter: any = {
      isActive: true,
    };

    if (category) {
      filter.category = category;
    }

    const courses = await Course.find(filter).sort({ createdAt: -1 });

    res.json({ courses });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch courses",
    });
  }
};

export const getAllCoursesAdmin = async (_req: Request, res: Response) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    res.json({ courses });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch courses",
    });
  }
};

export const toggleCourseStatus = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.isActive = !course.isActive;
    await course.save();

    res.json({
      message: "Course status updated",
      course,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to update course status",
    });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    await Course.findByIdAndDelete(req.params.id);

    res.json({
      message: "Course deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to delete course",
    });
  }
};