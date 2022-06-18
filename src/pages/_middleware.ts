import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (req.method == "POST") {
        return
    }

    if (req.nextUrl.pathname.startsWith("/api/get-url/")) {
        console.log("returning early")
        return
    }


    const slug = req.nextUrl.pathname.split("/").pop()

    if (!slug) {
        console.log("Home page return")
        return
    }
    const data = await (await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)).json()

    console.log(data)

    if (data?.url) {
        let url = data?.url;
        if (!data?.url.startsWith('http')) {
            url = `https://${data.url}`
        }
        return NextResponse.redirect(url)
    }

}