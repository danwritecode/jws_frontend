<template>
  <div>
    <ShopProducts />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const baseUrl = config.BASE_URL

const meta = useMeta({
  title: "Shop - Jews with Screws",
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    { hid: 'description', name: 'description', content: "First, we built the Pyramids. Now, we're flipping houses. Snag some of our apparel today."},
    { hid: 'image', name: 'image', content: `${baseUrl}/jws_logo.png` },
    { name: 'twitter:card', content: "summary_large_image"},
    { name: 'twitter:title', content: "Shop - Jews with Screws"},
    { name: 'twitter:description', content: "First, we built the Pyramids. Now, we're flipping houses. Snag some of our apparel today."},
    { name: 'twitter:image', content: `${baseUrl}/jws_logo.png`}
  ]
})

</script>