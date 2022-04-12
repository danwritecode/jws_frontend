<template>
  <div>
    <div class="bg-black">
      <div class="min-h-[100vh] xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-12 lg:grid lg:grid-cols-2 md:gap-16 xl:gap-24 2xl:gap-20 items-center py-40 lg:py-0 -mt-11">
        <div class="lg:hidden h-20 w-20 bg-black border-2 border-zinc-100 rounded-full flex items-center justify-center">
          <img src="~/assets/img/jws_shortened_trans.svg" alt="jws-logo" class="h-10">
        </div>
        <div class="hidden lg:flex mx-auto">
          <img src="~/assets/img/jws_shortened_trans.svg" alt="jws-logo" class="lg:h-72 w-auto 2xl:h-96">
        </div>
        <div class="mt-10 lg:mt-0">
          <h1 class="text-4xl tracking-tight font-extrabold text-zinc-100 sm:text-4xl md:text-4xl lg:text-4xl 2xl:text-6xl">
            First, we built the Pyramids. Now, we're flipping houses.
          </h1>
          <p class="mt-3 text-lg text-zinc-400 sm:text-xl 2xl:mt-5 md:max-w-3xl">
            It's rare that high quality content gets paired with high quality merch. Support the dream and pick up some Jews with Screws threads today.
          </p>
          <div class="mt-6 2xl:mt-10 rounded-md shadow">
            <button @click="onShopClick()" class="w-full flex items-center justify-center px-8 py-3 border-2 border-zinc-300 text-base font-bold rounded-md text-zinc-300 bg-transparent hover:bg-zinc-900 hover:text-zinc-100 hover:border-zinc-100 2xl:py-4 2xl:text-lg 2xl:px-10 transition-hover-300">
              Shop
            </button>
          </div>
          <div class="mt-5 2xl:mt-16">
            <client-only>
              <IndexFeaturedproductbanner />
            </client-only>
          </div>
        </div>
      </div>
    </div>

    <div class="xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-12 py-24">
      <client-only>
        <ShopProducts id="shop" />
      </client-only>
    </div>

    <GlobalFooter />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

definePageMeta({
  layout: "landing",
});

const config = useRuntimeConfig();
const baseUrl = config.BASE_URL

const meta = useMeta({
  title: "Jews with Screws",
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { hid: 'description', name: 'description', content: "First, we built the Pyramids. Now, we're flipping houses. Snag some of our apparel today."},
    { hid: 'image', name: 'image', content: `${baseUrl}/jws_logo.png` },
    { name: 'twitter:card', content: "summary_large_image"},
    { name: 'twitter:title', content: "Jews with Screws"},
    { name: 'twitter:description', content: "First, we built the Pyramids. Now, we're flipping houses. Snag some of our apparel today."},
    { name: 'twitter:image', content: `${baseUrl}/jws_logo.png`}
  ]
})

const router = useRouter()
const route = useRoute()

const shopClicked = ref(false)

const onShopClick = () => {
  shopClicked.value = true
  router.push({path: '/', hash: '#shop'})
}

if(route.hash === '#shop') {
  onShopClick()
}
</script>