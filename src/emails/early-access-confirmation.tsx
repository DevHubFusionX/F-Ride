interface EarlyAccessEmailProps {
  email: string;
  role: "rider" | "driver";
}

export const EarlyAccessEmail = ({ email, role }: EarlyAccessEmailProps) => {
  const isDriver = role === "driver";
  
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#F5F0EB', padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '4px', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid rgba(28, 42, 60, 0.06)' }}>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#1C2A3C', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
            You're on the list.
          </h1>
        </div>

        {/* Body */}
        <div style={{ padding: '40px 48px' }}>
          <p style={{ margin: '0 0 24px', fontSize: '16px', lineHeight: '1.65', color: 'rgba(28, 42, 60, 0.7)', fontWeight: 500 }}>
            Thanks for joining F-ride early access as a <strong style={{ color: '#1C2A3C' }}>{role}</strong>.
          </p>
          
          <p style={{ margin: '0 0 24px', fontSize: '16px', lineHeight: '1.65', color: 'rgba(28, 42, 60, 0.7)', fontWeight: 500 }}>
            {isDriver 
              ? "We're building something special for drivers like you — a way to turn your daily commute into shared journeys with people heading the same direction. No detours, no hassle."
              : "We're building something special for riders like you — a way to find people already going your way. No detours, just shared journeys that make sense."
            }
          </p>

          {/* Perk Box */}
          <div style={{ margin: '32px 0', backgroundColor: 'rgba(231, 111, 50, 0.05)', borderRadius: '4px', border: '1px solid rgba(231, 111, 50, 0.1)', padding: '24px' }}>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '20px', marginRight: '8px' }}>🎉</span>
              <strong style={{ fontSize: '15px', color: '#1C2A3C', fontWeight: 700 }}>
                {isDriver ? "Priority Access" : "First Ride Free"}
              </strong>
            </div>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: 'rgba(28, 42, 60, 0.6)' }}>
              {isDriver
                ? "As an early driver, you'll get first access when we launch in your area."
                : "As an early rider, your first trip is on us when F-ride goes live."
              }
            </p>
          </div>

          <p style={{ margin: '0 0 32px', fontSize: '16px', lineHeight: '1.65', color: 'rgba(28, 42, 60, 0.7)', fontWeight: 500 }}>
            We'll email you at <strong style={{ color: '#1C2A3C' }}>{email}</strong> as soon as F-ride launches.
          </p>

          {/* CTA Button */}
          <div>
            <a href="https://frankride.com" style={{ display: 'inline-block', padding: '14px 32px', fontSize: '14px', fontWeight: 700, color: '#ffffff', textDecoration: 'none', letterSpacing: '-0.01em', borderRadius: '4px', backgroundColor: '#1C2A3C' }}>
              Learn More About F-ride
            </a>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '32px 48px', borderTop: '1px solid rgba(28, 42, 60, 0.06)', backgroundColor: 'rgba(28, 42, 60, 0.02)' }}>
          <p style={{ margin: '0 0 16px', fontSize: '24px', fontWeight: 700, color: '#1C2A3C', letterSpacing: '-0.03em' }}>
            F-ride
          </p>
          <p style={{ margin: '0 0 8px', fontSize: '13px', lineHeight: '1.6', color: 'rgba(28, 42, 60, 0.4)' }}>
            Same direction. Shared journey.
          </p>
          <p style={{ margin: '0', fontSize: '11px', lineHeight: '1.6', color: 'rgba(28, 42, 60, 0.25)' }}>
            You're receiving this because you signed up for F-ride early access.
          </p>
        </div>

      </div>
    </div>
  );
};

