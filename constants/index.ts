import { daysMap } from "./days";

export const WEB_SOCKET_URL = "wss://due-date-server.onrender.com";

export const DAY_PADDING = "4px";

export const DUE_DATE_BACKGROUND_COLOR = "#d0f2d7";
export const MAY_BACKGROUND_COLOR = "#ffe6fe";
export const JUNE_BACKGROUND_COLOR = "#fff5e6";

export const dayOfWeekHeight = 3;
export const bodyMarginHeight = 0.5;
export const dayHeight =
  (100 - dayOfWeekHeight - bodyMarginHeight) / daysMap.length;
