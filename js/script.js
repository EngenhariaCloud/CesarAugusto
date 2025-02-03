// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação do header ao rolar a página
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = '#003366';
    } else {
        header.style.background = '#004d99';
    }
});

// Remover a parte do formulário de contato que não existe mais
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;

        if (name && email && message) {
            alert('Mensagem enviada com sucesso!');
            form.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
}

// Chatbot Simplificado
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-message');
const toggleChat = document.getElementById('toggle-chat');
const chatBody = document.getElementById('chat-body');

// Verificar se todos os elementos existem
if (!chatMessages || !userInput || !sendButton || !toggleChat || !chatBody) {
    console.error('Elementos do chat não encontrados');
} else {
    // Opções do chatbot
    const botOptions = {
        welcome: {
            message: `Olá! Como posso ajudar?

Escolha uma opção:
━━━━━━━━━━━━━━━━━━━━━━
[1] Câmaras Frigoríficas
━━━━━━━━━━━━━━━━━━━━━━
[2] Automação Industrial
━━━━━━━━━━━━━━━━━━━━━━
[3] Manutenção
━━━━━━━━━━━━━━━━━━━━━━
[4] Emergência
━━━━━━━━━━━━━━━━━━━━━━`,
            options: {
                "1": "camaras",
                "2": "automacao",
                "3": "manutencao",
                "4": "emergencia"
            }
        }
    };

    let conversationState = 'welcome';

    // Toggle chat
    toggleChat.addEventListener('click', () => {
        chatBody.classList.toggle('active');
        toggleChat.textContent = chatBody.classList.contains('active') ? '▼' : '▲';
        
        // Mensagem de boas-vindas
        if (chatMessages.children.length === 0) {
            addMessage(botOptions.welcome.message, 'bot');
        }
    });

    // Enviar mensagem
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            processUserInput(message);
            userInput.value = '';
        }
    }

    // Adicionar mensagem ao chat
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        if (sender === 'bot') {
            messageDiv.classList.add('with-button');
            
            const textDiv = document.createElement('div');
            textDiv.textContent = message;
            messageDiv.appendChild(textDiv);
            
            const whatsappButton = document.createElement('button');
            whatsappButton.classList.add('whatsapp-button');
            whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i> Falar no WhatsApp';
            whatsappButton.onclick = () => {
                const message = encodeURIComponent("Olá! Vim pelo site e gostaria de mais informações.");
                window.open(`https://wa.me/5521999999999?text=${message}`, '_blank');
            };
            messageDiv.appendChild(whatsappButton);
        } else {
            messageDiv.textContent = message;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Processar input do usuário
    function processUserInput(input) {
        const option = botOptions.welcome.options[input];
        
        if (option) {
            let message;
            let whatsappMessage;

            switch(option) {
                case 'camaras':
                    message = "Entendi que você tem interesse em câmaras frigoríficas. Vou te conectar com um especialista.";
                    whatsappMessage = "Olá! Gostaria de informações sobre câmaras frigoríficas";
                    break;
                case 'automacao':
                    message = "Ótimo! Vou te conectar com nosso especialista em automação industrial.";
                    whatsappMessage = "Olá! Gostaria de informações sobre automação industrial";
                    break;
                case 'manutencao':
                    message = "Certo! Vou te conectar com nossa equipe de manutenção.";
                    whatsappMessage = "Olá! Preciso de serviços de manutenção";
                    break;
                case 'emergencia':
                    message = "⚠️ Entendi que é uma emergência. Vou te conectar imediatamente com nossa equipe.";
                    whatsappMessage = "🚨 EMERGÊNCIA: Preciso de suporte urgente";
                    break;
            }

            setTimeout(() => {
                addMessage(message, 'bot');
                window.open(`https://wa.me/5521999999999?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
            }, 500);
        } else {
            setTimeout(() => {
                addMessage("Por favor, escolha uma opção de 1 a 4", 'bot');
            }, 500);
        }

        // Resetar conversa após 3 segundos
        setTimeout(() => {
            addMessage(botOptions.welcome.message, 'bot');
        }, 3000);
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Iniciar chat minimizado
    chatBody.classList.remove('active');
}
