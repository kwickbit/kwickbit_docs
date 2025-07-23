# Frontend Integration

This guide shows how to integrate KwickBit payments into your frontend application.

## React Example

```typescript
import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutResponse {
  success: boolean;
  checkoutUrl?: string;
  error?: string;
}

const CheckoutButton = ({ items }: { items: CartItem[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout-with-kwickbit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data: CheckoutResponse = await response.json();

      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setError(data.error || 'Failed to create checkout');
      }
    } catch (error) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        onClick={handleCheckout}
        className="kwickbit-button"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 20px',
          background: '#4A56FF',
          color: 'white',
          borderRadius: '4px',
          margin: '20px 0',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          width: 'fit-content',
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        <div className="kwickbit-text" style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
          <div className="kwickbit-primary" style={{ fontWeight: 'bold', fontSize: '16px' }}>
            {isLoading ? 'Processing...' : 'Pay with crypto'}
          </div>
          <div className="kwickbit-secondary" style={{ fontSize: '12px', opacity: 0.8 }}>
            Powered by KwickBit
          </div>
        </div>
        <img
          src="https://kwickbit.com/storage/2023/10/Kwickbit_logo.svg"
          alt="KwickBit Logo"
          className="kwickbit-logo"
          style={{ height: '24px', marginRight: '10px' }}
        />
      </div>
      {error && (
        <div style={{ color: '#e74c3c', marginTop: '10px', fontSize: '14px' }}>
          {error}
        </div>
      )}
    </div>
  );
};
```

## Vanilla JavaScript Example

```javascript
async function createCheckout(items) {
  try {
    const response = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    const data = await response.json();

    if (data.success) {
      // Redirect to checkout
      window.location.href = data.checkoutUrl;
    } else {
      alert('Failed to create checkout: ' + data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while creating checkout');
  }
}

// Usage
const cartItems = [
  { name: 'Product 1', price: 29.99, quantity: 1 },
  { name: 'Product 2', price: 19.99, quantity: 2 },
];

document.getElementById('checkout-btn').addEventListener('click', () => {
  createCheckout(cartItems);
});
```

## Vue.js Example

```vue
<template>
  <div>
    <div
      @click="handleCheckout"
      class="kwickbit-button"
      :class="{ 'loading': isLoading }"
    >
      <div class="kwickbit-text">
        <div class="kwickbit-primary">
          {{ isLoading ? 'Processing...' : 'Pay with crypto' }}
        </div>
        <div class="kwickbit-secondary">Powered by KwickBit</div>
      </div>
      <img
        src="https://kwickbit.com/storage/2023/10/Kwickbit_logo.svg"
        alt="KwickBit Logo"
        class="kwickbit-logo"
      />
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const isLoading = ref(false)
const error = ref(null)

const handleCheckout = async () => {
  isLoading.value = true
  error.value = null

  try {
    const response = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: props.items }),
    })

    const data = await response.json()

    if (data.success && data.checkoutUrl) {
      window.location.href = data.checkoutUrl
    } else {
      error.value = data.error || 'Failed to create checkout'
    }
  } catch (err) {
    error.value = 'Network error occurred'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.kwickbit-button {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: #4A56FF;
  color: white;
  border-radius: 4px;
  margin: 20px 0;
  cursor: pointer;
  width: fit-content;
}

.kwickbit-button:hover {
  background: #3A46EF;
}

.kwickbit-button.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.kwickbit-logo {
  height: 24px;
  margin-right: 10px;
}

.kwickbit-text {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.kwickbit-primary {
  font-weight: bold;
  font-size: 16px;
}

.kwickbit-secondary {
  font-size: 12px;
  opacity: 0.8;
}

.error-message {
  color: #e74c3c;
  margin-top: 10px;
  font-size: 14px;
}
</style>
``` 