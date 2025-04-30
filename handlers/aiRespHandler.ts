import { AIResponderV2 } from "ai-responder";
import ora from "ora";
import { aiConfig } from "../config/default";

const aiResponder = new AIResponderV2(aiConfig);

export const aiHandler = async (response: string) => {
  const spinner = ora("Обработка...").start();
  try {
    const aiResponse = await aiResponder.getContextResponse(
      "console",
      response,
    );
    spinner.succeed(`ИИ: ${aiResponse.text}`);
  } catch (err) {
    spinner.fail("Ошибка");
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};
