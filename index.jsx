import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './app.jsx'
import './index.css'

// Ganti dengan Google Client ID Anda dari Google Cloud Console
// Lihat instruksi di bawah untuk mendapatkan Client ID
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="772465250468-88ded9nf6f44brcmq36gj6ljcu5isud0.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
