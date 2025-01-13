import { IErrorMessage } from "@/types";

/**
 * A utility function to handle errors and throw a consistent error message.
 *
 * @param error - The error caught in a try-catch block (typically of type 'unknown')
 * @param defaultMessage - A default message to use if the error does not match the expected structure
 * @returns - Throws an Error with a consistent message
 */
export function handleError(error: unknown, defaultMessage: string): void {
  if (isErrorMessage(error)) {
    throw new Error(defaultMessage + ": " + error.message);
  } else {
    throw new Error(defaultMessage + ": Unknown error occurred");
  }
}

/**
 * Type guard to narrow down the error type to IErrorMessage
 */
function isErrorMessage(error: unknown): error is IErrorMessage {
  return (error as IErrorMessage)?.message !== undefined;
}
