import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../db/client";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const slug = req.query["slug"];

    if (!slug || typeof slug !== "string") {
        res.status(404).json(JSON.stringify({ message: "Use a slug" }));
        return
    }

    const data = await prisma.shortLink.findFirst({
        where: {
            slug: {
                equals: slug
            }
        }
    })

    if (!data) {
        res.status(404).json(JSON.stringify({ message: "Slug not found" }));
        return
    }

    res.status(200).send(JSON.stringify({ url: data.url }))
}