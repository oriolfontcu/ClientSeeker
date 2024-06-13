import { Button } from "@/components/ui/button"
import { SaveIcon } from "lucide-react"

export const ExportButton = () => {
    return (
        <div>
            <Button variant="outline" className="border-2 border-dashed border-red-600 w-32">
                <SaveIcon className="h-4 w-4 mr-2"/>
                Export
            </Button>
        </div>
    )
}