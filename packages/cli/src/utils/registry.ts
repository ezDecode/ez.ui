import { fetch } from 'undici'

export interface RegistryItem {
  name: string
  type: string
  title: string
  description: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: {
    path: string
    type: string
    target?: string
  }[]
  categories?: string[]
}

export interface Registry {
  $schema?: string
  name: string
  homepage: string
  items: RegistryItem[]
}

export async function fetchRegistry(baseUrl: string): Promise<Registry> {
  const url = `${baseUrl}/registry.json`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch registry: ${response.status} ${response.statusText}`)
  }

  return await response.json()
}

export async function fetchRegistryItem(baseUrl: string, name: string): Promise<RegistryItem> {
  const url = `${baseUrl}/r/${name}.json`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed to fetch registry item "${name}": ${response.status} ${response.statusText}`
    )
  }

  return await response.json()
}
