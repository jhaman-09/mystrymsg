import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function DELETE(
  request: Request,
  { params }: { params: { messageId: string } }
) {
  const message_id = params.messageId;
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

  const user : User = session.user as User;

  try {
    const messageDeletedResult = await UserModel.updateOne(
      { _id: user._id }, // find user
      { $pull: { messages: { _id: message_id } } } // perform deletion
    );

    if (messageDeletedResult.modifiedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or already deleted..",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error while deleting message", error);

    return Response.json(
      {
        success: true,
        message: "An error occured while deleting message.",
      },
      {
        status: 500,
      }
    );
  }
}
