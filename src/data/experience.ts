import type { ExperienceItem } from '@portfolio-types/portfolio';

export const experience: ExperienceItem[] = [
  {
    period: 'CENTRO MADRID · CONTRATO INDEFINIDO · ÁREA DE QA AUTOMATION',
    company: 'IZERTIS, S.A.',
    role: 'Consultoría Tecnológica & QA',
    badge: 'LEAD AUTOMATION',
    bullets: [
      'Desarrollo y arquitectura de suites de automatización E2E con Playwright (web) y Maestro (mobile) para banca digital (LaboralKutxa).',
      'Integración de suites de prueba con Azure DevOps Test Plans y pipelines de CI/CD, sincronizando evidencias y estados de ejecución mediante extensiones personalizadas.',
      'Auditorías y automatización de accesibilidad web (A11y / WCAG 2.1) con Axe-core, validación de contratos de API y pruebas de integración con TypeScript.',
      'Supervisión de métricas de fiabilidad, contención de tests inestables y coordinación técnica en equipos multidisciplinares de desarrollo.'
    ]
  }
];

export const proHighlights = [
  {
    company: 'WildSphere Group LLC',
    detail:
      'Arquitecturas de automatización en la nube, integración continua en Cloudflare Workers y gestión transaccional con Stripe.'
  },
  {
    company: 'Entornos Linux & Self-Hosted',
    detail:
      'Configuración de infraestructura y runners locales de alto rendimiento (Linux, systemd, automatización POSIX y monitorización distribuida).'
  },
  {
    company: 'Cultura de calidad Shift-Left',
    detail:
      'Detección de anomalías en fases tempranas de PR mediante linters estrictos, validación de tipos y contratos estáticos.'
  }
];
