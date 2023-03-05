import { WEB_SOCKET_URL } from "@/constants";
import { GuessWithId } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CalendarPage = () => {
  const [guesses, setGuesses] = useState<GuessWithId[]>([]);

  useEffect(() => {
    const fetchGuesses = async () => {
      const res = await fetch("/api/guesses");
      const data = await res.json();
      const guessData = data.guesses.map((g: any) => new GuessWithId(g));
      setGuesses(guessData);
    };
    fetchGuesses();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(WEB_SOCKET_URL);
    console.log("connected to socket from CalendarPage");
    socket.addEventListener("message", async (event) => {
      console.log("message received:", event?.data?.text());
      const messageText = await event?.data?.text();
      const messageJson = JSON.parse(messageText);
      const newGuess = new GuessWithId(messageJson);
      console.log("setting message to guesses state");
      setGuesses((current) => [...current, newGuess]);
    });
  }, []);

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
