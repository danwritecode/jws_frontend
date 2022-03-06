<template>
  <div class="bg-white min-h-[62vh]">
    <div>
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Your Cart</h1>
      <form v-if="cartId && !loading" class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul role="list" class="border-t border-b border-gray-200 divide-y divide-gray-200">
            <li :key="item.node.id" v-for="item in cart.lines.edges" class="flex py-6 sm:py-10">
              <div class="flex-shrink-0">
                <img :src="item.node.merchandise.image.url" alt="Front of men&#039;s Basic Tee in sienna." class="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48">
              </div>

              <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <a href="#" class="font-medium text-gray-700 hover:text-gray-800"> {{ item.node.merchandise.title }} </a>
                      </h3>
                    </div>
                    <div class="mt-1 flex text-sm">
                      <p class="text-gray-500">{{ getColor(item.node.merchandise.id) }}</p>
                      <p class="ml-4 pl-4 border-l border-gray-200 text-gray-500">{{ getSize(item.node.merchandise.id) }}</p>
                    </div>
                    <p class="mt-1 text-sm font-medium text-gray-900">{{ $helpers.formatPrice.format(item.node.merchandise.priceV2.amount) }}</p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                      <label for="quantity" class="sr-only">Quantity</label>
                      <select
                        :value="item.node.quantity"
                        @change="updateCartItem($event, item.node.id)"
                        id="quantity"
                        name="quantity"
                        :class="false ? 'border-red-200 ring-2 ring-red-300 focus:border-red-500 focus:ring-red-300':'border-zinc-300 focus:ring-zinc-500 focus:border-zinc-500'"
                        class="max-w-lg block w-20 shadow-sm sm:text-sm rounded-md mr-2 py-3 sm:py-3.5 transition-hover-300"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                      </select>

                    <div class="absolute top-0 right-0">
                      <button @click="[removeItemFromCart(item.node.id), lineItemToRemove = item.node.id]" type="button" class="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Remove</span>
                        <svg v-if="removeItemLoading && lineItemToRemove === item.node.id" class="animate-spin h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <p class="mt-4 flex text-sm text-gray-700 space-x-2">
                  <!-- Heroicon name: solid/check -->
                  <svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span>In stock</span>
                </p>
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section aria-labelledby="summary-heading" :class="updateItemLoading || loading ? 'animate-pulse':''" class="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600">Subtotal</dt>
              <svg v-if="updateItemLoading || loading" class="animate-spin h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <dd v-else class="text-sm font-medium text-gray-900">{{ $helpers.formatPrice.format(cart.estimatedCost.subtotalAmount.amount) }}</dd>
            </div>
            <!-- <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
              <dt class="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
                <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Learn more about how shipping is calculated</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                  </svg>
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">$5.00</dd>
            </div> -->
            <!-- <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
              <dt class="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Learn more about how tax is calculated</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                  </svg>
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">$8.32</dd>
            </div> -->
            <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
              <dt class="text-base font-medium text-gray-900">Order total</dt>
              <svg v-if="updateItemLoading || loading" class="animate-spin h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <dd v-else class="text-base font-medium text-gray-900">{{ $helpers.formatPrice.format(cart.estimatedCost.totalAmount.amount)}}</dd>
            </div>
          </dl>

          <div class="mt-6">
            <button @click="getCheckoutUrl()" type="button" class="transition-hover-300 w-full bg-zinc-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-zinc-500">Checkout</button>
          </div>
        </section>
      </form>

      <div v-else>
        <p class="mt-10 text-gray-600">There are no items in your shopping cart.</p>
      </div>

    </div>
  </div>

</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import { GET_CART, REMOVE_CART_ITEM, UPDATE_CART_ITEM, GET_CHECKOUT_URL } from '@/api/queries'

const { $helpers } = useNuxtApp()

const cartQueryEnabled = ref(false)

const options = reactive({
  enabled: false
})

const cartId = useState("cartId")
const { result, loading, onError, refetch } = useQuery(GET_CART, () => ({ cartId: cartId.value }), options)
const cart = useResult(result, null, data => data.cart)

onError(error => {
  console.log(error)
})

if(cartId.value) {
  options.enabled = true
  refetch()
}

const getColor = (productId) => {
  for (const item of cart.value.lines.edges) {
    if(item.node.merchandise.id === productId && item.node.merchandise.selectedOptions) {
      for (const option of item.node.merchandise.selectedOptions) {
        if(option.name === 'Color') return option.value
      }
    }
  }
}

const getSize = (productId) => {
  for (const item of cart.value.lines.edges) {
    if(item.node.merchandise.id === productId && item.node.merchandise.selectedOptions) {
      for (const option of item.node.merchandise.selectedOptions) {
        if(option.name === 'Size') return option.value
      }
    }
  }
}


//#region Cart Modifications
const lineItemToRemove = ref(null)

const removeItemFromCart = (lineId) => {
  removeItemFromCartMut({
    cartId: cartId.value,
    lineIds: [
      lineId
    ]
  })
}

const { mutate: removeItemFromCartMut, loading: removeItemLoading, onDone: deleteComplete , onError: deleteError } = useMutation(REMOVE_CART_ITEM)

deleteComplete(result => {
  console.log(result)
  options.enabled = true
  refetch()
})

deleteError(error => {
  console.log(error)
})


const updateCartItem = (event, lineId) => {
  updateCartItemMut({
    cartId: cartId.value,
    lines: {
      id: lineId,
      quantity: parseInt(event.target.value)
    }
  })
}

const { mutate: updateCartItemMut, loading: updateItemLoading, onDone: updateComplete , onError: updateError } = useMutation(UPDATE_CART_ITEM)

updateComplete(result => {
  options.enabled = true
  refetch()
})

updateError(error => {
  console.log(error)
})

//#endregion

//#region Checkout
const checkoutQueryOptions = reactive({
  enabled: false
})

const { result: checkoutUrlResult, loading: checkoutUrlLoading, onError: getCheckoutError , refetch: getCheckoutUrlRefetch } = useQuery(GET_CHECKOUT_URL, () => ({ cartId: cartId.value }), checkoutQueryOptions)
const checkoutUrl = useResult(checkoutUrlResult, null, data => data.cart.checkoutUrl)


getCheckoutError(error => {
  console.log(error)
})

watch(checkoutUrl, () => {
  console.log(checkoutUrl.value)
  window.location.href = checkoutUrl.value
})

const getCheckoutUrl = () => {
  checkoutQueryOptions.enabled = true
  getCheckoutUrlRefetch()
}

//#endregion

</script>