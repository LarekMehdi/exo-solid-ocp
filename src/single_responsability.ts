import { PaymentProcessor } from "./exoSolidOCP";
import { Customer } from "./model/Customer";
import { Invoice } from "./model/Invoice";
import { OrderItem } from "./model/OrderItem";
import { EmailService } from "./service/EmailService";
import { InventoryManager } from "./service/InventoryManager";

class Database {
    save(table: string, extra: any ): void {}
}

class BlogPost {
    title: string;
    content: string;
    author: string;
    tags: string[];
    id: number | null = null;
    private database: Database;

    constructor(title: string, content: string, author: string) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.tags = [];
        this.database = new Database();
    }

    setId(id: number): void {
        this.id = id;
    }

    save(): void {
        // Sauvegarde en base de données
        this.database.save("posts", this);

        // Génération du HTML
        const html = this.generateHtml();
        this.database.save("rendered_posts", { id: this.id, html });

        // Indexation pour la recherche
        this.indexForSearch();

        // Notification des abonnés
        this.notifySubscribers();
    }

    private generateHtml(): string {
        // Conversion du markdown en HTML
        return `<h1>${this.title}</h1><p>${this.content}</p>`;
    }

    private indexForSearch(): void {
        // Logique d'indexation pour le moteur de recherche
    }

    private notifySubscribers(): void {
        // Envoi d'emails aux abonnés
    }
}




/**
 * 
 * 
 * 
 */

// Exercice 3 : Gestionnaire de commandes
class Order {
    items: OrderItem[];
    customer: Customer;
    private paymentProcessor: PaymentProcessor;
    private inventoryManager: InventoryManager;
    private emailService: EmailService;

    constructor(customer: Customer) {
        this.items = [];
        this.customer = customer;
        this.paymentProcessor = new PaymentProcessor({});
        this.inventoryManager = new InventoryManager();
        this.emailService = new EmailService();
    }

    addItem(item: OrderItem): void {
        // Vérification du stock
        if (!this.inventoryManager.checkStock(item.getProductId())) {
            throw new Error("Produit non disponible");
        }
        this.items.push(item);
    }

    async processOrder(): Promise<void> {
        // Calcul du total
        const total = this.calculateTotal();

        // Traitement du paiement
        await this.paymentProcessor.process(total);

        // Mise à jour du stock
        this.items.forEach((item) => {
            this.inventoryManager.decrementStock(item.getProductId());
        });

        // Génération de la facture
        const invoice = this.generateInvoice();

        // Envoi de la confirmation par email
        await this.emailService.sendOrderConfirmation(this.customer.getEmail(), invoice);
    }

    private calculateTotal(): number {
        return this.items.reduce((sum, item) => sum + item.getPrice(), 0);
    }

    private generateInvoice(): Invoice {
        // Logique de génération de facture
        return new Invoice(this);
    }
}