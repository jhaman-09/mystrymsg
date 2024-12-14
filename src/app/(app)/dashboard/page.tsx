"use client";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/Schema/acceptMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ApiResponse } from "../../../../types/ApiResponse";

const page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchingLoading, setIsSwitchingLoading] = useState(false);

  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchingLoading(true);
    try {
      const res = await axios.get<ApiResponse>(`/api/accept-messages`);
      setValue("acceptMessages", res.data.isAccesptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message setting",
        variant: "destructive",
      });
    } finally {
      setIsSwitchingLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    setIsSwitchingLoading(false);
    try {
      const res = await axios.get<ApiResponse>(`/api/get-messages`);
      setMessages(res.data.messages || []);
      if (refresh) {
        toast({
          title: "Refreshed messages",
          description: "Showing latest messages",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message setting",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsSwitchingLoading(false);
    }
  }, [setIsLoading, setMessages]);

  useEffect(() => {
    if (!session || !session.user) {
      return;
    }
    fetchMessages();
    fetchAcceptMessage();
  }, [setValue, session, fetchAcceptMessage, fetchMessages])

  return <div>Dashboard</div>;
};

export default page;
