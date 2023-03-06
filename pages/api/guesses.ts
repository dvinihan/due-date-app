// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/utils/mongodb";
import { GuessWithoutId } from "@/types";

type Data = {
  guesses: GuessWithoutId[];
};
type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const client = await clientPromise;
  const db = client.db("due-date");

  const guesses = await db
    .collection<GuessWithoutId>("guesses")
    .find({})
    .toArray();

  res.status(200).json({ guesses });
}
