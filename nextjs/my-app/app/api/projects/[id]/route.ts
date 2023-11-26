import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/projects";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest, { params }: {params: {id: string}}) {
    await connectMongoDB();

    const project = await Project.findById(params.id);
    return NextResponse.json({project});
}