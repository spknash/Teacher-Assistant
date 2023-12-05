import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/projects";
import exp from "constants";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextApiRequest) {

    try{
        const { title, description, language, completed_repo_url, boilerplate_repo_url, ta_id,user_email } = await new Response(request.body).json();

        await connectMongoDB();

        const existingProject = await Project.findOne({ title: { $exists: true, $eq: title }, user_email: { $exists: true, $eq: user_email } });
        if(existingProject){
            return NextResponse.json({message: "Project already exists for user"});
        }
        
        await Project.create({
            title,
            description,
            language,
            completed_repo_url,
            boilerplate_repo_url,
            ta_id,
            user_email,
            status: "active"
        });
        return NextResponse.json({message: "Project created for user"});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message: "ERROR creating project"});
    }
}

export async function PATCH(request: NextApiRequest) {
    try{
        const { id, user_email, status } = await new Response(request.body).json();
        await connectMongoDB();
        await Project.findByIdAndUpdate(id, {user_email, status: status});
        console.log("Project updated for user");
        console.log(id);
        console.log(user_email);
        console.log(status);
        return NextResponse.json({message: "Project updated for user"});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message: "ERROR updating project"});
    }
}
