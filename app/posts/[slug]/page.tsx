// app/posts/[slug]/page.tsx
import { getPostBySlug } from '../../../lib/posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXContent } from './mdx-content'

interface PostProps {
  params: Promise<{
    slug: string
  }>
}

async function getParams(params: PostProps['params']) {
  try {
    const resolvedParams = await params
    return resolvedParams
  } catch (error) {
    console.error('Error resolving params:', error)
    return null
  }
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const resolvedParams = await getParams(params)
  if (!resolvedParams) {
    return { title: 'Error Loading Post' }
  }

  const post = await getPostBySlug(resolvedParams.slug)
  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    }
  }
}

export default async function Post({ params }: PostProps) {
  const resolvedParams = await getParams(params)
  if (!resolvedParams) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-red-500">Error loading post</h1>
      </div>
    )
  }

  const post = await getPostBySlug(resolvedParams.slug)
  if (!post) {
    notFound()
  }

  // Handle the content based on its type
  let mdxSource
  try {
    if (typeof post.content === 'string') {
      mdxSource = await serialize(post.content, {
        parseFrontmatter: false,
        mdxOptions: {
          development: process.env.NODE_ENV === 'development'
        }
      })
    } else if (post.content?.compiledSource) {
      mdxSource = post.content
    } else {
      throw new Error('Invalid content format')
    }
  } catch (error) {
    console.error('Error processing MDX:', error)
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-red-500">Error processing content</h1>
        <pre className="mt-4 p-4 bg-gray-800 rounded overflow-auto">
          {error instanceof Error ? error.message : 'Unknown error occurred'}
        </pre>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <article className="prose prose-invert prose-lg max-w-none">
        <header className="mb-8">
          <h1 className="text-5xl font-bold mb-4 text-white/90 border-b border-gray-800 pb-4">
            {post.title}
          </h1>
          <time
            dateTime={post.date}
            className="text-gray-500 text-sm block"
          >
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.excerpt && (
            <p className="text-xl text-gray-400 mt-4">
              {post.excerpt}
            </p>
          )}
        </header>
        <div className="mt-8 prose-pre:bg-gray-800 prose-headings:text-white/90 prose-a:text-blue-400 hover:prose-a:text-blue-300">
          {mdxSource && <MDXContent source={mdxSource} />}
        </div>
      </article>
    </div>
  )
}