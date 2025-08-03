<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-[#f5f6fa]"
  >
    <div class="w-full max-w-sm mx-auto text-center">
      <h1
        class="mt-8 text-5xl md:text-6xl font-extrabold mb-6 tracking-wide bg-gradient-to-r from-[#6C63FF] via-[#FF6584] to-[#A084E8] bg-clip-text text-transparent drop-shadow-lg select-none"
      >
        BrawlBio
      </h1>
      <div class="bg-white rounded-xl p-6 border border-gray-200 mb-8">
        <p class="text-lg text-gray-600 mb-8">
          Track your Brawl Stars progress and stats
        </p>
        <form @submit.prevent="searchPlayer" class="space-y-4">
          <input
            id="playerTag"
            v-model="playerTag"
            type="text"
            placeholder="Player Tag"
            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#6C63FF] text-lg bg-white outline-none transition-all"
            :disabled="loading"
            autocomplete="off"
          />
          <button
            type="submit"
            :disabled="loading || !playerTag.trim()"
            class="w-full py-3 rounded-lg font-bold text-white bg-[#6C63FF] hover:bg-[#4B48C6] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              v-if="loading"
              class="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
            ></span>
            <span>{{ loading ? "Searching..." : "Search Player" }}</span>
          </button>
        </form>
        <transition name="fade">
          <div
            v-if="error"
            class="bg-[#fee2e2] border border-[#fecaca] rounded-lg p-4 mt-6 text-left flex items-center gap-3"
          >
            <svg
              class="h-5 w-5 text-[#FF6584] flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
            <div>
              <h3 class="text-base font-semibold text-[#FF6584]">Error</h3>
              <p class="text-base text-[#FF6584] mt-1">{{ error }}</p>
            </div>
          </div>
        </transition>
        <div class="mt-8">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Features</h2>
          <div class="flex flex-col gap-6 items-center w-full">
            <div class="flex flex-col items-center">
              <span class="text-[#6C63FF] text-3xl mb-2">📊</span>
              <div class="font-semibold text-gray-800">Player Stats</div>
              <div class="text-xs text-gray-500 text-center">
                Detailed player statistics and brawler progress
              </div>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-[#FF6584] text-3xl mb-2">⚔️</span>
              <div class="font-semibold text-gray-800">Battle History</div>
              <div class="text-xs text-gray-500 text-center">
                Analyze recent battles and track your performance
              </div>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-[#A084E8] text-3xl mb-2">🏆</span>
              <div class="font-semibold text-gray-800">Club Information</div>
              <div class="text-xs text-gray-500 text-center">
                Explore club details and member rankings
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const playerTag = ref("");
const loading = ref(false);
const error = ref(null);

const searchPlayer = async () => {
  if (!playerTag.value.trim()) return;

  loading.value = true;
  error.value = null;

  try {
    await router.push({
      name: "PlayerProfile",
      params: { tag: playerTag.value.replace("#", "") },
    });
  } catch (err) {
    error.value = "Failed to search for player. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 1s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-up {
  animation: slide-up 1s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce {
  animation: bounce 1.2s infinite;
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-4px);
  }
  40%,
  80% {
    transform: translateX(4px);
  }
}
.animate-shake {
  animation: shake 0.5s;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-pulse {
  animation: pulse 3s infinite;
}
</style>
