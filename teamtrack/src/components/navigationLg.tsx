"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function NavigationLg() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-tighter">teamtrack</span>
        </Link>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 pt-10">
              <Link
                href="/dashboard"
                className="text-lg font-medium hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/clientes"
                className="text-lg font-medium hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Clientes
              </Link>
              <Link href="/acerca" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                Acerca de Nosotros
              </Link>
              <Button variant="destructive" className="mt-4" onClick={() => setIsOpen(false)}>
                Cerrar Sesión
              </Button>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          <Link href="/dashboard" className="text-base font-medium hover:text-primary">
            Dashboard
          </Link>
          <Link href="/clientes" className="text-base font-medium hover:text-primary">
            Clientes
          </Link>
          <Link href="/acerca" className="text-base font-medium hover:text-primary">
            Acerca de Nosotros
          </Link>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <span className="text-sm font-medium">Hola, María</span>
          <Button variant="default" className="bg-black text-white hover:bg-gray-800">
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </header>
  )
}

