'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useGoogleAuth } from "@/hooks/useGoogleAuth"

// Define possible user roles
type UserRole = 'guest' | 'user' | 'admin' 

export function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<UserRole>('guest')
  const router = useRouter()
  const { logout } = useGoogleAuth()

  useEffect(() => {
    const authenticated = Cookies.get('userAuthenticated') === 'true'
    if (authenticated) {
      const email = Cookies.get('userEmail')
      const firstName = Cookies.get('firstName') || email?.split('@')[0] || 'Usuario'
      setFirstName(firstName)
      const role = Cookies.get('userRole')
      setUserRole(role === 'admin' ? 'admin' : 'user')
    } else {
      setUserRole('guest')
    }
  }, [])

  const handleLogout = async () => {
    await logout()
    setUserRole('guest')
    setFirstName(null)
    router.push('/')
  }

  const isLoggedIn = userRole !== 'guest'

  const renderNavLinks = () => {
    switch (userRole) {
      case 'admin':
        return (
          <>
            <Link href="/dashboard" className="text-base font-medium hover:text-gray-300">
              Dashboard
            </Link>
            <Link href="/clients" className="text-base font-medium hover:text-gray-300">
              Clientes
            </Link>
            <Link href="/projects" className="text-base font-medium hover:text-gray-300">
              Proyectos
            </Link>
            <Link href="/employees" className="text-base font-medium hover:text-gray-300">
              Empleados
            </Link>
            <Link href="/settings" className="text-base font-medium hover:text-gray-300">
              Configuración
            </Link>
          </>
        )
      case 'user':
        return (
          <>
            <Link href="/dashboard" className="text-base font-medium hover:text-gray-300">
              Dashboard
            </Link>
            <Link href="/projects" className="text-base font-medium hover:text-gray-300">
              Proyectos
            </Link>
            <Link href="/calls" className="text-base font-medium hover:text-gray-300">
              Llamadas
            </Link>
          </>
        )
      case 'guest':
      default:
        return (
          <>
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
          </>
        )
    }
  }

  const renderActionButtons = () => {
    if (userRole === 'guest') {
      return (
        <>
          <Button
            asChild
            variant="outline"
            className="bg-black border-white text-white hover:bg-gray-200"
          >
            <Link href="/orgSignUp">Crear Organización</Link>
          </Button>
          <Button asChild className="bg-white text-[#000000] hover:bg-gray-200">
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
        </>
      )
    } else {
      return (
        <>
          <div className="text-white mr-4">Hola, {firstName}</div>
          <Button
            variant="outline"
            className="bg-black border-white text-white hover:bg-gray-200"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </>
      )
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#000000] text-white shadow-sm h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        {/* Logo Section */}
        <div className="font-bold text-xl text-white flex items-center">
          <Link href={userRole === 'guest' ? '/' : '/dashboard'} className="flex items-center">
            <span className="text-2xl font-bold tracking-tighter">teamtrack</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="ml-8 hidden md:flex items-center space-x-5">
          {renderNavLinks()}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden flex items-center" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Action Buttons - Desktop */}
      <div className="hidden md:flex items-center space-x-3">
        {renderActionButtons()}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#000000] p-4 flex flex-col space-y-3 md:hidden shadow-md">
          <div className="flex flex-col space-y-3">
            {renderNavLinks()}
          </div>
          <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
            {renderActionButtons()}
          </div>
        </div>
      )}
    </header>
  )
}