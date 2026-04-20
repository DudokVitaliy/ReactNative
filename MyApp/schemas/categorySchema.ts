import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(1, "Назва обов'язкове"),
    description: z.string().min(4, "Опис обов'язкове"),
    image: z.any().refine((file) => file !== undefined, {
        message:"Зображення є обов'язковим"
    }),
});

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;