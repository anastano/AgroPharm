import { User } from "../../auth/model/auth.model";
import { Product } from "../../product/model/product.model";

export interface OrderItem {
    id: number;
    quantity: number;
    product: Product;
    price: number;
}

export interface Order {
    id: number;
    date: Date;
    user: User;
    orderItems: OrderItem[];
    totalPrice: number;
}
