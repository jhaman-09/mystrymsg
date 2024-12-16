import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated!",
      },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    // const foundUser = await UserModel.aggregate([
    //   //   { $match: { _id: userId } },
    //   //   { $unwind: "$messages" },
    //   //   { $sort: { "messages.createdAt": -1 } },
    //   //   { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    //   // ]).exec();
    //   { $match: { _id: userId } },
    //   {
    //     $project: {
    //       _id: 1,
    //       messages: { $slice: [{ $arrayElemAt: ["$messages", 0] }, -1] }, // replace slice limit the array
    //     },
    //   },
    //   // No need to unwind and group here unless additional fields are calculated.
    // ]).exec();

    const foundUser = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]).exec();


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
        messages: foundUser[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "An unexpected error occured while getting messages..",
      error
    );
    return Response.json(
      {
        success: false,
        message: "An unexpected error occured while getting messages..",
      },
      { status: 500 }
    );
  }
}
