import {
  DAY_PADDING,
  DUE_DATE_BACKGROUND_COLOR,
  JUNE_BACKGROUND_COLOR,
  MAY_BACKGROUND_COLOR,
  bodyMarginHeight,
  dayOfWeekHeight,
  headerHeight,
  totalBorderHeight,
  totalPaddingHeight,
} from "@/constants";
import { CalendarDay, GuessWithId } from "@/types";
import moment from "moment";
import { useEffect, useState } from "react";
import { daysMap } from "@/constants/days";

type Props = {
  day: CalendarDay;
  guesses: GuessWithId[];
};

export const Day = ({ day, guesses }: Props) => {
  const isDueDate = day.month === "June" && day.date === 8;

  const backgroundColor = isDueDate
    ? DUE_DATE_BACKGROUND_COLOR
    : day.month === "June"
    ? JUNE_BACKGROUND_COLOR
    : MAY_BACKGROUND_COLOR;

  const sortedGuesses = guesses.sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  const [dayHeight, setDayHeight] = useState("");
  const [guessFontSize, setGuessFontSize] = useState("");

  useEffect(() => {
    const extraHeights = `${headerHeight} - ${dayOfWeekHeight} - (2 * ${bodyMarginHeight}) - ${totalBorderHeight} - ${totalPaddingHeight}`;
    const newDayHeight = `((100vh - ${extraHeights}) / ${daysMap.length})`;
    const dateNumberHeight =
      document?.getElementById("date-number")?.offsetHeight;
    const guessContainerHeight = `(${newDayHeight} - ${dateNumberHeight}px)`;
    const singleGuessHeight = `(${guessContainerHeight} / ${guesses.length})`;
    setDayHeight(newDayHeight);
    setGuessFontSize(`(${singleGuessHeight} - 0.4vh)`);
  }, [guesses.length]);

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
