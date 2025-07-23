# API Reference

## KwickBit SDK

### Constructor

```typescript
new KwickBit(apiKey: string, options?: KwickBitOptions)
```

**Parameters:**
- `apiKey` (string, required): Your KwickBit API key, taken from the KwickBit dashboard
- `options` (object, optional): Configuration options
  - `baseUrl` (string, optional): Custom API base URL (defaults to `https://api.kwickbit.com`)

**Example:**
```typescript
const kwickbit = new KwickBit('your-api-key-here', {
  baseUrl: 'https://api-staging.kwickbit.com'
});
```

## createCheckoutSession

Creates a new checkout session for payment processing.

### Method Signature

```typescript
public async createCheckoutSession(options: CreateCheckoutSessionOptions): Promise<CheckoutSessionResponse>
```

### Parameters

#### CreateCheckoutSessionOptions

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dynamicLinkId` | string | Yes | UUID for the dynamic link |
| `items` | LineItem[] | Yes | Array of items to purchase |
| `collectEmail` | boolean | No | Whether to collect customer email (default: true) |
| `collectBillingAddress` | boolean | No | Whether to collect billing address (default: true) |

#### LineItem

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Product name |
| `price` | number | Yes | Unit price (minimum: 0) |
| `quantity` | number | Yes | Quantity (minimum: 1) |
| `currency` | string | Yes | Currency code (3 characters, e.g., "USD") |
| `image_url` | string | No | Product image URL |

### Return Value

#### CheckoutSessionResponse

```typescript
{
  checkoutSessionId: string;
  checkoutSessionUrl: string;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `checkoutSessionId` | string | Unique identifier for the checkout session |
| `checkoutSessionUrl` | string | URL where customers complete payment |

### Example Usage

```typescript
import { KwickBit, LineItem } from '@kwickbit/sdk';

const kwickbit = new KwickBit('your-api-key');

const items: LineItem[] = [
  {
    name: 'Premium Subscription',
    price: 29.99,
    quantity: 1,
    currency: 'USD',
    image_url: 'https://example.com/product.jpg'
  },
  {
    name: 'Add-on Service',
    price: 9.99,
    quantity: 2,
    currency: 'USD'
  }
];

try {
  const session = await kwickbit.createCheckoutSession({
    dynamicLinkId: '550e8400-e29b-41d4-a716-446655440000',
    items,
    collectEmail: true,
    collectBillingAddress: false,
  });

  console.log('Checkout URL:', session.checkoutSessionUrl);
  console.log('Session ID:', session.checkoutSessionId);
} catch (error) {
  console.error('Failed to create checkout session:', error.message);
}
```

### Error Handling

The method throws an `Error` with descriptive messages for various failure scenarios:

```typescript
try {
  const session = await kwickbit.createCheckoutSession(options);
} catch (error) {
  if (error.message.includes('401')) {
    console.error('Invalid API key');
  } else if (error.message.includes('400')) {
    console.error('Invalid request parameters');
  } else if (error.message.includes('500')) {
    console.error('Server error');
  } else {
    console.error('Network or other error:', error.message);
  }
}
```

### Common Error Scenarios

| HTTP Status | Description | Common Causes |
|-------------|-------------|---------------|
| 401 | Unauthorized | Invalid or missing API key |
| 400 | Bad Request | Invalid parameters (e.g., missing required fields, invalid UUID) |
| 422 | Validation Error | Invalid item data (negative prices, invalid currency codes) |
| 500 | Server Error | Internal server error |

### Validation Rules

- `dynamicLinkId` must be a valid UUID format
- `items` array cannot be empty
- Each item must have valid `name`, `price`, `quantity`, and `currency`
- `price` must be non-negative
- `quantity` must be at least 1
- `currency` must be exactly 3 characters
- `image_url` (if provided) must be a valid URL format
