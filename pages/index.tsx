import { GuessWithId } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [guesses, setGuesses] = useState<GuessWithId[]>([]);

  useEffect(() => {
    const fetchGuesses = async () => {
      const res = await fetch("/api/guesses");
      const data = await res.json();
      setGuesses(data.guesses);
    };
    fetchGuesses();
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.addEventListener("message", async (event) => {
      const messageText = await event?.data?.text();
      const messageJson = JSON.parse(messageText);
      const newGuess = new GuessWithId(messageJson);
      setGuesses((current) => [...current, newGuess]);
    });
  }, []);

  return (
    <div>
      {guesses.map((guess) => (
        <div key={guess._id}>
          {guess.name}: {guess.date}
        </div>
      ))}
    </div>
  );
}
