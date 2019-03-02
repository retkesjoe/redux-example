import i18next from "i18next";
import XHR from "i18next-xhr-backend";

function loadLocale(url: string, _: any, callback: any) {
  import(/* webpackChunkName: '[request]' */ `assets/translations/${url}.json`)
    .then(locale => {
      callback(locale, { status: 200 });
    })
    .catch(() => {
      callback(null, { status: 404 });
    });
}

const i18n = i18next.use(XHR).init({
  lng: "en-US",
  backend: {
    loadPath: "{{lng}}/{{ns}}",
    parse: (data: object) => data,
    ajax: loadLocale
  },
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false
  },

  react: {
    wait: true,
    bindStore: false,
    bindI18n: "languageChanged"
  } as any
});

export function preloadNamespaces() {
  window.requestIdleCallback(() =>
    i18n.loadNamespaces(["projects"], () => {
      /* Only preloading */
    })
  );
}

export default i18n;
