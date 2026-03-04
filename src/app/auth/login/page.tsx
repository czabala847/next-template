import LoginForm from '@/modules/public/auth/presentation/components/LoginForm'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/presentation/components/ui/card"

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
        <LoginForm />
      </Card>
    </div>
  );
}