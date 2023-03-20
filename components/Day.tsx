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
  const [singleGuessHeight, setSingleGuessHeight] = useState("");
  const [dayContainerWidth, setDayContainerWidth] = useState<
    number | undefined
  >();

  const [textFitDone, setTextFitDone] = useState(false);
  useEffect(() => {
    console.log("guess length:", guesses.length);
    const extraHeights = `${headerHeight} - ${dayOfWeekHeight} - (2 * ${bodyMarginHeight}) - ${totalBorderHeight} - ${totalPaddingHeight}`;
    const newDayHeight = `(100vh - ${extraHeights}) / ${daysMap.length}`;
    const dateNumberHeight =
      document?.getElementById("date-number")?.offsetHeight;
    const guessContainerHeight = `(${newDayHeight}) - ${dateNumberHeight}px`;

    const guessElements = document?.getElementsByClassName("guess") ?? [];
    textFit(guessElements);

    setSingleGuessHeight(`(${guessContainerHeight}) / ${guesses.length}`);
    setDayHeight(newDayHeight);
    setDayContainerWidth(
      document?.getElementById("day-container")?.offsetWidth
    );

    setTextFitDone(true);
  }, [guesses.length]);

  console.log("");
  return (
    textFitDone && (
      <div
        id="day-container"
        style={{
          height: `calc(${dayHeight})`,
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
                height: `calc(${singleGuessHeight})`,
                width: dayContainerWidth,
              }}
            >
              <span style={{ color: "darkcyan" }}>
                {moment(guess.date).format("h:mm a")}
              </span>
              <span style={{ color: "gray" }}>
                {" -- "}
                {guess.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  );
};
