"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coachChat = void 0;
const generative_ai_1 = require("@google/generative-ai");
const coachChat = async (req, res) => {
    try {
        const { message } = req.body;
        const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });
        const result = await model.generateContent(`
    You are ZM Coach AI, a fitness coaching assistant.

    IMPORTANT LANGUAGE RULES:
    - If the user writes in Tunisian Arabic, reply ONLY in Tunisian Arabic.
    - If the user writes in French, reply ONLY in French.
    - If the user writes in English, reply ONLY in English.
    - NEVER switch language by yourself.

    BEHAVIOR:
    - Keep answers short and motivating.
    - Act like a real fitness coach.
    - Give practical fitness and nutrition advice.
    - Avoid medical advice.
    - Keep responses under 80 words.

    User message:
    ${message}
    `);
        const response = result.response.text();
        res.json({ reply: response });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "AI failed" });
    }
};
exports.coachChat = coachChat;
