
import { useEffect, useState } from 'react';
import { columns, Project } from "./columns";
import { DataTable } from "./data-table";
import { ThemeProvider } from "@/components/theme-provider";

async function getProjects(){
    try {
        console.log("fetching projects");
        const res = await fetch('http://localhost:3000/api/projects', {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch projects");
        }
        console.log("fetched projects");
        return await res.json();
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
        return [];
    }
}

export default async function Projects() {
    const projects= await getProjects();
    const data = projects.projects as Project[];
    
    return (
        <div className="w-full min-h-screen bg-slate-900">
            <div className="text-left px-12 pt-8">
                <h2 className="text-2xl font-bold tracking-tight text-white">Projects</h2>
                <p className="text-muted-foreground text-slate-500">Available Projects</p>
            </div>

            <div className="cointainer mx-auto px-12">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}
