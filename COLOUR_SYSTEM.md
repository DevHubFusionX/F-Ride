# 🎨 RideSync Colour System

This document outlines the refined, harmonious color system for the RideSync application.

## 🎨 Core Brand Colors (Primary System)

| Color Role | Hex Code | Description | Preview |
| :--- | :--- | :--- | :--- |
| **Primary Dark** | `#0F172A` | Midnight Navy: Deep background layers and headers | ![](https://singlecolorimage.com/get/0F172A/100x40) |
| **Primary** | `#3B82F6` | Electric Blue: Main brand actions and highlights | ![](https://singlecolorimage.com/get/3B82F6/100x40) |
| **Primary Light** | `#EFF6FF` | Sky Azure: Soft backgrounds and hover states | ![](https://singlecolorimage.com/get/EFF6FF/100x40) |

## ⚡ Accent Colors (Energy / Actions)

| Color Role | Hex Code | Description | Preview |
| :--- | :--- | :--- | :--- |
| **Success** | `#10B981` | Emerald Green: Completed rides, availability | ![](https://singlecolorimage.com/get/10B981/100x40) |
| **Warning** | `#F59E0B` | Golden Amber: Pending, notifications | ![](https://singlecolorimage.com/get/F59E0B/100x40) |
| **Danger** | `#F43F5E` | Vibrant Rose: Cancellations, errors | ![](https://singlecolorimage.com/get/F43F5E/100x40) |

## 🧠 Neutral System (UI Structure)

| Color Name | Hex Code | Preview |
| :--- | :--- | :--- |
| **White** | `#FFFFFF` | ![](https://singlecolorimage.com/get/FFFFFF/100x40) |
| **Off White** | `#F8FAFC` | ![](https://singlecolorimage.com/get/F8FAFC/100x40) |
| **Light Gray** | `#E2E8F0` | ![](https://singlecolorimage.com/get/E2E8F0/100x40) |
| **Muted Gray** | `#94A3B8` | ![](https://singlecolorimage.com/get/94A3B8/100x40) |
| **Almost Black** | `#020617` | ![](https://singlecolorimage.com/get/020617/100x40) |

---

## 🛠️ Implementation

The colors are defined as CSS variables in [colour-system.css](file:///c:/Users/fanya/Desktop/Projects/frankride-app/src/app/colour-system.css) and are fully integrated with Tailwind 4 utility classes.

**Tailwind Usage:**
```html
<button class="bg-primary text-white hover:bg-primary-dark transition-all">
  Action Button
</button>
```
