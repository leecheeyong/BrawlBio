const encodeTag = (tag) => {
  if (tag && tag.startsWith("%23")) return `${decodeURIComponent(`${tag}`)}`;
  if (tag && !tag.startsWith("#")) return tag;
  return tag ? tag.replace("#", "%23") : "";
};
async function apiRequest(endpoint) {
  let attempts = 0;
  const maxAttempts = 3;
  let lastError;
  while (attempts < maxAttempts) {
    try {
      const response = await fetch(
        `https://leecheeyong.vercel.app/supercell?type=bs&endpoint=${endpoint}`,
      );
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      lastError = error;
      attempts++;
      if (attempts >= maxAttempts) {
        console.error("API Request failed after retries:", error);
        throw error;
      }
    }
  }
}

export async function getPlayer(tag) {
  const encodedTag = encodeTag(tag);
  return apiRequest(`players/${encodedTag}`);
}

export async function getPlayerBattleLog(tag) {
  const encodedTag = encodeTag(tag);
  return apiRequest(`players/${encodedTag}/battlelog`);
}

export async function getClub(tag) {
  const encodedTag = encodeTag(tag);
  return apiRequest(`clubs/${encodedTag}`);
}

export function getBrawlerImageUrl(brawlerId) {
  return `https://cdn.brawlify.com/brawlers/emoji/${brawlerId}.png`;
}

export function getPlayerIconUrl(iconId) {
  return `https://cdn.brawlify.com/profile-icons/regular/${iconId}.png`;
}

export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function getTrophyEmojiUrl() {
  return "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f3c6.png"; // 🏆
}

export function getRankEmojiUrl() {
  return "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f396.png"; // 🎖️
}
