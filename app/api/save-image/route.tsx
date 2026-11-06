import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client directly with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { url } = data;

    // Supabase storage upload bypassed — returning original image URL directly
    // const imageBuffer = await convertImage(url);
    // const fileName = `ai-story/${Date.now()}.png`;
    // const { data: uploadData, error } = await supabase.storage
    //     .from('story-images')
    //     .upload(fileName, imageBuffer!, { contentType: 'image/png' });
    // if (error) {
    //     console.log("Error uploading to Supabase:", error);
    //     return NextResponse.json({ error: error.message }, { status: 500 });
    // }
    // const { data: urlData } = supabase.storage
    //     .from('story-images')
    //     .getPublicUrl(fileName);
    // return NextResponse.json({ imageUrl: urlData.publicUrl });

    return NextResponse.json({ imageUrl: url });
}

const convertImage = async (imageUrl: string) => {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        return Buffer.from(response.data);
    } catch (e) {
        console.log("Error converting image", e);
    }
};











// import { storage } from "@/config/firebaseConfig";
// import axios from "axios";
// import { getDownloadURL, ref, uploadString } from "firebase/storage";
// import { NextRequest, NextResponse } from "next/server";

// export async function  POST(req:NextRequest) {
//     const data=await req.json();
//     const {url}=data;

//     const base64Image="data:image/png;base64,"+await convertImage(url)
//     console.log(base64Image)
//     const fileName='/ai-story/'+Date.now()+".png"
//     const imageRef=ref(storage,fileName);

//     await uploadString(imageRef,base64Image,'data_url').then((snapshot)=>{
//         console.log('File Upladed');
//     });

//     const downloaderUrl=await getDownloadURL(imageRef);
//     console.log(downloaderUrl);

//     return NextResponse.json({imageUrl:downloaderUrl})

// }   

//  const convertImage=async(imageUrl:string)=>{
//     try{
//         const respose=await axios.get(imageUrl,{responseType:'arraybuffer'});
//         const base64Image=Buffer.from(respose.data).toString('base64');
//         return base64Image;
//     }catch(e)
//     {
//         console.log("Error coverting base 64 image")
//     }
// }