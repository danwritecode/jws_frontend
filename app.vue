<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
html {
  font-family: 'Work Sans', sans-serif;
  overflow-y: overlay;
}


.page-enter-from{
  opacity: 0;
  transform: translateY(-10px);
}
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
::-webkit-scrollbar {
  width: 20px;
}
::-webkit-scrollbar-track-piece {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>