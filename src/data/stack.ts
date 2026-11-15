import type { StackCategory } from '@portfolio-types/portfolio';

export const stackCategories: StackCategory[] = [
  {
    title: 'Testing & QA',
    badge: 'CORE SDET',
    skills: [
      { name: 'Playwright', tags: ['E2E', 'Visual Diff'], detail: 'Avanzado' },
      { name: 'WebdriverIO', tags: ['Mobile', 'Web'], detail: 'Avanzado' },
      { name: 'Jest / Vitest', tags: ['Unit', 'Integration'], detail: 'Avanzado' },
      { name: 'K6 / Load Testing', tags: ['Performance', 'SLA'], detail: 'Intermedio' },
      { name: 'Postman / Newman', tags: ['API', 'Collections'], detail: 'Avanzado' },
      { name: 'Pixelmatch (Visual)', tags: ['Threshold', 'Matrix'], detail: 'Avanzado' }
    ]
  },
  {
    title: 'Lenguajes',
    badge: 'STRICT TYPING',
    skills: [
      { name: 'TypeScript', tags: ['Strict', 'Interfaces'], detail: 'Avanzado' },
      { name: 'JavaScript (ESM)', tags: ['Async/Await', 'DOM'], detail: 'Avanzado' },
      { name: 'Python', tags: ['Scripting', 'Automation'], detail: 'Intermedio' },
      { name: 'Bash / Shell', tags: ['POSIX', 'CI Runners'], detail: 'Avanzado' },
      { name: 'Java (Paper / Core)', tags: ['JVM', 'Plugins'], detail: 'Intermedio' },
      { name: 'SQL / SQLite', tags: ['Relational', 'Queries'], detail: 'Intermedio' }
    ]
  },
  {
    title: 'CI/CD & DevOps',
    badge: 'PIPELINE SECURITY',
    skills: [
      { name: 'GitHub Actions', tags: ['Runners', 'Sharding'], detail: 'Avanzado' },
      { name: 'Docker & Containers', tags: ['Images', 'Compose'], detail: 'Intermedio' },
      { name: 'Cloudflare Workers', tags: ['Serverless', 'Edge'], detail: 'Avanzado' },
      { name: 'Arch / Debian Linux', tags: ['Systemd', 'POSIX'], detail: 'Avanzado' },
      { name: 'Git Worktrees & CI', tags: ['Branching', 'VCS'], detail: 'Avanzado' },
      { name: 'NSSM Windows Svc', tags: ['Daemons', 'Services'], detail: 'Intermedio' }
    ]
  },
  {
    title: 'Arquitectura & QA',
    badge: 'ENTERPRISE PATTERNS',
    skills: [
      { name: 'Page Object Model', tags: ['Decoupled', 'Fixtures'], detail: 'Experto' },
      { name: 'Ajv / JSON Schema', tags: ['Draft 2020-12', 'Schema'], detail: 'Avanzado' },
      { name: 'Contract Testing', tags: ['API Specs', 'Payloads'], detail: 'Avanzado' },
      { name: 'BDD / Cucumber', tags: ['Gherkin', 'Scenarios'], detail: 'Intermedio' },
      { name: 'Trace & Video Capture', tags: ['Artifacts', 'Debugging'], detail: 'Avanzado' },
      { name: 'Network Mocking', tags: ['HAR', 'Route Intercept'], detail: 'Avanzado' }
    ]
  }
];
