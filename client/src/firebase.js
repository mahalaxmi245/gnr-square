import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAlJGMU2kNpgnqT3iSTlH4tW27EujjdAB4",
  authDomain: "gnr-square.firebaseapp.com",
  projectId: "gnr-square",
  storageBucket: "gnr-square.firebasestorage.app",
  messagingSenderId: "48589245486",
  appId: "1:48589245486:web:3053b730ec70554605a3bf"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()






 