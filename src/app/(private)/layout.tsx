import { Header } from "@/common/presentation/components"
import React from "react"

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default PrivateLayout;
