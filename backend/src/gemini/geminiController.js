import { geminiModel } from "../configs/gemini.js";
import { aboutPrompt } from "./utiles/about_prompt.js";
import { cleanJsonResponse, parseGeminiCodeResponse } from "./utiles/clear_response.js";
import { buildMasterPrompt } from "./utiles/masterPrompt.js";

// Helper function to clean markdown code blocks and extract JSON from response

export const generateGeminiCode = async (req, res) => {
  try {
    const websiteType = typeof req.body.websiteType === 'string' ? req.body.websiteType.trim() : '';
    const rawSections = req.body.sections;
    const context = typeof req.body.context === 'string' ? req.body.context.trim() : '';
    const palette = req.body.palette;
    const layout = req.body.layout;

    const sectionsArray = Array.isArray(rawSections)
      ? rawSections.map((section) => String(section).trim()).filter(Boolean)
      : String(rawSections || '')
          .split(',')
          .map((section) => section.trim())
          .filter(Boolean);

    if (!websiteType || sectionsArray.length === 0) {
      return res.status(400).json({ message: "Website type and at least one section are required" });
    }

    const sections = sectionsArray.join(',');
    console.log('Sections array:', sectionsArray);

    try {
      const prompt = buildMasterPrompt({
        websiteType,
        sections,
        context,
        palette,
        layout
      });

      const result = await geminiModel.generateContent(prompt);
      const response = result.response.text();

      try {
        const { parsed, usedFallback } = parseGeminiCodeResponse(response);
        if (usedFallback) {
          console.warn('Gemini response recovered using tolerant parser fallback.');
        }
        res.json({ output: parsed });
      } catch (parseError) {
        const cleanedResponse = cleanJsonResponse(response);
        console.error('JSON Parse Error:', parseError.message);
        console.error('Response length:', response.length);
        console.error('Cleaned response (first 500 chars):', cleanedResponse.substring(0, 500));
        throw new Error(`Failed to parse JSON response: ${parseError.message}`);
      }
    } catch (geminiError) {
      console.log('Gemini API error, using fallback:', geminiError.message);
      throw geminiError;
    }

  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: "Generation failed", error: error.message });
  }
};

export const generateAboutSection = async (req, res) => {
  try {
    const { context } = req.body;
    if (!context) {
      return res.status(400).json({ message: "Context is required" });
    }
    const prompt = aboutPrompt(context);
    const result = await geminiModel.generateContent(JSON.stringify(prompt));
    const response = result.response.text();
    const cleanedResponse = cleanJsonResponse(response);

    try {
      const parsed = JSON.parse(cleanedResponse);
      res.json({ output: parsed });
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError.message);
      console.error('Response length:', response.length);
      console.error('Cleaned response (first 500 chars):', cleanedResponse.substring(0, 500));
      throw new Error(`Failed to parse JSON response: ${parseError.message}`);
    }
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: "Generation failed", error: error.message });
  }
};

export const updateExistingCode = async (req, res) => {
  try {
    const { existingCode, updateRequirements } = req.body;

    if (!existingCode || !updateRequirements) {
      return res.status(400).json({ message: "Existing code and update requirements are required" });
    }

    const prompt = `You are an expert web developer. Update the following code based on the user's requirements.

Existing Code:
${JSON.stringify(existingCode)}

User Requirements:
${updateRequirements}

IMPORTANT: Return ONLY a valid JSON object with the same structure as the existing code, with the requested modifications applied. Do not include any markdown, explanations, or code blocks. Just the raw JSON object.`;

    const result = await geminiModel.generateContent(prompt);
    const response = result.response.text();
    const cleanedResponse = cleanJsonResponse(response);

    try {
      const parsed = JSON.parse(cleanedResponse);
      res.json({ output: parsed });
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError.message);
      throw new Error(`Failed to parse JSON response: ${parseError.message}`);
    }
  } catch (error) {
    console.error('Update code error:', error);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};
