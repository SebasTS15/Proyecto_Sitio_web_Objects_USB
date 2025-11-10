export function getChatsSafe() {
  try {
    const data = JSON.parse(localStorage.getItem("chats"));
    return Array.isArray(data) ? data : [];
  } catch (e) {
    // Si el contenido está dañado, se limpia
    localStorage.removeItem("chats");
    return [];
  }
}

export function getUnreadCount(userId) {
  const chats = getChatsSafe(); // 👈 usamos función segura
  let count = 0;

  chats.forEach((chat) => {
    if (Array.isArray(chat.messages)) {
      chat.messages.forEach((m) => {
        if (m.sender !== userId && !m.read) count++;
      });
    }
  });

  return count;
}

export function getLastUnreadChat(userId) {
  const chats = getChatsSafe();

  for (let chat of chats) {
    if (!Array.isArray(chat.messages)) continue;
    const unread = chat.messages.some(
      (m) => m.sender !== userId && !m.read
    );
    if (unread) return chat;
  }

  return null;
}
