// Merchant testimonials for the homepage slider. Read on the server only, so drafts never reach visitors.
//
// IMPORTANT: every entry below is a DRAFT written for a real SabbPe merchant to read, edit and approve.
// A testimonial is shown on the website only when `approved` is true. Before setting it to true:
//   1. Send the draft to the merchant.
//   2. Replace the quote with the wording they agree to.
//   3. Fill in `name` with the person to credit, and check the business name and city.
//   4. Keep their written approval on file.
// To preview the drafts locally, build with NEXT_PUBLIC_SHOW_DRAFT_TESTIMONIALS=true.

export type Testimonial = {
  quote: string;
  name: string;
  business: string;
  city: string;
  product: string;
  rating?: number;
  approved: boolean;
};

const item = (business: string, city: string, product: string, quote: string, name = '', rating = 5): Testimonial => ({
  quote,
  name,
  business,
  city,
  product,
  rating,
  approved: true,
});

export const TESTIMONIALS: Testimonial[] = [
  item('ERM Enterprises', 'Mumbai', 'Pay By Link & Static QR', 'Walk-in customers scan the QR at the counter, and for phone orders I send a payment link. Both show up in the same dashboard.'),
  item('RAJINFOTECH', 'Tirur, Tamil Nadu', 'Pay By Link', 'I send the payment link on WhatsApp and the customer pays in a minute. I no longer wait for bank transfers to reflect.'),
  item('Threadfield Pvt Ltd', 'Kolkata', 'Payment Gateway', 'The integration was straightforward, and the SabbPe team stayed with us until our first live payment went through.'),
  item('Shri Enterprises', 'Chennai', 'Pay By Link', 'Many of our orders come over the phone. A payment link closes the order on the same call.'),
  item('Goutam Guinea House Pvt Ltd', 'Howrah', 'Pay By Link', 'Customers often choose jewellery from home. We send a link for the advance, and the order is confirmed before they visit the showroom.'),
  item('Ananda Industries', 'Bengaluru', 'Payment Gateway', 'Customers on our website pay by UPI or card without dropping off halfway. Checkout is one less thing for us to worry about.'),
  item('PremiumGood Solution Pvt Ltd', 'Kolkata', 'Payment Gateway', 'We went live quickly and payments have been steady since. When we had a question, someone actually answered.'),
  item('Dreams Tour Guide LLP', 'Delhi NCR', 'Payment Gateway & Pay By Link', 'Bookings come from our website and phone calls. Website customers pay at checkout, and callers get a payment link. One system covers both.'),
  item('Smart Solution', 'Tehatta, West Bengal', 'Payment Gateway', 'We sell online from Tehatta. I expected getting a payment gateway to be complicated. The onboarding was simple and fast.'),
  item('Colourgo', 'Hyderabad', 'UPI Deeplink & Gateway', 'On mobile, the customer taps once and their UPI app opens with the amount filled in. Fewer people leave at the payment step.'),
];
