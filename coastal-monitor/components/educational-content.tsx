"use client"

import type React from "react"

import { useState } from "react"
import { BookOpen, ChevronRight, Play, FileText, ExternalLink } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const educationalModules = [
  {
    id: "basics",
    title: "Conceptos Básicos",
    icon: BookOpen,
    color: "bg-blue-500",
    topics: [
      {
        title: "¿Qué es la erosión costera?",
        content:
          "La erosión costera es el proceso natural de desgaste y retroceso de la línea de costa debido a la acción del oleaje, corrientes marinas, viento y actividades humanas. En Yucatán, este proceso se ha acelerado debido al cambio climático y el desarrollo costero.",
        keyPoints: [
          "Proceso natural acelerado por factores humanos",
          "Pérdida de playa y retroceso de la línea costera",
          "Afecta infraestructura y ecosistemas",
        ],
      },
      {
        title: "Causas del avance del mar",
        content:
          "El avance del mar en Yucatán es resultado de múltiples factores: aumento del nivel del mar por cambio climático, hundimiento del terreno (subsidencia), pérdida de barreras naturales como manglares y arrecifes, y construcciones inadecuadas en la costa.",
        keyPoints: [
          "Cambio climático y derretimiento de glaciares",
          "Subsidencia del terreno",
          "Pérdida de ecosistemas protectores",
          "Desarrollo costero no planificado",
        ],
      },
      {
        title: "Impactos en la comunidad",
        content:
          "El avance del mar afecta directamente a las comunidades costeras: pérdida de viviendas y negocios, daños a infraestructura turística, contaminación de acuíferos por intrusión salina, y pérdida de biodiversidad marina y costera.",
        keyPoints: [
          "Pérdida económica en turismo",
          "Desplazamiento de comunidades",
          "Contaminación de agua dulce",
          "Pérdida de hábitats naturales",
        ],
      },
    ],
  },
  {
    id: "solutions",
    title: "Soluciones y Adaptación",
    icon: ChevronRight,
    color: "bg-green-500",
    topics: [
      {
        title: "Soluciones basadas en la naturaleza",
        content:
          "Las soluciones basadas en la naturaleza son las más efectivas y sostenibles: restauración de manglares, protección de arrecifes de coral, dunas costeras, y vegetación nativa. Estos ecosistemas actúan como barreras naturales contra el oleaje y las tormentas.",
        keyPoints: [
          "Restauración de manglares y arrecifes",
          "Protección de dunas costeras",
          "Reforestación con especies nativas",
          "Menor costo que soluciones artificiales",
        ],
      },
      {
        title: "Infraestructura resiliente",
        content:
          "La construcción de infraestructura debe adaptarse al cambio climático: edificaciones elevadas, sistemas de drenaje mejorados, materiales resistentes a la corrosión salina, y planificación urbana que respete las zonas de riesgo.",
        keyPoints: [
          "Construcción elevada y alejada de la costa",
          "Materiales resistentes al ambiente marino",
          "Sistemas de drenaje pluvial eficientes",
          "Zonificación basada en riesgo",
        ],
      },
      {
        title: "Participación comunitaria",
        content:
          "La participación activa de la comunidad es esencial: monitoreo ciudadano, educación ambiental, prácticas sostenibles de turismo, y presión para políticas públicas efectivas. Cada persona puede contribuir a la protección costera.",
        keyPoints: [
          "Monitoreo y reporte de cambios",
          "Educación y concientización",
          "Turismo responsable",
          "Incidencia en políticas públicas",
        ],
      },
    ],
  },
  {
    id: "climate",
    title: "Cambio Climático",
    icon: FileText,
    color: "bg-orange-500",
    topics: [
      {
        title: "Relación con el cambio climático",
        content:
          "El cambio climático es el principal impulsor del avance del mar: el aumento de temperatura global derrite glaciares y casquetes polares, expandiendo el volumen del océano. Además, intensifica tormentas y huracanes que aceleran la erosión.",
        keyPoints: [
          "Aumento del nivel del mar global",
          "Tormentas más intensas y frecuentes",
          "Cambios en corrientes marinas",
          "Acidificación del océano",
        ],
      },
      {
        title: "Proyecciones futuras",
        content:
          "Los modelos climáticos proyectan que el nivel del mar podría aumentar entre 0.5 y 2 metros para 2100, dependiendo de las emisiones de gases de efecto invernadero. Yucatán es particularmente vulnerable por su geografía plana y costas bajas.",
        keyPoints: [
          "Aumento proyectado de 0.5-2m para 2100",
          "Mayor frecuencia de eventos extremos",
          "Yucatán entre las zonas más vulnerables",
          "Urgencia de acción inmediata",
        ],
      },
      {
        title: "Acciones de mitigación",
        content:
          "Reducir las emisiones de gases de efecto invernadero es crucial: transición a energías renovables, eficiencia energética, transporte sostenible, y protección de ecosistemas que capturan carbono como manglares y selvas.",
        keyPoints: [
          "Transición a energías limpias",
          "Reducción de consumo de combustibles fósiles",
          "Protección de sumideros de carbono",
          "Cambios en estilos de vida",
        ],
      },
    ],
  },
]

