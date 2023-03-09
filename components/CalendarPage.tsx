import { AppContext } from "@/pages/_app";
import { GuessWithId } from "@/types";
import Link from "next/link";
import { useContext, useEffect } from "react";
import useSwr, { useSWRConfig } from "swr";

const fetchGuesses = async (): Promise<GuessWithId[]> => {
  const res = await fetch("/api/guesses");
  const data = await res.json();
  return data.guesses.map((g: any) => new GuessWithId(g));
};

export const CalendarPage = () => {
  const { socket } = useContext(AppContext);
  const { mutate } = useSWRConfig();

  const { data: guesses = [] } = useSwr<GuessWithId[]>(
    "/api/guesses",
    fetchGuesses
  );

  useEffect(() => {
    const messageListener = async (event: WebSocketEventMap["message"]) => {
      const messageText = await event?.data?.text();
      const messageJson = JSON.parse(messageText);
      const newGuess = new GuessWithId(messageJson);
      mutate("/api/guesses", [...guesses, newGuess]);
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
