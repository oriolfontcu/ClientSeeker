"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "../ui/button"

import { LoginButton } from "../auth/login-button"
import { LogoLink } from "../logo-link"
import { ModeToggle } from "../theme-toogle"

import { ArrowRightToLine } from "lucide-react"
import { Menu } from "lucide-react"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavbarLanding() {
  return (
    <nav className="w-full h-2/12 flex flex-row items-center justify-between p-10">
        <div className="hidden flex-col text-lg font-medium lg:flex md:flex-row md:items-center md:text-sm">
          <LogoLink />
          <div className="pl-20">
            <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                        <NavigationMenuLink asChild>
                        <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-secondary/50 from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                        >
                            <div className="mb-2 mt-4 text-lg font-semibold">
                            shadcn/ui
                            </div>
                            <p className="text-sm leading-tight text-foreground">
                            Beautifully designed components that you can copy and
                            paste into your apps. Accessible. Customizable. Open
                            Source.
                            </p>
                        </a>
                        </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                        Re-usable components built using Radix UI and Tailwind CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                        How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem href="/docs/primitives/typography" title="Typography">
                        Styles for headings, paragraphs, lists...etc
                    </ListItem>
                    </ul>
                </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                        <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        >
                        {component.description}
                        </ListItem>
                    ))}
                    </ul>
                </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Documentation
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <Sheet>
            <SheetTrigger asChild>
                <Button
                variant="link"
                size="icon"
                className="shrink-0 lg:hidden"
                >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                <LogoLink/>
                <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                >
                    Dashboard
                </Link>
                </nav>
            </SheetContent>
            </Sheet>
        <div className="flex flex-row items-center justify-between w-48">
            <ModeToggle/>      
            <LoginButton>
                    <Button variant="default" size="lg" className="font-semibold text-secondary">
                    Sign in <ArrowRightToLine width="18" className="ml-2"/>
                    </Button>
            </LoginButton>
        </div>
    </nav>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/70 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
