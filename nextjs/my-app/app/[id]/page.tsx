
import { projects } from "../projects/projects";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage , AvatarFallback} from "@/components/ui/avatar";
import {auth} from "auth";
import { SignIn, SignOut } from "@/components/auth-components";
import { Project } from "../projects/columns";
import  Chat  from "@/components/chat";
import { User } from "@/components/chat";

async function startChat(){
    try{
        const res = await fetch(`http://127.0.0.1:8080/start_chat`, {
            method: "GET"
        });
        
        if (!res.ok) {
            throw new Error("Failed to fetch projects");
        }
        
        const data = await res.json();
        console.log(data);
        return data.thread_id;
    }
    catch(error){
        console.error(error);
        // Handle the error appropriately
        return 0;
    }
}


async function getProjectInfo(id: string){
    try{
        const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch projects");
        }
        console.log("fetched projects");
        return await res.json();
    }
    catch(error){
        console.error(error);
        // Handle the error appropriately
        return [];
    }

}



export default async function TaChat( {params}: { params: { id: string } }){

    const id = params.id;
    const data =  await getProjectInfo(id);
    const project = data.project as Project;

    const session = await auth();
    
    // Start chat
    //const thread_id = await startChat() as string;
    //const message = "hello"
    //await sendMessage(project.ta_id, message, thread_id);

    if (!session?.user) return <SignIn />
    const thread_id = await startChat() as string;
    

    return (
        
        
        <div  className="flex bg-slate-900 w-full min-h-screen items-center justify-center py-10 ">

            <Chat user={session.user as User} project={project} thread_id={thread_id} />
        </div>
    )
}
    
