import { ExtendedUser } from "@/next-auth";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

interface UserInfoProps {
    user?: ExtendedUser;
};

export const UserInfo = ({
    user, 
}: UserInfoProps) => {
    return (
        <div className="grid gap-6">
        <Card x-chunk="dashboard-04-chunk-1" className="shadow-md">
            <CardContent className="space-y-4 pt-6">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">ID</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 px-2 bg-muted rounded-md">
                        {user?.id}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Name</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 px-2 bg-muted rounded-md">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Email</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 px-2 bg-muted rounded-md">
                        {user?.email}
                    </p>
                </div>
            </CardContent>
        </Card>
        <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
            <CardTitle>Plugins Directory</CardTitle>
            <CardDescription>
            The directory within your project, in which your plugins are
            located.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form className="flex flex-col gap-4">
            <Input
                placeholder="Project Name"
                defaultValue="/content/plugins"
            />
            <div className="flex items-center space-x-2">
                <Checkbox id="include" defaultChecked />
                <label
                htmlFor="include"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                Allow administrators to change the directory.
                </label>
            </div>
            </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
        </CardFooter>
        </Card>
    </div>
    )
}