"use client"

import { Button } from "@/shared/presentation/components/ui/button"
import {
    CardContent,
    CardFooter,
} from "@/shared/presentation/components/ui/card"
import { Input } from "@/shared/presentation/components/ui/input"
import { Label } from "@/shared/presentation/components/ui/label"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("emilys")
  const [password, setPassword] = useState("emilyspass")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError("Credenciales inválidas")
      } else {
        router.push("/products")
        router.refresh()
      }
    } catch {
      setError("Ocurrió un error inesperado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Usuario</Label>
          <Input 
            id="username" 
            type="text" 
            placeholder="Tu usuario" 
            required 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input 
            id="password" 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-sm text-red-500 text-center">
            {error}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
        <div className="mt-2 text-center text-sm">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/new-account" className="underline underline-offset-4">
            Regístrate
          </Link>
        </div>
      </CardFooter>
    </form>
  )
}
