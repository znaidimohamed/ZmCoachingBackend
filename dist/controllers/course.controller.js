"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.toggleCourseStatus = exports.getAllCoursesAdmin = exports.getCourses = exports.createCourse = void 0;
const course_model_1 = require("../models/course.model");
const createCourse = async (req, res) => {
    try {
        const { title, category, description, price, duration, level, features, isPopular, } = req.body;
        if (!title || !category || !description || !price) {
            return res.status(400).json({
                message: "title, category, description and price are required",
            });
        }
        const course = await course_model_1.Course.create({
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
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to create course",
        });
    }
};
exports.createCourse = createCourse;
const getCourses = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = {
            isActive: true,
        };
        if (category) {
            filter.category = category;
        }
        const courses = await course_model_1.Course.find(filter).sort({ createdAt: -1 });
        res.json({ courses });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch courses",
        });
    }
};
exports.getCourses = getCourses;
const getAllCoursesAdmin = async (_req, res) => {
    try {
        const courses = await course_model_1.Course.find().sort({ createdAt: -1 });
        res.json({ courses });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch courses",
        });
    }
};
exports.getAllCoursesAdmin = getAllCoursesAdmin;
const toggleCourseStatus = async (req, res) => {
    try {
        const course = await course_model_1.Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        course.isActive = !course.isActive;
        await course.save();
        res.json({
            message: "Course status updated",
            course,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to update course status",
        });
    }
};
exports.toggleCourseStatus = toggleCourseStatus;
const deleteCourse = async (req, res) => {
    try {
        await course_model_1.Course.findByIdAndDelete(req.params.id);
        res.json({
            message: "Course deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to delete course",
        });
    }
};
exports.deleteCourse = deleteCourse;
