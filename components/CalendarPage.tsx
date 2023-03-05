import { WEB_SOCKET_URL } from "@/constants";
import { GuessWithId } from "@/types";
import Link from "next/link";
import { useEffect } from "react";
import useSwr, { useSWRConfig } from "swr";

const fetchGuesses = async (): Promise<GuessWithId[]> => {
  const res = await fetch("/api/guesses");
  const data = await res.json();
  return data.guesses.map((g: any) => new GuessWithId(g));
};

export const CalendarPage = () => {
  const { mutate } = useSWRConfig();

  const { data: guesses = [] } = useSwr<GuessWithId[]>(
    "/api/guesses",
    fetchGuesses
  );

  useEffect(() => {
    console.log("running useeffect");
    const socket = new WebSocket(WEB_SOCKET_URL);
    console.log("connected to socket from CalendarPage");
    socket.addEventListener("message", async (event) => {
      console.log("message received:", await event?.data?.text());
      const messageText = await event?.data?.text();
      const messageJson = JSON.parse(messageText);
      const newGuess = new GuessWithId(messageJson);
      console.log("setting message to guesses state");
      mutate("/api/guesses", (current) => [...current, newGuess]);
    });
    return () => {
      socket.close();
    };
  }, [mutate]);

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
