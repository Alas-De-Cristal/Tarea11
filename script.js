  // Utilidades para localStorage usuarios
  function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  function addUser(user) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
  }
  function findUser(email) {
    return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  }
  function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
  function clearCurrentUser() {
    localStorage.removeItem('currentUser');
  }

  // Mostrar/ocultar secciones
  function showSection(id) {
    window.location = id.replace('Section','')+'.html';
    return;
  document.querySelectorAll('main section').forEach(sec => {
    sec.classList.remove('active');
    //sec.style.display = 'none'; // Ocultar todas las secciones
  });
  const section = document.getElementById(id);
  if (section) {
    section.classList.add('active');
    section.style.display = 'block'; // Mostrar la sección deseada
  }
}

  // Mensajes de validación para el registro
  function validateRegisterForm() {
    let valid = true;
    const name = document.getElementById('regName');
    const email = document.getElementById('regEmail');
    const pass = document.getElementById('regPassword');
    const confirm = document.getElementById('regConfirmPassword');

    // Validar nombre
    if (!name.value.trim()) {
      name.classList.add('is-invalid');
      valid = false;
    } else {
      name.classList.remove('is-invalid');
    }

    // Validar email
    if (!email.value.trim() || !email.checkValidity()) {
      email.classList.add('is-invalid');
      valid = false;
    } else {
      email.classList.remove('is-invalid');
    }

    // Validar contraseña
    if (!pass.value || pass.value.length < 6) {
      pass.classList.add('is-invalid');
      valid = false;
    } else {
      pass.classList.remove('is-invalid');
    }

    // Validar confirmación
    if (confirm.value !== pass.value || !confirm.value) {
      confirm.classList.add('is-invalid');
      valid = false;
    } else {
      confirm.classList.remove('is-invalid');
    }

    return valid;
  }

  // Cargar usuario demo para pruebas (si no existe)
  if (!findUser('demo@demo.com')) {
    addUser({ name: 'Usuario Demo', email: 'demo@demo.com', password: 'demo123' });
  }

  // Eventos
  document.getElementById('goToRegister')?.addEventListener('click', () => {
    showSection('registerSection');
  });

  document.getElementById('goToLogin')?.addEventListener('click', () => {
    showSection('loginSection');
  });

  document.getElementById('registerForm')?.addEventListener('submit', e => {
    e.preventDefault();
    if (validateRegisterForm()) {
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const password = document.getElementById('regPassword').value;

      if (findUser(email)) {
        alert('⚠️ El correo ya está registrado.');
        return;
      }

      addUser({ name, email, password });
      alert('✅ Registro exitoso. Ya puedes iniciar sesión.');
      showSection('loginSection');
      document.getElementById('registerForm').reset();
    }
  });

  document.getElementById('loginForm')?.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');

    // Validaciones HTML5
    if (!loginEmailInput.checkValidity()) {
      loginEmailInput.classList.add('is-invalid');
      return;
    } else {
      loginEmailInput.classList.remove('is-invalid');
    }
    if (!loginPasswordInput.value || loginPasswordInput.value.length < 6) {
      loginPasswordInput.classList.add('is-invalid');
      return;
    } else {
      loginPasswordInput.classList.remove('is-invalid');
    }

    const user = findUser(email);
    if (user && user.password === password) {
      setCurrentUser(user);
      showSection('indexSection');
      updateWelcomeMessage(user.name);
      document.getElementById('loginForm').reset();
    } else {
      alert('❌ Usuario o contraseña incorrectos.');
    }
  });

  // Selector de idioma
  document.getElementById('languageSelect')?.addEventListener('change', e => {
    const val = e.target.value;
    //textos y contenido según idioma
    let welcomeText = '';
    switch(val) {
      case 'es':
        welcomeText = 'Bienvenida a la aplicación Aprende Árabe con Harakat.';
        document.documentElement.lang = 'es';
        document.documentElement.dir = 'ltr';
        break;
      case 'en':
        welcomeText = 'Welcome to the Learn Arabic with Harakat app.';
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        break;
      case 'ar':
        welcomeText = 'مرحباً بك في تطبيق تعلم العربية مع الحركات.';
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        break;
         case 'fr':
      welcomeText = 'Bienvenue dans l\'application Apprendre l\'arabe avec Harakat.';
      document.documentElement.lang = 'fr';
      document.documentElement.dir = 'ltr';
      break;

    case 'de':
      welcomeText = 'Willkommen in der App Arabisch lernen mit Harakat.';
      document.documentElement.lang = 'de';
      document.documentElement.dir = 'ltr';
      break;

    case 'it':
      welcomeText = 'Benvenuto nell\'app Imparare l\'arabo con Harakat.';
      document.documentElement.lang = 'it';
      document.documentElement.dir = 'ltr';
      break;
      default:
        welcomeText = 'Bienvenida a la aplicación Aprende Árabe con Harakat.';
        document.documentElement.lang = 'es';
        document.documentElement.dir = 'ltr';
    }
    document.getElementById('welcomeMsg').textContent = welcomeText;
  });

  // Inicializar mensaje idioma por defecto
  document.getElementById('languageSelect')?.dispatchEvent(new Event('change'));

  // Botón cerrar sesión
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    clearCurrentUser();
    setTimeout(() => {
      window.location = 'login.html?logout=1'
    },20);
    
  });

  // Modo oscuro
  const darkModeBtn = document.getElementById('toggleDarkMode');
  darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeBtn.textContent = isDark ? 'Modo Claro' : 'Modo Oscuro';
    darkModeBtn.setAttribute('aria-pressed', isDark);
  });

  // Mantener sesión abierta (si ya hay usuario)
  window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const logout = urlParams.get('logout');
    if(logout){
      clearCurrentUser();
    }
    const currentUser = getCurrentUser();
    if (currentUser) {
      if(window.location.pathname.indexOf('login.html')>-1){
        showSection('indexSection');
      }
      
      updateWelcomeMessage(currentUser.name);
    }
    applySettings();
  });

  // Actualiza mensaje bienvenida
  function updateWelcomeMessage(name) {
    const lang = document.getElementById('languageSelect')?.value;
    let msg = '';
    if(lang === 'ar') {
      msg = `مرحباً، ${name}`;
    } else if(lang === 'en') {
      msg = `Welcome, ${name}`;
    } else {
      msg = `Bienvenida, ${name}`;
    }
    let messageElement = document.getElementById('welcomeMsg');
    if(messageElement){
      messageElement.textContent = msg;
    }
  }

  // Ajustes: aplicar configuración guardada o por defecto
  function applySettings() {
    const fontSize = localStorage.getItem('fontSize') || '16';
    const language = localStorage.getItem('interfaceLanguage') || 'es';

    document.body.style.fontSize = fontSize + 'px';
    let fontSizeElement = document.getElementById('fontSize');
    if(fontSizeElement){
      fontSizeElement.value = fontSize;
    }
    let languageSettingElement = document.getElementById('languageSetting');
    if(languageSettingElement){
      languageSettingElement.value = language;
    }

    // Cambiar idioma en selector principal
    let languageSelectElement = document.getElementById('languageSelect');
    if(languageSelectElement){
      languageSelectElement.value = language;
      languageSelectElement.dispatchEvent(new Event('change'));
    }
    
  }

  document.getElementById('settingsForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const fontSize = document.getElementById('fontSize')?.value;
    const language = document.getElementById('languageSetting')?.value;

    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('interfaceLanguage', language);

    applySettings();
    alert('✅ Ajustes guardados.');
    showSection('indexSection');
  });

  function toggleModuleContent(id) {
  const el = document.getElementById(id);
  if (el.style.display === 'none') {
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}

function mostrarProgreso() {
  const progressDiv = document.getElementById('progressContent');
  if (!progressDiv){
    return;
  }
  // Datos de ejemplo
  const data = {
    modulosCompletados: 3,
    palabrasAprendidas: 45,
    sesiones: 12,
  };

  // Actualiza el contenido con los datos
  progressDiv.innerHTML = `
    <p><strong>Módulos completados:</strong> ${data.modulosCompletados}</p>
    <p><strong>Palabras aprendidas:</strong> ${data.palabrasAprendidas}</p>
    <p><strong>Sesiones realizadas:</strong> ${data.sesiones}</p>
  `;
}

// Cuando la página termine de cargar, mostrar progreso
document.addEventListener('DOMContentLoaded', () => {
  mostrarProgreso();
});