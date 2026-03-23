import { Command } from 'commander'
import prompts from 'prompts'
import chalk from 'chalk'
import { resolveConfig, resolveRegistryUrl } from '../utils/config.js'
import { fetchRegistry, type RegistryItem } from '../utils/registry.js'

export const add = new Command()
  .name('add')
  .description('Add ez.ui components to your project')
  .argument('[components...]', 'the components to add')
  .option('-y, --yes', 'skip confirmation prompt', false)
  .option('-o, --overwrite', 'overwrite existing files', false)
  .option('-a, --all', 'add all components', false)
  .action(async (components: string[], opts) => {
    try {
      const cwd = process.cwd()
      const config = await resolveConfig(cwd)
      const registryUrl = resolveRegistryUrl(config)

      console.log(chalk.cyan(`\n  Using registry: ${registryUrl}\n`))

      const registry = await fetchRegistry(registryUrl)

      const componentNames = registry.items.map(item => item.name)

      const toAdd = opts.all
        ? componentNames
        : components.length
          ? components
          : await promptForComponents(registry.items)

      const invalid = toAdd.filter(c => !componentNames.includes(c))
      if (invalid.length) {
        console.error(chalk.red(`\n  Unknown components: ${invalid.join(', ')}\n`))
        console.log(chalk.gray('  Available: ' + componentNames.join(', ')))
        process.exit(1)
      }

      for (const name of toAdd) {
        const item = registry.items.find(i => i.name === name)!
        console.log(chalk.cyan(`\n  Adding ${item.title}...`))

        for (const file of item.files) {
          if (file.type === 'registry:component' || file.type === 'registry:block') {
            const fileUrl = `${registryUrl}/${file.path}`
            const code = await downloadFile(fileUrl)
            const targetPath = file.target || `${config.aliases.ui}/${name}.tsx`

            await writeComponent(cwd, targetPath, code, opts.overwrite)
          }
        }

        if (item.dependencies?.length) {
          console.log(chalk.gray(`  Dependencies: ${item.dependencies.join(', ')}`))
        }

        console.log(chalk.green(`  ✓ ${item.title}`))
      }

      console.log(chalk.green('\n  Done! ✨\n'))
      console.log('  Run `pnpm install` to install dependencies.\n')
    } catch (error: any) {
      console.error(chalk.red(`\n  Error: ${error.message}\n`))
      process.exit(1)
    }
  })

async function promptForComponents(items: RegistryItem[]) {
  const response = await prompts({
    type: 'multiselect',
    name: 'components',
    message: 'Which components would you like to add?',
    choices: items.map(item => ({
      title: item.title,
      description: item.description,
      value: item.name,
    })),
    hint: 'Space to select, enter to submit',
  })

  return response.components || []
}

async function downloadFile(url: string): Promise<string> {
  const { fetch } = await import('undici')
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to download: ${response.status} ${response.statusText}`)
  }

  return await response.text()
}

async function writeComponent(cwd: string, filePath: string, code: string, overwrite: boolean) {
  const fs = await import('fs-extra')
  const path = await import('path')

  const fullPath = path.join(cwd, filePath)

  const exists = await fs.pathExists(fullPath)
  if (exists && !overwrite) {
    console.log(chalk.gray(`  Skipped ${filePath} (already exists, use -o to overwrite)`))
    return
  }

  await fs.ensureDir(path.dirname(fullPath))
  await fs.writeFile(fullPath, code)
  console.log(chalk.gray(`  Written ${filePath}`))
}
