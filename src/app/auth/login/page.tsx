import { Button } from "@/shared/presentation/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/presentation/components/ui/card"
import { Input } from "@/shared/presentation/components/ui/input"
import { Label } from "@/shared/presentation/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa tu usuario y contraseña para acceder.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Usuario</Label>
            <Input id="username" type="text" placeholder="Tu usuario" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full">Ingresar</Button>
          <div className="mt-2 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <Link href="/auth/new-account" className="underline underline-offset-4">
              Regístrate
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}