import { IImageFile } from "@/types/IImageFile";

export interface IUpdateCategory {
    id: number;
    name: string;
    description?: string;
    image?: IImageFile | null;
}