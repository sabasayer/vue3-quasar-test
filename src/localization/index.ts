import { createI18n } from "vue-i18n";
import enUS from "./messages/en-US.json";
import trTR from "./messages/tr-TR.json";

type MessageSchema = typeof enUS;

export const i18n = createI18n<[MessageSchema], "en-US" | "tr-TR">({
  legacy: false,
  messages: {
    "en-US": enUS,
    "tr-TR": trTR,
  },
  locale: "tr-TR",
  availableLocales: ["en-US", "tr-TR"],
});
