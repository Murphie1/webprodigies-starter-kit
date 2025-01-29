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
                zinc: {
          "50": "hsl(0, 0%, 93.7%, <alpha-value>)",
          "100": "hsl(0, 0%, 87.8%, <alpha-value>)",
          "200": "hsl(0, 0%, 77%, <alpha-value>)",
          "300": "hsl(0, 0%, 66.3%, <alpha-value>)",
          "400": "hsl(0, 0%, 55.5%, <alpha-value>)",
          "500": "hsl(0, 0%, 45.1%, <alpha-value>)",
          "600": "hsl(0, 0%, 34.3%, <alpha-value>)",
          "700": "hsl(0, 0%, 23.5%, <alpha-value>)",
          "800": "hsl(0, 0%, 12.7%, <alpha-value>)",
          "900": "hsl(0, 0%, 5.9%, <alpha-value>)",
          "950": "hsl(0, 0%, 3.1%, <alpha-value>)",
        },
                brand: {
  				'100': '#EA6365',
  				DEFAULT: '#FA7275'
  			},
                light: {
  				'100': '#333F4E',
  				'200': '#A3B2C7',
  				'300': '#F2F5F9',
  				'400': '#F2F4F8'
  			},
                white: {
                    DEFAULT: "#FFFFFF",
                    1: "#FFFFFF",
                    2: "rgba(255, 255, 255, 0.72)",
                    3: "rgba(255, 255, 255, 0.4)",
                    4: "rgba(255, 255, 255, 0.64)",
                    5: "rgba(255, 255, 255, 0.80)",
                },
                black: {
                    DEFAULT: "#000000",
                    1: "#15171C",
                    2: "#222429",
                    3: "#101114",
                    4: "#252525",
                    5: "#2E3036",
                    6: "#24272C",
                },
                orange: {
                    DEFAULT: '#F9AB72',
                    1: "#F97535",
                },
                gray: {
                    DEFAULT: "#808080",
                    1: "#71788B",
                },
                blue: {
                    DEFAULT: '#56B8FF',
                    1: '#0E78F9',
                    100: "#B4C6EE",
                    400: "#417BFF",
                    500: "#3371FF",
                },
                pink: '#EEA8FD',
                green: '#3DD9B3',
                error: '#b80000',
                sky: {
                    1: '#C9DDFF',
                    2: '#ECF0FF',
                    3: '#F5FCFF',
                     },
                red: {
                    DEFAULT: '#FF7474',
                    400: "#DD4F56",
                    500: "#DC4349",
                },
                purple: {
                    1: '#830EF9',
                        },
                yellow: {
                   1: '#F9A90E',
                         },
                dark: {
                    1: '#1C1F2E',
                    2: '#161925',
                    3: '#252A41',
                    4: '#1E2757',
                    100: "#09111F",
                    200: "#0B1527",
                    300: "#0F1C34",
                    350: "#12213B",
                    400: "#27344D",
                    500: "#2E3D5B",
                },
                themeWhite: "#F7ECE9",
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
                chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
            },
            },
            fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "0.975rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
  			'drop-1': '0px 10px 30px 0px rgba(66, 71, 97, 0.1)',
  			'drop-2': '0 8px 30px 0 rgba(65, 89, 214, 0.3)',
  			'drop-3': '0 8px 30px 0 rgba(65, 89, 214, 0.1)'
  		},
            keyframes: {
                'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '1'
  				},
  				'20%,50%': {
  					opacity: '0'
  				}
                },
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
            },
            // extend: {
            backgroundImage: {
                hero: "url('/images/hero-background.png')",
                "chat-tile-light": "url('/bg-light.png')",
                "chat-tile-dark": "url('/bg-dark.png')",
                "nav-focus": "linear-gradient(270deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.00) 100%)",
                "radial-gradient": "radial-gradient(circle at 50% 40%, white, black)",
                doc: "url(/assets/images/doc.png)",
                modal: "url(/assets/images/modal.png)",
            },
            backgroundColor: {
                container: "hsl(var(--container))",
                "gray-primary": "hsl(var(--gray-primary))",
                "gray-secondary": "hsl(var(--gray-secondary))",
                "gray-tertiary": "hsl(var(--gray-tertiary))",
                "left-panel": "hsl(var(--left-panel))",
                "chat-hover": "hsl(var(--chat-hover))",
                "green-primary": "hsl(var(--green-primary))",
                "green-secondary": "hsl(var(--green-secondary))",
                "green-chat": "hsl(var(--green-chat))",
            },
            //}
            animation: {
                'caret-blink': 'caret-blink 1.25s ease-out infinite',
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
  plugins: [
  require("tailwindcss-animate"),
  require("@tailwindcss/typography")
],
} satisfies Config

export default config
