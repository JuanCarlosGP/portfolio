import type { MethodologyStep } from '@portfolio-types/portfolio';

export const methodologySteps: MethodologyStep[] = [
  {
    step: '01',
    title: 'Resilient Locators',
    description:
      'Aligned with the accessibility tree (ARIA roles, semantic labels, and test contracts) instead of fragile CSS selectors or XPath hierarchies that break with any design tweak.',
    bullets: [
      'Semantic alignment with ARIA',
      'Selectors decoupled from CSS styling',
      'WCAG accessibility test contracts'
    ]
  },
  {
    step: '02',
    title: 'Fixtures & Isolation',
    description:
      'Zero shared state between tests. Synthetic data seeding, browser clock virtualization, and targeted 3rd-party API mocking for highly reproducible, deterministic runs.',
    bullets: [
      '100% isolated environments & browser contexts',
      'Deterministic test data seeding',
      'Targeted dependency network mocking'
    ]
  },
  {
    step: '03',
    title: 'CI/CD Sharding & Gating',
    description:
      'Massive distributed sharding on GitHub Actions and Azure DevOps runners, automatic trace capture on failure, and automated quality gates blocking broken releases.',
    bullets: [
      'Parallel pipelines in GitHub & Azure DevOps',
      'Failure artifact & trace capture',
      'Strict unpassable quality gates'
    ]
  }
];
