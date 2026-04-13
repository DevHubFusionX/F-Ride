import React from "react";
import LegalLayout from "@/components/legal/LegalLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | FrankRide",
  description: "Learn how FrankRide protects your privacy and handles your mobility data with integrity.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 13, 2026">
      <section>
        <h2>Our Commitment to Privacy</h2>
        <p>
          At FrankRide, we believe that mobility should never come at the cost of personal privacy. Our platform is designed as a secure coordination layer for the community, where data is treated as a temporary utility for matching, not a commodity for sale.
        </p>
      </section>

      <section>
        <h2>Data Minimality Protocol</h2>
        <p>
          We strictly adhere to the principle of data minimality. We only collect the information absolutely necessary to facilitate safe, direction-based ride matching:
        </p>
        <ul>
          <li>Verified Identity: OTP and optional government ID verification to establish trust.</li>
          <li>Synchronization Coordinates: Your destination and departure time during active searches.</li>
          <li>Transactional Data: Information required to process fair cost-splits and driver payouts.</li>
        </ul>
      </section>

      <section>
        <h2>Geospatial Integrity</h2>
        <p>
          Your movement patterns are your personal business. While we require GPS tracking to ensure the safety of the handshake and trip tracking, we do not store this data permanently.
        </p>
        <blockquote>
          "F-Ride only utilizes live location data during an active trip. Once a journey is finalized, your specific GPS path is purged from our primary matching ledger."
        </blockquote>
      </section>

      <section>
        <h2>Zero Export Policy</h2>
        <p>
          We do not sell, trade, or export your personal information to third-party advertisers or data brokers. Your profile is only visible to matched riders and drivers during the coordination phase of a trip.
        </p>
      </section>

      <section>
        <h2>Security Standards</h2>
        <p>
          All data transmitted through the FrankRide grid is encrypted using industry-standard protocols. We employ multi-factor authentication (OTP) to ensure that only you can authorize access to your sync profile.
        </p>
      </section>

      <section>
        <h2>Contact Information</h2>
        <p>
          For any inquiries regarding your data or to request a full purge of your account history, please contact our privacy office:
        </p>
        <ul>
          <li>Email: privacy@frankride.com</li>
          <li>Subject: Data Inquiry [Your Network Handle]</li>
        </ul>
      </section>
    </LegalLayout>
  );
}
