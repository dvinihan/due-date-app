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
  dayColumnSplitGuessCount,
} from "@/constants";
import { CalendarDay, GuessWithId } from "@/types";
import { useEffect, useState } from "react";
import { daysMap } from "@/constants/days";
import { Guess } from "./Guess";

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
    const guessDivider = Math.min(guesses.length, dayColumnSplitGuessCount);
    const singleGuessHeight = `(${guessContainerHeight} / ${guessDivider})`;
    setDayHeight(newDayHeight);
    setGuessFontSize(`(${singleGuessHeight} - 0.4vh)`); // leave some buffer
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
      <div
        style={{
          display: "flex",
          justifyContent:
            sortedGuesses.length > dayColumnSplitGuessCount
              ? "space-between"
              : "start",
        }}
      >
        <div>
          {sortedGuesses.slice(0, dayColumnSplitGuessCount).map((guess) => (
            <Guess
              key={guess._id}
              guess={guess}
              guessFontSize={guessFontSize}
            />
          ))}
        </div>
        {sortedGuesses.length > dayColumnSplitGuessCount && (
          <div>
            {sortedGuesses.slice(dayColumnSplitGuessCount).map((guess) => (
              <Guess
                key={guess._id}
                guess={guess}
                guessFontSize={guessFontSize}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
