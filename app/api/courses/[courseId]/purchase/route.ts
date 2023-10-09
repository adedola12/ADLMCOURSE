import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { courseId: string; }}
){
    try {
        const { userId } = auth()


        if(!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        const purchaseCourse = await  db.purchase.create({
            data:{
                userId,
                courseId: params.courseId,
            }
        })

        return NextResponse.json(purchaseCourse)

    } catch (error) {
        console.log("[COURSE_PURCHASE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}