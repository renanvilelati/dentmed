import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";

export const Header = () => {
  return (
    <div className="fixed top-0 right-0 left-0 z-[999]">
      <div className="container mx-auto flex items-center justify-between ">
        <Link href="/">
          <Image
            src={"large-logo.svg"}
            width={200}
            height={120}
            alt="logo da empresa dentmed"
          />
        </Link>

        <nav className="hidden md:flex items-center">
          <NavLinks />
        </nav>

        <MobileMenu />
      </div>
    </div>
  );
};
