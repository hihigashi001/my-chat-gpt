import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { AxiosError } from "axios";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generator = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const systemContent = req.body.systemContent || "";
  const userContent = req.body.userContent || "";
  const inputText = req.body.inputText || "";
  if (inputText.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid inputText",
      },
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemContent,
        },
        { role: "user", content: userContent },
        { role: "user", content: `入力値：${inputText}` },
      ],
      temperature: 0.8,
    });
    if (
      completion.data.choices.length > 0 &&
      completion.data.choices[0] &&
      completion.data.choices[0].message
    ) {
      res.status(200).json({ result: completion.data.choices[0].message.content });
    } else {
      res.status(500).json({
        error: {
          message: "No valid choices returned from the API.",
        },
      });
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error(axiosError.response.status, axiosError.response.data);
      res.status(axiosError.response.status).json(axiosError.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${(error as Error).message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
};

export default generator;
