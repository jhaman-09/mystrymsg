import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    // this will used in when we have to extract some info from url
    // Decode the username in case it contains special characters
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;

      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account verified successfully",
        },
        {
          status: 200,
        }
      );
    }
    // if verifyCode expired
    else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired. Please signup again to a new code",
        },
        {
          status: 400,
        }
      );
    }

    // if verify code is wrong
    else {
      return Response.json(
        {
          success: false,
          message: "Incorrect Verification code",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("error verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error while verifying user/verifycode",
      },
      {
        status: 500,
      }
    );
  }
}
