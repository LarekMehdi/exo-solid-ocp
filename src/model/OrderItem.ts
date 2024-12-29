export class OrderItem {

    private productId: number;
    private price: number;

    constructor(productId: number, price: number) {
        this.productId = productId;
        this.price = price;
    }


    getProductId(): number {
        return this.productId;
    }

    setProductId(productId: number): void {
        this.productId = productId;
    }

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number): void {
        this.price = price;
    }
}