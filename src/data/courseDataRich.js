/**
 * NeoSkills course detail content — aligned with public program pages:
 * - Azure: https://www.neoskills.co.in/azure/
 * - AWS: https://www.neoskills.co.in/aws-training-certification/
 * - ITIL 5: https://www.neoskills.co.in/itil-5-foundation/
 * Certificate images: place files in /public/certificates/ (e.g. aws-cert.webp) and update paths below.
 */

export const pmpCourse = {
  slug: 'pmp',
  alternateSlugs: ['pmp-morning-batch', 'pmp-bootcamp'],
  category: 'Project Management',
  title: 'PMP® Certification Training',
  fullTitle: 'Project Management Professional (PMP®) Certification',
  icon: 'Award',
  summary:
    'Globally recognized credential for project managers—leadership, predictive and agile delivery, and exam readiness aligned with PMI® standards.',
  description: `The PMP® certification validates your ability to lead projects in any industry. This program follows the latest PMI® exam outline—covering people, process, and business environment—with live instruction, case studies, and structured exam preparation so you can apply concepts on the job and with confidence at the exam.`,
  stats: {
    duration: '6–8 Weeks',
    nextBatch: 'Contact for upcoming batch',
    level: 'Advanced',
    mode: 'Live online (instructor-led)',
    hours: '35+ contact hours',
    certificate: 'PMP® credential pathway (PMI®)',
    placement: 'Career guidance & interview preparation support',
  },
  highlights: [
    'Live instructor-led sessions aligned with the current PMI® exam outline',
    'Agile, hybrid, and predictive approaches with integrated practice',
    'Exam application guidance, mock tests, and question-bank style review',
    'Real-world case studies, templates, and group exercises',
    'Study plans, mentor checkpoints, and doubt-clearing sessions',
    'Lifetime access to recordings & updated materials (as per batch policy)',
  ],
  whoShouldJoin: [
    'Project managers and team leads',
    'Program / delivery managers',
    'PMO and governance professionals',
    'Consultants managing client engagements',
    'Professionals targeting global PM roles',
  ],
  syllabus: [
    {
      week: 'Week 1 — Framework & environment',
      topics: [
        'PMI® code of conduct and exam blueprint',
        'Project vs operations; organizational influences',
        'Tailoring, value delivery, and governance',
      ],
    },
    {
      week: 'Week 2 — Scope, schedule, resources',
      topics: [
        'Scope definition, WBS, and change control',
        'Scheduling techniques and critical path thinking',
        'Resource planning, acquisition, and team development',
      ],
    },
    {
      week: 'Week 3 — Cost, quality, procurement',
      topics: [
        'Cost estimating, budgeting, and earned value basics',
        'Quality planning, assurance, and continuous improvement',
        'Procurement strategy and contract types',
      ],
    },
    {
      week: 'Week 4 — Risk, stakeholders, communications',
      topics: [
        'Risk identification, qualitative/quantitative analysis, responses',
        'Stakeholder engagement strategies',
        'Communications planning and conflict handling',
      ],
    },
    {
      week: 'Week 5 — Agile & hybrid delivery',
      topics: [
        'Agile mindsets, iterations, and backlog refinement',
        'Hybrid lifecycles and tailoring for context',
        'Servant leadership and facilitation',
      ],
    },
    {
      week: 'Week 6 — Exam readiness',
      topics: [
        '180-question style drills and time management',
        'Gap analysis and personalized revision plan',
        'Final mock exam and instructor-led debrief',
      ],
    },
  ],
  certificate: {
    title: 'PMP® certification pathway',
    description:
      'PMI® issues the PMP® credential after you meet eligibility criteria and pass the certification exam. Training focuses on exam readiness and practical application.',
    image: '/certificates/PMI-Certification-page-0001.webp',
  },
  feeDetails: {
    training: 50000,
    exam: 42000,
    total: 92000,
    emi: 'EMI options may be available—ask our admissions team',
    refund: 'Refund policy as per NeoSkills enrollment terms',
    includes: ['Live training & labs', 'Mock exams & study kit', 'Mentor support', 'Exam application guidance'],
  },
  feeDisclaimer:
    'Vendor (PMI®) exam fees and membership are set by PMI® and may change; training fee covers NeoSkills program components listed above.',
  trainers: [
    {
      name: 'NeoSkills PMP® Faculty',
      role: 'Lead Instructor | Program delivery',
      experience: '15+ years',
      certifications: 'PMP®, PMI-ACP®, agile/hybrid delivery',
      image: '/images/nsl_logo__Logo_.svg',
      bio: 'Senior practitioners with large-scale IT and enterprise project experience, focused on exam-ready outcomes and workplace application.',
    },
  ],
  categorySlug: 'project-management',
  learnMoreUrl: 'https://www.neoskills.co.in/',
}

