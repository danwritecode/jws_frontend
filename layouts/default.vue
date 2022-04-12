<template>
  <div>
    <nav class="pt-5">
      <div class="flex justify-between items-center xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-12">
        <div>
          <nuxt-link to="/">
            <img src="~/assets/img/jws_avatar_j.svg" alt="JWS Logo" class="h-10 w-auto">
          </nuxt-link>
        </div>
        <div class="space-x-5 text-zinc-500 font-medium flex">
          <nuxt-link to="/shop" class="hover:text-zinc-600 transition-hover-300">Shop</nuxt-link>
          <!-- <nuxt-link to="/about" class="hover:text-zinc-600 transition-hover-300">About</nuxt-link> -->
          <nuxt-link to="/contact" class="hover:text-zinc-600 transition-hover-300">Contact</nuxt-link>
          <div class="pl-5">
            <nuxt-link to="/cart" class="group flex flex-row-reverse">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-zinc-600 transition-hover-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span class="mr-0.5 text-white text-xs w-5 h-5 flex items-center justify-center bg-zinc-500 rounded-md top-0 right-0 group-hover:bg-zinc-600 transition-hover-300">
                {{ cartSize }}
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
    <div class="xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-12 pt-8 pb-24 sm:pt-16 sm:pb-32">
      <slot />
    </div>

    <GlobalFooter />
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_CART_LITE } from '@/api/queries'

const cartQueryEnabled = ref(false)

const options = reactive({
  enabled: false,
})

const cartId = useState("cartId")
const totalCartItems = useState('totalCartItems')


const { result, onError, refetch } = useQuery(GET_CART_LITE, () => ({ cartId: cartId.value }), options)
const cart = useResult(result, null, data => data.cart)

onError(error => {
  console.log(error)
})

// when cartId updates, enable the query and refetch it
watch([cartId, totalCartItems], () => {
  options.enabled = true
  refetch()
})

if(cartId.value) {
  options.enabled = true
  refetch()
}


const cartSize = computed(() => {
  let totalQuantity = 0
  if(cart.value) {
    for (const item of cart.value.lines.edges) {
      totalQuantity += item.node.quantity
    }
    return totalQuantity
  }
  return 0
})

// gtag
if(process.client) {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-6XE80QRRN0');
}

</script>