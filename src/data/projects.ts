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
      'Bare-metal C diagnostic tool for PSP-3004 (ARK-5) engineered to accelerate manual hardware validation: continuous assertion for 14 physical buttons (5s hold logic to rule out false contacts), trigonometric analog stick drift and jitter analysis, and battery telemetry. Accompanied by full console tear-down, transparent shell assembly, and 3600mAh battery mod.'
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
      'Comprehensive automated testing architecture for electronic web banking and native mobile apps. Covers critical biometric authentication, wire transfers, and account ledger states. Bi-directional sync with Azure DevOps Test Plans via custom extension and Maestro test runners.'
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
      'Multi-viewport regression test suite (mobile, tablet, desktop) with calibrated pixelmatch visual assertions and deterministic fixtures for carts and checkout flows.'
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
      'POSIX-native verification harness with strict JSON Schema (Draft 2020-12) validation, MCP tool contract assertion, local loopback model fixtures, and cryptographic evidence digests.'
  }
];

// Additional projects reserved for future documentation and expansion
export const pendingProjects: Project[] = [
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
      'Testing infrastructure for distributed events, Stripe transaction simulations, transactional email deliverability assertions, and high-concurrency K6 load testing.'
  },
  {
    id: 'opensource',
    num: '06',
    title: 'Open Source Tooling & Mobile Utilities',
    statusText: 'OPEN SOURCE & LABS',
    statusCategory: 'GITHUB REPOSITORIES',
    statusIndicatorColor: 'var(--accent2)',
    repoUrl: 'https://github.com/JuanCarlosGP',
    clientLabel: 'Repo ↗',
    tags: ['Android A11y', 'Kotlin', 'React Native', 'Hardware Modding'],
    terminalCommand: '$ gh repo list JuanCarlosGP --public',
    terminalLines: [
      'JuanCarlosGP/NLC          [React Native / Expo Mobile]',
      'JuanCarlosGP/glyphTyping  [Android / Accessibility]',
      'JuanCarlosGP/panel-psp    [C / Bare Metal Diagnostics]',
      'Continuous releases, mobile apps & tooling'
    ],
    description:
      'Open-source repositories and mobile apps including Android accessibility utilities with glyph light telemetry (glyphTyping for Nothing Phone) and React Native / Expo SDK 54 mobile apps (NLC).'
  }
];
