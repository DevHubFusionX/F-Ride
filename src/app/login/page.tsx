import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | FrankRide",
  description: "Secure access to your FrankRide account and shared journeys.",
};

export default function LoginPage() {
  return (
    <AuthLayout 
      heroTitle="Secure paths. Shared journeys." 
      heroSubtitle="Access your shared network and catch a ride that’s already heading your way."
    >
      <LoginForm />
    </AuthLayout>
  );
}
