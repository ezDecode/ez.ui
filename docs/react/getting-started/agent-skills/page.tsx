import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Skills',
  description: 'Enable AI assistants to build UIs with ez.ui components',
}

export default function AgentSkillsPage() {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <p className="text-sm font-medium text-foreground-muted">React</p>
        <h1 className="text-2xl font-semibold text-foreground">Agent Skills</h1>
        <p className="text-foreground-secondary">
          Enable AI assistants to build UIs with ez.ui v1 components.
        </p>
      </header>

      <div className="h-px bg-border" />

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-medium text-foreground">Installation</h2>
        <pre className="p-4 rounded-lg bg-[oklch(31.4%_0_0/60%)] text-sm font-mono text-foreground overflow-x-auto">
          {`npx skills add ezdecode/ez.ui`}
        </pre>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-medium text-foreground">Usage</h2>
        <p className="text-foreground-secondary">
          Skills are automatically discovered by your AI assistant, or call it directly using the <code className="px-1.5 py-0.5 rounded bg-[oklch(31.4%_0_0/60%)] font-mono text-sm">/ez-ui</code> command.
        </p>
        <p className="text-foreground-secondary">
          Simply ask your AI assistant to:
        </p>
        <ul className="flex flex-col gap-2 pl-6 list-disc text-foreground-secondary">
          <li>Build components using ez.ui v1</li>
          <li>Create pages with ez.ui components</li>
          <li>Customize themes and styles</li>
          <li>Access component documentation</li>
        </ul>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-medium text-foreground">What&apos;s Included</h2>
        <ul className="flex flex-col gap-2 pl-6 list-disc text-foreground-secondary">
          <li>ez.ui v1 installation guide</li>
          <li>All ez.ui v1 components with props, examples, and usage patterns</li>
          <li>Theming and styling guidelines</li>
          <li>Design principles and composition patterns</li>
        </ul>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-medium text-foreground">Structure</h2>
        <pre className="p-4 rounded-lg bg-[oklch(31.4%_0_0/60%)] text-sm font-mono text-foreground overflow-x-auto">
          {`skills/ez-ui/
├── SKILL.md              # Main skill documentation
├── LICENSE.txt           # MIT license
└── scripts/              # Utility scripts
    ├── list_components.mjs
    ├── get_component_docs.mjs
    └── get_source.mjs`}
        </pre>
      </section>
    </article>
  )
}
