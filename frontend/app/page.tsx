"use client";
import { Owner } from "@/constant";
import Hero from "@/components/static/Hero";
import { useUserContext } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import Testimonials from "@/components/static/Testimonials";
import Features from "@/components/static/Features";

const Home = () => {
  const { state } = useUserContext();
  const { user } = state;
  const router = useRouter();
  if (user?.role === "student") {
    router.push("/app");
  }
  return (
    <div className="flexCenter">
      <div className="container flex flex-col">
        <main className="flex flex-col justify-center gap-y-5 overflow-hidden md:gap-y-8">
          <Hero />
        </main>
        <div className="bg-base-100 py-24 sm:py-32">
          <Features />
        </div>
        {/* testimonials */}
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
