declare const _default: {
    content: string[];
    theme: {
        extend: {
            colors: {
                brand: {
                    50: string;
                    100: string;
                    200: string;
                    300: string;
                    400: string;
                    500: string;
                    600: string;
                    700: string;
                    800: string;
                    900: string;
                    950: string;
                };
                surface: {
                    50: string;
                    100: string;
                    200: string;
                    300: string;
                    700: string;
                    800: string;
                    850: string;
                    900: string;
                };
            };
            boxShadow: {
                panel: string;
                soft: string;
            };
            backgroundImage: {
                "hero-grid": string;
            };
            backgroundSize: {
                "hero-grid": string;
            };
            fontFamily: {
                sans: [string, string, string];
                display: [string, string, string, string];
            };
            keyframes: {
                float: {
                    "0%, 100%": {
                        transform: string;
                    };
                    "50%": {
                        transform: string;
                    };
                };
                fadeUp: {
                    "0%": {
                        opacity: string;
                        transform: string;
                    };
                    "100%": {
                        opacity: string;
                        transform: string;
                    };
                };
            };
            animation: {
                float: string;
                "fade-up": string;
            };
        };
    };
    plugins: any[];
};
export default _default;
