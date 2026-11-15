import type { ScenarioSuite } from '@portfolio-types/portfolio';

export const scenariosData: Record<string, ScenarioSuite> = {
  e2e: {
    id: 'e2e',
    pillLabel: 'Website E2E',
    title: 'google-website-e2e.spec.ts',
    specFile: 'google-website-e2e.spec.ts',
    omniboxUrl: 'https://www.google.com',
    statusBadge: '200 OK',
    engineBadge: 'CHROMIUM',
    totalSpecs: 6,
    specs: [
      { name: "page.goto('https://www.google.com')", duration: 1050, assertion: 'HTTP 200' },
      { name: "locator('textarea[name=\"q\"]').fill('playwright test automation engineer')", duration: 420, assertion: 'Input typed' },
      { name: "page.waitForResponse('**/complete/search?*') → HTTP 200", duration: 780, assertion: '200 OK' },
      { name: "expect(page.getByRole('button', { name: 'Buscar con Google' })).toBeVisible()", duration: 320, assertion: 'Visible' },
      { name: "page.keyboard.press('Enter') → Results loaded", duration: 880, assertion: 'DOM Ready' },
      { name: "expect(page.locator('#search .g')).toHaveCount(10)", duration: 360, assertion: '10 items' }
    ],
    asciiType: 'PASSED',
    summaryItems: [
      'Target App: https://www.google.com',
      '6/6 E2E specs executed with zero flakiness',
      'Network mocks: 0 timeout leaks',
      'Artifacts: trace.playwright.dev, video, snapshot'
    ]
  },
  api: {
    id: 'api',
    pillLabel: 'API Testing',
    title: 'google-api-testing.contract.ts',
    specFile: 'google-api-testing.contract.ts',
    omniboxUrl: 'https://www.google.com/complete/search?q=how+to+hire',
    statusBadge: '200 OK · 14ms',
    engineBadge: 'REST / JSON',
    totalSpecs: 5,
    specs: [
      { name: "GET /complete/search?client=chrome&q=how+to+hire → HTTP 200", duration: 720, assertion: '200 OK' },
      { name: "Schema: Strict JSON Schema Draft 2020-12 validation", duration: 380, assertion: 'Valid' },
      { name: "Headers: Cache-Control & Content-Type: application/json", duration: 280, assertion: 'Valid' },
      { name: "Payload: Expect suggestions[0] === 'Juan Carlos Gutierrez'", duration: 460, assertion: 'Matched' },
      { name: "Performance: p99 latency < 45ms across 100 iterations", duration: 840, assertion: '14ms' }
    ],
    asciiType: 'API',
    summaryItems: [
      'Google Autocomplete API Contract verified',
      'Strict payload type validation (zero drift)',
      'SLA: p99 latency 14ms (Target: < 100ms)'
    ]
  },
  a11y: {
    id: 'a11y',
    pillLabel: 'Accessibility',
    title: 'google-accessibility-wcag.spec.ts',
    specFile: 'google-accessibility-wcag.spec.ts',
    omniboxUrl: 'https://www.google.com/#a11y-audit',
    statusBadge: 'WCAG 2.2 AAA',
    engineBadge: 'AXE-CORE',
    totalSpecs: 5,
    specs: [
      { name: "AxeBuilder(page).include('#searchform').analyze() → 0 Violations", duration: 920, assertion: '0 Violations' },
      { name: "Color Contrast: 7:1 ratio verified across dark canvas (WCAG AAA)", duration: 540, assertion: '7:1 AAA' },
      { name: "ARIA & Landmarks: Combobox, listbox role & live regions valid", duration: 480, assertion: 'Valid' },
      { name: "Keyboard Focus: Tab order navigable & focus visible ring", duration: 650, assertion: 'Navigable' },
      { name: "Screen Reader Audit: Explicit labels on search & mic buttons", duration: 380, assertion: 'Labeled' }
    ],
    asciiType: 'A11Y',
    summaryItems: [
      'Engine: @axe-core/playwright v4.10',
      'Target: WCAG 2.2 Level AA / AAA Compliant',
      'Audit: Zero automated or semi-automated violations',
      'Accessibility Tree: 100% compliant landmarks & roles'
    ]
  },
  cicd: {
    id: 'cicd',
    pillLabel: 'CI/CD',
    title: 'google-testing-pipeline.yml',
    specFile: 'google-testing-pipeline.yml',
    omniboxUrl: 'https://github.com/juancarlos/google-e2e/actions/1420',
    statusBadge: 'GREEN GATE',
    engineBadge: 'GITHUB ACTIONS',
    totalSpecs: 4,
    specs: [
      { name: 'Lint & Typecheck: Strict ESM & TypeScript validation', duration: 550, assertion: 'Pass' },
      { name: 'Parallel Matrix: Sharded on 4 Linux VM workers', duration: 1100, assertion: 'Sharded' },
      { name: 'Cross-Browser: Chromium, Firefox & WebKit headless', duration: 920, assertion: '3 Browsers' },
      { name: 'Quality Gate: Automatic green light for deploy', duration: 380, assertion: 'Green Gate' }
    ],
    asciiType: 'PIPELINE',
    summaryItems: [
      'Automated PR Gating: Passed',
      'Parallel matrix: Sharded on 4 Linux workers',
      'Status: Ready for Production Push'
    ]
  },
  perf: {
    id: 'perf',
    pillLabel: 'Performance',
    title: 'google-performance-audit.spec.ts',
    specFile: 'google-performance-audit.spec.ts',
    omniboxUrl: 'https://www.google.com/#lighthouse-audit',
    statusBadge: 'SCORE 100/100',
    engineBadge: 'LIGHTHOUSE v12',
    totalSpecs: 4,
    specs: [
      { name: 'Largest Contentful Paint (LCP): 0.65s (Good < 2.5s)', duration: 750, assertion: '0.65s' },
      { name: 'Interaction to Next Paint (INP): 24ms (Good < 200ms)', duration: 420, assertion: '24ms' },
      { name: 'Cumulative Layout Shift (CLS): 0.00 (Zero layout jump)', duration: 310, assertion: '0.00' },
      { name: 'Time to Interactive (TTI): 0.8s · Total Blocking: 0ms', duration: 580, assertion: '0.8s' }
    ],
    asciiType: 'PERF',
    summaryItems: [
      'Lighthouse Performance: 100/100',
      'LCP: 0.65s (Good < 2.5s)',
      'INP: 24ms (Good < 200ms)',
      'CLS: 0.00 (Zero Cumulative Shift)'
    ]
  }
};
