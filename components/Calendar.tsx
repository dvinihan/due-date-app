import { GuessWithId } from "@/types";
import { useMemo } from "react";
import { Day } from "./Day";
import { dayOfWeekHeight, DAY_PADDING, headerHeight } from "@/constants";
import { daysMap } from "@/constants/days";
import { parisienne } from "@/pages/_app";
import Image from "next/image";
import winnieThePooh from "../public/winnie-the-pooh.webp";
import tigger from "../public/tigger.png";

const IMAGE_HEIGHT = 50;
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
        className={parisienne.className}
        style={{
          height: headerHeight,
          border: "1px solid black",
          textAlign: "center",
          fontSize: "43px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ margin: "0 10px" }}
          src={winnieThePooh}
          alt="Pooh and Piglet"
          height={IMAGE_HEIGHT}
        />
        When will Baby P arrive?
        <Image
          style={{ margin: "0 10px" }}
          src={tigger}
          alt="Tigger"
          height={IMAGE_HEIGHT}
        />
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
