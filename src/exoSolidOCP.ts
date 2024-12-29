// Problème : Chaque nouveau canal de notification nécessite de modifier la classe
/*class NotificationSystem {
    private userEmail: string;
    private userPhone: string;

    constructor(userEmail: string, userPhone: string) {
        this.userEmail = userEmail;
        this.userPhone = userPhone;
    }

    sendNotification(message: string, type: string): void {
        if (type === "email") {
            // Envoyer email
            console.log(`Email envoyé à ${this.userEmail}: ${message}`);
        } else if (type === "sms") {
            // Envoyer SMS
            console.log(`SMS envoyé à ${this.userPhone}: ${message}`);
        } else if (type === "push") {
            // Envoyer notification push
            console.log(`Push envoyée: ${message}`);
        }
    }
}*/

interface Type {
    contact: string;
    sendNotification(message: string): void;
}

export class EmailType implements Type {
    constructor(public contact: string) {
        this.contact = contact;
    }
    sendNotification(message: string): void {
        console.log(`Email envoyé à ${this.contact}: ${message}`);
    }
}

export class SmsType implements Type {
    constructor(public contact: string) {
        this.contact = contact;
    }
    sendNotification(message: string): void {
        console.log(`Sms envoyé à ${this.contact}: ${message}`);
    }
}

export class PushType implements Type {
    constructor(public contact: string) {
        this.contact = contact;
    }
    sendNotification(message: string): void {
        console.log(`Push envoyé à ${this.contact}: ${message}`);
    }
}


export class NotificationSystem {
    sendNotification(message: string, type: Type): void {
        type.sendNotification(message);
    }
}










// Problème : L'ajout de nouvelles règles de validation nécessite de modifier la classe existante
/*class FormValidator {
    private data: any;

    constructor(formData: any) {
        this.data = formData;
    }

    validate(): boolean {
        // Valider email
        if (this.data.email) {
            if (!this.data.email.includes("@")) {
                throw new Error("Email invalide");
            }
        }

        // Valider âge
        if (this.data.age) {
            if (typeof this.data.age !== "number" || this.data.age < 0) {
                throw new Error("Âge invalide");
            }
        }

        // Valider mot de passe
        if (this.data.password) {
            if (this.data.password.length < 8) {
                throw new Error("Mot de passe trop court");
            }
            if (!/[A-Z]/.test(this.data.password)) {
                throw new Error("Le mot de passe doit contenir une majuscule");
            }
            if (!/[0-9]/.test(this.data.password)) {
                throw new Error("Le mot de passe doit contenir un chiffre");
            }
        }

        return true;
    }
}*/

interface DataType {
    validate(): void;
} 

export class EmailDataType implements DataType {
    public email: string;

    constructor(email: string) {
        this.email = email;
    }
    validate(): void {
        if (!this.email.includes("@")) {
            throw new Error("Email invalide");
        }
    }
}

export class AgeDataType implements DataType {
    public age: number;

    constructor(age: number) {
        this.age = age;
    }
    validate(): void {
        if (typeof this.age !== "number" || this.age < 0) {
            throw new Error("Âge invalide");
        }
    }
}

export class PasswordDataType implements DataType {
    public password: string;

    constructor(password: string) {
        this.password = password;
    }
    validate(): void {
        if (this.password.length < 8) {
            throw new Error("Mot de passe trop court");
        }
        if (!/[A-Z]/.test(this.password)) {
            throw new Error("Le mot de passe doit contenir une majuscule");
        }
        if (!/[0-9]/.test(this.password)) {
            throw new Error("Le mot de passe doit contenir un chiffre");
        }
    }
}

export class FormValidator {
    private data: any;

    constructor(formData: any) {
        this.data = formData;
    }

    validate(): boolean {
    
        if (this.data.email) this.data.email.validate();
        if (this.data.age) this.data.age.validate();
        if (this.data.password) this.data.password.validate();

        console.log('validation succeded');
        return true;
    }
}



/***
 * 
 * 
 */


