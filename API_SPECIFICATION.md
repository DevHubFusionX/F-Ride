# FrankRide — API Specification

This document outlines the API endpoints required by the FrankRide frontend to function in a production environment. The frontend is currently built with Next.js 16, Axios, and TanStack React Query.

---

## 🔒 1. Authentication & Identity
*Status: Currently mocked in UI (LoginForm/RegisterForm).*

| Endpoint | Method | Description |
|:---|:---|:---|
| `/api/auth/request-otp` | `POST` | Sends a 6-digit verification code to the user's email or phone number. |
| `/api/auth/verify-otp` | `POST` | Validates the code and returns a JWT session token and user object. |
| `/api/auth/register` | `POST` | Creates a new user profile (Rider, Driver, or Courier). |
| `/api/auth/me` | `GET` | Retrieves the current session data and profile state. |

---

## 🚗 2. Ride-Sharing & Matching
*Status: Partially implemented in `/api/trips/route.ts`.*

| Endpoint | Method | Description |
|:---|:---|:---|
| `/api/trips` | `GET` | Fetches matching rides/drivers based on route overlap, location, and destination. |
| `/api/trips` | `POST` | Executes state transitions (Accept, Reject, Cancel). |
| `/api/trips/:id` | `GET` | Retrieves real-time details for a specific active trip (ETA, driver location). |

---

## 🤝 3. Trip Lifecycle & Security
*Status: Integrated into `/api/trips` state machine.*

| Endpoint | Method | Description |
|:---|:---|:---|
| `/api/trips/arrive` | `POST` | Driver signals they have arrived at the pickup location. |
| `/api/trips/verify-pin` | `POST` | Validates the 4-digit PIN provided by the rider to start the trip. |
| `/api/trips/complete` | `POST` | Ends the journey, calculates final fare, and triggers payout. |

---

## 📦 4. Logistics & Courier
*Status: Planned vertical.*

| Endpoint | Method | Description |
|:---|:---|:---|
| `/api/courier/packages` | `GET` | Lists available items for delivery along the user's current route. |
| `/api/courier/pickup` | `POST` | Confirms package collection from the sender. |
| `/api/courier/deliver` | `POST` | Finalizes delivery and confirms receipt at the destination. |

---

## 💰 5. Financials & Wallet
*Status: Partially implemented in `/api/earnings/route.ts`.*

| Endpoint | Method | Description |
|:---|:---|:---|
| `/api/earnings` | `GET` | Fetches daily/weekly earning stats and performance metrics. |
| `/api/wallet` | `GET` | Retrieves current balance and a full transaction ledger. |
| `/api/wallet/withdraw` | `POST` | Processes instant withdrawal of funds to a linked bank account. |

---

## 📜 6. Activity & History
*Status: Partially implemented in `/api/activity/route.ts`.*

| Endpoint | Method | Description |
|:---|:---|:---|
| `/api/activity` | `GET` | Provides a paginated history of past trips, deliveries, and transactions. |

---

## 🛰️ 7. Real-time Infrastructure (Planned)
| Type | Endpoint | Description |
|:---|:---|:---|
| **WebSocket** | `/tracking` | Real-time GPS location updates for active trips on the Leaflet map. |
| **Push** | `/api/notifications` | Registration and delivery of push notifications (FCM). |

---

## Implementation Details
- **Base URL**: `/api` (Proxied to backend service)
- **Authentication**: Bearer Token (JWT) in `Authorization` header.
- **Data Validation**: [schemas.ts](file:///c:/Users/fanya/Desktop/Projects/frankride-app/src/lib/api/schemas.ts) using Zod.
- **Client**: [axios-client.ts](file:///c:/Users/fanya/Desktop/Projects/frankride-app/src/lib/api/axios-client.ts).

---
*FrankRide API Documentation · April 2026*
