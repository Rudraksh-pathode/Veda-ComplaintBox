
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mountain } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <span className="text-lg font-semibold">My complain box</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="#home"
            className="text-muted-foreground transition-colors hover:text-foreground"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#contact"
            className="text-muted-foreground transition-colors hover:text-foreground"
            prefetch={false}
          >
            Contact Us
          </Link>
        </nav>
        <div className="flex items-center gap-4">
           <Link href="/login" passHref>
             <Button variant="outline" className="hidden md:inline-flex">Admin Login</Button>
           </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 p-4">
                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                    <span className="text-lg font-semibold">My complain box</span>
                </Link>
                <nav className="grid gap-2 text-base font-medium">
                    <Link
                        href="#home"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted"
                        prefetch={false}
                    >
                        Home
                    </Link>
                    <Link
                        href="#contact"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted"
                        prefetch={false}
                    >
                        Contact Us
                    </Link>
                </nav>
                 <Link href="/login" passHref>
                   <Button variant="outline" className="w-full">Admin Login</Button>
                 </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
