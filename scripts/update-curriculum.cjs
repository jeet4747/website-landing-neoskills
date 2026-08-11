const fs = require('fs')
const path = require('path')

const coursesPath = path.join(__dirname, '..', 'server', 'courses.json')
const courses = JSON.parse(fs.readFileSync(coursesPath, 'utf8'))

const curriculums = {
  // ═══ PRINCE2 ═══
  'prince2-foundation': {
    summary: 'PRINCE2 Foundation certification — master the PRINCE2 principles, themes, processes, and tailored project management approach.',
    description: 'PRINCE2 Foundation introduces the PRINCE2 methodology — a structured, process-based approach to project management. This course covers the seven principles, seven themes, and seven processes that form the PRINCE2 framework, preparing you for the Foundation exam.',
    syllabus: [
      { week: 'Module 1 — PRINCE2 Principles & Framework', topics: ['Introduction to PRINCE2 methodology and exam structure', 'Seven PRINCE2 principles — continued business justification, learn from experience, defined roles, manage by stages, manage by exception, focus on products, tailor to environment', 'Project vs programme vs operational work', 'PRINCE2 roles and responsibilities across the project team'] },
      { week: 'Module 2 — PRINCE2 Themes', topics: ['Business Case theme — developing and maintaining justification', 'Organization theme — stakeholder engagement and roles', 'Quality theme — quality planning, control, and assurance', 'Risk theme — identifying, assessing, and responding to risks', 'Plans, Progress, and Change themes — integrated planning and control'] },
      { week: 'Module 3 — PRINCE2 Processes', topics: ['Starting Up a Project (SU) and Initiating a Project (IP)', 'Directing a Project (DP) and Controlling a Stage (CS)', 'Managing Product Delivery (MP) and Managing a Stage Boundary (SB)', 'Closing a Project (CP) — handover, evaluation, and lessons learned'] },
      { week: 'Module 4 — Exam Preparation & Application', topics: ['PRINCE2 Foundation exam format, question types, and strategy', 'Tailoring PRINCE2 for different project sizes and environments', 'Mock tests and practice questions with detailed review', 'Real-world case studies and project documentation examples'] },
    ],
  },
  'prince2-practitioner': {
    summary: 'PRINCE2 Practitioner — apply PRINCE2 in real projects, tailor the framework, and prepare for the Practitioner exam.',
    description: 'PRINCE2 Practitioner focuses on applying the PRINCE2 methodology to real-world scenarios. You will learn to tailor PRINCE2 principles, themes, and processes to different project contexts, and demonstrate competency in managing projects using the PRINCE2 framework.',
    syllabus: [
      { week: 'Module 1 — Advanced PRINCE2 Application', topics: ['Practitioner-level exam format and assessment criteria', 'Applying the seven principles in complex project environments', 'Tailoring PRINCE2 themes to organizational context', 'Advanced stakeholder management and communication strategies'] },
      { week: 'Module 2 — Process Tailoring & Integration', topics: ['Tailoring processes for agile, hybrid, and traditional environments', 'Integrating PRINCE2 with other methodologies (PMI, Agile, ITIL)', 'Managing multiple work streams and stage boundaries', 'Advanced product-based planning techniques'] },
      { week: 'Module 3 — Scenario-Based Decision Making', topics: ['Analyzing project scenarios and recommending PRINCE2 approaches', 'Business case evaluation and benefits realization', 'Risk and issue management in complex projects', 'Quality management and assurance in practice'] },
      { week: 'Module 4 — Practitioner Exam Preparation', topics: ['Objective-testing exam questions and marking scheme', 'Scenario-based question techniques and time management', 'Full-length mock exams with detailed debrief', 'Real-world case studies and application review'] },
    ],
  },
  'prince2-agile-foundation': {
    summary: 'PRINCE2 Agile Foundation — combine PRINCE2 governance with agile delivery methods for flexible project management.',
    description: 'PRINCE2 Agile Foundation extends the PRINCE2 framework with agile concepts, behaviours, and techniques. Learn to apply PRINCE2 in agile environments while maintaining effective governance, control, and collaboration.',
    syllabus: [
      { week: 'Module 1 — Agile & PRINCE2 Fundamentals', topics: ['PRINCE2 Agile overview and exam structure', 'Agile principles, behaviours, and the Agile Manifesto', 'Blending PRINCE2 governance with agile flexibility', 'When and why to use PRINCE2 Agile'] },
      { week: 'Module 2 — Agile Behaviours & Techniques', topics: ['Agile behaviours — transparency, collaboration, communication', 'Agile techniques — user stories, retrospectives, timeboxing, MoSCoW', 'Lean and Kanban concepts for project management', 'Incorporating feedback loops and iterative delivery'] },
      { week: 'Module 3 — PRINCE2 Agile Processes & Themes', topics: ['Tailoring PRINCE2 processes for agile delivery', 'Agile roles and responsibilities in PRINCE2 context', 'Quality, risk, and change themes in agile environments', 'Planning and progress monitoring with agile ceremories'] },
      { week: 'Module 4 — Foundation Exam Preparation', topics: ['Exam format, question types, and key terminology', 'Mock tests covering agile concepts and PRINCE2 integration', 'Scenario-based practice questions', 'Study tips and review of key concepts'] },
    ],
  },
  'prince2-agile-practitioner': {
    summary: 'PRINCE2 Agile Practitioner — apply blended PRINCE2 and agile approaches in complex project environments.',
    description: 'PRINCE2 Agile Practitioner builds on the Foundation level, focusing on applying the combined framework to real-world scenarios. Learn to tailor PRINCE2 Agile for different contexts and demonstrate mastery of agile project governance.',
    syllabus: [
      { week: 'Module 1 — Advanced PRINCE2 Agile Application', topics: ['Practitioner exam format and scenario-based assessment', 'Applying agile behaviours in PRINCE2-managed projects', 'Tailoring themes and processes for agile delivery', 'Advanced stakeholder collaboration and communication'] },
      { week: 'Module 2 — Agile Techniques in Depth', topics: ['Rich planning and progressive estimating', 'Agile contracts and commercial considerations', 'Agile monitoring and control mechanisms', 'Integrating agile tools within PRINCE2 governance'] },
      { week: 'Module 3 — Scenario-Based Decision Making', topics: ['Analyzing complex project scenarios', 'Recommending tailored PRINCE2 Agile approaches', 'Balancing governance, agility, and risk', 'Benefits realization in agile environments'] },
      { week: 'Module 4 — Practitioner Exam Preparation', topics: ['Objective-testing exam with scenario-based questions', 'Full-length mock exams with detailed solutions', 'Time management and question strategy', 'Real-world case studies and application review'] },
    ],
  },
  'prince2-f-and-p': {
    summary: 'PRINCE2 Foundation & Practitioner combined — complete PRINCE2 certification pathway from fundamentals to advanced application.',
    description: 'This combined program covers both PRINCE2 Foundation and Practitioner levels in an accelerated format. Master the PRINCE2 methodology from principles and themes through to advanced application and tailoring for real-world projects.',
    syllabus: [
      { week: 'Module 1 — PRINCE2 Principles & Foundation Concepts', topics: ['PRINCE2 overview, exam structure, and certification pathway', 'Seven principles and their application across projects', 'PRINCE2 roles, responsibilities, and project organization', 'Business Case theme and continued justification'] },
      { week: 'Module 2 — Themes, Processes & Controls', topics: ['Organization, Quality, Risk, and Plans themes', 'Change, Progress, and Benefits themes in depth', 'Seven processes — from Starting Up to Closing a Project', 'Management products and documentation standards'] },
      { week: 'Module 3 — Agile Integration & Practitioner Application', topics: ['PRINCE2 Agile behaviours, techniques, and tailoring', 'Applying PRINCE2 in agile, hybrid, and traditional environments', 'Scenario-based analysis and decision making', 'Advanced tailoring for complex and large-scale projects'] },
      { week: 'Module 4 — Combined Exam Preparation', topics: ['Foundation exam — format, practice tests, and review', 'Practitioner exam — objective-testing scenarios and techniques', 'Full-length mock exams at both levels', 'Exam strategy, time management, and final review'] },
    ],
  },

  // ═══ GOOGLE CLOUD ═══
  'google-cloud': {
    summary: 'Google Cloud certification — master GCP fundamentals, compute, storage, networking, and data services.',
    description: 'Google Cloud Platform (GCP) certification validates your ability to design, build, and manage cloud solutions on Google Cloud. This course covers core GCP services, architecture best practices, security, and exam preparation.',
    syllabus: [
      { week: 'Module 1 — Google Cloud Fundamentals', topics: ['GCP overview — regions, zones, and resource hierarchy', 'Compute Engine — VMs, machine types, and disk options', 'Google Kubernetes Engine (GKE) — containers and orchestration', 'Cloud IAM — identity, roles, and access management'] },
      { week: 'Module 2 — Storage, Networking & Security', topics: ['Cloud Storage — buckets, classes, and lifecycle policies', 'Cloud SQL, Spanner, Bigtable, and Firestore databases', 'VPCs, subnets, firewalls, Cloud NAT, and load balancing', 'Cloud CDN, Cloud Armor, and security best practices'] },
      { week: 'Module 3 — Data, Analytics & AI Services', topics: ['BigQuery — serverless data warehousing and analytics', 'Dataflow, Dataproc, and Pub/Sub for data pipelines', 'Vertex AI — ML model training, deployment, and management', 'Cloud Functions, Cloud Run, and serverless architectures'] },
      { week: 'Module 4 — DevOps, Monitoring & Exam Prep', topics: ['Cloud Build, Artifact Registry, and CI/CD pipelines', 'Cloud Monitoring, Logging, Error Reporting, and Trace', 'Exam strategy, sample questions, and practice tests', 'Real-world architecture scenarios and best practices'] },
    ],
  },

  // ═══ AGILE & SCRUM ═══
  'certified-scrum-master-csm': {
    summary: 'Certified ScrumMaster (CSM) — master Scrum framework, agile principles, and servant leadership for effective team facilitation.',
    description: 'The Certified ScrumMaster (CSM) credential from Scrum Alliance validates your understanding of Scrum principles and your ability to serve as an effective Scrum Master. Learn agile practices, team facilitation, and impediment removal.',
    syllabus: [
      { week: 'Module 1 — Agile & Scrum Foundations', topics: ['Agile Manifesto, principles, and mindset', 'Scrum overview — roles, events, and artifacts', 'Scrum values — commitment, courage, focus, openness, respect', 'Empirical process control — transparency, inspection, adaptation'] },
      { week: 'Module 2 — Scrum Roles & Responsibilities', topics: ['Scrum Master — servant leadership, facilitation, coaching', 'Product Owner — vision, backlog, stakeholder management, value', 'Development Team — cross-functional, self-organizing, accountability', 'Role interactions and fostering collaboration'] },
      { week: 'Module 3 — Scrum Events & Artifacts', topics: ['Sprint Planning — defining sprint goal and backlog', 'Daily Scrum — synchronization, impediments, adaptation', 'Sprint Review — demonstrating value and gathering feedback', 'Sprint Retrospective — continuous improvement and action items', 'Product Backlog, Sprint Backlog, and Increment management'] },
      { week: 'Module 4 — Application & CSM Exam Prep', topics: ['Agile estimating and planning techniques', 'Burndown charts, velocity, and progress tracking', 'CSM exam format, study guide, and practice questions', 'Real-world Scrum implementation scenarios and challenges'] },
    ],
  },
  'professional-scrum-master-i-psm-i': {
    summary: 'Professional Scrum Master I (PSM I) — demonstrate mastery of Scrum and the Scrum Master role with Scrum.org certification.',
    description: 'PSM I certification from Scrum.org validates your knowledge of Scrum framework and your ability to apply Scrum practices effectively. This course covers the Scrum Guide in depth with evidence-based management approaches.',
    syllabus: [
      { week: 'Module 1 — Scrum Framework Deep Dive', topics: ['Scrum theory, empiricism, and the three pillars', 'Scrum Guide — complete review of roles, events, and artifacts', 'Scrum values and their application in practice', 'Difference between Scrum and traditional waterfall approaches'] },
      { week: 'Module 2 — Scrum Master as Servant Leader', topics: ['Scrum Master accountabilities — coaching, facilitation, teaching', 'Managing stakeholders and fostering stakeholder engagement', 'Self-managing teams and organizational agility', 'Removing impediments and enabling team performance'] },
      { week: 'Module 3 — Planning & Progress in Scrum', topics: ['Multi-level planning — vision, roadmap, release, sprint', 'Product backlog refinement and user story mapping', 'Forecasting, velocity, and burndown/up charts', 'Definition of Done and quality management'] },
      { week: 'Module 4 — PSM I Exam Preparation', topics: ['PSM I assessment format, time constraints, and scoring', 'Open assessments and practice exams with detailed review', 'Scrum Master scenarios and decision-making exercises', 'Real-world Scrum implementation case studies'] },
    ],
  },
  'professional-scrum-master-ii-psm-ii': {
    summary: 'Professional Scrum Master II (PSM II) — advanced Scrum Master skills for scaling, coaching, and organizational change.',
    description: 'PSM II validates your advanced Scrum Master knowledge and ability to apply Scrum in complex environments. Focus on scaling Scrum, coaching teams, facilitating organizational change, and leading agile transformations.',
    syllabus: [
      { week: 'Module 1 — Advanced Scrum Mastery', topics: ['PSM II assessment format and advanced competencies', 'Scrum beyond the team — organizational agility and culture', 'Systemic thinking and understanding team dynamics', 'Advanced facilitation techniques for conflict resolution'] },
      { week: 'Module 2 — Scaling Scrum & Frameworks', topics: ['Scrum of Scrums and Nexus framework overview', 'Large-scale agile coordination and dependency management', 'Multi-team backlog management and integration', 'Organizational structures for agile at scale'] },
      { week: 'Module 3 — Coaching & Organizational Change', topics: ['Coaching agile teams, product owners, and leadership', 'Leading agile transformations and change management', 'Metrics for agile effectiveness and organizational improvement', 'Building communities of practice and learning culture'] },
      { week: 'Module 4 — Complex Scenarios & Assessment Prep', topics: ['Case studies — Scrum implementation challenges', 'Advanced evidence-based management techniques', 'PSM II assessment practice with complex scenarios', 'Creating actionable improvement plans for organizations'] },
    ],
  },
  'professional-scrum-product-owner-i-pspo-i': {
    summary: 'Professional Scrum Product Owner I (PSPO I) — master product ownership, value maximization, and stakeholder management with Scrum.org.',
    description: 'PSPO I validates your knowledge of the Product Owner role and your ability to maximize product value through effective backlog management, stakeholder engagement, and evidence-based decision making.',
    syllabus: [
      { week: 'Module 1 — Product Owner Role & Accountabilities', topics: ['Scrum Guide — Product Owner accountabilities and responsibilities', 'Product vision, strategy, and goal setting', 'Stakeholder identification, management, and expectation setting', 'Value-driven development and ROI optimization'] },
      { week: 'Module 2 — Product Backlog Management', topics: ['Product Backlog creation, refinement, and ordering techniques', 'User stories, acceptance criteria, and story mapping', 'Backlog decomposition — epics, features, stories, tasks', 'Multi-level planning — product, release, and sprint'] },
      { week: 'Module 3 — Value Maximization & Evidence-Based Decisions', topics: ['Techniques for measuring and maximizing value', 'Evidence-Based Management (EBM) — goals and key value areas', 'Market analysis, customer feedback, and data-driven decisions', 'Release management, forecasting, and stakeholder communication'] },
      { week: 'Module 4 — PSPO I Exam Preparation', topics: ['PSPO I assessment format, question types, and strategy', 'Open assessments and mock exams with detailed feedback', 'Product Owner scenarios and stakeholder interactions', 'Real-world case studies in product ownership'] },
    ],
  },
  'professional-scrum-product-owner-ii-pspo-ii': {
    summary: 'Professional Scrum Product Owner II (PSPO II) — advanced product leadership, portfolio management, and agile value delivery at scale.',
    description: 'PSPO II validates advanced Product Owner skills for complex environments, including managing value across multiple products, advanced stakeholder strategies, and driving customer-centric innovation at scale.',
    syllabus: [
      { week: 'Module 1 — Advanced Product Ownership', topics: ['PSPO II assessment structure and advanced competencies', 'Product portfolios and managing value across multiple products', 'Advanced stakeholder management and expectation alignment', 'Customer research, discovery, and experimentation techniques'] },
      { week: 'Module 2 — Value at Scale & Strategy', topics: ['Scaling product ownership — multiple teams and dependencies', 'Evidence-based management for product portfolios', 'Product strategy, roadmapping, and OKR alignment', 'Managing product lifecycle from inception to retirement'] },
      { week: 'Module 3 — Innovation & Market Leadership', topics: ['Design thinking, Lean Startup, and product discovery', 'A/B testing, metrics, and data-informed product decisions', 'Innovation accounting and validated learning', 'Competitive analysis and market positioning strategies'] },
      { week: 'Module 4 — Complex Scenarios & PSPO II Exam Prep', topics: ['Case studies — complex product ownership challenges', 'Multi-team product backlog coordination and integration', 'PSPO II assessment practice with scenario-based questions', 'Creating value-driven product strategies and roadmaps'] },
    ],
  },
  'professional-scrum-master-ai-essentials-certification': {
    summary: 'PSM AI Essentials — integrate AI tools and practices into Scrum for enhanced team productivity and intelligent product delivery.',
    description: 'Professional Scrum Master AI Essentials combines Scrum mastery with artificial intelligence concepts. Learn to leverage AI tools for backlog management, sprint planning, team collaboration, and data-driven agile decision making.',
    syllabus: [
      { week: 'Module 1 — Scrum Foundations & AI Landscape', topics: ['Scrum framework review — roles, events, artifacts', 'AI and ML fundamentals for Scrum teams', 'Opportunities for AI in agile project management', 'Ethical AI considerations in product development'] },
      { week: 'Module 2 — AI-Enhanced Scrum Practices', topics: ['AI-powered backlog prioritization and refinement', 'Intelligent sprint planning with predictive analytics', 'Automated stand-ups and AI-driven progress tracking', 'AI-assisted retrospectives — pattern recognition and insights'] },
      { week: 'Module 3 — AI Tools for Product Owners & Teams', topics: ['AI for user story generation and acceptance criteria', 'Automated testing, CI/CD, and quality prediction', 'AI-driven stakeholder communication and reporting', 'Building AI-powered product features — team collaboration'] },
      { week: 'Module 4 — Exam Prep & AI Integration Strategy', topics: ['PSM AI Essentials assessment format and practice', 'Developing an AI integration roadmap for Scrum teams', 'Real-world case studies — AI in agile organizations', 'Future trends — AI, ML, and the evolving Scrum Master role'] },
    ],
  },
  'advanced-certified-scrum-product-owner-a-cspo': {
    summary: 'Advanced Certified Scrum Product Owner (A-CSPO) — deepen product ownership skills with advanced backlog techniques and stakeholder strategies.',
    description: 'A-CSPO from Scrum Alliance advances your Product Owner capabilities beyond the foundation level. Master advanced backlog management, value optimization, stakeholder engagement, and product strategy techniques.',
    syllabus: [
      { week: 'Module 1 — Advanced Product Ownership Mindset', topics: ['A-CSPO learning objectives and certification pathway', 'Product Owner as strategic leader — vision, strategy, tactics', 'Advanced stakeholder mapping and engagement models', 'Product discovery vs delivery — balancing exploration'] },
      { week: 'Module 2 — Value-Driven Backlog Management', topics: ['Advanced backlog ordering techniques — value, risk, dependency', 'Lean and Lean Startup principles for product ownership', 'Experimentation and validated learning approaches', 'Metrics — leading and lagging indicators for product success'] },
      { week: 'Module 3 — Stakeholder Collaboration & Communication', topics: ['Managing multiple stakeholders with competing priorities', 'Product roadmap communication and transparency', 'Release planning and customer-centric delivery', 'Negotiation and conflict resolution for Product Owners'] },
      { week: 'Module 4 — Real-World Application & Certification', topics: ['Case studies — product ownership challenges and solutions', 'A-CSPO assessment preparation and practice', 'Building an actionable product improvement plan', 'Community, resources, and continuous learning path'] },
    ],
  },
  'agile-advanced-certified-scrummaster-a-csm': {
    summary: 'Advanced Certified ScrumMaster (A-CSM) — elevate Scrum Master skills with advanced coaching, facilitation, and agile leadership.',
    description: 'A-CSM from Scrum Alliance builds upon your CSM foundation. Develop advanced coaching techniques, facilitation skills, and agile leadership capabilities to drive high-performing Scrum teams and organizational agility.',
    syllabus: [
      { week: 'Module 1 — Advanced Scrum Master Facilitation', topics: ['A-CSM learning journey and competency framework', 'Advanced facilitation techniques — decision-making, conflict resolution', 'Liberating Structures and collaborative meeting formats', 'Design thinking and problem-solving workshops'] },
      { week: 'Module 2 — Coaching Agile Teams', topics: ['Professional coaching skills for Scrum Masters', 'Team dynamics assessment and intervention strategies', 'Coaching self-managing teams and fostering accountability', 'Emotional intelligence and psychological safety'] },
      { week: 'Module 3 — Organizational Agility & Change', topics: ['Leading agile adoption and organizational change', 'Agile culture, values, and principles at scale', 'Management 3.0 practices and employee engagement', 'Building communities of practice and learning organizations'] },
      { week: 'Module 4 — A-CSM Certification & Application', topics: ['A-CSM assessment preparation and practice exercises', 'Creating coaching and facilitation action plans', 'Real-world case studies — advanced Scrum Master scenarios', 'Continuous improvement and professional development roadmap'] },
    ],
  },
  'agile-certified-scrum-product-owner-cspo': {
    summary: 'Certified Scrum Product Owner (CSPO) — master product ownership, backlog management, and value-driven agile delivery.',
    description: 'CSPO from Scrum Alliance equips you with the skills to own the product vision, manage stakeholders, and maximize ROI through effective backlog management and agile product delivery practices.',
    syllabus: [
      { week: 'Module 1 — Product Owner Role & Agile Mindset', topics: ['Agile product ownership overview and CSPO certification', 'Product vision, strategy, and goal alignment', 'Scrum framework for Product Owners — roles, events, artifacts', 'Understanding value, ROI, and product economics'] },
      { week: 'Module 2 — Backlog Management & User Stories', topics: ['Product Backlog creation, refinement, and ordering', 'User stories, personas, and acceptance criteria', 'Story mapping and release planning techniques', 'Estimating techniques — story points, t-shirt sizes, affinity'] },
      { week: 'Module 3 — Stakeholder Management & Communication', topics: ['Identifying and engaging stakeholders effectively', 'Managing expectations and competing priorities', 'Product roadmap communication and transparency', 'Collaborative decision-making and negotiation'] },
      { week: 'Module 4 — Delivery, Validation & CSPO Certification', topics: ['Sprint Reviews — gathering feedback and iterating', 'Metrics for product success — velocity, value, satisfaction', 'CSPO assessment preparation and practice exercises', 'Real-world case studies and continuous learning path'] },
    ],
  },
  'agile-safe-advanced-scrum-master-sasm': {
    summary: 'SAFe Advanced Scrum Master (SASM) — apply SAFe principles, facilitate agile release trains, and lead cross-team coordination at scale.',
    description: 'SAFe Advanced Scrum Master (SASM) certification prepares you to coach agile teams within the Scaled Agile Framework (SAFe). Learn to facilitate Agile Release Trains, coordinate across teams, and drive relentless improvement at enterprise scale.',
    syllabus: [
      { week: 'Module 1 — SAFe Principles & Framework', topics: ['SAFe overview — Lean-Agile principles and mindsets', 'SAFe configuration — Essential, Portfolio, Large Solution, Full', 'Agile Release Trains (ARTs) — roles, events, and cadence', 'SAFe Scrum Master role — coaching, facilitation, leadership'] },
      { week: 'Module 2 — ART Facilitation & Coordination', topics: ['PI Planning — preparation, execution, and commitment', 'System and Solution Demos — integration and feedback', 'Inspect and Adapt workshop — relentless improvement', 'Cross-team coordination — Scrum of Scrums, PO Sync'] },
      { week: 'Module 3 — Coaching Agile Teams at Scale', topics: ['Coaching self-managing teams within SAFe', 'DevOps and Continuous Delivery Pipeline in SAFe', 'Built-in quality practices and agile architecture', 'Leading organizational change and Lean-Agile transformation'] },
      { week: 'Module 4 — SASM Exam & Enterprise Application', topics: ['SASM exam format, question types, and preparation', 'Practice exams and scenario-based problem solving', 'Real-world case studies — SAFe implementation challenges', 'SAFe resources, communities, and continuous learning'] },
    ],
  },

  // ═══ SERVICENOW ═══
  'servicenow': {
    summary: 'ServiceNow certification — master ITSM, ITOM, and ServiceNow platform administration for enterprise service management.',
    description: 'ServiceNow is the leading enterprise service management platform. This course covers ServiceNow fundamentals, ITSM processes, platform administration, automation, and application development for certification readiness.',
    syllabus: [
      { week: 'Module 1 — ServiceNow Platform Fundamentals', topics: ['ServiceNow overview — architecture, modules, and ecosystem', 'Navigation, UI, lists, forms, and personalization', 'Configuration Management Database (CMDB) and discovery', 'ServiceNow certifications and learning pathways'] },
      { week: 'Module 2 — ITSM Processes & Service Operations', topics: ['Incident Management — lifecycle, prioritization, and resolution', 'Problem Management — root cause analysis and known errors', 'Change Management — standard, normal, and emergency changes', 'Service Catalog and Request Fulfillment'] },
      { week: 'Module 3 — Platform Administration & Automation', topics: ['User administration, roles, groups, and ACLs', 'Business rules, workflows, and Flow Designer', 'Scripting — GlideRecord, GlideAjax, and Client Scripts', 'Notifications, SLAs, and reporting dashboards'] },
      { week: 'Module 4 — Application Development & Exam Prep', topics: ['Application development — scoped apps and app studio', 'Integration — REST, SOAP, and web services', 'ServiceNow certification exam preparation and practice', 'Real-world implementation scenarios and best practices'] },
    ],
  },
  'servicenow-admin': {
    summary: 'ServiceNow Admin — master platform administration, user management, CMDB, and ITSM processes for CSA certification.',
    description: 'ServiceNow Certified System Administrator (CSA) training focused on platform configuration, user and access management, CMDB, service catalog, and ITSM process automation for enterprise administration.',
    syllabus: [
      { week: 'Module 1 — Platform Administration & User Management', topics: ['Platform architecture and instance management', 'UI customization — lists, forms, views, and branding', 'User administration — users, groups, roles, and delegation', 'Security — ACLs, application scopes, and data segregation'] },
      { week: 'Module 2 — Configuration Management & Database Administration', topics: ['CMDB — Configuration Management Database and CSDM model', 'Data schema — tables, fields, dictionary, and relationships', 'Import sets — data sources, transform maps, and scheduling', 'Reporting — dashboards, metrics, and performance analytics'] },
      { week: 'Module 3 — Service Operations & Automation', topics: ['Service Catalog — categories, items, variables, and record producers', 'Knowledge Management — articles, categories, and publishing', 'Flow Designer — triggers, actions, conditions, and approvals', 'Notifications — email, SMS, and push notification configuration'] },
      { week: 'Module 4 — ITSM Processes & CSA Exam Preparation', topics: ['Incident, Problem, and Change Management workflows', 'SLAs, escalation rules, and assignment workflows', 'Service Level Management — SLAs, OLAs, and metrics', 'CSA certification exam — practice tests and review'] },
    ],
  },
  'servicenow-developer': {
    summary: 'ServiceNow Developer — build applications, integrations, and automation workflows for CAD certification.',
    description: 'ServiceNow Certified Application Developer (CAD) training covering scoped application development, client and server scripting, service portal, REST/SOAP integrations, and automated testing frameworks.',
    syllabus: [
      { week: 'Module 1 — Application Development Fundamentals', topics: ['Application scoping — scoped apps vs global scope', 'App Studio — application creation, modules, and properties', 'Client Scripts — g_form, g_user, and client-side validation', 'UI Policies — dynamic form behavior and field conditions'] },
      { week: 'Module 2 — Server-Side Development & Automation', topics: ['Business Rules — server-side logic and data manipulation', 'Script Includes — reusable functions and GlideRecord', 'Flow Designer — advanced flows, actions, and approvals', 'Scheduled Jobs — background automation and maintenance'] },
      { week: 'Module 3 — Service Portal & Integration', topics: ['Service Portal — widgets, pages, AngularJS, and configuration', 'REST API — inbound and outbound integrations', 'SOAP web services and Integration Hub', 'Update sets — capturing, exporting, and deploying changes'] },
      { week: 'Module 4 — Advanced Development & CAD Exam Preparation', topics: ['Agile Development — story management and team development', 'Automated Test Framework (ATF) — test creation and suites', 'Source control — Git, branching, and application repositories', 'CAD certification exam — practice tests and review'] },
    ],
  },
  'servicenow-admin-and-developer': {
    summary: 'ServiceNow Admin & Developer — complete dual-track training covering CSA administration and CAD development for full-stack platform expertise.',
    description: 'Complete dual-track ServiceNow training combining CSA administration and CAD developer curriculum. Covers platform administration, user management, CMDB, ITSM processes, application development, service portal, integrations, and advanced automation.',
    syllabus: [
      { week: 'Module 1 — Platform Administration & User Management', topics: ['Platform architecture and instance management', 'UI customization — lists, forms, views, and branding', 'User administration — users, groups, roles, and delegation', 'Security — ACLs, application scopes, and data segregation'] },
      { week: 'Module 2 — Configuration Management & Database Administration', topics: ['CMDB — Configuration Management Database and CSDM model', 'Data schema — tables, fields, dictionary, and relationships', 'Import sets — data sources, transform maps, and scheduling', 'Reporting — dashboards, metrics, and performance analytics'] },
      { week: 'Module 3 — ITSM Processes & Service Operations', topics: ['Incident, Problem, and Change Management workflows', 'Service Catalog — categories, items, variables, and record producers', 'Knowledge Management — articles, categories, and publishing', 'SLAs, escalation rules, and assignment workflows'] },
      { week: 'Module 4 — Application Development Fundamentals', topics: ['Application scoping — scoped apps vs global scope', 'App Studio — application creation, modules, and properties', 'Client Scripts — g_form, g_user, and client-side validation', 'UI Policies — dynamic form behavior and field conditions'] },
      { week: 'Module 5 — Server-Side Development & Automation', topics: ['Business Rules — server-side logic and data manipulation', 'Script Includes — reusable functions and GlideRecord', 'Flow Designer — advanced flows, actions, and approvals', 'Automated Test Framework (ATF) — test creation and suites'] },
      { week: 'Module 6 — Service Portal, Integration & Certification Prep', topics: ['Service Portal — widgets, pages, AngularJS, and configuration', 'REST API, SOAP web services, and Integration Hub', 'Update sets and source control — Git and app repositories', 'CSA + CAD certification exam — practice tests and review'] },
    ],
  },

  // ═══ ISTQB ═══
  'istqb-foundation': {
    summary: 'ISTQB Foundation — master software testing fundamentals, test design techniques, and quality assurance principles.',
    description: 'ISTQB Foundation is the globally recognized entry-level certification for software testers. Learn testing principles, test lifecycle, static and dynamic testing techniques, test management, and tool support for effective quality assurance.',
    syllabus: [
      { week: 'Module 1 — Testing Fundamentals & Principles', topics: ['ISTQB certification overview and exam structure', 'Testing principles, psychology, and ethics', 'Test process — planning, monitoring, analysis, design, execution, completion', 'Testing throughout the software development lifecycle'] },
      { week: 'Module 2 — Test Design Techniques', topics: ['Black-box techniques — equivalence partitioning, boundary value analysis', 'White-box techniques — statement, decision, and condition coverage', 'Experience-based techniques — error guessing, exploratory testing', 'Choosing the right technique based on context and risk'] },
      { week: 'Module 3 — Test Management & Reviews', topics: ['Test planning, estimation, and risk-based testing', 'Static testing — reviews, walkthroughs, and inspections', 'Test monitoring, reporting, and metrics', 'Configuration management and defect lifecycle'] },
      { week: 'Module 4 — Tool Support & Foundation Exam Prep', topics: ['Testing tools — types, selection, and ROI considerations', 'ISTQB Foundation exam format, question types, and tips', 'Practice exams and mock test review sessions', 'Real-world testing scenarios and industry best practices'] },
    ],
  },

  // ═══ SIX SIGMA ═══
  'six-sigma-green-belt': {
    summary: 'Six Sigma Green Belt — lead process improvement projects using DMAIC methodology and statistical analysis.',
    description: 'Six Sigma Green Belt certification equips you to lead quality improvement projects within your organization. Master the DMAIC methodology, statistical analysis tools, and process optimization techniques for measurable business results.',
    syllabus: [
      { week: 'Module 1 — Six Sigma Foundations & DMAIC Overview', topics: ['Six Sigma principles, history, and organizational goals', 'DMAIC methodology — Define, Measure, Analyze, Improve, Control', 'Roles — Champions, Master Black Belts, Black Belts, Green Belts', 'Project selection, charter development, and stakeholder identification'] },
      { week: 'Module 2 — Define & Measure Phases', topics: ['Process mapping — SIPOC, flowcharts, and value stream mapping', 'Data collection planning and measurement systems analysis', 'Basic statistics — mean, median, mode, standard deviation', 'Process capability analysis — Cp, Cpk, Pp, Ppk'] },
      { week: 'Module 3 — Analyze & Improve Phases', topics: ['Root cause analysis — fishbone, 5 Whys, FMEA', 'Hypothesis testing — t-tests, chi-square, ANOVA', 'Design of Experiments (DOE) fundamentals', 'Solution generation, selection, and pilot implementation'] },
      { week: 'Module 4 — Control Phase & Green Belt Certification', topics: ['Control charts — X-bar, R, p, and u charts', 'Standardization, documentation, and training', 'Control plans, response plans, and process monitoring', 'Green Belt exam preparation, mock tests, and case studies'] },
    ],
  },
  'six-sigma-black-belt': {
    summary: 'Six Sigma Black Belt — master advanced statistical analysis, lead complex improvement projects, and mentor Green Belts.',
    description: 'Six Sigma Black Belt certification prepares you to lead enterprise-wide process improvement initiatives. Master advanced statistical methods, design of experiments, regression analysis, and change management for transformational results.',
    syllabus: [
      { week: 'Module 1 — Advanced Six Sigma & Leadership', topics: ['Black Belt competency model and organizational leadership', 'Advanced DMAIC — integrating Lean and Six Sigma', 'Change management, team facilitation, and stakeholder leadership', 'Financial evaluation — cost of poor quality and project ROI'] },
      { week: 'Module 2 — Advanced Statistical Methods', topics: ['Multiple regression and correlation analysis', 'Advanced hypothesis testing and non-parametric tests', 'Design of Experiments (DOE) — full and fractional factorial', 'Response surface methodology and optimization'] },
      { week: 'Module 3 — Lean Enterprise & Process Optimization', topics: ['Lean principles — value, value stream, flow, pull, perfection', 'Kanban, 5S, TPM, SMED, and Kaizen methodologies', 'Queueing theory, theory of constraints, and bottleneck analysis', 'Business process management and reengineering'] },
      { week: 'Module 4 — Black Belt Certification & Mentoring', topics: ['Black Belt exam preparation and comprehensive mock tests', 'Mentoring Green Belts — coaching, review, and support', 'Leading complex improvement projects and managing teams', 'Real-world case studies and Black Belt project examples'] },
    ],
  },

  // ═══ DEVOPS ═══
  'devops-exin-master': {
    summary: 'DevOps EXIN Master — master DevOps principles, practices, culture, and automation for end-to-end software delivery excellence.',
    description: 'EXIN DevOps Master certification validates end-to-end DevOps knowledge including culture, organization, principles, practices, and tooling. Learn to bridge development and operations for faster, higher-quality software delivery.',
    syllabus: [
      { week: 'Module 1 — DevOps Principles & Culture', topics: ['DevOps definition, history, and business value', 'CALMS framework — Culture, Automation, Lean, Measurement, Sharing', 'DevOps culture — collaboration, trust, and psychological safety', 'Organizational models — Conway law, team topology, and DevOps roles'] },
      { week: 'Module 2 — Continuous Delivery & Automation', topics: ['Continuous Integration (CI) and build automation', 'Continuous Delivery (CD) — deployment pipelines and release management', 'Infrastructure as Code (IaC) — Terraform, CloudFormation, Ansible', 'Containerization — Docker, Kubernetes, and orchestration'] },
      { week: 'Module 3 — Monitoring, Measurement & Feedback', topics: ['Monitoring strategies — metrics, logs, traces (the three pillars)', 'Observability, alerting, and incident response', 'DevOps metrics — DORA metrics, SLIs, SLOs, SLAs', 'Feedback loops and continuous improvement practices'] },
      { week: 'Module 4 — EXIN DevOps Master Exam Prep', topics: ['EXIN DevOps Master exam format and syllabus coverage', 'ITIL, Agile, Lean, and DevOps integration', 'Practice exams, scenario questions, and case studies', 'Developing a DevOps transformation roadmap'] },
    ],
  },
  'devops-tools-and-training': {
    summary: 'DevOps Tools & Training — hands-on experience with CI/CD, Docker, Kubernetes, Terraform, and monitoring tools.',
    description: 'This practical course provides hands-on training with essential DevOps tools. Learn to build and manage CI/CD pipelines, containerize applications, orchestrate deployments, manage infrastructure as code, and implement monitoring solutions.',
    syllabus: [
      { week: 'Module 1 — Version Control & CI/CD', topics: ['Git — branching strategies, pull requests, and code review', 'Jenkins/GitHub Actions — pipeline creation and automation', 'Build tools — Maven, npm, and artifact management (Nexus/Artifactory)', 'Continuous Integration best practices and quality gates'] },
      { week: 'Module 2 — Containers & Orchestration', topics: ['Docker — images, containers, Dockerfile, Docker Compose', 'Kubernetes — pods, services, deployments, namespaces', 'Helm charts and Kubernetes package management', 'Container registry and image security scanning'] },
      { week: 'Module 3 — Infrastructure as Code & Configuration Management', topics: ['Terraform — provider configuration, resources, and state management', 'Ansible — playbooks, roles, and configuration management', 'Cloud provisioning — AWS, Azure, or GCP infrastructure automation', 'Secret management — Vault, AWS Secrets Manager'] },
      { week: 'Module 4 — Monitoring, Logging & Security', topics: ['Prometheus and Grafana — metrics collection and dashboards', 'ELK Stack / Loki — log aggregation and analysis', 'DevSecOps — security scanning, SAST, DAST, and compliance', 'Hands-on project — end-to-end DevOps pipeline implementation'] },
    ],
  },

  // ═══ CYBER SECURITY ═══
  'comptia-security': {
    summary: 'CompTIA Security+ — master cybersecurity fundamentals, threat management, risk assessment, and security operations.',
    description: 'CompTIA Security+ is the leading entry-level cybersecurity certification. Learn threats, vulnerabilities, cryptography, identity management, network security, and security operations for a career in information security.',
    syllabus: [
      { week: 'Module 1 — Threats, Attacks & Vulnerabilities', topics: ['Malware types — viruses, worms, trojans, ransomware, spyware', 'Social engineering — phishing, pretexting, baiting, tailgating', 'Application attacks — SQL injection, XSS, buffer overflows', 'Vulnerability scanning, penetration testing, and assessment'] },
      { week: 'Module 2 — Architecture & Network Security', topics: ['Network security — firewalls, IDS/IPS, VPNs, and segmentation', 'Secure network protocols — TLS, IPsec, SSH, SFTP', 'Wireless security — WPA3, EAP, and wireless attacks', 'Cloud security — shared responsibility, CASB, and IAM'] },
      { week: 'Module 3 — Identity, Access & Cryptography', topics: ['Identity and access management — authentication, authorization, accounting', 'MFA, SSO, federated identity, and certificate management', 'Cryptography — symmetric, asymmetric, hashing, and PKI', 'Public Key Infrastructure — CAs, certificates, and lifecycle'] },
      { week: 'Module 4 — Risk Management & Security+ Exam Prep', topics: ['Risk management — identification, assessment, mitigation, monitoring', 'Incident response — preparation, detection, containment, recovery', 'Governance, compliance, and business continuity planning', 'Security+ exam format, practice tests, and study strategies'] },
    ],
  },
  'cisa': {
    summary: 'CISA — Certified Information Systems Auditor — master audit, control, assurance, and governance of enterprise IT systems.',
    description: 'CISA from ISACA is the premier certification for IT audit, control, and security professionals. Learn auditing processes, IT governance, lifecycle management, and protection of information assets for enterprise assurance.',
    syllabus: [
      { week: 'Module 1 — Information Systems Auditing Process', topics: ['IS audit standards, guidelines, and code of ethics', 'Risk-based audit planning and project management', 'Audit evidence collection — techniques, sampling, and CAATs', 'Audit reporting — findings, recommendations, and follow-up'] },
      { week: 'Module 2 — Governance & Management of IT', topics: ['IT governance — frameworks, policies, and organizational structure', 'IT strategy, portfolio management, and resource optimization', 'Enterprise architecture and IT investment management', 'Business continuity and disaster recovery planning'] },
      { week: 'Module 3 — Information Systems Acquisition & Lifecycle', topics: ['Benefits realization and project management practices', 'System acquisition, development, and implementation processes', 'Change management, configuration management, and testing', 'Post-implementation reviews and benefits assessment'] },
      { week: 'Module 4 — Protection of Information Assets & CISA Exam Prep', topics: ['Logical and physical access controls', 'Network security, encryption, and data protection', 'Incident management and cybersecurity frameworks', 'CISA exam format, question strategies, and practice exams'] },
    ],
  },
  'cism': {
    summary: 'CISM — Certified Information Security Manager — lead enterprise information security governance, risk management, and incident response.',
    description: 'CISM from ISACA certifies your expertise in managing, designing, and overseeing enterprise information security programs. Focus on governance, risk compliance, program development, and incident management from a management perspective.',
    syllabus: [
      { week: 'Module 1 — Information Security Governance', topics: ['Security governance framework — strategy, policies, standards', 'Organizational structures — roles, responsibilities, committees', 'Legal, regulatory, and contractual compliance requirements', 'Security awareness, training, and culture building'] },
      { week: 'Module 2 — Information Risk Management', topics: ['Risk identification — asset valuation, threat modeling, vulnerability assessment', 'Risk analysis — qualitative, quantitative, and semi-quantitative methods', 'Risk response — mitigation, acceptance, transfer, avoidance', 'Third-party risk management and vendor assessments'] },
      { week: 'Module 3 — Information Security Program Development', topics: ['Security program — architecture, metrics, and resource management', 'Security controls — technical, administrative, physical implementation', 'Security operations — monitoring, threat intelligence, vulnerability management', 'Business continuity, disaster recovery, and resilience planning'] },
      { week: 'Module 4 — Incident Management & CISM Exam Prep', topics: ['Incident response — preparation, detection, response, recovery', 'Business continuity and disaster recovery testing', 'CISM exam format, domains weighting, and study strategy', 'Practice exams, case studies, and real-world scenarios'] },
    ],
  },
  'ceh': {
    summary: 'CEH — Certified Ethical Hacker — master penetration testing, vulnerability assessment, and ethical hacking techniques.',
    description: 'CEH from EC-Council certifies your skills in ethical hacking and penetration testing. Learn to think like a hacker, identify vulnerabilities, and secure systems through hands-on labs covering reconnaissance, scanning, exploitation, and post-exploitation.',
    syllabus: [
      { week: 'Module 1 — Ethical Hacking Foundations & Reconnaissance', topics: ['Ethical hacking methodology, legality, and scope', 'Footprinting and reconnaissance — passive and active techniques', 'Network scanning — port scanning, OS fingerprinting, service detection', 'Enumeration — users, shares, services, and system details'] },
      { week: 'Module 2 — System Hacking & Vulnerability Analysis', topics: ['Vulnerability assessment — scanners, manual testing, CVE databases', 'System hacking — password cracking, privilege escalation, persistence', 'Malware analysis — trojans, backdoors, rootkits, and countermeasures', 'Social engineering and phishing attack simulation'] },
      { week: 'Module 3 — Network, Web & Cloud Security Testing', topics: ['Network penetration testing — sniffing, MITM, DoS attacks', 'Web application testing — SQL injection, XSS, CSRF, SSRF', 'Cloud and IoT security testing', 'Wireless network penetration testing'] },
      { week: 'Module 4 — CEH Exam Prep & Professional Practice', topics: ['CEH exam format, question types, and study materials', 'Practice exams and hands-on lab review', 'Penetration testing reporting and documentation', 'Real-world case studies and career paths in ethical hacking'] },
    ],
  },

  // ═══ CBAP ═══
  'cbap': {
    summary: 'CBAP — Certified Business Analysis Professional — master business analysis planning, elicitation, requirements management, and solution evaluation.',
    description: 'CBAP from IIBA is the premier certification for experienced business analysts. Validate your expertise in business analysis planning, requirements management, solution evaluation, and stakeholder engagement using BABOK guidelines.',
    syllabus: [
      { week: 'Module 1 — Business Analysis Foundations & Planning', topics: ['BABOK guide overview — knowledge areas, tasks, and techniques', 'Business analysis planning and monitoring', 'Stakeholder identification, analysis, and engagement strategies', 'Business analysis governance and information management'] },
      { week: 'Module 2 — Elicitation & Requirements Management', topics: ['Elicitation techniques — interviews, workshops, surveys, observation', 'Requirements lifecycle management — traceability, prioritization, approval', 'Strategy analysis — current state, future state, risk analysis', 'Requirements analysis and design definition'] },
      { week: 'Module 3 — Solution Evaluation & Enterprise Analysis', topics: ['Solution evaluation — performance metrics, acceptance criteria', 'Enterprise analysis — business architecture, capability assessment', 'Business case development and benefits realization', 'Underlying competencies — analytical thinking, problem solving'] },
      { week: 'Module 4 — CBAP Exam Preparation & Application', topics: ['CBAP application process — experience, references, and CDU requirements', 'CBAP exam format, question types, and time management', 'Practice exams and scenario-based question review', 'Real-world business analysis case studies and techniques'] },
    ],
  },

  // ═══ POWER BI ═══
  'power-bi': {
    summary: 'Power BI — master data visualization, DAX, Power Query, and dashboard creation with Microsoft Power BI.',
    description: 'Microsoft Power BI is the leading business analytics tool for data visualization and reporting. Learn to connect, transform, model, and visualize data from multiple sources, creating interactive dashboards and actionable insights.',
    syllabus: [
      { week: 'Module 1 — Power BI Fundamentals & Data Connectivity', topics: ['Power BI overview — desktop, service, mobile, and report builder', 'Connecting to data sources — Excel, databases, cloud services', 'Power Query — data transformation, cleaning, and shaping', 'Data modeling — relationships, cardinality, and star schemas'] },
      { week: 'Module 2 — DAX & Calculations', topics: ['DAX fundamentals — calculated columns, measures, and tables', 'Filter context — CALCULATE, ALL, FILTER, VALUES', 'Time intelligence — YTD, QTD, MTD, SAMEPERIODLASTYEAR', 'Advanced DAX — iterators, ranking, and dynamic calculations'] },
      { week: 'Module 3 — Visualizations & Dashboards', topics: ['Visual types — charts, maps, tables, matrices, KPIs', 'Custom visuals and Power BI AppSource', 'Interactive reports — slicers, filters, bookmarks, drill-through', 'Dashboard design — layout, storytelling, and best practices'] },
      { week: 'Module 4 — Power BI Service & PL-300 Exam Prep', topics: ['Power BI Service — workspaces, sharing, and collaboration', 'Row-level security (RLS) and data protection', 'Power BI administration, gateways, and deployment pipelines', 'PL-300 exam format, practice questions, and preparation strategy'] },
    ],
  },

  // ═══ MASTERS: CYBER SECURITY EXPERT ═══
  'advanced-threat-analysis': {
    summary: 'Advanced Threat Analysis — master threat intelligence, malware analysis, APT detection, and proactive defense strategies.',
    description: 'Advanced Threat Analysis covers sophisticated cyber threat detection and response. Learn threat intelligence gathering, malware reverse engineering, advanced persistent threat (APT) detection, and proactive defense strategies for enterprise environments.',
    syllabus: [
      { week: 'Module 1 — Threat Intelligence & Reconnaissance', topics: ['Threat intelligence — OSINT, dark web, threat feeds, TTP analysis', 'Indicators of Compromise (IOCs) and Indicators of Attack (IOAs)', 'Attack lifecycle — Cyber Kill Chain, MITRE ATT&CK framework', 'Advanced reconnaissance techniques and adversary profiling'] },
      { week: 'Module 2 — Malware Analysis & Reverse Engineering', topics: ['Static analysis — PE structure, strings, disassembly', 'Dynamic analysis — sandboxing, API monitoring, debugging', 'Malware classification — trojans, worms, rootkits, fileless malware', 'Memory forensics and volatility analysis'] },
      { week: 'Module 3 — APT Detection & Advanced Defense', topics: ['Advanced Persistent Threat (APT) detection strategies', 'Network traffic analysis and anomaly detection', 'Endpoint detection and response (EDR) systems', 'Threat hunting — hypothesis-driven, intelligence-led methodologies'] },
      { week: 'Module 4 — Incident Response & Capstone', topics: ['Advanced incident response — containment, eradication, recovery', 'Threat modeling and risk assessment for critical assets', 'Red team vs blue team exercises and purple teaming', 'Real-world case studies — major threat actors and campaigns'] },
    ],
  },
  'security-architecture-design': {
    summary: 'Security Architecture Design — design secure enterprise architectures, zero-trust networks, and resilient defense systems.',
    description: 'Security Architecture Design covers enterprise security architecture frameworks, zero-trust principles, network segmentation, cloud security architecture, and designing resilient defense systems for complex organizations.',
    syllabus: [
      { week: 'Module 1 — Security Architecture Frameworks', topics: ['Enterprise security architecture — SABSA, Zachman frameworks', 'Security architecture principles — defense in depth, least privilege', 'Architecture patterns — microservices, monolithic, hybrid security', 'Risk-driven architecture design methodology'] },
      { week: 'Module 2 — Zero-Trust & Network Security Design', topics: ['Zero-trust architecture — NIST 800-207, Google BeyondCorp', 'Network segmentation — microsegmentation, SDN, SASE', 'Identity-centric security — zero-trust, PAM, and IAM architecture', 'Secure access service edge (SASE) and SSE design'] },
      { week: 'Module 3 — Cloud & Application Security Architecture', topics: ['Cloud security architecture — shared responsibility, CASB, CWPP', 'Secure application architecture — API security, container security', 'Data security — encryption, DLP, tokenization, and key management', 'DevSecOps — integrating security into CI/CD pipelines'] },
      { week: 'Module 4 — Governance, Compliance & Certification', topics: ['Security governance — policies, standards, controls, audits', 'Compliance architecture — PCI DSS, HIPAA, GDPR, SOC 2', 'Security architecture review and assessment methodologies', 'Capstone — designing a comprehensive enterprise security architecture'] },
    ],
  },

  // ═══ MASTERS: BIG DATA ENGINEER ═══
  'advanced-data-engineering': {
    summary: 'Advanced Data Engineering — design and build scalable data pipelines, data lakes, and big data processing systems.',
    description: 'Advanced Data Engineering covers modern data architecture, ETL/ELT pipelines, data lake and warehouse design, stream processing, and big data technologies for building enterprise-scale data platforms.',
    syllabus: [
      { week: 'Module 1 — Data Architecture & Warehousing', topics: ['Data architecture patterns — lakehouse, data mesh, data fabric', 'Data warehouse design — star schema, snowflake, dimensional modeling', 'ETL vs ELT — tools, techniques, and best practices', 'Cloud data platforms — AWS, Azure, GCP data services'] },
      { week: 'Module 2 — Big Data Processing & Batch Pipelines', topics: ['Apache Spark — RDDs, DataFrames, Spark SQL, optimization', 'Distributed computing — MapReduce, HDFS, YARN fundamentals', 'Batch processing — Spark Batch, Hive, and orchestration (Airflow)', 'Data quality, testing, and monitoring in batch pipelines'] },
      { week: 'Module 3 — Stream Processing & Real-Time Analytics', topics: ['Stream processing — Kafka, Spark Streaming, Flink basics', 'Event-driven architectures and message queuing systems', 'Real-time analytics — Kinesis, Pub/Sub, streaming SQL', 'Change data capture (CDC) and batch-stream unification'] },
      { week: 'Module 4 — Data Governance & Production Best Practices', topics: ['Data catalogs, metadata management, and data lineage', 'Data security, access control, and privacy (GDPR, CCPA)', 'Data pipeline monitoring, alerting, and SLAs', 'Real-world data engineering case studies and architecture review'] },
    ],
  },
  'real-time-data-processing': {
    summary: 'Real-Time Data Processing — master stream processing, event-driven systems, and low-latency data analytics at scale.',
    description: 'Real-Time Data Processing specializes in stream processing frameworks, event-driven architecture, and building low-latency data systems. Learn Apache Kafka, Flink, Spark Streaming, and real-time analytics for mission-critical applications.',
    syllabus: [
      { week: 'Module 1 — Stream Processing Fundamentals', topics: ['Stream processing vs batch — use cases, patterns, tradeoffs', 'Apache Kafka — producers, consumers, topics, partitions, brokers', 'Kafka Streams — stream processing topology, KTables, KStreams', 'Event time vs processing time — watermarks, late data handling'] },
      { week: 'Module 2 — Apache Flink & Advanced Stream Analytics', topics: ['Apache Flink — architecture, DataStream API, operators', 'State management — keyed state, operator state, checkpointing', 'Event-driven applications — patterns, CEP, complex event processing', 'Exactly-once semantics and fault tolerance mechanisms'] },
      { week: 'Module 3 — Real-Time Pipelines & Integration', topics: ['Kafka Connect — source and sink connectors', 'Schema registry — Avro, Protobuf, compatibility rules', 'Real-time ETL/ELT with streaming SQL (ksqlDB, Flink SQL)', 'Integrating real-time and batch — Lambda, Kappa, and Delta architectures'] },
      { week: 'Module 4 — Production Operations & Case Studies', topics: ['Kafka performance tuning — partitioning, batching, compression', 'Monitoring, alerting, and observability for streaming systems', 'Real-world use cases — fraud detection, IoT, clickstream analytics', 'Designing a real-time data processing architecture capstone'] },
    ],
  },

  // ═══ MASTERS: AUTOMATION TESTING ═══
  'test-automation-framework-design': {
    summary: 'Test Automation Framework Design — build scalable, maintainable automation frameworks using Selenium, Playwright, and CI/CD integration.',
    description: 'Master test automation architecture and framework design. Learn to build maintainable, scalable automation frameworks using Selenium, Playwright, Cypress, and Appium with design patterns, reporting, and continuous testing integration.',
    syllabus: [
      { week: 'Module 1 — Automation Strategy & Framework Architecture', topics: ['Test automation strategy — ROI, tool selection, and scope', 'Framework architecture — layered, modular, keyword-driven, hybrid', 'Design patterns — Page Object Model, Factory, Facade, Singleton', 'Configurable frameworks — environments, test data, browser management'] },
      { week: 'Module 2 — Web, Mobile & API Automation', topics: ['Selenium WebDriver — locators, waits, actions, advanced interactions', 'Cypress and Playwright — modern testing frameworks and features', 'Mobile automation — Appium, device farms, mobile gestures', 'API testing — REST Assured, Postman, contract testing'] },
      { week: 'Module 3 — CI/CD Integration & Reporting', topics: ['Continuous testing — Jenkins, GitHub Actions, GitLab CI integration', 'Parallel test execution — Selenium Grid, Docker, cloud providers', 'Reporting frameworks — Allure, Extent Reports, custom dashboards', 'Test data management — factories, fixtures, data-driven approaches'] },
      { week: 'Module 4 — Advanced Automation & Performance Testing', topics: ['Visual testing — Applitools, Percy, pixel-level verification', 'Performance testing — JMeter, k6, and load testing basics', 'Security testing automation — OWASP ZAP, SAST, DAST integration', 'Capstone — building a complete automation framework from scratch'] },
    ],
  },
  'ai-in-testing': {
    summary: 'AI in Testing — leverage AI and ML for intelligent test generation, self-healing automation, and predictive quality analytics.',
    description: 'AI in Testing explores how artificial intelligence and machine learning transform software testing. Cover intelligent test generation, self-healing locators, visual AI testing, defect prediction, and AI-powered test analytics for modern QA teams.',
    syllabus: [
      { week: 'Module 1 — AI & ML Foundations for Testing', topics: ['AI/ML fundamentals — supervised, unsupervised, reinforcement learning', 'Applying AI to testing — opportunities, challenges, and use cases', 'Data preparation for ML in testing — test logs, defects, coverage', 'AI-driven test strategy and risk-based testing optimization'] },
      { week: 'Module 2 — Intelligent Test Generation & Self-Healing', topics: ['Automated test generation — model-based, record-and-intelligent-playback', 'Self-healing automation — dynamic locators, AI-driven element identification', 'Visual AI testing — Applitools, Percy, screenshot comparison with AI', 'Natural language processing (NLP) for test case generation'] },
      { week: 'Module 3 — Predictive Analytics & Quality Intelligence', topics: ['Defect prediction — ML models for identifying high-risk areas', 'Test impact analysis — AI-driven selective regression testing', 'Quality dashboards — AI-powered insights and trend analysis', 'Anomaly detection in test results and production monitoring'] },
      { week: 'Module 4 — Implementing AI Testing & Future Trends', topics: ['Building an AI-powered QA strategy and roadmap', 'Tools and frameworks for AI testing implementation', 'Ethical AI testing — bias detection, fairness, and transparency', 'Real-world case studies and hands-on AI testing projects'] },
    ],
  },

  // ═══ MASTERS: INTEGRATED BIG DATA & DATA SCIENCE ═══
  'advanced-analytics-and-ml': {
    summary: 'Advanced Analytics & ML — master machine learning algorithms, deep learning, statistical modeling, and predictive analytics at scale.',
    description: 'Advanced Analytics and Machine Learning covers the complete ML lifecycle — from data exploration and feature engineering through model selection, training, deployment, and monitoring. Includes supervised, unsupervised, and deep learning with real-world applications.',
    syllabus: [
      { week: 'Module 1 — Statistical Analysis & Data Exploration', topics: ['Descriptive and inferential statistics — distributions, tests, confidence', 'Exploratory data analysis (EDA) — visualization, correlation, outliers', 'Feature engineering — encoding, scaling, transformation, selection', 'Dimensionality reduction — PCA, t-SNE, UMAP'] },
      { week: 'Module 2 — Supervised & Unsupervised Learning', topics: ['Regression — linear, polynomial, ridge, lasso, random forest', 'Classification — logistic regression, decision trees, SVM, XGBoost', 'Unsupervised learning — k-means, DBSCAN, hierarchical clustering', 'Model evaluation — cross-validation, metrics, hyperparameter tuning'] },
      { week: 'Module 3 — Deep Learning & Neural Networks', topics: ['Neural network fundamentals — architecture, activation, backpropagation', 'CNNs — image classification, object detection, transfer learning', 'RNNs, LSTMs, Transformers — sequence modeling, NLP, time series', 'Deep learning frameworks — TensorFlow, PyTorch, Keras'] },
      { week: 'Module 4 — MLOps, Deployment & Capstone', topics: ['Model deployment — REST APIs, containerization, serverless inferencing', 'MLOps — model registry, versioning, pipeline automation (Kubeflow, MLflow)', 'Model monitoring — drift detection, retraining, governance', 'Capstone — end-to-end ML project from data to deployment'] },
    ],
  },
  'big-data-ai-integration': {
    summary: 'Big Data AI Integration — combine big data technologies with AI for distributed ML, real-time inference, and intelligent data products.',
    description: 'Big Data AI Integration focuses on combining big data infrastructure with machine learning at scale. Cover distributed ML with Spark, real-time inference pipelines, feature stores, and building intelligent data products on modern data platforms.',
    syllabus: [
      { week: 'Module 1 — Big Data Infrastructure for AI', topics: ['Distributed computing for ML — Spark MLlib, Dask, Ray', 'Data lakes and feature stores — Feast, Tecton, Hopsworks', 'Data pipeline orchestration — Airflow, Prefect for ML workflows', 'Scalable data processing — batch and streaming for ML'] },
      { week: 'Module 2 — Distributed Machine Learning', topics: ['Distributed training — data parallelism, model parallelism', 'Spark ML pipelines — feature engineering, model training, evaluation', 'Large-scale model serving — TensorFlow Serving, TorchServe', 'GPU acceleration and distributed computing for deep learning'] },
      { week: 'Module 3 — Real-Time AI & Intelligent Applications', topics: ['Real-time ML inference — streaming predictions with Kafka/Flink', 'Online learning and adaptive models', 'Feature stores — real-time feature computation and serving', 'Building intelligent applications — recommendations, fraud, personalization'] },
      { week: 'Module 4 — AI Governance, Ethics & Capstone', topics: ['AI governance — ML model lifecycle management, compliance, auditing', 'Responsible AI — fairness, interpretability, explainability (XAI)', 'Data privacy for AI — differential privacy, federated learning', 'Capstone — designing and building an intelligent data product'] },
    ],
  },
}

let updatedCount = 0
for (let i = 0; i < courses.length; i++) {
  const c = courses[i]
  const cur = curriculums[c.slug]
  if (!cur) continue

  // Check if currently has generic placeholder syllabus
  const hasGeneric = c.syllabus && c.syllabus.length > 0 && c.syllabus[0].topics &&
    c.syllabus[0].topics.some(t => t.startsWith('Foundations and key concepts for') || t.startsWith('Instructor-led sessions'))

  if (hasGeneric) {
    c.syllabus = cur.syllabus
    if (cur.summary) c.summary = cur.summary
    if (cur.description) c.description = cur.description
    updatedCount++
    console.log(`  ✅ Updated: ${c.slug} — ${c.title}`)
  } else {
    console.log(`  ⏭️  Skipped: ${c.slug} — already has specific content`)
  }
}

fs.writeFileSync(coursesPath, JSON.stringify(courses, null, 2) + '\n')
console.log(`\nDone! Updated ${updatedCount} courses.`)
