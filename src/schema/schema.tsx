import z from "zod";

export const productSchema = z.object({
  title: z.string().min(10, "The title must be 10 character or more!"),
  price: z.number().multipleOf(2),
  description: z.string().min(20, "The description must be 20 character or more!").regex(
    /^[a-zA-Z0-9_]+$/,
    "The description must contain only letters, numbers and underscore (_)"
  ),
});
