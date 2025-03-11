"use client"

import { useState, useEffect, useRef } from "react";
import { Upload, FileText, BarChart2, PieChart, FileSpreadsheet, StickyNote, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SentimentChart, DurationChart, TopicsChart, KeywordsCloud } from "@/components/charts";
import useAgent from "@/hooks/useAgent";
import dynamic from "next/dynamic";
import { pdfjs } from "react-pdf";

// Use a more reliable CDN approach
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

// Dynamically import PDF components
const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false }
);

const Page = dynamic(
  () => import("react-pdf").then((mod) => mod.Page),
  { ssr: false }
);


export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [documentText, setDocumentText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [numPages, setNumPages] = useState<number>();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Using the custom hook at the top level
  const { data, error, loading } = useAgent(
    file,
    file?.type === "text/plain" ? documentText : null
  );

  useEffect(() => {
    if (!loading) {
      setIsProcessing(false);
      if (error) {
        console.error("Error uploading file:", error);
      } else if (data) {
        console.log("Data fetched:", data);
        setAnalysisComplete(true);
      }
    }
  }, [data, error, loading]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      if (selectedFile.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (typeof e.target?.result === "string") {
            setDocumentText(e.target.result);
          }
        };
        reader.readAsText(selectedFile);
      } else if (selectedFile.type === "application/pdf") {
        setPdfUrl(URL.createObjectURL(selectedFile));
        setDocumentText(""); // Clear text content for PDF
      }
    }
  };


  const handleUpload = async () => {
    if (!file) return;
    console.log("Submitting file:", file);
    setIsProcessing(true);
    setProgress(0);

    // Simulate processing progress.
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    
    // Add this line to ensure analysis is triggered
    setAnalysisComplete(true);
  };
  

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
                  <CardDescription>
                    {file?.type === "application/pdf" 
                      ? "Vista previa del PDF cargado" 
                      : "Transcripción completa de la llamada"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-4 rounded-md border border-gray-200 h-[600px] overflow-y-auto">
                    {file?.type === "application/pdf" && pdfUrl ? (
                      <iframe 
                        src={pdfUrl} 
                        className="w-full h-full" 
                        title="PDF Viewer"
                        style={{ minHeight: "550px" }}
                      />
                    ) : file?.type === "text/plain" ? (
                      <pre className="whitespace-pre-line font-sans">
                        {documentText || "No se ha cargado ningún documento."}
                      </pre>
                    ) : (
                      <div className="text-gray-500">
                        Formato de archivo no soportado
                      </div>
                    )}
                  </div>
                  
                  {file && (
                    <div className="mt-4 text-center">
                      <a
                        href={pdfUrl || URL.createObjectURL(file)}
                        download={file.name}
                        className="text-blue-600 hover:underline"
                      >
                        Descargar documento original
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-[#000000]">
                    <StickyNote className="w-5 h-5 mr-2" />
                    {data?.title}
                  </CardTitle>
                  <CardDescription>Resumen de la llamada</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-line">{data?.resumen}</p>
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
          </Tabs>
        )}
      </main>
    </div>
  );
}