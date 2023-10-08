const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Quantity Surveying"},
                { name: "Architectural"},
                { name: "Building Construction"},
                { name: "Net Zero"},
                { name: "General"},
            ]
        })

        console.log('Success')
    } catch (error) {
        console.log('error seeding the categories', error)
    } finally {
        await database.$disconnect()
    }
}

main()