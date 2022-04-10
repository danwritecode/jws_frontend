<template>
  <div v-if="!loading && featuredDropValid">
    <h6 class="mb-1 text-zinc-200 font-black text-xl">Exclusive drop</h6>
    <nuxt-link :to="'/shop/' + featuredProduct.handle">
      <div class="sm:flex sm:justify-between sm:space-x-6 lg:space-x-2 xl:space-x-6 p-2 border border-zinc-400 hover:border-zinc-200 transition-hover-300 rounded-md h-auto">
        <div class="flex flex-col md:flex-row sm:space-x-6 lg:space-x-2 xl:space-x-6">
          <div class="shrink-0 w-full h-48 md:w-40 md:h-40 xl:h-32 2xl:h-full">
            <img :src="featuredProduct.featuredImage.url" alt="Featured product image" class="h-full w-full rounded-md object-cover object-top">
          </div>
          <div class="shrink mt-3 md:mt-0 lg:mt-3 xl:mt-0">
            <h3 class="text-zinc-100 font-black text-xl">{{ featuredProduct.title }}</h3>
            <p class="text-zinc-400 text-sm line-clamp-4 xl:line-clamp-3 2xl:line-clamp-none">{{ featuredProduct.description }}</p>
          </div>
        </div>
        <div class="mt-3 sm:mt-0 w-48 shrink-0 flex items-center sm:border-l sm:border-zinc-700 sm:pl-6">
          <div v-if="timeLeft" class="flex flex-col">
            <span class="text-zinc-100 font-black text-4xl xl:text-3xl 2xl:text-4xl">{{ timeLeft.days }} days</span>
            <span class="text-zinc-100 font-black text-4xl xl:text-3xl 2xl:text-4xl">{{ timeLeft.hours }}:{{timeLeft.minutes}}:{{timeLeft.seconds}}</span>
            <span class="text-zinc-100 font-black text-4xl xl:text-3xl 2xl:text-4xl">left</span>
            <span class="mt-1 text-zinc-400 text-xs">expires: {{ featuredProduct.metafield.value }}</span>
          </div>
          <div class="flex flex-col" v-else>
            <span class="bg-zinc-100 animate-pulse h-6 w-20 mt-3 rounded-full"></span>
            <span class="bg-zinc-100 animate-pulse h-6 w-32 mt-3 rounded-full"></span>
            <span class="text-zinc-100 font-black text-4xl mt-2.5">left</span>
            <span class="mt-1 text-zinc-400 text-xs">expires: {{ featuredProduct.metafield.value }}</span>
          </div>
        </div>
      </div>
    </nuxt-link>
    <!-- <div v-else class="mt-5 h-96 sm:h-80 md:h-[10.1rem] lg:h-80 xl:h-[10.1rem] xl:w-full border border-gray-500 rounded-md animate-pulse"></div> -->
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_FEATURED_PRODUCTS } from '@/api/queries'
import { compareAsc, intervalToDuration  } from 'date-fns'

const { loading, result } = useQuery(GET_FEATURED_PRODUCTS)
const featuredProduct = useResult(result, null, data => data.collection.products.edges[0].node)

const timeLeft = ref(null)

onMounted(() => {
  if(result.value) {
    setTimeLeft()
  }
})

watch(featuredProduct, () => {
  setTimeLeft()
})

const featuredDropValid = computed(() => {
  const dateSplit = featuredProduct.value.metafield.value.split("-")
  const dropExpir = new Date(dateSplit[0],dateSplit[1]-1,dateSplit[2])
  const compResult = compareAsc(dropExpir, new Date())
  
  return compResult === 1 ? true:false
})

const setTimeLeft = () => {
  const dateSplit = featuredProduct.value.metafield.value.split("-")
  let dateNow = new Date()

  setTimeout(() => {
    const duration = intervalToDuration({
      start: new Date(dateSplit[0],dateSplit[1]-1,dateSplit[2]),
      end: dateNow
    })

    timeLeft.value = duration

    setTimeLeft()
  }, 1000)
}



</script>