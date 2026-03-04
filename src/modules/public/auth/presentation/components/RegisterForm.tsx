'use client';

import { Button } from "@/shared/presentation/components/ui/button"
import { Input } from "@/shared/presentation/components/ui/input"
import { Label } from "@/shared/presentation/components/ui/label"
import { useForm } from "react-hook-form"
import Link from "next/link"

interface RegisterFormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Datos del formulario:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre Completo</Label>
        <Input
          id="name"
          placeholder="John Doe"
          {...register('name', {
            required: 'El nombre completo es requerido',
            minLength: {
              value: 3,
              message: 'El nombre debe tener al menos 3 caracteres',
            },
          })}
        />
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="username">Usuario</Label>
        <Input
          id="username"
          placeholder="johndoe"
          {...register('username', {
            required: 'El usuario es requerido',
            minLength: {
              value: 3,
              message: 'El usuario debe tener al menos 3 caracteres',
            },
            pattern: {
              value: /^[a-zA-Z0-9_-]+$/,
              message: 'El usuario solo puede contener letras, números, guiones y guiones bajos',
            },
          })}
        />
        {errors.username && (
          <span className="text-sm text-red-500">{errors.username.message}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          placeholder="m@example.com"
          {...register('email', {
            required: 'El correo electrónico es requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Por favor ingresa un correo electrónico válido',
            },
          })}
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          {...register('password', {
            required: 'La contraseña es requerida',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          })}
        />
        {errors.password && (
          <span className="text-sm text-red-500">{errors.password.message}</span>
        )}
      </div>

      <Button type="submit" className="w-full">
        Registrarse
      </Button>

      <div className="mt-2 text-center text-sm">
        ¿Ya tienes cuenta?{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          Inicia Sesión
        </Link>
      </div>
    </form>
  );
}
