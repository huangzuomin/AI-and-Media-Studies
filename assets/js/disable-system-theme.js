// 禁用系统主题自动切换
(function() {
  'use strict';
  
  // 强制移除dark类（如果存在）
  function forceRemoveDarkClass() {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    }
    
    // 确保body也没有dark相关类
    if (document.body && document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
    }
  }
  
  // 覆盖可能的系统主题检测
  function disableSystemThemeDetection() {
    // 如果存在matchMedia，覆盖prefers-color-scheme检测
    if (window.matchMedia) {
      const originalMatchMedia = window.matchMedia;
      window.matchMedia = function(query) {
        // 如果查询是关于prefers-color-scheme的，总是返回light模式
        if (query.includes('prefers-color-scheme')) {
          return {
            matches: query.includes('light'),
            media: query,
            onchange: null,
            addListener: function() {},
            removeListener: function() {},
            addEventListener: function() {},
            removeEventListener: function() {},
            dispatchEvent: function() { return true; }
          };
        }
        return originalMatchMedia.call(this, query);
      };
    }
  }
  
  // 监听DOM变化，防止动态添加dark类
  function observeDOMChanges() {
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            forceRemoveDarkClass();
          }
        });
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
  }
  
  // 初始化
  function init() {
    // 立即执行
    forceRemoveDarkClass();
    disableSystemThemeDetection();
    
    // DOM加载完成后再次执行
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        forceRemoveDarkClass();
        observeDOMChanges();
      });
    } else {
      forceRemoveDarkClass();
      observeDOMChanges();
    }
    
    // 页面加载完成后再次执行
    window.addEventListener('load', forceRemoveDarkClass);
    
    // 定期检查（作为最后的保障）
    setInterval(forceRemoveDarkClass, 1000);
  }
  
  // 立即执行初始化
  init();
  
  // 确保localStorage中的主题设置为light
  try {
    localStorage.setItem('theme', 'light');
  } catch (e) {
    // 忽略localStorage错误
  }
})();