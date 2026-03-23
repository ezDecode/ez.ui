#!/usr/bin/env node
import { Command } from 'commander'
import { init } from './commands/init.js'
import { add } from './commands/add.js'
import { getPackageInfo } from './utils/get-package-info.js'

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
