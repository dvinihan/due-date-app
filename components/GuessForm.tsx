import { AppContext } from "@/pages/_app";
import { GuessWithId, GuessWithoutId } from "@/types";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";

export const GuessForm = () => {
  const { socket } = useContext(AppContext);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [showError, setShowError] = useState(false);

  const handleSubmit = async () => {
    setShowError(false);

    if (!name || !date || !time) {
      setShowError(true);
      return;
    }

    const wholeDate = new Date(`${date} ${time}`);

    const newGuess = new GuessWithoutId({ name, date: wholeDate });
    const res = await fetch("/api/newGuess", {
      method: "POST",
      body: JSON.stringify(newGuess),
    });
    const data = await res.json();
    const { newGuessId } = data;

    const messageJson = JSON.stringify(
      new GuessWithId({ ...newGuess, _id: newGuessId })
    );
    socket?.send(messageJson);
  };

  return (
    <div>
      <div>
        <div>Name:</div>
        <input onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <div>Date:</div>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <div>Time:</div>
        <input type="time" onChange={(e) => setTime(e.target.value)} />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {showError && <div>Please fill out all fields.</div>}
    </div>
  );
};
