"use client";
import { CardForm } from "@/components/card";
import { Header } from "@/components/header";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto p-5">
      <Header />
      <CardForm />
    </div>
  );
}
