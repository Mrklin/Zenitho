import { useCounterStore } from "@/stores/currencyStore";

export function formatPrice(basePrice) {
  const store = useCounterStore();

  const rate = store.exchangeRates[store.currency] || 1.0;

  const convertedPrice = basePrice * rate;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: store.currency,
    minimumFractionDigits: 2
  }).format(convertedPrice);
}