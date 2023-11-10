"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "./Logo";
import { Button } from "@nextui-org/react";
interface AuthLeftPanelProps {
  title?: string;
  subtitle?: string;
}

export default function AuthLeftPanel({ title, subtitle }: AuthLeftPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const onClick = () =>
    pathname.startsWith("/login")
      ? router.push("/register")
      : router.push("/login");
  const label = pathname.startsWith("/login") ? "Create an Account" : "Log In";
  useEffect(() => console.log("mounted"), []);
  return (
    <div className="z-10 flex h-screen flex-col border-r-[1px] border-[#F1F3F4] bg-[#F5F5F5] px-12 pt-4
                        duration-500 transition-all md:w-1/4
                        ">
      <Logo />
      <Image
        className="mt-12 mb-10"
        src="/images/AuthLeftPanelFormIcons.png"
        width={500}
        height={500}
        alt="form-graphic"
      />
      <div className="mb-5 text-xl font-semibold">{title}</div>
      <div className="mb-10">{subtitle}</div>
      <Button size="lg" onClick={onClick} disabled={false} color="secondary">
        {label}
      </Button>
    </div>
  );
}
