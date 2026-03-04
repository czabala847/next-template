"use client";

import { useSession } from "next-auth/react"

export const ProductResume = () => {
  const { data: session } = useSession();
  return (
    <div>
      <h2>Sesión del usuario desde el cliente</h2>
      <p className="text-sm">{JSON.stringify(session, null, 3)}</p>
    </div>
  );
};
