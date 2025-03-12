"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full  bg-[#000000] text-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="px-4 md:px-6">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tighter">teamtrack</span>
          </Link>
        </div>

       
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          <Link href="#features" className="text-base font-medium hover:text-gray-300">
            Funcionalidades
          </Link>
          <Link href="/orgs" className="text-base font-medium hover:text-gray-300">
            Empresas
          </Link>
          <Link href="/about-us" className="text-base font-medium hover:text-gray-300">
            Acerca de Nosotros
          </Link>
          <Link href="/demo" className="text-base font-medium hover:text-gray-300">
            Precios
          </Link>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/login" className="text-sm font-medium hover:text-gray-300">
            Iniciar Sesión
          </Link>
          <Button className="bg-white text-[#000000] hover:bg-gray-200">Crear Organización</Button>
        </div>
      </div>
    </header>
  )
}

