import { GuessWithId } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { Day } from "./Day";
import {
  bodyMarginHeight,
  dayOfWeekHeight,
  DAY_PADDING,
  headerHeight,
  totalBorderHeight,
  totalPaddingHeight,
} from "@/constants";
import { daysMap } from "@/constants/days";

const monthMap = {
  May: 5,
  June: 6,
};

const getGuessKey = (month: number, date: number) => `${month}-${date}`;

const getMaxGuessesInADay = (guessesByDate: GuessMap) => {
  let max = 0;
  guessesByDate.forEach((guesses) => {
    if (guesses.length > max) {
      max = guesses.length;
    }
  });
  return max;
};

type GuessMap = Map<string, GuessWithId[]>;

type Props = {
  guesses: GuessWithId[];
};
export const Calendar = ({ guesses }: Props) => {
  const guessesByDate = useMemo(
    () =>
      guesses.reduce((acc, guess) => {
        const guessKey = getGuessKey(
          guess.date.getMonth() + 1,
          guess.date.getDate()
        );
        if (acc.has(guessKey)) {
          acc.get(guessKey)?.push(guess);
        } else {
          acc.set(guessKey, [guess]);
        }
        return acc;
      }, new Map() as GuessMap),
    [guesses]
  );

  const [dayHeight, setDayHeight] = useState("");
  const [guessFontSize, setGuessFontSize] = useState("");

  const maxGuessesInADay = useMemo(
    () => getMaxGuessesInADay(guessesByDate),
    [guessesByDate]
  );
  useEffect(() => {
    const extraHeights = `${headerHeight} - ${dayOfWeekHeight} - (2 * ${bodyMarginHeight}) - ${totalBorderHeight} - ${totalPaddingHeight}`;
    const newDayHeight = `((100vh - ${extraHeights}) / ${daysMap.length})`;
    const dateNumberHeight =
      document?.getElementById("date-number")?.offsetHeight;
    const guessContainerHeight = `(${newDayHeight} - ${dateNumberHeight}px)`;
    const singleGuessHeight = `(${guessContainerHeight} / ${maxGuessesInADay})`;
    setDayHeight(newDayHeight);
    setGuessFontSize(`(${singleGuessHeight} - 1px)`);
  }, [maxGuessesInADay]);

  return (
    <>
      <div
        style={{
          height: headerHeight,
          border: "1px solid black",
          textAlign: "center",
          fontSize: "30px",
          fontFamily: "cursive",
        }}
      >
        When will &quot;Baby P&quot; arrive?
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {daysMap[0].map((day, i) => (
          <div
            key={i}
            style={{
              height: dayOfWeekHeight,
              border: "1px solid black",
              display: "inline-block",
              backgroundColor: "lightgray",
              padding: DAY_PADDING,
              flex: "1 0 13%",
            }}
          >
            {day.dayOfWeek}
          </div>
        ))}
        {daysMap.map((week) =>
          week.map((day, j) => (
            <Day
              day={day}
              key={j}
              guesses={
                guessesByDate.get(getGuessKey(monthMap[day.month], day.date)) ??
                []
              }
              dayHeight={dayHeight}
              guessFontSize={guessFontSize}
            />
          ))
        )}
      </div>
    </>
  );
};
