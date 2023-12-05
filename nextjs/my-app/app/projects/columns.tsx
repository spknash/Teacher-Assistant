"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"
import Link from "next/link"
import { auth } from 'auth';
import upArrow from "public/uparrow.svg"
import Image from "next/image"
import chat from "public/chat.svg"
import start from "public/start.svg"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Router } from "lucide-react"
import { User } from "@/components/chat"
import { useToast } from "@/components/ui/use-toast"


export type Project = {
    _id: string
    title: string
    description: string,
    language: string,
    completed_repo_url: string,
    boilerplate_repo_url: string,
    ta_id: string,
    __v: number,
    user_email: string | null,

}




export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            return (
                <AlertDialog>
                    <AlertDialogTrigger asChild>

                        <Button variant="ghost">
                            <Image src={upArrow} alt="up arrow" width="20" height="20" />
                            Description
                            </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {row.original.title}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {row.original.description}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
        }
    },
    {
        accessorKey: "language",
        header: "Language",

    },
    {
        id: "butons",
        cell: ({ row }) => {
            const {toast} = useToast();
            
            async function handleStartButton(project: Project){
                if (project.user_email == null){
                    
                    toast({
                        title: "You must be logged in to start a project",
                        variant: "destructive",
                        duration: 5000,

                    });
                    return;
                }
                try{
                    const res = await fetch(`http://localhost:3000/api/projects/user`, {
                        cache: "no-store",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            title: project.title,
                            description: project.description,
                            language: project.language,
                            completed_repo_url: project.completed_repo_url,
                            boilerplate_repo_url: project.boilerplate_repo_url,
                            ta_id: project.ta_id,
                            user_email: project.user_email,
                        })
                        
                        
                    });
                    if (!res.ok) {
                        throw new Error("Failed to start project");
                    }
                    const data = await res.json();
                    if (data.message == "Project already exists for user"){
                        toast({
                            title: "Project already started for user",
                            variant: "destructive",
                            duration: 5000,
    
                        });
                    }
                    else{
                        toast({
                            title: "Project started",
                            description:"You have now started" + project.title,
                            duration: 5000,
    
                        });
                    }

                }
                catch(error){
                    console.error(error);
                    
                }
            }
                return(
                <div className="flex justify-center items-center space-x-2">
                    <Button variant="outline" onClick={()=>{
                        handleStartButton(row.original);
                    }}>
                        
                        <Image src={start} alt="start" width="25" height="25" className="px-1"/>
                        Start</Button>
                    <Link href={`/${row.original._id}`}>
                   <Button variant="default" >
                    <Image src={chat} alt="chat" width="25" height="25" className="px-1"/>
                    Talk to Ta</Button>
                   </Link>
                </div>
                )
            
        }

    },
    
]
    