import { ProductComment } from "./comment.model";

export interface Product {
    id: string;
    skuCode: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    rating: number;
    reviews: number;
    comments: ProductComment[];
}
