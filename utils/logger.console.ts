import { Error, ThrowError } from "../types";

export const logger = (error: any) => {
  const errMsg: Error = error;
  console.error(errMsg.message);
};

export const throwError = ({
  error,
  res,
  status = "403",
  message,
}: ThrowError) => {
  return res
    .status(Number(status))
    .json({
      message: message || "An error occurred",
      error: error?.message || error,
    });
};
