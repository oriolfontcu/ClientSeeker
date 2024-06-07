import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const TrustedUsers = () => {
    return (
        <div className="flex flex-row">
            <Avatar className="-ml-2 border-2 border-secondary">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="-ml-2 border-2 border-secondary">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="-ml-2 border-2 border-secondary">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="-ml-2 border-2 border-secondary">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="-ml-2 border-2 border-secondary">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}