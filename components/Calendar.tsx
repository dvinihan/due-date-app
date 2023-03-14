import { DAY_WIDTH } from "@/constants";
import { daysMap } from "@/constants/days";
import { GuessWithId } from "@/types";
import { Day } from "./Day";

type Props = {
  guesses: GuessWithId[];
};
export const Calendar = ({ guesses }: Props) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        {daysMap[0].map((day, i) => (
          <div
            key={i}
            style={{
              height: "20px",
              width: DAY_WIDTH,
              border: "1px solid black",
              display: "inline-block",
              backgroundColor: "lightgray",
            }}
          >
            {day.dayOfWeek}
          </div>
        ))}
        {daysMap.map((week, i) => (
          <div key={i}>
            {week.map((day, j) => (
              <Day day={day} key={j} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
