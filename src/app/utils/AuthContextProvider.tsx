'use client'

import { auth } from '@/firebaseConfig';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextProviderProps = {
  children: React.ReactNode;
}

type AuthContext = {
  user: any;
  setUser: React.Dispatch<any>
}

export const AuthContext = createContext<AuthContext | null>(null)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
        console.log("we dont have a user")
      }
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      "use context inside context provider"
    )
  }
  return context
}

