import { cosmiconfig } from 'cosmiconfig'
import { z } from 'zod'

const tailwindSchema = z.object({
  config: z.string(),
  css: z.string(),
  baseColor: z.string(),
  cssVariables: z.boolean(),
  prefix: z.string().optional(),
})

const aliasesSchema = z.object({
  components: z.string(),
  utils: z.string(),
  ui: z.string(),
  lib: z.string(),
  hooks: z.string().optional(),
})

const registrySchema = z.record(z.string())

export const configSchema = z.object({
  $schema: z.string().optional(),
  style: z.string(),
  rsc: z.boolean(),
  tsx: z.boolean(),
  tailwind: tailwindSchema,
  iconLibrary: z.string(),
  aliases: aliasesSchema,
  registries: registrySchema.optional(),
  url: z.string().optional(),
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

export function getDefaultConfig(): Config {
  return {
    style: 'new-york',
    rsc: true,
    tsx: true,
    tailwind: {
      config: '',
      css: 'src/styles/globals.css',
      baseColor: 'neutral',
      cssVariables: true,
      prefix: 'ez',
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

export function resolveRegistryUrl(config: Config, registryName?: string): string {
  if (registryName && config.registries && config.registries[registryName]) {
    return config.registries[registryName]
  }

  if (config.url) {
    return config.url
  }

  return 'https://raw.githubusercontent.com/ez-ui/ez.ui/main/packages/components'
}
