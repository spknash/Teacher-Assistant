import connectMongoDB from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import { ObjectId } from "mongodb";

import User from "@/models/user";
import Project from "@/models/projects";
import Accounts from "@/models/acoounts";
import { use } from "react";
import mongoose, { mongo } from "mongoose";



export async function POST(request: NextApiRequest) {
    try {
        const { user_email } = await new Response(request.body).json();

        await connectMongoDB();

        const user = await User.findOne({ email: user_email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        console.log(user._id);
        // Convert ObjectId to string
        const account = await Accounts.findOne({ userId: user._id.toString() });

        if (!account) {
            return NextResponse.json({ error: "Account not found" }, { status: 404 });
        }

        return NextResponse.json( account );
    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
