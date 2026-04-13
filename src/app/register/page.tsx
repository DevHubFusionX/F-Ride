import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join | FrankRide",
  description: "Create your verified identity and start sharing your journey with the community.",
};

export default function RegisterPage() {
  return (
    <AuthLayout 
      heroTitle="The future is shared." 
      heroSubtitle="Create your identity in seconds and join a community that moves together."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
