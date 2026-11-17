export type Lang = 'en' | 'es';

export interface Translations {
  nav: {
    brandAria: string;
    projects: string;
    gallery: string;
    experience: string;
    stack: string;
    contact: string;
    agentMode: string;
    agentModeTitle: string;
    fontToggleTitle: string;
    fontToggleAria: string;
    langToggleTitle: string;
    langToggleAria: string;
  };
  hero: {
    eyebrow: string;
    badge: string;
    name: string;
    h1Static: string;
    typewriterPhrases: string[];
    lede: string;
    cta: string;
    ctaAria: string;
    cv: string;
    cvAria: string;
    facts: [string, string, string];
  };
  studio: {
    sliderAria: string;
    googleSearchBtn: string;
    luckyBtn: string;
    offeredIn: string;
    footerLocation: string;
    footerSettings: string;
  };
  clicker: {
    kicker: string;
    title: string;
    btn: string;
    globalLabel: string;
    yourMarks: string;
    syncedText: string;
  };
  pipeline: {
    kicker: string;
    pill: string;
    title: string;
    sub: string;
    btn: string;
    latestRun: string;
    modalTitle: string;
    step1: string;
    step2: string;
    step3: string;
    runningText: string;
    passedText: string;
    pauseBtn: string;
    resumeBtn: string;
    speedBtn: string;
    skipBtn: string;
    rerunBtn: string;
    viewGithubBtn: string;
    closeBtn: string;
  };
  projects: {
    kicker: string;
    title: string;
    sub: string;
    items: {
      psp: { title: string; desc: string };
      banking: { title: string; desc: string };
      ecommerce: { title: string; desc: string };
      contracts: { title: string; desc: string };
      webhooks: { title: string; desc: string };
      opensource: { title: string; desc: string };
    };
  };
  gallery: {
    kicker: string;
    title: string;
    sub: string;
    lightboxClose: string;
    lightboxPrev: string;
    lightboxNext: string;
    items: {
      hammock: { title: string; desc?: string };
      peanuts: { title: string; desc?: string };
      kayak: { title: string; desc?: string };
      ocean: { title: string; desc?: string };
      treat: { title: string; desc?: string };
      tan: { title: string; desc?: string };
      lol: { title: string; desc?: string };
    };
  };
  experience: {
    kicker: string;
    title: string;
    sub: string;
    logoRail: string;
    izertisRole: string;
    izertisPeriod: string;
    izertisClient: string;
    izertisBadge: string;
    izertisBullets: string[];
    iteggoRole: string;
    iteggoPeriod: string;
    iteggoClient: string;
    iteggoBadge: string;
    iteggoBullets: string[];
    referenceBtn: string;
    secondaryKicker: string;
    secondaryTitle: string;
    gorilastRole: string;
    gorilastPeriod: string;
    gorilastBadge: string;
    gorilastDesc: string;
    accentureRole: string;
    accenturePeriod: string;
    accentureBadge: string;
    accentureDesc: string;
    proBadge: string;
    proHeading: string;
    statStep1: string;
    statStep1Desc: string;
    statStep2: string;
    statStep2Desc: string;
    statStep3: string;
    statStep3Desc: string;
    proHighlights: string[];
  };
  stack: {
    kicker: string;
    title: string;
    sub: string;
    categories: {
      testing: string;
      languages: string;
      cicd: string;
      architecture: string;
    };
  };
  contact: {
    role: string;
    heading: string;
    cvBtn: string;
    githubBtn: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    sendingBtn: string;
    directLabel: string;
    copyBtn: string;
    copiedTooltip: string;
    successTitle: string;
    successMsg: string;
    sendAnotherBtn: string;
    errorMsg: string;
  };
  footer: {
    bio: string;
    sectionsTitle: string;
    cv: string;
    connectTitle: string;
    rights: string;
    tz: string;
    backTop: string;
  };
  modal: {
    chip: string;
    title: string;
    agentTag: string;
    agentTitle: string;
    agentCopy: string;
    agentBtn: string;
    normalTag: string;
    normalTitle: string;
    normalCopy: string;
    normalBtn: string;
    footer: string;
  };
}

