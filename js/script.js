// SUIBE新生攻略 - JavaScript功能文件

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePageTransition();
    initializeSearch();
    initializeScrollEffects();
    initializeDownloadTracking();
});

// 页面过渡效果初始化
function initializePageTransition() {
    document.body.classList.add('page-transition');
    
    // 页面加载完成后显示内容
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}

// 页面导航功能（带过渡效果）
function navigateToPage(pageName) {
    // 添加退出动画
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.95)';
    
    // 延迟跳转以显示动画效果
    setTimeout(() => {
        window.location.href = pageName;
    }, 200);
}

// 搜索功能初始化
function initializeSearch() {
    const searchInput = document.querySelector('.glass-search');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        // 搜索按钮点击事件
        searchBtn.addEventListener('click', performSearch);
        
        // 回车键搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // 实时搜索提示
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            if (query.length > 0) {
                highlightSearchResults(query);
            } else {
                clearSearchHighlights();
            }
        });
    }
}

// 执行搜索
function performSearch() {
    const searchInput = document.querySelector('.glass-search');
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        showSearchMessage('请输入搜索关键词');
        return;
    }
    
    // 搜索关键词映射到页面
    const searchMap = {
        '军训': 'page1.html',
        '入学': 'page1.html',
        '考试': 'page1.html',
        '宿舍': 'page2.html',
        '住宿': 'page2.html',
        '水电费': 'page2.html',
        '选课': 'page3.html',
        '课程': 'page3.html',
        '时间表': 'page3.html',
        '专业': 'page4.html',
        '转专业': 'page4.html',
        '辅修': 'page4.html',
        '四六级': 'page5.html',
        '英语': 'page5.html',
        '考试': 'page5.html',
        '奖学金': 'page6.html',
        '助学金': 'page6.html',
        '资助': 'page6.html',
        '教务': 'page7.html',
        '学费': 'page7.html',
        '教材': 'page7.html',
        '系统': 'page7.html',
        'qq群': 'https://qun.qq.com/universal-share/share?ac=1&authKey=w9clmZnE5frHG3hhwbhW09KEIj3WOT5Aul1n2AhDhMPeSiAfoIXH09dZw5Jr3op6&busi_data=eyJncm91cENvZGUiOiIzNDQ3OTE5NTYiLCJ0b2tlbiI6InhUYWh3a0NuZFEva1ZBVUdZNTBxQlB6dUpxM3d6ekgwTm9iUGxRRU94VWdBSktmMXBqa21pQ01jeUx6RmtqVkEiLCJ1aW4iOiIxMDcxMDUyNTE4In0%3D&data=D9MYFXvlNZQMVoo3qCF2_rDaGzj1FH3eO5UAJXbJ6Y8X2IwdE1T5IgcV8zhXR50zP7uYcACydVH0OCVzmHRfdw&svctype=4&tempid=h5_group_info',
        '群': 'https://qun.qq.com/universal-share/share?ac=1&authKey=w9clmZnE5frHG3hhwbhW09KEIj3WOT5Aul1n2AhDhMPeSiAfoIXH09dZw5Jr3op6&busi_data=eyJncm91cENvZGUiOiIzNDQ3OTE5NTYiLCJ0b2tlbiI6InhUYWh3a0NuZFEva1ZBVUdZNTBxQlB6dUpxM3d6ekgwTm9iUGxRRU94VWdBSktmMXBqa21pQ01jeUx6RmtqVkEiLCJ1aW4iOiIxMDcxMDUyNTE4In0%3D&data=D9MYFXvlNZQMVoo3qCF2_rDaGzj1FH3eO5UAJXbJ6Y8X2IwdE1T5IgcV8zhXR50zP7uYcACydVH0OCVzmHRfdw&svctype=4&tempid=h5_group_info',
        '交流': 'https://qun.qq.com/universal-share/share?ac=1&authKey=w9clmZnE5frHG3hhwbhW09KEIj3WOT5Aul1n2AhDhMPeSiAfoIXH09dZw5Jr3op6&busi_data=eyJncm91cENvZGUiOiIzNDQ3OTE5NTYiLCJ0b2tlbiI6InhUYWh3a0NuZFEva1ZBVUdZNTBxQlB6dUpxM3d6ekgwTm9iUGxRRU94VWdBSktmMXBqa21pQ01jeUx6RmtqVkEiLCJ1aW4iOiIxMDcxMDUyNTE4In0%3D&data=D9MYFXvlNZQMVoo3qCF2_rDaGzj1FH3eO5UAJXbJ6Y8X2IwdE1T5IgcV8zhXR50zP7uYcACydVH0OCVzmHRfdw&svctype=4&tempid=h5_group_info',
        '频道': 'https://pd.qq.com/s/6s7k5tbcw?b=9',
        '通知': 'https://pd.qq.com/s/6s7k5tbcw?b=9',
        '官方': 'https://pd.qq.com/s/6s7k5tbcw?b=9'
    };
    
    // 查找匹配的页面
    let targetPage = null;
    for (const [keyword, page] of Object.entries(searchMap)) {
        if (query.includes(keyword)) {
            targetPage = page;
            break;
        }
    }
    
    if (targetPage) {
        showSearchMessage(`找到相关内容，正在跳转...`);
        setTimeout(() => {
            if (targetPage.startsWith('http')) {
                // 外部链接，在新窗口打开
                window.open(targetPage, '_blank');
            } else {
                // 内部页面，使用导航函数
                navigateToPage(targetPage);
            }
        }, 1000);
    } else {
        showSearchMessage('未找到相关内容，请尝试其他关键词');
    }
}

// 显示搜索消息
function showSearchMessage(message) {
    // 创建消息提示
    const messageDiv = document.createElement('div');
    messageDiv.className = 'search-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--glass-bg-secondary);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        padding: 16px 20px;
        color: var(--text-white);
        font-size: 14px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // 3秒后自动移除
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// 高亮搜索结果
function highlightSearchResults(query) {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        const content = card.textContent.toLowerCase();
        if (content.includes(query)) {
            card.style.border = '2px solid var(--accent-orange)';
            card.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.3)';
        } else {
            card.style.opacity = '0.5';
        }
    });
}

// 清除搜索高亮
function clearSearchHighlights() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.style.border = '';
        card.style.boxShadow = '';
        card.style.opacity = '';
    });
}

// 滚动效果初始化
function initializeScrollEffects() {
    // 监听滚动事件，添加视差效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.glass-container');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // 添加滚动到顶部按钮
    createScrollToTopButton();
}

// 创建返回顶部按钮
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-orange);
        border: none;
        color: white;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--elevation-3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // 点击返回顶部
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 卡片悬停效果增强
function enhanceCardHoverEffects() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .scroll-to-top:hover {
        background: var(--accent-orange-light) !important;
        transform: translateY(-2px) !important;
    }
`;
document.head.appendChild(style);

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 下载跟踪功能
function initializeDownloadTracking() {
    const downloadLinks = document.querySelectorAll('a[download]');

    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const fileName = this.getAttribute('download') || this.href.split('/').pop();

            // 显示下载开始提示
            showSearchMessage(`开始下载：${fileName}`);

            // 添加下载动画效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // 跟踪下载（可以用于统计）
            console.log(`文档下载：${fileName} - ${new Date().toISOString()}`);
        });

        // 添加悬停提示
        link.addEventListener('mouseenter', function() {
            const fileName = this.getAttribute('download') || '文档';
            this.title = `点击下载：${fileName}`;
        });
    });
}
