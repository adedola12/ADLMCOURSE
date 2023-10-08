import { db } from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { courseId: string }}
){
    try {
        const user = await currentUser()

        if(!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status:400 })
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                isPublished: true
        }
        })

        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: params.courseId
                }
            }
        })

        if (purchase) {
            return new NextResponse("Already Purchase", { status: 400 })
        }

        if (!course) {
            return new NextResponse("Course Not Found", { status: 404 })
        }

        //TODO: GET USER INFO FROM CLERK
        //TODO: GET COURSE INFO FROM DB
        //TODO: IMPLEMENT PAYSTACK CHECKOUT

        console.log(user)

    } catch (error) {
        console.log("[COURSE_ID_CHECKOUT]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}