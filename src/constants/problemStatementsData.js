// ============================================
// HACKQUBIT 2.0 - OFFICIAL PROBLEM STATEMENTS DATA
// ============================================

export const TRACK_CATEGORIES = [
  { id: "all", label: "All Bounties", icon: "Compass", count: 16 },
  { id: "sponsored", label: "Sponsored Track", icon: "Award", count: 1 },
  { id: "healthcare", label: "Healthcare & Biotech", icon: "Activity", count: 3 },
  { id: "ai-ml", label: "AI / Machine Learning", icon: "Brain", count: 3 },
  { id: "cybersecurity", label: "Cybersecurity & Privacy", icon: "Shield", count: 3 },
  { id: "web3", label: "Web3 & Blockchain", icon: "Coins", count: 3 },
  { id: "agents", label: "AI Agents Systems", icon: "Bot", count: 3 },
];

export const PROBLEM_STATEMENTS = [
  // ── SPONSORED / INDUSTRY TRACK (1) ──
  {
    id: "ps-sponsored-01",
    number: "Sponsored PS",
    domain: "Sponsored Track",
    category: "sponsored",
    tags: [
      "Sponsored Track",
      "Open-Source CRM",
      "Docker Compose",
      "Self-Hosted",
      "PostgreSQL/MySQL",
      "RBAC",
      "Voice Calling & Recording",
      "WhatsApp Business API",
      "Email (SMTP/IMAP)",
      "SMS Integration",
      "Object Storage"
    ],
    title: "Research, Deploy & Present an Open-Source CRM (Self-Hosted Full-Stack CRM with Communication Integrations)",
    badge: "Sponsored Track • Enterprise Cloud & CRM",
    brief:
      "Find and deploy the best suitable open-source CRM that can be fully hosted on a local server and provides complete Frontend + Backend source code. Teams must research and benchmark 3–5 leading open-source CRMs (evaluating features, UI/UX, tech stack, community support, licensing, customization, and deployment requirements), containerize and deploy the selected solution locally via Docker Compose (Frontend, Backend, PostgreSQL/MySQL database, and persistent Object/File Storage for documents & audio recordings), configure 5-tier Role-Based Access Control (RBAC), and establish an end-to-end integration path for omni-channel communications (Email, Voice Calling with call recording, WhatsApp Business/Cloud API, and SMS).",
    mustBuild: [
      "Research & Benchmark 3–5 Open-Source CRMs: In-depth comparison covering features, modern UI/UX, tech stack, community support, licensing (AGPL/Apache/MIT), customization flexibility, and deployment overhead to justify your final selection.",
      "Complete Source Code & Local Repository: Clone and deliver full frontend, backend/API, database schemas, and supporting services in a structured repository ready for developer modification and extension.",
      "Docker & Docker Compose Deployment: Complete multi-container orchestration for local server hosting, including Frontend, Backend, Relational Database (PostgreSQL or MySQL), and Object/File Storage (MinIO or S3-compatible) with persistent Docker volumes.",
      "Core CRM Features & 5-Tier RBAC: Standard lead, contact, company/account, and opportunity deal pipelines, tasks, follow-ups, notes, calendar, history, documents, dashboard reports, and strict Role-Based Access Control (Super Admin, Admin, Manager, Sales Executive, Support/User) with configurable module permissions.",
      "Omni-Channel Communication Architecture: Native or API-integrated pipelines for: (1) Email (send/receive via SMTP/IMAP linked to customer timeline), (2) Voice Calling (incoming/outgoing calls, logs, audio recording securely saved to object storage, linked to contacts), (3) WhatsApp (official WhatsApp Business/Cloud API integration), and (4) SMS (configurable gateway with communication log).",
      "Deployment Deliverables & Live Demo: Provide .env.example, database setup/seed scripts, storage configuration, API integration documentation, admin demo credentials, and prepare a local server presentation detailing architecture, RBAC, workflows, and future scalability."
    ],
    deliverables:
      "CRM comparison report & selection rationale; complete source code in local Git repo; production-ready Docker Compose deployment with persistent volumes & .env.example; database migration/seed instructions; object storage setup for call recordings & attachments; admin credentials for the local demo; API/integration documentation for Email, Voice, WhatsApp, and SMS; and a live presentation demo running on local server.",
    keyChallenge:
      "Deploying a fully self-hosted full-stack CRM on Docker with persistent object storage for call recordings, granular 5-tier RBAC enforcement, and designing unified omni-channel communication workflows (Voice WebRTC/SIP, WhatsApp Cloud API, Email, SMS) linked directly to customer timelines."
  },


  // ── HEALTHCARE & BIOTECH (3) ──
  {
    id: "ps-01",
    number: "Problem 01",
    domain: "Healthcare & Biotech",
    category: "healthcare",
    tags: ["Healthcare", "Mobile AI", "Offline-First", "Computer Vision"],
    title: "Early Detection of Diabetic Retinopathy and Oral Cancer on Low-End Hardware",
    badge: "Track 01 • Health & Vision",
    brief:
      "Millions of people in rural areas never get screened for diabetic retinopathy or oral cancer because specialists and expensive equipment are scarce. Health camps do capture images, but they are often blurry, badly lit and taken on basic smartphones, which makes standard models unreliable.",
    mustBuild: [
      "A screening model that runs fully offline on a budget Android phone and classifies severity from fundus or oral-cavity images.",
      "An image-quality gate that rejects unusable photos and guides the health worker to retake them.",
      "An explainability view (heatmaps plus plain-language reasoning) so non-specialists can trust and verify the result.",
      "A referral flow that flags high-risk cases and stores results for later sync."
    ],
    deliverables:
      "Working mobile app, trained model with evaluation on poor-quality images, sensitivity/specificity report, and a short note on bias across skin tones and devices.",
    keyChallenge:
      "Accuracy under resource and data constraints; explainability for health workers."
  },
  {
    id: "ps-02",
    number: "Problem 02",
    domain: "Healthcare & Biotech",
    category: "healthcare",
    tags: ["Healthcare", "OCR", "Knowledge Graph", "Multilingual"],
    title: "Drug-Drug and Drug-Food Interaction Checker for Polypharmacy Patients",
    badge: "Track 01 • Bio-Pharma Safety",
    brief:
      "Elderly patients often take five or more medicines prescribed by different doctors, and dangerous interactions go unnoticed. Prescriptions are frequently handwritten and patients read only regional languages.",
    mustBuild: [
      "An OCR pipeline that reads handwritten or printed prescriptions and normalises drug names to standard codes.",
      "A knowledge graph of drug-drug and drug-food interactions with severity levels.",
      "A patient-friendly alert system that explains each risk in regional languages, in text and voice.",
      "A doctor-facing summary view that suggests safer alternatives for review."
    ],
    deliverables:
      "Prototype app or web tool, interaction knowledge graph, OCR accuracy benchmark on real or realistic prescriptions, and demo in at least two Indian languages.",
    keyChallenge:
      "OCR on messy prescriptions, knowledge graphs, multilingual output."
  },
  {
    id: "ps-03",
    number: "Problem 03",
    domain: "Healthcare & Biotech",
    category: "healthcare",
    tags: ["Healthcare", "Federated Learning", "Privacy", "Differential Privacy"],
    title: "Privacy-Preserving Collaboration Across Hospitals",
    badge: "Track 01 • Federated Health",
    brief:
      "Hospitals hold valuable data that could train better diagnostic models, but privacy law and patient trust prevent sharing raw records. As a result each hospital trains on a small, biased dataset.",
    mustBuild: [
      "A federated learning setup where at least three simulated hospitals train a shared diagnostic model without exchanging raw data.",
      "Differential privacy protections and a measurable privacy-vs-accuracy trade-off.",
      "A consent management layer where patients can opt in, opt out and see how their data contributed.",
      "A dashboard comparing local-only models against the federated model."
    ],
    deliverables:
      "Working federated pipeline, consent module, privacy analysis (epsilon values, attack tests), and comparison results on a public medical dataset.",
    keyChallenge:
      "Federated learning, differential privacy, consent management."
  },

  // ── AI / MACHINE LEARNING (3) ──
  {
    id: "ps-14",
    number: "Problem 14",
    domain: "AI / Machine Learning",
    category: "ai-ml",
    tags: ["AI/ML", "Hallucination Detection", "Verification", "NLI"],
    title: "Hallucination Detection and Verification Layer for LLM Applications",
    badge: "Track 02 • LLM Guardrails",
    brief:
      "LLM-powered products confidently state wrong facts, and users cannot tell which answers to trust. Teams need a reusable check that sits between the model and the user.",
    mustBuild: [
      "Middleware that breaks an answer into individual claims and checks each against trusted sources.",
      "Confidence scores and inline citations attached to every verified or unverified claim.",
      "An evaluation harness with a labelled benchmark and metrics for precision and recall of hallucination flags.",
      "A demo integration with a simple chatbot or RAG app."
    ],
    deliverables:
      "Deployable verification service, benchmark results against baselines, and latency and cost analysis.",
    keyChallenge:
      "Retrieval, claim extraction, evaluation methodology."
  },
  {
    id: "ps-15",
    number: "Problem 15",
    domain: "AI / Machine Learning",
    category: "ai-ml",
    tags: ["AI/ML", "Edge SLM", "Quantization", "Offline Tutoring"],
    title: "On-Device Small Language Model for Offline Tutoring",
    badge: "Track 02 • Edge Intelligence",
    brief:
      "Students in low-connectivity regions have no access to tutoring, and cloud models are unaffordable or unreachable. A capable model that runs on a low-cost phone could change that.",
    mustBuild: [
      "A compressed, fine-tuned small language model that answers subject questions aligned to a school curriculum.",
      "An on-device inference app that works with no internet on a phone costing around eight thousand rupees (~₹8,000).",
      "A step-by-step explanation style and a safety layer that keeps answers on-curriculum.",
      "An evaluation comparing accuracy, speed and memory against larger cloud models."
    ],
    deliverables:
      "Android app, fine-tuned and quantized model, and benchmark report on curriculum questions.",
    keyChallenge:
      "Quantization, distillation, curriculum alignment, evaluation."
  },
  {
    id: "ps-17",
    number: "Problem 17",
    domain: "AI / Machine Learning",
    category: "ai-ml",
    tags: ["AI/ML", "Fairness Audit", "Explainability", "Compliance"],
    title: "Bias Auditing and Explainability Toolkit for Deployed ML Models",
    badge: "Track 02 • Model Governance",
    brief:
      "Organisations deploy models for hiring, lending and triage without being able to test them for bias or explain individual decisions, and regulators increasingly ask for evidence.",
    mustBuild: [
      "A tool where non-experts upload a model or predictions and a dataset and receive a bias, drift and explainability audit.",
      "Support for intersectional fairness metrics and clear guidance on which metric fits which situation.",
      "Per-decision explanations in plain language.",
      "An auto-generated compliance-style report with recommendations."
    ],
    deliverables:
      "Working web tool, audit of at least two public models, and a sample report.",
    keyChallenge:
      "Metric selection, intersectional fairness, usable explanations."
  },

  // ── CYBERSECURITY & PRIVACY (3) ──
  {
    id: "ps-10",
    number: "Problem 10",
    domain: "Cybersecurity & Privacy",
    category: "cybersecurity",
    tags: ["Cybersecurity", "Deepfake Detection", "WebRTC", "Audio/Video AI", "Real-Time Defense"],
    title: "Real-Time Deepfake Voice and Video Scam Detection",
    badge: "Track 03 • Deepfake Defense",
    brief:
      "Scammers now use cloned voices and face-swapped video to impersonate relatives, officials and executives during live calls. Existing detectors are offline, slow and easy to evade.",
    mustBuild: [
      "A lightweight detector that scores live audio and video streams for synthetic content with low latency.",
      "A user-facing warning that appears during a call without disrupting it.",
      "Robustness testing against compression, noise and adversarial changes.",
      "Threshold tuning that balances missed scams against false alarms."
    ],
    deliverables:
      "Working demo on a live call or streamed video, accuracy and latency benchmarks, and an adversarial robustness report.",
    keyChallenge:
      "Low latency, adversarial robustness, false-positive control."
  },
  {
    id: "ps-11",
    number: "Problem 11",
    domain: "Cybersecurity & Privacy",
    category: "cybersecurity",
    tags: ["Cybersecurity", "Anti-Phishing", "UPI Fraud", "Perceptual Hashing", "Threat Intelligence"],
    title: "Fake UPI and Payment Page and App Detection at Scale",
    badge: "Track 03 • Anti-Phishing & UPI Shield",
    brief:
      "Attackers clone banking and payment interfaces and distribute them through links, messages and fake apps. Takedowns are slow because the infrastructure behind the clones is not mapped.",
    mustBuild: [
      "A crawler that discovers suspicious pages and apps from certificate logs, messages and reports.",
      "A visual and behavioural similarity engine that matches clones to genuine brands.",
      "An infrastructure graph linking domains, hosts, wallets and phone numbers into campaigns.",
      "An analyst dashboard and automated takedown report generator."
    ],
    deliverables:
      "End-to-end detection pipeline, precision/recall on a labelled sample, and campaign-clustering demo.",
    keyChallenge:
      "Visual similarity, URL and behavioural analysis, evasion tactics."
  },
  {
    id: "ps-12",
    number: "Problem 12",
    domain: "Cybersecurity & Privacy",
    category: "cybersecurity",
    tags: ["Cybersecurity", "Supply-Chain Security", "OSS Security", "Static/Dynamic Analysis", "Sandboxing"],
    title: "Supply-Chain Attack Detection in Open-Source Dependencies",
    badge: "Track 03 • OSS Supply-Chain Shield",
    brief:
      "Malicious packages, typosquats and compromised maintainer updates reach developers through npm and PyPI before anyone notices. Manual review cannot keep up with release volume.",
    mustBuild: [
      "A scanner that analyses new package releases statically for suspicious patterns (obfuscation, install scripts, network calls).",
      "A sandbox that runs packages and records behaviour such as file, network and process activity.",
      "An anomaly model that compares each release to the package's own history.",
      "A developer-facing CLI or CI plug-in that blocks or warns on risky updates."
    ],
    deliverables:
      "Working scanner and sandbox, detection results on known malicious packages, and measured false-positive rate on popular benign ones.",
    keyChallenge:
      "Static and dynamic code analysis, behavioural anomaly detection."
  },

  // ── WEB3 & BLOCKCHAIN (3) ──
  {
    id: "ps-23",
    number: "Problem 23",
    domain: "Web3 & Blockchain",
    category: "web3",
    tags: ["Web3", "Zero-Knowledge", "DID", "Verifiable Credentials", "Smart Contracts"],
    title: "Privacy-Preserving Digital Identity and Credential Verification",
    badge: "Track 04 • Zero-Knowledge ID",
    brief:
      "Proving who you are or what you hold (age, degree, licence) usually means handing over full documents, which are copied, stored and leaked. Users need to prove a claim without revealing the data behind it.",
    mustBuild: [
      "A credential issuance flow where an institution issues a verifiable credential to a holder wallet.",
      "Zero-knowledge proofs for selective claims such as over 18 or degree holder, verified by a smart contract or verifier app.",
      "A revocation mechanism so withdrawn credentials stop working.",
      "A usable wallet and verifier interface for non-technical users."
    ],
    deliverables:
      "Working issuer, wallet and verifier on a testnet, circuit design notes, and an analysis of what information each proof reveals.",
    keyChallenge:
      "Zero-knowledge proof design, revocation, usability."
  },
  {
    id: "ps-24",
    number: "Problem 24",
    domain: "Web3 & Blockchain",
    category: "web3",
    tags: ["Web3", "Supply Chain", "IoT", "Decentralized Storage", "Anti-Counterfeit"],
    title: "Tamper-Proof Medicine and Food Supply-Chain Provenance",
    badge: "Track 04 • Trust Provenance",
    brief:
      "Counterfeit medicines and adulterated food enter supply chains because records are paper-based or entered by the same parties who benefit from cheating. Consumers cannot verify origin.",
    mustBuild: [
      "On-chain batch registration with off-chain data stored on decentralised storage.",
      "IoT or scan-based attestations (temperature, location, handover) that are written without manual entry.",
      "A consumer verification flow using QR or NFC that shows the full journey and any breaks in the cold chain.",
      "A defined approach to oracle trust and fraud scenarios."
    ],
    deliverables:
      "Working contracts, sensor or simulated attestation feed, consumer scan app, and a threat model covering counterfeit insertion and data tampering.",
    keyChallenge:
      "Oracle trust, off-chain and on-chain data design, counterfeit resistance."
  },
  {
    id: "ps-26",
    number: "Problem 26",
    domain: "Web3 & Blockchain",
    category: "web3",
    tags: ["Web3", "Smart Contract Security", "Formal Verification", "Fuzzing", "LLM Analysis"],
    title: "AI-Assisted Smart Contract Vulnerability Detection and Formal Verification",
    badge: "Track 04 • Protocol Security",
    brief:
      "Smart contract bugs have cost billions, and manual audits are expensive and slow. Static tools produce many false alarms and miss novel exploit patterns.",
    mustBuild: [
      "A pipeline combining static analysis, fuzzing and LLM reasoning to find exploitable issues.",
      "Automatic generation and testing of exploit proofs-of-concept to reduce false positives.",
      "Plain-language explanations and suggested fixes for each finding.",
      "Optional formal properties checked for critical invariants."
    ],
    deliverables:
      "Working tool, benchmark on known vulnerable contracts and past exploits, and a comparison against existing scanners.",
    keyChallenge:
      "False positives, novel exploit classes, benchmarking against real hacks."
  },

  // ── AI AGENTS SYSTEMS (3) ──
  {
    id: "ps-18",
    number: "Problem 18",
    domain: "AI Agents Systems",
    category: "agents",
    tags: ["AI Agents", "Cloud Resilience", "Autonomous Triage", "Observability"],
    title: "Multi-Agent Incident-Response System for Cloud Outages",
    badge: "Track 05 • DevOps Autonomy",
    brief:
      "When production systems fail, engineers lose critical time sifting through logs, metrics and traces. Automation exists for alerts, but not for reasoning about causes and safely fixing them.",
    mustBuild: [
      "A team of agents that ingest telemetry, form and test root-cause hypotheses, and rank them.",
      "Remediation proposals (rollback, restart, scale) with a clear explanation and an approval step.",
      "Blast-radius controls so no agent can take an action beyond its permissions.",
      "A replayable incident timeline for post-mortems."
    ],
    deliverables:
      "Working multi-agent system on a simulated microservice environment with injected failures, and results on time-to-diagnosis and correctness.",
    keyChallenge:
      "Reliable tool use, root-cause reasoning, blast-radius control."
  },
  {
    id: "ps-19",
    number: "Problem 19",
    domain: "AI Agents Systems",
    category: "agents",
    tags: ["AI Agents", "Civic Tech", "Long-Horizon Planning", "Human-in-the-Loop"],
    title: "Citizen-Service Agent That Completes Government Processes End to End",
    badge: "Track 05 • Citizen GovTech",
    brief:
      "Getting a certificate, subsidy or licence means navigating forms, document rules and offices, and many people give up or pay middlemen. An agent could handle the process, but it must be trustworthy and accountable.",
    mustBuild: [
      "An agent that collects required documents, validates them, fills forms and tracks application status.",
      "Multilingual conversation and voice support.",
      "Explicit user consent for every sensitive action and a full audit log.",
      "Failure recovery and escalation to a human helper when stuck."
    ],
    deliverables:
      "Working agent against a mock government portal, long-horizon task success rate, and a design note on consent and accountability.",
    keyChallenge:
      "Long-horizon task completion, accountability, consent, failure recovery."
  },
  {
    id: "ps-21",
    number: "Problem 21",
    domain: "AI Agents Systems",
    category: "agents",
    tags: ["AI Agents", "Agent Sandbox", "Prompt Injection Defense", "Tool Security"],
    title: "Security Layer for Tool-Using Agents",
    badge: "Track 05 • Agent Firewall",
    brief:
      "Agents that browse, read email or call tools can be hijacked by hidden instructions in the content they process, leaking data or taking harmful actions. Developers lack a standard defence.",
    mustBuild: [
      "A firewall that inspects inputs, tool calls and outputs for prompt injection, data exfiltration and privilege escalation.",
      "A policy engine that defines what each agent may do, with least privilege by default.",
      "Sandboxed tool execution and tamper-evident audit logs.",
      "A red-team suite of attacks and a measurement of attack success rate before and after protection."
    ],
    deliverables:
      "Deployable proxy or library, attack taxonomy, benchmark results, and false-positive analysis on benign tasks.",
    keyChallenge:
      "Attack taxonomy, low false positives, policy design."
  }
];
