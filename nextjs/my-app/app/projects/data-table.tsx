"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NextRouter, Router } from "next/router"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  
}

export function DataTable<TData, TValue,TRouter>({
  columns,
  data,
  
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onColumnFiltersChange: setColumnFilters,
    state: {
        columnFilters,
        },
  })

  return (
    <div>
        {/* Filter container */}
        <div className="flex items-center py-4">
            <Input 
            placeholder="Filter Titles"
            value = {table.getColumn("title")?.getFilterValue() as string || ""}
            onChange= {(e) =>{
                table.getColumn("title")?.setFilterValue(e.target.value);
            }}
            className="max-w-sm"
            />

        </div>
        {/* Table container */}
        <div className="rounded-md border">
      <Table>
    
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-start space-x-2 py-5">
            <Button variant="outline" size="sm" onClick={()=>{
                table.previousPage()
            }}
            disabled = {!table.getCanPreviousPage()}> Previous </Button>
            <Button variant="outline" size="sm" onClick={()=>{
                table.nextPage()
            }}
            disabled = {!table.getCanNextPage()}> Next </Button>



        </div>


    </div>
  )
}
