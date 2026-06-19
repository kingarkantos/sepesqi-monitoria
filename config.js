// ===========================
// Firebase Configuration
// ===========================
// 🔧 INSTRUÇÕES DE CONFIGURAÇÃO:
// 1. Acesse https://console.firebase.google.com/
// 2. Crie um novo projeto (ex: "sepesqi-monitoria")
// 3. Vá em "Realtime Database" e crie um banco de dados
// 4. Nas regras de segurança, use as regras abaixo para teste:
//    {
//      "rules": {
//        ".read": true,
//        ".write": true
//      }
//    }
// 5. Vá em Configurações do projeto > Geral > Seus apps > Adicionar app web
// 6. Copie os dados do firebaseConfig e substitua abaixo

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
