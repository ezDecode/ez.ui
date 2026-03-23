import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const registryDir = path.join(__dirname, '..', 'registry', 'new-york')
const publicDir = path.join(__dirname, '..', 'public', 'r')
const registryJsonPath = path.join(__dirname, '..', 'registry.json')

const COMPONENT_EXTENSIONS = ['.tsx', '.jsx', '.ts', '.js']
const ASSET_EXTENSIONS = [
  '.webp',
  '.png',
  '.jpg',
  '.jpeg',
  '.svg',
  '.gif',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
]

function getComponentMeta(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')

  let description = `A component from ez-ui`
  const commentMatch = content.match(/\/\/!\s*(.+)/) || content.match(/\/\*\*\s*\n\s*\*\s*(.+)/)
  if (commentMatch) description = commentMatch[1].trim()

  const deps = new Set()
  if (content.includes('motion/react') || content.includes('framer-motion')) deps.add('motion')
  if (content.includes('gsap')) deps.add('gsap')
  if (content.includes('next')) deps.add('next')
  if (content.includes('react')) deps.add('react')
  if (content.includes('lucide-react')) deps.add('lucide-react')

  return { description, dependencies: Array.from(deps) }
}

function buildRegistry() {
  if (!fs.existsSync(registryDir)) {
    console.log('No registry/new-york directory found')
    return
  }

  const folders = fs
    .readdirSync(registryDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const items = []

  for (const folder of folders) {
    const folderPath = path.join(registryDir, folder)
    const files = []
    const allDeps = new Set()
    let mainDescription = `A component from ez-ui`

    function traverse(dir, relPath = '') {
      const entries = fs.readdirSync(dir, { withFileTypes: true })
      for (const entry of entries) {
        const entryPath = path.join(dir, entry.name)
        const entryRelPath = relPath ? `${relPath}/${entry.name}` : entry.name

        if (entry.isDirectory()) {
          if (entry.name !== 'assets') {
            traverse(entryPath, entryRelPath)
          }
        } else {
          const ext = path.extname(entry.name).toLowerCase()
          if (COMPONENT_EXTENSIONS.includes(ext)) {
            const { description, dependencies } = getComponentMeta(entryPath)
            if (
              entry.name === `${folder}.tsx` ||
              entry.name === 'index.ts' ||
              entry.name === 'index.tsx'
            ) {
              mainDescription = description
            }
            dependencies.forEach(d => allDeps.add(d))

            files.push({
              type: 'registry:component',
              path: `registry/new-york/${folder}/${entryRelPath}`,
              target: `components/ui/${folder}/${entryRelPath}`,
            })
          }
        }
      }
    }

    traverse(folderPath)

    // Add assets
    const assetsDir = path.join(folderPath, 'assets')
    if (fs.existsSync(assetsDir)) {
      const assetFiles = fs.readdirSync(assetsDir)
      for (const asset of assetFiles) {
        const ext = path.extname(asset).toLowerCase()
        if (ASSET_EXTENSIONS.includes(ext)) {
          files.push({
            type: 'registry:file',
            path: `registry/new-york/${folder}/assets/${asset}`,
            target: `components/ui/${folder}/assets/${asset}`,
          })
        }
      }
    }

    if (files.length > 0) {
      items.push({
        name: folder,
        description: mainDescription,
        type: 'registry:block',
        dependencies: Array.from(allDeps),
        files: files,
      })
    }
  }

  const registry = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'ez-ui',
    homepage: 'https://github.com/ezDecode/ez.ui',
    items,
  }

  fs.writeFileSync(registryJsonPath, JSON.stringify(registry, null, 2))
  console.log(`Generated registry.json with ${items.length} items`)

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  for (const item of items) {
    const itemFile = {
      $schema: 'https://ui.shadcn.com/schema/registry-item.json',
      name: item.name,
      type: item.type,
      title: item.name,
      description: item.description,
      dependencies: item.dependencies,
      files: [],
    }

    for (const file of item.files) {
      if (file.type === 'registry:component') {
        let content = fs.readFileSync(path.join(__dirname, '..', file.path), 'utf-8')
        content = content.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')

        itemFile.files.push({
          path: file.path,
          content,
          type: 'registry:component',
          target: file.target,
        })
      } else {
        itemFile.files.push(file)
      }
    }

    fs.writeFileSync(path.join(publicDir, `${item.name}.json`), JSON.stringify(itemFile, null, 2))
  }

  console.log(`Generated ${items.length} public registry files in public/r/`)
}

buildRegistry()
