import {
  bodyMarginHeight,
  dayOfWeekHeight,
  DAY_PADDING,
  DUE_DATE_BACKGROUND_COLOR,
  headerHeight,
  JUNE_BACKGROUND_COLOR,
  MAY_BACKGROUND_COLOR,
  totalBorderHeight,
  totalPaddingHeight,
} from "@/constants";
import { daysMap } from "@/constants/days";
import { CalendarDay, GuessWithId } from "@/types";
import moment from "moment";
import { useEffect, useState } from "react";
import textFit from "textfit";

type Props = {
  day: CalendarDay;
  guesses: GuessWithId[];
  dayHeight: string;
  guessFontSize: string;
};

export const Day = ({ day, guesses, dayHeight, guessFontSize }: Props) => {
  const isDueDate = day.month === "June" && day.date === 8;

  const backgroundColor = isDueDate
    ? DUE_DATE_BACKGROUND_COLOR
    : day.month === "June"
    ? JUNE_BACKGROUND_COLOR
    : MAY_BACKGROUND_COLOR;

  const sortedGuesses = guesses.sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  return (
    <div
      id="day-container"
      style={{
        height: `calc${dayHeight}`,
        backgroundColor,
        padding: DAY_PADDING,
        border: "1px solid black",
        flex: "1 0 13%",
      }}
    >
      <span id="date-number">{day.date}</span>
      <div>
        {sortedGuesses.map((guess) => (
          <div
            className="guess"
            key={guess._id}
            style={{
              fontSize: `min(calc${guessFontSize}, 16px)`,
            }}
          >
            <span style={{ color: "darkcyan" }}>
              {moment(guess.date).format("h:mm a")}
            </span>
            <span style={{ color: "gray" }}>
              {" -- "}
              {guess.firstName} {guess.lastName.slice(0, 1)}.
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
