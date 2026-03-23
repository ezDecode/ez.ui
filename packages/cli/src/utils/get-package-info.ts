import { readFile } from 'fs/promises'
import { join } from 'path'

export async function getPackageInfo() {
  try {
    const packageJsonPath = join(process.cwd(), 'package.json')
    const packageJsonContent = await readFile(packageJsonPath, 'utf-8')
    return JSON.parse(packageJsonContent)
  } catch {
    return {}
  }
}
