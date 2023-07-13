import * as Localization from "expo-localization";
import i18n from "i18n-js";
import en from "./en";
import vi from "./vi";

i18n.translations = {
  en: en,
  vi: vi,
};

// Set all en locale to en
let locale = Localization.locale;
if (locale.substring(0, 2) == "en") {
  locale = "en";
}

// Set the locale once at the beginning of your app.
i18n.locale = locale;

export default function $t(key, params = {}) {
  return i18n.t(key, params);
}
