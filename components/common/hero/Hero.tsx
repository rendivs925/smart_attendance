"use client";
import React from "react";
import HeroContent from "@/components/common/hero/HeroContent";
import HeroButton from "@/components/common/button/HeroButton";

const Hero: React.FC = () => (
  <section className="relative h-screen flex items-center justify-center text-white bg-cover bg-center">
    <div className="flex flex-col items-start text-center px-6 z-10">
      <HeroContent />
      <HeroButton />
    </div>
  </section>
);

export default Hero;
