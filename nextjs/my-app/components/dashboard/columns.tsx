"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useToast } from "../ui/use-toast"
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
import { time } from "console"
import { useRouter } from "next/router"
import upArrow from "public/uparrow.svg"
import Image from "next/image"
import githubLogo from "public/github.svg"
import chat from "public/chat.svg"
import check from "public/check.svg"
import x from "public/x.svg"

export type Project = {
    _id: string
    title: string
    description: string,
    language: string,
    completed_repo_url: string,
    boilerplate_repo_url: string,
    ta_id: string,
    __v: number,
    user_email: string,

}

async function handleCompleteProjectButton(project: Project){
    try{
        const res = await fetch(`http://localhost:3000/api/projects/user`, {
            cache: "no-store",
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: project._id,user_email:project.user_email ,status: "completed"}),
            
        });

        if (!res.ok) {
            throw new Error("Failed to complete project");
        }
        console.log("fetched projects");
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
    
    }
    catch(error){
        console.error(error);
        // Handle the error appropriately
        return [];
    }

}

async function handleMarkIncompleteButton(project: Project){
    try{
        const res = await fetch(`http://localhost:3000/api/projects/user`, {
            cache: "no-store",
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: project._id,user_email:project.user_email ,status: "active"}),
        });

        if (!res.ok) {
            throw new Error("Failed to complete project");
        }
        console.log("fetched projects");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
    }
    catch(error){
        console.error(error);
        // Handle the error appropriately
        return [];
    }

}







export const completed_columns: ColumnDef<Project>[] = [
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
                        <Image src={upArrow} alt="up arrow" />
                        Description</Button>
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
        id:"completed_repo_url",
        accessorKey: "completed_repo_url",
        cell: ({ row }) => {
            return (
                <a href={row.original.completed_repo_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost">
                            <Image src={githubLogo} alt="github logo" width={20} height={20} className="p-1"/>
                            View Completed Repo
                        </Button>
                        
                </a>
            )
        }
    },

    {
        id: "butons",
        cell: ({ row }) => {
            const {toast} = useToast();
            
            return (
                
                <Button variant="destructive" onClick={()=>{

                    toast({title:"Project Marked as Incomplete", description:row.original.title + " has been marked as incomplete"})
                    handleMarkIncompleteButton(row.original)
                
                    }
                    }>
                    <Image src={x} alt="check" width="25" height="25" className="px-1"/>
                    Mark as Incomplete
                </Button>
                
            )
        }

    },
    
]

export const active_columns: ColumnDef<Project>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row}) => {
            return (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        
                        <Button variant="ghost">
                            <Image src={upArrow} alt="up arrow" />
                            Description</Button>
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
        id:"completed_repo_url",
        accessorKey: "completed_repo_url",
        cell: ({ row }) => {

            return (
                <a href={row.original.boilerplate_repo_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost">
                        <Image src={githubLogo} alt="github logo" width={20} height={20} className="p-1"/>
                            View Boilerplate Repo
                        </Button>
                        
                </a>
                
            )
        }
    },

    {
        id: "butons",
        cell: ({ row }) => {
            const {toast} = useToast();
            
            
            return (
                
                <div className="flex justify-center items-center space-x-2">
                    <Button variant="outline" onClick={()=>{
                        toast({title:"Project Completed", description:row.original.title + " has been marked as complete"})
                        handleCompleteProjectButton(row.original)
                    }}>
                       <Image src={check} alt="check" width="25" height="25" className="px-1"/>
                        Complete Project</Button>
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




    