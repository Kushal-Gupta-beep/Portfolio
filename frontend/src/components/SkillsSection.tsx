import React from 'react'
import FadeIn from './FadeIn'

const skills = [
  {
    number: '01',
    name: 'Machine Learning',
    description:
      'Building and evaluating classification models, RAG pipelines, and LLM integrations using PyTorch, TensorFlow, Scikit-learn, and Llama 2.',
  },
  {
    number: '02',
    name: 'Data Engineering',
    description:
      'End-to-end data pipelines with Python and SQL — preprocessing, feature engineering, schema optimization, and scalable EDA.',
  },
  {
    number: '03',
    name: 'Full-Stack Development',
    description:
      'Designing and shipping web apps with ReactJS, NodeJS, ExpressJS, MySQL, and Next.js, from UI to backend logic.',
  },
  {
    number: '04',
    name: 'AI & LLM Systems',
    description:
      'Multimodal chatbot architectures, vector search with Pinecone, and prompt-driven systems built on GPT-4o and open-source models.',
  },
  {
    number: '05',
    name: 'Blockchain & Web3',
    description:
      'Smart contract development in Solidity, ETH transfer platforms, and dApp frontends using Wagmi.js — with a hackathon Honorable Mention at Unfold 2023.',
  },
]

const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Skills
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {skills.map((skill, i) => (
          <FadeIn key={skill.number} delay={i * 0.1} y={30}>
            <div
              className={`flex items-start gap-6 sm:gap-8 md:gap-12
                py-8 sm:py-10 md:py-12
                ${i < skills.length - 1 ? 'border-b' : ''}`}
              style={{ borderColor: 'rgba(12, 12, 12, 0.15)' }}
            >
              <span
                className="font-black text-[#0C0C0C] shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {skill.number}
              </span>
              <div className="pt-2 sm:pt-4 md:pt-6">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {skill.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60 mt-2"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {skill.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection
