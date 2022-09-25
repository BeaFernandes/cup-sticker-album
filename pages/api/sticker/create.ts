// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Sticker } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type RqError = {
  error: String;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Sticker | RqError>
) {
  if (req.method === "POST") {
    try {
      const { name, country, amount } = JSON.parse(req.body);
      if (!name || !country || !amount) throw new Error("missing data");

      const createdSticker = await prisma.sticker.create({
        data: {
          name,
          country,
          amount,
        },
      });

      const album = await prisma.album.update({
        where: { id: 1 },
        data: {
          total: { increment: amount },
          total_distinct: { increment: 1 },
          missing: { decrement: 1 },
        },
      });

      res.status(200).json(createdSticker);
    } catch (err) {
      res.status(500).json({ error: "internal server error" });
    }
  } else {
    res.status(400).json({ error: "bad request" });
  }
}
