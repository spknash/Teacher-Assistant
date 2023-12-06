"use client";
import { useEffect, useState } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import upload from "/public/upload.svg";
import Image from "next/image";

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

import { Input } from './ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { stat } from 'fs';
import { set } from 'mongoose';
import { useToast } from './ui/use-toast';



export default function ProjectHeader() {
    const [error, setError] = useState("");
    const [isOpen , setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");
    const [completed_repo_url, setCompleted_repo_url] = useState("");
    const [boilerplate_repo_url, setBoilerplate_repo_url] = useState("");
    const {toast} = useToast();
    const [loading, setLoading] = useState(false);


    async function createProject(){

        if (title === "" || description === "" || language === "" || completed_repo_url === "" || boilerplate_repo_url === ""){
            setError("Please fill out all fields");
            return;
        }


        try{
            const res = await fetch(`http://127.0.0.1:8080/create_ta`, {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    project_description: description,
                    language: language,
                    complete: completed_repo_url,
                    template: boilerplate_repo_url,
                })

                
                
            });

            if (!res.ok) {
                throw new Error("Failed to create project");
            }
            const status= res.status;
            if (status !== 200){
                setError("Failed to create project");
            }
            else{
                setIsOpen(false);
                toast({
                    title: "Project Created",
                    description: "Your project has been created refresh teh page to see it",
                })
                
                
            }
        }

        catch(error){
            console.error(error);
        }

    }


    return (
        <div className='flex justify-between items-center px-12 pt-8'>
                <div >
                    <h2 className="text-2xl font-bold tracking-tight text-white">Projects</h2>
                    <p className="text-muted-foreground text-slate-500">Available Projects</p>
                </div>
                <div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger>
                            <Button><Image src={upload} alt="upload"/>Create Project</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Project</DialogTitle>
                                <DialogDescription>Launch your guided project and enjoy the unique advantage of a generated AI assistant, specifically tailored to your project's needs.</DialogDescription>
                                <DialogClose />
                            </DialogHeader>
                            <div className='py-4'>

                                <p className='py-3 text-sm'>Project Title:</p>
                                <Input value={title} placeholder="Enter Project Name" onChange={(e)=> setTitle(e.target.value)} />

                                <p className='py-3 text-sm'>Project Description:</p>
                                <Input value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter Project Description" />

                                <p className='py-3 text-sm'>Programing Language:</p>
                                <Input value={language} onChange={(e)=>setLanguage(e.target.value)}placeholder="Enter Programing Language" />

                                <p className='py-3 text-sm'>Complete Repo Url:</p>
                                <Input value={completed_repo_url} onChange={(e)=>setCompleted_repo_url(e.target.value)} placeholder="Enter Repo Url" />

                                <p className='py-3 text-sm'>Boiler Plate Repo Url</p>
                                <Input value={boilerplate_repo_url} onChange={(e)=>setBoilerplate_repo_url(e.target.value)}placeholder="Enter Boiler Plate Repo Url" />

                                <p className="text-red-500 text-sm p-2">{error}</p>
                                {loading && (
                                    <div>
                                        <p className="text-white-500 text-sm p-2">Loading...</p>
                                    </div>
                                    
                                    )}


                            </div>
                            <DialogFooter>
                                <DialogClose><Button variant="destructive">Cancel</Button></DialogClose>
                                <Button variant="outline" onClick={createProject}>Submit</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    
                </div>
            </div>

    )

}



