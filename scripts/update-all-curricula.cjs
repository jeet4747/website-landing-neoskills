const fs = require('fs')
const path = require('path')

const coursesPath = path.join(__dirname, '..', 'server', 'courses.json')
const courses = JSON.parse(fs.readFileSync(coursesPath, 'utf8'))

const curricula = {

  // ═══════════════════════════════════════════════════
  // PROJECT MANAGEMENT
  // ═══════════════════════════════════════════════════

  'pmp': {
    description: 'The PMP® certification validates your ability to lead projects in any industry following the latest PMI® 2026 Exam Content Outline. This program covers the three domains — People (33%), Process (41%), and Business Environment (26%) — with emphasis on AI, sustainability, value delivery, and hybrid (predictive/agile) approaches. Includes 35+ contact hours, mock exams, and application guidance.',
    syllabus: [
      { week: 'Domain 1 — People (33%)', topics: [
        'Manage conflict — sources, resolution techniques, and escalation',
        'Lead a team — building, mentoring, and empowering team members',
        'Support team performance — establishing feedback loops and metrics',
        'Empower the team — delegation, accountability, and recognition',
        'Communicate effectively — planning, channels, and stakeholder alignment',
        'Build stakeholder relationships — engagement, trust, and influence',
        'Apply emotional intelligence — self-awareness, empathy, and social skills'
      ]},
      { week: 'Domain 2 — Process (41%)', topics: [
        'Execute project with urgency — value-driven delivery and prioritization',
        'Manage integrations — coordinating across functions and vendors',
        'Define scope, schedule, and budget — rolling wave and iterative planning',
        'Lead procurement and contract management',
        'Manage risk and issues — identification, analysis, and response',
        'Deliver project outcomes — quality assurance, testing, and handover',
        'Close project — lessons learned, knowledge transfer, and archive'
      ]},
      { week: 'Domain 3 — Business Environment (26%)', topics: [
        'Governance and compliance — regulatory, legal, and organizational policies',
        'Organizational change management — adoption and readiness',
        'Continuous improvement — retrospectives and process optimization',
        'Strategic alignment — connecting projects to business goals',
        'AI and digital transformation — leveraging technology in projects',
        'Sustainability and ESG — environmental and social responsibility'
      ]},
      { week: 'Domain 4 — Agile & Hybrid Approaches', topics: [
        'Agile principles and mindset — Scrum, Kanban, XP basics',
        'Hybrid frameworks — blending predictive and adaptive methods',
        'Iteration planning, backlog management, and retrospectives',
        'Agile estimating — story points, velocity, and burn-down charts'
      ]},
      { week: 'Domain 5 — Mock Exams & Application', topics: [
        'PMP application process — experience documentation and audit preparation',
        'Full-length 180-question mock exam with scenario-based questions',
        'Question strategy — drag-and-drop, multiple response, and case studies',
        'Exam day tips — time management and stress reduction'
      ]}
    ]
  },

  'pmp-morning-batch': {
    description: 'Morning batch format of the full PMP® certification program aligned with PMI® 2026 ECO. Same comprehensive curriculum delivered in early-morning sessions for working professionals. Covers all three domains with mock exams and application support.',
    syllabus: [
      { week: 'Domain 1 — People (33%)', topics: [
        'Conflict management and resolution techniques',
        'Team leadership, mentoring, and performance management',
        'Communication planning and stakeholder engagement',
        'Emotional intelligence and team empowerment'
      ]},
      { week: 'Domain 2 — Process (41%)', topics: [
        'Integration management across project lifecycle',
        'Scope, schedule, cost, and quality planning',
        'Risk management and issue resolution',
        'Procurement, vendor management, and project closure'
      ]},
      { week: 'Domain 3 — Business Environment (26%)', topics: [
        'Governance, compliance, and organizational strategy',
        'Change management and continuous improvement',
        'AI, digital transformation, and sustainability'
      ]},
      { week: 'Domain 4 — Agile & Hybrid Approaches', topics: [
        'Agile principles, Scrum framework, and Kanban',
        'Hybrid delivery approaches and tailoring',
        'Backlog management, iteration planning, and retrospectives'
      ]},
      { week: 'Domain 5 — Exam Preparation', topics: [
        'PMP application process and audit readiness',
        'Full-length mock exams and question bank review',
        'Scenario-based questions and time management strategies'
      ]}
    ]
  },

  'capm': {
    description: 'The CAPM® certification from PMI® validates foundational project management knowledge. This course covers PMI\'s four CAPM domains: Project Management Fundamentals and Core Concepts (36%), Predictive Plan-Based Methodologies (17%), Agile Frameworks/Methodologies (20%), and Business Analysis Frameworks (27%). Ideal for entry-level project professionals and students.',
    syllabus: [
      { week: 'Domain 1 — Project Management Fundamentals & Core Concepts (36%)', topics: [
        'Project life cycles, phases, and organizational context',
        'Project roles — sponsor, PM, team, and stakeholders',
        'Planning, executing, monitoring, and closing fundamentals',
        'PMI\'s code of ethics, leadership, and problem-solving'
      ]},
      { week: 'Domain 2 — Predictive, Plan-Based Methodologies (17%)', topics: [
        'When predictive approaches fit — requirements clarity and stability',
        'Work Breakdown Structure (WBS) and scope baseline',
        'Scheduling — critical path, predecessors, and float',
        'Predictive controls — earned value, variance analysis, and forecasting'
      ]},
      { week: 'Domain 3 — Agile Frameworks & Methodologies (20%)', topics: [
        'Agile Manifesto, principles, and mindset',
        'Scrum — roles, events, and artifacts',
        'Adaptive planning — iterations, backlogs, and velocity',
        'Kanban, flow, and continuous delivery practices'
      ]},
      { week: 'Domain 4 — Business Analysis Frameworks (27%)', topics: [
        'BA role in project — stakeholder identification and communication',
        'Elicitation techniques — interviews, workshops, surveys',
        'Requirements lifecycle — traceability, validation, and sign-off',
        'Solution evaluation — acceptance criteria and business value'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // PRINCE2
  // ═══════════════════════════════════════════════════

  'prince2-foundation': {
    description: 'PRINCE2® 7 Foundation introduces the PRINCE2 project management methodology — a structured, process-based approach. This course covers key concepts, the seven principles, the people element, the seven practices, and the seven processes that form the PRINCE2 framework, preparing you for the Foundation exam.',
    syllabus: [
      { week: 'Module 1 — Key Concepts & Principles', topics: [
        'Definition of a project, project management, and PRINCE2 integrated elements',
        'Seven PRINCE2 principles — continued business justification, learn from experience, define roles, manage by stages, manage by exception, focus on products, tailor to suit',
        'Project performance — efficiency, effectiveness, and delivery approaches',
        'Project context — organizational ecosystem, challenges, and benefits of PRINCE2'
      ]},
      { week: 'Module 2 — People in Successful Projects', topics: [
        'Organizational ecosystem — project, permanent organization, and supply chain',
        'Change management, stakeholder engagement, and communication',
        'Leadership vs management, culture, collaboration, and co-creation',
        'Roles and responsibilities across the project management team'
      ]},
      { week: 'Module 3 — PRINCE2 Practices', topics: [
        'Business Case practice — developing and maintaining justification',
        'Organizing practice — roles, structure, and management products',
        'Plans practice — product-based planning and scheduling',
        'Quality, Risk, Issues, and Progress practices — control and reporting'
      ]},
      { week: 'Module 4 — PRINCE2 Processes & Foundation Exam Prep', topics: [
        'Starting Up a Project, Directing a Project, and Initiating a Project',
        'Controlling a Stage, Managing Product Delivery, and Managing a Stage Boundary',
        'Closing a Project — handover, evaluation, and lessons learned',
        'Foundation exam format, mock tests, and question strategy'
      ]}
    ]
  },

  'prince2-practitioner': {
    description: 'PRINCE2® 7 Practitioner focuses on applying and tailoring the PRINCE2 methodology to real-world scenarios. Builds on Foundation knowledge to demonstrate competency in adapting principles, people, practices, and processes for different project contexts. Open-book exam with scenario-based questions.',
    syllabus: [
      { week: 'Module 1 — Applying PRINCE2 Principles in Context', topics: [
        'Applying the seven principles to complex project environments',
        'Tailoring principles for different organizational cultures and project scales',
        'Justifying business cases in dynamic environments',
        'Managing by exception — tolerances and escalation in practice'
      ]},
      { week: 'Module 2 — People Management in Projects', topics: [
        'Leading successful change and building effective teams',
        'Stakeholder engagement strategies and communication planning',
        'Organizational ecosystem — managing cross-functional and distributed teams',
        'Role boundaries and accountability structures'
      ]},
      { week: 'Module 3 — Tailoring PRINCE2 Practices', topics: [
        'Tailoring Business Case, Organizing, and Plans for specific contexts',
        'Adapting Quality, Risk, Issues, and Progress practices',
        'Choosing and tailoring management products',
        'Integrating PRINCE2 with agile, PMI, and ITIL frameworks'
      ]},
      { week: 'Module 4 — Applying Processes & Practitioner Exam Prep', topics: [
        'Applying processes from SU to CP in realistic scenarios',
        'Deciding the correct process activities for given situations',
        'Scenario-based practice — 70-question open-book exam simulation',
        'Exam strategy — analyzing scenarios, selecting optimal responses'
      ]}
    ]
  },

  'prince2-agile-foundation': {
    description: 'PRINCE2® Agile Foundation extends PRINCE2 with agile concepts, behaviours, and techniques. Learn to blend PRINCE2 governance with Scrum, Kanban, and Lean delivery while maintaining effective control, collaboration, and transparency.',
    syllabus: [
      { week: 'Module 1 — Agile & PRINCE2 Fundamentals', topics: [
        'PRINCE2 Agile overview, exam structure, and certification pathway',
        'Agile Manifesto, principles, and behaviours — transparency, collaboration, communication',
        'When and why to use PRINCE2 Agile — blending governance with flexibility',
        'Agile frameworks — Scrum, Kanban, and Lean basics'
      ]},
      { week: 'Module 2 — Agile Behaviours & Techniques', topics: [
        'Agile techniques — user stories, retrospectives, timeboxing, MoSCoW prioritization',
        'Rich planning and progressive estimating',
        'Feedback loops, iterative delivery, and continuous improvement',
        'Lean concepts — flow, pull, waste elimination, and value stream mapping'
      ]},
      { week: 'Module 3 — PRINCE2 Agile Processes & Themes', topics: [
        'Tailoring PRINCE2 processes for agile and hybrid delivery',
        'Applying themes — quality, risk, and change in agile environments',
        'Planning and progress monitoring with agile ceremonies',
        'Agile roles and responsibilities within PRINCE2 governance'
      ]},
      { week: 'Module 4 — Foundation Exam Preparation', topics: [
        'Exam format — 60 multiple-choice questions, closed book',
        'Key terminology, concepts, and principle-based questions',
        'Mock tests covering agile concepts and PRINCE2 integration',
        'Study tips, time management, and final review'
      ]}
    ]
  },

  'prince2-agile-practitioner': {
    description: 'PRINCE2® Agile Practitioner builds on Foundation level. Focuses on applying the combined framework to real-world scenarios — tailoring PRINCE2 Agile for different contexts, balancing governance with agility, and demonstrating mastery of agile project governance.',
    syllabus: [
      { week: 'Module 1 — Advanced PRINCE2 Agile Application', topics: [
        'Practitioner exam format — 70 questions, open book, scenario-based',
        'Applying agile behaviours in PRINCE2-managed project environments',
        'Tailoring themes and processes for agile and hybrid delivery',
        'Advanced stakeholder collaboration and communication strategies'
      ]},
      { week: 'Module 2 — Agile Techniques in Depth', topics: [
        'Rich planning and progressive estimating in complex environments',
        'Agile contracts and commercial considerations',
        'Agile monitoring and control mechanisms within PRINCE2 governance',
        'Integrating Scrum, Kanban, and Lean with PRINCE2 processes'
      ]},
      { week: 'Module 3 — Scenario-Based Decision Making', topics: [
        'Analyzing complex project scenarios with multiple variables',
        'Recommending tailored PRINCE2 Agile approaches',
        'Balancing governance, agility, and risk in decision-making',
        'Benefits realization and value-driven delivery'
      ]},
      { week: 'Module 4 — Practitioner Exam Preparation', topics: [
        'Objective-testing exam with scenario-based questions',
        'Full-length mock exams with detailed solutions and debrief',
        'Time management, question interpretation, and answer strategy',
        'Real-world case studies and application review'
      ]}
    ]
  },

  'prince2-f-and-p': {
    description: 'Combined PRINCE2® 7 Foundation & Practitioner program in an accelerated format. Master the methodology from principles through to advanced application, tailoring, and exam readiness for both certification levels.',
    syllabus: [
      { week: 'Module 1 — PRINCE2 Foundations & Principles', topics: [
        'PRINCE2 integrated elements — principles, people, practices, processes, context',
        'Seven PRINCE2 principles and their application',
        'Project performance aspects and delivery approaches',
        'Foundation exam structure and key concepts'
      ]},
      { week: 'Module 2 — People, Practices & Management Products', topics: [
        'People element — leadership, culture, change management, stakeholder engagement',
        'Business Case, Organizing, and Plans practices',
        'Quality, Risk, Issues, and Progress practices',
        'Management products — PID, project log, approaches, and reports'
      ]},
      { week: 'Module 3 — Processes & Practitioner Application', topics: [
        'Seven PRINCE2 processes from SU to CP in detail',
        'Applying and tailoring processes for different project contexts',
        'Scenario-based analysis and decision-making at Practitioner level',
        'Integrating PRINCE2 with agile, hybrid, and traditional approaches'
      ]},
      { week: 'Module 4 — Combined Exam Preparation', topics: [
        'Foundation exam — 60 questions, closed book, mock tests',
        'Practitioner exam — 70 questions, open book, scenario-based',
        'Full-length mock exams at both levels with detailed review',
        'Exam strategy, time management, and final revision'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // AMAZON WEB SERVICES
  // ═══════════════════════════════════════════════════

  'aws-cloud-practitioner': {
    description: 'The AWS Certified Cloud Practitioner (CLF-C02) validates foundational AWS Cloud knowledge. This course covers four domains: Cloud Concepts (24%), Security and Compliance (30%), Cloud Technology and Services (34%), and Billing, Pricing, and Support (12%). No prior AWS experience needed — ideal for sales, management, and entry-level cloud roles.',
    syllabus: [
      { week: 'Domain 1 — Cloud Concepts (24%)', topics: [
        'Benefits of AWS Cloud — high availability, elasticity, agility, economies of scale',
        'Global infrastructure — regions, availability zones, edge locations',
        'AWS Cloud Adoption Framework (AWS CAF)',
        'Well-Architected Framework — operational excellence, security, reliability, performance efficiency, cost optimization, sustainability'
      ]},
      { week: 'Domain 2 — Security and Compliance (30%)', topics: [
        'AWS shared responsibility model',
        'Identity and Access Management (IAM) — users, groups, roles, policies',
        'Security compliance — AWS Artifact, compliance programs, AWS Config',
        'Governance — AWS Organizations, Service Control Policies (SCPs), AWS Control Tower'
      ]},
      { week: 'Domain 3 — Cloud Technology and Services (34%)', topics: [
        'Compute — EC2, Lambda, Elastic Beanstalk, Auto Scaling',
        'Storage — S3, EBS, EFS, Glacier, Storage Gateway',
        'Database — RDS, DynamoDB, Aurora, Redshift',
        'Networking — VPC, CloudFront, Route 53, VPN, Direct Connect',
        'AI/ML — SageMaker, Rekognition, Polly, Comprehend',
        'Management tools — CloudWatch, CloudTrail, Trusted Advisor'
      ]},
      { week: 'Domain 4 — Billing, Pricing, and Support (12%)', topics: [
        'AWS pricing models — On-Demand, Reserved, Spot, Savings Plans',
        'Billing and cost management — Cost Explorer, Budgets, Cost and Usage Report',
        'AWS Support plans — Basic, Developer, Business, Enterprise',
        'Technical resources — documentation, whitepapers, AWS Knowledge Center'
      ]}
    ]
  },

  'aws-solutions-architect-associate': {
    description: 'The AWS Certified Solutions Architect - Associate (SAA-C03) validates architectural best practices using the AWS Well-Architected Framework. Covers four domains: Design Secure Architectures (30%), Resilient Architectures (26%), High-Performing Architectures (24%), and Cost-Optimized Architectures (20%).',
    syllabus: [
      { week: 'Domain 1 — Design Secure Architectures (30%)', topics: [
        'Design secure access — IAM policies, roles, permission boundaries, SCPs',
        'Secure workloads — VPC design, security groups, NACLs, AWS WAF, Shield',
        'Data security controls — encryption at rest/transit, KMS, CloudHSM, Secrets Manager',
        'Network security — private subnets, endpoints, VPN, Direct Connect'
      ]},
      { week: 'Domain 2 — Design Resilient Architectures (26%)', topics: [
        'Highly available and fault-tolerant design — multi-AZ, multi-region',
        'Disaster recovery strategies — backup, pilot light, warm standby, multi-site',
        'Loosely coupled architectures — SQS, SNS, EventBridge, Step Functions',
        'Scalability — Auto Scaling, ELB, Lambda concurrency, read replicas'
      ]},
      { week: 'Domain 3 — Design High-Performing Architectures (24%)', topics: [
        'Compute optimization — EC2 instance families, containers (ECS/EKS), Lambda',
        'Storage performance — EBS volume types, S3 performance, EFS throughput',
        'Database performance — RDS read replicas, DynamoDB DAX, Aurora, ElastiCache',
        'Network performance — CloudFront, Global Accelerator, Gateway endpoints'
      ]},
      { week: 'Domain 4 — Design Cost-Optimized Architectures (20%)', topics: [
        'Cost-effective compute — Spot Instances, Savings Plans, Fargate',
        'Storage cost optimization — S3 lifecycle policies, Intelligent-Tiering',
        'Managed services — reducing operational overhead with AWS managed services',
        'Architecture review — Well-Architected reviews and optimization recommendations'
      ]}
    ]
  },

  'aws-sysops-administrator': {
    description: 'The AWS Certified SysOps Administrator - Associate (SOA-C02) validates system administration and operations skills on AWS. Covers six domains: Monitoring and Remediation (20%), Reliability and Business Continuity (16%), Deployment and Automation (18%), Security and Compliance (16%), Networking (18%), and Cost Optimization (12%).',
    syllabus: [
      { week: 'Domain 1 — Monitoring, Logging, and Remediation (20%)', topics: [
        'CloudWatch metrics, alarms, logs, and dashboards',
        'CloudTrail logging, event history, and trail configuration',
        'AWS Config — rules, remediation, and compliance tracking',
        'Incident response — automated remediation with EventBridge and Systems Manager'
      ]},
      { week: 'Domain 2 — Reliability and Business Continuity (16%)', topics: [
        'High availability — Multi-AZ deployments, Auto Scaling, ELB health checks',
        'Backup and restore — AWS Backup, snapshots, S3 cross-region replication',
        'Disaster recovery — failover strategies, Route 53 routing policies',
        'Data lifecycle management — retention policies, archival strategies'
      ]},
      { week: 'Domain 3 — Deployment, Provisioning, and Automation (18%)', topics: [
        'AWS CloudFormation — templates, stacks, change sets, stack sets',
        'Systems Manager — Run Command, Patch Manager, State Manager',
        'Elastic Beanstalk and OpsWorks for application deployment',
        'CI/CD integration — CodeDeploy, CodePipeline, and deployment strategies'
      ]},
      { week: 'Domain 4 — Security and Compliance (16%)', topics: [
        'IAM — policy evaluation, cross-account access, federation',
        'Data protection — encryption, key rotation, certificate management',
        'Compliance — AWS Config rules, Security Hub, GuardDuty',
        'Incident investigation — CloudTrail, VPC Flow Logs, detective controls'
      ]},
      { week: 'Domain 5 — Networking and Content Delivery (18%)', topics: [
        'VPC design — subnets, routing, NAT, VPC peering, Transit Gateway',
        'DNS — Route 53 public/private hosted zones, routing policies',
        'CDN — CloudFront distributions, origin configurations, geo-restrictions',
        'Network security — security groups, NACLs, VPN, Direct Connect'
      ]},
      { week: 'Domain 6 — Cost and Performance Optimization (12%)', topics: [
        'Cost management — Budgets, Cost Explorer, RI/SP recommendations',
        'Compute optimization — right-sizing, Auto Scaling strategy',
        'Storage optimization — S3 tiers, EBS gp3, lifecycle policies',
        'Performance monitoring — CloudWatch Contributor Insights, Performance Insights'
      ]}
    ]
  },

  'aws-certified-developer-associate': {
    description: 'The AWS Certified Developer - Associate (DVA-C02) validates technical expertise in developing and maintaining applications on AWS. Covers development with AWS services, CI/CD, security, debugging, and performance optimization.',
    syllabus: [
      { week: 'Domain 1 — Development with AWS Services (32%)', topics: [
        'Compute — Lambda, API Gateway, Elastic Beanstalk, container platforms',
        'Storage and database — S3, DynamoDB, RDS, ElastiCache',
        'Application integration — SQS, SNS, Step Functions, EventBridge',
        'Serverless application model — SAM, CloudFormation for serverless'
      ]},
      { week: 'Domain 2 — Security (26%)', topics: [
        'IAM for developers — Cognito, federated identities, API keys',
        'Secrets management — Secrets Manager, Parameter Store, KMS',
        'Data encryption — S3 encryption, DynamoDB encryption, TLS',
        'Security best practices — least privilege, signed URLs, WAF'
      ]},
      { week: 'Domain 3 — Deployment and CI/CD (22%)', topics: [
        'CodeCommit, CodeBuild, CodeDeploy, CodePipeline — full CI/CD pipeline',
        'Deployment strategies — blue/green, rolling, canary',
        'Infrastructure as Code — CDK, CloudFormation, SAM',
        'Testing — unit, integration, and end-to-end testing on AWS'
      ]},
      { week: 'Domain 4 — Monitoring, Troubleshooting, and Optimization (20%)', topics: [
        'CloudWatch — metrics, logs, alarms, X-Ray for tracing',
        'Performance optimization — Lambda concurrency, DynamoDB auto-scaling',
        'Cost-aware development — architecting for cost efficiency',
        'Troubleshooting — common SDK errors, throttling, and timeout resolution'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // MICROSOFT AZURE
  // ═══════════════════════════════════════════════════

  'microsoft-azure-az-900': {
    description: 'Microsoft Azure Fundamentals (AZ-900) validates foundational cloud knowledge and core Azure services. Covers three domains: Cloud Concepts (25-30%), Azure Architecture and Services (35-40%), and Azure Management and Governance (30-35%). Ideal entry point for Azure certification journey.',
    syllabus: [
      { week: 'Domain 1 — Cloud Concepts (25-30%)', topics: [
        'Cloud computing benefits — scalability, elasticity, agility, high availability',
        'Shared responsibility model and cloud deployment models (public, private, hybrid)',
        'Cloud service types — IaaS, PaaS, SaaS and their use cases',
        'Consumption-based model, CapEx vs OpEx, and total cost of ownership'
      ]},
      { week: 'Domain 2 — Azure Architecture and Services (35-40%)', topics: [
        'Azure global infrastructure — regions, availability zones, region pairs, datacenters',
        'Compute — VMs, App Service, Functions, AKS, Container Instances',
        'Networking — VNet, Load Balancer, VPN Gateway, ExpressRoute, DNS',
        'Storage — Blob, Disk, Files, tiers (hot/cool/cold/archive), Data Lake',
        'Database — Cosmos DB, SQL Database, Azure SQL Managed Instance'
      ]},
      { week: 'Domain 3 — Azure Identity, Security, and Governance', topics: [
        'Microsoft Entra ID (Azure AD) — identity, authentication, MFA, SSO',
        'Role-Based Access Control (RBAC) and Azure Policy',
        'Microsoft Defender for Cloud, Key Vault, and security best practices',
        'Azure management — Management Groups, subscriptions, resource groups, tags'
      ]},
      { week: 'Domain 4 — Cost Management, SLAs, and Monitoring', topics: [
        'Pricing Calculator and TCO Calculator',
        'Azure Cost Management — budgets, alerts, cost analysis',
        'Service Level Agreements (SLAs) and availability calculations',
        'Monitoring — Azure Monitor, Service Health, Advisor recommendations'
      ]}
    ]
  },

  'azure-administrator-az-104': {
    description: 'Microsoft Azure Administrator (AZ-104) validates skills in managing Azure identities, storage, compute, networking, and governance. This course covers all five exam domains with hands-on labs and scenario-based learning for real-world administration.',
    syllabus: [
      { week: 'Domain 1 — Manage Azure Identities and Governance (25%)', topics: [
        'Microsoft Entra ID — users, groups, devices, and administrative units',
        'RBAC — roles, custom roles, and role assignments',
        'Azure Policy — initiatives, assignments, and remediation',
        'Azure governance — management groups, subscriptions, and resource tags'
      ]},
      { week: 'Domain 2 — Implement and Manage Storage (20%)', topics: [
        'Storage accounts — types, replication strategies, and access tiers',
        'Blob, File, Queue, and Table storage — configuration and security',
        'Azure Files — SMB file shares, sync, and DFS',
        'Storage security — shared access signatures, access keys, Azure AD authentication'
      ]},
      { week: 'Domain 3 — Deploy and Manage Azure Compute Resources (25%)', topics: [
        'VMs — provisioning, sizing, availability sets, scale sets',
        'Containers — AKS, ACI, Container Registry',
        'App Service — web apps, slots, deployment, and scaling',
        'Serverless — Azure Functions, Logic Apps, and Event Grid'
      ]},
      { week: 'Domain 4 — Configure and Manage Virtual Networking (20%)', topics: [
        'VNet — addressing, subnets, peering, and VNet integration',
        'Load balancing — Azure Load Balancer, App Gateway, Traffic Manager, Front Door',
        'Hybrid connectivity — VPN Gateway, ExpressRoute, and S2S/VPN',
        'DNS, Private Link, and network security — NSGs, ASGs, Firewall'
      ]},
      { week: 'Domain 5 — Monitor and Maintain Azure Resources (10%)', topics: [
        'Azure Monitor — metrics, logs, alerts, and action groups',
        'Backup and disaster recovery — Recovery Services vault, Backup Center',
        'Update management — Update Management Center, automation accounts',
        'Troubleshooting — Network Watcher, Monitor, and diagnostics'
      ]}
    ]
  },

  'azure-solutions-architect-az-305': {
    description: 'Microsoft Azure Solutions Architect Expert (AZ-305) validates expertise in designing scalable, secure, and resilient solutions on Azure. Covers design of compute, networking, storage, security, migration, and governance solutions using the Well-Architected Framework.',
    syllabus: [
      { week: 'Domain 1 — Design Identity, Governance, and Security (30%)', topics: [
        'Design identity solutions — Microsoft Entra ID, Conditional Access, identity protection',
        'Design governance — management groups, RBAC strategy, Azure Policy at scale',
        'Design security — Defender for Cloud, Key Vault, encryption strategy',
        'Design compliance — regulatory requirements, data residency, privacy'
      ]},
      { week: 'Domain 2 — Design Data Storage Solutions (25%)', topics: [
        'Design storage accounts — replication, access, and data protection strategy',
        'Design databases — SQL, Cosmos DB, data warehousing, and caching',
        'Design data integration — Azure Data Factory, Synapse, Databricks',
        'Design backup and disaster recovery — Recovery Services, geo-redundancy'
      ]},
      { week: 'Domain 3 — Design Compute and Networking Solutions (25%)', topics: [
        'Design compute — VMs, containers (AKS), serverless (Functions, Logic Apps)',
        'Design application architecture — microservices, message-based, event-driven',
        'Design network — VNet segmentation, connectivity, load balancing, CDN',
        'Design hybrid architecture — ExpressRoute, VPN, Azure Arc'
      ]},
      { week: 'Domain 4 — Design Migration, Reliability, and Cost (20%)', topics: [
        'Migration strategy — Azure Migrate, Data Box, database migration',
        'Design for reliability — high availability, SLA targets, multi-region',
        'Design for cost optimization — right-sizing, reserved instances, Azure Hybrid Benefit',
        'Well-Architected Framework review — operational excellence, performance efficiency'
      ]}
    ]
  },

  'microsoft-azure-devops-az-400': {
    description: 'Microsoft Azure DevOps Solutions (AZ-400) validates expertise in designing and implementing DevOps practices using Azure tools. Covers CI/CD, infrastructure as Code, security, monitoring, and collaboration with Azure DevOps and GitHub.',
    syllabus: [
      { week: 'Module 1 — DevOps Strategy and Culture', topics: [
        'DevOps principles and transformation planning',
        'Cultural change — collaboration, feedback, and continuous improvement',
        'Value stream mapping and measuring DevOps maturity',
        'Tool selection — Azure DevOps vs GitHub vs hybrid approaches'
      ]},
      { week: 'Module 2 — CI/CD Implementation', topics: [
        'Azure Pipelines — YAML pipelines, build and release strategies',
        'GitHub Actions — workflows, runners, and secrets management',
        'Deployment patterns — blue/green, canary, rolling, feature flags',
        'Artifact management — Azure Artifacts, package feeds, and dependency management'
      ]},
      { week: 'Module 3 — Infrastructure as Code and Configuration', topics: [
        'ARM templates, Bicep, and Terraform on Azure',
        'Desired State Configuration (DSC) and Azure Automation',
        'Ansible, Chef, and Puppet for configuration management',
        'Container orchestration — AKS deployment, Helm charts'
      ]},
      { week: 'Module 4 — Security, Monitoring, and Feedback', topics: [
        'DevSecOps — security scanning, SAST/DAST, dependency scanning',
        'Azure Monitor — Application Insights, alerts, and dashboards',
        'Log analytics, KQL queries, and intelligent recommendations',
        'Feedback mechanisms — retrospectives, A/B testing, and experimentation'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // GOOGLE CLOUD
  // ═══════════════════════════════════════════════════

  'google-cloud': {
    description: 'Google Cloud certification validates skills in GCP fundamentals, compute, storage, networking, data, and AI services. This course covers core GCP services, architecture best practices, security, and exam preparation for the Associate Cloud Engineer or equivalent certification.',
    syllabus: [
      { week: 'Module 1 — Google Cloud Fundamentals & Core Infrastructure', topics: [
        'GCP overview — regions, zones, projects, and resource hierarchy',
        'Compute Engine — VMs, machine families, disks, images, and instance templates',
        'Google Kubernetes Engine (GKE) — clusters, pods, deployments, and services',
        'Cloud IAM — roles, policies, service accounts, and access management'
      ]},
      { week: 'Module 2 — Storage, Networking, and Security', topics: [
        'Cloud Storage — buckets, object lifecycle, and storage classes',
        'Databases — Cloud SQL, Firestore, Bigtable, Spanner, and Memorystore',
        'VPC — subnets, firewall rules, Cloud NAT, Cloud Load Balancing',
        'Cloud CDN, Cloud Armor, and security best practices'
      ]},
      { week: 'Module 3 — Data, Analytics, and AI Services', topics: [
        'BigQuery — serverless data warehouse, SQL queries, partitioning, clustering',
        'Dataflow, Dataproc, and Pub/Sub for batch and stream processing',
        'Vertex AI — ML model training, deployment, and predictions',
        'Cloud Functions, Cloud Run, and serverless application architectures'
      ]},
      { week: 'Module 4 — DevOps, Monitoring, and Exam Preparation', topics: [
        'Cloud Build, Artifact Registry, and CI/CD pipelines',
        'Cloud Monitoring, Logging, Error Reporting, and Service Monitoring',
        'Resource management — Cloud Billing, budgets, quotas, and APIs',
        'Exam strategy, practice tests, and real-world architecture scenarios'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // SCRUM & AGILE
  // ═══════════════════════════════════════════════════

  'certified-scrum-master-csm': {
    description: 'Certified ScrumMaster (CSM) from Scrum Alliance validates understanding of Scrum framework and ability to serve as an effective Scrum Master. This course covers agile principles, Scrum roles/events/artifacts, facilitation, coaching, and impediment removal.',
    syllabus: [
      { week: 'Module 1 — Agile & Scrum Foundations', topics: [
        'Agile Manifesto — values, principles, and agile mindset',
        'Scrum overview — empirical process control (transparency, inspection, adaptation)',
        'Scrum values — commitment, courage, focus, openness, respect',
        'Scrum Master role — servant leadership, facilitation, and coaching'
      ]},
      { week: 'Module 2 — Scrum Events and Artifacts', topics: [
        'Sprint Planning — goals, capacity, and backlog decomposition',
        'Daily Scrum — synchronization, impediments, and adaptation',
        'Sprint Review — demo, feedback, and value demonstration',
        'Sprint Retrospective — continuous improvement and action items',
        'Product Backlog, Sprint Backlog, and Increment'
      ]},
      { week: 'Module 3 — Agile Planning and Estimation', topics: [
        'User stories, acceptance criteria, and story mapping',
        'Estimation techniques — story points, planning poker, affinity mapping',
        'Release planning, velocity, burndown/burnup charts',
        'Definition of Done and quality management'
      ]},
      { week: 'Module 4 — CSM Exam Prep and Real-World Application', topics: [
        'CSM exam format — 50 multiple-choice questions, 60 minutes',
        'Scrum Master scenarios — facilitation, coaching, conflict resolution',
        'Scaling Scrum — Scrum of Scrums, Nexus basics',
        'Creating an actionable Scrum implementation plan'
      ]}
    ]
  },

  'professional-scrum-master-i-psm-i': {
    description: 'Professional Scrum Master I (PSM I) from Scrum.org validates mastery of the Scrum framework. This course provides a deep understanding of the Scrum Guide, Scrum Master accountabilities, and application of Scrum in real-world environments.',
    syllabus: [
      { week: 'Module 1 — Scrum Framework Deep Dive', topics: [
        'Scrum theory — empiricism, pillars (transparency, inspection, adaptation)',
        'Scrum Guide — complete review of roles, events, and artifacts',
        'Scrum values and their practical application',
        'Accountabilities vs responsibilities — distinguishing Scrum roles'
      ]},
      { week: 'Module 2 — Scrum Master as Servant Leader', topics: [
        'Scrum Master accountabilities — coaching, facilitation, teaching, mentoring',
        'Managing stakeholders and fostering engagement',
        'Self-managing teams — enabling autonomy and performance',
        'Removing impediments and enabling team progress'
      ]},
      { week: 'Module 3 — Planning, Progress, and Value Delivery', topics: [
        'Multi-level planning — vision, roadmap, release, sprint',
        'Product backlog refinement and ordering strategies',
        'Forecasting — velocity, burndown, burnup, and flow metrics',
        'Definition of Done and quality management practices'
      ]},
      { week: 'Module 4 — PSM I Exam Preparation', topics: [
        'PSM I assessment format — 80 questions, 60 minutes, 85% pass mark',
        'Scrum.org open assessments and mock exams',
        'Evidence-Based Management (EBM) basics',
        'Real-world Scrum implementation case studies'
      ]}
    ]
  },

  'professional-scrum-master-ii-psm-ii': {
    description: 'Professional Scrum Master II (PSM II) from Scrum.org validates advanced Scrum Master skills for complex environments. Focus on scaling Scrum, coaching teams, facilitating organizational change, and leading agile transformations.',
    syllabus: [
      { week: 'Module 1 — Advanced Scrum Mastery', topics: [
        'PSM II assessment format — 30 scenario-based questions, 90 minutes',
        'Scrum beyond the single team — organizational agility and culture',
        'Systemic thinking — understanding team dynamics and organizational systems',
        'Advanced facilitation — conflict resolution, decision-making, and Liberating Structures'
      ]},
      { week: 'Module 2 — Scaling Scrum and Frameworks', topics: [
        'Scrum of Scrums and Nexus framework',
        'Multi-team coordination — dependency management and integration',
        'Large-scale agile — LeSS, SAFe, or Nexus comparative overview',
        'Organizational structures for agile at scale'
      ]},
      { week: 'Module 3 — Coaching and Organizational Change', topics: [
        'Coaching Product Owners, teams, and leadership',
        'Leading agile transformations and change management',
        'Metrics for agile effectiveness — flow, outcomes, and value',
        'Building communities of practice and learning culture'
      ]},
      { week: 'Module 4 — Complex Scenarios and Assessment Prep', topics: [
        'Case studies — Scrum implementation challenges and solutions',
        'Advanced EBM — Key Value Areas and improvement experiments',
        'PSM II practice assessment with complex scenario questions',
        'Creating actionable improvement plans for organizations'
      ]}
    ]
  },

  'professional-scrum-product-owner-i-pspo-i': {
    description: 'Professional Scrum Product Owner I (PSPO I) from Scrum.org validates knowledge of the Product Owner role and ability to maximize product value through effective backlog management, stakeholder engagement, and evidence-based decision-making.',
    syllabus: [
      { week: 'Module 1 — Product Owner Role and Accountabilities', topics: [
        'Scrum Guide — Product Owner accountabilities and responsibilities',
        'Product vision, strategy, and goal setting',
        'Stakeholder identification, management, and expectation alignment',
        'Value-driven development and ROI optimization'
      ]},
      { week: 'Module 2 — Product Backlog Management', topics: [
        'Product Backlog creation, refinement, and ordering techniques',
        'User stories, acceptance criteria, and story mapping',
        'Backlog decomposition — epics, features, stories, tasks',
        'Multi-level planning — product, release, and sprint'
      ]},
      { week: 'Module 3 — Value Maximization and Evidence-Based Decisions', topics: [
        'Techniques for measuring and maximizing value delivery',
        'Evidence-Based Management (EBM) — Key Value Areas and metrics',
        'Market analysis, customer feedback, and data-driven decisions',
        'Release management and stakeholder communication'
      ]},
      { week: 'Module 4 — PSPO I Exam Preparation', topics: [
        'PSPO I assessment format — 80 questions, 60 minutes, 85% pass mark',
        'Open assessments and practice exams with detailed feedback',
        'Product Owner scenarios and stakeholder interaction case studies',
        'Real-world case studies in product ownership'
      ]}
    ]
  },

  'professional-scrum-product-owner-ii-pspo-ii': {
    description: 'Professional Scrum Product Owner II (PSPO II) validates advanced Product Owner skills for complex environments. Focus on managing value across multiple products, advanced stakeholder strategies, and customer-centric innovation at scale.',
    syllabus: [
      { week: 'Module 1 — Advanced Product Ownership', topics: [
        'PSPO II assessment structure — 30 scenario questions, 90 minutes',
        'Product portfolios — managing value across multiple products',
        'Advanced stakeholder management and expectation alignment',
        'Customer research, discovery, and experimentation'
      ]},
      { week: 'Module 2 — Value at Scale and Strategy', topics: [
        'Scaling product ownership across multiple teams and dependencies',
        'EBM for product portfolios — measuring and improving outcomes',
        'Product strategy, roadmapping, and OKR alignment',
        'Managing the product lifecycle from inception to retirement'
      ]},
      { week: 'Module 3 — Innovation and Market Leadership', topics: [
        'Design thinking, Lean Startup, and product discovery techniques',
        'A/B testing, metrics, and data-informed product decisions',
        'Innovation accounting and validated learning',
        'Competitive analysis and market positioning'
      ]},
      { week: 'Module 4 — Complex Scenarios and PSPO II Exam Prep', topics: [
        'Case studies — complex product ownership challenges',
        'Multi-team product backlog coordination and integration',
        'PSPO II practice with scenario-based questions',
        'Creating value-driven product strategies and roadmaps'
      ]}
    ]
  },

  'professional-scrum-master-ai-essentials-certification': {
    description: 'Professional Scrum Master AI Essentials combines Scrum mastery with AI concepts. Learn to leverage AI tools for backlog management, sprint planning, team collaboration, and data-driven agile decision-making.',
    syllabus: [
      { week: 'Module 1 — Scrum Foundations and AI Landscape', topics: [
        'Scrum framework review — roles, events, and artifacts',
        'AI and ML fundamentals for Scrum teams',
        'Opportunities for AI in agile project management',
        'Ethical AI considerations in product development'
      ]},
      { week: 'Module 2 — AI-Enhanced Scrum Practices', topics: [
        'AI-powered backlog prioritization and refinement',
        'Intelligent sprint planning with predictive analytics',
        'Automated stand-ups and AI-driven progress tracking',
        'AI-assisted retrospectives — pattern recognition and insights'
      ]},
      { week: 'Module 3 — AI Tools for Product Owners and Teams', topics: [
        'AI for user story generation and acceptance criteria',
        'Automated testing, CI/CD, and quality prediction',
        'AI-driven stakeholder communication and reporting',
        'Building AI-powered product features'
      ]},
      { week: 'Module 4 — Exam Prep and AI Integration Strategy', topics: [
        'PSM AI Essentials assessment format and practice',
        'Developing an AI integration roadmap for Scrum teams',
        'Real-world case studies — AI in agile organizations',
        'Future trends — AI, ML, and the evolving Scrum Master role'
      ]}
    ]
  },

  'advanced-certified-scrum-product-owner-a-cspo': {
    description: 'Advanced Certified Scrum Product Owner (A-CSPO) from Scrum Alliance deepens Product Owner capabilities. Master advanced backlog techniques, stakeholder strategies, value optimization, and product leadership beyond the CSPO foundation.',
    syllabus: [
      { week: 'Module 1 — Advanced Product Ownership Mindset', topics: [
        'A-CSPO learning objectives and certification pathway',
        'Product Owner as strategic leader — vision, strategy, tactics',
        'Advanced stakeholder mapping and engagement models',
        'Product discovery vs delivery — balancing exploration'
      ]},
      { week: 'Module 2 — Value-Driven Backlog Management', topics: [
        'Advanced backlog ordering — value, risk, dependency, and experimentation',
        'Lean and Lean Startup principles for product ownership',
        'Experimentation and validated learning approaches',
        'Leading and lagging indicators for product success'
      ]},
      { week: 'Module 3 — Stakeholder Collaboration and Communication', topics: [
        'Managing multiple stakeholders with competing priorities',
        'Product roadmap communication and transparency',
        'Release planning and customer-centric delivery',
        'Negotiation and conflict resolution for Product Owners'
      ]},
      { week: 'Module 4 — Real-World Application and Certification', topics: [
        'Case studies — product ownership challenges and solutions',
        'A-CSPO assessment preparation and practice',
        'Building an actionable product improvement plan',
        'Continuous learning and professional development path'
      ]}
    ]
  },

  'agile-advanced-certified-scrummaster-a-csm': {
    description: 'Advanced Certified ScrumMaster (A-CSM) from Scrum Alliance builds upon CSM foundation. Develop advanced facilitation, professional coaching, agile leadership, and organizational change capabilities.',
    syllabus: [
      { week: 'Module 1 — Advanced Scrum Master Facilitation', topics: [
        'A-CSM learning journey and competency framework',
        'Advanced facilitation — decision-making, conflict resolution, Liberating Structures',
        'Design thinking and problem-solving workshops',
        'Meeting formats — retrospectives, planning, reviews'
      ]},
      { week: 'Module 2 — Coaching Agile Teams', topics: [
        'Professional coaching skills for Scrum Masters',
        'Team dynamics assessment and intervention strategies',
        'Coaching self-managing teams and fostering accountability',
        'Emotional intelligence and psychological safety'
      ]},
      { week: 'Module 3 — Organizational Agility and Change', topics: [
        'Leading agile adoption and organizational change',
        'Agile culture, values, and principles at scale',
        'Management 3.0 practices and employee engagement',
        'Building communities of practice and learning organizations'
      ]},
      { week: 'Module 4 — A-CSM Certification and Application', topics: [
        'A-CSM assessment preparation and practice exercises',
        'Creating coaching and facilitation action plans',
        'Real-world case studies — advanced Scrum Master scenarios',
        'Continuous improvement and professional development roadmap'
      ]}
    ]
  },

  'agile-certified-scrum-product-owner-cspo': {
    description: 'Certified Scrum Product Owner (CSPO) from Scrum Alliance equips you to own the product vision, manage stakeholders, and maximize ROI through effective backlog management and agile product delivery practices.',
    syllabus: [
      { week: 'Module 1 — Product Owner Role and Agile Mindset', topics: [
        'Agile product ownership overview and CSPO certification',
        'Product vision, strategy, and goal alignment',
        'Scrum framework for Product Owners — roles, events, artifacts',
        'Understanding value, ROI, and product economics'
      ]},
      { week: 'Module 2 — Backlog Management and User Stories', topics: [
        'Product Backlog creation, refinement, and ordering',
        'User stories, personas, and acceptance criteria',
        'Story mapping and release planning techniques',
        'Estimating — story points, t-shirt sizes, affinity estimation'
      ]},
      { week: 'Module 3 — Stakeholder Management and Communication', topics: [
        'Identifying and engaging stakeholders effectively',
        'Managing expectations and competing priorities',
        'Product roadmap communication and transparency',
        'Collaborative decision-making and negotiation'
      ]},
      { week: 'Module 4 — Delivery, Validation, and CSPO Certification', topics: [
        'Sprint Reviews — gathering feedback and iterating',
        'Metrics for product success — velocity, value, satisfaction',
        'CSPO assessment preparation and practice',
        'Real-world case studies and continuous learning path'
      ]}
    ]
  },

  'agile-safe-advanced-scrum-master-sasm': {
    description: 'SAFe Advanced Scrum Master (SASM) prepares you to coach agile teams within the Scaled Agile Framework. Learn to facilitate Agile Release Trains, coordinate across teams, and drive relentless improvement at enterprise scale.',
    syllabus: [
      { week: 'Module 1 — SAFe Principles and Framework', topics: [
        'SAFe overview — Lean-Agile principles and mindset',
        'SAFe configurations — Essential, Portfolio, Large Solution, Full',
        'Agile Release Trains (ARTs) — roles, events, and cadence',
        'SAFe Scrum Master role — coaching, facilitation, leadership'
      ]},
      { week: 'Module 2 — ART Facilitation and Coordination', topics: [
        'PI Planning — preparation, execution, and commitment',
        'System and Solution Demos — integration and feedback',
        'Inspect and Adapt workshop — relentless improvement',
        'Cross-team coordination — Scrum of Scrums, PO Sync'
      ]},
      { week: 'Module 3 — Coaching Agile Teams at Scale', topics: [
        'Coaching self-managing teams within SAFe',
        'DevOps and Continuous Delivery Pipeline in SAFe',
        'Built-in quality practices and agile architecture',
        'Leading organizational change and Lean-Agile transformation'
      ]},
      { week: 'Module 4 — SASM Exam and Enterprise Application', topics: [
        'SASM exam format — 45 questions, 90 minutes, multiple choice',
        'Practice exams and scenario-based problem solving',
        'Real-world case studies — SAFe implementation challenges',
        'SAFe resources, communities, and continuous learning'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // ITIL 4
  // ═══════════════════════════════════════════════════

  'itil-4-foundation': {
    description: 'ITIL® 4 Foundation introduces the management of modern IT-enabled services, common language, key concepts, and the ITIL 4 service management framework. Covers the Service Value System (SVS), Service Value Chain (SVC), four dimensions, guiding principles, and 15 ITIL practices.',
    syllabus: [
      { week: 'Module 1 — Key Concepts of Service Management', topics: [
        'Service, service management, value, utility, warranty, cost, risk',
        'Customer, user, sponsor, stakeholder, organization definitions',
        'Service relationships — service offering, service provision, service consumption',
        'Output vs outcome, and creating value with services'
      ]},
      { week: 'Module 2 — The ITIL Guiding Principles', topics: [
        'Focus on value, Start where you are, Progress iteratively with feedback',
        'Collaborate and promote visibility, Think and work holistically',
        'Keep it simple and practical, Optimize and automate',
        'Applying guiding principles in real-world scenarios'
      ]},
      { week: 'Module 3 — Four Dimensions of Service Management', topics: [
        'Organizations and people — culture, roles, competencies',
        'Information and technology — data, tools, automation',
        'Partners and suppliers — procurement, outsourcing, partnerships',
        'Value streams and processes — workflows, activities, integration'
      ]},
      { week: 'Module 4 — Service Value System and ITIL Practices', topics: [
        'Service Value System (SVS) — components and purpose',
        'Service Value Chain (SVC) — plan, improve, engage, design, obtain, deliver',
        'Continual improvement — model and organizational change management',
        '15 ITIL practices — purpose and key terms (incident, problem, change, service desk, etc.)'
      ]}
    ]
  },

  'itil-4-expert': {
    description: 'ITIL® 4 Expert — the advanced level of ITIL 4 certification, covering the full breadth of ITIL 4 including Create, Deliver and Support; Drive Stakeholder Value; High-Velocity IT; and Direct, Plan and Improve modules.',
    syllabus: [
      { week: 'Module 1 — ITIL 4 Foundation Review & Expert Pathway', topics: [
        'ITIL 4 Foundation concepts — SVS, SVC, four dimensions, guiding principles',
        'Expert certification pathway and module requirements',
        'Managing Professional (MP) stream — CDS, DPI, DSV, HVIT',
        'Strategic Leader (SL) stream — DPI, DSV'
      ]},
      { week: 'Module 2 — Create, Deliver and Support (CDS)', topics: [
        'Workforce and talent management in service delivery',
        'Value streams and flow management',
        'ITIL practices for service delivery — deployment, change, release, Service Desk',
        'Information and technology in value streams'
      ]},
      { week: 'Module 3 — Drive Stakeholder Value (DSV) & High-Velocity IT (HVIT)', topics: [
        'Stakeholder mapping, journey mapping, and service relationship management',
        'Customer experience and user engagement strategies',
        'High-velocity IT — digital transformation, agile, Lean, and DevOps in ITIL',
        'High-velocity culture, practices, and technology adoption'
      ]},
      { week: 'Module 4 — Direct, Plan and Improve (DPI)', topics: [
        'Governance, strategy, and direction-setting',
        'Risk management, compliance, and audit practices',
        'Continual improvement — metrics, assessments, and improvement registers',
        'Organizational change management and communication in improvement'
      ]}
    ]
  },

  'itil-4-master-strategy': {
    description: 'ITIL® 4 Master — the highest level of ITIL certification. This program focuses on strategic IT service management leadership, organizational transformation, and real-world application of ITIL 4 principles at the enterprise level.',
    syllabus: [
      { week: 'Module 1 — Strategic IT Service Management', topics: [
        'ITIL Master pathway and assessment approach',
        'Strategic alignment of IT services with business goals',
        'Enterprise governance of IT-enabled services',
        'Value co-creation at the strategic level'
      ]},
      { week: 'Module 2 — Organizational Transformation and Digital Strategy', topics: [
        'Digital transformation strategy and ITIL 4 integration',
        'Organizational culture, change management, and stakeholder engagement',
        'Service strategy and portfolio management',
        'Innovation management and emerging technology adoption'
      ]},
      { week: 'Module 3 — Advanced Leadership and Management Practices', topics: [
        'Strategic leadership in IT service management',
        'Managing complex and multi-stakeholder environments',
        'Risk management at strategic level — enterprise risk and resilience',
        'Financial management and investment for IT services'
      ]},
      { week: 'Module 4 — Master-Level Assessment Preparation', topics: [
        'Case study analysis and scenario-based leadership',
        'Work-based and experience-based assessment approaches',
        'Developing a strategic improvement plan',
        'Peer review, presentation, and defense of approach'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // TOGAF
  // ═══════════════════════════════════════════════════

  'togaf-level-1-and-2-certification': {
    description: 'TOGAF® Standard, 10th Edition — the leading enterprise architecture framework. This course covers the Architecture Development Method (ADM), ADM techniques, governance, content framework, and enterprise architecture best practices for both Level 1 (Foundation) and Level 2 (Practitioner) certification.',
    syllabus: [
      { week: 'Module 1 — TOGAF Concepts and Enterprise Architecture Fundamentals', topics: [
        'TOGAF Standard, 10th Edition — structure and documentation set',
        'Enterprise Architecture domains — business, data, application, technology',
        'Architecture Development Method (ADM) — phases, cycles, and governance',
        'Architecture principles, repository, enterprise continuum, and maturity models'
      ]},
      { week: 'Module 2 — ADM Phases — Preliminary through Phase D', topics: [
        'Preliminary Phase — framework principles and architecture capability',
        'Phase A — Architecture Vision, stakeholder engagement, and approvals',
        'Phase B — Business Architecture — value streams, capabilities, and organization',
        'Phase C — Information Systems Architecture (Data and Application)',
        'Phase D — Technology Architecture — platform design and infrastructure'
      ]},
      { week: 'Module 3 — ADM Phases — Opportunities to Governance', topics: [
        'Phase E — Opportunities and Solutions — gap analysis and migration planning',
        'Phase F — Migration Planning — implementation roadmap and prioritization',
        'Phase G — Implementation Governance — compliance and architecture board',
        'Phase H — Architecture Change Management — continuous evolution'
      ]},
      { week: 'Module 4 — ADM Techniques, Governance, and Exam Prep', topics: [
        'ADM techniques — stakeholder management, risk, interoperability, and patterns',
        'Content framework and enterprise metamodel',
        'Architecture governance — boards, contracts, and compliance',
        'Level 1 (OGEA-101) and Level 2 (OGEA-102) exam preparation with practice tests'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // SERVICENOW
  // ═══════════════════════════════════════════════════

  'servicenow': {
    description: 'ServiceNow Certified System Administrator (CSA) validates skills in configuring, implementing, and maintaining the ServiceNow platform. Covers UI and navigation, collaboration, database administration, self-service automation, and introductory development.',
    syllabus: [
      { week: 'Module 1 — User Interface, Navigation, and Instance Configuration', topics: [
        'ServiceNow platform overview — capabilities, services, and instance',
        'Lists and filters — personalizing views, filter conditions, and grouping',
        'Forms and templates — form configuration, sections, and variables',
        'Branding — themes, company branding, and UI policies'
      ]},
      { week: 'Module 2 — Collaboration, User Administration, and Notifications', topics: [
        'Task management — assignment, escalation, and work notes',
        'User administration — users, groups, roles, and access controls',
        'Notifications — email, SMS, and push notification configuration',
        'Reporting — dashboards, metrics, and performance analytics'
      ]},
      { week: 'Module 3 — Database Administration and Platform Security (30%)', topics: [
        'Data schema — tables, fields, dictionary, and relationships',
        'Application and access control — ACLs, security rules, and scoping',
        'CMDB — Configuration Management Database and CSDM',
        'Import sets — data sources, transform maps, and scheduling'
      ]},
      { week: 'Module 4 — Self-Service, Automation, and Development', topics: [
        'Knowledge Management — articles, categories, and feedback',
        'Service Catalog — categories, items, variables, and workflow',
        'Flow Designer — triggers, actions, conditions, and approvals',
        'Scripting — Business Rules, Client Scripts, UI Actions, and Script Includes',
        'Migration — update sets, source control, and application scoping'
      ]}
    ]
  },

  'servicenow-demo': {
    description: 'This interactive ServiceNow Demo course provides a comprehensive platform overview through hands-on demonstrations. Explore ITSM workflows, platform features, automation capabilities, and integration through guided walkthroughs.',
    syllabus: [
      { week: 'Module 1 — ServiceNow Platform Overview and Navigation', topics: [
        'Platform architecture, modules, and ecosystem walkthrough',
        'UI demonstration — menus, lists, forms, and dashboards',
        'CMDB and asset management live demo',
        'User roles, access control, and security overview'
      ]},
      { week: 'Module 2 — ITSM Process Demonstrations', topics: [
        'Incident Management — ticketing, assignment, and resolution flow',
        'Problem Management — RCA, known errors, and workaround management',
        'Change Management — CAB, approvals, standard vs emergency changes',
        'Service Catalog — request items, variables, and fulfillment process'
      ]},
      { week: 'Module 3 — Automation and Workflow Showcase', topics: [
        'Flow Designer — creating automated approval and assignment flows',
        'Business rules, scheduled jobs, and notification automation',
        'Service Portal and employee self-service experience',
        'Virtual Agent and AI-powered automation demonstrations'
      ]},
      { week: 'Module 4 — Integration, Reporting, and Advanced Features', topics: [
        'REST and SOAP API integration demonstrations',
        'Reporting, dashboards, and performance analytics showcase',
        'ITOM and Cloud Management capabilities overview',
        'Platform roadmap, resources, and next steps for certification'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // ISTQB
  // ═══════════════════════════════════════════════════

  'istqb-foundation': {
    description: 'ISTQB® Certified Tester Foundation Level (CTFL v4.0) is the globally recognized entry-level software testing certification. This course covers testing fundamentals, SDLC integration, static testing, test techniques, test management, and tool support.',
    syllabus: [
      { week: 'Chapter 1 — Fundamentals of Testing', topics: [
        'What is testing — test objectives, testing vs debugging',
        'Why testing is necessary — contributions to success, QA vs testing',
        'Seven testing principles',
        'Test activities, testware, and test roles',
        'Essential skills and good practices in testing'
      ]},
      { week: 'Chapter 2 — Testing Throughout the Software Development Lifecycle', topics: [
        'Testing in context of SDLC — waterfall, agile, DevOps, continuous delivery',
        'Test levels — component, integration, system, acceptance',
        'Test types — functional, non-functional, structural, change-related',
        'Maintenance testing — triggers and impact analysis'
      ]},
      { week: 'Chapter 3 — Static Testing and Test Analysis Techniques', topics: [
        'Static testing basics — reviews, walkthroughs, inspections',
        'Feedback and review process — formal reviews and roles',
        'Test analysis and design techniques overview',
        'Black-box techniques — equivalence partitioning, boundary value analysis, decision tables',
        'White-box techniques — statement and branch coverage',
        'Experience-based techniques — error guessing, exploratory testing'
      ]},
      { week: 'Chapter 4 — Test Management and Tool Support', topics: [
        'Test planning, estimation, and risk-based testing',
        'Test monitoring, control, and completion — metrics and reporting',
        'Defect management — lifecycle, severity, priority',
        'Configuration management and tool support for testing',
        'Benefits and risks of test automation'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // SIX SIGMA
  // ═══════════════════════════════════════════════════

  'six-sigma-green-belt': {
    description: 'Six Sigma Green Belt certification equips you to lead quality improvement projects using the DMAIC methodology. Covers define, measure, analyze, improve, and control phases with statistical analysis tools and process optimization techniques. Aligned with IASSC and ASQ bodies of knowledge.',
    syllabus: [
      { week: 'Phase 1 — Define Phase', topics: [
        'Basics of Six Sigma — meaning, history, and organizational goals',
        'Six Sigma roles — Champions, Master Black Belts, Black Belts, Green Belts',
        'Project selection — project charter, problem statement, scope, goals',
        'Voice of Customer (VOC), Critical to Quality (CTQ), and SIPOC',
        'Lean enterprise — waste, value-added vs non-value-added, 5S'
      ]},
      { week: 'Phase 2 — Measure Phase', topics: [
        'Process mapping — flowcharts, value stream mapping, spaghetti diagrams',
        'Six Sigma statistics — mean, median, mode, range, variance, standard deviation',
        'Measurement System Analysis (MSA) — Gage R&R, bias, linearity, stability',
        'Process capability — Cp, Cpk, Pp, Ppk, and sigma level calculation',
        'Data collection — sampling methods, operational definitions'
      ]},
      { week: 'Phase 3 — Analyze Phase', topics: [
        'Patterns of variation — common cause vs special cause',
        'Inferential statistics — confidence intervals, hypothesis testing',
        'Hypothesis testing with normal data — t-tests, ANOVA, chi-square',
        'Hypothesis testing with non-normal data — Mann-Whitney, Kruskal-Wallis',
        'Root cause analysis — fishbone, 5 Whys, FMEA'
      ]},
      { week: 'Phase 4 — Improve Phase', topics: [
        'Simple linear regression and correlation',
        'Multiple regression analysis',
        'Designed experiments (DOE) — full and fractional factorial',
        'Lean tools — Kaizen, Kanban, Poka-Yoke, Standard Work',
        'Solution generation, selection, and pilot implementation'
      ]},
      { week: 'Phase 5 — Control Phase', topics: [
        'Lean controls — 5S, Kanban, Poka-Yoke (mistake proofing)',
        'Statistical Process Control (SPC) — I-MR, Xbar-R, p, u, np charts',
        'Control plan — documentation, training, monitoring, and response plans',
        'Sustaining improvements — process ownership and periodic reviews'
      ]}
    ]
  },

  'six-sigma-black-belt': {
    description: 'Six Sigma Black Belt certification prepares you to lead enterprise-wide process improvement initiatives. Master advanced statistical methods, design of experiments, regression analysis, and change management. Aligned with IASSC Black Belt Body of Knowledge.',
    syllabus: [
      { week: 'Phase 1 — Define Phase — Enterprise Leadership', topics: [
        'Black Belt competency model and organizational leadership',
        'Advanced DMAIC — integrating Lean and Six Sigma',
        'Change management — stakeholder analysis, communication, sponsorship',
        'Financial evaluation — cost of poor quality, project ROI, and business case'
      ]},
      { week: 'Phase 2 — Measure and Analyze — Advanced Statistics', topics: [
        'Multiple regression and correlation — residual analysis, transformations',
        'Advanced hypothesis testing — multi-factor ANOVA, non-parametric tests',
        'Logistic regression and binary response modeling',
        'Design of Experiments — full factorial, fractional factorial, response surface',
        'EVOP, mixture experiments, and robust design (Taguchi)'
      ]},
      { week: 'Phase 3 — Improve — Process Optimization', topics: [
        'Lean value stream analysis — VA/NVA analysis, takt time, line balancing',
        'Advanced DOE — optimization, desirability functions, steepest ascent',
        'Simulation and modeling for process improvement',
        'Advanced FMEA — process, design, and system levels'
      ]},
      { week: 'Phase 4 — Control and Process Management', topics: [
        'Multivariate SPC — Hotelling T2, MEWMA, MCUSUM',
        'Advanced control plans — response plans, escalation, and automation',
        'Business process management and engineering',
        'Mentoring Green Belts — coaching, review, and project oversight'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // DEVOPS
  // ═══════════════════════════════════════════════════

  'devops-exin-master': {
    description: 'EXIN DevOps Master is an advanced-level certification validating end-to-end DevOps knowledge including culture, organization, principles, practices, and tooling. Covers continuous delivery, DevOps architecture, product/process improvement, Lean management, cultural change, and maturity assessment.',
    syllabus: [
      { week: 'Module 1 — Implementing Continuous Delivery (32.5%)', topics: [
        'Implementing version control — branching strategies, Git workflows',
        'Automating deployment — configuration management, Infrastructure as Code',
        'Establishing continuous integration — build pipelines, quality gates',
        'Test automation — unit, integration, acceptance, regression',
        'Managing data and data security (DevSecOps)',
        'Continuous delivery — release strategies, environment management'
      ]},
      { week: 'Module 2 — Designing a DevOps Architecture (5%)', topics: [
        'Creating loosely coupled architectures — microservices, APIs',
        'Deployment patterns — blue/green, canary, feature toggles',
        'Containerization — Docker, Kubernetes orchestration basics',
        'Cloud-native design principles'
      ]},
      { week: 'Module 3 — Improving Product and Process Using Lean (30%)', topics: [
        'Using customer feedback — data-driven decisions, A/B testing',
        'Visualizing flow and value stream mapping',
        'Working in small batch sizes — WIP limits, queue theory',
        'Fostering team experimentation — innovation, hypothesis testing'
      ]},
      { week: 'Module 4 — Cultural Change, Monitoring, and Maturity Assessment', topics: [
        'Implementing cultural change — collaboration, trust, psychological safety',
        'Monitoring and logging — metrics, observability, alerting',
        'DevOps maturity assessment — capabilities, gaps, improvement roadmap',
        'GOAT (DevOps game) — applying DevOps principles in practice'
      ]}
    ]
  },

  'devops-tools-and-training': {
    description: 'Hands-on training with essential DevOps tools. Build end-to-end CI/CD pipelines, containerized applications, Kubernetes orchestration, Infrastructure as Code, and monitoring solutions. Practical experience with Git, Jenkins, Docker, Kubernetes, Terraform, Ansible, Prometheus, and Grafana.',
    syllabus: [
      { week: 'Module 1 — Version Control and CI/CD', topics: [
        'Git — branching strategies (GitFlow, trunk-based), pull requests, code review',
        'Jenkins — pipeline as code, build stages, plugins, distributed builds',
        'GitHub Actions — workflows, runners, and marketplace',
        'Build tools — Maven, npm, Gradle; artifact management with Nexus/Artifactory'
      ]},
      { week: 'Module 2 — Containers and Kubernetes', topics: [
        'Docker — images, Dockerfile, volumes, networks, Docker Compose',
        'Kubernetes — pods, deployments, services, ConfigMaps, secrets, ingress',
        'Helm — charts, repositories, and package management',
        'Container security — image scanning, registry, runtime security'
      ]},
      { week: 'Module 3 — Infrastructure as Code and Configuration Management', topics: [
        'Terraform — providers, resources, state management, modules, workspaces',
        'Ansible — playbooks, roles, inventory, and ad-hoc commands',
        'Cloud provisioning — AWS/Azure/GCP with Terraform',
        'Secret management — Vault, AWS Secrets Manager, encrypted variables'
      ]},
      { week: 'Module 4 — Monitoring, Security, and Capstone Project', topics: [
        'Prometheus and Grafana — metrics collection, dashboards, alerting',
        'ELK Stack / Loki — log aggregation, search, and analysis',
        'DevSecOps — SAST, DAST, dependency scanning, compliance as code',
        'End-to-end DevOps pipeline project — Git → Build → Test → Deploy → Monitor'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // CYBERSECURITY
  // ═══════════════════════════════════════════════════

  'comptia-security': {
    description: 'CompTIA Security+ (SY0-701) is the leading entry-level cybersecurity certification. Covers five domains: General Security Concepts (12%), Threats and Vulnerabilities (22%), Security Architecture (18%), Security Operations (28%), and Security Program Management (20%). Validates core security skills for IT roles.',
    syllabus: [
      { week: 'Domain 1 — General Security Concepts (12%)', topics: [
        'Security controls — technical, managerial, operational, physical',
        'CIA triad, non-repudiation, AAA, Zero Trust architecture',
        'Change management processes and cryptographic solutions',
        'Public Key Infrastructure — encryption, hashing, digital signatures, certificates'
      ]},
      { week: 'Domain 2 — Threats, Vulnerabilities, and Mitigations (22%)', topics: [
        'Threat actors — nation-state, criminal, insider, hacktivist, APT',
        'Attack vectors — social engineering, phishing, malware, DoS, supply chain',
        'Vulnerabilities — application, OS, hardware, cloud, mobile, web',
        'Mitigation — hardening, patching, configuration enforcement, isolation'
      ]},
      { week: 'Domain 3 — Security Architecture (18%)', topics: [
        'Enterprise infrastructure — data types, classifications, and governance',
        'Network architecture — segmentation, DMZ, VPN, SDN, Zero Trust',
        'Cloud security — shared responsibility, CASB, IAM, security groups',
        'Resilience — high availability, backups, continuity of operations'
      ]},
      { week: 'Domain 4 — Security Operations (28%)', topics: [
        'Identity and access management — MFA, SSO, federation, account governance',
        'Automation and orchestration — SOAR, playbooks, scripting',
        'Incident response — preparation, detection, containment, recovery, lessons learned',
        'Monitoring — SIEM, vulnerability scanning, log analysis, threat intelligence'
      ]},
      { week: 'Domain 5 — Security Program Management and Oversight (20%)', topics: [
        'Security governance — policies, standards, procedures, guidelines',
        'Risk management — identification, assessment, mitigation, reporting',
        'Business continuity and disaster recovery planning',
        'Security awareness, training, and vendor/third-party risk management'
      ]}
    ]
  },

  'cisa': {
    description: 'CISA (Certified Information Systems Auditor) from ISACA is the premier certification for IT audit, control, and security professionals. Covers five domains: IS Auditing Process (18%), Governance and Management of IT (18%), IS Acquisition and Implementation (12%), IS Operations and Business Resilience (26%), and Protection of Information Assets (26%).',
    syllabus: [
      { week: 'Domain 1 — Information Systems Auditing Process (18%)', topics: [
        'IS audit standards, guidelines, and code of ethics',
        'Risk-based audit planning — scoping, materiality, and resource allocation',
        'Audit project management, evidence collection, and sampling',
        'Audit data analytics, reporting, and follow-up'
      ]},
      { week: 'Domain 2 — Governance and Management of IT (18%)', topics: [
        'IT governance frameworks, organizational structure, and strategy',
        'IT policies, standards, procedures, and practices',
        'Enterprise architecture and enterprise risk management',
        'Privacy program, data governance, and regulatory compliance'
      ]},
      { week: 'Domain 3 — Information Systems Acquisition, Development, and Implementation (12%)', topics: [
        'Project governance and project management practices',
        'Business case development and feasibility analysis',
        'System development methodologies — waterfall, agile, DevOps',
        'Configuration management, testing, and post-implementation review'
      ]},
      { week: 'Domain 4 — Information Systems Operations and Business Resilience (26%)', topics: [
        'IT service management — incident, problem, change, and release management',
        'IT asset management, database management, and job scheduling',
        'Business continuity planning and disaster recovery testing',
        'System availability, capacity management, and performance monitoring'
      ]},
      { week: 'Domain 5 — Protection of Information Assets (26%)', topics: [
        'Data classification, privacy, and information security controls',
        'Identity and access management — logical and physical controls',
        'Network security, encryption, PKI, and endpoint protection',
        'Cloud, mobile, wireless, and IoT security'
      ]}
    ]
  },

  'cism': {
    description: 'CISM (Certified Information Security Manager) from ISACA certifies expertise in managing enterprise information security programs. Four domains: Information Security Governance (17%), Risk Management (20%), Security Program Development (33%), and Incident Management (30%). Management-focused certification.',
    syllabus: [
      { week: 'Domain 1 — Information Security Governance (17%)', topics: [
        'Enterprise governance framework — strategy, objectives, oversight',
        'Legal, regulatory, and compliance requirements',
        'Security governance — policies, standards, and organizational structure',
        'Security awareness, training, and culture development'
      ]},
      { week: 'Domain 2 — Information Security Risk Management (20%)', topics: [
        'Risk identification — asset valuation, threat modeling, vulnerability assessment',
        'Risk analysis — qualitative, quantitative, and semi-quantitative methods',
        'Risk response — mitigation, transfer, avoidance, acceptance',
        'Third-party risk management and vendor assessment'
      ]},
      { week: 'Domain 3 — Information Security Program Development (33%)', topics: [
        'Security program architecture, metrics, and resource management',
        'Security controls — technical, administrative, physical implementation',
        'Security operations — monitoring, threat intelligence, vulnerability management',
        'Business continuity and disaster recovery planning and testing'
      ]},
      { week: 'Domain 4 — Incident Management (30%)', topics: [
        'Incident response — preparation, detection, analysis, containment, recovery',
        'Incident investigation, forensics, and evidence collection',
        'Communication and reporting during incidents',
        'Post-incident review and improvement planning'
      ]}
    ]
  },

  'ceh': {
    description: 'Certified Ethical Hacker (CEH v13) from EC-Council is the world\'s #1 ethical hacking certification. Covers 20 modules with 550+ attack techniques, 221 hands-on labs, and over 4,000 security tools. Includes AI-powered capabilities and methodologies.',
    syllabus: [
      { week: 'Module 1 — Introduction to Ethical Hacking', topics: [
        'Information security and ethical hacking overview',
        'Hacking methodologies and frameworks (Cyber Kill Chain, MITRE ATT&CK)',
        'Information security controls, laws, and standards',
        'AI-enhanced threat detection and response'
      ]},
      { week: 'Module 2 — Reconnaissance and Scanning', topics: [
        'Footprinting through search engines, web services, and social networks',
        'Network scanning — port scanning, OS detection, vulnerability scanning',
        'Enumeration — NetBIOS, SNMP, LDAP, NFS, DNS enumeration',
        'Automated information gathering with AI tools'
      ]},
      { week: 'Module 3 — System Hacking and Malware Threats', topics: [
        'System hacking — password cracking, privilege escalation, maintaining access',
        'Malware analysis — Trojans, viruses, worms, fileless malware, APT',
        'Sniffing — packet capture, ARP poisoning, DNS spoofing',
        'Social engineering — phishing, pretexting, impersonation'
      ]},
      { week: 'Module 4 — Network, Web, and Wireless Hacking', topics: [
        'Evading IDS, firewalls, and honeypots',
        'Hacking web servers and web applications — SQL injection, XSS, CSRF',
        'Wireless network hacking — WEP/WPA cracking, evil twin',
        'Cloud computing, IoT, OT hacking, and cryptography'
      ]}
    ]
  },

  'advanced-threat-analysis': {
    description: 'Advanced Threat Analysis — master threat intelligence frameworks, TTP analysis, threat hunting, and advanced persistent threat (APT) detection. Covers cyber threat intelligence lifecycle, OSINT, dark web monitoring, and proactive defense strategies.',
    syllabus: [
      { week: 'Module 1 — Cyber Threat Intelligence Fundamentals', topics: [
        'Threat intelligence lifecycle — planning, collection, processing, analysis, dissemination',
        'OSINT — open source collection, tools, and automation',
        'Dark web monitoring — TOR, I2P, marketplaces, and forums',
        'Threat actors — APT groups, cybercrime, hacktivism, nation-state'
      ]},
      { week: 'Module 2 — TTP Analysis and Threat Hunting', topics: [
        'MITRE ATT&CK framework — tactics, techniques, and procedures',
        'Threat hunting methodology — hypothesis-driven, IOCs, IOAs',
        'YARA rules, Sigma rules, and detection engineering',
        'Malware analysis — static, dynamic, memory forensics'
      ]},
      { week: 'Module 3 — Advanced Persistent Threat Detection', topics: [
        'APT lifecycle — reconnaissance, weaponization, delivery, exploitation, C2',
        'Network threat analysis — traffic analysis, DNS tunneling, beaconing detection',
        'Endpoint detection and response (EDR) — telemetry, behavioral analytics',
        'Cloud threat analysis — IAM anomalies, data exfiltration detection'
      ]},
      { week: 'Module 4 — Intelligence-Driven Defense and Reporting', topics: [
        'Integrating threat intelligence with SIEM and SOAR',
        'Vulnerability prioritization — CVSS, EPSS, threat context',
        'Threat intelligence sharing — STIX/TAXII, MISP',
        'Reporting — actionable intelligence reports and briefings'
      ]}
    ]
  },

  'security-architecture-design': {
    description: 'Security Architecture Design — design secure enterprise architectures using industry frameworks including SABSA, TOGAF, and the Zachman Framework. Cover zero trust architecture, cloud security architecture, identity and access management design, and security patterns for modern enterprises.',
    syllabus: [
      { week: 'Module 1 — Enterprise Security Architecture Frameworks', topics: [
        'SABSA — Business, Architecture, and Service Management perspectives',
        'TOGAF for security architects — integrating security into ADM',
        'Zachman Framework for security architecture',
        'Security architecture artifacts, views, and viewpoints'
      ]},
      { week: 'Module 2 — Zero Trust Architecture Design', topics: [
        'Zero Trust principles — never trust, always verify, least privilege',
        'NIST SP 800-207 Zero Trust Architecture',
        'Micro-segmentation, identity-aware proxies, and policy-driven access',
        'Zero Trust for cloud, hybrid, and multi-cloud environments'
      ]},
      { week: 'Module 3 — Cloud Security Architecture', topics: [
        'Shared responsibility model across IaaS, PaaS, SaaS',
        'Cloud security controls — CASB, CSPM, CWPP, CIEM',
        'Identity federation, SSO, MFA, and privileged access management',
        'Data security — encryption, DLP, key management'
      ]},
      { week: 'Module 4 — Security Patterns and Reference Architectures', topics: [
        'Secure network architecture — segmentation, DMZ, zero-trust, SASE',
        'Application security architecture — secure SDLC, API security',
        'Resilience and defense-in-depth patterns',
        'Security architecture reviews and maturity assessment'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // BUSINESS ANALYSIS
  // ═══════════════════════════════════════════════════

  'cbap': {
    description: 'CBAP (Certified Business Analysis Professional) from IIBA is the premier certification for experienced business analysts. Based on the BABOK® Guide v3, this course covers six knowledge areas: Planning and Monitoring, Elicitation and Collaboration, Requirements Life Cycle Management, Strategy Analysis, Requirements Analysis and Design Definition, and Solution Evaluation.',
    syllabus: [
      { week: 'Knowledge Area 1 — Business Analysis Planning and Monitoring', topics: [
        'Plan business analysis approach — methodology, governance, and tools',
        'Plan stakeholder engagement — identification, analysis, and communication',
        'Plan governance — decision-making, approvals, and prioritization',
        'Plan information management — requirements documentation and traceability',
        'Identify performance improvements — metrics and process evaluation'
      ]},
      { week: 'Knowledge Area 2 — Elicitation and Collaboration', topics: [
        'Elicitation techniques — interviews, workshops, surveys, observation, prototyping',
        'Manage stakeholder collaboration — conflict resolution and consensus building',
        'Confirm elicitation results — validation and sign-off',
        'Communication — reporting, presentations, and stakeholder updates'
      ]},
      { week: 'Knowledge Area 3 — Requirements Life Cycle Management and Strategy Analysis', topics: [
        'Requirements traceability, prioritization, and change management',
        'Strategy analysis — current state, future state, risk analysis, and business case',
        'Requirements analysis and design definition — modeling, specification, and validation',
        'Define solution options and recommending the optimal approach'
      ]},
      { week: 'Knowledge Area 4 — Solution Evaluation and Underlying Competencies', topics: [
        'Measure solution performance — KPIs, acceptance criteria, and metrics',
        'Analyze performance measures and assess solution limitations',
        'Assess enterprise limitations and recommend actions to increase value',
        'Analytical thinking, problem-solving, communication, and negotiation skills'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // POWER BI
  // ═══════════════════════════════════════════════════

  'power-bi': {
    description: 'Microsoft Power BI Data Analyst (PL-300) validates the ability to prepare, model, visualize, and analyze data using Power BI. Covers four domains: Prepare the Data (25-30%), Model the Data (25-30%), Visualize and Analyze the Data (25-30%), and Manage and Secure Power BI (15-20%).',
    syllabus: [
      { week: 'Domain 1 — Prepare the Data (25-30%)', topics: [
        'Get or connect to data — Excel, SQL, web APIs, Azure services',
        'Profile and clean data — data quality, column profiling, error handling',
        'Transform and load data — Power Query, M language, query folding',
        'Choose storage mode — Import, DirectQuery, Dual, and Composite models'
      ]},
      { week: 'Domain 2 — Model the Data (25-30%)', topics: [
        'Design and implement a data model — star schema, relationships, cardinality',
        'Create model calculations using DAX — CALCULATE, FILTER, ALL, VALUES',
        'Time intelligence — YTD, QTD, MTD, SAMEPERIODLASTYEAR',
        'Optimize model performance — calculated columns vs measures, storage engine'
      ]},
      { week: 'Domain 3 — Visualize and Analyze the Data (25-30%)', topics: [
        'Design reports — visualization types, formatting, and theming',
        'Interactive reports — slicers, filters, bookmarks, drill-through, tooltips',
        'Advanced analytics — Q&A, quick insights, AI visuals, anomalies',
        'Paginated reports — RDL, matrix, tables, and export formats'
      ]},
      { week: 'Domain 4 — Manage and Secure Power BI (15-20%)', topics: [
        'Workspace management — workspaces, apps, and deployment pipelines',
        'Row-level security (RLS) — static and dynamic roles',
        'Power BI service — dashboards, sharing, data refresh, gateway',
        'Access control — app permissions, workspace roles, and content certification'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // CPMAI & AI PROJECT MANAGEMENT
  // ═══════════════════════════════════════════════════

  'cpmai-and-ai-project-management': {
    description: 'CPMAI (Certified Project Management in AI) — master the end-to-end lifecycle of AI and machine learning projects. Covers problem framing, data strategy, model development, deployment, monitoring, and governance for AI initiatives.',
    syllabus: [
      { week: 'Module 1 — AI Project Management Fundamentals', topics: [
        'AI/ML project lifecycles vs traditional projects',
        'Problem framing — identifying AI-suitable business problems',
        'Feasibility assessment — data readiness, technology, and team capability',
        'Stakeholder management for AI projects — building trust and managing expectations'
      ]},
      { week: 'Module 2 — Data Strategy and Data Engineering', topics: [
        'Data collection strategy — sources, quality, volume, and velocity',
        'Data preparation — cleaning, labeling, augmentation, and feature engineering',
        'Data governance — privacy, security, bias detection, and compliance',
        'Data pipeline management — ingestion, transformation, and storage'
      ]},
      { week: 'Module 3 — Model Development and Evaluation', topics: [
        'Model selection — supervised, unsupervised, reinforcement learning',
        'ML experiment tracking — versioning, hyperparameter tuning, and evaluation metrics',
        'Model validation — cross-validation, bias/variance tradeoff, confusion matrix',
        'Responsible AI — fairness, interpretability, explainability, and transparency'
      ]},
      { week: 'Module 4 — Deployment, Monitoring, and MLOps', topics: [
        'Model deployment — batch, real-time, edge, and API deployment strategies',
        'Model monitoring — drift detection, retraining triggers, performance dashboards',
        'MLOps — CI/CD for ML, feature stores, model registries',
        'AI governance — ethics, auditing, risk management, and regulatory compliance'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // DATA & ANALYTICS ADVANCED
  // ═══════════════════════════════════════════════════

  'advanced-data-engineering': {
    description: 'Advanced Data Engineering — design and build scalable data platforms. Covers modern data architectures including data lakehouse, data mesh, and data fabric. Hands-on with distributed processing (Spark), streaming, orchestration, and data platform ops.',
    syllabus: [
      { week: 'Module 1 — Modern Data Architecture Patterns', topics: [
        'Data lakehouse vs data warehouse vs data mesh vs data fabric',
        'Medallion architecture — bronze, silver, gold layers',
        'Data platform design — storage, compute, catalog, and governance',
        'Cloud data platforms — AWS, Azure, GCP comparison'
      ]},
      { week: 'Module 2 — Distributed Data Processing', topics: [
        'Apache Spark — RDDs, DataFrames, SQL, streaming, and optimization',
        'Distributed computing — partitioning, shuffling, caching, broadcast joins',
        'Workflow orchestration — Airflow, Dagster, Prefect',
        'Data transformation — dbt, SQL-based transformations, incremental models'
      ]},
      { week: 'Module 3 — Streaming and Real-Time Pipelines', topics: [
        'Stream processing fundamentals — Kafka, Kinesis, Pub/Sub',
        'Stream processing engines — Flink, Spark Streaming, Kafka Streams',
        'State management, exactly-once semantics, and checkpointing',
        'Lambda and Kappa architectures — batch vs streaming tradeoffs'
      ]},
      { week: 'Module 4 — Data Governance, Security, and Platform Ops', topics: [
        'Data cataloging — Apache Atlas, DataHub, Amundsen',
        'Data quality — expectations, freshness, accuracy, and lineage',
        'Data security — encryption, column-level access, dynamic masking',
        'DataOps — CI/CD for data pipelines, testing, and monitoring'
      ]}
    ]
  },

  'real-time-data-processing': {
    description: 'Real-Time Data Processing — master stream processing architectures, event-driven systems, and real-time analytics. Covers Kafka, Flink, Spark Streaming, Kinesis, and stateful stream processing at scale.',
    syllabus: [
      { week: 'Module 1 — Stream Processing Foundations', topics: [
        'Stream vs batch processing — use cases, patterns, and tradeoffs',
        'Event-driven architecture — producers, consumers, brokers, topics',
        'Apache Kafka — brokers, topics, partitions, replication, consumer groups',
        'Message delivery semantics — at-most-once, at-least-once, exactly-once'
      ]},
      { week: 'Module 2 — Stream Processing Engines', topics: [
        'Apache Flink — DataStream API, event time, watermarks, windows',
        'Spark Structured Streaming — micro-batch, continuous processing',
        'Kafka Streams — stateful vs stateless operations, KTables, KStreams',
        'Kinesis Data Analytics and Data Streams — AWS streaming services'
      ]},
      { week: 'Module 3 — Stateful Stream Processing and Advanced Patterns', topics: [
        'State management — keyed state, operator state, state backends',
        'Windowing — tumbling, sliding, session windows; late data handling',
        'CEP — complex event processing, pattern matching',
        'Stream-Table joins, table-stream duality, and materialized views'
      ]},
      { week: 'Module 4 — Production Streaming and Real-Time Analytics', topics: [
        'Stream processing production — deployment, monitoring, auto-scaling',
        'Schema registry — Avro, Protobuf, schema evolution',
        'Real-time analytics — streaming SQL, interactive queries, serving layer',
        'End-to-end real-time pipeline — Kafka → Flink → Sink → Dashboard'
      ]}
    ]
  },

  'advanced-analytics-and-ml': {
    description: 'Advanced Analytics and Machine Learning — master statistical analysis, machine learning algorithms, and model deployment pipelines. Covers descriptive and inferential statistics, supervised and unsupervised learning, deep learning, and production ML.',
    syllabus: [
      { week: 'Module 1 — Statistical Foundations and EDA', topics: [
        'Descriptive statistics — distributions, central tendency, dispersion, skewness',
        'Inferential statistics — confidence intervals, hypothesis testing, p-values',
        'Data visualization — exploratory analysis, outlier detection, pattern discovery',
        'Probability theory — Bayes theorem, random variables, PDF/CDF, MLE/MAP'
      ]},
      { week: 'Module 2 — Supervised and Unsupervised Learning', topics: [
        'Linear/logistic regression — assumptions, regularization (L1/L2), evaluation',
        'Decision trees, Random Forest, Gradient Boosting (XGBoost, LightGBM)',
        'Support Vector Machines, K-Nearest Neighbors, Naive Bayes',
        'Clustering — K-Means, DBSCAN, hierarchical clustering; PCA for dimensionality reduction'
      ]},
      { week: 'Module 3 — Advanced ML and Deep Learning', topics: [
        'Neural networks — architecture, backpropagation, activation functions',
        'CNNs — image classification, object detection, transfer learning',
        'RNNs, LSTMs, Transformers — sequence models, attention mechanism',
        'NLP — tokenization, embeddings, BERT, GPT basics'
      ]},
      { week: 'Module 4 — MLOps and Model Production', topics: [
        'Feature engineering — encoding, scaling, feature selection, extraction',
        'Model evaluation — cross-validation, ROC/AUC, precision-recall, confusion matrix',
        'MLOps — experiment tracking (MLflow), model registry, deployment pipelines',
        'Model monitoring — drift detection, retraining, A/B testing, governance'
      ]}
    ]
  },

  'big-data-ai-integration': {
    description: 'Big Data AI Integration — combine big data platforms with AI/ML. Covers distributed ML with Spark MLlib, Dask, Ray, and large-scale data processing for AI workloads at enterprise scale.',
    syllabus: [
      { week: 'Module 1 — Distributed Computing for AI/ML', topics: [
        'Spark MLlib — distributed ML algorithms, pipelines, feature transformers',
        'Dask — parallel computing in Python, scaling NumPy/Pandas',
        'Ray — distributed AI framework, RLlib, Serve, and Tune',
        'GPU-accelerated ML — CUDA, RAPIDS, distributed training'
      ]},
      { week: 'Module 2 — Feature Engineering at Scale', topics: [
        'Feature stores — Feast, Tecton, SageMaker Feature Store',
        'Feature engineering on big data — window functions, aggregations, joins',
        'Streaming feature computation — real-time feature pipelines',
        'Feature serving — online vs offline, consistency, and latency'
      ]},
      { week: 'Module 3 — Large-Scale Model Training and Serving', topics: [
        'Distributed training — data parallelism, model parallelism, parameter servers',
        'Hyperparameter tuning at scale — Bayesian optimization, random search',
        'Model serving — TensorFlow Serving, TorchServe, Triton Inference Server',
        'Batch inference — scheduled and event-triggered predictions'
      ]},
      { week: 'Module 4 — Data Pipelines for AI and Integration', topics: [
        'Data Lakehouse for AI — Delta Lake, Iceberg, Hudi',
        'Orchestrating ML pipelines — Kubeflow, MLflow Pipelines, Airflow',
        'Monitoring and observability — data drift, model decay, concept drift',
        'End-to-end AI platform — data → feature → train → serve → monitor → retrain'
      ]}
    ]
  },

  // ═══════════════════════════════════════════════════
  // TEST AUTOMATION & AI IN TESTING
  // ═══════════════════════════════════════════════════

  'test-automation-framework-design': {
    description: 'Test Automation Framework Design — build scalable, maintainable test automation frameworks. Covers framework architecture, design patterns, API and UI testing, CI/CD integration, and reporting for web, mobile, and API test automation.',
    syllabus: [
      { week: 'Module 1 — Test Automation Strategy and Architecture', topics: [
        'Test automation strategy — ROI, tool selection, scope, and planning',
        'Framework types — linear, modular, data-driven, keyword-driven, hybrid',
        'Design patterns — Page Object Model, Factory, Singleton, Strategy',
        'Multi-layer test architecture — test data, test logic, reporting, CI'
      ]},
      { week: 'Module 2 — Web and API Automation', topics: [
        'Selenium WebDriver — locators, waits, page objects, browser configuration',
        'Cypress and Playwright — modern tooling, assertions, network interception',
        'REST API testing — REST Assured, Postman, request/response validation',
        'GraphQL testing, contract testing with Pact, and API mocking'
      ]},
      { week: 'Module 3 — Mobile, Performance, and Secure Testing', topics: [
        'Mobile automation — Appium, device clouds, Android/iOS specifics',
        'Performance testing — JMeter, Gatling, k6 for load, stress, endurance',
        'Security testing automation — OWASP ZAP, Burp Suite integration',
        'Visual testing — Percy, Applitools — AI-powered visual validation'
      ]},
      { week: 'Module 4 — CI/CD Integration, Reporting, and Maintenance', topics: [
        'CI/CD integration — Jenkins pipelines, GitHub Actions, GitLab CI',
        'Parallel execution — Selenium Grid, cloud providers, Docker Compose',
        'Reporting — Allure, Extent Reports, TestNG/ JUnit reports',
        'Test maintenance — flaky test management, retries, and code quality'
      ]}
    ]
  },

  'ai-in-testing': {
    description: 'AI in Testing — leverage AI and ML for intelligent test automation, self-healing tests, visual testing, test generation, and predictive analytics. Covers AI fundamentals applied to the full testing lifecycle.',
    syllabus: [
      { week: 'Module 1 — AI/ML Fundamentals for Testers', topics: [
        'ML basics — supervised, unsupervised, reinforcement learning',
        'Key concepts — features, labels, training, validation, test sets',
        'ML models for testing — classification, anomaly detection, clustering',
        'Data preparation for AI-driven testing'
      ]},
      { week: 'Module 2 — AI-Powered Test Automation', topics: [
        'Self-healing tests — intelligent locators, dynamic element identification',
        'AI-driven test generation — model-based testing, behavior-driven testing',
        'Visual AI testing — screenshot comparison, DOM analysis, layout testing',
        'Natural language test creation — NLG, chatbot testing automation'
      ]},
      { week: 'Module 3 — Predictive Analytics in Testing', topics: [
        'Defect prediction — identifying high-risk areas using ML models',
        'Test prioritization — risk-based testing using historical data',
        'Test optimization — minimizing test suites while maximizing coverage',
        'Anomaly detection in test results — flaky test identification'
      ]},
      { week: 'Module 4 — Implementing AI Testing and Ethics', topics: [
        'Building AI testing frameworks — tools, libraries, and integrations',
        'Testing AI/ML models — data quality, bias detection, fairness, explainability',
        'AI testing maturity model — assessment and roadmap',
        'Ethical considerations — transparency, accountability, and governance'
      ]}
    ]
  }
}

// ===== APPLY UPDATES =====
let count = 0
const warnings = []
courses.forEach((course, idx) => {
  const slug = course.slug
  const data = curricula[slug]
  if (data) {
    if (data.description) course.description = data.description
    if (data.syllabus) course.syllabus = data.syllabus
    count++
  } else {
    warnings.push(`No curriculum defined for: ${slug}`)
  }
})

fs.writeFileSync(coursesPath, JSON.stringify(courses, null, 2), 'utf8')
console.log(`✅ Updated: ${count}/${courses.length} courses`)

// Update summary/description fields for courses missing description but having curriculum
// Also update the summary to be more specific
const summaryMap = {}
Object.entries(curricula).forEach(([slug, data]) => {
  if (data.syllabus) {
    const course = courses.find(c => c.slug === slug)
    // summaryMap[slug] = ... (leave summaries as-is since they're already set)
  }
})

console.log(`\nCourses not updated (${warnings.length}):`)
warnings.forEach(w => console.log(`  ⚠️  ${w}`))
