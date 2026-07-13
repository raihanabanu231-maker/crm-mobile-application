# Perfect Flow 360: Project Architecture & Understanding

*This document outlines the complete architecture, workflows, and technical decisions for Perfect Flow 360, an enterprise mobile application I built to track and manage our active field force.*

## 1. High-Level Vision (What I Built)
I designed **Perfect Flow 360** to be the central internal hub for our field agents and managers. The primary goal was to replace fragmented Excel sheets and manual WhatsApp updates with a single, secure mobile application. 

It handles four major pillars:
1. **Attendance & Location Tracking**: Forcing GPS validation to ensure agents are where they say they are.
2. **Daily Call Reports (DCR)**: A dynamic, highly-structured reporting engine for field visits.
3. **Leave & Regularization Management**: An internal approval workflow for HR operations.
4. **Team Communication**: Built-in chat, video calling, and automated "Team Space" for birthdays/anniversaries.

## 2. Core Architecture & Tech Stack

### Frontend (Mobile App)
I built the mobile application using **React Native (v0.81)** and **Expo (v54)** to ensure a unified codebase for both iOS and Android. I rely heavily on Expo's managed workflow and native modules.
- **Language**: TypeScript for strict type-safety across API responses and component props.
- **UI/UX**: Custom themed components, `react-native-svg` for performant iconography, and custom bottom-tab navigation with scroll-based hide/show animations.
- **Native Integrations**: 
  - `expo-location` for mandatory GPS coordinates during check-ins.
  - `expo-local-authentication` to enforce secure login via FaceID/Fingerprint.
  - `expo-image-picker` & `expo-document-picker` for uploading field evidence (e.g., software installation docs, delivery copies).
- **Build System**: Expo Application Services (EAS). The project ID is configured in `app.json`, and the Android package is `com.perfectflow360.mobile`.

### Backend & API Layer
- **Environment**: A custom Node.js/Express backend running in production at `https://perfectflow360.atplgroup.org/api` (previously on Render).
- **Communication Layer**: I wrote a custom `apiClient.ts` wrapper around the native `fetch` API. It automatically intercepts requests, attaches the JWT Bearer token from `AsyncStorage`, and handles `FormData` seamlessly for multipart uploads (like images and PDFs).
- **Real-Time Data**: I integrated `socket.io-client` (v4.6) for live chat messaging and WebRTC video call signaling.

---

## 3. Core Workflows (How the System Operates)

### 3.1 Authentication & Security
When an employee opens the app, I first check for a valid JWT in `AsyncStorage`. If present, I trigger the device's native Biometrics (FaceID/Fingerprint) before allowing access to the `HomeScreen`.

### 3.2 GPS-Enforced Attendance
1. **Check-In**: The user must tap "Check In". I intercept this, request high-accuracy GPS coordinates (`lat`/`lng`), and send it to `/attendance/check-in`. 
2. **Regularization**: If an employee forgets to check in, they can request a "Regularization". This goes into a pending state. Managers view this in their "Approvals" feed and can approve/reject it.
3. **Check-Out**: Similar to check-in, GPS is recorded to calculate total active hours.

### 3.3 Dynamic Daily Call Reports (DCR)
This is the most complex module I built. Field agents use this to log client visits. 
1. **Customer Resolution**: I implemented a debounced search function that queries our `/customers` endpoint. It auto-fills existing customer details to prevent duplicates.
2. **Dynamic Fields based on Work Nature**: 
   - If they select **Software Enquiry**, the form renders Document/Image upload fields.
   - If they select **Material Delivery**, I require a Delivery Doc Number and Out Time.
   - If they select **Hardware**, I mandate Serial Number, Brand, and OEM tracking.
3. **Follow-ups & Statuses**: If a task is marked as "Pending" or "In Progress", I require a `followUpDate`. Future updates are appended as historical logs rather than overwriting the original report.

### 3.4 Internal Team Space & Communication
To improve company culture, I built a `TeamSpaceView`. It automatically pulls from `/wishesApi` to display work anniversaries and birthdays. 
For operations, I integrated a complete chat and video call interface (`MessageListScreen`, `ChatScreen`, `VideoCallScreen`) so agents don't have to leave the app to ask for technical support from the backend team.

---

## 4. State Management & Navigation Structure
Instead of pulling in heavy routing libraries, I built a lightweight state-machine router in `App.tsx`:
`const [currentScreen, setCurrentScreen] = useState<'LOGIN' | 'HOME' | 'APPLY_LEAVE' | 'SETTINGS' | 'POLICY' | 'CHAT' | 'DAILY_CALL_REPORT' ...>`

This keeps the app incredibly fast. The `HomeScreen` acts as the main hub, passing down props and callback functions to handle deep linking (like opening a specific Daily Call Report for editing).

---

## 5. Deployment & Build Pipeline
- I manage the builds through EAS (`eas build -p android --profile production`). 
- The Android APK relies on critical permissions defined in `app.json`: `USE_BIOMETRIC`, `ACCESS_COARSE_LOCATION`, and `ACCESS_FINE_LOCATION`.
- Push notifications are scheduled locally via `expo-notifications` (e.g., daily alarms to remind users to check in/out).

## 6. Known Trade-offs & Limitations
As the architect of this system, I made a few conscious trade-offs:
1. **Offline Mode**: Because the `apiClient` relies heavily on live JWT validation and customer searches, the app is highly dependent on an active internet connection. Offline caching is minimal (only the JWT is stored).
2. **Expo Cache**: During development, `.expo` caching can cause stale UI updates. I frequently have to wipe this directory when adding new native modules.
3. **Performance on Uploads**: Uploading large PDFs for the `Software Enquiry` DCR blocks the main thread slightly. In the future, I plan to move this to a background upload task.
