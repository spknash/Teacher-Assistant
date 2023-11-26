
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

async function sendMessage(ta_id: string, message: string, thread_id: string){
    try{
        const body = {thread_id:thread_id, message: message, ta_id: ta_id}
        console.log(body);

        const res = await fetch(`http://127.0.0.1:8080/ask`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });


        if (!res.ok) {
            throw new Error("Failed to send message");
        }
        const data = await res.json();
        console.log(data);
        return data.response  
    }
    catch(error){
        console.error(error);
        // Handle the error appropriately
        return "";
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
    const project = data.project

    const session = await auth();
    
    // Start chat
    const thread_id = await startChat() as string;
    //const message = "hello"
    //await sendMessage(project.ta_id, message, thread_id);
    if (!session?.user) return <SignIn />

    return (
        
        <div  className="flex bg-slate-900 w-full min-h-screen items-center justify-center ">
            <div >
            <Card className="h-[600px] w-[900px] grid grid-rows-[min-content_1fr_min-content]">
                <CardHeader>
                    <CardTitle>{project.title + " Assistant"}</CardTitle>
                    <CardDescription> Ask any questions regarding your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div>
                        <Avatar className="w-8 h-8">
                            {session.user.image && (
                            <AvatarImage
                                src={session.user.image}
                                alt={session.user.name ?? ""}
                            />
                            )}
                            <AvatarFallback>{session.user.email}</AvatarFallback>
                        </Avatar>
                    </div>
                    
                    <div>

                    </div>
                </CardContent>
                <CardFooter className="space-x-2">
                    <Input type="text" placeholder="Ask a question" />
                    <Button type="submit" >Send</Button>
                </CardFooter>


            </Card>
            </div>
            
        </div>
    )
}
    
