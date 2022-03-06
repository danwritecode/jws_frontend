<template>
  <div>
    <div class="bg-white">
      <nav class="flex" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
          <li>
            <div>
              <nuxt-link to="/" class="text-zinc-400 hover:text-zinc-500 transition-hover-300">
                <!-- Heroicon name: solid/home -->
                <svg class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span class="sr-only">Home</span>
              </nuxt-link>
            </div>
          </li>

          <li>
            <div class="flex items-center">
              <!-- Heroicon name: solid/chevron-right -->
              <svg class="flex-shrink-0 h-5 w-5 text-zinc-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <nuxt-link to="/shop" class="ml-4 text-sm font-medium text-zinc-400 hover:text-zinc-600 transition-hover-300">Shop</nuxt-link>
            </div>
          </li>

          <li v-if="!loading"> 
            <div class="flex items-center">
              <!-- Heroicon name: solid/chevron-right -->
              <svg class="flex-shrink-0 h-5 w-5 text-zinc-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="ml-4 text-sm font-medium text-zinc-400">{{ product.title }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div>
        <!-- Images -->
        <div v-if="!loading && product.images.edges.length >= 4" class="mt-6 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div class="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <img v-if="!selectedProductImgUrl" :src="product.images.edges[0].node.url" alt="Two each of gray, white, and black shirts laying flat." class="w-full h-full object-center object-cover">
            <img v-else :src="selectedProductImgUrl" alt="Two each of gray, white, and black shirts laying flat." class="w-full h-full object-center object-cover">
          </div>
          <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img :src="product.images.edges[1].node.url" alt="Model wearing plain black basic tee." class="w-full h-full object-center object-cover">
            </div>
            <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img :src="product.images.edges[2].node.url" alt="Model wearing plain gray basic tee." class="w-full h-full object-center object-cover">
            </div>
          </div>
          <div class="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <img :src="product.images.edges[3].node.url" alt="Model wearing plain white basic tee." class="w-full h-full object-center object-cover">
          </div>
        </div>
        <div v-else class="mt-6 lg:grid lg:grid-cols-3 lg:gap-x-8 animate-pulse">
          <div class="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <div class="w-full h-full bg-zinc-200"></div>
          </div>
          <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <div class="w-full h-full bg-zinc-200"></div>
            </div>
            <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <div class="w-full h-full bg-zinc-200"></div>
            </div>
          </div>
          <div class="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <div class="w-full h-full bg-zinc-200"></div>
          </div>
        </div>


        <!-- Product info -->
        <div v-if="!loading" class="pt-10 pb-16 lg:pt-16 lg:pb-24 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div class="lg:col-span-2 lg:border-r lg:border-zinc-200 lg:pr-8">
            <h1 class="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">{{ product.title }}</h1>
          </div>

          <!-- Options -->
          <div class="mt-4 lg:mt-0 lg:row-span-3">
            <h2 class="sr-only">Product information</h2>
            <p class="text-3xl text-zinc-900">{{ $helpers.formatPrice.format(unitPrice) }}</p>

            <form class="mt-10">
              <div v-if="productColors.length > 0">
                <h3 class="text-sm text-zinc-900 font-medium">Color</h3>
                <fieldset class="mt-4">
                  <legend class="sr-only">Choose a color</legend>
                  <div class="flex items-center space-x-3">
                    <label :key="color" v-for="color in productColors" :class="color === selectedColor ? 'ring-2':''" class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-zinc-400 hover:ring-1 transition-hover-300">
                      <input @click="selectColor(color)" type="radio" name="color-choice" :value="color" class="sr-only" aria-labelledby="color-choice-0-label">
                      <p id="color-choice-0-label" class="sr-only">{{ color }}</p>
                      <span aria-hidden="true" :class="getTailwindColor(color)" class="h-8 w-8 border border-black border-opacity-10 rounded-full"></span>
                    </label>
                  </div>
                </fieldset>
              </div>

              <!-- Sizes -->
              <div class="mt-10">
                <fieldset class="mt-4">
                  <legend class="sr-only">Choose a size</legend>
                  <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    
                    <div :key="size.size" v-for="size in productSizes">
                      <label v-if="size.quantity === 0" class="group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-zinc-50 focus:outline-none sm:flex-1 sm:py-6 bg-zinc-50 text-zinc-200 cursor-not-allowed">
                        <input type="radio" name="size-choice" :value="size.size" disabled class="sr-only" aria-labelledby="size-choice-0-label">
                        <p id="size-choice-0-label">{{ size.size }}</p>

                        <div aria-hidden="true" class="absolute -inset-px rounded-md border-2 border-zinc-200 pointer-events-none">
                          <svg class="absolute inset-0 w-full h-full text-zinc-200 stroke-2" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                            <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
                          </svg>
                        </div>
                      </label>
                      <label v-else :class="size.size === selectedSize ? 'ring-2 ring-zinc-500':''" class="group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-zinc-50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-zinc-900 cursor-pointer transition-hover-300">
                        <input @click="selectSize(size.size)" type="radio" name="size-choice" :value="size.size" class="sr-only" aria-labelledby="size-choice-1-label">
                        <p id="size-choice-1-label">{{ size.size }}</p>
                        <div class="absolute -inset-px rounded-md pointer-events-none" aria-hidden="true"></div>
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div class="mt-10 flex items-center">
                <label for="quantity" class="sr-only">Quantity</label>
                <select
                  v-model="enteredItemQuantity"
                  id="quantity"
                  name="quantity"
                  :class="insufficientInventory || invalidEnteredItemQuantity ? 'border-red-200 ring-2 ring-red-300 focus:border-red-500 focus:ring-red-300':'border-zinc-300 focus:ring-zinc-500 focus:border-zinc-500'"
                  class="max-w-lg block w-20 shadow-sm sm:text-sm rounded-md mr-2 py-3 sm:py-3.5 transition-hover-300"
                >
                  <option selected>1</option>
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
                <div :class="cartItemAdded ? 'grid-cols-2':'grid-cols-1'" class="w-full grid gap-2">
                  <GlobalSubmitButton @click="addToCart()" text="Add to cart" color="zinc" size="xl" :loading="cartLoading" :disabled="!selectedProductId || insufficientInventory || invalidEnteredItemQuantity" class="w-full" />
                  <nuxt-link v-if="cartItemAdded" to="/cart" class="w-full inline-flex items-center justify-center border border-transparent font-medium rounded-md shadow-sm text-white bg-zinc-600 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-hover-300">View cart</nuxt-link>
                </div>
              </div>
              <div v-if="insufficientInventory" class="mt-3">
                <p v-if="insufficientInventory" class="text-sm text-zinc-500">&#9432; Quantity entered exceeds available inventory</p>
              </div>
              <GlobalFormSubmitAlert 
                :success="cartItemAdded"  
                successTitle="Item added"
                successMsg="Item successfully added to your cart."
                errorTitle="Errr, something went wrong"
                errorMsg="We weren't able to add the item to your cart. Reach out to us at: rich@jewswithscrews.com"
                class="mt-5"
                v-if="cartItemAdded !== null"
              />
            </form>
          </div>

          <div class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-zinc-200 lg:pr-8">
            <div>
              <h3 class="sr-only">Description</h3>

              <div class="space-y-6 text-base text-zinc-900 prose">
                <div v-html="product.descriptionHtml"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script setup>
