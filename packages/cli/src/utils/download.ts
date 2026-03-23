import { fetch } from 'undici'

export async function downloadComponent(url: string): Promise<string> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to download component: ${response.status} ${response.statusText}`)
  }

  return await response.text()
}
