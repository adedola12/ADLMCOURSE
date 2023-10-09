// pages/api/purchase.js

import { PrismaClient } from "@prisma/client";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method not allowed
  }

  const prisma = new PrismaClient();

  try {
    const { courseId, userId } = req.body; // You may need to adjust the request body structure

    // Perform the purchase operation using PrismaClient
    const purchase = await prisma.purchase.create({
      data: {
        courseId,
        userId,
      },
    });

    res.status(200).json(purchase);
  } catch (error) {
    console.error("[ERROR_UPDATING_DB]", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

