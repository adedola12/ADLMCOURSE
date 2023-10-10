import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = () => {
  const { userId } = auth()
  const isAuthorised = isTeacher(userId)

  if (!userId || !isAuthorised) throw new Error("Unauthorized")
  return { userId }
}

export const ourFileRouter = {
  CourseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  CourseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
  
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;