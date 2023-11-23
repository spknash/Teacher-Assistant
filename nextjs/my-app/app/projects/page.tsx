
import {columns, Project} from "./columns"
import {DataTable} from "./data-table"
import { projects } from "./projects"
import { ThemeProvider } from "@/components/theme-provider"

export default function Projects() {

    return (
        
        <div className="w-full min-h-screen bg-slate-900">
            <div className="text-left px-12 pt-8">
                <h2 className="text-2xl font-bold tracking-tight text-white">Projects</h2>
                <p className="text-muted-foreground text-slate-500">Available Projects</p>
            </div>

            <div className="cointainer mx-auto px-12">
                <DataTable columns={columns} data={projects} />
            </div>
            
        </div>
        
    )
}