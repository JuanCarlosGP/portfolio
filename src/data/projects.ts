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
    id: 'rag',
    num: '02',
    title: 'RAG Evaluation & LLM-as-a-Judge Quality Gate',
    statusText: 'BUILDING // IN PROGRESS',
    statusCategory: 'RAGAS / DEEPEVAL',
    statusIndicatorColor: '#10b981',
    clientLabel: 'Building...',
    previewImage: '/projects/wip-rag.svg',
    isWip: true,
    tags: ['DeepEval / Ragas', 'LLM-as-a-Judge', 'Faithfulness Metric', 'CI/CD Gate'],
    terminalCommand: '$ deepeval test run tests/rag_pipeline.py --threshold=0.95',
    terminalLines: [
      '[DeepEval] 120 golden query-context synthetic test cases executed',
      '✓ Faithfulness: 98.4% | Context Relevance: 96.1% (PASS)',
      'Quality Gate: 0 hallucinations detected · CI Gate PASSED (Exit 0)'
    ],
    description:
      'Automated CI/CD quality gate for Retrieval-Augmented Generation (RAG) pipelines. Uses LLM-as-a-Judge to continuously assert Groundedness, Faithfulness, and Context Relevance across a golden evaluation dataset. Fails the build if hallucination rate or semantic drift exceeds strict thresholds prior to production deployment.'
  },
  {
    id: 'agents',
    num: '03',
    title: 'Deterministic Agent Harness & Loop Verifier',
    statusText: 'BUILDING // IN PROGRESS',
    statusCategory: 'MCP / JSON SCHEMA',
    statusIndicatorColor: '#60a5fa',
    clientLabel: 'Building...',
    previewImage: '/projects/wip-agents.svg',
    isWip: true,
    tags: ['MCP Protocol', 'Deterministic Fixtures', 'JSON Schema 2020-12', 'Loop Detection'],
    terminalCommand: '$ node harness/agent-runner.mjs --suite=mcp-tools --deterministic',
    terminalLines: [
      '[AgentRunner] 24 tool-call contracts verified via Model Context Protocol',
      '[StateVerifier] Max recursion depth: 4 · Loop detection: CLEAN',
      '[ReplayEngine] Cache hit: 100% · Run time: 380ms · Token cost: $0.00'
    ],
    description:
      'POSIX-native deterministic test harness for multi-step LLM agents and tool calling. Features recorded VCR replay fixtures to eliminate flaky API latency and zero out CI token costs, paired with strict Draft 2020-12 JSON Schema validation and state machine loop detection to prevent agent recursion traps.'
  },
  {
    id: 'redteam',
    num: '04',
    title: 'LLM Red-Teaming & Security Guardrails Suite',
    statusText: 'BUILDING // IN PROGRESS',
    statusCategory: 'PROMPTFOO / SECURITY',
    statusIndicatorColor: '#f97316',
    clientLabel: 'Building...',
    previewImage: '/projects/wip-redteam.svg',
    isWip: true,
    tags: ['Promptfoo', 'OWASP Top 10 LLM', 'Jailbreak Resistance', 'PII Leak Prevention'],
    terminalCommand: '$ promptfoo eval -c redteam.yaml --no-cache',
    terminalLines: [
      '[Adversarial] 250 attack vectors: DAN, indirect injections, system prompt extraction',
      '✓ Jailbreak resistance: 100% · Guardrails triggered: 250/250',
      '✓ Zero PII leaks detected (credit cards, API keys, emails shielded)'
    ],
    description:
      'Automated adversarial test suite aligned with OWASP Top 10 for LLMs. Runs automated prompt injection, jailbreak attempts, and simulated data exfiltration against model endpoints, validating that input/output guardrails intercept attacks and prevent credential leakage before production releases.'
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
