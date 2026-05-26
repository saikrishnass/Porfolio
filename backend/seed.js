const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load models
const Admin = require('./models/Admin');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Education = require('./models/Education');

// Load env vars
dotenv.config();

const skillsData = [
  // Frontend
  { name: 'HTML5', category: 'Frontend' },
  { name: 'CSS3', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: '.NET MAUI', category: 'Frontend' },
  { name: 'Responsive UI Design', category: 'Frontend' },
  { name: 'Angular Material', category: 'Frontend' },

  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'Django', category: 'Backend' },
  { name: '.NET Web API (.NET 6/7)', category: 'Backend' },
  { name: 'REST API Development', category: 'Backend' },
  { name: 'JWT Authentication', category: 'Backend' },
  { name: 'OAuth/Auth0 Integration', category: 'Backend' },
  { name: 'WebSockets / Real-Time Communication', category: 'Backend' },

  // Database
  { name: 'SQL Server', category: 'Database' },
  { name: 'SQLite', category: 'Database' },
  { name: 'Database Design', category: 'Database' },
  { name: 'Windows Authentication Integration', category: 'Database' },
  { name: 'Vector Embeddings & RAG Systems', category: 'Database' },

  // AI / Tools
  { name: 'AI Model Training', category: 'AI / Tools' },
  { name: 'Retrieval-Augmented Generation (RAG)', category: 'AI / Tools' },
  { name: 'OpenAI API Integration', category: 'AI / Tools' },
  { name: 'AI Comment Generation Systems', category: 'AI / Tools' },
  { name: 'n8n Automation', category: 'AI / Tools' },
  { name: 'Make (Integromat) Automation', category: 'AI / Tools' },
  { name: 'Git & GitHub', category: 'AI / Tools' },
  { name: 'API Integration', category: 'AI / Tools' },
  { name: 'Workflow Automation', category: 'AI / Tools' },
  { name: 'Prompt Engineering', category: 'AI / Tools' },


  // Core Areas
  { name: 'MERN Stack Development', category: 'Core Areas' },
  { name: 'MEAN Stack Development', category: 'Core Areas' },
  { name: 'Full-Stack Development', category: 'Core Areas' },
  { name: 'AI-Powered Applications', category: 'Core Areas' },
  { name: 'Secure & Encrypted Communication Systems', category: 'Core Areas' },
  { name: 'Real-World Application Development', category: 'Core Areas' }
];

const projectsData = [
  {
    title: 'SynapSocial',
    description: 'A premium campaign management and visual social analytics platform built to orchestrate, analyze, and optimize digital marketing presence.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Social Analytics'],
    githubLink: 'https://github.com/Akhila-Bijja/vnps-copy',
    liveLink: 'https://vnps-copy.vercel.app/',
    image: '/synapsocial.png'
  }
];

const experienceData = [
  {
    role: 'MERN Stack Developer',
    company: 'Kiruvar Technology',
    duration: '2026 - Present',
    description: 'Designed and engineered premium full-stack architectures, custom MERN/MEAN stack web applications, real-time dashboards, and workflow automation. Collaborated heavily with product designers to implement pixel-perfect user interfaces and integrated high-performance AI engines.',
    orderIndex: 0
  }
];

const educationData = [
  {
    degree: 'Bachelor of Technology in Information Technology',
    institution: 'University of Technology',
    duration: '2021 - 2025',
    description: 'Focusing on advanced algorithms, software architecture, and artificial intelligence. Consistently maintaining a high GPA and leading the technology club.',
    orderIndex: 0
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
    console.log(`Connecting to database: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    // Clear existing data
    console.log('Clearing existing database collections...');
    await Admin.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Education.deleteMany({});

    // Create Admin User
    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPass = process.env.ADMIN_PASS || 'admin12345';
    console.log(`Creating Admin user: ${adminUser}`);
    await Admin.create({
      username: adminUser,
      password: adminPass
    });

    // Seed data
    console.log('Seeding portfolio data...');
    await Skill.insertMany(skillsData);
    await Project.insertMany(projectsData);
    await Experience.insertMany(experienceData);
    await Education.insertMany(educationData);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
