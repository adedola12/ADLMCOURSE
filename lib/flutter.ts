import { currentUser } from '@clerk/nextjs';
import { useFlutterwave } from 'flutterwave-react-v3';

export async function CHECKIn ( ) {

const user = currentUser()
const email = await user.emailAddresses?.[0].emailAddress

 const config = {
    public_key: process.env.FLUTTER_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

 useFlutterwave(config)
}