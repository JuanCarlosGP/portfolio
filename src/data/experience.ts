import type { ExperienceItem } from '@portfolio-types/portfolio';

export const experience: ExperienceItem[] = [
  {
    period: 'CENTRO MADRID · CONTRATO INDEFINIDO · ÁREA DE QA AUTOMATION',
    company: 'IZERTIS, S.A.',
    role: 'Consultoría Tecnológica & QA',
    badge: 'LEAD AUTOMATION',
    bullets: [
      'Desarrollo y mantenimiento de frameworks de automatización E2E en WebdriverIO y Playwright para banca digital (LaboralKutxa).',
      'Aseguramiento de calidad en pipelines de despliegue continuo y validaciones de actualizaciones OTA en aplicaciones móviles y de escritorio.',
      'Implementación de contratos de API y pruebas de integración con TypeScript, reduciendo el tiempo de regresión en un 70%.',
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
      'Configuración de servidores de alto rendimiento (Arch Linux, gateways locales, NSSM y monitorización distribuida).'
  },
  {
    company: 'Cultura de calidad Shift-Left',
    detail:
      'Detección de anomalías en fases tempranas de PR mediante linters estrictos, validación de tipos y contratos estáticos.'
  }
];
