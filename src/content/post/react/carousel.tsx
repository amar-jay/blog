import * as React from "react"

import { Card, CardContent } from "@/components/shadcn/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,

} from "@/components/shadcn/ui/carousel"

function CarouselComponent() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="bg-secondary-foreground/90 hover:bg-secondary-foreground text-textColor">
                <CardContent className="flex aspect-square items-center justify-center p-32">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}


export default CarouselComponent
