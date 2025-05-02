/**
 * 处理导航栏在滚动时隐藏/显示的功能 (移动端)
 */
function handleHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return; // 如果找不到 header 元素，则退出

  let lastScrollTop = 0;
  const delta = 5; // 滚动阈值，避免过于敏感
  const navbarHeight = header.offsetHeight; // 获取导航栏高度

  window.addEventListener('scroll', function() {
    // 仅在移动设备宽度下执行 (例如小于 1024px)
    if (window.innerWidth >= 1024) {
      // 如果屏幕宽度大于等于 lg 断点，确保 header 是可见的
      if (header.classList.contains('header-hidden')) {
        header.classList.remove('header-hidden');
      }
      return; // 在大屏幕上不执行隐藏逻辑
    }

    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 确保滚动超过导航栏高度才开始判断
    if (Math.abs(lastScrollTop - currentScrollTop) <= delta) {
      return;
    }

    if (currentScrollTop > lastScrollTop && currentScrollTop > navbarHeight) {
      // 向下滚动，隐藏导航栏
      header.classList.add('header-hidden');
    } else {
      // 向上滚动，显示导航栏
      if (currentScrollTop + window.innerHeight < document.documentElement.scrollHeight) {
         header.classList.remove('header-hidden');
      }
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // 处理滚动到顶部的情况
  }, false);
}

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  handleHeaderScroll();
  // ... 可能存在的其他初始化代码 ...
});

// 如果您的 script.js 已经有 DOMContentLoaded 监听器，
// 只需将 handleHeaderScroll(); 调用放入现有的监听器中即可。
// 例如:
/*
document.addEventListener('DOMContentLoaded', function() {
  // ... 其他代码 ...
  handleHeaderScroll();
});
*/