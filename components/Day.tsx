import {
  DAY_PADDING,
  bodyMarginHeight,
  headerHeight,
  totalBorderHeight,
  totalPaddingHeight,
  dayColumnSplitGuessCount,
  POOH_RED,
  POOH_YELLOW,
} from "@/constants";
import { CalendarDay, GuessWithId } from "@/types";
import { useEffect, useState } from "react";
import { daysMap } from "@/constants/days";
import { Guess } from "./Guess";
import { poohFont } from "@/pages/_app";

type Props = {
  day: CalendarDay;
  guesses: GuessWithId[];
};

const getDate = (guess: GuessWithId) => {
  const date = guess.date < 10 ? `0${guess.date}` : guess.date;
  return new Date(`2023-0${guess.month}-${date}T${guess.time}`);
};

export const Day = ({ day, guesses }: Props) => {
  const isDueDate = day.month === "June" && day.date === 8;

  const sortedGuesses = guesses.sort(
    (a, b) => getDate(a).getTime() - getDate(b).getTime()
  );

  const [dayHeight, setDayHeight] = useState("");
  const [guessFontSize, setGuessFontSize] = useState("");

  useEffect(() => {
    const extraHeights = `${headerHeight} - (2 * ${bodyMarginHeight}) - ${totalBorderHeight} - ${totalPaddingHeight}`;
    const newDayHeight = `((100vh - ${extraHeights}) / ${daysMap.length})`;
    const dateNumberHeight =
      document?.getElementById("date-number")?.offsetHeight;
    const guessContainerHeight = `(${newDayHeight} - ${dateNumberHeight}px)`;
    const guessDivider = Math.min(guesses.length, dayColumnSplitGuessCount);
    const singleGuessHeight = `(${guessContainerHeight} / ${guessDivider})`;
    setDayHeight(newDayHeight);
    setGuessFontSize(`(${singleGuessHeight} - 0.3vh)`); // leave some buffer
  }, [guesses.length]);

  return (
    <div
      id="day-container"
      style={{
        height: `calc${dayHeight}`,
        backgroundColor: POOH_YELLOW,
        padding: DAY_PADDING,
        border: "1px solid black",
        flex: "1 0 13%",
      }}
    >
      <div
        className={poohFont.className}
        id="date-number"
        style={{ display: "flex" }}
      >
        <span style={{ width: "35%" }}>{day.date}</span>
        {isDueDate && (
          <span style={{ color: POOH_RED, width: "65%" }}>{"  "}Due Date</span>
        )}
      </div>
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