export const awsTrainingCourse = {
  slug: 'aws-training',
  alternateSlugs: [
    'aws-cloud-practitioner',
    'aws-certified-cloud-practitioner',
    'aws-solutions-architect-associate',
    'aws-sysops-administrator',
    'aws-certified-developer-associate',
    'aws-training',
  ],
  category: 'Cloud Computing',
  title: 'AWS Certification Training',
  fullTitle: 'AWS Certification Training with Real-Time Cloud Projects',
  icon: 'Cloud',
  summary:
    'Become AWS certified with hands-on console practice—core services, security, networking, and real-world deployment patterns aligned to certification paths.',
  description: `NeoSkills AWS Certification Training prepares you to design, deploy, and manage scalable cloud infrastructure on Amazon Web Services. The program covers core services, architecture fundamentals, security best practices, networking, and real deployment strategies—with hands-on labs so concepts stick. Content is aligned with the public NeoSkills AWS program narrative: live projects, mock tests, and interview readiness.`,
  stats: {
    duration: '6–8 Weeks',
    nextBatch: 'See homepage upcoming batches',
    level: 'Beginner → Intermediate',
    mode: 'Live online (instructor-led)',
    hours: '40+ live hours (program design)',
    certificate: 'AWS certification pathway (AWS)',
    placement: 'Resume support, mock interviews & career guidance',
  },
  highlights: [
    '40+ hours of live instructor-led training',
    'Hands-on practice in the real AWS console',
    '20+ practical labs and real-world use cases',
    'Certification-focused preparation strategy',
    'Lifetime access to recordings & study materials (as per batch policy)',
    'Resume building and mock interviews',
  ],
  whoShouldJoin: [
    'Freshers starting a cloud career',
    'Developers and admins moving to cloud',
    'IT professionals targeting high-demand cloud roles',
    'Anyone preparing for AWS certification exams',
  ],
  syllabus: [
    {
      week: 'Module 1 — Cloud fundamentals & AWS overview',
      topics: [
        'Cloud models (IaaS, PaaS, SaaS) and economics',
        'AWS global infrastructure: regions & AZs',
        'Shared responsibility model',
        'AWS console walkthrough and IAM basics',
      ],
    },
    {
      week: 'Module 2 — Compute (EC2 & scaling)',
      topics: [
        'Launching EC2 instances, AMIs, and instance families',
        'Security groups, key pairs, and access patterns',
        'Auto Scaling groups and Elastic Load Balancing',
        'High availability patterns',
      ],
    },
    {
      week: 'Module 3 — Storage & databases',
      topics: [
        'Amazon S3 buckets, static hosting, security & versioning',
        'EBS & EFS overview',
        'RDS setup, backup, and scaling basics',
        'Storage best practices',
      ],
    },
    {
      week: 'Module 4 — Networking & security',
      topics: [
        'VPC architecture, subnets, route tables, IGW',
        'NAT gateway patterns',
        'IAM users, roles, policies, and least privilege',
        'Security best practices on AWS',
      ],
    },
    {
      week: 'Module 5 — Monitoring & automation',
      topics: [
        'CloudWatch monitoring, logs, and alerts',
        'AWS CLI fundamentals',
        'Introduction to Infrastructure as Code',
        'Basic CI/CD deployment concepts on AWS',
      ],
    },
    {
      week: 'Module 6 — Projects & certification prep',
      topics: [
        'Capstone-style deployment exercise',
        'Exam strategy, question pacing, and mock tests',
        'Review week with instructor Q&A',
      ],
    },
  ],
  certificate: {
    title: 'AWS certification',
    description:
      'AWS issues digital badges when you pass AWS certification exams. Training covers skills and exam readiness; exam registration and fees are separate.',
    image: '/certificates/AWS-Certificate.jpg',
  },
  feeDetails: {
    training: 40000,
    exam: 0,
    total: 40000,
    emi: 'EMI options may be available—ask admissions',
    refund: 'Refund policy as per NeoSkills enrollment terms',
    includes: ['Live training & guided labs', 'Practice tests & assignments', 'Mentor support', 'Career prep sessions'],
  },
  feeDisclaimer:
    'Certification exam fees are payable separately at actuals directly to AWS. Training fee covers NeoSkills program components listed above.',
  trainers: [
    {
      name: 'NeoSkills AWS Faculty',
      role: 'AWS Authorized / practitioner instructors',
      experience: '10+ years',
      certifications: 'AWS Solutions Architect, DevOps, and related AWS certs',
      image: '/images/nsl_logo__Logo_.svg',
      bio: 'Working cloud professionals who bring implementation insights, best practices, and current case studies into every session.',
    },
  ],
  categorySlug: 'cloud-computing',
  learnMoreUrl: 'https://www.neoskills.co.in/aws-training-certification/',
}

