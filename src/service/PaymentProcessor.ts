import { PaymentType } from "../exoSolidOCP";

export class PaymentProcessor {
    private paymentData: {
        amount: number;
        currency: string;
        method: PaymentType;
    };

    constructor(paymentData: any) {
        this.paymentData = paymentData;
    }

    async validatePayment(): Promise<boolean> {
        if (this.paymentData.amount <= 0) {
            throw new Error("Montant invalide");
        }
        return this.paymentData.method.validatePayment();
    }

    async processPayment(): Promise<boolean> {
        return this.paymentData.method.processPayment(this.paymentData.amount, this.paymentData.currency);
    }

    async process(total: number) {

    }

}