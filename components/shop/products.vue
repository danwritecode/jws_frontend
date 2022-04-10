<template>
  <div class="pb-10">
    <div>
      <div>
        <h2 class="sr-only">Products</h2>
        <div class="border-b border-gray-200">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">Our Products</h1>
          <p class="mt-4 text-base text-gray-500">Support us and rep our swag.</p>
        </div>

        <div v-if="!loading" class="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <nuxt-link :to="'/shop/' + product.node.handle" :key="product.node.id" v-for="product in products" href="#" class="group">
            <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <img :src="product.node.featuredImage.url" class="w-full h-full object-center object-cover group-hover:opacity-75 transition-hover-300" :alt="'product' + product.node.title">
            </div>
            <h3 class="mt-4 text-sm text-gray-700">{{ product.node.title }}</h3>
            <p class="mt-1 text-lg font-medium text-gray-900">{{ $helpers.formatPrice.format(product.node.priceRange.minVariantPrice.amount) }}</p>
          </nuxt-link>
        </div>
        <div v-else class="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 animate-pulse">
          <div :key="n" v-for="n in [0,1,2,3,4]">
            <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <div class="w-full h-full bg-zinc-200"></div>
            </div>
            <div class="mt-4 h-4 w-32 bg-zinc-200 rounded-lg"></div>
            <div class="mt-2 h-7 w-20 bg-zinc-200 rounded-lg"></div>
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
const products = useResult(result, null, data => data.products.edges)

</script>