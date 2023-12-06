"use client";
import { Car } from "lucide-react";
import { User } from "../chat";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DataTable } from "@/app/projects/data-table";
import {completed_columns,active_columns, Project} from "./columns";
import { ColumnDef } from "@tanstack/react-table";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs";
import { useRouter } from "next/router";


    


interface DashboardProps {
    user: User;
    completed: Project[];
    active: Project[];
    }


export default function Dashboard({user, completed, active}: DashboardProps){
    const numActive = active.length;
    const numCompleted = completed.length;
    

    

    return (
        <div className="bg-slate-900 w-full min-h-screen"> 

            <div className="text-left px-12 pt-6">
                <h2 className="text-2xl font-bold tracking-tight text-white">Dashboard</h2>
                <p className="text-muted-foreground text-slate-500 text-m">{"Welcome " + user.name}</p>
            </div>

            <div className=" w-[600px]  py-7 px-12">
            
        
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 ">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> 
                        <CardTitle className="text-lg">Active Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">{numActive}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> 
                        <CardTitle className="text-lg">Completed Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">{numCompleted}</div>
                    </CardContent>
                </Card>
                
            
            </div>
            </div>

            <div className="text-left px-12 pt-3 ">
                <h2 className="text-xl font-bold tracking-tight text-white">My Projects</h2>
    
            </div>
            <div className="px-12 pt-2 pb-4">
                <Tabs defaultValue="active">
                    <TabsList>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>

                    <TabsContent value="active">
                        <div className="cointainer">
                        <DataTable columns={active_columns} data={active} />
                        </div>

                    </TabsContent>
                    <TabsContent value="completed">
                        <div className="cointainer">
                        <DataTable columns={completed_columns} data={completed} />
                        </div>
                    </TabsContent>
                    
                </Tabs>
            </div>
            
            
        </div>
        
    )
} 