import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavigationBar } from "@/components/navigationBar"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavigationBar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/Gradient.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                Aprovecha tus reuniones al máximo
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-xl">
                TeamTrack es una herramienta que te permite tener control total de tus reuniones, de inicio a fin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#000000] hover:bg-[#333333] text-white px-8 py-6 text-lg">
                  Crear Organización
                </Button>
                <Button variant="outline" className="border-[#a9a9a9] text-[#545454] px-8 py-6 text-lg">
                  Ver Demo
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="TeamTrack Dashboard"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      {/* Features Section */}
      <Features />
      
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
