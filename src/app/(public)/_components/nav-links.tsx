import { Button } from "@/components/ui/button";
import Link from "next/link";

const navItems = [
  {
    href: "#profissionals",
    label: "Profissionais",
  },
];

export const NavLinks = () => {
  return navItems.map((item) => (
    <Button
      key={item.href}
      className="bg-transparent hover:bg-transparent text-black shadow-none"
    >
      <Link href={item.href}>{item.label}</Link>
    </Button>
  ));
};
