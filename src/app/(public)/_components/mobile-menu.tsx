import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLinks } from "./nav-links";

export const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden" asChild>
        <Button
          className="text-black hover:bg-transparent"
          variant={"ghost"}
          size={"icon"}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[240px] sm:w-[300px] z-[9999]">
        <SheetTitle>Menu</SheetTitle>

        <nav>
          <NavLinks />
        </nav>
      </SheetContent>
    </Sheet>
  );
};
