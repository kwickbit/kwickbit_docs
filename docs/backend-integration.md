# Backend Integration

This guide shows how to integrate KwickBit payments into your backend application.

## Express.js Example

```typescript
import express from 'express';
import { KwickBit } from '@kwickbit/sdk';

const app = express();
app.use(express.json());

// Initialize KwickBit client with your API key from the KwickBit dashboard
const kwickbit = new KwickBit(process.env.KWICKBIT_API_KEY);

// Create checkout endpoint
app.post('/api/create-checkout', async (req, res) => {
  try {
    const { items, customerEmail } = req.body;

    const session = await kwickbit.createCheckoutSession({
      // Get the link ID from your KwickBit dashboard
      dynamicLinkId: process.env.KWICKBIT_DYNAMIC_LINK_ID,
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        currency: 'USD',
      })),
      collectEmail: true,
      collectBillingAddress: false,
    });

    res.json({
      success: true,
      checkoutUrl: session.checkoutSessionUrl,
      sessionId: session.checkoutSessionId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Fastify Example

```typescript
import Fastify from 'fastify';
import { KwickBit } from '@kwickbit/sdk';

const fastify = Fastify();

// Register KwickBit as a plugin (singleton pattern)
fastify.register(async (instance) => {
  // Get the API key from your KwickBit dashboard
  const kwickbit = new KwickBit(process.env.KWICKBIT_API_KEY);
  instance.decorate('kwickbit', kwickbit);
}, { name: 'kwickbit' });

// Create checkout endpoint
fastify.post('/api/create-checkout', async (request, reply) => {
  const { items } = request.body as any;

  const session = await request.server.kwickbit.createCheckoutSession({
    // Get the link ID from your KwickBit dashboard
    dynamicLinkId: process.env.KWICKBIT_DYNAMIC_LINK_ID,
    items: items.map((item: any) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      currency: 'USD',
    })),
    collectEmail: true,
    collectBillingAddress: false,
  });

  return {
    success: true,
    checkoutUrl: session.checkoutSessionUrl,
    sessionId: session.checkoutSessionId,
  };
});

fastify.listen({ port: 3000 });
```

## Managing KwickBit Client Instance

### Fastify Plugin Pattern

```typescript
// plugins/kwickbit.ts
import { FastifyPluginAsync } from 'fastify';
import { KwickBit } from '@kwickbit/sdk';

declare module 'fastify' {
  interface FastifyInstance {
    kwickbit: KwickBit;
  }
}

const kwickbitPlugin: FastifyPluginAsync = async (fastify) => {
  const kwickbit = new KwickBit(process.env.KWICKBIT_API_KEY!);
  fastify.decorate('kwickbit', kwickbit);
};

export default kwickbitPlugin;
```

### Express.js Singleton Pattern

```typescript
// services/kwickbit.ts
import { KwickBit } from '@kwickbit/sdk';

class KwickBitService {
  private static instance: KwickBit;

  static getInstance(): KwickBit {
    if (!KwickBitService.instance) {
      KwickBitService.instance = new KwickBit(process.env.KWICKBIT_API_KEY!);
    }
    return KwickBitService.instance;
  }
}

export default KwickBitService;

// In your routes
import KwickBitService from '../services/kwickbit';

app.post('/api/checkout', async (req, res) => {
  const kwickbit = KwickBitService.getInstance();
  // Use kwickbit instance...
});
``` 