export const translations: Record<Lang, Translations> = {
  en: {
    nav: {
      brandAria: 'Juan Carlos Gutiérrez Pesquero - Portfolio',
      projects: 'Projects',
      gallery: 'Gallery',
      experience: 'Experience',
      stack: 'Stack',
      contact: 'Contact',
      agentMode: 'Agents',
      agentModeTitle: 'Rebuild live site with AI agents and sound',
      fontToggleTitle: 'Toggle typography between Geist and Geist Pixel',
      fontToggleAria: 'Change site typography',
      langToggleTitle: 'Switch language (EN / ES)',
      langToggleAria: 'Toggle language between English and Spanish'
    },
    hero: {
      eyebrow: 'Madrid, Spain · Personal Portfolio',
      badge: 'AVAILABLE / OPEN TO WORK',
      name: 'Juan Carlos Gutiérrez',
      h1Static: 'Engineering for',
      typewriterPhrases: [
        'robust test suites.',
        'fast E2E runs.',
        'clean QA architectures.',
        'deterministic fixtures.',
        'reliable CI/CD gates.'
      ],
      lede: 'Hi! I\'m <strong>Juan Carlos</strong>. I design and build <strong>automated testing architectures</strong> in any environment that eliminate flakiness and accelerate production deployments. My focus is on CI/CD pipeline reliability, <strong>deterministic testing</strong>, and building tools that solve real software quality challenges.',
      cta: "Let's connect?",
      ctaAria: 'Connect with Juan Carlos on LinkedIn',
      cv: 'Download CV',
      cvAria: 'Download the CV of Juan Carlos Gutiérrez as a PDF',
      facts: [
        'Deterministic Testing',
        'Playwright & Maestro',
        'Madrid · Fuenlabrada'
      ]
    },
    studio: {
      sliderAria: 'Compare Google.com search engine with QA Automation test suite',
      googleSearchBtn: 'Google Search',
      luckyBtn: "I'm Feeling Lucky",
      offeredIn: 'Google offered in:',
      footerLocation: 'Spain · From your IP address',
      footerSettings: 'Dark theme · Privacy'
    },
    clicker: {
      kicker: '00 // VISITOR LOG',
      title: 'Leave your mark on this portfolio',
      btn: 'Clock in',
      globalLabel: 'Global Marks',
      yourMarks: 'Your marks',
      syncedText: 'Live Redis Sync'
    },
    pipeline: {
      kicker: '01.5 // CI/CD QUALITY GATE',
      pill: 'Live E2E Runner',
      title: 'Live CI/CD Pipeline',
      sub: 'Run automated Playwright E2E tests with live console streaming.',
      btn: 'Run E2E Pipeline',
      latestRun: 'GitHub Actions: Passing',
      modalTitle: 'CI/CD Pipeline Terminal',
      step1: 'Build & Lint',
      step2: 'Playwright E2E Suite',
      step3: 'Quality Gate & Deploy',
      runningText: 'RUNNING...',
      passedText: 'PASSED (Exit 0)',
      pauseBtn: 'Pause',
      resumeBtn: 'Resume',
      speedBtn: '2x Speed',
      skipBtn: 'Skip to End',
      rerunBtn: 'Rerun Tests',
      viewGithubBtn: 'View on GitHub Actions',
      closeBtn: 'Close [ESC]'
    },
    projects: {
      kicker: 'Featured Projects',
      title: 'E2E Architectures &<br />test frameworks.',
      sub: 'Automated test systems, cross-platform validation, and CI/CD delivery gates.',
      items: {
        psp: {
          title: 'PSP Hardware Diagnostic Tool & Tear-Down Mod',
          desc: 'Bare-metal C diagnostic tool for PSP-3004 (ARK-5) engineered to accelerate manual hardware validation: continuous assertion for 14 physical buttons (5s hold logic to rule out false contacts), trigonometric analog stick drift and jitter analysis, and battery telemetry. Accompanied by full console tear-down, transparent shell assembly, and 3600mAh battery mod.'
        },
        banking: {
          title: 'Enterprise Banking E2E & Mobile Framework',
          desc: 'Comprehensive automated testing architecture for electronic web banking and native mobile apps. Covers critical biometric authentication, wire transfers, and account ledger states. Bi-directional sync with Azure DevOps Test Plans via custom extension and Maestro test runners.'
        },
        ecommerce: {
          title: 'Playwright E-Commerce & Mobile Matrix',
          desc: 'Multi-viewport regression test suite (mobile, tablet, desktop) with calibrated pixelmatch visual assertions and deterministic fixtures for carts and checkout flows.'
        },
        contracts: {
          title: 'Autonomous Agent Verifier & Test Fixture',
          desc: 'POSIX-native verification harness with strict JSON Schema (Draft 2020-12) validation, MCP tool contract assertion, local loopback model fixtures, and cryptographic evidence digests.'
        },
        webhooks: {
          title: 'Distributed Webhook & Pipeline Engine',
          desc: 'Testing infrastructure for distributed events, Stripe transaction simulations, transactional email deliverability assertions, and high-concurrency K6 load testing.'
        },
        opensource: {
          title: 'Open Source Tooling & Mobile Utilities',
          desc: 'Open-source repositories and mobile apps including Android accessibility utilities with glyph light telemetry (glyphTyping for Nothing Phone) and React Native / Expo SDK 54 mobile apps (NLC).'
        }
      }
    },
    gallery: {
      kicker: 'Personal Archive',
      title: 'Beyond the code.',
      sub: 'Captures, outdoor runs, downtime, and the pets that keep the focus balanced.',
      lightboxClose: 'Close (Esc)',
      lightboxPrev: 'Previous (←)',
      lightboxNext: 'Next (→)',
      items: {
        hammock: {
          title: 'Hammock Nap Protocol',
          desc: 'Deep sleep state in hanging plush hammock. 0% activity, maximum coziness.'
        },
        peanuts: {
          title: 'Peanut Sack Inspection',
          desc: 'Investigating emergency peanut supplies next to the fleece blanket.'
        },
        kayak: {
          title: 'River Descent',
          desc: 'Navigating lush forested riverbanks under overcast skies.'
        },
        ocean: {
          title: 'Cruise Landscape',
          desc: 'Sunset gold ripples across deep ocean swells.'
        },
        treat: {
          title: 'Pistachio',
          desc: 'High-focus attention triggered by the sound of the treat bag on parquet.'
        },
        tan: {
          title: 'Vacation Sunburn',
          desc: 'Definitive visual evidence of hours under the sun after an outdoor day.'
        },
        lol: {
          title: 'Side Hustle',
          desc: 'Champion mastery milestones, Emerald II rank, and Honor Level 4.'
        }
      }
    },
    experience: {
      kicker: 'Professional Experience',
      title: 'Proven track record in<br />software quality.',
      sub: 'Delivering technical rigor, scalable automation frameworks, and enterprise testing standards across banking, retail, and aviation sectors.',
      logoRail: 'Companies and clients',
      izertisRole: 'Web & Mobile Test Automation Engineer (SDET)',
      izertisPeriod: 'JAN 2026 – PRESENT · MADRID (REMOTE)',
      izertisClient: 'Laboral Kutxa · Regulated Banking & FinTech',
      izertisBadge: 'CURRENT · TECH CONSULTING',
      izertisBullets: [
        '<strong>E2E Regression Suites:</strong> Development and maintenance of automated suites with <strong>Playwright</strong> and <strong>TypeScript</strong>, following BDD (Cucumber/Gherkin) and Page Object Model, covering personal and business banking journeys across desktop and mobile.',
        '<strong>Mobile & AI-Assisted QA:</strong> Native iOS and Android automation via Gherkin scenarios mapped to device flows with <strong>BrowserStack</strong> and <strong>Azure Test Plans</strong>; designed agent-based test generation templates with human review.',
        '<strong>Audit Evidence Reporting:</strong> Developed an internal reporting tool converting Azure Test Plans data into HTML audit evidence with screenshots, videos, and step logs for Bank of Spain compliance audits, packaged as an <strong>Azure DevOps</strong> task.',
        '<strong>CI/CD & Failure Management:</strong> Scheduled regression pipelines in Azure DevOps with tagged runs, JUnit results, living Gherkin documentation, automatic work item creation, and Microsoft Teams notifications.'
      ],
      iteggoRole: 'QA Automation & Test Consultant',
      iteggoPeriod: 'NOV 2024 – JAN 2026 · MADRID (HYBRID)',
      iteggoClient: 'Grupo Dia (Retail) & Iberia (Aviation)',
      iteggoBadge: 'TECH CONSULTING',
      iteggoBullets: [
        '<strong>Retail Sector (Grupo Dia):</strong> Led technical quality assurance for the new coupon promotional engine and high-availability loyalty systems (push notifications, digital tickets, single customer view).',
        '<strong>Frameworks & Migration:</strong> Designed and implemented API automation with <strong>Karate DSL</strong> and migrated frontend E2E from Selenium to <strong>Playwright</strong>, significantly increasing code coverage and test stability.',
        '<strong>Event-Driven & API Validation:</strong> Validated asynchronous workflows and message integrity via <strong>Pub/Sub</strong> events; executed microservices contract assertions with <strong>Postman</strong> and <strong>Swagger</strong>.',
        '<strong>Aviation Sector (Iberia):</strong> Designed functional and integration test structures to validate real-time transaction processing between core flight search engines (availability and pricing) and global OTAs.'
      ],
      referenceBtn: 'Contact for references',
      secondaryKicker: 'Complementary Background & Prior Roles',
      secondaryTitle: 'Previous engineering & security experience.',
      gorilastRole: 'Frontend Development Lead',
      gorilastPeriod: 'FEB 2024 – MAY 2024 · 4 MOS · HYBRID',
      gorilastBadge: 'FRONTEND & TESTING',
      gorilastDesc: 'Contributed to high-performance online sales platform scalability and robustness: built interactive React/TypeScript UIs, integrated API services with map visualizations, and designed E2E and component tests with Cypress in GitLab CI/CD.',
      accentureRole: 'Cybersecurity Specialist',
      accenturePeriod: 'JAN 2022 – JUN 2022 · 6 MOS · MADRID',
      accentureBadge: 'SYSTEMS & SECURITY',
      accentureDesc: 'Collaborated within Accenture cybersecurity team performing daily analysis of logs and system activity across global teams to detect anomalous behavior, security risks, and structured incident management.',
      proBadge: 'AI-ASSISTED QA ARCHITECTURE',
      proHeading: 'Agentic Testing &amp; <em>Human-in-the-Loop</em>',
      statStep1: '01 · SCOUT',
      statStep1Desc: 'Flow & Ticket Map',
      statStep2: '02 · AUTHOR',
      statStep2Desc: 'Gherkin & Modular POM',
      statStep3: '03 · SANITY',
      statStep3Desc: 'Sandbox & Human Gate',
      proHighlights: [
        '<strong>Zero Hallucinations &amp; Control:</strong> AI accelerates test authoring without sacrificing predictability or Page Object Model robustness.',
        '<strong>Modular E2E Templates:</strong> Context-guided generation for Playwright (web) and Maestro (mobile).',
        '<strong>Automated Regression Maintenance:</strong> Assisted repair of broken steps and outdated selectors following new frontend deployments.'
      ]
    },
    stack: {
      kicker: 'Tools & Technologies',
      title: 'Technical Stack &<br />specialization.',
      sub: 'Mastered suite of technologies and languages to engineer modern, maintainable, high-performance testing infrastructures.',
      categories: {
        testing: 'Testing & QA',
        languages: 'Languages',
        cicd: 'CI/CD & DevOps',
        architecture: 'Architecture & QA'
      }
    },
    contact: {
      role: 'QA Automation & SDET · <span class="shine">Open to Work</span>',
      heading: 'I design and optimize your<br />testing infrastructure.',
      cvBtn: 'Download CV',
      githubBtn: 'GitHub Profile',
      nameLabel: 'Your Name',
      namePlaceholder: 'e.g. Alex Morgan',
      emailLabel: 'Email Address',
      emailPlaceholder: 'alex@company.com',
      subjectLabel: 'Subject / Company',
      subjectPlaceholder: 'QA Opportunity / Project Inquiry',
      messageLabel: 'Message',
      messagePlaceholder: 'Hi Juan Carlos, we are looking for an SDET to build our test architecture...',
      sendBtn: 'Send Message',
      sendingBtn: 'Sending...',
      directLabel: 'Or reach out directly:',
      copyBtn: 'Copy',
      copiedTooltip: 'Copied!',
      successTitle: 'Message sent successfully!',
      successMsg: 'Thank you for reaching out. I will get back to your email as soon as possible.',
      sendAnotherBtn: 'Send another message',
      errorMsg: 'Could not send message. Please email directly to juancarlosgp212@gmail.com'
    },
    footer: {
      bio: 'QA Automation Engineer & SDET. Specialist in Playwright, Maestro, CI/CD, and test architectures.',
      sectionsTitle: 'Sections',
      cv: 'Download CV (PDF)',
      connectTitle: 'Connect',
      rights: '© 2026 Juan Carlos Gutiérrez Pesquero · All rights reserved',
      tz: 'Madrid (Fuenlabrada), Spain · CET Timezone',
      backTop: 'Top'
    },
    modal: {
      chip: '// LAUNCH MODE',
      title: 'Choose how to view portfolio',
      agentTag: '🔊 WITH SOUND',
      agentTitle: 'With Agents',
      agentCopy: 'Live rebuild with cursor swarm and audio.',
      agentBtn: 'Start [1]',
      normalTag: 'DIRECT',
      normalTitle: 'Standard View',
      normalCopy: 'Direct portfolio access without waiting animations.',
      normalBtn: 'Enter [2]',
      footer: '[ 1 ] Agents · [ 2 ] Normal'
    }
  },
  es: {
    nav: {
      brandAria: 'Juan Carlos Gutiérrez Pesquero - Portafolio',
      projects: 'Proyectos',
      gallery: 'Galería',
      experience: 'Trayectoria',
      stack: 'Stack',
      contact: 'Contacto',
      agentMode: 'Agentes',
      agentModeTitle: 'Reconstruir la web en vivo con agentes IA y sonido',
      fontToggleTitle: 'Alternar entre tipografía Geist y Geist Pixel',
      fontToggleAria: 'Cambiar tipografía de la página',
      langToggleTitle: 'Cambiar idioma (EN / ES)',
      langToggleAria: 'Alternar idioma entre inglés y español'
    },
    hero: {
      eyebrow: 'Madrid, España · Portfolio Personal',
      badge: 'DISPONIBLE / OPEN TO WORK',
      name: 'Juan Carlos Gutiérrez',
      h1Static: 'Ingeniería para',
      typewriterPhrases: [
        'suites de test robustas.',
        'ejecuciones E2E.',
        'arquitecturas de QA limpias.',
        'fixtures deterministas.',
        'compuertas de CI/CD fiables.'
      ],
      lede: '¡Hola! Soy <strong>Juan Carlos</strong>. Me dedico a diseñar y construir <strong>arquitecturas de testing automatizadas</strong> en cualquier entorno que eliminan falsos positivos y aceleran los despliegues a producción. Mi foco está en la fiabilidad de los pipelines CI/CD, el <strong>testing determinista</strong> y en crear herramientas que resuelvan problemas reales de calidad.',
      cta: '¿Conectamos?',
      ctaAria: 'Conectar con Juan Carlos en LinkedIn',
      cv: 'Descargar CV',
      cvAria: 'Descargar el CV de Juan Carlos Gutiérrez en PDF',
      facts: [
        'Testing Determinista',
        'Playwright & Maestro',
        'Madrid · Fuenlabrada'
      ]
    },
    studio: {
      sliderAria: 'Comparar buscador Google.com con suite de pruebas QA Automation',
      googleSearchBtn: 'Buscar con Google',
      luckyBtn: 'Voy a tener suerte',
      offeredIn: 'Ofrecido por Google en:',
      footerLocation: 'España · De tu dirección IP',
      footerSettings: 'Modo Oscuro · Confidencialidad'
    },
    clicker: {
      kicker: '00 // REGISTRO DE VISITAS',
      title: 'Deja tu huella en este portafolio',
      btn: 'Fichar',
      globalLabel: 'Marcas Globales',
      yourMarks: 'Tus firmas',
      syncedText: 'Sync en Vivo'
    },
    pipeline: {
      kicker: '01.5 // CI/CD QUALITY GATE',
      pill: 'Runner E2E en Vivo',
      title: 'Pipeline CI/CD en Vivo',
      sub: 'Ejecuta los tests E2E de Playwright con consola en streaming.',
      btn: 'Ejecutar Pipeline E2E',
      latestRun: 'GitHub Actions: En verde',
      modalTitle: 'Terminal de Pipeline CI/CD',
      step1: 'Build y Lint',
      step2: 'Suite E2E Playwright',
      step3: 'Quality Gate y Deploy',
      runningText: 'EJECUTANDO...',
      passedText: 'PASSED (Exit 0)',
      pauseBtn: 'Pausar',
      resumeBtn: 'Reanudar',
      speedBtn: 'Velocidad 2x',
      skipBtn: 'Saltar al final',
      rerunBtn: 'Relanzar pruebas',
      viewGithubBtn: 'Ver en GitHub Actions',
      closeBtn: 'Cerrar [ESC]'
    },
    projects: {
      kicker: 'Proyectos destacados',
      title: 'Arquitecturas E2E<br />y frameworks de prueba.',
      sub: 'Sistemas de prueba automáticos, validación cross-platform y compuertas CI/CD.',
      items: {
        psp: {
          title: 'PSP Hardware Diagnostic Tool & Tear-Down Mod',
          desc: 'Herramienta de diagnóstico nativa en C para PSP-3004 (ARK-5) diseñada para acelerar la verificación manual de controles físicos: aserción continua de pulsación de 14 botones (hold de 5s para descartar falsos contactos), análisis trigonométrico de deriva y jitter del stick analógico, y telemetría de batería. Proyecto complementado con desmontaje integral y ensamblado de chasis transparente y batería de 3600mAh.'
        },
        banking: {
          title: 'Enterprise Banking E2E & Mobile Framework',
          desc: 'Arquitectura integral de testing automatizado para banca electrónica web y app móvil nativa. Cobertura de flujos críticos de autenticación biométrica, transferencias y estados contables. Integración bidireccional con Azure DevOps Test Plans mediante extensión personalizada y optimización de flujos Maestro mediante runner compuesto.'
        },
        ecommerce: {
          title: 'Playwright E-Commerce & Mobile Matrix',
          desc: 'Suite de pruebas con matriz completa de dispositivos (móvil, tablet, escritorio), aserciones de regresión visual con tolerancia calibrada y fixtures de prueba para carritos y checkout.'
        },
        contracts: {
          title: 'Autonomous Agent Verifier & Test Fixture',
          desc: 'Arnés de verificación en entorno POSIX con validación estricta de esquemas JSON (Draft 2020-12), aserción de contratos de herramientas MCP, fixtures de modelo en bucle local y digests criptográficos de evidencias.'
        },
        webhooks: {
          title: 'Distributed Webhook & Pipeline Engine',
          desc: 'Infraestructura de pruebas para eventos distribuidos, simulación de transacciones con Stripe, validación de cumplimiento de entregabilidad de correo y pruebas de carga con K6.'
        },
        opensource: {
          title: 'Open Source Tooling & Mobile Utilities',
          desc: 'Repositorios open source y aplicaciones móviles que incluyen herramientas de accesibilidad en Android con retroalimentación lumínica (glyphTyping para Nothing Phone) y aplicaciones móviles en React Native / Expo SDK 54 (NLC).'
        }
      }
    },
    gallery: {
      kicker: 'Archivo Personal',
      title: 'Más allá del código.',
      sub: 'Momentos, rutas, naturaleza y mascotas que equilibran la pantalla.',
      lightboxClose: 'Cerrar (Esc)',
      lightboxPrev: 'Anterior (←)',
      lightboxNext: 'Siguiente (→)',
      items: {
        hammock: {
          title: 'Siesta en Hamaca',
          desc: 'Estado de sueño profundo en hamaca acolchada. Cero actividad, máximo confort.'
        },
        peanuts: {
          title: 'Inspección de Cacahuetes',
          desc: 'Inspeccionando el saco de cacahuetes junto a la manta suave.'
        },
        kayak: {
          title: 'Descenso por el río',
          desc: 'Navegando entre orillas frondosas y aguas tranquilas en plena naturaleza.'
        },
        ocean: {
          title: 'Paisaje crucero',
          desc: 'Ondas doradas reflejadas sobre el agua marina al caer la tarde.'
        },
        treat: {
          title: 'Pistacho',
          desc: 'Atención total activada por el crujido de la bolsa de snacks en el parqué.'
        },
        tan: {
          title: 'Quemadura en vacaciones',
          desc: 'Evidencia indiscutible de horas bajo el sol tras un día al aire libre.'
        },
        lol: {
          title: 'Side hustle',
          desc: 'Hito de maestría de campeón (Veigar M98), rango Esmeralda II y Honor 4.'
        }
      }
    },
    experience: {
      kicker: 'Experiencia profesional',
      title: 'Trayectoria probada en<br />calidad de software.',
      sub: 'Aportando rigor técnico, frameworks de automatización escalables y estándares de calidad corporativos en banca, retail y aviación.',
      logoRail: 'Empresas y clientes',
      izertisRole: 'Web & Mobile Test Automation Engineer (SDET)',
      izertisPeriod: 'ENE 2026 – ACTUAL · MADRID (EN REMOTO)',
      izertisClient: 'Laboral Kutxa · Sector Bancario y FinTech Regulado',
      izertisBadge: 'ACTUAL · CONSULTORÍA TECNOLÓGICA',
      izertisBullets: [
        '<strong>Suites de regresión E2E:</strong> Desarrollo y mantenimiento de suites automatizadas con <strong>Playwright</strong> y <strong>TypeScript</strong> bajo BDD (Cucumber/Gherkin) y Page Object Model, cubriendo flujos bancarios de particulares y empresas en escritorio y móvil.',
        '<strong>QA móvil asistido por IA:</strong> Automatización en iOS y Android mediante escenarios Gherkin mapeados a flujos de dispositivo con <strong>BrowserStack</strong> y <strong>Azure Test Plans</strong>; diseño de plantillas de generación con agentes IA y supervisión humana.',
        '<strong>Reporting y auditoría:</strong> Creación de herramienta interna de reporting que convierte datos de Azure Test Plans en evidencias HTML con vídeo, capturas y detalle de pasos para auditorías del <strong>Banco de España</strong>, empaquetada como tarea en <strong>Azure DevOps</strong>.',
        '<strong>CI/CD y gestión de fallos:</strong> Pipelines programados en Azure DevOps con ejecuciones por tags, resultados JUnit, documentación viva en Gherkin, creación automática de work items y avisos en Microsoft Teams.'
      ],
      iteggoRole: 'QA Automation & Test Consultant',
      iteggoPeriod: 'NOV 2024 – ENE 2026 · MADRID (HÍBRIDO)',
      iteggoClient: 'Grupo Dia (Retail) e Iberia (Aviación)',
      iteggoBadge: 'CONSULTORÍA TECNOLÓGICA',
      iteggoBullets: [
        '<strong>Sector Retail (Grupo Dia):</strong> Liderazgo del aseguramiento técnico de calidad para el nuevo motor de promociones con cupones y sistemas críticos de fidelización (notificaciones push, tickets digitales, vista única de cliente).',
        '<strong>Frameworks y migración:</strong> Diseño e implementación de frameworks de pruebas de API con <strong>Karate DSL</strong> y migración de suites E2E frontend desde Selenium a <strong>Playwright</strong>, elevando notablemente la cobertura y estabilidad.',
        '<strong>Validación Event-Driven y APIs:</strong> Pruebas de lógica asíncrona e integridad mediante eventos <strong>Pub/Sub</strong>; validación técnica exhaustiva con <strong>Postman</strong> y <strong>Swagger</strong> asegurando la estabilidad contractual de microservicios.',
        '<strong>Sector Aviación (Iberia):</strong> Diseño y ejecución de pruebas de integración para garantizar interoperabilidad en tiempo real entre sistemas centrales de búsqueda de vuelos (disponibilidad y tarifas) y OTAs globales.'
      ],
      referenceBtn: 'Contactar para referencias',
      secondaryKicker: 'Trayectoria complementaria y roles previos',
      secondaryTitle: 'Experiencia previa en ingeniería y seguridad.',
      gorilastRole: 'Frontend Development Lead',
      gorilastPeriod: 'FEB 2024 – MAY 2024 · 4 MESES · HÍBRIDO',
      gorilastBadge: 'FRONTEND & TESTING',
      gorilastDesc: 'Desarrollo y testing de plataforma de venta online de alto rendimiento: creación de interfaces en React/TypeScript y TailwindCSS, integración de APIs con mapas interactivos y testing automatizado E2E y de componentes con Cypress en GitLab CI/CD.',
      accentureRole: 'Cybersecurity Specialist',
      accenturePeriod: 'ENE 2022 – JUN 2022 · 6 MESES · MADRID',
      accentureBadge: 'SISTEMAS & SEGURIDAD',
      accentureDesc: 'Colaboración en el equipo de ciberseguridad realizando análisis diario de logs y monitorización de sistemas globales para detección temprana de anomalías, riesgos de seguridad y gestión estructurada de incidentes.',
      proBadge: 'QA ASISTIDO POR IA',
      proHeading: 'Testing con Agentes &amp; <em>Supervisión Humana</em>',
      statStep1: '01 · SCOUT',
      statStep1Desc: 'Mapeo de Flujos',
      statStep2: '02 · AUTHOR',
      statStep2Desc: 'Gherkin & POM Modular',
      statStep3: '03 · SANITY',
      statStep3Desc: 'Sandbox & Human Gate',
      proHighlights: [
        '<strong>Cero alucinaciones &amp; Control:</strong> La IA acelera la creación de suites sin perder la predictibilidad ni la robustez del Page Object Model.',
        '<strong>Plantillas modulares E2E:</strong> Generación guiada por contexto funcional para Playwright (web) y Maestro (móvil).',
        '<strong>Mantenimiento automático de regresión:</strong> Reparación asistida de pasos y selectores desfasados tras nuevos despliegues de frontend.'
      ]
    },
    stack: {
      kicker: 'Herramientas y tecnologías',
      title: 'Stack técnico<br />y especialización.',
      sub: 'Conjunto de tecnologías y lenguajes dominados para construir infraestructuras de testing modernas, mantenibles y de alto rendimiento.',
      categories: {
        testing: 'Testing & QA',
        languages: 'Lenguajes',
        cicd: 'CI/CD & DevOps',
        architecture: 'Arquitectura & QA'
      }
    },
    contact: {
      role: 'QA Automation & SDET · <span class="shine">Open to Work</span>',
      heading: 'Diseño y optimizo tu<br />infraestructura de testing.',
      cvBtn: 'Descargar CV',
      githubBtn: 'Perfil de GitHub',
      nameLabel: 'Tu Nombre',
      namePlaceholder: 'ej. Alejandro Morales',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'alejandro@empresa.com',
      subjectLabel: 'Asunto / Empresa',
      subjectPlaceholder: 'Oportunidad QA / Consulta de proyecto',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Hola Juan Carlos, estamos buscando un SDET para nuestra arquitectura de pruebas...',
      sendBtn: 'Enviar mensaje',
      sendingBtn: 'Enviando...',
      directLabel: 'O escribe directamente a:',
      copyBtn: 'Copiar',
      copiedTooltip: '¡Copiado!',
      successTitle: '¡Mensaje enviado con éxito!',
      successMsg: 'Gracias por ponerte en contacto. Te responderé lo antes posible a tu correo.',
      sendAnotherBtn: 'Enviar otro mensaje',
      errorMsg: 'No se pudo enviar el mensaje. Puedes escribir directamente a juancarlosgp212@gmail.com'
    },
    footer: {
      bio: 'QA Automation Engineer & SDET. Especialista en Playwright, Maestro, CI/CD y arquitecturas de prueba.',
      sectionsTitle: 'Secciones',
      cv: 'Descargar CV (PDF)',
      connectTitle: 'Conectar',
      rights: '© 2026 Juan Carlos Gutiérrez Pesquero · Todos los derechos reservados',
      tz: 'Madrid (Fuenlabrada), España · Horario CET',
      backTop: 'Arriba'
    },
    modal: {
      chip: '// MODO DE INICIO',
      title: 'Elige cómo ver el portafolio',
      agentTag: '🔊 CON SONIDO',
      agentTitle: 'Con Agentes',
      agentCopy: 'Reconstrucción en vivo con enjambre de cursores y sonido.',
      agentBtn: 'Iniciar [1]',
      normalTag: 'DIRECTO',
      normalTitle: 'Vista Normal',
      normalCopy: 'Acceso directo al portafolio sin animaciones de espera.',
      normalBtn: 'Entrar [2]',
      footer: '[ 1 ] Agentes · [ 2 ] Normal'
    }
  }
};
