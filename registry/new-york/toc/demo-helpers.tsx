import React from 'react'

export const TOC_ITEMS = [
  { id: 'introducing-agent-readiness', label: 'Introducing Agent Readiness', level: 1 },
  { id: 'the-invisible-bottleneck', label: 'The Invisible Bottleneck', level: 1 },
  { id: 'what-we-measure', label: 'What We Measure', level: 1 },
  { id: 'five-maturity-levels', label: 'Five Maturity Levels', level: 1 },
  { id: 'see-it-in-action', label: 'See It In Action', level: 1 },
  { id: 'how-to-use-it', label: 'How To Use It', level: 1 },
  { id: 'consistent-evaluations', label: 'Consistent Evaluations', level: 1 },
  { id: 'how-scoring-works', label: 'How Scoring Works', level: 1 },
  { id: 'automated-remediation', label: 'Automated Remediation', level: 1 },
  { id: 'the-compounding-effect', label: 'The Compounding Effect', level: 1 },
]

export function Section({
  id,
  title,
  level = 1,
  className,
  children,
}: {
  id: string
  title: string
  level?: 1 | 2
  className?: string
  children: React.ReactNode
}) {
  const Tag = level === 1 ? 'h2' : 'h3'
  const titleClass =
    level === 1
      ? 'text-2xl font-bold text-white mt-16 mb-6 first:mt-0'
      : 'text-xl font-semibold text-white/90 mt-10 mb-4'

  return (
    <section id={id} className={`scroll-mt-24 ${className || ''}`}>
      <Tag className={titleClass}>{title}</Tag>
      <div className="space-y-4 text-gray-400 leading-relaxed">{children}</div>
    </section>
  )
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-[#1a1a1d] border border-white/5 rounded-lg p-4 overflow-x-auto my-4">
      <code className="text-sm text-indigo-300" style={{ fontFamily: 'var(--font-mono)' }}>
        {code}
      </code>
    </pre>
  )
}
