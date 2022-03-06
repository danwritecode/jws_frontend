export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$router.options.scrollBehavior = (to, from, savedPosition) => {
    const pathHash = to.hash

    if(pathHash) {
      if(from.path === '/') {
        const hashElement = window.document.querySelector(pathHash)
        return hashElement.scrollIntoView({behavior: 'smooth', block: 'center'})
      } else {
        setTimeout(() => {
          const hashElement = window.document.querySelector(pathHash)
          return hashElement.scrollIntoView({behavior: 'smooth', block: 'center'})
        }, 300)
      }
    } 
    // else {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve({ left: 0, top: 0 })
    //     }, 200)
    //   })
    // }
  }
})