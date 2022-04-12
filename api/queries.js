import { gql } from "@apollo/client/core"


export const mediaFieldsFragment = gql`
  fragment mediaFieldsByType on Media {
    ...on MediaImage {
      image {
        url
      }
    }
  }
`
export const GET_PRODUCTS = gql`
  query products {
    products(first: 10) {
      edges {
        cursor
        node {
          id
          title
          description
          vendor
          handle
          featuredImage {
            id
            url
          }
          variants(first: 3) {
            edges {
              cursor
              node {
                id
                title
                quantityAvailable
                priceV2 {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

export const GET_PRODUCT_BY_HANDLE = gql`
  query productByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      descriptionHtml
      vendor
      images(first: 10) {
        edges {
          cursor
          node {
            id
            url
          }
        }
      }
      variants(first: 100) {
        edges {
          cursor
          node {
            id
            title
            quantityAvailable
            priceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              url
            }
          }
        }
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`

export const CREATE_CART = gql`
  mutation createCart($cartInput: CartInput) {
    cartCreate(input: $cartInput) {
      cart {
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`

export const ADD_TO_CART = gql`
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
    }
  }
`

export const GET_CART_LITE = gql`
  query cartQuery($cartId: ID!) {
    cart(id: $cartId) {
      id
      createdAt
      updatedAt
      lines(first: 100) {
        edges {
          node {
            id
            quantity
          }
        }
      }
    }
  }
`

export const GET_CART = gql`
  query cartQuery($cartId: ID!) {
    cart(id: $cartId) {
      id
      createdAt
      updatedAt
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                selectedOptions {
                  name
                  value
                }
                image {
                  url
                }
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      estimatedCost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
      buyerIdentity {
        email
        phone
        customer {
          id
        }
        countryCode
      }
    }
  }
`

export const REMOVE_CART_ITEM = gql`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        createdAt
        updatedAt
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    url
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
        buyerIdentity {
          email
          phone
          customer {
            id
          }
          countryCode
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const UPDATE_CART_ITEM = gql`
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
    }
  }
`

export const GET_CHECKOUT_URL = gql`
query checkoutURL($cartId: ID!) {
  cart(id: $cartId) {
    checkoutUrl
  }
}`

export const GET_FEATURED_PRODUCTS = gql`
  query collections {
    collection(handle: "featured") {
      id
      title
      description
      descriptionHtml
      products(first: 10, reverse: true, sortKey: CREATED) {
        edges {
          cursor
          node {
            id
            title
            handle
            description
            metafield(namespace: "product", key: "featuredproductexpiration") {
              value
            }
            featuredImage {
              id
              url
              altText
            }
            variants(first: 3) {
              edges {
                cursor
                node {
                  id
                  title
                  quantityAvailable
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`