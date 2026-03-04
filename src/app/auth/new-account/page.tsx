import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/presentation/components/ui/card"
import { RegisterForm } from "@/modules/public/auth/presentation/components/RegisterForm"

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
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}