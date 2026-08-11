# Consent-based Camera & Microphone Call

This project creates a two-person WebRTC call. The participant's browser must explicitly grant
camera and microphone permission.

## Run locally

1. Install Node.js 18+.
2. Open a terminal in this folder.
3. Run:
   npm install
   npm start
4. Open http://localhost:3000

For two different devices, deploy the app to a server with HTTPS. Camera/microphone access on
normal mobile browsers requires a secure context (HTTPS), except localhost.

## Important

This app does NOT secretly activate a camera or microphone. Browser permission is required.
The demo uses a public Google STUN server. For reliable connections across restrictive networks,
a TURN server should be added in production.
