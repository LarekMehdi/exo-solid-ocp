export class InventoryManager {


    checkStock(productId: number): boolean {
        return productId % 2 === 0 ? true : false;
    }

    decrementStock(productId: number): void {
        
    }
    
}