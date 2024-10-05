/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

interface ErrorApiToastProps {
  error: AxiosError | Error | any;
}

export const ErrorApiToast: React.FC<ErrorApiToastProps> = ({ error }) => {
  const toast = useToast();

  const message =
    error.error.response?.data.message ||
    error.error.message ||
    error.error.response?.data.error ||
    "Something went wrong";

  toast({
    title: "Error",
    description: message,
    status: "error",
    duration: 9000,
    isClosable: true,
  });
};
