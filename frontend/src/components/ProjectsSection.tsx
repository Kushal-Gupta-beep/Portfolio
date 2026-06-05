import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeIn from './FadeIn'
import LiveProjectButton from './LiveProjectButton'
import { fallbackProjects, type ProjectData } from '../data/projects'


interface ProjectCardProps {
  project: ProjectData
  index: number
  total: number
  range: [number, number]
  targetScale: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  targetScale,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={cardRef} className="h-[85vh] sticky top-24 md:top-28" style={{ paddingTop: `${index * 10}px` }}>
      <motion.div
        style={{ scale }}
        className="rounded-[30px] sm:rounded-[40px] md:rounded-[48px]
          border-2 border-[#D7E2EA] bg-[#0C0C0C]
          p-4 sm:p-5 md:p-6 h-full flex flex-col origin-top overflow-hidden"
      >
        {/* Top row */}
        <div className="flex justify-between items-start shrink-0">
          <div>
            <span
              className="hero-heading font-black block"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 90px)', lineHeight: 1 }}
            >
              {project.number}
            </span>
            <span className="uppercase tracking-widest text-xs text-[#D7E2EA] opacity-60">
              {project.category}
            </span>
            <h3
              className="font-black uppercase text-[#D7E2EA] mt-1"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)' }}
            >
              {project.name}
            </h3>
          </div>
          {(project.liveUrl || project.repoUrl) && (
            <LiveProjectButton 
              href={project.liveUrl || project.repoUrl || '#'} 
              label={project.repoUrl && !project.liveUrl ? 'GitHub Repo' : 'Live Project'} 
            />
          )}
        </div>

        {/* Bottom content */}
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-3 mt-3 flex-1 min-h-0">
          {/* Left — Gradient panel */}
          <div
            className="gradient-animate rounded-[20px] sm:rounded-[28px] md:rounded-[36px]
              flex flex-col items-center justify-center overflow-hidden
              py-6 md:py-8"
            style={{
              background: project.gradient,
              backgroundSize: '200% 200%',
            }}
          >
            {project.stats.map((stat, si) => (
              <div key={si} className="text-center mb-2 sm:mb-3 last:mb-0">
                <span
                  className="font-black text-white opacity-90 block leading-none"
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
                >
                  {stat.value}
                </span>
                <span className="font-light uppercase tracking-widest text-[10px] text-[#D7E2EA] opacity-50 mt-0.5 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Right — Info panel */}
          <FadeIn delay={0.2} y={20} className="h-full min-h-0">
            <div
              className="bg-[#111111] rounded-[20px] sm:rounded-[28px] md:rounded-[36px]
                p-4 sm:p-5 md:p-6 flex flex-col justify-between h-full gap-3"
            >
              <p
                className="text-[#D7E2EA] font-light leading-relaxed opacity-80"
                style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/5
                      px-2.5 py-0.5 text-[#D7E2EA] text-[10px] uppercase tracking-wider font-light
                      hover:border-[#D7E2EA]/50 hover:bg-[#D7E2EA]/10 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {(project.liveUrl || project.repoUrl) && (
                <div className="border-t border-[#D7E2EA]/10 pt-3 mt-auto">
                  <a
                    href={project.liveUrl || project.repoUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D7E2EA] opacity-40 hover:opacity-100 transition-opacity
                      font-light uppercase tracking-widest text-xs"
                  >
                    {project.repoUrl && !project.liveUrl ? 'View Source →' : 'View Project →'}
                  </a>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </motion.div>
    </div>
  )
}

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>(fallbackProjects)

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('API error')
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data)
      })
      .catch(() => {
        // Use fallback data — already set
      })
  }, [])

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        -mt-10 sm:-mt-12 md:-mt-14 relative z-10
        px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      {projects.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={i}
          total={projects.length}
          range={[i * (1 / projects.length), 1]}
          targetScale={1 - (projects.length - 1 - i) * 0.03}
        />
      ))}
    </section>
  )
}

export default ProjectsSection
