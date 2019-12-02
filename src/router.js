import Vue from 'vue'
import VueRouter from 'vue-router'


//如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(Router)
Vue.use(VueRouter);

//export和export default最大的区别
//就是export不限变量数 可以一直写，而export default 只输出一次 ;
//而且 export出的变量想要使用必须使用{}来盛放，而export default 不需要 只要import任意一个名字来接收对象即可。
// 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。

//1-路由懒加载 2- 默认页面/  404错误页面*
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login'),
    meta: {
      title: 'login',
      isShowFooter: false
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('./views/Home/Index'),
    meta: {
      title: 'home',
      isShowFooter: true
    }
  },
  {
    path: '/scan',
    name: 'scan',
    component: () => import('./views/Scan/Index.vue'),
    meta: {
      title: 'scan',
      isShowFooter: false
    }
  },
  {
    path: '/work',
    name: 'work',
    component: () => import('./views/Work/Index.vue'),
    meta: {
      title: 'work',
      isShowFooter: false
    }
  },
  {
    path: '/workDetail',
    name: 'workDetail',
    component: () => import('./views/Work/Detail.vue'),
    meta: {
      title: 'workDetail',
      isShowFooter: false
    }
  },
  {
    path: '/task',
    name: 'task',
    component: () => import('./views/Task/Index.vue'),
    meta: {
      title: 'task',
      isShowFooter: true
    }
  },
  {
    path: '/taskSub',
    name: 'taskSub',
    component: () => import('./views/Task/Subpage.vue'),
    children: [
      {
        path: 'inspectionList',
        name: 'inspectionList',
        component: () => import('./views/Task/Inspection/List.vue'),
        meta: {
          title: 'inspectionList',
          isShowFooter: false
        }
      },
      {
        path: 'inspectionDetail',
        name: 'inspectionDetail',
        component: () => import('./views/Task/Inspection/Detail.vue'),
        meta: {
          title: 'inspectionDetail',
          isShowFooter: false
        }
      },
      {
        path: 'inspectionTodo',
        name: 'inspectionTodo',
        component: () => import('./views/Task/Inspection/Todo.vue'),
        meta: {
          title: 'inspectionTodo',
          isShowFooter: false
        }
      },
      {
        path: 'inspectionTodoDetail',
        name: 'inspectionTodoDetail',
        component: () => import('./views/Task/Inspection/TodoDetail.vue'),
        meta: {
          title: 'inspectionTodoDetail',
          isShowFooter: false
        }
      },
      {
        path: 'inspectionFeedback',
        name: 'inspectionFeedback',
        component: () => import('./views/Task/Inspection/Feedback.vue'),
        meta: {
          title: 'inspectionFeedback',
          isShowFooter: false
        }
      },
      {
        path: 'repairList',
        name: 'repairList',
        component: () => import('./views/Task/Repair/List.vue'),
        meta: {
          title: 'repairList',
          isShowFooter: false
        }
      },
      {
        path: 'repairDetail',
        name: 'repairDetail',
        component: () => import('./views/Task/Repair/Detail.vue'),
        meta: {
          title: 'repairDetail',
          isShowFooter: false
        }
      },
      {
        path: 'repairFeedback',
        name: 'repairFeedback',
        component: () => import('./views/Task/Repair/Feedback.vue'),
        meta: {
          title: 'repairFeedback',
          isShowFooter: false
        }
      },
    ],
    meta: {
      title: 'taskSub',
      isShowFooter: true
    }
  },
  {
    path: '/message',
    component: () => import('./views/Message/Index.vue'),
    children: [
      {
        path: '',
        name: 'messageHome',
        component: () => import('./views/Message/Home/Index.vue'),
        meta: {
          title: 'messageHome',
          isShowFooter: false
        }
      },
      {
        path: 'messageAlarm',
        name: 'messageAlarm',
        component: () => import('./views/Message/Alarm/List.vue'),
        meta: {
          title: 'messageAlarm',
          isShowFooter: false
        }
      },
      {
        path: 'messageAlarmDetail',
        name: 'messageAlarmDetail',
        component: () => import('./views/Message/Alarm/Detail.vue'),
        meta: {
          title: 'messageAlarmDetail',
          isShowFooter: false
        }
      },
      {
        path: 'messageNotice',
        name: 'messageNotice',
        component: () => import('./views/Message/Notice/List.vue'),
        meta: {
          title: 'messageNotice',
          isShowFooter: false
        }
      },
      {
        path: 'messageNoticeDetail',
        name: 'messageNoticeDetail',
        component: () => import('./views/Message/Notice/Detail.vue'),
        meta: {
          title: 'messageNoticeDetail',
          isShowFooter: false
        }
      }
    ],
    meta: {
      title: 'message',
      isShowFooter: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('./views/User/Index.vue'),
    meta: {
      title: 'user',
      isShowFooter: true
    }
  },
  {
    path: '/basicUser',
    name: 'basicUser',
    component: () => import('./views/User/BasicUser.vue'),
    meta: {
      title: 'basicUser',
      isShowFooter: false
    }
  },
  {
    path: '/passwordModify',
    name: 'passwordModify',
    component: () => import('./views/User/PasswordModify.vue'),
    meta: {
      title: 'passwordModify',
      isShowFooter: false
    }
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('./views/User/Help.vue'),
    meta: {
      title: 'help',
      isShowFooter: false
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/User/About.vue'),
    meta: {
      title: 'about',
      isShowFooter: false
    }
  },
  {
    path: '/taskQuery',
    name: 'taskQuery',
    component: () => import('./views/TaskQuery/Index.vue'),
    meta: {
      title: 'taskQuery',
      isShowFooter: false
    }
  },
  {
    path: '/taskQueryList',
    name: 'taskQueryList',
    component: () => import('./views/TaskQuery/List.vue'),
    meta: {
      title: 'taskQueryList',
      isShowFooter: false
    }
  },
  {
    path: '/alarmQuery',
    name: 'alarmQuery',
    component: () => import('./views/AlarmQuery/Index.vue'),
    meta: {
      title: 'alarmQuery',
      isShowFooter: false
    }
  },
  {
    path: '/alarmQueryList',
    name: 'alarmQueryList',
    component: () => import('./views/AlarmQuery/List.vue'),
    meta: {
      title: 'alarmQueryList',
      isShowFooter: false
    }
  },
  {
    path: '/alarmQueryDetail',
    name: 'alarmQueryDetail',
    component: () => import('./views/AlarmQuery/Detail.vue'),
    meta: {
      title: 'alarmQueryDetail',
      isShowFooter: false
    }
  },
  {
    path: '/pipeQuery',
    name: 'pipeQuery',
    component: () => import('./views/PipeQuery/Index.vue'),
    meta: {
      title: 'pipeQuery',
      isShowFooter: false
    }
  },
  {
    path: '/pipeQueryList',
    name: 'pipeQueryList',
    component: () => import('./views/PipeQuery/List.vue'),
    meta: {
      title: 'pipeQueryList',
      isShowFooter: false
    }
  },
  {
    path: '/pipeLineQuery',
    name: 'pipeLineQuery',
    component: () => import('./views/PipeLineQuery/Index.vue'),
    meta: {
      title: 'pipeLineQuery',
      isShowFooter: false
    }
  },
  {
    path: '/pipeLineQueryList',
    name: 'pipeLineQueryList',
    component: () => import('./views/PipeLineQuery/List.vue'),
    meta: {
      title: 'pipeLineQueryList',
      isShowFooter: false
    }
  },
  {
    path: '/pipeLineQueryDetail',
    name: 'pipeLineQueryDetail',
    component: () => import('./views/PipeLineQuery/Detail.vue'),
    meta: {
      title: 'pipeLineQueryDetail',
      isShowFooter: false
    }
  },
  {
    path: '/deviceQuery',
    name: 'deviceQuery',
    component: () => import('./views/DeviceQuery/Index.vue'),
    meta: {
      title: 'deviceQuery',
      isShowFooter: false
    }
  },
  {
    path: '/deviceQueryList',
    name: 'deviceQueryList',
    component: () => import('./views/DeviceQuery/List.vue'),
    meta: {
      title: 'deviceQueryList',
      isShowFooter: false
    }
  },
  {
    path: '/environmentalMonitoring',
    name: 'environmentalMonitoring',
    component: () => import('./views/EnvironmentalMonitoring/Info.vue'),
    meta: {
      title: 'environmentalMonitoring',
      isShowFooter: false
    }
  },
  {
    path: '/environmentalMonitoringList',
    name: 'environmentalMonitoringList',
    component: () => import('./views/EnvironmentalMonitoring/List.vue'),
    meta: {
      title: 'environmentalMonitoringList',
      isShowFooter: false
    }
  },
  {
    path: '/statistic',
    name: 'statistic',
    component: () => import('./views/Statistic/Index.vue'),
    meta: {
      title: 'statistic',
      isShowFooter: false
    }
  },
];

routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new VueRouter({ 
  // mode: 'history',
  routes: routes,
  //滚动行为。这个功能只在支持 history.pushState 的浏览器中可用 (to, from, savedPosition)
  scrollBehavior (to) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if(title) {
    document.title = title;
  }
  next();
});

export {
  router
}

