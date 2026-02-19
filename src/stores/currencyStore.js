import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useCurrencyStore = defineStore("currencyStore", () => {
  const currency = ref("USD");
  const exchangeRates = ref({USD: 1.0});
    
  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('https://open.er-api.com/v6/latest/USD');
      exchangeRates.value = response.data.rates;
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  const setCurrency = (newCurrency) => {
    currency.value = newCurrency;
  };

  return {
    currency,
    exchangeRates,
    fetchExchangeRates,
    setCurrency
  };
}, {
  persist: {
    paths: ['currency'] // Only persist the choice, not the rates (fetch fresh rates daily)
  }
});