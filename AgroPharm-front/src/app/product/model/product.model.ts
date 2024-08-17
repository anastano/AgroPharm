import { Category } from "./category.model";

export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    supplies: number;
    reserved: number;
    category?: Category;
}

export interface ProductCreation {
    name: string;
    description: string;
    price: number;
    supplies: number;
    reserved: number;
    categoryId: number;
}