// HTML table version for actual email sending
export const EarlyAccessEmailHTML = ({ email, role }: EarlyAccessEmailProps) => {
  const isDriver = role === "driver";
  
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F5F0EB;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F0EB; padding: 40px 20px;">
      <tbody>
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 4px; overflow: hidden;">
            <tbody>
            <tr>
              <td style="padding: 48px 48px 32px; border-bottom: 1px solid rgba(28, 42, 60, 0.06);">
                <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #1C2A3C; letter-spacing: -0.03em; line-height: 1.1;">
                  You're on the list.
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 48px;">
                <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.65; color: rgba(28, 42, 60, 0.7); font-weight: 500;">
                  Thanks for joining F-ride early access as a <strong style="color: #1C2A3C;">${role}</strong>.
                </p>
                <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.65; color: rgba(28, 42, 60, 0.7); font-weight: 500;">
                  ${isDriver 
                    ? "We're building something special for drivers like you — a way to turn your daily commute into shared journeys with people heading the same direction. No detours, no hassle."
                    : "We're building something special for riders like you — a way to find people already going your way. No detours, just shared journeys that make sense."
                  }
                </p>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0; background-color: rgba(231, 111, 50, 0.05); border-radius: 4px; border: 1px solid rgba(231, 111, 50, 0.1);">
                  <tbody>
                  <tr>
                    <td style="padding: 24px;">
                      <div style="margin-bottom: 8px;">
                        <span style="font-size: 20px; margin-right: 8px;">🎉</span>
                        <strong style="font-size: 15px; color: #1C2A3C; font-weight: 700;">
                          ${isDriver ? "Priority Access" : "First Ride Free"}
                        </strong>
                      </div>
                      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: rgba(28, 42, 60, 0.6);">
                        ${isDriver
                          ? "As an early driver, you'll get first access when we launch in your area."
                          : "As an early rider, your first trip is on us when F-ride goes live."
                        }
                      </p>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <p style="margin: 0 0 32px; font-size: 16px; line-height: 1.65; color: rgba(28, 42, 60, 0.7); font-weight: 500;">
                  We'll email you at <strong style="color: #1C2A3C;">${email}</strong> as soon as F-ride launches.
                </p>
                <table cellpadding="0" cellspacing="0">
                  <tbody>
                  <tr>
                    <td style="border-radius: 4px; background-color: #1C2A3C;">
                      <a href="https://frankride.com" style="display: inline-block; padding: 14px 32px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; letter-spacing: -0.01em;">
                        Learn More About F-ride
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px 48px; border-top: 1px solid rgba(28, 42, 60, 0.06); background-color: rgba(28, 42, 60, 0.02);">
                <p style="margin: 0 0 16px; font-size: 24px; font-weight: 700; color: #1C2A3C; letter-spacing: -0.03em;">
                  F-ride
                </p>
                <p style="margin: 0 0 8px; font-size: 13px; line-height: 1.6; color: rgba(28, 42, 60, 0.4);">
                  Same direction. Shared journey.
                </p>
                <p style="margin: 0; font-size: 11px; line-height: 1.6; color: rgba(28, 42, 60, 0.25);">
                  You're receiving this because you signed up for F-ride early access.
                </p>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  </body>
</html>`;
};

// Plain text version for email clients that don't support HTML
export const EarlyAccessEmailText = ({ email, role }: EarlyAccessEmailProps) => {
  const isDriver = role === "driver";
  
  return `You're on the list.

Thanks for joining F-ride early access as a ${role}.

${isDriver 
  ? "We're building something special for drivers like you — a way to turn your daily commute into shared journeys with people heading the same direction. No detours, no hassle."
  : "We're building something special for riders like you — a way to find people already going your way. No detours, just shared journeys that make sense."
}

${isDriver ? "🎉 Priority Access" : "🎉 First Ride Free"}
${isDriver
  ? "As an early driver, you'll get first access when we launch in your area."
  : "As an early rider, your first trip is on us when F-ride goes live."
}

We'll email you at ${email} as soon as F-ride launches.

Learn more: https://frankride.com

---
F-ride
Same direction. Shared journey.

You're receiving this because you signed up for F-ride early access.`;
};
