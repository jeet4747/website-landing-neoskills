// PMP course researched content
export const pmpCourse = {
  slug: 'pmp',
  category: 'Project Management',
  title: 'PMP® Certification Training',
  fullTitle: 'Project Management Professional (PMP®) Certification',
  icon: 'Award',
  summary: 'Globally recognized credential for project managers, validating leadership and expertise in managing projects across industries.',
  description: `The PMP® certification is the gold standard for project management professionals. This program is designed to help you master the latest PMBOK® Guide, Agile practices, and real-world project delivery. Our course includes live instructor-led sessions, hands-on case studies, and exam preparation support.`,
  stats: {
    duration: '6 Weeks',
    nextBatch: '21-Jun-2026',
    level: 'Advanced',
    mode: 'Online',
    hours: '35+ Contact Hours',
    certificate: 'PMP® Certificate by PMI®',
    placement: '95% Placement Assistance',
  },
  highlights: [
    '35+ hours of live instructor-led training',
    'Aligned with the latest PMBOK® Guide & Agile',
    'Real-world case studies and group projects',
    'Exam application and audit support',
    'Lifetime access to course materials',
    '24/7 learner support and mentorship',
    'Mock tests and exam simulations',
    'Global alumni network',
  ],
  whoShouldJoin: [
    'Project Managers',
    'Team Leads',
    'Program Managers',
    'IT Managers',
    'Consultants',
    'Anyone aspiring for a career in project management',
  ],
  syllabus: [
    {
      week: 'Week 1',
      topics: [
        'Introduction to PMP® & PMI®',
        'Project Management Framework',
        'Project Environment',
        'Role of the Project Manager',
      ],
    },
    {
      week: 'Week 2',
      topics: [
        'Project Integration Management',
        'Project Scope Management',
        'Project Schedule Management',
      ],
    },
    {
      week: 'Week 3',
      topics: [
        'Project Cost Management',
        'Project Quality Management',
        'Project Resource Management',
      ],
    },
    {
      week: 'Week 4',
      topics: [
        'Project Communications Management',
        'Project Risk Management',
        'Project Procurement Management',
      ],
    },
    {
      week: 'Week 5',
      topics: [
        'Project Stakeholder Management',
        'Agile & Hybrid Approaches',
        'Professional & Social Responsibility',
      ],
    },
    {
      week: 'Week 6',
      topics: [
        'Exam Preparation',
        'Mock Tests',
        'Doubt Clearing & Revision',
      ],
    },
  ],
  certificate: {
    title: 'PMP® Certificate',
    description: 'Awarded by Project Management Institute (PMI®), recognized globally. Validates your ability to lead and direct projects.',
    image: '/images/nsl-logo.svg',
  },
  feeDetails: {
    training: 50000,
    exam: 42000,
    total: 92000,
    emi: 'EMI from ₹4,167/month',
    refund: '100% refund if not satisfied within 7 days',
    includes: [
      'Training materials',
      'Exam application support',
      'Mock tests',
      'Mentorship',
    ],
  },
  trainers: [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Lead Trainer',
      experience: '18+ years',
      certifications: 'PMP, CSM, PRINCE2',
      image: '/images/nsl-logo.svg',
      bio: 'Dr. Johnson is a PMI-certified instructor with 18+ years of experience in project management, consulting, and corporate training. She has mentored 2000+ PMP® certified professionals globally.'
    },
    {
      name: 'Michael Chen',
      role: 'Senior Instructor',
      experience: '15+ years',
      certifications: 'PMP, PMI-ACP',
      image: '/images/nsl-logo.svg',
      bio: 'Michael specializes in Agile and hybrid project delivery. He brings real-world insights from leading large-scale IT and construction projects.'
    }
  ],
  categorySlug: 'project-management',
};

// AWS course researched content
export const awsCourse = {
  slug: 'aws-cloud-practitioner',
  category: 'Cloud Computing',
  title: 'AWS Certified Cloud Practitioner',
  fullTitle: 'AWS Certified Cloud Practitioner (CLF-C02)',
  icon: 'Cloud',
  summary: 'Foundational AWS certification for cloud beginners, validating knowledge of AWS Cloud concepts, security, technology, and billing.',
  description: `This course prepares you for the AWS Certified Cloud Practitioner exam (CLF-C02). Learn AWS core services, security, architecture, pricing, and best practices through hands-on labs and real-world scenarios.`,
  stats: {
    duration: '4 Weeks',
    nextBatch: '10-Jul-2026',
    level: 'Beginner',
    mode: 'Online',
    hours: '20+ Contact Hours',
    certificate: 'AWS Certified Cloud Practitioner',
    placement: '90% Placement Assistance',
  },
  highlights: [
    '20+ hours of live instructor-led training',
    'Hands-on AWS labs and demos',
    'Exam-focused curriculum',
    'Cloud security and compliance',
    'Access to AWS Free Tier',
    'Career guidance and interview prep',
  ],
  whoShouldJoin: [
    'IT Freshers',
    'Non-IT professionals moving to cloud',
    'Sales/Marketing professionals in tech',
    'Anyone seeking AWS foundational knowledge',
  ],
  syllabus: [
    {
      week: 'Week 1',
      topics: [
        'Introduction to AWS Cloud',
        'AWS Global Infrastructure',
        'Core AWS Services Overview',
      ],
    },
    {
      week: 'Week 2',
      topics: [
        'AWS Security & Compliance',
        'Identity & Access Management (IAM)',
        'Cloud Billing & Pricing Models',
      ],
    },
    {
      week: 'Week 3',
      topics: [
        'AWS Compute, Storage, and Networking',
        'Hands-on Labs: EC2, S3, VPC',
        'Monitoring & Support',
      ],
    },
    {
      week: 'Week 4',
      topics: [
        'Exam Preparation',
        'Mock Tests',
        'Career Guidance',
      ],
    },
  ],
  certificate: {
    title: 'AWS Certified Cloud Practitioner',
    description: 'Issued by Amazon Web Services, this certificate validates your foundational knowledge of cloud concepts and AWS services.',
    image: '/images/nsl-logo.svg',
  },
  feeDetails: {
    training: 12000,
    exam: 7500,
    total: 19500,
    emi: 'EMI from ₹1,000/month',
    refund: '100% refund if not satisfied within 7 days',
    includes: [
      'Training materials',
      'AWS Free Tier access',
      'Mock tests',
      'Mentorship',
    ],
  },
  trainers: [
    {
      name: 'Priya Singh',
      role: 'AWS Authorized Instructor',
      experience: '10+ years',
      certifications: 'AWS Solutions Architect, AWS Cloud Practitioner',
      image: '/images/nsl-logo.svg',
      bio: 'Priya is an AWS Authorized Instructor with a decade of experience in cloud training and consulting. She has helped 1000+ students launch their cloud careers.'
    }
  ],
  categorySlug: 'cloud-computing',
};

export const courseCategories = [
  { slug: 'project-management', name: 'Project Management' },
  { slug: 'cloud-computing', name: 'Cloud Computing' },
];

export const allCourses = [pmpCourse, awsCourse];
