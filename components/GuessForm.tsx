import { useState } from "react";
import DatePicker from "react-datepicker";

export const GuessForm = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    setShowError(false);

    if (!name || !date || !time) {
      setShowError(true);
      return;
    }

    const wholeDate = new Date(`${date} ${time}`);

    fetch("/api/newGuess", {
      method: "POST",
      body: JSON.stringify({ name, date: wholeDate }),
    });
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
