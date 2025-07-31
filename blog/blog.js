// Blog sayfaları için JavaScript fonksiyonları
// Bu dosya blog sayfalarında kullanılan özel fonksiyonları içerir

// Blog tema değiştirici
function initBlogTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Sosyal paylaşım butonları
function initSocialShare() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://facebook.com/sharer/sharer.php?u=${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Kod kopyalama fonksiyonu
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((block, index) => {
        const pre = block.parentElement;
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.innerHTML = '📋 Kopyala';
        copyButton.setAttribute('data-index', index);
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
        
        copyButton.addEventListener('click', function() {
            const code = block.textContent;
            
            navigator.clipboard.writeText(code).then(() => {
                this.innerHTML = '✅ Kopyalandı!';
                setTimeout(() => {
                    this.innerHTML = '📋 Kopyala';
                }, 2000);
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = code;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                this.innerHTML = '✅ Kopyalandı!';
                setTimeout(() => {
                    this.innerHTML = '📋 Kopyala';
                }, 2000);
            });
        });
    });
}

// Reading progress bar
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const article = document.querySelector('.article-body, article');
        if (!article) return;
        
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        const progress = Math.max(0, Math.min(100, 
            ((scrollY - articleTop + windowHeight) / articleHeight) * 100
        ));
        
        const fill = document.querySelector('.reading-progress-fill');
        if (fill) {
            fill.style.width = progress + '%';
        }
    });
}

// Blog sayfa yüklendiğinde tüm fonksiyonları başlat
document.addEventListener('DOMContentLoaded', function() {
    initBlogTheme();
    initSocialShare();
    initCodeCopy();
    initReadingProgress();
    console.log('✅ blog.js loaded successfully');
});
