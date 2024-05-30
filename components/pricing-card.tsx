import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { title } from "process"
import Link from "next/link"
import { constants } from "@/constants"

type PricingCardProps = {
    title: string,
    price: number,
    description: string,
    features: string[],
    actionLabel: string
    exclusive: boolean,

}

const PricingCard = ({ title, price, description, features, actionLabel, exclusive }: PricingCardProps) => (
    <Card
      className={cn(`w-72 flex flex-col justify-between py-1 mx-auto sm:mx-0`, {
        "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
          exclusive,
      })}>
      <div>
        <CardHeader className="pb-8 pt-4">
          {price ? (
            <div className="flex justify-between">
              <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
            </div>
          ) : (
            <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
          )}
          <div className="flex gap-0.5">
            <h3 className="text-3xl font-bold">{price} €</h3>
          </div>
          <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {features.map((feature: string) => (
            <CheckItem key={feature} text={feature} />
          ))}
        </CardContent>
      </div>
      <CardFooter className="mt-2">
        <Link href={constants.payment.lifeTimePayment} className="relative inline-flex w-full items-center justify-center rounded-md bg-slate-900 text-white dark:bg-white px-6 font-medium  dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <Button variant="default" className="text-white">
            <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
            {actionLabel}
            </Button>
        </Link>
      </CardFooter>
    </Card>
  )

  const CheckItem = ({ text }: { text: string }) => (
    <div className="flex gap-2">
      <CheckCircle2 size={18} className="my-auto text-green-400" />
      <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
    </div>
  )

export const PricingCardComponent = () => { 

    const plans = [
        {
            title: "",
            price: 29.99,
            description: "Acceso completo a todas las funciones de ClientSeeker.io con soporte premium incluido",
            features: ["Consultas ilimitadas", "Soporte 24/7"],
            actionLabel: "Pagar",
            exclusive: true,
          },
    ]
    
    return (
        <div className="py-8">
        <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
            {plans.map((plan) => {
                return <PricingCard key={title} {...plan}/>
            })}
        </section>
        </div>
    )
}