import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string }}
){
    try {
        const { userId } = auth()
        const { isCompleted } = await req.json()

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }
        })

        if(!chapter) {
            return new NextResponse("Chapter not Found", { status: 401 })
        }

        const userProgress = await  db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId: params.chapterId
                }
            },
            update: {
                isCompleted
            },
            create: {
                userId,
                chapterId: params.chapterId,
                isCompleted
            }
        })

        return NextResponse.json(userProgress)

    } catch (error) {
        console.log("[CHAPTER_ID_PROGRESS]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}