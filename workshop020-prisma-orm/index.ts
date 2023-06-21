import { PrismaClient } from '@prisma/client'

async function run() {
    const prisma = new PrismaClient({
        log: ['query'],
    })

    const user = await prisma.user.create({
        data: {
            name: `User-${Date.now()}`,
            email: `user-${Date.now()}@email.com`
        }
    })

    const post = await prisma.post.create({
        data: {
            content: 'asdljkas',
            userId: user.id
        }
    })

    await prisma.user.findUnique({
        where: {
            id: 1
        }
    })

    await prisma.post.findMany({
        where: {
            User: {
                id: 2
            }
        }
    })

    await prisma.user.findUnique({
        where: {
            id: 2
        }
    }).Posts()

    console.log(user)
    console.log(post)
}

run()
