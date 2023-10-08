"use client"

import axios from "axios";
import toast from "react-hot-toast";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modals";
import { useRouter } from "next/navigation";

interface ChapterActionProps {
    disabled: boolean;
    courseId: string
    chapterId: string
    isPublished: boolean
}

export const ChapterActions = ({
    disabled, courseId, chapterId, isPublished
}: ChapterActionProps)=> {

    const router = useRouter()
    const [isLoading, SetIsLoading] = useState(false)

    const onClick = async () => {
        try {
            SetIsLoading(true)

            if (isPublished){
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
                toast.success("Chapter Unpublished")
            } else {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
                toast.success("Chapter Published")
            }

            router.refresh
        } catch (error) {
            toast.error("something went wrong")
        } finally {
            SetIsLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            SetIsLoading(true)

            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)

            toast.success("Chapter Deleted")
            router.refresh()

            router.push(`/teacher/courses/${courseId}`)

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            SetIsLoading(false)
        }
    }
    
    return(
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Unpublished" : "Publish"}
            </Button>
            <ConfirmModal
                onConfirm={onDelete}
            >
            <Button
                size="sm"
                disabled={isLoading}
            >
                <TrashIcon className="h-4 w-4"/>
            </Button>
            </ConfirmModal>
        </div>
    )
}