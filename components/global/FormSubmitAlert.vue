<template>
  <div>
    <div v-if="success" class="rounded-md bg-green-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <!-- Heroicon name: solid/check-circle -->
          <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-green-800">
            {{ successTitle }}
          </h3>
          <div class="mt-2 text-sm text-green-700">
            <p>
              {{ successMsg }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <!-- Heroicon name: solid/x-circle -->
          <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">
            {{ errorTitle }}
          </h3>
          <div class="mt-1 text-sm text-red-700">
            <p>
              {{ errorMsg }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    success: {
      type: Boolean,
      required: true
    },
    successTitle: {
      type: String,
      required: true
    },
    successMsg: {
      type: String,
      required: true
    },
    errorTitle: {
      type: String,
      required: true
    },
    errorMsg: {
      type: String,
      required: true
    }
  }
}
</script>