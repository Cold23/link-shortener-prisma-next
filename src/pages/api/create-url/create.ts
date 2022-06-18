import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../db/client";
import { nanoid } from "nanoid";
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") {
        res.status(500).json(JSON.stringify({ messag: "Unsopported" }))
        return;
    }
    const { link } = req.body;

    const slug = nanoid(7);


    const data = await prisma.shortLink.create({
        data: {
            url: link,
            slug: slug,
        }
    })


    res.status(201).send(JSON.stringify(slug))
}