import type { Config } from "tailwindcss"

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx,css}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
                //xs: '360px',
            },
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)"],
            },
            colors: {
                white: {
                    DEFAULT: '#FFFFFF',
                    1: "#FFFFFF",
                    2: "rgba(255, 255, 255, 0.72)",
                    3: "rgba(255, 255, 255, 0.4)",
                    4: "rgba(255, 255, 255, 0.64)",
                    5: "rgba(255, 255, 255, 0.80)",
                },
                black: {
                    DEFAULT: '#000000',
                    1: "#15171C",
                    2: "#222429",
                    3: "#101114",
                    4: "#252525",
                    5: "#2E3036",
                    6: "#24272C",
                },
                orange: {
                    1: "#F97535",
                },
                gray: {
                    DEFAULT: '#808080',
                    1: "#71788B",
                },
                blue: {
                    100: "#B4C6EE",
                    400: "#417BFF",
                    500: "#3371FF",
                },
                red: {
                    400: "#DD4F56",
                    500: "#DC4349",
                },
                dark: {
                    100: "#09111F",
                    200: "#0B1527",
                    300: "#0F1C34",
                    350: "#12213B",
                    400: "#27344D",
                    500: "#2E3D5B",
                },
                themeBlack: "#09090B",
                themeGray: "#27272A",
                themeDarkGray: "#27272A",
                themeTextGray: "#B4B0AE",
                themeTextWhite: "#F7ECE9",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            // extend: {
            backgroundImage: {
                "nav-focus":
                    "linear-gradient(270deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.00) 100%)",
                "radial-gradient":
                    "radial-gradient(circle at 50% 40%, white, black)",
                doc: "url(/assets/images/doc.png)",
                modal: "url(/assets/images/modal.png)",
            },
            //}
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
  variants: {
    extend: {
      textColor: ['disabled'], // Enable `disabled` for text color
    },
  },
    plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