import _uniq from 'lodash/uniq' 
import { useQuery, useMutation, useResult } from '@vue/apollo-composable'
import { GET_PRODUCT_BY_HANDLE, CREATE_CART, ADD_TO_CART } from '@/api/queries'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { loading, result } = useQuery(GET_PRODUCT_BY_HANDLE, {handle: route.params.id})
const product = useResult(result, null, data => data.productByHandle)

const vendor = computed(() => { return product.value.vendor })
const variants = computed(() => { return product.value.variants.edges })

// #region Meta
const config = useRuntimeConfig();
const baseUrl = config.BASE_URL

const meta = useMeta({
  title: computed(() => `JWS - ${product.title}`),
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    { hid: 'description', name: 'description', content: computed(() => product.description) },
    { hid: 'image', name: 'image', content: `${baseUrl}/jws_logo.png` },
    { name: 'twitter:card', content: "summary_large_image"},
    { name: 'twitter:title', content: computed(() => `JWS - ${product.title}`)},
    { name: 'twitter:description', content: computed(() => product.description) },
    { name: 'twitter:image', content: `${baseUrl}/jws_logo.png`}
  ]
})
// #endregion

// #region Selection
const selectedSize = ref(null)
const selectedColor = ref(null)
const selectedCursor = ref(null)
const selectedProductId = ref(null)
const selectedProductQuantity = ref(null)
const selectedProductImgUrl = ref(null)

const selectColor = (color) => {
  color === selectedColor.value ? selectedColor.value = null : selectedColor.value = color
}
const selectSize = (size) => {
  size === selectedSize.value ? selectedSize.value = null : selectedSize.value = size
}

// Watcher to set the selectedCursor
watch([selectedSize, selectedColor], ([newSize, newColor]) => {
  if(selectedSize.value && selectedColor.value) {
    for (const edge of variants.value) {
      const options = edge.node.selectedOptions
      const color = options.filter(option => option.name === 'Color')[0].value // create new array of color options, get value
      const size = options.filter(option => option.name === 'Size')[0].value // create new array of color options, get value

      if(newColor.toLowerCase() === color.toLowerCase() && newSize.toLowerCase() === size.toLowerCase()) {
        selectedCursor.value = edge.cursor
        selectedProductId.value = edge.node.id
        selectedProductImgUrl.value = edge.node.image.url
        selectedProductQuantity.value = vendor.value === 'Printify' ? 10:edge.node.quantityAvailable
      }
    }
  } else {
    selectedCursor.value = null
    selectedProductId.value = null
    selectedProductImgUrl.value = null
  }
})

// #endregion

