import type { Config } from './config.js'

export interface TransformOptions {
  sourceAliases: {
    components: string
    utils: string
    ui: string
    lib: string
    hooks?: string
  }
  targetAliases: {
    components: string
    utils: string
    ui: string
    lib: string
    hooks?: string
  }
}

export function transformImports(code: string, options: TransformOptions): string {
  const { sourceAliases, targetAliases } = options

  let result = code

  const aliasMap: Record<string, string> = {
    [sourceAliases.utils]: targetAliases.utils,
    [sourceAliases.lib]: targetAliases.lib,
    [sourceAliases.components]: targetAliases.components,
    [sourceAliases.ui]: targetAliases.ui,
  }

  if (sourceAliases.hooks && targetAliases.hooks) {
    aliasMap[sourceAliases.hooks] = targetAliases.hooks
  }

  for (const [source, target] of Object.entries(aliasMap)) {
    if (source !== target) {
      const regex = new RegExp(source.replace('/', '\\/'), 'g')
      result = result.replace(regex, target)
    }
  }

  return result
}

export function createTransformOptions(
  config: Config,
  packageName: string = '@ez/ui-components'
): TransformOptions {
  return {
    sourceAliases: {
      components: `${packageName}/components`,
      utils: `${packageName}/lib/utils`,
      ui: `${packageName}/components/ui`,
      lib: `${packageName}/lib`,
    },
    targetAliases: config.aliases,
  }
}
