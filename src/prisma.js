import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.exists.Comment({
//     id: "ckagzykgw00ku0966fs76pin5",
//     author: {
//         id: "ckagzj11500ao09668ysqixi9"
//     }
// }).then((exists) => {
//     console.log(exists)
// })

const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({ id: authorId })

    if (!userExists) {
        throw new Error('User not found')
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ author { id name email posts { id title published } } }')
    return post.author
}

// createPostForUser('ckagzj11500ao09668ysqixi9', {
//     title: 'hello',
//     body: 'the art of hello',
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// })

const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({ id: postId })

    if (!postExists) {
        throw new Error('Post not found')
    }

    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data
    }, '{ author { id name email posts { id title published } } }')

    return post.author
}

// updatePostForUser('ckaktb1w900v60866b7wqkru5', {
//     published: false
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// })

