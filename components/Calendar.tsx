import { dayOfWeekHeight, DAY_PADDING, headerHeight } from "@/constants";
import { daysMap } from "@/constants/days";
import { GuessWithId } from "@/types";
import { useMemo } from "react";
import { Day } from "./Day";

const monthMap = {
  May: 5,
  June: 6,
};

const getGuessKey = (month: number, date: number) => `${month}-${date}`;

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
            />
          ))
        )}
      </div>
    </>
  );
};
