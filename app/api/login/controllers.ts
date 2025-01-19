import { validateUserInput } from "./utils";
import { loginService } from "./services";
import { IUser } from "@/types";

export async function loginController(data: IUser) {
  try {
    const validatedData = validateUserInput(data);

    return await loginService(validatedData);
  } catch (error) {
    throw new Error(
      (error as { message: string }).message || "Validation failed",
    );
  }
}
