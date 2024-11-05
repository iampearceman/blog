import Link from 'next/link'
import { getAllPosts } from '../lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-4 text-white/90 border-b border-gray-800 pb-4">Blog Posts</h1>
      </header>
      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gray-800 pb-8">
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:text-gray-300 transition-colors">
                {post.title}
              </h2>
            </Link>
            <time className="text-gray-400 text-sm block mt-2">
              {new Date(post.date).toLocaleDateString()}
            </time>
            {post.excerpt && (
              <p className="mt-4 text-gray-300">{post.excerpt}</p>
            )}
            <Link
              href={`/posts/${post.slug}`}
              className="text-blue-400 hover:text-blue-300 transition-colors mt-4 inline-block"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}