export default defineNuxtRouteMiddleware((to, from) => {
  const cartIdCookie = useCookie('cartId')
  const cartIdStore = useState('cartId')

  // if(cartIdCookie.value && !cartIdStore.value) {
  //   cartIdStore.value = cartIdCookie.value
  // }

  console.log(cartIdCookie.value)
  console.log(cartIdStore.value)

})