export const azureAiTrainingCourse = {
  slug: 'azure-ai-training',
  alternateSlugs: [
    'microsoft-azure-az-900',
    'azure-administrator-az-104',
    'azure-solutions-architect-az-305',
    'microsoft-azure-devops-az-400',
    'azure-cloud',
    'azure',
  ],
  category: 'Cloud Computing',
  title: 'Azure & AI Certification Training',
  fullTitle: 'Microsoft Azure & AI Combo Certification Training',
  icon: 'Cloud',
  summary:
    'Build job-ready Azure skills from fundamentals to architecture and AI engineering—with live projects, labs, and certification-aligned preparation.',
  description: `This program is structured like NeoSkills’ public Azure & AI offering: master Azure from foundation to advanced topics while integrating intelligent AI solutions. Expect industry-aligned curriculum, hands-on Azure console practice, and preparation across AZ-900, AZ-104, AZ-305, AZ-204, AI-900, and AI-102 style outcomes—with resume and interview preparation support.`,
  stats: {
    duration: '8–12 Weeks (combo pathway)',
    nextBatch: 'See homepage upcoming batches',
    level: 'Beginner → Advanced',
    mode: 'Live online (instructor-led)',
    hours: '40+ live hours (program design)',
    certificate: 'Microsoft Azure & AI certification pathway',
    placement: 'Resume + mock interviews + placement assistance support',
  },
  highlights: [
    'Azure foundation through architecture and developer topics',
    'Hands-on labs: compute, storage, networking, identity, governance',
    'AI fundamentals and Azure AI engineering patterns (incl. Azure OpenAI concepts)',
    'Mock tests and exam strategy sessions',
    'Lifetime access to recordings & materials (as per batch policy)',
    'Real-time project work to cement skills',
  ],
  whoShouldJoin: [
    'IT professionals moving to cloud and AI roles',
    'Developers and admins targeting Azure certifications',
    'Anyone seeking structured Azure + AI employability outcomes',
  ],
  syllabus: [
    {
      week: 'Module 1 — Azure foundation (AZ-900 style)',
      topics: [
        'Cloud concepts and shared responsibility on Azure',
        'Regions, geographies, and core services map',
        'Pricing, SLA, and cost management basics',
        'Security, compliance, and governance introduction',
      ],
    },
    {
      week: 'Module 2 — Azure Administrator (AZ-104 style)',
      topics: [
        'Identity and access: Azure AD, RBAC',
        'Virtual machines, disks, and images',
        'Virtual networks, connectivity, and monitoring',
        'Backup and operational tasks',
      ],
    },
    {
      week: 'Module 3 — Azure architecture (AZ-305 style)',
      topics: [
        'Designing scalable, secure, and cost-optimized solutions',
        'High availability, DR, and hybrid patterns',
        'Governance, landing zones, and policy',
      ],
    },
    {
      week: 'Module 4 — Developer solutions (AZ-204 style)',
      topics: [
        'App hosting models on Azure',
        'ARM / Bicep basics and deployment automation',
        'Git-based workflows and release management',
        'Observability for applications',
      ],
    },
    {
      week: 'Module 5 — AI fundamentals (AI-900 style)',
      topics: [
        'AI workloads on Azure and responsible AI',
        'Machine learning basics on Azure',
        'Cognitive services overview (vision, language)',
      ],
    },
    {
      week: 'Module 6 — Azure AI engineering (AI-102 style)',
      topics: [
        'Azure OpenAI and AI Studio–style workflows',
        'Integrating models safely in enterprise patterns',
        'Evaluation, monitoring, and iteration',
        'Capstone review and certification prep',
      ],
    },
  ],
  certificate: {
    title: 'Microsoft Azure & AI certifications',
    description:
      'Microsoft issues role-based Azure and AI credentials when you pass official exams. Training focuses on skills and exam readiness.',
    image: '/certificates/azure-certificate-1.webp',
  },
  feeDetails: {
    training: 55000,
    exam: 0,
    total: 55000,
    emi: 'EMI options may be available—ask admissions',
    refund: 'Refund policy as per NeoSkills enrollment terms',
    includes: ['Live training & labs', 'Projects', 'Mock tests', 'Career prep'],
  },
  feeDisclaimer:
    'Certification exam fees are payable separately at actuals directly to Microsoft. Training fee covers NeoSkills program components listed above.',
  trainers: [
    {
      name: 'NeoSkills Azure Faculty',
      role: 'Cloud & AI practitioners',
      experience: '12+ years',
      certifications: 'Azure Administrator, Architect, DevOps, AI-related Microsoft paths',
      image: '/images/nsl_logo__Logo_.svg',
      bio: 'Trainers actively working on Azure implementations bring best practices, architecture reviews, and current industry scenarios into class.',
    },
  ],
  categorySlug: 'cloud-computing',
  learnMoreUrl: 'https://www.neoskills.co.in/azure/',
}

