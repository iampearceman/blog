import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'content')

export interface Post {
  slug: string
  title: string
  date: string
  content: string
  excerpt?: string
}

export interface MDXPost {
  slug: string
  title: string
  date: string
  content: any
  excerpt?: string
}

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Content directory not found')
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        content,
        excerpt: data.excerpt || ''
      }
    })
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
}

export async function getPostBySlug(slug: string): Promise<MDXPost | null> {
  try {
    let fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    // Try .md if .mdx doesn't exist
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.md`)
      if (!fs.existsSync(fullPath)) {
        return null
      }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Serialize the content
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm as any],
        rehypePlugins: [rehypeHighlight as any],
      },
      parseFrontmatter: true,
      scope: data,
    })

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      content: mdxSource,
      excerpt: data.excerpt || ''
    }
  } catch (e) {
    console.error('Error getting post:', e)
    return null
  }
}