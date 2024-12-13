"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/Link";
import { useDebounceValue } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/Schema/signUpSchema";
import axios,{AxiosError} from 'axios'
import { ApiResponse } from "../../../../types/ApiResponse";

const page = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // it will reflect changes in username value after 300ms
  const debouncedUsername = useDebounceValue(username, 300);
  const { toast } = useToast();
  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    }
  });

  useEffect(() => {
    const chechUserUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true)
        setUsernameMessage('')

        try {
          const res = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`);
          setUsernameMessage(res.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(axiosError.response?.data.message ?? "Error checking username")
        }
        finally {
          setIsCheckingUsername(false)
        }
      }
    }

    chechUserUnique();
  } , [debouncedUsername])


  return <div>page</div>;
};

export default page;
