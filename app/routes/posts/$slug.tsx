import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getPost } from '~/models/post.server'
import { marked } from 'marked'
import invariant from 'tiny-invariant'

export const loader = async ({ params }: LoaderArgs) => {
    const { slug } = params
    invariant(slug, 'slug is required')

    const post = await getPost(slug)
    invariant(post, `post not found ${slug}`)
    const { title, markdown } = post

    return json({ title, html: marked(markdown) })
}

export default function PostRoute() {
    const { title, html } = useLoaderData<typeof loader>()

    return (
        <main className="max-w-4x1 mx-auto">
            <h1 className="text-3x1 my-6 border-b-2 text-center">{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </main>
    )
}
