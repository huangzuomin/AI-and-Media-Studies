// 导航栏滚动隐藏脚本 - 仅在移动设备上启用
document.addEventListener('DOMContentLoaded', function() {
  // 等待页面完全加载
  window.addEventListener('load', function() {
    initNavScrollHide();
  });
  
  function initNavScrollHide() {
    const header = document.querySelector('.header');
    if (!header) {
      console.log('导航栏元素未找到');
      return;
    }

    let lastScrollTop = 0;
    let scrollThreshold = 10; // 滚动超过多少像素触发隐藏/显示
    let isMobile = false; // 是否为移动设备
    const scrollThresholdForClass = 50; // 滚动多少像素添加scrolled类
    
    // 为导航栏添加过渡效果的类
    header.classList.add('nav-transition');
    
    // 检测设备类型
    function checkDeviceType() {
      isMobile = window.innerWidth < 992; // 小于992px视为移动设备
    }
    
    function handleScroll() {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // 添加scrolled类（适用于所有设备）
      if (currentScrollTop > scrollThresholdForClass) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // 如果不是移动设备，则不隐藏导航栏
      if (!isMobile) {
        header.classList.remove('nav-hidden');
        return;
      }
      
      // 如果在页面顶部，始终显示导航栏
      if (currentScrollTop <= 0) {
        header.classList.remove('nav-hidden');
        lastScrollTop = currentScrollTop;
        return;
      }
      
      // 检查滚动方向和距离是否超过阈值
      if (Math.abs(lastScrollTop - currentScrollTop) <= scrollThreshold) {
        return;
      }
      
      // 向下滚动 - 隐藏导航栏
      if (currentScrollTop > lastScrollTop && currentScrollTop > header.offsetHeight) {
        header.classList.add('nav-hidden');
      } 
      // 向上滚动 - 显示导航栏
      else {
        header.classList.remove('nav-hidden');
      }
      
      lastScrollTop = currentScrollTop;
    }
    
    // 初始检查设备类型
    checkDeviceType();
    
    // 监听窗口大小变化，重新检测设备类型
    window.addEventListener('resize', function() {
      checkDeviceType();
      handleScroll(); // 重新处理滚动状态
    });
    
    // 使用普通的滚动事件监听器
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 立即执行一次处理，确保初始状态正确
    handleScroll();
  }
}); 