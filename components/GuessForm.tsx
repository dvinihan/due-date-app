import { AppContext } from "@/pages/_app";
import { GuessWithoutId } from "@/types";
import { useContext, useState } from "react";

export const GuessForm = () => {
  const { socket } = useContext(AppContext);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const clearForm = () => {
    setName("");
    setDate("");
    setTime("");
  };

  const handleSubmit = async () => {
    try {
      setError("");
      setSuccess("");

      if (!name || !date || !time) {
        setError("Please fill in all fields");
        return;
      }

      const wholeDate = new Date(`${date} ${time}`);

      const newGuess = new GuessWithoutId({ name, date: wholeDate });
      await fetch("/api/newGuess", {
        method: "POST",
        body: JSON.stringify(newGuess),
      });

      clearForm();
      setSuccess("Great guess!");
    } catch (error) {
      setError("Oops, that didn't work. Please try again.");
    }

    // the message text doesn't matter
    socket?.send("refresh");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        fontSize: "20px",
      }}
    >
      <div style={{ marginTop: "30px" }}>Name:</div>
      <input onChange={(e) => setName(e.target.value)} value={name} />
      <div style={{ marginTop: "30px" }}>Date:</div>
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />
      <div style={{ marginTop: "30px" }}>Time:</div>
      <input
        type="time"
        onChange={(e) => setTime(e.target.value)}
        value={time}
      />

      <button onClick={handleSubmit} style={{ marginTop: "30px" }}>
        Submit
      </button>
      {error && <div style={{ color: "red", marginTop: "30px" }}>{error}</div>}
      {success && (
        <div style={{ color: "green", marginTop: "30px" }}>{success}</div>
      )}
    </div>
  );
};
