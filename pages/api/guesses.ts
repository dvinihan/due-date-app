// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/utils/mongodb";
import { Guess } from "@/types";

type Data = {
  guesses: Guess[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await clientPromise;
  const db = client.db("due-date");

  const guesses = await db.collection<Guess>("guesses").find({}).toArray();

  res.status(200).json({ guesses });
}
