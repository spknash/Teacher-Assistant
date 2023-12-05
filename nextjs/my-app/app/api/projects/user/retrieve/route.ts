import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/projects";
import exp from "constants";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextApiRequest) {
    try{
        const {user_email, status} = await new Response(request.body).json();
        await connectMongoDB();

        const projects = await Project.find({ user_email: { $exists: true, $eq: user_email }, status: { $exists: true, $eq: status } });
        return NextResponse.json({projects});

    }
    catch(error){
        console.log(error);
        return NextResponse.json({message: "ERROR retrieving projects for user"});

    } 
}