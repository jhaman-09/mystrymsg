import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated!",
      },
      { status: 401 }
    );
  }

  const user: User = session?.user as User;

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const foundUser = await UserModel.aggregate([
      { $match: { id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } }, // -1 for decending and 1 for ascending
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!foundUser || foundUser.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User Not found..",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User found..",
        data: foundUser[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("An unexpected error occured while getting messages..",error);
    return Response.json(
      {
        success: false,
        message: "An unexpected error occured while getting messages..",
      },
      { status: 500 }
    );
  }
}
