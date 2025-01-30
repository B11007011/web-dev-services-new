import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/{Blog,CaseStudies,Contact,FAQ,Features,Footer,Hero,LanguageHandler,LanguageSwitcher,LoadingSpinner,Modal,Portfolio,Pricing,Process,ScrollToTop,Services,Stats,Team,Technologies,ThemeToggle,ViewportHandler}.tsx",
    "./src/components/ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, #f0f0f0 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
