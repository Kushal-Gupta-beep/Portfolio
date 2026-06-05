import { Router, Request, Response } from 'express'
import { supabase } from '../db/supabase.js'
import { adminAuth } from '../middleware/auth.js'

const router = Router()

// Fallback data when Supabase is not configured
const fallbackProjects = [
  {
    id: 1,
    number: '01',
    name: 'MediChat LLM',
    category: 'AI / Hackathon',
    description: 'Built in 48 hours at Microsoft\'s MS Hackathon — a multimodal RAG chatbot combining Llama 2 and GPT-4o Vision for context-aware medical consultations with image understanding.',
    tags: ['Llama 2', 'RAG', 'GPT-4o Vision', 'Pinecone', 'Python', 'Hackathon'],
    stats: [
      { value: '48 HRS', label: 'Built In' },
      { value: '3', label: 'Models Used' },
      { value: '1ST', label: 'Place Hackathon' },
    ],
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 30%, #2d1b69 60%, #11998e 100%)',
    repoUrl: 'https://github.com/Kushal-Gupta-beep/MediChat-LLM',
  },
  {
    id: 2,
    number: '02',
    name: 'Mental Health Analysis',
    category: 'Machine Learning',
    description: 'ML classifier trained on 50+ student records to identify at-risk individuals based on CGPA and behavioral patterns — achieving 75% prediction accuracy across three model types.',
    tags: ['Scikit-learn', 'Logistic Regression', 'SVM', 'Decision Tree', 'Pandas', 'NumPy'],
    stats: [
      { value: '50+', label: 'Records' },
      { value: '75%', label: 'Accuracy' },
      { value: '3', label: 'ML Models' },
    ],
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)',
  },
  {
    id: 3,
    number: '03',
    name: 'ShowHUB',
    category: 'Full-Stack / DBMS',
    description: 'Full cinema management ecosystem built with MERN stack and MySQL — complete with stored procedures, triggers, showtime management, and revenue analytics dashboards.',
    tags: ['ReactJS', 'NodeJS', 'ExpressJS', 'MySQL', 'Stored Procs', 'MERN'],
    stats: [
      { value: '10+', label: 'Features' },
      { value: '5', label: 'Stored Procs' },
      { value: '3', label: 'Dev Weeks' },
    ],
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 30%, #2d0a1a 60%, #8b1a4a 100%)',
    repoUrl: 'https://github.com/Kushal-Gupta-beep/ShowHUB',
  },
  {
    id: 4,
    number: '04',
    name: 'Red Letter',
    category: 'Web3 / Hackathon',
    description: 'A Web3 gifting platform enabling secure ETH transfers with personalized messages — leveraging blockchain for transparent, global transactions. Earned Honorable Mention at Unfold 2023, India\'s second largest Web3 Hackathon.',
    tags: ['Next.js', 'Wagmi.js', 'Blockchain', 'Solidity', 'Web3'],
    stats: [
      { value: 'TOP 10', label: 'Unfold 2023' },
      { value: '100%', label: 'On-Chain' },
      { value: 'ETH', label: 'Transfers' },
    ],
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1005 30%, #3d2800 60%, #b8860b 100%)',
  },
  {
    id: 5,
    number: '05',
    name: 'CommitIQ',
    category: 'AI / NLP',
    description: 'An intelligent commit analysis system that evaluates GitHub commit histories using NLP pipelines — classifying commits by purpose and impact, generating repository-level metrics, and providing automated scoring to track development trends and code quality.',
    tags: ['Python', 'Machine Learning', 'NLP', 'GitHub API', 'Data Viz'],
    stats: [
      { value: 'AI', label: 'Scoring' },
      { value: 'NLP', label: 'Pipeline' },
      { value: '4', label: 'Key Metrics' },
    ],
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #0a1a0a 30%, #0a2d1a 60%, #1a8b4a 100%)',
    liveUrl: 'https://commit-iq-commit-analyser.vercel.app',
    repoUrl: 'https://github.com/Kushal-Gupta-beep/CommitIQ-Commit-Analyser-',
  },
  {
    id: 6,
    number: '06',
    name: 'VoiceShop',
    category: 'AI / Full-Stack',
    description: 'A voice-driven shopping assistant that enables users to search, compare, and purchase products using natural language conversations — powered by speech-to-text, NLP pipelines, and an AI recommendation engine for personalized suggestions.',
    tags: ['Python', 'NLP', 'Speech Recognition', 'LLMs', 'ReactJS'],
    stats: [
      { value: 'VOICE', label: 'Driven' },
      { value: 'AI', label: 'Recommendations' },
      { value: 'NLP', label: 'Engine' },
    ],
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 30%, #3d1b69 60%, #6b21a8 100%)',
    liveUrl: 'https://voiceshop.onrender.com',
    repoUrl: 'https://github.com/Kushal-Gupta-beep/VoiceShop',
  },
]

// GET all projects
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    if (!supabase) {
      res.json(fallbackProjects)
      return
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('number', { ascending: true })

    if (error) {
      console.error('Error fetching projects:', error.message)
      res.json(fallbackProjects)
      return
    }

    res.json(data && data.length > 0 ? data : fallbackProjects)
  } catch (err) {
    console.error('Projects error:', err)
    res.json(fallbackProjects)
  }
})

// POST new project (admin only)
router.post('/', adminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    if (!supabase) {
      res.status(503).json({ error: 'Database not configured' })
      return
    }

    const { number, name, category, description, tags, stats, gradient } = req.body
    const { data, error } = await supabase
      .from('projects')
      .insert({ number, name, category, description, tags, stats, gradient })
      .select()
      .single()

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    res.status(201).json(data)
  } catch (err) {
    console.error('Create project error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// PUT update project (admin only)
router.put('/:id', adminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    if (!supabase) {
      res.status(503).json({ error: 'Database not configured' })
      return
    }

    const { id } = req.params
    const updates = req.body

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    res.json(data)
  } catch (err) {
    console.error('Update project error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// DELETE project (admin only)
router.delete('/:id', adminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    if (!supabase) {
      res.status(503).json({ error: 'Database not configured' })
      return
    }

    const { id } = req.params
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    res.status(204).send()
  } catch (err) {
    console.error('Delete project error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
