import { Guess } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [guesses, setGuesses] = useState<Guess[]>([]);

  useEffect(() => {
    const fetchGuesses = async () => {
      const res = await fetch("/api/guesses");
      const data = await res.json();
      setGuesses(data.guesses);
    };
    fetchGuesses();
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
