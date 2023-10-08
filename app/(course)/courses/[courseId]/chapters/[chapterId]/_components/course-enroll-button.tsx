

import { Logo } from "@/app/(dashboard)/_components/logo";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { useClerk } from "@clerk/nextjs";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { redirect } from "next/navigation";

interface CourseEnrollButtonProps {
    courseId: string;
    price: number;
}

export const CourseEnrollButton = async ({
    courseId,
    price
}: CourseEnrollButtonProps) => {

    const { user } = useClerk()

    if (!user) {
        return redirect("/")
    }

    const email = user.primaryEmailAddress?.emailAddress
    const name = user?.fullName
    const phone_number = user?.phoneNumbers

    const course = await db.course.findUnique({
        where: {
            id: courseId,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true
                },
                orderBy: {
                    position: "asc"
                }
            }
        }
    })

    if (!course) {
        return redirect("/")
    }

    const title = course.title
    const logo = Logo

   const config = {
    public_key: process.env.FLUTTER_PUBLIC_KEY,
    tx_ref: Date.now().toString(),
    amount: course.price || null,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email,
      phone_number,
      name,
    },
    customizations: {
      title,
      description: 'Payment for items in cart',
      logo
    },
  };

    const handleFlutterPayment = useFlutterwave(config)
    
    return (
        <Button
        size="sm"
            className="w-full md:w-auto"
            onClick={() => {
                handleFlutterPayment({
                  callback: (response) => {
                     console.log(response);
                      closePaymentModal() // this will close the modal programmatically
                  },
                  onClose: () => {},
                });
              }}
        >
            Enroll for {formatPrice(price)}
        </Button>
    )
}