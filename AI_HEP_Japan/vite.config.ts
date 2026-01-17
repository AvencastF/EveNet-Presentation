import { defineConfig } from 'vite'
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  publicDir: 'public',
  build: {
    outDir: 'dist',
    copyPublicDir: true,
  },
  plugins: [
    {
      name: 'copy-results-assets',
      writeBundle() {
        // Ensure results subdirectory is copied
        const resultsSource = join(process.cwd(), 'public', 'results')
        const resultsDest = join(process.cwd(), 'dist', 'results')
        
        if (existsSync(resultsSource)) {
          // Create dest directory if it doesn't exist
          if (!existsSync(resultsDest)) {
            mkdirSync(resultsDest, { recursive: true })
          }
          
          // Copy files from public/results to dist/results
          function copyRecursive(src: string, dest: string) {
            const entries = readdirSync(src, { withFileTypes: true })
            for (const entry of entries) {
              const srcPath = join(src, entry.name)
              const destPath = join(dest, entry.name)
              
              if (entry.isDirectory()) {
                if (!existsSync(destPath)) {
                  mkdirSync(destPath, { recursive: true })
                }
                copyRecursive(srcPath, destPath)
              } else {
                copyFileSync(srcPath, destPath)
              }
            }
          }
          
          copyRecursive(resultsSource, resultsDest)
        }
      }
    }
  ]
})
