import { Category } from "./category.model";

export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    supplies: number;
    reserved: number;
    category: Category;
    imageUrl?: string; 
}

export interface ProductCreation {
    name: string;
    description: string;
    price: number;
    supplies: number;
    reserved: number;
    categoryId: number;
    imageUrl?: string; 
}