// Problème : Le système est difficile à étendre pour de nouveaux moyens de paiement
// et nouveaux types de validation
/*class PaymentProcessor {
    private paymentData: {
        amount: number;
        currency: string;
        method: string;
        cardNumber?: string;
        paypalEmail?: string;
        cryptoAddress?: string;
    };

    constructor(paymentData: any) {
        this.paymentData = paymentData;
    }

    async validatePayment(): Promise<boolean> {
        // Validation du montant
        if (this.paymentData.amount <= 0) {
            throw new Error("Montant invalide");
        }

        // Validation spécifique selon le mode de paiement
        if (this.paymentData.method === "card") {
            if (!this.paymentData.cardNumber?.match(/^[0-9]{16}$/)) {
                throw new Error("Numéro de carte invalide");
            }
            // Vérification auprès du service bancaire
            await this.validateWithBank();
        } else if (this.paymentData.method === "paypal") {
            if (!this.paymentData.paypalEmail?.includes("@")) {
                throw new Error("Email PayPal invalide");
            }
            // Vérification auprès de PayPal
            await this.validateWithPayPal();
        } else if (this.paymentData.method === "crypto") {
            if (!this.paymentData.cryptoAddress?.match(/^0x[a-fA-F0-9]{40}$/)) {
                throw new Error("Adresse crypto invalide");
            }
            // Vérification sur la blockchain
            await this.validateWithBlockchain();
        }

        return true;
    }

    async processPayment(): Promise<boolean> {
        if (this.paymentData.method === "card") {
            // Traitement carte bancaire
            return this.processCardPayment();
        } else if (this.paymentData.method === "paypal") {
            // Traitement PayPal
            return this.processPayPalPayment();
        } else if (this.paymentData.method === "crypto") {
            // Traitement crypto
            return this.processCryptoPayment();
        }
        throw new Error("Méthode de paiement non supportée");
    }

    private async validateWithBank(): Promise<void> {
        // Simulation validation bancaire
    }

    private async validateWithPayPal(): Promise<void> {
        // Simulation validation PayPal
    }

    private async validateWithBlockchain(): Promise<void> {
        // Simulation validation blockchain
    }

    private async processCardPayment(): Promise<boolean> {
        // Simulation paiement carte
        return true;
    }

    private async processPayPalPayment(): Promise<boolean> {
        // Simulation paiement PayPal
        return true;
    }

    private async processCryptoPayment(): Promise<boolean> {
        // Simulation paiement crypto
        return true;
    }
}*/

/*   **********************  */
export interface PaymentType {
    validatePayment(): Promise<boolean>
    processPayment(amount: number, currency: string): Promise<boolean>
}

// CARD
export class BankPayment implements PaymentType{
    cardNumber: string;

    constructor(cardNumber: string) {
        this.cardNumber = cardNumber;
    }

    async validatePayment(): Promise<boolean> {
        if (!this.cardNumber.match(/^[0-9]{16}$/)) {
            throw new Error("Numéro de carte invalide");
        }
        return true;
    }

    async processPayment(amount: number, currency: string): Promise<boolean> {
        // Simulation paiement carte
        console.log(`Payment done with card ${this.cardNumber} => ${amount} ${currency}`);
        return true;
        
    }
}

// PAYPAL
export class PayPalPayment implements PaymentType{
    paypalEmail: string;

    constructor(paypalEmail: string) {
        this.paypalEmail = paypalEmail;
    }

    async validatePayment(): Promise<boolean> {
        if (!this.paypalEmail.includes("@")) {
            throw new Error("Email PayPal invalide");
        }
        return true;
    }

    async processPayment(amount: number, currency: string): Promise<boolean> {
        // Simulation paiement PayPal
        console.log(`Payment done with PayPal account ${this.paypalEmail} => ${amount} ${currency}`);
        return true;
    }
}

// CRYPTO
export class CryptoPayment implements PaymentType{
    cryptoAddress: string;

    constructor(cryptoAddress: string) {
        this.cryptoAddress = cryptoAddress;
    }

    async validatePayment(): Promise<boolean> {
        if (!this.cryptoAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
            throw new Error("Adresse crypto invalide");
        }
        return true;
    }

    async processPayment(amount: number, currency: string): Promise<boolean> {
         // Simulation paiement crypto
         console.log(`Payment done with crypto address ${this.cryptoAddress} => ${amount} ${currency}`);
        return true;
    }
}

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


