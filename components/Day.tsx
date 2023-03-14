import {
  dayHeight,
  DAY_PADDING,
  DUE_DATE_BACKGROUND_COLOR,
  JUNE_BACKGROUND_COLOR,
  MAY_BACKGROUND_COLOR,
} from "@/constants";
import { CalendarDay, GuessWithId } from "@/types";
import moment from "moment";

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

  return (
    <div
      style={{
        height: `${dayHeight}vh`,
        backgroundColor,
        padding: DAY_PADDING,
        border: "1px solid black",
        flex: "1 0 13%",
      }}
    >
      <span>{day.date}</span>
      <div>
        {sortedGuesses.map((guess) => (
          <div key={guess._id}>
            <span style={{ color: "darkcyan" }}>
              {moment(guess.date).format("h:mm a")}
            </span>
            <span style={{ fontSize: "12px", color: "gray" }}>
              {" -- "}
              {guess.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
