import { Address, User } from "../../auth/model/auth.model";
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
    client: User;
    deliverer?: User;
    status: OrderStatus;
    orderItems: OrderItem[];
    totalPrice: number;
    address: Address;
}

export enum OrderStatus {
    CREATED = 'CREATED',
    CANCELLED = 'CANCELLED',
    APPROVED = 'APPROVED', //prihvacena narudzbina
    COLLECTED_FOR_DELIVERY = 'COLLECTED_FOR_DELIVERY',
    DELIVERY_COMPLETED_SUCCESSFULLY = 'DELIVERY_COMPLETED_SUCCESSFULLY',
    DELIVERY_COMPLETED_UNSUCCESSFULLY = 'DELIVERY_COMPLETED_UNSUCCESSFULLY',
    REJECTED = 'REJECTED'
}

export interface OrderItemRequest {
    product: Product;
    quantity: number;
    price: number;
  }
  
  export interface OrderRequest {
    orderItems: OrderItemRequest[];
    address?: Address;
  }