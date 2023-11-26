import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/projects";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
    message: string
  }

export async function POST(request: NextApiRequest) {
    try{
        const { title, description, language, completed_repo_url, boilerplate_repo_url, ta_id } = await new Response(request.body).json();
        console.log(title);
        console.log("😝");
        await connectMongoDB();

        await Project.create({
            title,
            description,
            language,
            completed_repo_url,
            boilerplate_repo_url,
            ta_id
        });
        return NextResponse.json({message: "Project created"});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message: "ERROR creating project"});
    }
    
}

export async function GET() {
    await connectMongoDB();

    const projects = await Project.find();
    return NextResponse.json({projects});
}
