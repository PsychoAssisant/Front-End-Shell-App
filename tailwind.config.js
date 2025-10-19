{
  import("tailwindcss").Config;
}

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        body: "#111827",
        assistant: "#1F2937",
        user: "#6D28D9",
        accent: "#A855F7",
        "text-default": "#F9FAFB",
      },
    },
    plugins: [],
  },
};
