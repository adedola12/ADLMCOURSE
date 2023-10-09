"use client"

import { Logo } from "@/app/(dashboard)/_components/logo";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { auth, useClerk } from "@clerk/nextjs";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import React, { useEffect } from "react";
import { db } from "@/lib/db";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";

const CourseEnrollButton = ({ course, price, courseTitle, courseId }) => {
  const { user } = useClerk();

  useEffect(() => {
    // Redirect if the user is not authenticated
    if (!user) {
      return redirect("/");
    }
  }, [user]);

  const email = user?.primaryEmailAddress?.emailAddress;
  const name = user?.fullName;
  const phone_number = user?.phoneNumbers?.[0]?.number;

  const logo = Logo;
  const title = courseTitle;

  const router = useRouter()

  const config = {
    public_key: "FLWPUBK_TEST-17e331e0cadddaf16b06fa541080507b-X",
    tx_ref: Date.now().toString(),
    amount: price,
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
      logo,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  // const handlePurchase = async () => {
  //   const { userId } = auth(); // Define userId using auth() from Clerk
  
  //   try {
  //     const response = await fetch("/api/purchase", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         courseId: courseId, // Provide the courseId
  //         userId: userId, // Use the defined userId
  //       }),
  //     });
  
  //     if (response.status === 200) {
  //       console.log("Course purchase marked as true in the database.");
  //     } else {
  //       console.error("Failed to update the database.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating the database:", error);
  //   }
  // };

  return (
    <Button
      size="sm"
      className="w-full md:w-auto"
      onClick={() => {
        // Ensure that userId is available and courseId is defined
        if (user && courseId) {
          handleFlutterPayment({
            callback: async (response) => {
              console.log(response);
              if (response.status === "completed") {
                //Use axios Option
                
                await axios.put(`/api/courses/${courseId}/purchase`)

          // await handlePurchase(userId); // Call the handlePurchase function
        } else {
          console.log("Failed Trnx");
        }

              closePaymentModal();
            },
            onClose: () => {
              console.log("User closed themselves");
            },
          });
        } else {
          console.log("UserID not available; cannot update DB or courseId is missing");
        }
      }}
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
