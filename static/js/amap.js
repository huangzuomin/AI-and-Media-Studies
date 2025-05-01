// 高德地图初始化
function initAMap(containerId, longitude, latitude, zoom, title) {
  // 创建地图实例
  var map = new AMap.Map(containerId, {
    zoom: zoom,
    center: [longitude, latitude]
  });
  
  // 创建标记
  var marker = new AMap.Marker({
    position: new AMap.LngLat(longitude, latitude),
    title: title
  });
  
  // 将标记添加到地图
  map.add(marker);
  
  // 添加控制插件
  map.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
    map.addControl(new AMap.ToolBar());
    map.addControl(new AMap.Scale());
  });
}

// 在文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 检查地图容器是否存在
  var container = document.getElementById('amap-container');
  if (container) {
    // 从容器的data属性获取参数
    var longitude = parseFloat(container.getAttribute('data-longitude'));
    var latitude = parseFloat(container.getAttribute('data-latitude'));
    var zoom = parseInt(container.getAttribute('data-zoom'));
    var title = container.getAttribute('data-title');
    
    // 初始化地图
    initAMap('amap-container', longitude, latitude, zoom, title);
  }
}); 