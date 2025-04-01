'use client'
import Link from "next/link"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function NavigationAdmin
() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="px-4 md:px-6">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tighter">teamtrack</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          <Link href="/dashboardAdmin" className="text-base font-medium hover:text-primary">
            Dashboard
          </Link>
          <Link href="/clients" className="text-base font-medium hover:text-primary">
            Clientes
          </Link>
          <Link href="/callInsights" className="text-base font-medium hover:text-primary">
            Analisis de Transcripciones
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

