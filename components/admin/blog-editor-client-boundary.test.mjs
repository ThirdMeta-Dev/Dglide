import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '../..')

test('blog editor keeps server-only blog database code out of the client bundle', () => {
  const editor = fs.readFileSync(
    path.join(root, 'app/admin/(protected)/blog/BlogEditor.tsx'),
    'utf8',
  )
  const settings = fs.readFileSync(path.join(root, 'lib/blog-detail-settings.ts'), 'utf8')
  const database = fs.readFileSync(path.join(root, 'lib/blog-db.ts'), 'utf8')

  assert.match(editor, /DEFAULT_BLOG_DETAIL_SETTINGS[\s\S]*from '@\/lib\/blog-detail-settings'/)
  assert.match(editor, /import type \{ BlogAuthor, BlogPost, BlogTag \} from '@\/lib\/blog-db'/)
  assert.doesNotMatch(settings, /from ['"]node:/)
  assert.match(database, /from 'node:crypto'/)
})
