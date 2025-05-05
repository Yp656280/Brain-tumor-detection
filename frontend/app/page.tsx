"use client";
import BrainTumorDetection from "@/components/brain-tumor-detection";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const words = [
    {
      text: "Brain",
      className: "text-white dark:text-white",
    },
    {
      text: "Tumor",
      className: "text-white",
    },

    {
      text: "Detection",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const logout = async () => {
    const response = await fetch(`http://localhost:3000/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (data.success) {
      router.replace("/login");
    }
  };
  return (
    <>
      {" "}
      <main className="min-h-screen py-10 px-4 sm:px-6 backdrop-blur-[2px] bg-black">
        {/* <BackgroundBeams /> */}
        <StarsBackground />
        <ShootingStars />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl flex items-center justify-center font-bold text-slate-900 dark:text-slate-50 mb-2">
              <TypewriterEffectSmooth words={words} />
            </h1>
            <p className="text-slate-400 dark:text-slate-400 max-w-2xl mx-auto">
              Upload medical images (MRI scans) to analyze and detect the
              presence of brain tumors using advanced image classification.
            </p>
          </div>
          <BrainTumorDetection />
        </div>
        <div
          className="absolute bottom-2 right-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            logout();
          }}
        >
          <button className="flex items-center gap-2 text-white opacity-70 text-md font-medium px-0 py-2  rounded-md transition duration-300">
            <span
              className={`transition-all duration-300 ${
                isHovered ? "pr-1" : "pr-0"
              }`}
            >
              Logout
            </span>
            <Image
              src="/logout.png"
              alt="Logout Icon"
              width={24}
              height={24}
              className={`transition-all duration-300 ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
            />
          </button>
        </div>
      </main>{" "}
    </>
  );
}
