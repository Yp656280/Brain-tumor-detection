"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { motion } from "framer-motion";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { IconWrapper } from "@/components/icons";
import {
  FadeIn,
  StaggeredFadeIn,
  StaggeredItem,
} from "@/components/animations";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = "Email is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        // Here you would typically make an API call to authenticate the user
        const response = await fetch(`http://localhost:3000/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await response.json();
        if (data.success) {
          router.replace("/");
        } else {
          setFormData({ email: formData.email, password: "" });
          setErrors({
            email: "Enter Correct Email",
            password: "Enter Correct Password",
          });
        }
        console.log("Form submitted:", formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      <StarsBackground className=" bg-black z-10" />
      <ShootingStars className="  z-10" />
      {/* <BackgroundBeams className=" bg-black z-10" /> */}
      <div
        className=" h-full w-full  z-20 relative bg-transparent"
        style={{ zIndex: "200000 !important" }}
      >
        <FadeIn>
          <div className="min-h-screen flex items-center justify-center z-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <StaggeredFadeIn>
                <StaggeredItem>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-400">
                    Sign in to your account
                  </h2>
                </StaggeredItem>
                <StaggeredItem>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Or{" "}
                    <Link
                      href="/signup"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      create a new account
                    </Link>
                  </p>
                </StaggeredItem>
              </StaggeredFadeIn>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <StaggeredFadeIn>
                  <StaggeredItem>
                    <Input
                      name="email"
                      type="email"
                      label="Email address"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className=" rounded-[6px] mt-4 mb-4 "
                      error={errors.email}
                    />
                  </StaggeredItem>
                  <StaggeredItem>
                    <Input
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      error={errors.password}
                      className=" rounded-[6px] mt-4 mb-4 "
                    />
                  </StaggeredItem>
                  <StaggeredItem>
                    <Button
                      type="submit"
                      className=" rounded-[6px] bg-transparent hover:bg-transparent w-full"
                    >
                      Sign in
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1,
                        }}
                      >
                        <IconWrapper name="arrowRight" className="h-4 w-4" />
                      </motion.div>
                    </Button>{" "}
                  </StaggeredItem>
                </StaggeredFadeIn>
              </form>
            </div>
          </div>{" "}
        </FadeIn>
      </div>{" "}
    </>
  );
}
