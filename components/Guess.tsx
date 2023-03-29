import { POOH_RED } from "@/constants";
import { GuessWithId } from "@/types";

type GuessProps = {
  guess: GuessWithId;
  guessFontSize: string;
};

const getTime = (time: string) => {
  const [hour, minute] = time.split(":");
  const hourInt = parseInt(hour);
  if (hourInt > 12) {
    return `${hourInt - 12}:${minute} pm`;
  } else {
    return `${hourInt}:${minute} am`;
  }
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
      <span style={{ color: POOH_RED }}>{getTime(guess.time)}</span>
      <span style={{ color: "gray" }}>
        {" - "}
        {name}
      </span>
    </div>
  );
};
