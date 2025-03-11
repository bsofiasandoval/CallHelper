"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NavigationBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold tracking-tighter">teamtrack</span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link 
            href="/dashboard" 
            className="text-sm font-medium hover:text-primary transition-colors px-4 py-2 rounded-md hover:bg-gray-50"
          >
            Dashboard
          </Link>
          <Link 
            href="/clientes" 
            className="text-sm font-medium hover:text-primary transition-colors px-4 py-2 rounded-md hover:bg-gray-50"
          >
            Clientes
          </Link>
          <Link 
            href="/llamadas" 
            className="text-sm font-medium hover:text-primary transition-colors px-4 py-2 rounded-md hover:bg-gray-50"
          >
            Llamadas
          </Link>
        </nav>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium hidden sm:inline-block">Hola, María</span>
          <Button 
            variant="default" 
            className="bg-black text-white hover:bg-gray-800 text-sm px-4 py-2 h-9"
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </header>
  )
}