export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: "#fff5f5",
                    100: "#ffe1e1",
                    200: "#ffc8c8",
                    300: "#ff9f9f",
                    400: "#ff6d6d",
                    500: "#ff4242",
                    600: "#ef2323",
                    700: "#cc1717",
                    800: "#a81616",
                    900: "#8b1919",
                    950: "#09090b"
                },
                surface: {
                    50: "#f8f8fa",
                    100: "#f1f1f4",
                    200: "#dddde3",
                    300: "#c8c8d1",
                    700: "#3c3c47",
                    800: "#1a1a21",
                    850: "#14141a",
                    900: "#101015"
                }
            },
            boxShadow: {
                panel: "0 24px 80px rgba(5, 5, 8, 0.35)",
                soft: "0 12px 32px rgba(15, 15, 20, 0.18)"
            },
            backgroundImage: {
                "hero-grid": "radial-gradient(circle at top, rgba(255,66,66,0.22), transparent 28%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
            },
            backgroundSize: {
                "hero-grid": "auto, 32px 32px, 32px 32px"
            },
            fontFamily: {
                sans: ['\"Instrument Sans\"', "system-ui", "sans-serif"],
                display: ['\"Sora\"', '\"Instrument Sans\"', "system-ui", "sans-serif"]
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-6px)" }
                },
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(14px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" }
                }
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                "fade-up": "fadeUp 0.45s ease-out both"
            }
        }
    },
    plugins: [],
};
