# ez.ui — Component Library & CLI Tool Plan

> **Status:** Research Complete — Awaiting Implementation  
> **Date:** 2026-03-23  
> **Version:** 1.0.0

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current Project Analysis](#current-project-analysis)
3. [Architecture Decisions](#architecture-decisions)
4. [Directory Structure](#directory-structure)
5. [Component Package Specification](#component-package-specification)
6. [CLI Tool Specification](#cli-tool-specification)
7. [Implementation Roadmap](#implementation-roadmap)
8. [Technical Decisions](#technical-decisions)
9. [Future-Proofing Strategy](#future-proofing-strategy)
10. [Dependencies](#dependencies)
11. [Open Questions](#open-questions)

---

## Executive Summary

Build a shadcn-style React component library with CLI tool that allows users to:

1. Initialize their project with `npx @ez/ui init`
2. Add components with `npx @ez/ui add badge-link`
3. Own the source code (copy-paste model, not npm dependency)

**Key Benefits:**

- Users own the code — full customization capability
- Zero runtime dependencies — components live in user's project
- Easy updates — run CLI again to get latest component versions
- Framework agnostic — works with Next.js, Vite, CRA

---

## Current Project Analysis

### Project Overview

```
ez.ui/
├── src/
│   ├── components/ui/           # 3 components ready
│   │   ├── badge-link.tsx      # Complex: icons, tooltips, motion
│   │   ├── link.tsx            # Simple: Next.js Link wrapper
│   │   └── stamp.tsx           # Complex: interactive, motion physics
│   ├── lib/
│   │   ├── utils.ts            # cn() helper (shadcn standard)
│   │   └── tokens.ts           # Design token constants
│   ├── styles/
│   │   └── globals.css         # Tailwind v4 @theme design system
│   └── app/
│       └── page.tsx            # Demo/showcase
├── components.json             # shadcn schema (already exists!)
├── package.json
└── tsconfig.json
```

### Tech Stack

| Technology   | Version | Purpose                    |
| ------------ | ------- | -------------------------- |
| Next.js      | 16.x    | Framework                  |
| React        | 19.x    | UI                         |
| Tailwind CSS | 4.x     | Styling (CSS-first @theme) |
| Motion/react | 12.x    | Animations                 |
| OKLCH colors | —       | Dark theme color system    |

### Already shadcn-compatible

- ✅ `components.json` config exists
- ✅ `cn()` utility following shadcn pattern
- ✅ Tailwind v4 with CSS variables
- ✅ TypeScript-first components
- ✅ Icon components built inline

---

## Architecture Decisions

### Approach: shadcn-style (Not Traditional npm)

| Aspect        | Traditional npm Package       | shadcn-style (Chosen)                      |
| ------------- | ----------------------------- | ------------------------------------------ |
| Install       | `npm install @lib/components` | `npx @ez/ui init && npx @ez/ui add button` |
| Location      | `node_modules/`               | User's `components/ui/`                    |
| Customization | Override via props/CSS        | Direct code editing                        |
| Updates       | `npm update`                  | Re-run CLI add command                     |
| Bundle impact | Affects app bundle            | Zero (code is local)                       |
| Ownership     | Library owns code             | User owns code                             |

### Why shadcn-style?

1. **User ownership** — Users can fully customize any component
2. **No bundle bloat** — Components aren't in node_modules
3. **Transparent** — Users see exactly what code they're using
4. **Easy updates** — Just re-run add command
5. **Industry trend** — shadcn/ui popularized this approach

---

## Directory Structure

```
ez.ui/
├── packages/
│   ├── cli/                         # @ez/ui — CLI tool (published to npm)
│   │   ├── src/
│   │   │   ├── commands/
│   │   │   │   ├── init.ts         # Initialize project command
│   │   │   │   ├── add.ts          # Add components command
│   │   │   │   └── index.ts        # Command exports
│   │   │   ├── utils/
│   │   │   │   ├── components.ts   # Component registry
│   │   │   │   ├── download.ts     # Fetch from GitHub
│   │   │   │   ├── transform.ts    # Fix imports/paths
│   │   │   │   ├── config.ts      # cosmiconfig wrapper
│   │   │   │   ├── registry.ts    # API utilities
│   │   │   │   └── logger.ts      # Chalk logging
│   │   │   ├── templates/          # CLI templates
│   │   │   ├── index.ts            # CLI entry
│   │   │   └── package.json
│   │   ├── bin/
│   │   │   └── cli.js              # Shebang entry point
│   │   └── README.md
│   │
│   └── components/                 # Source components (hosted on GitHub)
│       ├── src/
│       │   ├── components/
│       │   │   └── ui/
│       │   │       ├── badge-link.tsx
│       │   │       ├── link.tsx
│       │   │       ├── stamp.tsx
│       │   │       └── index.ts     # Barrel exports
│       │   ├── lib/
│       │   │   ├── utils.ts
│       │   │   └── tokens.ts
│       │   └── styles/
│       │       └── globals.css
│       ├── .storybook/
│       │   ├── main.ts
│       │   └── preview.ts
│       ├── stories/
│       │   ├── BadgeLink.stories.tsx
│       │   ├── Link.stories.tsx
│       │   └── Stamp.stories.tsx
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── apps/
│   └── demo/                       # Demo app (optional, can be in root)
│       ├── src/
│       │   ├── app/
│       │   └── components/
│       └── package.json
│
├── pnpm-workspace.yaml            # pnpm workspaces config
├── turbo.json                     # Future: Turborepo (optional)
├── package.json                   # Root workspace
├── tsconfig.json                  # Root TypeScript config
├── components.json                # Current shadcn config (will move)
└── PLAN.md                        # This file
```

---

## Component Package Specification

### package.json

```json
{
  "name": "@ez/ui-components",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "exports": {
    "./styles": "./src/styles/globals.css",
    "./components/ui/badge-link": "./src/components/ui/badge-link.tsx",
    "./components/ui/link": "./src/components/ui/link.tsx",
    "./components/ui/stamp": "./src/components/ui/stamp.tsx"
  },
  "files": ["src"],
  "peerDependencies": {
    "next": ">=14.0.0",
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "tailwindcss": ">=3.4.0"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "motion": "^12.34.3",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "tailwindcss": "^4.2.1",
    "typescript": "^5.0.0"
  }
}
```

### Storybook Configuration

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config
```

### Component Registry (for CLI)

```typescript
// packages/cli/src/utils/components.ts
export const COMPONENTS = {
  'badge-link': {
    name: 'BadgeLink',
    description: 'Inline link with spring-animated icon tooltip on hover',
    dependencies: ['motion', 'next', 'react'],
    files: ['components/ui/badge-link.tsx'],
    registries: [
      'https://raw.githubusercontent.com/YOUR_GITHUB/ez.ui/main/packages/components/src/components/ui/badge-link.tsx',
    ],
    tailwindConfig: {},
    cssVars: {},
  },
  link: {
    name: 'Link',
    description: 'Accessible navigation link with internal/external detection',
    dependencies: ['next'],
    files: ['components/ui/link.tsx'],
    registries: [
      'https://raw.githubusercontent.com/YOUR_GITHUB/ez.ui/main/packages/components/src/components/ui/link.tsx',
    ],
    tailwindConfig: {},
    cssVars: {},
  },
  stamp: {
    name: 'StampCollection',
    description: 'Interactive stamp stack with hover physics and newsletter signup',
    dependencies: ['motion', 'next', 'react'],
    files: ['components/ui/stamp.tsx'],
    registries: [
      'https://raw.githubusercontent.com/YOUR_GITHUB/ez.ui/main/packages/components/src/components/ui/stamp.tsx',
    ],
    tailwindConfig: {},
    cssVars: {},
  },
} as const

export type ComponentName = keyof typeof COMPONENTS
```

---

## CLI Tool Specification

### CLI Commands

```bash
# Initialize project
npx @ez/ui init                    # Interactive mode
npx @ez/ui init --defaults         # Use all defaults
npx @ez/ui init --yes              # Skip confirmation

# Add components
npx @ez/ui add badge-link          # Add single component
npx @ez/ui add link stamp          # Add multiple
npx @ez/ui add --all               # Add all components

# Options
npx @ez/ui add badge-link -y       # Skip confirmation
npx @ez/ui add badge-link -o       # Overwrite existing
npx @ez/ui add badge-link -c ./path # Custom components.json location

# Help
npx @ez/ui --help
npx @ez/ui add --help
```

### CLI package.json

```json
{
  "name": "@ez/ui",
  "version": "1.0.0",
  "type": "module",
  "description": "CLI to add ez.ui components to your project",
  "bin": {
    "ez-ui": "./bin/cli.js"
  },
  "files": ["dist", "bin"],
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc && esbuild src/index.ts --bundle --platform=node --target=node18 --outfile=bin/cli.js --format=esm --banner:js='#!/usr/bin/env node'",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "commander": "^12.0.0",
    "cosmiconfig": "^8.0.0",
    "prompts": "^2.4.0",
    "fast-glob": "^3.3.0",
    "zod": "^3.22.0",
    "chalk": "^5.0.0",
    "fs-extra": "^11.0.0"
  },
  "devDependencies": {
    "@types/fs-extra": "^11.0.0",
    "esbuild": "^0.20.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### CLI Entry Point

```typescript
// packages/cli/src/index.ts
#!/usr/bin/env node
import { Command } from 'commander'
import { init } from './commands/init'
import { add } from './commands/add'
import { getPackageInfo } from './utils/get-package-info'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

async function main() {
  const packageInfo = await getPackageInfo()

  const program = new Command()
    .name('ez-ui')
    .description('Add ez.ui components to your project')
    .version(packageInfo.version || '1.0.0')

  program.addCommand(init)
  program.addCommand(add)

  program.parse()
}

main()
```

### init Command

```typescript
// packages/cli/src/commands/init.ts
import { Command } from 'commander'
import prompts from 'prompts'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'

export const init = new Command()
  .name('init')
  .description('Initialize ez.ui in your project')
  .option('-y, --yes', 'Skip confirmation prompt', false)
  .option('-d, --defaults', 'Use default configuration', false)
  .option('-c, --cwd <cwd>', 'Working directory', process.cwd())
  .action(async opts => {
    console.log(chalk.bold('\n  ez.ui - Initialize\n'))

    // 1. Check for existing components.json
    const existingConfig = await getConfig(opts.cwd)

    if (existingConfig) {
      console.log(chalk.yellow('  components.json already exists.\n'))
      // Offer to reinitialize or update
    }

    // 2. Prompt for configuration (if not --defaults)
    const config = opts.defaults ? getDefaultConfig() : await promptForConfig(existingConfig)

    // 3. Create necessary directories
    await ensureDirectories(opts.cwd, config.paths)

    // 4. Write components.json
    await writeConfig(opts.cwd, config)

    // 5. Write globals.css (design system)
    await writeGlobalsCss(opts.cwd, config.paths)

    // 6. Write utils.ts (cn helper)
    await writeUtils(opts.cwd, config.paths)

    // 7. Install dependencies
    await installDependencies(opts.cwd)

    console.log(chalk.green('\n  Done! ✨\n'))
    console.log('  Next steps:')
    console.log('    npx ez-ui add badge-link\n')
  })
```

### add Command

```typescript
// packages/cli/src/commands/add.ts
import { Command } from 'commander'
import prompts from 'prompts'
import fs from 'fs-extra'
import chalk from 'chalk'
import { COMPONENTS, type ComponentName } from '../utils/components'
import { downloadComponent } from '../utils/download'
import { resolveConfig } from '../utils/config'

export const add = new Command()
  .name('add')
  .description('Add ez.ui components to your project')
  .argument('[components...]', 'the components to add')
  .option('-y, --yes', 'skip confirmation prompt', false)
  .option('-o, --overwrite', 'overwrite existing files', false)
  .option('-a, --all', 'add all components', false)
  .action(async (components: string[], opts) => {
    const config = await resolveConfig(process.cwd())

    // Resolve which components to add
    const toAdd = opts.all
      ? Object.keys(COMPONENTS)
      : components.length
        ? components
        : await promptForComponents()

    // Validate components exist
    const invalid = toAdd.filter(c => !COMPONENTS[c as ComponentName])
    if (invalid.length) {
      console.error(chalk.red(`\n  Unknown components: ${invalid.join(', ')}\n`))
      process.exit(1)
    }

    // Download and write each component
    for (const name of toAdd) {
      const component = COMPONENTS[name as ComponentName]

      console.log(chalk.cyan(`\n  Adding ${component.name}...`))

      for (const url of component.registries) {
        const code = await downloadComponent(url)
        const transformed = transformImports(code, config.paths)

        await writeComponent(
          process.cwd(),
          config.paths.components,
          `${name.replace('-', '-')}.tsx`,
          transformed
        )
      }

      console.log(chalk.green(`  ✓ ${component.name}`))
    }

    console.log(chalk.green('\n  Done! ✨\n'))
  })
```

### Config Resolution (cosmiconfig)

```typescript
// packages/cli/src/utils/config.ts
import { cosmiconfig } from 'cosmiconfig'
import { z } from 'zod'

const configSchema = z.object({
  $schema: z.string().optional(),
  style: z.string(),
  rsc: z.boolean(),
  tsx: z.boolean(),
  tailwind: z.object({
    config: z.string(),
    css: z.string(),
    baseColor: z.string(),
    cssVariables: z.boolean(),
    prefix: z.string().optional(),
  }),
  iconLibrary: z.string(),
  aliases: z.object({
    components: z.string(),
    utils: z.string(),
    ui: z.string(),
    lib: z.string(),
  }),
})

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string): Promise<Config | null> {
  const explorer = cosmiconfig('components', {
    searchPlaces: ['components.json'],
  })

  const result = await explorer.search(cwd)

  if (!result) return null

  return configSchema.parse(result.config)
}

export async function resolveConfig(cwd: string): Promise<Config> {
  const config = await getConfig(cwd)

  if (!config) {
    throw new Error(
      `No components.json found in ${cwd}.\n` + `Run "npx ez-ui init" first to initialize ez.ui.`
    )
  }

  return config
}
```

---

## Implementation Roadmap

### Phase 1: Component Package (2-3 days)

- [ ] Extract current components to `packages/components/`
- [ ] Add barrel exports (`index.ts`)
- [ ] Configure `package.json` with proper exports
- [ ] Setup Storybook with `.storybook/` config
- [ ] Write component stories for all 3 components
- [ ] Add TypeScript configuration
- [ ] Verify components build correctly

### Phase 2: CLI Tool (3-4 days)

- [ ] Initialize CLI package structure
- [ ] Setup Commander.js with commands
- [ ] Implement config resolution (cosmiconfig)
- [ ] Implement `init` command
- [ ] Implement `add` command
- [ ] Add component registry
- [ ] Add download/transform utilities
- [ ] Test CLI end-to-end
- [ ] Build and verify CLI works

### Phase 3: Documentation (1-2 days)

- [ ] Write README for CLI package
- [ ] Write README for components package
- [ ] Create installation guide
- [ ] Add component API documentation
- [ ] Deploy Storybook

### Phase 4: Publishing (1 day)

- [ ] Create npm account (if needed)
- [ ] Publish `@ez/ui` to npm
- [ ] Test `npx @ez/ui` installation
- [ ] Push source to GitHub
- [ ] Create GitHub release workflow

---

## Technical Decisions

### Bundle/Build Tool

| Tool          | Decision   | Rationale                                        |
| ------------- | ---------- | ------------------------------------------------ |
| **Vite**      | Not needed | Using shadcn-style, no bundling for distribution |
| **esbuild**   | CLI only   | Fast bundling for CLI entry point                |
| **tsc**       | Components | TypeScript compilation for types only            |
| **Storybook** | Vite       | Uses @storybook/react-vite                       |

### Package Manager

| Tool     | Decision    | Rationale                           |
| -------- | ----------- | ----------------------------------- |
| **pnpm** | Recommended | Faster, stricter, better workspaces |
| **npm**  | Supported   | Works with npm workspaces           |
| **yarn** | Supported   | Works with yarn workspaces          |

### CLI Framework

| Tool             | Downloads | Decision                            |
| ---------------- | --------- | ----------------------------------- |
| **Commander.js** | 50M/week  | ✅ Chosen — Same as shadcn/ui       |
| **yargs**        | 30M/week  | Alternative if more features needed |
| **oclif**        | 500K      | Overkill for this use case          |

### Versioning Strategy

- **Method:** Semantic Versioning (SemVer)
- **Scope:** Fixed versioning (all packages share same version)
- **Automation:** Conventional Commits with changesets
- **Initial version:** `1.0.0`

### Dependency Management

| Strategy              | Implementation                                         |
| --------------------- | ------------------------------------------------------ |
| **Peer dependencies** | Declared in components package                         |
| **External deps**     | Marked as `external` in bundling                       |
| **Shared React**      | CLI uses `dependenciesMeta.injected` pattern if needed |

---

## Future-Proofing Strategy

### Immediate (v1.0.0)

- pnpm workspaces for monorepo structure
- CLI tool for component distribution
- Storybook for component development
- GitHub for source hosting

### Short-term (v1.1.0+)

- Add Turborepo for CI caching (if needed)
- Add more components
- Add theme customization CLI
- Add component variants

### Long-term (v2.0.0+)

- Nx for module boundary enforcement (if team grows)
- Plugin system for CLI
- Auto-update mechanism
- VS Code extension for component snippets

### Scaling Indicators

| Signal             | Action                |
| ------------------ | --------------------- |
| CI builds > 10 min | Add Turborepo         |
| 5+ packages        | Add module boundaries |
| 15+ developers     | Add Nx                |
| Complex CI         | Add Nx Cloud          |

---

## Dependencies

### Root package.json

```json
{
  "name": "ez.ui",
  "private": true,
  "workspaces": ["packages/*", "apps/*"],
  "scripts": {
    "dev": "pnpm --filter @ez/ui-components dev",
    "build": "pnpm --filter @ez/ui-components build",
    "storybook": "pnpm --filter @ez/ui-components storybook",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
```

### CLI Dependencies

```json
{
  "commander": "^12.0.0",
  "cosmiconfig": "^8.0.0",
  "prompts": "^2.4.0",
  "fast-glob": "^3.3.0",
  "zod": "^3.22.0",
  "chalk": "^5.0.0",
  "fs-extra": "^11.0.0"
}
```

### Components Dependencies

```json
{
  "peerDependencies": {
    "next": ">=14.0.0",
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "tailwindcss": ">=3.4.0"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2"
  },
  "devDependencies": {
    "motion": "^12.34.3"
  }
}
```

---

## Open Questions

### Needs Decision

1. **CLI registry source:**
   - GitHub raw URLs (recommended — simple, free)
   - Custom API endpoint
   - npm package fallback

2. **Demo app location:**
   - Keep in root `src/app/`
   - Move to `apps/demo/`

3. **GitHub repository:**
   - Will source components be on GitHub?
   - What GitHub username/org?

4. **Storybook hosting:**
   - GitHub Pages (free)
   - Chromatic (free tier)
   - Vercel (connected to repo)

5. **npm organization:**
   - Use `@ez` scope (recommended)
   - Or personal scope `@yourname`

### Clarified

- ✅ **Approach:** shadcn-style (copy-paste)
- ✅ **CLI Framework:** Commander.js
- ✅ **Package Manager:** pnpm
- ✅ **Monorepo Tool:** pnpm workspaces (no extra tool yet)
- ✅ **Priority:** Components → CLI → Documentation

---

## References

- [shadcn/ui GitHub](https://github.com/shadcn-ui/ui)
- [Commander.js Docs](https://github.com/tj/commander.js)
- [cosmiconfig](https://github.com/cosmiconfig/cosmiconfig)
- [Turborepo Docs](https://turbo.build/repo)
- [Nx Docs](https://nx.dev)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Semantic Versioning](https://semver.org)
- [Conventional Commits](https://www.conventionalcommits.org)

---

## Changelog

| Version | Date       | Changes              |
| ------- | ---------- | -------------------- |
| 1.0.0   | 2026-03-23 | Initial plan created |

---

_Plan created based on research of shadcn/ui architecture, monorepo best practices, and CLI tool patterns._
