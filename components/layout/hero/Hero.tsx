"use client";
import React from "react";
import HeroTitle from "@/components/layout/hero/HeroTitle";
import AuthButtons from "@/components/layout/hero/AuthButtons";
import QuickActions from "@/components/layout/hero/QuickActions";

const Hero: React.FC = () => (
  <section className="relative bg-gradient-to-br from-blue-600 to-purple-500 h-screen flex items-center justify-center text-white bg-cover bg-center">
    <div className="flex flex-col items-center text-center px-6 z-10">
      <HeroTitle />
      <AuthButtons />
      <QuickActions />
    </div>
  </section>
);

export default Hero;
