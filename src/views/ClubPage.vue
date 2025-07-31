<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div
        class="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between"
      >
        <router-link
          to="/"
          class="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-[#6C63FF] via-[#FF6584] to-[#A084E8] bg-clip-text text-transparent drop-shadow select-none mb-2 sm:mb-0"
        >
          BrawlBio
        </router-link>
        <div class="flex items-center gap-2">
          <router-link
            to="/"
            class="px-4 py-2 bg-[#6C63FF] text-white rounded-lg font-bold hover:bg-[#4B48C6] transition-colors duration-200"
          >
            Back to Search
          </router-link>
          <a
            href="https://github.com/leecheeyong/BrawlBio"
            target="_blank"
            rel="noopener"
            class="px-3 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-[#22223b] hover:bg-gray-100 flex items-center gap-2 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.865 8.167 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.175 22 16.426 22 12.012 22 6.484 17.523 2 12 2Z"
              />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </nav>

    <div class="container mx-auto px-4 py-8">
      <div v-if="loading" class="flex items-center justify-center p-8">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6C63FF]"
        ></div>
      </div>
      <div
        v-else-if="error"
        class="bg-[#fee2e2] border border-[#fecaca] rounded-lg p-4 mb-6"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-[#FF6584]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-bold text-[#FF6584]">Error</h3>
            <p class="text-sm text-[#FF6584] mt-1">{{ error }}</p>
          </div>
        </div>
      </div>

      <div v-else-if="club" class="space-y-8 animate-fade-in">
        <div class="bg-white rounded-xl shadow p-6">
          <div class="text-center mb-6">
            <h1 class="text-3xl font-extrabold text-[#22223b] mb-2">
              {{ club.name }}
            </h1>
            <p class="text-base text-[#6C63FF] font-mono">{{ club.tag }}</p>
            <p class="text-gray-700 mt-2">{{ club.description }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center p-4 bg-[#eef2ff] rounded-lg">
              <p class="text-2xl font-bold text-[#6C63FF]">
                {{ formatNumber(club.trophies) }}
              </p>
              <p class="text-sm text-gray-700">Total Trophies</p>
            </div>
            <div class="text-center p-4 bg-[#ffe4e6] rounded-lg">
              <p class="text-2xl font-bold text-[#FF6584]">
                {{ club.members?.length || 0 }}
              </p>
              <p class="text-sm text-gray-700">Members</p>
            </div>
            <div class="text-center p-4 bg-[#d1fae5] rounded-lg">
              <p class="text-2xl font-bold text-[#10B981]">
                {{ formatNumber(club.requiredTrophies) }}
              </p>
              <p class="text-sm text-gray-700">Required Trophies</p>
            </div>
          </div>
        </div>

        <div v-if="club.members" class="bg-white rounded-xl shadow p-6">
          <h3 class="text-lg font-bold text-[#22223b] mb-4">Members</h3>
          <div class="space-y-3">
            <div
              v-for="(member, index) in club.members"
              :key="member.tag"
              class="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#f5f6fa] rounded-lg hover:bg-[#eef2ff] transition-colors duration-200"
            >
              <div class="flex items-center space-x-4">
                <div class="text-sm font-bold text-[#6C63FF] w-8 text-center">
                  #{{ index + 1 }}
                </div>
                <img
                  :src="getPlayerIconUrl(member.icon?.id || 28000000)"
                  :alt="member.name"
                  class="w-10 h-10 rounded-full"
                  @error="handleImageError"
                />
                <div>
                  <router-link
                    :to="{
                      name: 'PlayerProfile',
                      params: { tag: member.tag.replace('#', '') },
                    }"
                    class="font-bold text-[#22223b] hover:text-[#6C63FF]"
                  >
                    {{ member.name }}
                  </router-link>
                  <p class="text-sm text-gray-600 capitalize">
                    {{ member.role }}
                  </p>
                </div>
              </div>

              <div class="text-right mt-2 sm:mt-0">
                <p class="font-bold text-[#6C63FF]">
                  {{ formatNumber(member.trophies) }}
                </p>
                <p class="text-xs text-gray-500">Trophies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getClub, getPlayerIconUrl, formatNumber } from "../api.js";

const route = useRoute();

const club = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchClubData = async () => {
  const tag = route.params.tag;
  if (!tag) {
    error.value = "No club tag provided.";
    loading.value = false;
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    club.value = await getClub("#" + tag);
  } catch (err) {
    console.error("Error fetching club data:", err);
    error.value =
      "Club not found or API error. Please check the club tag and try again.";
  } finally {
    loading.value = false;
  }
};

const handleImageError = (event) => {
  event.target.src = getPlayerIconUrl(28000000);
};

onMounted(fetchClubData);
watch(() => route.params.tag, fetchClubData);
</script>
