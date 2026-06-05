import React from 'react'
import FadeIn from './FadeIn'

const experiences = [
  {
    title: 'Data Analyst Intern',
    company: 'Next Bharat Ventures',
    date: '07/2025 - 12/2025',
    points: [
      'Built end-to-end data and ML pipelines using Python and SQL to preprocess unstructured datasets, engineer features, and rank entities, reducing manual evaluation effort.',
      'Designed and evaluated ML classification and scoring models, optimizing feature selection and model performance to identify high-signal cases for further analysis.',
      'Optimized data schemas and SQL queries to improve pipeline reliability and execution efficiency, enabling scalable analysis across multiple datasets.'
    ],
    skills: 'Data Analysis, SQL, Python, Data Pipelines, Feature Engineering, Model Evaluation, Exploratory Data Analysis (EDA)'
  },
  {
    title: 'Software Development Intern',
    company: 'Multigraphics Group',
    date: '05/2024 - 07/2024',
    points: [
      'Enhanced UI/UX and backend systems for D2M360 and JR Classes websites.',
      'Boosted site engagement and traffic by 15% through design and performance optimizations.'
    ],
    skills: 'Frontend Development, Backend Development, Full-Stack Web Development, Web Performance Optimization, Version Control, Debugging & Testing'
  }
]

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 bg-[#0C0C0C]">
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col gap-10 sm:gap-14">
        {experiences.map((exp, i) => (
          <FadeIn key={i} delay={0.2} y={30}>
            <div className="bg-[#111111] border border-[#D7E2EA]/10 rounded-[32px] p-6 sm:p-10 md:p-12 hover:border-[#D7E2EA]/30 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6 sm:mb-8 gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{exp.title}</h3>
                  <p className="text-lg text-[#D7E2EA]/70 italic font-serif tracking-wide">{exp.company}</p>
                </div>
                <div className="text-[#D7E2EA]/50 uppercase tracking-widest text-sm font-medium shrink-0">
                  {exp.date}
                </div>
              </div>

              <ul className="list-disc list-outside ml-5 space-y-4 text-[#D7E2EA]/80 leading-relaxed font-light mb-8" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>
                {exp.points.map((point, pi) => (
                  <li key={pi} className="pl-2">{point}</li>
                ))}
              </ul>

              <div className="border-t border-[#D7E2EA]/10 pt-6 mt-6">
                <span className="text-white font-semibold tracking-wider text-sm uppercase mr-3">Skills Learned:</span>
                <span className="text-[#D7E2EA]/60 text-sm leading-relaxed">{exp.skills}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

export default ExperienceSection