const resources = [
  {
    title: "Guía de Monitoreo Costero",
    type: "PDF",
    description: "Manual completo para ciudadanos sobre cómo monitorear y reportar cambios costeros",
    url: "#",
  },
  {
    title: "Video: Erosión en Yucatán",
    type: "Video",
    description: "Documental de 15 minutos sobre el impacto de la erosión en la península",
    url: "#",
  },
  {
    title: "Mapa Interactivo de Riesgos",
    type: "Herramienta",
    description: "Explora las zonas de mayor riesgo en la costa de Yucatán",
    url: "#",
  },
  {
    title: "Informe Anual 2024",
    type: "PDF",
    description: "Reporte completo sobre el estado de las costas de Yucatán",
    url: "#",
  },
]

export function EducationalContent() {
  const [selectedModule, setSelectedModule] = useState<string>("basics")
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)

  const currentModule = educationalModules.find((m) => m.id === selectedModule)

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar - Module Selection */}
      <div className="w-80 border-r border-border bg-card p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">Centro Educativo</h2>
          <p className="text-sm text-muted-foreground">Aprende sobre la costa y el cambio climático</p>
        </div>

        <div className="space-y-2">
          {educationalModules.map((module) => {
            const Icon = module.icon
            return (
              <button
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                  selectedModule === module.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
              >
                <div className={`rounded-lg ${module.color} p-2`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{module.title}</p>
                  <p className="text-xs opacity-70">{module.topics.length} temas</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Resources Section */}
        <div className="mt-8">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Recursos Adicionales</h3>
          <div className="space-y-2">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                className="flex items-start gap-2 rounded-lg bg-background p-3 text-left transition-colors hover:bg-muted"
              >
                <div className="mt-0.5">
                  {resource.type === "Video" ? (
                    <Play className="h-4 w-4 text-primary" />
                  ) : resource.type === "PDF" ? (
                    <FileText className="h-4 w-4 text-primary" />
                  ) : (
                    <ExternalLink className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">{resource.title}</p>
                  <p className="text-xs text-muted-foreground">{resource.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Topics */}
      <div className="flex-1 overflow-y-auto p-6">
        {currentModule && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">{currentModule.title}</h2>
              <p className="text-sm text-muted-foreground">
                Explora los siguientes temas para aprender más sobre este módulo
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {currentModule.topics.map((topic, index) => (
                <AccordionItem key={index} value={`topic-${index}`} className="rounded-lg border border-border bg-card">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${currentModule.color}`}>
                        <span className="text-sm font-bold text-white">{index + 1}</span>
                      </div>
                      <span className="font-semibold text-foreground">{topic.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">{topic.content}</p>

                      <div className="rounded-lg bg-muted/50 p-4">
                        <h4 className="mb-2 text-sm font-semibold text-foreground">Puntos Clave:</h4>
                        <ul className="space-y-1">
                          {topic.keyPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Call to Action */}
            <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-6">
              <h3 className="mb-2 text-lg font-bold text-foreground">¿Quieres contribuir?</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Ahora que conoces más sobre la erosión costera, puedes ayudar reportando observaciones en tu zona.
              </p>
              <Button>
                <Users className="h-4 w-4" />
                <span className="ml-2">Ir a Reportes Ciudadanos</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
