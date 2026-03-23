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

function getComponentMeta(filePath, name) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const displayName = name
    .replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    .replace(/^[a-z]/, c => c.toUpperCase())

  let description = `A component from ez-ui`
  const commentMatch = content.match(/\/\/!\s*(.+)/) || content.match(/\/\*\*\s*\n\s*\*\s*(.+)/)
  if (commentMatch) description = commentMatch[1].trim()

  const deps = []
  if (content.includes('motion/react') || content.includes('framer-motion')) deps.push('motion')
  if (content.includes('gsap')) deps.push('gsap')
  if (content.includes('next')) deps.push('next')
  if (content.includes('react')) deps.push('react')

  return { displayName, description, dependencies: deps }
}

function findComponents(dir, basePath = '') {
  const items = []
  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    const relativePath = basePath ? `${basePath}/${file.name}` : file.name

    if (file.isDirectory()) {
      const subItems = findComponents(fullPath, relativePath)
      items.push(...subItems)
    } else {
      const ext = path.extname(file.name).toLowerCase()
      if (COMPONENT_EXTENSIONS.includes(ext)) {
        items.push({ path: fullPath, relativePath, name: file.name })
      }
    }
  }

  return items
}

function findAssets(dir, componentBaseName) {
  const assets = []

  const assetsDir = path.join(dir, 'assets')
  const searchDir = fs.existsSync(assetsDir) ? assetsDir : dir
  const baseNameShort = componentBaseName.replace('collection', '').replace(/-/g, '')

  const files = fs.readdirSync(searchDir, { withFileTypes: true })

  for (const file of files) {
    if (file.isFile()) {
      const ext = path.extname(file.name).toLowerCase()
      if (ASSET_EXTENSIONS.includes(ext)) {
        const assetBase = path.basename(file.name, ext)
        if (assetBase.startsWith(baseNameShort) || assetBase.match(/^\w+_\d/)) {
          assets.push(file.name)
        }
      }
    }
  }

  return assets
}

function buildRegistry() {
  if (!fs.existsSync(registryDir)) {
    console.log('No registry/new-york directory found')
    return
  }

  const components = findComponents(registryDir)
  const items = []

  for (const comp of components) {
    const componentDir = path.dirname(comp.path)
    const componentDirRel = path.dirname(comp.relativePath)
    const name = path.basename(comp.name, path.extname(comp.name))
    const meta = getComponentMeta(comp.path, name)

    const componentRelPath = `registry/new-york/${comp.relativePath}`
    const target = `components/ui/${comp.relativePath.replace(/\.(tsx|jsx|ts|js)$/, '')}.tsx`

    const item = {
      name,
      description: meta.description,
      type: 'registry:block',
      dependencies: meta.dependencies,
      files: [{ type: 'registry:component', path: componentRelPath, target }],
    }

    const assets = findAssets(componentDir, name)
    const assetsDir = fs.existsSync(path.join(componentDir, 'assets')) ? 'assets' : ''
    for (const asset of assets) {
      const assetPath = assetsDir
        ? `${componentDirRel}/${assetsDir}/${asset}`
        : `${componentDirRel}/${asset}`
      item.files.push({
        type: 'registry:file',
        path: `registry/new-york/${assetPath}`,
        target: `components/ui/${assetPath}`,
      })
    }

    items.push(item)
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
