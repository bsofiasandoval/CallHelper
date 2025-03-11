"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, FileText, BarChart2, PieChart, FileSpreadsheet, StickyNote, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SentimentChart, DurationChart, TopicsChart, KeywordsCloud } from "@/components/charts"


export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [documentText, setDocumentText] = useState("")
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)
      
      // Read text file content
      if (selectedFile.type === "text/plain") {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === 'string') {
            setDocumentText(e.target.result)
          }
        }
        reader.readAsText(selectedFile)
      } else {
        // For PDF or other formats we'd need a library
        // For now, just show placeholder text
        setDocumentText("Este contenido PDF será procesado durante el análisis.")
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)

    // Simulating file upload and processing
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    setIsProcessing(false)
    setAnalysisComplete(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfb]">
    
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-[#000000]">Análisis de Llamadas</h1>
        <h2 className="text-xl mb-8 text-[#545454]">Carga y analiza transcripciones de llamadas</h2>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#a9a9a9] border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-[#545454]" />
                  <p className="mb-2 text-sm text-[#545454]">
                    <span className="font-semibold">Haz clic para cargar</span> o arrastra y suelta
                  </p>
                  <p className="text-xs text-[#a9a9a9]">Archivos de transcripción (TXT, PDF)</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".txt,.pdf"
                />
              </label>
            </div>
            {file && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-[#545454]" />
                  <span className="text-sm text-[#545454]">{file.name}</span>
                </div>
                <Button
                  onClick={handleUpload}
                  disabled={isProcessing}
                  className="bg-[#000000] text-white hover:bg-[#333333]"
                >
                  {isProcessing ? "Procesando..." : "Analizar"}
                </Button>
              </div>
            )}
            {isProcessing && <Progress value={progress} className="mt-4" />}
          </CardContent>
        </Card>

        {analysisComplete && (
          <Tabs defaultValue="insights" className="w-full">
            <TabsList className="mb-6 bg-white border">
              <TabsTrigger value="document" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Documento Original
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center">
                <BarChart2 className="w-4 h-4 mr-2" />
                Análisis
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center">
                <StickyNote className="w-4 h-4 mr-2" />
                Notas
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="document">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-[#000000]">
                    <FileText className="w-5 h-5 mr-2" />
                    Documento Original
                  </CardTitle>
                  <CardDescription>Transcripción completa de la llamada</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-4 rounded-md border border-gray-200 h-96 overflow-y-auto whitespace-pre-line">
                    {documentText || "No se ha cargado ningún documento."}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="insights">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#000000]">
                      <BarChart2 className="w-5 h-5 mr-2" />
                      Sentimientos del Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SentimentChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#000000]">
                      <Clock className="w-5 h-5 mr-2" />
                      Duración de Segmentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DurationChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#000000]">
                      <PieChart className="w-5 h-5 mr-2" />
                      Distribución de Temas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TopicsChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#000000]">
                      <Tag className="w-5 h-5 mr-2" />
                      Palabras Clave
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <KeywordsCloud />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-[#000000]">
                    <StickyNote className="w-5 h-5 mr-2" />
                    Notas Automáticas
                  </CardTitle>
                  <CardDescription>Resumen y puntos clave identificados en la llamada</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="summary">
                      <AccordionTrigger className="font-semibold">Resumen de la Llamada</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700 mb-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cliente llamó para consultar sobre un problema con su factura mensual. Se identificaron cargos incorrectos que fueron ajustados durante la llamada. El cliente expresó satisfacción con la resolución rápida.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="action-items">
                      <AccordionTrigger className="font-semibold">Puntos de Acción</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>Enviar confirmación de ajuste de factura por correo electrónico</li>
                          <li>Programar seguimiento en 5 días para verificar satisfacción</li>
                          <li>Actualizar información de contacto en el sistema CRM</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="sentiment">
                      <AccordionTrigger className="font-semibold">Análisis de Sentimiento</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium">Inicio de la llamada:</p>
                            <p className="text-gray-700">Frustración moderada (65% negativo)</p>
                          </div>
                          <div>
                            <p className="font-medium">Mitad de la llamada:</p>
                            <p className="text-gray-700">Neutral con tendencia positiva (55% positivo)</p>
                          </div>
                          <div>
                            <p className="font-medium">Final de la llamada:</p>
                            <p className="text-gray-700">Satisfacción clara (82% positivo)</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="key-quotes">
                      <AccordionTrigger className="font-semibold">Frases Destacadas</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <blockquote className="pl-3 border-l-2 border-gray-400 italic text-gray-700">
                            "No entiendo por qué me están cobrando por un servicio que nunca solicité."
                          </blockquote>
                          <blockquote className="pl-3 border-l-2 border-gray-400 italic text-gray-700">
                            "Agradezco mucho la rapidez con la que resolvieron mi problema."
                          </blockquote>
                          <blockquote className="pl-3 border-l-2 border-gray-400 italic text-gray-700">
                            "Definitivamente recomendaré su servicio a mis colegas."
                          </blockquote>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  )
}
