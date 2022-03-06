import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const formatPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  
  return {
    provide: {
      helpers: {
        formatPrice
      }
    }
  }
});