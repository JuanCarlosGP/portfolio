import type { MethodologyStep } from '@portfolio-types/portfolio';

export const methodologySteps: MethodologyStep[] = [
  {
    step: '01',
    title: 'Localizadores Resilientes',
    description:
      'Alineados con el árbol de accesibilidad (roles ARIA, etiquetas semánticas y contratos de prueba) en lugar de selectores CSS frágiles o jerarquías XPath que se rompen con cualquier cambio de diseño.',
    bullets: [
      'Alineación semántica con ARIA',
      'Selectores desacoplados del CSS',
      'Contratos de accesibilidad WCAG'
    ]
  },
  {
    step: '02',
    title: 'Fixtures y Aislamiento',
    description:
      'Cero dependencias compartidas entre pruebas. Inyección de datos sintéticos, control del reloj del navegador y mockeo selectivo de APIs de terceros para ejecuciones altamente reproducibles y deterministas.',
    bullets: [
      'Entornos y contextos 100% aislados',
      'Inyección determinista de datos',
      'Mockeo selectivo de dependencias'
    ]
  },
  {
    step: '03',
    title: 'CI/CD Sharding & Gating',
    description:
      'Paralelización masiva distribuida en runners de GitHub Actions, recopilación automática de trazas de ejecución en fallos y bloqueo automático de despliegues cuando no se cumplen los umbrales de calidad.',
    bullets: [
      'Sharding paralelo en GitHub Actions',
      'Captura de trazas y vídeos en fallo',
      'Quality Gates infranqueables'
    ]
  }
];
