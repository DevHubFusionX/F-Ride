"use client";

import { useState } from "react";
import { EarlyAccessEmail } from "@/emails/early-access-confirmation";

export default function EmailPreview() {
  const [role, setRole] = useState<"rider" | "driver">("rider");
  const [email, setEmail] = useState("user@example.com");

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "40px 20px" }}>
      {/* Controls */}
      <div style={{ maxWidth: "800px", margin: "0 auto 30px", backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h1 style={{ margin: "0 0 20px", fontSize: "24px", fontWeight: "700", color: "#1C2A3C" }}>
          Email Preview - Early Access Confirmation
        </h1>
        
        <div style={{ display: "flex", gap: "20px", marginBottom: "15px", flexWrap: "wrap" }}>
          <div style={{ flex: "1", minWidth: "200px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1C2A3C" }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px" }}
            />
          </div>
          
          <div style={{ flex: "1", minWidth: "200px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1C2A3C" }}>
              User Role
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setRole("rider")}
                style={{
                  flex: 1,
                  padding: "10px 20px",
                  border: role === "rider" ? "2px solid #1C2A3C" : "1px solid #ddd",
                  borderRadius: "4px",
                  backgroundColor: role === "rider" ? "#1C2A3C" : "white",
                  color: role === "rider" ? "white" : "#1C2A3C",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Rider
              </button>
              <button
                onClick={() => setRole("driver")}
                style={{
                  flex: 1,
                  padding: "10px 20px",
                  border: role === "driver" ? "2px solid #1C2A3C" : "1px solid #ddd",
                  borderRadius: "4px",
                  backgroundColor: role === "driver" ? "#1C2A3C" : "white",
                  color: role === "driver" ? "white" : "#1C2A3C",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Driver
              </button>
            </div>
          </div>
        </div>
        
        <p style={{ margin: "0", fontSize: "13px", color: "#666" }}>
          Preview how the email looks for different user roles
        </p>
      </div>

      {/* Email Preview */}
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <EarlyAccessEmail email={email} role={role} />
      </div>
    </div>
  );
}
