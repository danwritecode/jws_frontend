import { defineNuxtPlugin } from "#app"
import { ApolloClient, InMemoryCache } from "@apollo/client/core"
import { DefaultApolloClient } from "@vue/apollo-composable"

export default defineNuxtPlugin((nuxtApp) => {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    fetchPolicy: "network-only",
    uri: "https://jewswithscrews.myshopify.com/api/2022-01/graphql.json",
    headers: {
      "X-Shopify-Storefront-Access-Token": "027ede29a5e14127c8e0db1c14ea1dfb"
    }
  })
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})