---
sidebar_position: 1
---

# What is KwickBit?

KwickBit is a payment processing platform that enables seamless stablecoin payments for your Web stores. The KwickBit SDK provides a simple, developer-friendly way to generate KwickBit checkout sessions and integrate them into your frontend.

## What does the SDK solve?

- **Simplified Payment Integration**: Create checkout sessions with just a few lines of code
- **Stablecoin Support**: Accept payments in multiple stablecoins through a unified API
- **Secure Payment Flow**: Handle payment processing securely with API key authentication
- **Flexible Configuration**: Customize checkout forms to collect only the information you need

## Quick Payment Flow Overview

Your frontend shows a payment button. When clicked by the user:

![Payment Flow diagram](/img/payment-flow-diagram.svg)

1. **Call Your Backend**: The frontend sends a request to your backend to initiate the payment.
2. **Create Checkout Session via KwickBit SDK**: Your backend uses your API key and the KwickBit SDK to call the KwickBit API, creating a checkout session and retrieving the checkout payment link.
3. **Return Checkout Link to Frontend**: Your backend responds to the frontend with the checkout payment link.
4. **Redirect User to Checkout Page**: The frontend redirects the user to the KwickBit checkout page using the provided session link.
5. **Handle Payment Completion**:
   * 5A. After payment, the user is redirected back to your specified redirect page.
   * 5B. After payment, KwickBit sends a payment status notification to your backend via a webhook (using either the default webhook or the one you specify with the SDK).

The SDK abstracts away the complexity of payment processing, allowing you to focus on your core business logic while providing a secure, user-friendly payment experience.
