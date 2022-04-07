<template>
  <div>
    <nav class="bg-black pt-5">
      <div class="flex justify-end items-center xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-12">
        <div class="space-x-5 text-zinc-400 font-medium">
          <nuxt-link to="/shop" class="hover:text-zinc-100 transition-hover-300">Shop</nuxt-link>
          <!-- <nuxt-link to="/about" class="hover:text-zinc-100 transition-hover-300">About</nuxt-link>
          <nuxt-link to="/videos" class="hover:text-zinc-100 transition-hover-300">Videos</nuxt-link> -->
          <nuxt-link to="/contact" class="hover:text-zinc-100 transition-hover-300">Contact</nuxt-link>
        </div>
      </div>
    </nav>
    <div>
      <slot />
    </div>
  </div>
</template>