<template>
  <div class="bg-black">
    <div class="min-h-[95.6vh;] xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:grid lg:grid-cols-2 md:gap-16 xl:gap-24 2xl:gap-40 items-center py-20 sm:py-32 lg:py-0">
      <div class="lg:hidden h-20 w-20 bg-black border-2 border-zinc-100 rounded-full flex items-center justify-center">
        <img src="~/assets/img/jws_shortened.svg" alt="" class="h-10">
      </div>
      <div class="hidden lg:flex">
        <img src="~/assets/img/jws_shortened.svg" alt="">
      </div>
      <div class="mt-10">
        <h1 class="text-4xl tracking-tight font-extrabold text-zinc-100 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
          THE BOYS GOT YOUR BACK, YOU GOT THEIRS?
        </h1>
        <p class="mt-3 text-lg text-zinc-400 sm:text-xl md:mt-5 md:max-w-3xl">
          It's rare that high quality content gets paired with high quality merch. Support the dream and pick up some sweet Jews with Screws threads today.
        </p>
        <div class="mt-10 rounded-md shadow">
          <a href="#" class="w-full flex items-center justify-center px-8 py-3 border-2 border-zinc-300 text-base font-bold rounded-md text-zinc-300 bg-black hover:bg-zinc-900 hover:text-zinc-100 hover:border-zinc-100 md:py-4 md:text-lg md:px-10 transition-hover-300">
            Shop
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "landing",
});

</script>