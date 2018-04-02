export function switchTabBar(userType, currentPages) {
  var tarBars = {
    userInfo: null,
    tabBarWorker: {
      color: '#999999',
      selectedColor: '#0ABA07',
      borderStyle: 'white',
      backgroundColor: '#f7f7fa',
      list: [
        {
          pagePath: 'pages/userData',
          text: '小时工',
          iconPath: 'images/home.png',
          selectedIconPath: 'images/home_HL.png',
          selected: false
        },
        {
          pagePath: 'pages/login',
          text: '登录',
          iconPath: 'images/my.png',
          selectedIconPath: 'images/my_HL.png',
          selected: true
        }
      ],
      position: 'bottom'
    },
    tabBarHotel: {
      color: '#999999',
      selectedColor: '#0ABA07',
      borderStyle: 'white',
      backgroundColor: '#f7f7fa',
      list: [
        {
          pagePath: 'pages/hotelData',
          text: '酒店',
          iconPath: 'images/home.png',
          selectedIconPath: 'images/home_HL.png',
          selected: false
        },
        {
          pagePath: 'pages/myForHotel',
          text: '我的',
          iconPath: 'images/my.png',
          selectedIconPath: 'images/my_HL.png',
          selected: false
        }
      ],
      position: 'bottom'
    },
    tabBarHR: {
      color: '#999999',
      selectedColor: '#0ABA07',
      borderStyle: 'white',
      backgroundColor: '#f7f7fa',
      list: [
        {
          pagePath: 'pages/myForManpower',
          text: '人力公司',
          iconPath: 'images/home.png',
          selectedIconPath: 'images/home_HL.png',
          selected: false
        },
        {
          pagePath: 'pages/aboutUs',
          text: '我的',
          iconPath: 'images/my.png',
          selectedIconPath: 'images/my_HL.png',
          selected: false
        }
      ],
      position: 'bottom'
    },
    formIds: []
  }
  var tabBar = {}
  // 根据角色选择不同的tabBar
  if (userType === 'worker') {
    tabBar = tarBars.tabBarWorker
  } else if (userType === 'hotel') {
    tabBar = tarBars.tabBarHotel
  } else if (userType === 'hr') {
    tabBar = tarBars.tabBarHR
  } else {
    tabBar = tarBars.tabBarWorker
  }
  console.log('userType:', userType, 'tabBar:', tabBar)
  var _this = currentPages[currentPages.length - 1]
  var pagePath = _this.__route__
  console.log('current path:', pagePath)
  if (pagePath.indexOf('/') !== 0) {
    (pagePath = '/' + pagePath)
  } // 如果tabBar.list[index].pagePath不是以“/”开始 则加上
  for (var i in tabBar.list) {
    tabBar.list[i].selected = false
    if (tabBar.list[i].pagePath === pagePath) {
      tabBar.list[i].selected = true
    }
  }
  _this.tabBar = tabBar
}