export const itil5FoundationCourse = {
  slug: 'itil-5-foundation',
  alternateSlugs: ['itil-4-foundation', 'itil-fnd', 'itil-5-foundation-certification'],
  category: 'IT Service & Architecture',
  title: 'ITIL® 5 Foundation',
  fullTitle: 'ITIL® 5 Foundation Certification Training',
  icon: 'Users',
  summary:
    'Next-generation digital service management—PeopleCert-aligned preparation with intensive practice, weekend-friendly scheduling, and mentor support.',
  description: `NeoSkills ITIL® 5 Foundation training focuses on digital product and service management, the Service Value System (SVS), and the four dimensions model—structured for clarity and exam readiness. The public program emphasizes weekend live delivery, scenario-based learning, and extensive practice materials to help you approach the PeopleCert exam confidently.`,
  stats: {
    duration: '2 weekends (intensive)',
    nextBatch: 'See homepage upcoming batches',
    level: 'Foundation',
    mode: 'Live online (weekend cohorts)',
    hours: '35 contact hours (Sat & Sun, 9 AM – 2 PM style schedule)',
    certificate: 'ITIL® 5 Foundation (PeopleCert)',
    placement: 'Career guidance aligned to service management roles',
  },
  highlights: [
    'Exam-focused approach aligned to PeopleCert ITIL® 5 syllabus',
    'Scenario-based learning with practice question banks',
    'Cheat sheets, study plans, and application guidance',
    'Mentor-supported doubt clearing',
    'Weekend-friendly schedule for working professionals',
  ],
  whoShouldJoin: [
    'IT service and operations professionals',
    'Service desk and support managers',
    'Project managers and product owners in IT delivery',
    'Business analysts working with service value streams',
    'Anyone building a digital service management career',
  ],
  syllabus: [
    {
      week: 'Introduction — ITIL® 5 & digital service management',
      topics: [
        'What is ITIL® 5 and how it evolves service management thinking',
        'Services, products, value, outcomes, costs, and risks',
        'Stakeholders: customers, users, sponsors',
        'Digital transformation context and framework overview',
      ],
    },
    {
      week: 'The ITIL® Service Value System (SVS)',
      topics: [
        'SVS components and the service value chain',
        'Plan, improve, engage, design & transition, obtain/build, deliver & support',
        'Opportunity, demand, and value',
        'Governance within the SVS',
      ],
    },
    {
      week: 'Four dimensions of product & service management',
      topics: [
        'Organizations & people',
        'Information & technology',
        'Partners & suppliers',
        'Value streams & processes',
        'External factors (PESTLE-style awareness)',
      ],
    },
    {
      week: 'Guiding principles & governance',
      topics: [
        'The seven guiding principles in practice',
        'Governance, risk, and compliance considerations',
        'Applying principles to realistic scenarios',
      ],
    },
    {
      week: 'Management practices & continual improvement',
      topics: [
        'Key management practice areas at foundation depth',
        'Continual improvement models and value streams',
        'Measurement, improvement, and collaboration patterns',
      ],
    },
    {
      week: 'Exam readiness',
      topics: [
        '40 MCQ / 60 minute exam pacing (per PeopleCert format guidance)',
        'High-yield review and mock attempts',
        'Final Q&A and exam-day checklist',
      ],
    },
  ],
  certificate: {
    title: 'ITIL® 5 Foundation',
    description:
      'PeopleCert administers ITIL® exams and issues credentials. Training prepares you for the foundation exam; eligibility and exam booking follow PeopleCert rules.',
    image: '/certificates/itil-v5-certi.png',
  },
  feeDetails: {
    training: 26950,
    exam: 29400,
    total: 56350,
    emi: 'EMI options may be available—ask admissions',
    refund: 'Refund policy as per NeoSkills enrollment terms',
    includes: ['Live training', 'Practice bank access', 'Mentor support', 'Exam application guidance'],
  },
  feeDisclaimer:
    'Exam fees and PeopleCert pricing are subject to change; totals shown are representative planning figures—confirm with admissions for your cohort.',
  trainers: [
    {
      name: 'Kunal Paliwal',
      role: 'Project Delivery Director | ITIL® Trainer & Mentor',
      experience: '18+ years',
      certifications: 'ITIL® / ITSM delivery leadership',
      image: '/images/nsl_logo__Logo_.svg',
      bio: 'Seasoned IT service management expert delivering complex digital transformation programs—focused on practical ITIL® outcomes and exam readiness.',
    },
    {
      name: 'Sanjay M Joshi',
      role: 'ITSM Expert | Corporate Trainer & Consultant',
      experience: '20+ years',
      certifications: 'ITSM consulting & training',
      image: '/images/nsl_logo__Logo_.svg',
      bio: 'Experienced ITSM professional specializing in digital product & service management with structured, scenario-driven teaching.',
    },
  ],
  categorySlug: 'it-service-architecture',
  learnMoreUrl: 'https://www.neoskills.co.in/itil-5-foundation/',
}

