import { tint } from "./colorUtils.ts";

export const BaseColors = {
  red: "#f2777a",
  orange: "#f99157",
  yellow: "#ffcc66",
  green: "#99cc99",
  cyan: "#66cccc",
  blue: "#6699cc",
  purple: "#cc99cc",
} as const;

export type BaseColor = keyof typeof BaseColors;

type Colors = {
  [key in BaseColor]: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
};

export const colors: Colors = (Object.keys(BaseColors) as BaseColor[]).reduce(
  (acc: Colors, key: BaseColor) => {
    acc[key] = {
      100: tint(-0.8, BaseColors[key]) as string,
      200: tint(-0.6, BaseColors[key]) as string,
      300: tint(-0.4, BaseColors[key]) as string,
      400: tint(-0.3, BaseColors[key]) as string,
      500: BaseColors[key],
      600: tint(0.2, BaseColors[key]) as string,
      700: tint(0.4, BaseColors[key]) as string,
      800: tint(0.6, BaseColors[key]) as string,
      900: tint(0.8, BaseColors[key]) as string,
    };
    return acc;
  },
  {} as Colors,
);
