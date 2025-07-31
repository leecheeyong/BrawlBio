<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#c7d2fe] via-[#dbeafe] to-[#e9d5ff] relative overflow-hidden"
  >
    <div class="absolute inset-0 pointer-events-none z-0">
      <div
        class="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-[#6C63FF] via-[#FF6584] to-[#A084E8] opacity-30 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-[#FF6584] via-[#A084E8] to-[#FFD6E0] opacity-20 rounded-full blur-2xl animate-pulse"
      ></div>
      <div
        class="absolute top-1/3 left-0 w-40 h-40 bg-gradient-to-br from-[#A084E8] to-[#FFD6E0] opacity-20 rounded-full blur-2xl animate-pulse"
      ></div>
    </div>
    <nav
      class="bg-white/70 backdrop-blur-lg shadow-sm border-b border-gray-200 relative z-10"
    >
      <div
        class="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between"
      >
        <router-link
          to="/"
          class="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-[#6C63FF] via-[#FF6584] to-[#A084E8] bg-clip-text text-transparent drop-shadow select-none mb-2 sm:mb-0"
        >
          BrawlBio
        </router-link>
        <div class="flex items-center gap-2 ml-auto">
          <router-link
            to="/"
            class="px-4 py-2 bg-[#6C63FF] text-white rounded-lg font-bold hover:bg-[#4B48C6] transition-colors duration-200"
          >
            Search Another Player
          </router-link>
          <a
            href="https://github.com/yourusername/yourrepo"
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
    <div class="container mx-auto px-2 sm:px-4 py-8 relative z-10">
      <div>
        <div v-if="loading" class="flex items-center justify-center p-8">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6C63FF]"
          ></div>
        </div>
        <div
          v-else-if="error"
          class="bg-gradient-to-r from-[#fee2e2] to-[#fef2f2] border border-[#fecaca] rounded-xl p-5 mb-6 mt-8 max-w-md mx-auto shadow-lg flex items-center gap-3 animate-shake"
        >
          <div class="flex-shrink-0">
            <svg
              class="h-6 w-6 text-red-400"
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
          <div>
            <h3 class="text-base font-semibold text-red-800">Error</h3>
            <p class="text-base text-red-700 mt-1">{{ error }}</p>
          </div>
        </div>
        <div v-else-if="player" class="space-y-8 animate-fade-in">
          <div
            class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-white/30 p-6"
          >
            <div
              class="flex flex-col sm:flex-row items-center sm:space-x-6 mb-6"
            >
              <img
                :src="getPlayerIconUrl(player.icon?.id || 28000000)"
                :alt="player.name"
                class="w-20 h-20 rounded-full shadow-lg border-4 border-primary-200"
                @error="handleImageError"
              />
              <div class="mt-4 sm:mt-0 text-center sm:text-left">
                <h2
                  class="text-2xl font-extrabold text-gray-900 tracking-tight"
                >
                  {{ player.name }}
                </h2>
                <p class="text-gray-600 font-mono">{{ player.tag }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div
                class="text-center p-4 bg-[#eef2ff]/60 rounded-xl shadow flex flex-col items-center"
              >
                <div class="flex items-center justify-center gap-2">
                  <span
                    class="text-3xl font-extrabold text-[#6C63FF] flex items-center gap-1"
                  >
                    {{ formatNumber(player.trophies) }}
                    <img
                      :src="getTrophyEmojiUrl()"
                      alt="Trophy"
                      class="w-6 h-6 align-middle"
                      style="margin-bottom: 2px"
                    />
                  </span>
                </div>
                <p class="text-base text-gray-700">Trophies</p>
              </div>
              <div
                class="text-center p-4 bg-[#ffe4e6]/60 rounded-xl shadow flex flex-col items-center"
              >
                <div class="flex items-center justify-center gap-2">
                  <span
                    class="text-3xl font-extrabold text-[#FF6584] flex items-center gap-1"
                  >
                    {{ formatNumber(player.highestTrophies) }}
                    <img
                      :src="getTrophyEmojiUrl()"
                      alt="Trophy"
                      class="w-6 h-6 align-middle"
                      style="margin-bottom: 2px"
                    />
                  </span>
                </div>
                <p class="text-base text-gray-700">Highest</p>
              </div>
            </div>
            <div
              class="flex justify-between items-center text-base text-gray-700 font-semibold"
            >
              <span>Level {{ player.expLevel }}</span>
              <span>{{ player.expPoints }} XP</span>
            </div>
          </div>
          <!-- Club Info -->
          <div
            v-if="player.club"
            class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6"
          >
            <h3 class="text-lg font-bold text-gray-900 mb-4">Club</h3>
            <div class="flex flex-col sm:flex-row items-center justify-between">
              <div class="text-center sm:text-left">
                <router-link
                  :to="{
                    name: 'ClubPage',
                    params: { tag: player.club.tag.replace('#', '') },
                  }"
                  class="text-lg font-bold text-[#6C63FF] hover:text-[#4B48C6]"
                >
                  {{ player.club.name }}
                </router-link>
                <p class="text-gray-600 font-mono">{{ player.club.tag }}</p>
                <p class="text-sm text-gray-500 capitalize">
                  {{ player.club.role }}
                </p>
              </div>
              <div class="text-right mt-4 sm:mt-0">
                <p class="text-lg font-bold text-[#6C63FF]">
                  {{ formatNumber(player.club.trophies) }}
                </p>
                <p class="text-sm text-gray-500">Club Trophies</p>
              </div>
            </div>
          </div>
          <div
            v-if="player.brawlers"
            class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6"
          >
            <h3 class="text-lg font-bold text-gray-900 mb-4">Brawlers</h3>
            <div
              class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              <div
                v-for="brawler in player.brawlers"
                :key="brawler.id"
                class="text-center p-4 bg-gray-50/60 rounded-xl hover:bg-primary-50/80 transition-colors duration-200 shadow group"
              >
                <img
                  :src="getBrawlerImageUrl(brawler.id)"
                  :alt="brawler.name"
                  class="w-14 h-14 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200"
                  @error="hideBrawlerImage"
                />
                <p class="text-sm font-bold text-gray-900 truncate">
                  {{ brawler.name }}
                </p>
                <div class="flex items-center justify-center gap-1 mt-1">
                  <span
                    class="text-sm text-primary-600 font-semibold flex items-center gap-1"
                  >
                    {{ brawler.trophies }}
                    <img
                      :src="getTrophyEmojiUrl()"
                      alt="Trophy"
                      class="w-5 h-5 align-middle"
                      style="margin-bottom: 1px"
                    />
                  </span>
                </div>
                <div class="flex items-center justify-center gap-1 mt-1">
                  <span class="text-xs text-gray-500 flex items-center gap-1">
                    R{{ brawler.rank }}
                    <img
                      :src="getRankEmojiUrl()"
                      alt="Rank"
                      class="w-5 h-5 align-middle"
                      style="margin-bottom: 1px"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="battleLog && battleLog.length > 0"
            class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6"
          >
            <h3 class="text-lg font-bold text-gray-900 mb-4">Recent Battles</h3>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="(battle, index) in battleLog.slice(0, 9)"
                :key="index"
                class="bg-white/80 rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-200 border border-white/30"
              >
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-2">
                    <div
                      class="w-3 h-3 rounded-full"
                      :class="getResultColor(battle.battle?.result)"
                    ></div>
                    <span class="text-sm font-bold text-gray-800">{{
                      battle.battle?.mode || "Unknown"
                    }}</span>
                  </div>
                  <span class="text-xs text-gray-500">{{
                    formatTime(battle.battleTime)
                  }}</span>
                </div>
                <div class="mb-2">
                  <p class="text-sm text-gray-700">
                    {{ battle.event?.map || "Unknown Map" }}
                  </p>
                </div>
                <div
                  class="flex items-center space-x-2"
                  v-if="battle.battle?.teams"
                >
                  <template v-if="getPlayerBrawler(battle)">
                    <img
                      v-if="getPlayerBrawler(battle).brawler"
                      :src="
                        getBrawlerImageUrl(getPlayerBrawler(battle).brawler.id)
                      "
                      :alt="getPlayerBrawler(battle).brawler.name"
                      class="w-8 h-8 rounded shadow"
                      @error="hideBrawlerImage"
                    />
                    <span class="text-sm font-bold text-gray-900">
                      {{
                        getPlayerBrawler(battle).brawler
                          ? getPlayerBrawler(battle).brawler.name
                          : getPlayerBrawler(battle).name
                      }}
                    </span>
                  </template>
                  <template v-else>
                    <span class="text-sm font-bold text-gray-500">Unknown</span>
                  </template>
                </div>
                <div class="mt-2 text-xs text-gray-500">
                  <template
                    v-if="
                      getPlayerBrawler(battle) &&
                      getPlayerBrawler(battle).brawler
                    "
                  >
                    <span>
                      Trophy Change:
                      <span
                        :class="{
                          'text-green-600': trophyChange(battleLog, index) > 0,
                          'text-red-600': trophyChange(battleLog, index) < 0,
                        }"
                      >
                        {{ trophyChange(battleLog, index) > 0 ? "+" : ""
                        }}{{ trophyChange(battleLog, index) }}
                      </span>
                    </span>
                  </template>
                  <template v-else> Trophy Change: 0 </template>
                </div>
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
import {
  getPlayer,
  getPlayerBattleLog,
  getPlayerIconUrl,
  getBrawlerImageUrl,
  getTrophyEmojiUrl,
  getRankEmojiUrl,
} from "../api.js";

