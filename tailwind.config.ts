import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // আপনি চাইলে এখানে কাস্টম গোল্ডেন বা লাকপটি ব্র্যান্ড কালার যোগ করতে পারেন
        premium: "#1e293b",
      },
    },
  },
  plugins: [],
};
export default config;
