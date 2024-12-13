import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function POST(request: Request) {
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

  const { acceptMessages } = await request.json();

  try {
    // updating user to accept messages now...
    const UpdatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessage: acceptMessages,
      },
      {
        new: true,
      }
    );

    if (!UpdatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to update messages acceptance status..",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully..",
        data: UpdatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("failed to update user status to accept messages..", error);
    return Response.json(
      {
        success: false,
        message: "failed to update user status to accept messages..",
      },
      { status: 500 }
    );
  }
}

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
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessage: foundUser.isAcceptingMessage,
        message:
          foundUser.isAcceptingMessage === true
            ? "User Accepting Messages"
            : "User not accepting messages..",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error to access user accepting messaege..", error);
    return Response.json(
      {
        success: false,
        message: "Error to access user accepting messaege..",
      },
      { status: 500 }
    );
  }
}
