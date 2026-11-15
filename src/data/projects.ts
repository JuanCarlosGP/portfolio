import type { Project } from '@portfolio-types/portfolio';

export const projects: Project[] = [
  {
    id: 'psp',
    num: '01',
    title: 'PSP Hardware Diagnostic Tool & Tear-Down Mod',
    statusText: 'HARDWARE QA TOOLING',
    statusCategory: 'HARDWARE',
    statusIndicatorColor: 'var(--emerald)',
    isSlider: true,
    tags: [
      'C / C++ (Bare Metal)',
      'PSPDEV SDK',
      'Micro-Switch Hold',
      'Stick Drift Calibration'
    ],
    repoUrl: 'https://github.com/JuanCarlosGP/panel-psp',
    description:
      'Herramienta de diagnóstico nativa en C para PSP-3004 (ARK-5) diseñada para acelerar la verificación manual de controles físicos: aserción continua de pulsación de 14 botones (hold de 5s para descartar falsos contactos), análisis trigonométrico de deriva y jitter del stick analógico, y telemetría de batería. Proyecto complementado con desmontaje integral y ensamblado de chasis transparente y batería de 3600mAh.'
  },
  {
    id: 'banking',
    num: '02',
    title: 'Enterprise Banking E2E & Mobile Framework',
    statusText: 'STABLE CI & TEST PLANS',
    statusCategory: 'IZERTIS / LABORALKUTXA',
    statusIndicatorColor: 'var(--emerald)',
    clientLabel: 'LaboralKutxa',
    tags: ['Playwright E2E', 'Maestro Mobile', 'Azure DevOps', 'TypeScript'],
    terminalCommand: '$ npx playwright test --project=banking-e2e && maestro test flows/transfers.yaml',
    terminalLines: [
      '[Playwright-Web] 48 specs passed (POM & Azure Test Plans linked)',
      '[Maestro-Mobile] Composite flow: Biometrics & Transfer approved (34s)',
      '[AzDO-Reporter] 82 test results synced to Test Plan #67607 ✔'
    ],
    description:
      'Arquitectura integral de testing automatizado para banca electrónica web y app móvil nativa. Cobertura de flujos críticos de autenticación biométrica, transferencias y estados contables. Integración bidireccional con Azure DevOps Test Plans mediante extensión personalizada y optimización de flujos Maestro mediante runner compuesto.'
  },
  {
    id: 'ecommerce',
    num: '03',
    title: 'Playwright E-Commerce & Mobile Matrix',
    statusText: 'MULTI-VIEWPORT REGRESSION',
    statusCategory: 'PLAYWRIGHT REPO',
    statusIndicatorColor: 'var(--accent2)',
    repoUrl: 'https://github.com/JuanCarlosGP',
    tags: ['Playwright', 'Visual Regression', 'Pixelmatch', 'GitHub Actions'],
    terminalCommand: '$ npx playwright test --project=visual-matrix',
    terminalLines: [
      'Running 36 tests using 4 workers',
      '✓ [Chromium] Mobile Showcase layout (390x844)',
      '✓ [WebKit] Checkout funnel responsive flow',
      'Visual diff: 0 mismatches across 12 viewports'
    ],
    description:
      'Suite de pruebas con matriz completa de dispositivos (móvil, tablet, escritorio), aserciones de regresión visual con tolerancia calibrada y fixtures de prueba para carritos y checkout.'
  },
  {
    id: 'contracts',
    num: '04',
    title: 'Autonomous Agent Verifier & Test Fixture',
    statusText: 'SCHEMA VERIFIER & CONTRACTS',
    statusCategory: 'NATIVE TEST HARNESS',
    statusIndicatorColor: 'var(--accent2)',
    clientLabel: 'Harness',
    tags: ['Ajv JSON Schema', 'Contract Testing', 'Node.js ESM', 'POSIX Tests'],
    terminalCommand: '$ node harness/verify-contracts.mjs --suite=mcp-tools',
    terminalLines: [
      '[SchemaValidator] Ajv2020 validated 24 tool contracts',
      '[Trace] Preserved artifact digest sha256:7f4a...',
      'Verifier receipt: contractCompatibility OK (100%)'
    ],
    description:
      'Arnés de verificación en entorno POSIX con validación estricta de esquemas JSON (Draft 2020-12), aserción de contratos de herramientas MCP, fixtures de modelo en bucle local y digests criptográficos de evidencias.'
  },
  {
    id: 'webhooks',
    num: '05',
    title: 'Distributed Webhook & Pipeline Engine',
    statusText: 'EVENT-DRIVEN AUTOMATION',
    statusCategory: 'WILDSPHERE GROUP',
    statusIndicatorColor: 'var(--flame)',
    clientLabel: 'WildSphere',
    tags: ['Cloudflare Workers', 'Stripe APIs', 'K6 Load Tests', 'Webhooks'],
    terminalCommand: '$ k6 run load-test-webhooks.js',
    terminalLines: [
      '✓ Stripe checkout.session.completed simulated',
      '✓ Cloudflare Worker handled event in 18ms',
      '✓ Zero dropped transactions under spike load'
    ],
    description:
      'Infraestructura de pruebas para eventos distribuidos, simulación de transacciones con Stripe, validación de cumplimiento de entregabilidad de correo y pruebas de carga con K6.'
  },
  {
    id: 'opensource',
    num: '06',
    title: 'Open Source Tooling & Mobile Utilities',
    statusText: 'OPEN SOURCE & LABS',
    statusCategory: 'GITHUB REPOSITORIES',
    statusIndicatorColor: 'var(--accent2)',
    repoUrl: 'https://github.com/JuanCarlosGP',
    clientLabel: 'Perfil ↗',
    tags: ['Android A11y', 'Kotlin', 'React Native', 'Hardware Modding'],
    terminalCommand: '$ gh repo list JuanCarlosGP --public',
    terminalLines: [
      'JuanCarlosGP/NLC          [React Native / Expo Mobile]',
      'JuanCarlosGP/glyphTyping  [Android / Accessibility]',
      'JuanCarlosGP/panel-psp    [C / Bare Metal Diagnostics]',
      'Continuous releases, mobile apps & tooling'
    ],
    description:
      'Repositorios open source y aplicaciones móviles que incluyen herramientas de accesibilidad en Android con retroalimentación lumínica (glyphTyping para Nothing Phone) y aplicaciones móviles en React Native / Expo SDK 54 (NLC).'
  }
];
