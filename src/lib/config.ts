import { translations, getStoredLang } from "../app/i18n/translations";

export const serverApi: string = `${process.env.REACT_APP_API_URL}`

export const getImageUrl = (path?: string): string => {
    if (!path) return "/icons/user-default.svg";
    if (path.startsWith("http")) return path;
    return `${serverApi}/${path}`;
};

const msg = () => translations[getStoredLang()].messages;

// Getters: messages always follow the currently selected language
export const Messages = {
    get error1() { return msg().error1; },
    get error2() { return msg().error2; },
    get error3() { return msg().error3; },
    get error4() { return msg().error4; },
    get error5() { return msg().error5; },
}

/** Admin contacts shown to customers for payment (Stripe is disabled). */
export const AdminContacts = {
    phones: ["+998 93 491-7500", "+998 93 491-7501"],
    telegram: "https://t.me/ekopechka",
    email: "mukhammad5589@gmail.com",
};
