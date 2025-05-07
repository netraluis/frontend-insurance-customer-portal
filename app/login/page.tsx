"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "verify">("email");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [bounceIndex, setBounceIndex] = useState<number | null>(null);
  const router = useRouter();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("verify");
  };

  const handleCodeChange = (idx: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[idx] = value;
    setCode(newCode);
    if (value && idx < 5) {
      setTimeout(() => {
        inputRefs.current[idx + 1]?.focus();
        setBounceIndex(idx + 1);
      }, 10);
    }
    if (newCode.every((c) => c.length === 1)) {
      setTimeout(() => router.push("/dashboard"), 300);
    }
  };

  const handleCodeKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      setTimeout(() => {
        inputRefs.current[idx - 1]?.focus();
        setBounceIndex(idx - 1);
      }, 10);
    }
  };

  const handleInputFocus = (idx: number) => {
    setBounceIndex(idx);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Columna izquierda: Logo y Testimonio */}
      <div className="hidden md:flex flex-col justify-between bg-[#1a1a1c] text-white w-full md:w-1/2 p-10">
        <div className="flex items-center gap-3 mt-2">
          <span className="text-2xl">⌘</span>
          <span className="text-xl font-semibold" style={{fontFamily: 'Geist, Inter, sans-serif'}}>Acme Inc</span>
        </div>
        <div className="mb-4">
          <p className="text-lg mb-2">"Acme Inc has transformed how we manage our business operations, providing unparalleled security and efficiency."</p>
          <span className="text-sm">Sofia Davis, CEO of Davis Enterprises</span>
        </div>
      </div>
      {/* Columna derecha: Login o Verificación */}
      <div className="flex flex-1 items-center justify-center bg-white px-4 font-sans">
        {step === "email" ? (
          <form
            onSubmit={handleEmailSubmit}
            className="w-full max-w-sm flex flex-col gap-6"
            autoComplete="off"
          >
            <div className="text-center mt-0">
              <h1 className="text-[28px] font-bold leading-tight mb-0 font-sans" style={{fontFamily: 'Geist, Inter, sans-serif'}}>Welcome back</h1>
              <p className="text-zinc-500 text-[16px] leading-normal font-normal mt-1 mb-2 font-sans" style={{fontFamily: 'Geist, Inter, sans-serif'}}>Enter your email to sign in to your account</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-left text-[15px] font-medium mb-1 font-sans" style={{fontFamily: 'Geist, Inter, sans-serif'}}>Email</label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base"
              />
              <span className="text-zinc-500 text-sm mt-1 font-sans" style={{fontFamily: 'Geist, Inter, sans-serif'}}>We&apos;ll send you a verification code to this email.</span>
            </div>
            <Button
              className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-base font-medium rounded-md transition-colors"
              type="submit"
            >
              Continue with Email
            </Button>
            <p className="text-xs text-center text-zinc-500 mt-2 font-sans" style={{fontFamily: 'Geist, Inter, sans-serif', fontSize: '12px', lineHeight: '18px'}}>
              By continuing, you agree to our <Link href="#" className="underline underline-offset-4 hover:text-zinc-900">Terms of Service</Link><br />
              and <Link href="#" className="underline underline-offset-4 hover:text-zinc-900">Privacy Policy</Link>.
            </p>
          </form>
        ) : (
          <form className="w-full max-w-sm flex flex-col gap-6" autoComplete="off" onSubmit={e => {e.preventDefault(); router.push('/dashboard')}}>
            <div className="text-center mt-0">
              <h1 className="text-[28px] font-bold leading-tight mb-0 font-sans" style={{fontFamily: 'Geist, Inter, sans-serif'}}>Welcome back</h1>
              <p className="text-zinc-500 text-[16px] leading-normal font-normal mt-1 mb-6 font-sans" style={{fontFamily: 'Geist, Inter, sans-serif'}}>Enter your email to sign in to your account</p>
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold mb-1 font-sans" style={{fontFamily: 'Geist, Inter, sans-serif'}}>Verify your email</h2>
              <p className="text-zinc-500 text-[15px] mb-4 font-sans" style={{fontFamily: 'Geist, Inter, sans-serif'}}>Enter the 6-digit code sent to <span className="text-zinc-700">{email}</span>.</p>
              <div className="flex gap-2 justify-center mb-4">
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    ref={el => { inputRefs.current[idx] = el; }}
                    onChange={e => handleCodeChange(idx, e.target.value)}
                    onKeyDown={e => handleCodeKeyDown(idx, e)}
                    onFocus={() => handleInputFocus(idx)}
                    className={`w-12 h-14 text-2xl text-center border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all ${bounceIndex === idx ? 'animate-highlight' : ''}`}
                    onAnimationEnd={() => setBounceIndex(null)}
                  />
                ))}
              </div>
              <Button
                className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-base font-medium rounded-md transition-colors"
                type="submit"
              >
                Verify and Sign In
              </Button>
              <div className="flex justify-between mt-2 text-[15px]">
                <button type="button" className="underline hover:text-zinc-900" onClick={() => setStep('email')}>Back to login</button>
                <button type="button" className="underline hover:text-zinc-900">Resend code</button>
              </div>
            </div>
            <p className="text-xs text-center text-zinc-500 mt-2 font-sans" style={{fontFamily: 'Geist, Inter, sans-serif', fontSize: '12px', lineHeight: '18px'}}>
              By continuing, you agree to our <Link href="#" className="underline underline-offset-4 hover:text-zinc-900">Terms of Service</Link><br />
              and <Link href="#" className="underline underline-offset-4 hover:text-zinc-900">Privacy Policy</Link>.
            </p>
          </form>
        )}
      </div>
    </div>
  );
} 