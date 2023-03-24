import { daysMap } from "./days";

export const WEB_SOCKET_URL = "wss://due-date-server.onrender.com";

const dayPaddingAmount = 4;
export const DAY_PADDING = `${dayPaddingAmount}px`;

export const DUE_DATE_BACKGROUND_COLOR = "#ffe199";
export const MAY_BACKGROUND_COLOR = "#ffe199";
export const JUNE_BACKGROUND_COLOR = "#ffe199";
export const RED_COLOR = "#ed1c24";

export const headerHeight = "11vh";
export const bodyMarginHeight = "0.5vh";
export const totalBorderHeight = `${2 + daysMap.length * 2}px`;
export const totalPaddingHeight = `${
  (daysMap.length + 1) * 2 * dayPaddingAmount
}px`;
export const dayColumnSplitGuessCount = 14;
