"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("../config/cloudinary");
const uploadToCloudinary = (buffer, folder, resourceType = "image", originalName) => {
    return new Promise((resolve, reject) => {
        const ext = originalName ? path_1.default.extname(originalName) : "";
        const baseName = originalName
            ? path_1.default.basename(originalName, ext).replace(/[^a-zA-Z0-9-_]/g, "-")
            : "file";
        const options = {
            folder,
            resource_type: resourceType,
        };
        if (resourceType === "raw") {
            options.public_id = `${Date.now()}-${baseName}${ext || ".pdf"}`;
        }
        const stream = cloudinary_1.cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
        stream.end(buffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
