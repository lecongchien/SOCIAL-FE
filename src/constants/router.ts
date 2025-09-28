import { YOUTUBE_LINK } from "./socialLinks";

export const navigationLinks = [
  { name: "Khóa học", href: "#about" },
  { name: "Chương trình học", href: "#curriculum" },
  { name: "Câu hỏi thường gặp", href: "#faqs" },
  { name: "Liên hệ", href: "#contact" },
  { name: "Về mình", href: "#about-me" },
  { name: "Youtube", href: YOUTUBE_LINK },
];

export const ROUTES = {
  homePage: "/",
  signIn: "/signin",
  signUp: "/signup",
  user: "/user",
};

export const CALLBACK_URL = "callbackUrl";
