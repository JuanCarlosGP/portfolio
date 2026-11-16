import type { ExperienceItem, SecondaryExperienceItem } from '@portfolio-types/portfolio';

export const experience: ExperienceItem[] = [
  {
    id: 'izertis',
    period: 'JAN 2026 – PRESENT · MADRID (REMOTE)',
    company: 'IZERTIS, S.A.',
    client: 'LABORAL KUTXA · FINANCIAL SECTOR',
    role: 'Web & Mobile Test Automation Engineer (SDET)',
    badge: 'CURRENT · TECH CONSULTING',
    bullets: [
      '<strong>E2E Regression Suites:</strong> Development and maintenance of automated suites with Playwright and TypeScript, following BDD (Cucumber/Gherkin) and Page Object Model, covering personal and business banking journeys across desktop and mobile.',
      '<strong>Mobile & AI-Assisted QA:</strong> Native iOS and Android automation via Gherkin scenarios mapped to device flows with BrowserStack and Azure Test Plans; designed agent-based test generation templates with human review.',
      '<strong>Audit Evidence Reporting:</strong> Developed an internal reporting tool converting Azure Test Plans data into HTML audit evidence with screenshots, videos, and step logs for Bank of Spain compliance audits, packaged as an Azure DevOps task.',
      '<strong>CI/CD & Failure Management:</strong> Scheduled regression pipelines in Azure DevOps with tagged runs, JUnit results, living Gherkin documentation, automatic work item creation, and Microsoft Teams notifications.'
    ],
    skills: ['Playwright', 'TypeScript', 'Maestro', 'Azure DevOps', 'Azure Test Plans', 'BrowserStack', 'Cucumber BDD', 'React/Next.js']
  },
  {
    id: 'iteggo',
    period: 'NOV 2024 – JAN 2026 · MADRID (HYBRID)',
    company: 'ITEGGO CONSULTING',
    client: 'GRUPO DIA (RETAIL) & IBERIA (AVIATION)',
    role: 'QA Automation & Test Consultant',
    badge: 'TECH CONSULTING',
    bullets: [
      '<strong>Retail Sector (Grupo Dia):</strong> Led technical quality assurance for the new coupon promotional engine and high-availability loyalty systems (push notifications, digital tickets, single customer view).',
      '<strong>Frameworks & Migration:</strong> Designed and implemented API automation with Karate DSL and migrated frontend E2E from Selenium to Playwright, significantly increasing code coverage and test stability.',
      '<strong>Event-Driven & API Validation:</strong> Validated asynchronous workflows and message integrity via Pub/Sub events; executed microservices contract assertions with Postman and Swagger.',
      '<strong>Aviation Sector (Iberia):</strong> Designed functional and integration test structures to validate real-time transaction processing between core flight search engines (availability and pricing) and global OTAs.'
    ],
    skills: ['Karate DSL', 'Playwright', 'Selenium', 'Postman', 'Swagger', 'Pub/Sub', 'Jira', 'Confluence']
  }
];

export const secondaryExperience: SecondaryExperienceItem[] = [
  {
    id: 'gorilast',
    period: 'FEB 2024 – MAY 2024 · 4 MOS',
    company: 'Gorilast',
    role: 'Frontend Development Lead & Testing',
    badge: 'E-COMMERCE & FRONTEND',
    detail: 'Contributed to high-performance online sales platform scalability and robustness: built interactive React/TypeScript UIs, integrated API services with map visualizations, and designed E2E and component tests with Cypress in GitLab CI/CD.',
    skills: ['React', 'TypeScript', 'TailwindCSS', 'Cypress', 'GitLab CI']
  },
  {
    id: 'accenture',
    period: 'JAN 2022 – JUN 2022 · 6 MOS',
    company: 'Accenture Spain',
    role: 'Cybersecurity Specialist',
    badge: 'SYSTEMS & SECURITY',
    detail: 'Collaborated within Accenture cybersecurity team performing daily analysis of logs and system activity across global teams to detect anomalous behavior, security risks, and structured incident management.',
    skills: ['Cybersecurity', 'Log Analysis', 'Incident Management', 'Enterprise Systems', 'Java']
  }
];

export const proHighlights = [
  {
    company: 'Zero Hallucinations & Control',
    detail: 'AI accelerates test authoring without sacrificing predictability or Page Object Model robustness.'
  },
  {
    company: 'Modular E2E Templates',
    detail: 'Context-guided generation for Playwright (web) and Maestro (mobile).'
  },
  {
    company: 'Automated Regression Maintenance',
    detail: 'Assisted repair of broken steps and outdated selectors following new frontend deployments.'
  }
];
