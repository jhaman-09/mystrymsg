"use client";
// import { useToast } from "@/hooks/use-toast";
// import { Message } from "@/model/User";
// import { acceptMessageSchema } from "@/Schema/acceptMessageSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios, { AxiosError } from "axios";
// import { useSession } from "next-auth/react";
// import React, { useCallback, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { ApiResponse } from "../../../../types/ApiResponse";
// import { User } from "next-auth";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Separator } from "@/components/ui/separator";
// import { Loader2, RefreshCcw } from "lucide-react";
// import MessageCard from "@/components/MessageCard";
// import { useRouter } from "next/navigation";

// const page = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSwitchingLoading, setIsSwitchingLoading] = useState(false);

//   const { toast } = useToast();

//   const handleDeleteMessage = (messageId: string) => {
//     setMessages(messages.filter((message) => message._id !== messageId));
//   };

//   const { data: session, status } = useSession();
//     const router = useRouter();


//   const form = useForm({
//     resolver: zodResolver(acceptMessageSchema),
//   });

//   const { register, watch, setValue } = form;

//   const acceptMessages = watch("acceptMessages");

//   const fetchAcceptMessage = useCallback(async () => {
//     setIsSwitchingLoading(true);
//     try {
//       const res = await axios.get<ApiResponse>(`/api/accept-messages`);
//       setValue("acceptMessages", res.data.isAccesptingMessages);
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast({
//         title: "Error",
//         description:
//           axiosError.response?.data.message ||
//           "Failed to fetch message setting",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSwitchingLoading(false);
//     }
//   }, [setValue]);

//   const fetchMessages = useCallback(
//     async (refresh: boolean = false) => {
//       setIsLoading(true);
//       setIsSwitchingLoading(false);
//       try {
//         const res = await axios.get<ApiResponse>(`/api/get-messages`);
//         setMessages(res.data.messages || []);
//         if (refresh) {
//           toast({
//             title: "Refreshed messages",
//             description: "Showing latest messages",
//           });
//         }
//       } catch (error) {
//         const axiosError = error as AxiosError<ApiResponse>;
//         toast({
//           title: "Error",
//           description:
//             axiosError.response?.data.message ||
//             "Failed to fetch message setting",
//           variant: "destructive",
//         });
//       } finally {
//         setIsLoading(false);
//         setIsSwitchingLoading(false);
//       }
//     },
//     [setIsLoading, setMessages]
//   );

//   useEffect(() => {
//     //  if (status === "loading") return; // Wait until session is checked

//     //  if (!session || !session.user) {
//     //    router.replace("/signin"); // Redirect to sign-in page if not logged in
//     //    return;
//     //  }
//     fetchMessages();
//     fetchAcceptMessage();
//   }, [setValue, status, router, session, fetchAcceptMessage, fetchMessages]);

//   const handleAcceptMessageSwitchChange = async () => {
//     try {
//       const res = await axios.post<ApiResponse>(`/api/accept-messages`, {
//         acceptMessages: !acceptMessages,
//       });
//       setValue("acceptMessages", !acceptMessages);
//       toast({
//         title: res.data.message,
//         variant: "destructive",
//       });
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast({
//         title: "Error",
//         description:
//           axiosError.response?.data.message ||
//           "Failed to fetch message setting",
//         variant: "destructive",
//       });
//     }
//   };

//   const { username } = session?.user as User;
//   // url
//   const baseUrl = `${window.location.protocol}//${window.location.host}`;
//   const profileUrl = `${baseUrl}/u/${username}`;

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(profileUrl);
//     toast({
//       title: "URL copied",
//       description: "Profile URL has been copied to clipboard",
//     });
//   };

//   if (!session || !session.user) {
//     return <div>Please login</div>;
//   }

//   return (
//     <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
//       <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

//       <div className="mb-4">
//         <h2 className="text-lg font-semibold mb-2">Copy your unique link</h2>
//         <div className="flex items-center">
//           <input
//             type="text"
//             value={profileUrl}
//             disabled
//             className="input input-bordered w-full p-2 mr-2"
//           />
//           <Button onClick={copyToClipboard}>Copy</Button>
//         </div>
//       </div>

//       <div className="mb-4">
//         <Switch
//           {...register("acceptMessages")}
//           checked={acceptMessages}
//           onCheckedChange={handleAcceptMessageSwitchChange}
//           disabled={isSwitchingLoading}
//         />

//         <span className="ml-2">
//           Accept Message : {acceptMessages ? "On" : "Off"}
//         </span>
//       </div>
//       <Separator />

//       <Button
//         className="mt-4"
//         variant="outline"
//         onClick={(e) => {
//           e.preventDefault();
//           fetchMessages(true);
//         }}
//       >
//         {isLoading ? (
//           <Loader2 className="h-4 w-4 animate-spin" />
//         ) : (
//           <RefreshCcw className="h-4 w-4" />
//         )}
//       </Button>

//       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {messages.length > 0 ? (
//           messages.map((message, index) =>
//             <MessageCard
//               key={message._id || index}
//               message={message}
//               onMessageDelete={handleDeleteMessage}
//             />
//           )
//         ) : (
//           <p>No message to display.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default page;

import React from 'react'

const UserDashboard = () => {
  return (
    <div>page</div>
  )
}

export default UserDashboard