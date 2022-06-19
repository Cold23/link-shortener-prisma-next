import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../db/client";
import { nanoid } from "nanoid";
import { url } from "inspector";
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") {
        res.status(500).json(JSON.stringify({ messag: "Unsopported" }))
        return;
    }
    let { link } = req.body;

    if (!link.startsWith('http')) {
        link = `https://${link}`
    }
    const existingLink = await prisma.shortLink.findFirst({
        where: {
            url: {
                equals: link
            }
        }
    })
    if (existingLink) {
        res.status(200).send(JSON.stringify(existingLink.slug))
        return;
    }

    const slug = nanoid(7);


    const data = await prisma.shortLink.create({
        data: {
            url: link,
            slug: slug,
        }
    })


    res.status(201).send(JSON.stringify(slug))
}