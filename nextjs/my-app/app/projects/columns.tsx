"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"
import Link from "next/link"

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


export type Project = {
    _id: string
    title: string
    description: string,
    language: string,
    completed_repo_url: string,
    boilerplate_repo_url: string,
    ta_id: string,
    __v: number
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
                        <Button variant="ghost">Description</Button>
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
            return (
                <div className="flex justify-center items-center space-x-2">
                    <Button variant="outline">Start</Button>
                    <Link href={`/${row.original._id}`}>
                   <Button variant="default" >Talk to Ta</Button>
                   </Link>
                </div>
            )
        }

    },
    
]
    