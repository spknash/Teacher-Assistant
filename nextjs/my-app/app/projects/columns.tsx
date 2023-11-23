"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"


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

export type Project = {
    id: string
    title: string
    description: string,
    language: string
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
                    <Button variant="default">Talk to Ta</Button>
                </div>
            )
        }

    },
    
]
    