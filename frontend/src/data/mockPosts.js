export const mockPostsByDomain = {
  'full-stack': [
    {
      id: 'fs-1',
      authorId: 'm1',
      author: 'Priya Sharma',
      authorEmail: 'priya@example.com',
      title: 'Best resources to learn Node.js?',
      content:
        'Looking for structured resources (courses, books, or project ideas) to go deeper into backend Node.js beyond basics.',
      timestamp: '2h ago'
    },
    {
      id: 'fs-2',
      authorId: 'm2',
      author: 'James Lee',
      authorEmail: 'james@example.com',
      title: 'How do you structure larger React apps?',
      content:
        'Curious about folder structures and patterns that scale well as the codebase grows.',
      timestamp: '4h ago'
    }
  ],
  'data-science': [
    {
      id: 'ds-1',
      authorId: 'm4',
      author: 'Maria Gomez',
      authorEmail: 'maria@example.com',
      title: 'Transitioning from Excel to Python',
      content:
        'Tips or pitfalls when moving reporting workflows from Excel to pandas + Jupyter?',
      timestamp: '1d ago'
    }
  ],
  devops: [
    {
      id: 'devops-1',
      authorId: 'm6',
      author: 'Alex Kim',
      authorEmail: 'alex@example.com',
      title: 'Kubernetes local dev best practices',
      content:
        'What tooling do you use to keep local clusters lightweight but realistic?',
      timestamp: '3d ago'
    }
  ]
};

export const mockMembersByDomain = {
  'full-stack': [
    { id: 'm1', name: 'Priya Sharma', role: 'Full Stack Developer', about: 'Building scalable web apps with React & Node. Love open source.' },
    { id: 'm2', name: 'James Lee', role: 'Frontend Lead', about: 'Design systems and component-driven UIs. TypeScript enthusiast.' },
    { id: 'm3', name: 'Sam Chen', role: 'Backend Engineer', about: 'APIs, databases, and system design. Go and Java.' }
  ],
  'data-science': [
    { id: 'm4', name: 'Maria Gomez', role: 'Data Scientist', about: 'ML in production. Python, pandas, and storytelling with data.' },
    { id: 'm5', name: 'David Park', role: 'ML Engineer', about: 'From research to deployment. TensorFlow and MLOps.' }
  ],
  devops: [
    { id: 'm6', name: 'Alex Kim', role: 'DevOps Engineer', about: 'CI/CD, Kubernetes, and making releases boring.' },
    { id: 'm7', name: 'Jordan Taylor', role: 'SRE', about: 'Reliability, observability, and on-call stories.' }
  ],
  cybersecurity: [
    { id: 'm8', name: 'Riley Moore', role: 'Security Engineer', about: 'AppSec and cloud security. Red team curiosity.' }
  ],
  'ui-ux': [
    { id: 'm9', name: 'Casey Brown', role: 'UX Designer', about: 'User research and inclusive design. Figma daily.' }
  ],
  'cloud-engineering': [{ id: 'm10', name: 'Morgan Bell', role: 'Cloud Architect', about: 'AWS & GCP. Architecture reviews and cost optimization.' }],
  'ai-ml': [{ id: 'm11', name: 'Jordan Lee', role: 'ML Engineer', about: 'NLP and recommendation systems.' }],
  'mobile-development': [{ id: 'm12', name: 'Taylor Green', role: 'Mobile Developer', about: 'iOS and Android. React Native and Swift.' }]
};

