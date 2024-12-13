import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not found..",
        },
        { status: 404 }
      );
    }

    const isUserAcceptingMessages = user.isAcceptingMessage;

    if (!isUserAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "User Not accepting messages..",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message); // type asurity
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message send successfully..",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
      console.error("An unexpected error occured while sending message..",error);
      return Response.json(
        {
          success: false,
          message: "Internal server error while sending message..",
        },
        { status: 500 }
      );
  }
}
