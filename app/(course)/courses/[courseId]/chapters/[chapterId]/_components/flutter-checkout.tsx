import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useClerk } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { Logo } from "../../../../../../(dashboard)/_components/logo"

export default async function FlutterCheckout({
    params
}:{
    params: { courseId: string }
}) {

    const { user } = useClerk()

    if (!user) {
        return redirect("/")
    }

    const email = user.primaryEmailAddress?.emailAddress
    const name = user?.fullName
    const phone_number = user?.phoneNumbers

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
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
    tx_ref: Date.now(),
    amount: course.price,
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

  const fwConfig = {
    ...config,
    text: `Enroll for ${course.price}`,
    
    callback: (response) => {
      console.log(response);
      if (response.status !== "completed") {
        console.log("Failed Transaction");
      } else {
        console.log("Success");
      }
  
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };
  
  return (
    <FlutterWaveButton {...fwConfig} />
  );
  
}