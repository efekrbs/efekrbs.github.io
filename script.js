// Ana sayfa JavaScript fonksiyonları
// Bu dosya index.html'de kullanılan temel fonksiyonları içerir

// Tema değiştirici
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme == 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else if (currentTheme == 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    themeToggle.addEventListener('click', function() {
        if (prefersDarkScheme.matches) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Sayfa yüklendiğinde tema toggle'ı başlat
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    console.log('✅ script.js loaded successfully');
});
