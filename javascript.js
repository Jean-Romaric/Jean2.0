// === CONFIGURATION ===
    // ou "gemini-1.5-flash" selon ce que tu as accès

// === Sélection des éléments ===
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatContainer = document.getElementById("chat-container");

// Fonction pour ajouter un message dans le chat
function addMessage(text, role) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `flex ${role === "user" ? "justify-end" : "justify-start"}`;

    messageDiv.innerHTML = `
        <div class="${role === "user" 
            ? "bg-clifford text-white max-w-[80%]" 
            : "bg-white border border-gray-200 max-w-[80%]"} 
            rounded-2xl px-5 py-3 shadow-sm">
            ${text}
        </div>
    `;

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // scroll automatique en bas
}

// Gestion du formulaire
form.addEventListener("submit", async (e) => {

    const GEMINI_API_KEY = "AIzaSyCLpzIwx-kUhgIBahyDaQAL1qWVH6Gi0og";   // ←←← Mets ta clé ici pour le moment

const MODEL = "gemini-2.0-flash-exp"; 
    e.preventDefault();
    
    const userText = input.value.trim();
    if (!userText) return;

    // Afficher le message de l'utilisateur
    addMessage(userText, "user");
    input.value = "";

    // Afficher un message "en train d'écrire..."
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    loadingDiv.className = "flex justify-start";
    loadingDiv.innerHTML = `
        <div class="bg-white border border-gray-200 rounded-2xl px-5 py-3">
            Jean_GPT est en train d'écrire...
        </div>
    `;
    chatContainer.appendChild(loadingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userText }]
                }]
            })
        });

        const data = await response.json();

        // Supprimer le message de chargement
        document.getElementById("loading")?.remove();

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const botReply = data.candidates[0].content.parts[0].text;
            addMessage(botReply, "bot");
        } else {
            addMessage("Désolé, je n'ai pas pu répondre.", "bot");
        }

    } catch (error) {
        document.getElementById("loading")?.remove();
        addMessage("Erreur de connexion avec Gemini.", "bot");
        console.error(error);
    }
});