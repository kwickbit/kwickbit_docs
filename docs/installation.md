# Installation

## Install the SDK

Install the KwickBit SDK using npm or yarn:

```bash
npm install @kwickbit/sdk
```

Or with yarn:

```bash
yarn add @kwickbit/sdk
```

## Import the Library

```typescript
import { KwickBit } from '@kwickbit/sdk';
```

## Quick Start

```typescript
import { KwickBit } from '@kwickbit/sdk';

// Initialize with your API key
const kwickbit = new KwickBit('your-api-key-here');

// Create a checkout session
const session = await kwickbit.createCheckoutSession({
  dynamicLinkId: '550e8400-e29b-41d4-a716-446655440000',
  items: [
    {
      name: 'Premium Plan',
      price: 99.99,
      quantity: 1,
      currency: 'USD',
    }
  ],
  collectEmail: true,
  collectBillingAddress: false,
});

// Redirect customer to checkout URL
console.log(session.checkoutSessionUrl);
``` 