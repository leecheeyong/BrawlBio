<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="text-6xl mb-4">🤖</div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p class="text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <router-link
        to="/"
        class="inline-block px-6 py-3 bg-[#6C63FF] rounded-lg hover:bg-[#4B48C6] text-white transition-colors duration-200"
      >
        Back to Home
      </router-link>
    </div>
  </div>
</template>
