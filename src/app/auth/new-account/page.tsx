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

export default function NewAccountPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
          <CardDescription>
            Introduce tus datos para crear una nueva cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Usuario</Label>
            <Input id="username" placeholder="johndoe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full">Registrarse</Button>
          <div className="mt-2 text-center text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link href="/auth/login" className="underline underline-offset-4">
              Inicia Sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}