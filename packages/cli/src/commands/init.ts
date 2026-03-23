import { Command } from 'commander'
import prompts from 'prompts'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import { getConfig, getDefaultConfig } from '../utils/config.js'

export const init = new Command()
  .name('init')
  .description('Initialize ez.ui in your project')
  .option('-y, --yes', 'Skip confirmation prompt', false)
  .option('-d, --defaults', 'Use default configuration', false)
  .option('-c, --cwd <cwd>', 'Working directory', process.cwd())
  .action(async opts => {
    const cwd = path.resolve(opts.cwd)
    console.log(chalk.bold('\n  ez.ui - Initialize\n'))

    const existingConfig = await getConfig(cwd)

    if (existingConfig) {
      console.log(chalk.yellow('  components.json already exists.\n'))
    }

    const config = opts.defaults ? getDefaultConfig() : await promptForConfig(existingConfig, cwd)

    await ensureDirectories(cwd, config)
    await writeConfig(cwd, config)
    await writeGlobalsCss(cwd, config)
    await writeUtils(cwd, config)

    console.log(chalk.green('\n  Done! ✨\n'))
    console.log('  Next steps:')
    console.log('    npx ez-ui add stamp-collection\n')
  })

async function promptForConfig(existingConfig: any, cwd: string) {
  const responses = await prompts([
    {
      type: 'text',
      name: 'css',
      message: 'Where should the globals.css file be located?',
      initial: existingConfig?.tailwind?.css || 'src/styles/globals.css',
    },
    {
      type: 'text',
      name: 'prefix',
      message: 'What prefix should be used for CSS variables?',
      initial: existingConfig?.tailwind?.prefix || 'ez',
    },
    {
      type: 'confirm',
      name: 'rsc',
      message: 'Use React Server Components (RSC)?',
      initial: existingConfig?.rsc ?? true,
    },
    {
      type: 'confirm',
      name: 'tsx',
      message: 'Use TypeScript?',
      initial: existingConfig?.tsx ?? true,
    },
  ])

  return {
    style: 'new-york',
    rsc: responses.rsc,
    tsx: responses.tsx,
    tailwind: {
      config: '',
      css: responses.css,
      baseColor: 'neutral',
      cssVariables: true,
      prefix: responses.prefix,
    },
    iconLibrary: 'lucide',
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
      ui: '@/components/ui',
      lib: '@/lib',
    },
  }
}

async function ensureDirectories(cwd: string, config: any) {
  const dirs = [
    path.dirname(path.join(cwd, config.tailwind.css)),
    path.join(cwd, 'components', 'ui'),
    path.join(cwd, 'lib'),
  ]

  for (const dir of dirs) {
    await fs.ensureDir(dir)
  }
}

async function writeConfig(cwd: string, config: any) {
  const configPath = path.join(cwd, 'components.json')
  await fs.writeJson(configPath, config, { spaces: 2 })
  console.log(chalk.cyan('  Created components.json'))
}

async function writeGlobalsCss(cwd: string, config: any) {
  const cssPath = path.join(cwd, config.tailwind.css)
  const cssExists = await fs.pathExists(cssPath)

  if (!cssExists) {
    const cssContent = `@import 'tailwindcss';

@theme {
  --color-neutral-50: oklch(91.2% 0 0);
  --color-neutral-400: oklch(66.6% 0 0);
  --color-neutral-500: oklch(55.9% 0 0);
  --color-neutral-600: oklch(49.5% 0 0);
  --color-neutral-700: oklch(42.8% 0 0);
  --color-neutral-800: oklch(31.4% 0 0);
  --color-neutral-950: oklch(19.8% 0 0);

  --color-background: var(--color-neutral-950);
  --color-foreground: var(--color-neutral-50);
  --color-foreground-secondary: var(--color-neutral-400);
  --color-foreground-muted: var(--color-neutral-600);
  --color-surface: var(--color-neutral-700);
  --color-surface-hover: var(--color-neutral-500);
  --color-border: var(--color-neutral-500);
  --color-border-strong: var(--color-neutral-400);
  --color-accent: var(--color-neutral-50);
  --color-accent-subtle: oklch(91.2% 0 0 / 8%);
}

@layer base {
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--color-foreground-muted) transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-sans);
    background-color: var(--color-background);
    color: var(--color-foreground);
  }
}`
    await fs.writeFile(cssPath, cssContent)
    console.log(chalk.cyan(`  Created ${config.tailwind.css}`))
  } else {
    console.log(chalk.gray(`  Skipped ${config.tailwind.css} (already exists)`))
  }
}

async function writeUtils(cwd: string, config: any) {
  const utilsPath = path.join(cwd, 'lib', 'utils.ts')
  const utilsExists = await fs.pathExists(utilsPath)

  if (!utilsExists) {
    const utilsContent = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
    await fs.writeFile(utilsPath, utilsContent)
    console.log(chalk.cyan('  Created lib/utils.ts'))
  } else {
    console.log(chalk.gray('  Skipped lib/utils.ts (already exists)'))
  }
}
