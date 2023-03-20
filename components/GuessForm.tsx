import { AppContext } from "@/pages/_app";
import { GuessWithoutId } from "@/types";
import { useContext, useState } from "react";

export const GuessForm = () => {
  const { socket } = useContext(AppContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setDate("");
    setTime("");
  };

  const handleSubmit = async () => {
    try {
      setError("");
      setSuccess("");

      if (!firstName || !lastName || !date || !time) {
        setError("Please fill in all fields");
        return;
      }

      const wholeDate = new Date(`${date} ${time}`);

      const newGuess = new GuessWithoutId({
        firstName,
        lastName,
        date: wholeDate,
      });
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
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ margin: "15px" }}>
          <div>First Name:</div>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <div style={{ margin: "15px" }}>
          <div>Last Name:</div>
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
      </div>
      <div style={{ marginTop: "30px" }}>Date:</div>
      <div style={{ fontSize: "14px", marginBottom: "4px" }}>
        (Baby P is due June 8!)
      </div>
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        min="2023-05-28"
        max="2023-06-17"
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
