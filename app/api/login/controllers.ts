import { validateUserInput } from "./utils";
import { loginService } from "./services";

export async function loginController(data: any) {
  try {
    const validatedData = validateUserInput(data);

    return await loginService(validatedData);
  } catch (error) {
    throw new Error(
      (error as { message: string }).message || "Validation failed",
    );
  }
}
