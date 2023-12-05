"use client";


import { Project } from "@/app/projects/columns";
import {ThreeDots} from "react-loader-spinner";
import { ScrollArea } from "./ui/scroll-area";


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
import { DefaultSession } from "next-auth";
import { Session } from "inspector";
import { useState } from "react";
import { set } from "mongoose";




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

export interface User{
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}


interface ChatProps {
    project: Project;
    user: User;
    thread_id: string;

}
interface Message{
    message: string;
    role: "user"| "ai"
    
}




export default function Chat({project, user, thread_id}: ChatProps){
    const [currChat, setCurrChat] = useState<Message[]>([])
    const [userInput, setUserInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function handleUserInput(event: React.ChangeEvent<HTMLInputElement>){
        setUserInput(event.target.value);
    }

    async function handleSendMessage(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const userMessage = {message: userInput, role: "user"} as Message;

        setCurrChat([...currChat, userMessage]);
        setUserInput("");
        setIsLoading(true);

        try {
            const response = await sendMessage(project.ta_id, userInput, thread_id);
            const aiMessage = {message: response, role: "ai"} as Message;

            setIsLoading(false);
            setCurrChat(currChat => [...currChat, aiMessage]);
        }
        catch (error){
            console.error(error);
        }
    
    }


    
    return (
        <div >
            <Card className="w-[800px]">
                <CardHeader>
                    <CardTitle>{project.title + " Assistant"}</CardTitle>
                    <CardDescription> Ask any questions regarding your project</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[450px] w-full pr-4">
                    {currChat.map(message => {
                        return (
                            <div className="flex gap-3 text-sm mb-4">
                                {message.role === "user" && (
                                    <Avatar>
                                    {user.image && (
                                    <AvatarImage
                                        src={user.image}
                                        alt={user.name ?? ""}
                                    />
                                    )}
                                    <AvatarFallback>{user.email}</AvatarFallback>
                                </Avatar>
                                )}
                                {message.role === "ai" && (
                                    <Avatar>
                                    <AvatarImage src="/Ai_Avatar.png" alt="AI" />
                                    </Avatar>
                                )}

                                <p className="leading-relaxed">
                                <span className="block font-bold">{message.role ==="user" ? "You:": "Ai:"}</span>
                                {message.message}
                                </p>
                            </div>

                
                        )

                    }
                    )}
                    
                    {isLoading && (
                    <div className="flex gap-3 text-sm mb-4">
                    <Avatar>
                        <AvatarImage src="/Ai_Avatar.png" alt="AI" />
                    </Avatar>
                    <p className="leading-relaxed">
                    <span className="block font-bold">Ai:</span>
                    <ThreeDots 
                        height="35" 
                        width="35" 
                        radius="9"
                        color="white" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                    />
                    </p></div>)}
                    </ScrollArea>
                </CardContent>
                <CardFooter>
                    <form onSubmit={handleSendMessage} className="space-x-2 flex gap-2 w-full">
                    <Input type="text" placeholder="Ask a question" onChange={handleUserInput} value={userInput} />
                    <Button type="submit" >Send</Button>
                    </form>

                    
                </CardFooter>


            </Card>
            </div>
    )
    
}
