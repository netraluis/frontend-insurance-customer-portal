"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log({ email });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 font-sans">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-6"
        autoComplete="off"
      >
        <div className="text-center">
          <h1 className="text-[28px] font-bold leading-tight mb-1 font-sans" style={{fontFamily: 'Geist, Inter, sans-serif'}}>Create an account</h1>
          <p className="text-zinc-500 text-[16px] leading-normal font-normal mb-0 mt-0 font-sans" style={{fontFamily: 'Geist, Inter, sans-serif'}}>Enter your email below to create your account</p>
        </div>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 text-base"
        />
        <Button
          className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-base font-medium rounded-md transition-colors"
          type="submit"
        >
          Sign In with Email
        </Button>
        <p className="text-xs text-center text-zinc-500 mt-2 font-sans" style={{fontFamily: 'Geist, Inter, sans-serif', fontSize: '12px', lineHeight: '18px'}}>
          By clicking continue, you agree to<br />
          our <Link href="#" className="underline underline-offset-4 hover:text-zinc-900">Terms of Service</Link> and <Link href="#" className="underline underline-offset-4 hover:text-zinc-900">Privacy Policy</Link>.
        </p>
      </form>
    </div>
  );
} 