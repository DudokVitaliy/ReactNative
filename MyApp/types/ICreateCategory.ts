import {IImageFile} from "@/types/IImageFile";

export interface ICreateCategory{
    name: string;
    description: string;
    image:IImageFile;
}