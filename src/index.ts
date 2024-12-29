import { AgeDataType, BankPayment, CryptoPayment, EmailDataType, EmailType, FormValidator, NotificationSystem, PasswordDataType, PayPalPayment, SmsType } from "./exoSolidOCP";
import { PaymentProcessor } from "./service/PaymentProcessor";

// SOLID OCP 1
console.log();
console.log(' ********* SOLID OCP 1 ********* ');
console.log();
const mail: EmailType = new EmailType('mail@mail.com');
const phone: SmsType = new SmsType('0647150886');
const notifSystem: NotificationSystem = new NotificationSystem();

notifSystem.sendNotification('hello world', mail);
notifSystem.sendNotification('hello world', phone);

// SOLID OCP 2
console.log();
console.log(' ********* SOLID OCP 2 ********* ');
console.log();

const email: EmailDataType = new EmailDataType('mail@mail.fr');
const age: AgeDataType = new AgeDataType(33);
const password: PasswordDataType = new PasswordDataType('Motdepasse1');

const formValidator: FormValidator = new FormValidator({
    email: email, 
    age: age,
    password: password,
});

formValidator.validate();

// SOLID OCP 3
console.log();
console.log(' ********* SOLID OCP 3 ********* ');
console.log();

const bankPayment = new BankPayment('1234567890123456');
const paypalPayment = new PayPalPayment('adressePaypal@mail.fr');
const cryptoPayment = new CryptoPayment('0x1234567890abcdef1234567890abcdef12345678');

const paymentData: {} = {
    amount: 250,
    currency: 'EUR',
    method: cryptoPayment,
}
const paymentProcessor = new PaymentProcessor(paymentData);
paymentProcessor.validatePayment();
paymentProcessor.processPayment();


console.log();
console.log();
console.log();
