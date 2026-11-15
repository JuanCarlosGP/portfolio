# Juan Carlos Gutiérrez Pesquero — Portfolio de Ingeniería QA & SDET

[![CI Quality Gate & E2E Matrix](https://github.com/JuanCarlosGP/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/JuanCarlosGP/portfolio/actions/workflows/ci.yml)
[![Astro 5](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict_6.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Playwright Test](https://img.shields.io/badge/Playwright-E2E_Matrix-2EAD33?style=flat&logo=playwright&logoColor=white)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gray.svg)](LICENSE)

> Portafolio técnico personal de **Juan Carlos Gutiérrez Pesquero**, QA Automation Engineer & SDET especializado en Playwright, WebdriverIO, arquitecturas de prueba sin falsos positivos, contratos de API y pipelines CI/CD de alta velocidad.

---

## 🏛️ Arquitectura del Proyecto

El repositorio ha sido concebido bajo los más rigurosos estándares de la ingeniería frontend moderna, desacoplando datos, componentes y lógica en una arquitectura basada en **Astro 5 + TypeScript**:

```
portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml               # Pipeline CI/CD: build estricto + matriz Playwright
├── public/                      # Assets estáticos servidos en la raíz
│   ├── avatar.png               # Fotografía de perfil optimizada
│   ├── psp-front.jpg            # Fotografía estudio frontal PSP mod
│   ├── psp-back.jpg             # Fotografía trasera PSP mod chasis transparente
│   ├── psp-video.mp4            # Vídeo demo en hardware real
│   ├── psp-video-poster.jpg     # Poster optimizado para evitar CLS
│   └── swarm.js                 # Motor de enjambre de agentes y síntesis WebAudio
├── src/
│   ├── components/
│   │   ├── common/              # Componentes base (Head, Botones, Modal de inicio)
│   │   ├── hero/                # Hero principal, Typewriter, Test Studio & Mockups Google
│   │   ├── layout/              # Header de navegación y Technical Footer
│   │   ├── projects/            # Galería de proyectos y Slider de Hardware PSP
│   │   └── sections/            # Metodología, Trayectoria, Stack técnico y Contacto
│   ├── data/                    # Modelos de datos tipados (proyectos, escenarios, stack)
│   ├── layouts/
│   │   └── Layout.astro         # Shell HTML principal, meta tags y scripts de cliente
│   ├── modules/                 # Motores de cliente en TypeScript desacoplados
│   │   ├── compare-slider.ts    # Controlador de arrastre y accesibilidad del split slider
│   │   ├── main.ts              # Entrypoint cliente para inicialización del DOM
│   │   ├── mode-modal.ts        # Gestor del diálogo modal de selección de modo
│   │   ├── psp-slider.ts        # Carrusel de diapositivas con soporte de audio/vídeo
│   │   ├── scenario-runner.ts   # Simulador de ejecución de tests y tab switching
│   │   └── typewriter.ts        # Animación de escritura sin saltos de layout (CLS = 0)
│   ├── pages/
│   │   └── index.astro          # Composición declarativa de la página principal
│   ├── styles/
│   │   └── global.css           # Sistema de diseño CAD, variables semánticas y micro-interacciones
│   └── types/
│       └── portfolio.ts         # Contratos e interfaces estrictas de TypeScript
├── tests/
│   └── portfolio.spec.ts        # Suite E2E completa en Playwright (360px, 390px, 1440px)
├── astro.config.mjs             # Configuración de Astro en modo SSG estático
├── playwright.config.ts         # Configuración de matriz de pruebas y webServer preview
├── tsconfig.json                # Configuración TypeScript estricta con alias de rutas
└── package.json
```

---

## ⚡ Características Técnicas

- **Cero JavaScript innecesario (Zero JS by default)**: Renderizado estático puro generado en tiempo de build con Astro SSG.
- **Tipado estricto extremo**: Interfaces TypeScript para todas las entidades (`Project`, `ScenarioSuite`, `ExperienceItem`, `StackCategory`).
- **Identidad Visual CAD**: Grid milimétrico, cruces de cota en esquinas, estados monocromáticos y micro-interacciones de alta fidelidad.
- **Zero CLS & 0px Overflow**: Garantía total de ausencia de scroll horizontal y saltos de layout en cualquier viewport móvil (320px–390px) y escritorio (1440px).
- **Test Studio Interactivo**:
  - Comparador split-screen deslizable (`#demo-stage`) con soporte táctil, ratón y teclado (flechas ARIA).
  - 5 escenarios dinámicos de prueba: *Website E2E*, *API Testing (Google Autocomplete)*, *Accessibility (WCAG 2.2 AAA)*, *CI/CD Matrix*, y *Performance (Lighthouse 100/100)*.
- **Hardware Diagnostic Showcase**: Carrusel interactivo para el Proyecto 01 (Panel PSP) con vídeo en tiempo real, conmutador de sonido y fotografías de estudio.

---

## 🧪 Calidad y Automatización (SDET)

El repositorio incluye una suite formal de pruebas end-to-end con **Playwright**, verificando:

1. **Integridad de Metadatos y Accesibilidad**: Title semántico, meta description, landmarks ARIA y roles combobox/slider.
2. **Límites de Contención CAD**: Validación matemática de `scrollWidth <= innerWidth` para certificar 0px de desbordamiento horizontal.
3. **Micro-interacciones y Flujos**:
   - Apertura y cierre del selector de modo inicial.
   - Conmutación reactiva de suites de prueba y renderizado dinámico de outputs.
   - Navegación bidireccional del carrusel multimedia del proyecto de hardware.
   - Aserción de enlaces externos (GitHub, LinkedIn, correo electrónico).

### Ejecutar Pruebas Locales

```bash
# Ejecutar verificación de tipos
npm run check

# Ejecutar suite E2E en Playwright (multi-viewport)
npm run test

# Ver reporte interactivo de Playwright
npx playwright show-report
```

---

## 🚀 Puesta en Marcha

### Prerrequisitos
- **Node.js** >= 20.0.0
- **npm** >= 9.0.0

### Instalación

```bash
git clone https://github.com/JuanCarlosGP/portfolio.git
cd portfolio
npm install
```

### Comandos Disponibles

| Comando | Acción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local en `http://localhost:5173` |
| `npm run build` | Ejecuta `astro check` y genera la distribución estática optimizada en `dist/` |
| `npm run preview` | Previsualiza la build de producción generada en `dist/` |
| `npm run check` | Analiza diagnósticos y tipados con `@astrojs/check` |
| `npm run test` | Ejecuta la suite de Playwright E2E sobre la build de previsualización |

---

## 👤 Autor

**Juan Carlos Gutiérrez Pesquero**  
*QA Automation Engineer & SDET*  
Madrid (Fuenlabrada), España  

- 💼 **LinkedIn**: [juancarlosgutierrezpesquero](https://www.linkedin.com/in/juancarlosgutierrezpesquero/)  
- 🐙 **GitHub**: [@JuanCarlosGP](https://github.com/JuanCarlosGP)  
- ✉️ **Email**: [jcmdfk@gmail.com](mailto:jcmdfk@gmail.com)  

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
