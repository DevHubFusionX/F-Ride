import React from "react";
import LegalLayout from "@/components/legal/LegalLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | FrankRide",
  description: "Read the rules and standards that govern the FrankRide community and our shared mobility network.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="April 13, 2026">
      <section>
        <h2>The Shared Agreement</h2>
        <p>
          By accessing the FrankRide grid, you are joining a community dedicated to efficiency and trust. These terms govern your use of our real-time matching network and constitute a binding agreement between you and the platform.
        </p>
      </section>

      <section>
        <h2>Handshake Protocol</h2>
        <p>
          The safety of the network depends on the accuracy of identity. All users must:
        </p>
        <ul>
          <li>Provide a valid phone number or email for OTP verification.</li>
          <li>Ensure their profile representation (Name, Handle) is accurate.</li>
          <li>Successfully execute the 4-digit PIN "handshake" at every pickup.</li>
        </ul>
      </section>

      <section>
        <h2>Operational Standards</h2>
        <p>
          Users are expected to maintain professional standards of conduct during every synchronization. This includes:
        </p>
        <ul>
          <li>Strict adherence to local traffic laws and safety regulations.</li>
          <li>Mutual respect between all members of the synchronization.</li>
          <li>Punctuality: Maintaining departure times to ensure network efficiency.</li>
        </ul>
      </section>

      <section>
        <h2>Algorithmic Fairness</h2>
        <p>
          F-Ride uses a proprietary matching engine to calculate cost-splits based on route overlap. By using the app, you agree to:
        </p>
        <blockquote>
          "Cost allocations are calculated automatically by the FrankRide engine. Users must not attempt to renegotiate fares outside the platform to maintain the integrity of the network ledger."
        </blockquote>
      </section>

      <section>
        <h2>Network Health & Ratings</h2>
        <p>
          To maintain high-quality coordination, we monitor community feedback. A minimum rating of 4.0 is required for active status. Frequent cancellations or low ratings may result in temporary or permanent suspension from the grid.
        </p>
      </section>

      <section>
        <h2>Limitation of Liability</h2>
        <p>
          FrankRide is a coordination platform, not a transportation provider. While we provide the tools for verification and tracking, the responsibility for safe vehicle operation and personal conduct remains with the participating users.
        </p>
      </section>

      <section>
        <h2>Legal Inquiries</h2>
        <p>
          For full legal disclosure or to report a violation of these standards, please reach out to our legal department:
        </p>
        <ul>
          <li>Email: terms@frankride.com</li>
          <li>Subject: Standards Violation [Your Network Handle]</li>
        </ul>
      </section>
    </LegalLayout>
  );
}
