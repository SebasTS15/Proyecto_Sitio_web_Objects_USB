import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/Autocontext";
import "../styles/chat.css";

export default function ChatPage() {
  const { user } = useAuth();
  const { id: receiverId } = useParams(); // ID del otro usuario
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const chatId = [user.id, receiverId].sort().join("_");

  // 🔹 Cargar chat al entrar
  useEffect(() => {
    let storedChats;
    try {
      storedChats = JSON.parse(localStorage.getItem("chats"));
      if (!Array.isArray(storedChats)) storedChats = []; // ✅ Validación
    } catch {
      localStorage.removeItem("chats"); // ✅ Limpia si está dañado
      storedChats = [];
    }

    const chat = storedChats.find((c) => c.id === chatId);
    if (chat && Array.isArray(chat.messages)) {
      setMessages(chat.messages);

      // Marcar mensajes como leídos si no los enviamos nosotros
      chat.messages.forEach((m) => {
        if (m.sender !== user.id) m.read = true;
      });

      localStorage.setItem("chats", JSON.stringify(storedChats));
    }
  }, [chatId, user.id]);

  const handleSend = () => {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text) return;

    const newMessage = {
      sender: user.id,
      text,
      time: new Date().toLocaleTimeString(),
      read: false,
    };

    // ✅ Leer y validar datos antes de escribir
    let storedChats;
    try {
      storedChats = JSON.parse(localStorage.getItem("chats"));
      if (!Array.isArray(storedChats)) storedChats = [];
    } catch {
      localStorage.removeItem("chats");
      storedChats = [];
    }

    let chat = storedChats.find((c) => c.id === chatId);

    if (!chat) {
      chat = { id: chatId, participants: [user.id, receiverId], messages: [] };
      storedChats.push(chat);
    }

    chat.messages.push(newMessage);
    localStorage.setItem("chats", JSON.stringify(storedChats));

    setMessages([...chat.messages]);
    input.value = "";
  };

  return (
    <div className="chat-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Volver</button>
      <h2>Chat con el publicador</h2>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.sender === user.id ? "sent" : "received"}`}
          >
            <p>{msg.text}</p>
            <small>{msg.time}</small>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input id="chatInput" type="text" placeholder="Escribe tu mensaje..." />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}
