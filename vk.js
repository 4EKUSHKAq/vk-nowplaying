import fetch from "node-fetch";

const token = process.env.VK_TOKEN;
const userId = process.env.VK_USER_ID;

export async function getNowPlaying() {
  try {
    const url = `https://api.vk.com/method/users.get?user_ids=${userId}&fields=status&access_token=${token}&v=5.131`;
    const r = await fetch(url);
    const data = await r.json();

    const user = data.response?.[0];

    if (user?.status_audio) {
  const { artist, title } = user.status_audio;
  return `🎧 ${artist} — ${title}`;
}
    else if (user?.status) {
      return `💬 ${user.status}`;
    } else {
      return `🔇 Ничего не играет`;
    }

  } catch (e) {
    console.error(e);
    return "⚠️ Ошибка VK";
  }
}
