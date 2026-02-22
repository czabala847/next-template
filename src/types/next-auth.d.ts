import { DefaultSession } from "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string | number
      username: string
      accessToken: string
      refreshToken: string // Added
      expiresIn: number // Added
      firstName: string
      lastName: string
      gender: string
      image: string
    } & DefaultSession["user"]
    // Added to root if needed, but user object is fine
    error?: string
  }

  interface User {
    id: string | number
    username: string
    token: string // This might be the access token in dummyjson
    refreshToken?: string // Dummyjson might not return this on login, but we need it for types
    expiresIn?: number // Same
    firstName: string
    lastName: string
    gender: string
    image: string
    email: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string | number
    username: string
    accessToken: string
    refreshToken: string
    expiresIn: number
    expiresAt: number // Calculated expiration time
    firstName: string
    lastName: string
    gender: string
    image: string
    email: string
    error?: string
  }
}
