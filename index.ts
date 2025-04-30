import { input, password } from "@inquirer/prompts";
import { handleFiles } from "./handlers/filesHandler";
import { aiHandler } from "./handlers/aiRespHandler";
import { $ } from "bun";

let stage = 0;

while (true) {
  const userRequest =
    stage === 0
      ? await password({
          message: "Введите ключ OpenAI >>",
          validate: (input) => input.length > 0 && input.startsWith("sk-"),
          mask: "*",
        })
      : await input({
          message: "Вы >>",
          validate: (input) => input.length > 0,
          default: "Введите запрос",
          required: true,
        });

  if (stage === 0) {
    process.env.OPENAI_API_KEY = userRequest;
    stage++;
    await $`clear`;
    continue;
  }

  switch (userRequest.toLowerCase()) {
    case "exit":
      console.log("\nЗавершение работы");
      process.exit(0);
    case "files":
      await handleFiles();
      break;
    default:
      await aiHandler(userRequest);
  }
  process.on("SIGINT", () => {
    console.log("\nПрервано пользователем");
    process.exit(0);
  });
}
