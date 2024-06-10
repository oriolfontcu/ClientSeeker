import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarFilledIcon } from "@radix-ui/react-icons"

export const TrustedUsers = () => {
    return (
        <div className="flex flex-row justify-center items-center">
            <div className="flex flex-row pr-2">
                <Avatar className="-ml-2 border-2 border-secondary size-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="-ml-2 border-2 border-secondary size-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="-ml-2 border-2 border-secondary size-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="-ml-2 border-2 border-secondary size-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="-ml-2 border-2 border-secondary size-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <div className="flex flex-row">
                    <StarFilledIcon color="gold" />
                    <StarFilledIcon color="gold" />
                    <StarFilledIcon color="gold" />
                    <StarFilledIcon color="gold" />
                    <StarFilledIcon color="gold" />
                </div>
                <p className="text-xs">Trusted by 20+ Marketers</p>
            </div>
        </div>
    )
}