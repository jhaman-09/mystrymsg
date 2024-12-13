import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/Schema/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  if (request.method !== "GET") {
    return Response.json(
      {
        success: false,
        message: "Only Get Method is allowed",
      },
      {
        status: 405,
      }
    );
  }

  await dbConnect();

  // localhost:3000/api/check-username-unique?username=aman
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const usernmaeErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernmaeErrors.length > 0
              ? usernmaeErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
