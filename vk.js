import fetch from "node-fetch";

const token = process.env.VK_TOKEN?.trim();
const userId = (process.env.VK_USER_ID || process.env.VK_ID || "").trim();

export async function getNowPlaying() {
  try {
    if (!token || !userId) {
      return "⚠️ Не заданы VK_TOKEN/VK_USER_ID";
    }

    const params = new URLSearchParams({
      user_ids: userId,
      fields: "status",
      access_token: token,
      v: "5.131"
    });

    const url = `https://api.vk.com/method/users.get?${params.toString()}`;
    const r = await fetch(url);
    const data = await r.json();

    if (data.error) {
      console.error("VK API error:", data.error);
      return `⚠️ VK API: ${data.error.error_msg || "ошибка"}`;
    }

    const user = data.response?.[0];

    if (!user) {
      return "⚠️ Пользователь VK не найден";
    }

    if (user.status_audio?.artist && user.status_audio?.title) {
      const { artist, title } = user.status_audio;
      return `🎧 ${artist} — ${title}`;
    }

    if (user.status) {
      return `💬 ${user.status}`;
    }

    return "🔇 Ничего не играет";
  } catch (e) {
    console.error(e);
    return "⚠️ Ошибка VK";
  }
}
