import { POOH_RED } from "@/constants";
import { GuessWithId } from "@/types";
import moment from "moment";

type GuessProps = {
  guess: GuessWithId;
  guessFontSize: string;
};

export const Guess = ({ guess, guessFontSize }: GuessProps) => {
  const name =
    guess.firstName.length > 10
      ? `${guess.firstName.slice(0, 10)}...`
      : `${guess.firstName.slice(0, 10)} ${guess.lastName.slice(0, 1)}.`;
  return (
    <div
      className="guess"
      style={{
        fontSize: `min(calc${guessFontSize}, 16px)`,
      }}
    >
      <span style={{ color: POOH_RED }}>
        {moment(guess.date).format("h:mm a")}
      </span>
      <span style={{ color: "gray" }}>
        {" - "}
        {name}
      </span>
    </div>
  );
};
