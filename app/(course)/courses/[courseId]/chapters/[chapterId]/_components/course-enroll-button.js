"use client"

import { Logo } from "@/app/(dashboard)/_components/logo";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { auth, useClerk } from "@clerk/nextjs";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import React, { useEffect, useRef } from "react";
import { db } from "@/lib/db";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";

import { Paystack, paystackProps} from 'react-native-paystack-webview'
import { View } from 'react-native'

const CourseEnrollButton = ({ price, courseTitle, courseId }) => {
  const { user } = useClerk();

  const paystackWebViewRef = useRef(paystackProps.PayStackRef); 

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

 
  return (

    <Button
      size="sm"
      className="w-full md:w-auto"
      onClick={() => {
        // Ensure that userId is available and courseId is defined
        if (user && courseId) {
        //   handleFlutterPayment({
        //     callback: async (response) => {
        //       console.log(response);
        //       if (response.status === "completed") {
        //         //Use axios Option
                
        //         await axios.put(`/api/courses/${courseId}/purchase`)

        //   // await handlePurchase(userId); // Call the handlePurchase function
        // } else {
        //   console.log("Failed Trnx");
        // }

        //       closePaymentModal();
        //     },
        //     onClose: () => {
        //       console.log("User closed themselves");
        //     },
        //   });

          // Redirect to WA
        window.location.href = "https://wa.me/c/2348106503524"
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
