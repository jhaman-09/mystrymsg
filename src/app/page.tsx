"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import messages from "@/messages.json";
import AutoPlay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Home = () => {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
        <section className="text-center md-8 md:mb-12">
          <h1 className="tetx-3xl md:text-5xl font-bold">
            Dive into the world of Anonymous Conversations
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Explore Mystry Message - Where your identity remains a secret.
          </p>
        </section>

        <Carousel
          className="w-full max-w-sm"
          plugins={[AutoPlay({ delay: 2000 })]}
        >
          {" "}
          {/** Carousel autoplay after every 2 sec using emabla-carousel-autoplay plugin */}
          <CarouselContent className="-ml-1">
            {messages.map((message, index) => (
              <CarouselItem
                key={index}
                className="pl-1  "
              >
                <div className="p-1">
                  <Card>
                    <CardHeader>{message.title}</CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-lg font-semibold">
                        {message.content}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>

      <footer className="text-center p-4 md:p-6 text-gray-600">
        &copy; 2024 Mystery Message. All rights reserved.
      </footer>
    </>
  );
};

export default Home;