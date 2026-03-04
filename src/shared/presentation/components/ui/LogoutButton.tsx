"use client";

import { signOut } from "next-auth/react";
import { Button } from "./button";

export const LogoutButton = () => {
  return (
    <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
      Cerrar sesión
    </Button>
  );
};