export const capmCourse = {
  slug: 'capm',
  category: 'Project Management',
  title: 'CAPM® Certification Training',
  fullTitle: 'Certified Associate in Project Management (CAPM®)',
  icon: 'Award',
  summary: 'Entry-level project management certification from PMI® — build foundational skills in project planning, agile frameworks, and exam readiness.',
  description: `The CAPM® certification is your first step toward a career in project management. This program follows the latest PMI® exam outline covering project fundamentals, planning, agile methods, and exam strategy — with live instruction, mock tests, and career guidance.`,
  stats: {
    duration: '4–6 Weeks',
    nextBatch: 'Launching Soon',
    level: 'Beginner',
    mode: 'Live online (instructor-led)',
    hours: '23+ contact hours',
    certificate: 'CAPM® credential pathway (PMI®)',
    placement: 'Resume guidance & interview preparation support',
  },
  highlights: [
    'Live instructor-led sessions aligned with the current PMI® CAPM exam outline',
    'Covers predictive, agile, and hybrid approaches with real-world case studies',
    'Includes mock tests, practice questions, and exam preparation strategy',
    'Resume building, interview prep, and career guidance support',
    '23+ contact hours of structured learning with flexible batch scheduling',
  ],
  whoShouldJoin: [
    'Aspiring project managers looking to start their career',
    'Recent graduates seeking a recognized certification',
    'Professionals transitioning into project management roles',
    'Anyone wanting to understand project management fundamentals',
  ],
  syllabus: [
    {
      week: 'Module 1 — Introduction to CAPM and PMI Framework',
      topics: [
        'Project Management Fundamentals',
        'Project Lifecycle & Methodologies',
        'Roles and Responsibilities of Project Managers',
        'Key Project Management Concepts',
      ],
    },
    {
      week: 'Module 2 — Project Planning and Execution',
      topics: [
        'Project Planning and Scheduling',
        'Work Breakdown Structure (WBS)',
        'Resource and Budget Management',
        'Risk Management Basics',
        'Stakeholder Communication',
      ],
    },
    {
      week: 'Module 3 — Agile and Adaptive Approaches',
      topics: [
        'Agile Project Management Fundamentals',
        'Scrum Framework and Roles',
        'Sprint Planning & Retrospectives',
        'Kanban and Hybrid Approaches',
        'Team Collaboration Techniques',
      ],
    },
    {
      week: 'Module 4 — Exam Prep & Career Launch',
      topics: [
        'CAPM Exam Preparation Strategy',
        'Mock Tests and Practice Questions',
        'Real-world Project Case Studies',
        'Resume & Interview Preparation',
        'Certification and Career Guidance',
      ],
    },
  ],
  certificate: {
    title: 'CAPM® — Certified Associate in Project Management',
    description: 'The CAPM® certification is awarded by PMI® upon passing the exam. NeoSkills training focuses on exam readiness and applied project management skills.',
    image: '/images/nsl-logo.svg',
  },
  feeDetails: {
    training: 18500,
    exam: 36480,
    support: 18500,
    total: 73480,
  },
}

export const courseCategories = [
  { slug: 'project-management', name: 'Project Management' },
  { slug: 'cloud-computing', name: 'Cloud Computing' },
  { slug: 'cybersecurity', name: 'Cybersecurity' },
  { slug: 'agile-scrum-and-devops', name: 'Agile, Scrum & DevOps' },
  { slug: 'it-service-management', name: 'IT Service Management' },
  { slug: 'salesforce', name: 'Salesforce' },
  { slug: 'software-development', name: 'Software Development' },
  { slug: 'iso', name: 'ISO' },
  { slug: 'togaf-architecture', name: 'TOGAF\u00ae Architecture' },
  { slug: 'six-sigma', name: 'Six Sigma' },
  { slug: 'it-governance', name: 'IT Governance' },
  { slug: 'risk-management', name: 'Risk Management' },
  { slug: 'data-science', name: 'Data Science' },
  { slug: 'business-intelligence', name: 'Business Intelligence' },
]

