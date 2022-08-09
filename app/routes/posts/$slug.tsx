import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { getPost } from '~/models/post.server'

export const loader = async ({ params }) => {
    const { slug } = params

    const post = await getPost(slug)

    return json({ post })
}

export default function PostRoute() {
    const { post } = useLoaderData<typeof loader>()

    return (
        <main className="max-w-4x1 mx-auto">
            <h1 className="text-3x1 my-6 border-b-2 text-center">
                {post?.title}
            </h1>
        </main>
    )
}
