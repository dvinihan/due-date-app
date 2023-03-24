import { GuessWithId } from "@/types";
import { useMemo } from "react";
import { Day } from "./Day";
import { headerHeight } from "@/constants";
import { daysMap } from "@/constants/days";
import { poohFont } from "@/pages/_app";
import Image from "next/image";
import winnieThePooh from "../public/winnie-the-pooh.webp";
import tigger from "../public/tigger.png";

const IMAGE_HEIGHT = 70;
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
        className={poohFont.className}
        style={{
          height: headerHeight,
          textAlign: "center",
          fontSize: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ margin: "0 30px" }}
          src={winnieThePooh}
          alt="Pooh and Piglet"
          height={IMAGE_HEIGHT}
        />
        When will Baby P arrive?
        <Image
          style={{ margin: "0 30px" }}
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