// #region Pricing
const unitPrice = computed(() => {
  if(selectedCursor.value) {
    return variants.value.find(e => e.cursor === selectedCursor.value).node.priceV2.amount
  } else {
    return product.value.priceRange.minVariantPrice.amount
  }
})
// #endregion

// #region Sizing
const sortSizes = (sizes) => {
  const controlOrder = ['4xs','3xs','2xs','xs','s','m','l','xl','2xl','3xl','4xl','5xl']
  sizes.sort((a,b) => controlOrder.indexOf(a.size.toLowerCase()) - controlOrder.indexOf(b.size.toLowerCase()))
  return sizes
}

const addSizes = (sizes, size, availQuantity) => {
  if(sizes.findIndex(s => s.size === size) === -1) {
    sizes.push({
      quantity: availQuantity,
      size: size
    })
  } else {
    const existingSize = sizes.find(s => s.size === size)
    const existingSizeIndex = sizes.findIndex(s => s.size === size)
    sizes.splice(existingSizeIndex, 1, {
      quantity: existingSize.quantity + availQuantity,
      size: size
    })
  }
  return sizes
}

const productSizes = computed(() => {
  // loop through each variant
  let sizes = []
  for (const edge of variants.value) {
    const options = edge.node.selectedOptions // assign the selectedOptions array
    const availQuantity = vendor.value === 'Printify' ? 1:edge.node.quantityAvailable // Printity products always have quantity of 0, so need to override this
    try {
      const color = options.filter(option => option.name === 'Color')[0].value // create new array of color options, get value
      const size = options.filter(option => option.name === 'Size')[0].value // create new array of size options, get value
      if(!selectedColor.value) {
        sizes = addSizes(sizes, size, availQuantity)
      } else if(selectedColor.value.toLowerCase() === color.toLowerCase() && availQuantity > 0) {
        sizes = addSizes(sizes, size, availQuantity)
      } else {
        sizes = addSizes(sizes, size, 0)
      }
    } catch {
      return []
    }
  }
  return sortSizes(sizes)
})
// #endregion

// #region Colors
const productColors = computed(() => {
  // loop through each variant
  const colors = []
  for (const edge of variants.value) {
    const options = edge.node.selectedOptions // assign the selectedOptions array
    const availQuantity = vendor.value === 'Printify' ? 1:edge.node.quantityAvailable // Printity products always have quantity of 0, so need to override this

    try {
      const color = options.filter(option => option.name === 'Color')[0].value // create new array of color options, get value
      const size = options.filter(option => option.name === 'Size')[0].value // create new array of size options, get value

      if(!selectedSize.value) {
        colors.push(color)
      } else if(selectedSize.value.toLowerCase() === size.toLowerCase() && availQuantity > 0) { // if matching and there is stock
        colors.push(color)
      }
    } catch {
      return []
    }
  }
  return _uniq(colors.sort())
})

const getTailwindColor = (color) => {
  const colorLower = color.toLowerCase()
  if(colorLower === 'black' || colorLower === 'white') {
    return `bg-${colorLower}`
  } else {
    return `bg-${colorLower}-600`
  }
}
// #endregion

// #region Cart
const cartItemAdded = ref(null)
const enteredItemQuantity = ref(1)
const enteredItemQuantityInt = computed(() => parseInt(enteredItemQuantity.value))
const cartId = useState('cartId')
const totalCartItems = useState('totalCartItems')

const invalidEnteredItemQuantity = computed(() => {
  if (enteredItemQuantity.value) return false
  return true
})

const insufficientInventory = computed(() => {
  if (selectedProductQuantity.value && selectedProductQuantity.value < enteredItemQuantity.value) return true
  return false
})

const cartLoading = computed(() => {
  if (newCartLoading.value || existingCartLoading.value) return true
  return false
})

const addToCart = () => {
  if(cartId.value) {
    addToCartExisting()
  } else {
    addToCartNew()
  }
}

const { mutate: addToCartNew, loading: newCartLoading, onDone: newCartComplete , onError: newCartError } = useMutation(CREATE_CART, () => ({
  variables: {
    cartInput: {
      lines: [
        {
          quantity: enteredItemQuantityInt.value,
          merchandiseId: selectedProductId.value
        }
      ],
    }
  }
}))

newCartComplete(result => {
  cartId.value = result.data.cartCreate.cart.id
  totalCartItems.value = enteredItemQuantity.value
  cartItemAdded.value = true
})

newCartError(error => {
  cartItemAdded.value = false
  console.log(error)
})


const { mutate: addToCartExisting, loading: existingCartLoading, onDone: existCartComplete , onError: existCartError } = useMutation(ADD_TO_CART, () => ({
  variables: {
    cartId: cartId.value,
    lines: {
      quantity: enteredItemQuantityInt.value,
      merchandiseId: selectedProductId.value
    }
    
  }
}))

existCartComplete(result => {
  totalCartItems.value += enteredItemQuantity.value
  cartItemAdded.value = true
})

existCartError(error => {
  console.log(error)
  cartItemAdded.value = false
})

// #endregion
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>