const route = useRoute();

const player = ref(null);
const battleLog = ref(null);
const loading = ref(true);
const error = ref(null);

const formatNumber = (num) => {
  if (num === undefined || num === null) return "0";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const fetchPlayerData = async () => {
  const tag = route.params.tag;
  if (!tag) {
    error.value = "No player tag provided.";
    loading.value = false;
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    const [playerData, battleLogData] = await Promise.all([
      getPlayer("#" + tag),
      getPlayerBattleLog("#" + tag).catch(() => null),
    ]);
    player.value = playerData;
    battleLog.value = battleLogData?.items || [];
  } catch (err) {
    console.error("Error fetching player data:", err);
    error.value =
      "Player not found or API error. Please check the player tag and try again.";
  } finally {
    loading.value = false;
  }
};

const handleImageError = (event) => {
  event.target.src = getPlayerIconUrl(28000000);
};

const hideBrawlerImage = (event) => {
  event.target.style.display = "none";
};

const getResultColor = (result) => {
  switch (result) {
    case "victory":
      return "bg-green-500";
    case "defeat":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

const formatTime = (battleTime) => {
  if (!battleTime) return "Unknown";
  let formatted = battleTime.replace(
    /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})\.000Z$/,
    "$1-$2-$3T$4:$5:$6Z",
  );
  const date = new Date(formatted);
  if (isNaN(date.getTime())) return "Unknown";
  const now = new Date();
  const diff = Math.floor((now - date) / 1000 / 60);
  if (diff < 1) return "Just now";
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
};

const getPlayerBrawler = (battle) => {
  if (!battle.battle?.teams) return null;
  for (const team of battle.battle.teams) {
    for (const p of team) {
      if (p.tag === "#" + route.params.tag) {
        return p;
      }
    }
  }
  return null;
};

const trophyChange = (battleLog, index) => {
  if (
    !battleLog[index] ||
    !getPlayerBrawler(battleLog[index]) ||
    !getPlayerBrawler(battleLog[index]).brawler
  )
    return 0;
  const currentTrophies = getPlayerBrawler(battleLog[index]).brawler.trophies;
  if (index === battleLog.length - 1) return 0;
  if (
    battleLog[index + 1] &&
    getPlayerBrawler(battleLog[index + 1]) &&
    getPlayerBrawler(battleLog[index + 1]).brawler
  ) {
    const prevTrophies = getPlayerBrawler(battleLog[index + 1]).brawler
      .trophies;
    return currentTrophies - prevTrophies;
  }
  return 0;
};

onMounted(fetchPlayerData);

watch(() => route.params.tag, fetchPlayerData);
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
