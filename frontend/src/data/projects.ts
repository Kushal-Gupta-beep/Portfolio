export interface ProjectData {
  id: number
  number: string
  name: string
  category: string
  description: string
  highlights?: string[]
  tags: string[]
  stats: { value: string; label: string }[]
  gradient: string
  repoUrl?: string
  liveUrl?: string
}

export const fallbackProjects: ProjectData[] = [
  {
    id: 1,
    number: '01',
    name: 'MediChat LLM',
    category: 'AI / Hackathon',
    description:
      'Built in 48 hours at Microsoft\'s MS Hackathon — a multimodal RAG chatbot combining Llama 2 and GPT-4o Vision for context-aware medical consultations with image understanding.',
    highlights: [
      'Engineered a multimodal RAG chatbot integrating Llama 2 for text-based Q&A and GPT-4o Vision for medical image analysis',
      'Built a real-time retrieval pipeline using Pinecone vector DB for context-aware medical consultations',
      'Developed an intuitive chat interface with support for image uploads and streaming responses',
      'Secured 2nd Runner Up position at Microsoft\'s MS Hackathon among 50+ competing teams',
    ],
    tags: ['Llama 2', 'RAG', 'GPT-4o Vision', 'Pinecone', 'Python', 'Hackathon'],
    stats: [
      { value: '48 HRS', label: 'Built In' },
      { value: '3', label: 'Models Used' },
      { value: '2ND', label: 'Runner Up' },
    ],
    gradient:
      'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 30%, #2d1b69 60%, #11998e 100%)',
    repoUrl: 'https://github.com/Kushal-Gupta-beep/MediChat-LLM.git',
  },
  {
    id: 2,
    number: '02',
    name: 'VoiceShop',
    category: 'AI / Full-Stack',
    description:
      'A voice-driven shopping assistant that enables users to search, compare, and purchase products using natural language conversations — powered by speech-to-text, NLP pipelines, and an AI recommendation engine.',
    highlights: [
      'Developed a voice-driven shopping assistant that enables users to search, compare, and purchase products using natural language conversations',
      'Integrated speech-to-text and NLP pipelines to accurately interpret user queries and extract shopping intent',
      'Built an AI-powered recommendation engine that provides personalized product suggestions based on user preferences and conversational context',
      'Designed a seamless conversational interface to improve accessibility and enhance the online shopping experience through voice interactions',
    ],
    tags: ['Python', 'NLP', 'Speech Recognition', 'LLMs', 'ReactJS'],
    stats: [
      { value: 'VOICE', label: 'Driven' },
      { value: 'AI', label: 'Recommendations' },
      { value: 'NLP', label: 'Engine' },
    ],
    gradient:
      'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 30%, #3d1b69 60%, #6b21a8 100%)',
    liveUrl: 'https://voiceshop.onrender.com',
    repoUrl: 'https://github.com/Kushal-Gupta-beep/VoiceShop',
  },
  {
    id: 3,
    number: '03',
    name: 'CommitIQ',
    category: 'AI / NLP',
    description:
      'An intelligent commit analysis system that evaluates GitHub commit histories using NLP pipelines — classifying commits by purpose and impact, generating repository-level metrics, and automated scoring.',
    highlights: [
      'Developed an intelligent commit analysis system that evaluates GitHub commit histories to assess code contribution patterns and developer productivity',
      'Built NLP-based pipelines to process commit messages, extract meaningful insights, and classify commits based on their purpose and impact',
      'Implemented data analysis and visualization features to generate repository-level metrics, helping teams track development trends and code quality indicators',
      'Designed automated scoring and reporting mechanisms to provide actionable feedback on coding practices and project contribution behavior',
    ],
    tags: ['Python', 'Machine Learning', 'NLP', 'GitHub API', 'Data Viz'],
    stats: [
      { value: 'AI', label: 'Scoring' },
      { value: 'NLP', label: 'Pipeline' },
      { value: '4', label: 'Key Metrics' },
    ],
    gradient:
      'linear-gradient(135deg, #0a0a0a 0%, #0a1a0a 30%, #0a2d1a 60%, #1a8b4a 100%)',
    liveUrl: 'https://commit-iq-commit-analyser.vercel.app',
    repoUrl: 'https://github.com/Kushal-Gupta-beep/CommitIQ-Commit-Analyser-',
  },
  {
    id: 4,
    number: '04',
    name: 'Red Letter',
    category: 'Web3 / Hackathon',
    description:
      'A Web3 gifting platform enabling secure ETH transfers with personalized messages — leveraging blockchain for transparent, global transactions.',
    highlights: [
      'Developed a Web3 gifting platform enabling secure ETH transfers with personalized messages on the Ethereum blockchain',
      'Leveraged blockchain for transparent, global transactions; earning Honorable Mention at Unfold 2023 (India\'s Second largest Web3 Hackathon)',
    ],
    tags: ['Next.js', 'Wagmi.js', 'Blockchain', 'Solidity', 'Web3'],
    stats: [
      { value: 'TOP 10', label: 'Unfold 2023' },
      { value: '100%', label: 'On-Chain' },
      { value: 'ETH', label: 'Transfers' },
    ],
    gradient:
      'linear-gradient(135deg, #0a0a0a 0%, #1a1005 30%, #3d2800 60%, #b8860b 100%)',
  },
  {
    id: 5,
    number: '05',
    name: 'ShowHUB',
    category: 'Full-Stack / DBMS',
    description:
      'Full cinema management ecosystem built with MERN stack and MySQL — complete with stored procedures, triggers, showtime management, and revenue analytics dashboards.',
    highlights: [
      'Built a full cinema management ecosystem with MERN stack and MySQL featuring complete CRUD operations for movies, theaters, and showtimes',
      'Implemented 5+ stored procedures and triggers for automated seat management, pricing, and revenue calculations',
      'Designed an admin analytics dashboard displaying real-time revenue, occupancy rates, and showtime performance metrics',
      'Developed a responsive booking interface with seat selection, dynamic pricing, and payment confirmation flow',
    ],
    tags: ['ReactJS', 'NodeJS', 'ExpressJS', 'MySQL', 'Stored Procs', 'MERN'],
    stats: [
      { value: '10+', label: 'Features' },
      { value: '5', label: 'Stored Procs' },
      { value: '3', label: 'Dev Weeks' },
    ],
    gradient:
      'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 30%, #2d0a1a 60%, #8b1a4a 100%)',
    repoUrl: 'https://github.com/Kushal-Gupta-beep/ShowHUB',
  },
  {
    id: 6,
    number: '06',
    name: 'Mental Health Analysis',
    category: 'Machine Learning',
    description:
      'ML classifier trained on 50+ student records to identify at-risk individuals based on CGPA and behavioral patterns — achieving 75% prediction accuracy across three model types.',
    highlights: [
      'Trained and evaluated three ML models (Logistic Regression, SVM, Decision Tree) on 50+ student records to predict mental health risk',
      'Engineered features from CGPA patterns and behavioral survey data to identify at-risk individuals with 75% accuracy',
      'Performed comparative model analysis with cross-validation to determine optimal classification approach',
    ],
    tags: ['Scikit-learn', 'Logistic Regression', 'SVM', 'Decision Tree', 'Pandas', 'NumPy'],
    stats: [
      { value: '50+', label: 'Records' },
      { value: '75%', label: 'Accuracy' },
      { value: '3', label: 'ML Models' },
    ],
    gradient:
      'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)',
  },
]
