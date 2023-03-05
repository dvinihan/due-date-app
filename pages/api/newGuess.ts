import { NextApiRequest, NextApiResponse } from "next";
import { WebSocket } from "ws";
import clientPromise from "@/utils/mongodb";
import { GuessWithId, GuessWithoutId } from "@/types";
import { WEB_SOCKET_URL } from "@/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const newGuess = new GuessWithoutId(JSON.parse(req.body));

  const db = client.db("due-date");
  const guesses = db.collection("guesses");
  const { insertedId } = await guesses.insertOne(newGuess);

  const socket = new WebSocket(WEB_SOCKET_URL);
  console.log("connected to socket from newGuess API server");
  socket.on("open", function open() {
    console.log("socket opened");
    const messageJson = JSON.stringify(
      new GuessWithId({ ...newGuess, _id: insertedId.toString() })
    );
    console.log("message sent:", messageJson);
    socket.send(messageJson);
  });
  console.log("about to send response from newGuess API");
  res.send({});
  console.log("done with newGuess API");
}
