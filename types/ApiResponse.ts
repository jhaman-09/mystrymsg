import { Message, User } from "@/model/User";

export interface ApiResponse {
  success: boolean;
  message: string;
  messages?: Array<Message>;
  user?: User;
  isAcceptingMessage ?: boolean;
}
