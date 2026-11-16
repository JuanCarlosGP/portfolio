import type { StackCategory } from '@portfolio-types/portfolio';

export const stackCategories: StackCategory[] = [
  {
    title: 'Testing & QA',
    badge: 'CORE SDET',
    skills: [
      { name: 'Playwright', tags: ['E2E', 'Visual Diff'], detail: 'Avanzado' },
      { name: 'Maestro (Mobile)', tags: ['iOS', 'Android'], detail: 'Avanzado' },
      { name: 'Jest / Vitest', tags: ['Unit', 'Integration'], detail: 'Avanzado' },
      { name: 'K6 / Load Testing', tags: ['Performance', 'SLA'], detail: 'Intermedio' },
      { name: 'Postman / Newman', tags: ['API', 'Collections'], detail: 'Avanzado' },
      { name: 'Axe-core (A11y)', tags: ['WCAG 2.1', 'Audits'], detail: 'Avanzado' }
    ]
  },
  {
    title: 'Languages',
    badge: 'STRICT TYPING',
    skills: [
      { name: 'TypeScript', tags: ['Strict', 'Interfaces'], detail: 'Avanzado' },
      { name: 'JavaScript (Node.js)', tags: ['Async/Await', 'ESM'], detail: 'Avanzado' },
      { name: 'Python', tags: ['Scripting', 'Automation'], detail: 'Intermedio' },
      { name: 'Bash / Shell', tags: ['POSIX', 'CI Runners'], detail: 'Avanzado' },
      { name: 'Java (Core / JVM)', tags: ['OOP', 'Backend'], detail: 'Intermedio' },
      { name: 'SQL / SQLite', tags: ['Relational', 'Queries'], detail: 'Intermedio' }
    ]
  },
  {
    title: 'CI/CD & DevOps',
    badge: 'PIPELINE SECURITY',
    skills: [
      { name: 'GitHub Actions', tags: ['Runners', 'Matrix'], detail: 'Avanzado' },
      { name: 'Azure DevOps', tags: ['Pipelines', 'Enterprise'], detail: 'Avanzado' },
      { name: 'Docker & Containers', tags: ['Images', 'Compose'], detail: 'Intermedio' },
      { name: 'Cloudflare Workers', tags: ['Serverless', 'Edge'], detail: 'Avanzado' },
      { name: 'Linux / POSIX Env', tags: ['CLI', 'Systemd'], detail: 'Avanzado' },
      { name: 'Git Workflows', tags: ['Branching', 'CI Triggers'], detail: 'Avanzado' }
    ]
  },
  {
    title: 'Architecture & QA',
    badge: 'ENTERPRISE PATTERNS',
    skills: [
      { name: 'Page Object Model', tags: ['Decoupled', 'Fixtures'], detail: 'Experto' },
      { name: 'Contract Testing', tags: ['API Specs', 'Payloads'], detail: 'Avanzado' },
      { name: 'Ajv / JSON Schema', tags: ['Draft 2020-12', 'Schema'], detail: 'Avanzado' },
      { name: 'BDD / Cucumber', tags: ['Gherkin', 'Scenarios'], detail: 'Intermedio' },
      { name: 'Allure Reporting', tags: ['Dashboards', 'Trends'], detail: 'Avanzado' },
      { name: 'Network Mocking', tags: ['HAR', 'Route Intercept'], detail: 'Avanzado' }
    ]
  }
];
