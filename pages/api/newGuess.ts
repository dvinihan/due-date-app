import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/utils/mongodb";
import { GuessWithoutId } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const newGuess = new GuessWithoutId(JSON.parse(req.body));

  const db = client.db("due-date");
  const guesses = db.collection("guesses");
  const { insertedId } = await guesses.insertOne(newGuess);

  res.send({ newGuessId: insertedId.toString() });
}
