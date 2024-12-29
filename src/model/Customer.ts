export class Customer {
    
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }
}