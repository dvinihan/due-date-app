import { POOH_RED } from "@/constants";
import { AppContext, poohFont } from "@/pages/_app";
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
      setSuccess("Your guess was submitted!");
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
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: "480px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              margin: "15px",
              textAlign: "center",
            }}
          >
            <div className={poohFont.className} style={{ color: POOH_RED }}>
              First Name:
            </div>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          <div style={{ margin: "15px", textAlign: "center" }}>
            <div className={poohFont.className} style={{ color: POOH_RED }}>
              Last Name:
            </div>
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
          <div style={{ margin: "15px", width: "204px", textAlign: "center" }}>
            <div className={poohFont.className} style={{ color: POOH_RED }}>
              Date:
            </div>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              min="2023-05-28"
              max="2023-06-17"
              style={{ minWidth: "150px" }}
            />
            <div
              className={poohFont.className}
              style={{ fontSize: "14px", marginBottom: "4px" }}
            >
              (Baby P is due June 8!)
            </div>
          </div>
          <div style={{ margin: "15px", width: "204px", textAlign: "center" }}>
            <div className={poohFont.className} style={{ color: POOH_RED }}>
              Time:
            </div>
            <input
              type="time"
              onChange={(e) => setTime(e.target.value)}
              value={time}
              style={{ minWidth: "150px" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "15px",
            alignItems: "center",
          }}
        >
          <button onClick={handleSubmit} style={{ width: "80px" }}>
            Submit
          </button>
          {error && (
            <div style={{ color: POOH_RED, marginTop: "10px" }}>{error}</div>
          )}
          {success && (
            <div style={{ color: "darkgreen", marginTop: "10px" }}>
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
