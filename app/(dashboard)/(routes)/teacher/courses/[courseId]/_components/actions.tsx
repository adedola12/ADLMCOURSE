"use client"

import axios from "axios";
import toast from "react-hot-toast";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modals";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ActionProps {
    disabled: boolean;
    courseId: String
    isPublished: boolean
}

export const Actions = ({
    disabled, courseId, isPublished
}: ActionProps)=> {

    const router = useRouter()
    const confetii = useConfettiStore()
    const [isLoading, SetIsLoading] = useState(false)

    const onClick = async () => {
        try {
            SetIsLoading(true)

            if (isPublished){
                await axios.patch(`/api/courses/${courseId}/unpublish`)
                toast.success("Course Unpublished")
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`)
                toast.success("Course Published")
                confetii.onOpen()
            }

            router.refresh
        } catch (error) {
            toast.error("something went wrong")
            console.log(error)
        } finally {
            SetIsLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            SetIsLoading(true)

            await axios.delete(`/api/courses/${courseId}`)

            toast.success("Course Deleted")
            router.refresh()

            router.push(`/teacher/courses`)

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