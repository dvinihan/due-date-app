import {
  DAY_HEIGHT,
  DAY_WIDTH,
  DUE_DATE_BACKGROUND_COLOR,
  JUNE_BACKGROUND_COLOR,
  MAY_BACKGROUND_COLOR,
} from "@/constants";
import { CalendarDay } from "@/types";

type Props = {
  day: CalendarDay;
};

export const Day = ({ day }: Props) => {
  const isDueDate = day.month === "June" && day.date === 8;

  const backgroundColor = isDueDate
    ? DUE_DATE_BACKGROUND_COLOR
    : day.month === "June"
    ? JUNE_BACKGROUND_COLOR
    : MAY_BACKGROUND_COLOR;

  return (
    <div
      style={{
        width: DAY_WIDTH,
        height: DAY_HEIGHT,
        border: "1px solid black",
        display: "inline-block",
        backgroundColor,
      }}
    >
      {day.date}
    </div>
  );
};
