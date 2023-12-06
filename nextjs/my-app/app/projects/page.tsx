
import { useEffect, useState } from 'react';
import { columns, Project } from "./columns";
import { DataTable } from "./data-table";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import upload from "/public/upload.svg";
import Image from "next/image";
import ProjectHeader from '@/components/project_header';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"


async function getProjects(user_email: string | null){
    try {
        console.log("fetching projects");
        const res = await fetch('http://localhost:3000/api/projects', {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch projects");
        }
        console.log("fetched projects");
        const projects =  await res.json();

        const modified_projects = projects.projects.map((project: Project) => {
            return {
                ...project,
                user_email: user_email,
            }
        
        });
        return modified_projects;


    } catch (error) {
        console.error(error);
        // Handle the error appropriately
        return [];
    }
}

export default async function Projects() {
    const session = await auth()

    const user = session ? session.user : null;
    const email = user? user.email as string: null;
    
    
    const projects= await getProjects(email);
    const data = projects as Project[];


    
    
    return (
        <div className="w-full min-h-screen bg-slate-900">

            <ProjectHeader />
            

            <div className="cointainer mx-auto px-12">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}
