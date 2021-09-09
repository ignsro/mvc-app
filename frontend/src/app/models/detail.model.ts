import { Product } from "./product.model";

export interface Detail {
    product_id: number,
    product_name?: string,
    quantity: number,
    subtotal: number,
    price?: number,
    Product?: Product
}