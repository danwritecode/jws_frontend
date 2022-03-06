<template>
  <div>
    <div v-if="!loading" class="bg-white">
      <div class="py-16 px-4 sm:py-24">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">Featured Products</h2>
        <p class="mt-1 text-lg text-zinc-400 sm:text-xl md:max-w-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div :key="product.node.id" v-for="product in result.products.edges" class="group relative">
            <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none transition-hover-300">
              <img :src="product.node.featuredImage.url" alt="Front of men&#039;s Basic Tee in black." class="w-full h-full object-center object-cover lg:w-full lg:h-full">
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <nuxt-link :to="'/shop/' + product.node.handle">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    {{ product.node.title }}
                  </nuxt-link>
                </h3>
                <p class="mt-1 text-sm text-gray-500">{{ product.node.variants.edges[0].node.title}}</p>
              </div>
              <p class="text-sm font-medium text-gray-900">{{ $helpers.formatPrice.format(product.node.variants.edges[0].node.priceV2.amount) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_PRODUCTS } from '@/api/queries'

const { loading, result } = useQuery(GET_PRODUCTS)

</script>