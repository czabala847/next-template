import { LogoutButton } from "./ui/LogoutButton";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <span className="font-semibold text-lg">Next Template</span>
      <LogoutButton />
    </header>
  );
};
