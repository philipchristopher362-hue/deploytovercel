import { NextRequest, NextResponse } from "next/server";
// import Replicate from "replicate";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { prompt } = data;

    // Replicate image generation temporarily disabled
    // const replicate = new Replicate({
    //     auth: process.env.REPLICATE_API_KEY
    // });
    // const input = {
    //     prompt: prompt,
    //     output_format: 'png',
    //     output_quality: 80,
    //     aspect_ratio: '1:1'
    // };
    // const output: any = await replicate.run("black-forest-labs/flux-dev", { input });
    // const imageUrl = Array.isArray(output) ? output[0]?.toString() : output?.toString();
    // return NextResponse.json({ imageUrl });

    // Return local cover image while Replicate is disabled
    return NextResponse.json({
        imageUrl: "/bookcover2.jpg"
    });
}
