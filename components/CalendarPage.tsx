import { AppContext } from "@/pages/_app";
import { GuessWithId } from "@/types";
import Link from "next/link";
import { useContext, useEffect } from "react";
import useSwr from "swr";

const fetchGuesses = async (): Promise<GuessWithId[]> => {
  const res = await fetch("/api/guesses");
  const data = await res.json();
  return data.guesses.map((g: any) => new GuessWithId(g));
};

export const CalendarPage = () => {
  const { socket } = useContext(AppContext);

  const { data: guesses = [], mutate } = useSwr<GuessWithId[]>(
    "/api/guesses",
    fetchGuesses
  );

  useEffect(() => {
    const messageListener = () => {
      // invalidate the cache to cause a re-fetch
      mutate();
    };

    socket?.addEventListener("message", messageListener);

    return () => {
      socket?.removeEventListener("message", messageListener);
    };
  }, [guesses, mutate, socket]);

  return (
    <div>
      <Link href="/newGuess">New Guess</Link>
      {guesses.map((guess) => (
        <div key={guess._id}>
          {guess.name}: {guess.date.toString()}
        </div>
      ))}
    </div>
  );
};
