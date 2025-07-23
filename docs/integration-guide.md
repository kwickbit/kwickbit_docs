# Integration Guide

This guide provides an overview of integrating KwickBit payments into your application. For detailed implementation examples, see the specific guides below.

## Overview

KwickBit integration consists of two main components:

1. **Backend Integration** - Handle checkout session creation and webhook processing
2. **Frontend Integration** - Display payment buttons and handle user interactions

## Quick Start

1. **Install the SDK**
   ```bash
   npm install @kwickbit/sdk
   ```

2. **Set up your backend** - See [Backend Integration](./backend-integration.md) for Express.js and Fastify examples

3. **Add frontend components** - See [Frontend Integration](./frontend-integration.md) for React, Vue.js, and vanilla JavaScript examples

## Environment Variables

You'll need to set up these environment variables:

- `KWICKBIT_API_KEY` - Your API key from the KwickBit dashboard
- `KWICKBIT_DYNAMIC_LINK_ID` - Your dynamic link ID from the KwickBit dashboard

### API Keys

You only need **one API key** for your entire application. This key is used to authenticate all requests to the KwickBit API.

To get your API key:
1. Go to [Settings > API Keys](https://dashboard.kwickbit.com/settings/api-keys)
2. Click "+ Create API Key"
3. Give your key a descriptive label
4. Copy the generated key and store it securely

![API Key Management](/img/api-keys-screenshot.png)

### Dynamic Links

While you only need one API key, you can create **multiple dynamic links** for different use cases:

- **Different stores** - Create separate links for each store
- **Testing environments** - Use sandbox links for development
- **Different products** - Create links for specific product categories

To create a dynamic link:
1. Go to [Payment Links](https://dashboard.kwickbit.com/payment-links)
2. Click "+ Create a new link"
3. Select "Dynamic" as the link type
4. Choose your blockchain network (Sandbox/Testnet or Production/Mainnet)
5. Copy the generated link ID

![Payment Links Management](/img/payment-links-screenshot.png)

## Next Steps

- [Backend Integration](./backend-integration.md) - Complete backend implementation examples
- [Frontend Integration](./frontend-integration.md) - Frontend component examples
- [API Reference](./api-reference.md) - Complete API documentation