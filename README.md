# 项目相关问题(重要)
## 初始化显示时出错
```
   Cannot read property '0' of undefined"
   Cannot read property 'avatar' of null"
    原因: 初始化数据对象为{}, 模板中使用了3层的表达式
    解决: 使用v-if, 只有真正有数据进才显示
```

## 在组件中, 非组件的回调函数中更新状态, 界面不变化
- 原因: 非组件的回调函数中的this不是组件对象
- 解决: 使用箭头函数定义回调函数

## 创建好BScroll对象, 样式都生成了, 就是不能滑动
- 原因: 创建BScroll对象时, 列表没有显示(状态已经更新, 但列表更新是异步的)
- 解决: 在列表更新之后才创建BScroll对象: this.$nextTick(() => {创建BScroll对象})

## 更新状态数据, 对应的界面不变化
- 原因: 一般方法给一个已有绑定的对象中添加一个新的属性, 这个属性没有数据绑定
- 解决: ``this.$set(obj, 'xxx', value)才有数据绑定``
  - ``Vue.set(obj, 'xxx', value)才有数据绑定``

## 点击添加购物项, 会1次添加多个
- 原因: 创建了多个BScroll对象来管理同一个DOM元素
- 解决: 只创建一个BScroll对象
- 扩展: 单例对象:
  - 创建前, 先判断是否已经存在, 只有不存在才创建
  - 创建后, 保存创建的对象

## 点击添加购物项时, 同时还打开食物详情
- 原因: 外部元素也响应了点击事件, 因为事件有冒泡
- 解决: 停止事件冒泡 @click.stop="xxx"

## 如果从其它路由切换过来显示没有问题, 如果直接刷新当前路由就报错
- 原因: 两种访问的方式, 创建组件对象时, 传给组件对象的数据不一样
- 解决: 在初始化, 判断只有有数据时才创建Scroll对象    ---从其它路由跳转过来
  - 监视数据的变化, 当数据变化时创建Scroll对象    ---在当前路由上刷新

## 项目开发准备
- 如何描述项目: 整体功能 / 功能模块 / 主体技术 / 开发模式
- 技术选型: 数据展现与交互 / 前后台交互 / 模块化 / 组件化 / 工程化 / css预编译器 / 滑动
- 接口相关概念: 接口 / 接口文档 / 对(调/测)接口 / 前后台分离 / mock数据(接口)
- 项目的编码测试与打包发布

## 搭建项目骨架
```
    vue-cli
    vue
    webpack
    es6
    eslint
    vue-router
    stylus
```

## mock数据(接口)
- 理解前后台分离
- 设计json数据
  - 结构: 类型/名称
  - value
- 如何提供mock接口
  - express: 可以使用浏览器/postman测试, 但只能提供静态数据, 打包发布不能访问了
  - mockjs: 只能通过编码测试访问, 但可以提供动态随机数据, 打包发布还可以访问
- 编码ajax请求mock接口
  - vue-resource
  - axios

## header静态组件
- 使用stylus根据标注图编写移动端布局
- 图标字体
- 1px像素边框
- stiky footer(粘连)布局
- 2x与3x图
- flex布局

## 使用vuex
- 使用vuex来动态管理我们项目所需要的各种数据
- store/index | state | mutations | actions | getters | types


# 初始化动态组件
## header动态组件
- 头部组件
- 动态请求后台获取数据
  - api/index: 包含发送ajax请求的代码(不读取响应数据, 只是返回一个promise对象)
  - store/actions: 调用api发送ajax请求获取响应数据, 更新状态
  - 在组件的mounted(): 通过this.$store.dispatch(actionName)触发action调用, ajax请求获取数据
  - 在组件中: 利用mapState映射state中的seller数据成计算属性, 在模板中直接使用seller
- 过渡动画

## stars组件
- 封装了评星组件
- 组件的作用
  - 复用
  - 简化
- vue组件编写的流程
  - 创建对应的文件夹和vue文件
  - 分析并定义出组件的props/state
  - 使用vue组件: 写标签, 并指定标签属性
  - vue文件的实现
- 在模板中需要的数据, 从哪取
  - data
  - props
  - computed

## goods组件
- 商品列表的全部分类与展现
- 动态展现列表数据
- 基本滑动
- 点击左侧列表项, 右侧滑动到对应位置
- 滑动右侧列表, 左侧同步更新

## cartcontrol组件
- 购买食物的蓝色加号按钮
- 使用vuex管理food的count
- transition动画

## shopcart组件
- 底部购物车模块的编写
- BScroll的创建和刷新

## food组件
- food路由组件的实现，具体食物的详情页
- 父组件中调用子组件的方法: this.$refs.child.xxx() 用来操作子组件或者获取数据
- 列表的过滤显示: 计算属性-->arr.filter()-->

## ratingselect组件
- 父子组件通信: vue自定义事件机制
  - 绑定事件监听: 父组件中, 通过子组件标签 @xxx='fn'
  - 分发事件: 子组件中, this.$emit('xxx', data)

## ratings组件
- 用户评论组件的实现
- 多个组件重复的代码如何简化: minxin技术
  - 在minxins中定义包含相同组件配置代码的对象
  - 在多个组件中通过mixins配置引入定义在minxins中的代码
  - 实现js代码的复用

## seller组件
- 在商家实景中创建横向滑屏出现异常问题
- 异常问题的分析
  - 本地路由跳转
  - 刷新当前页面(不会再次创建BScroll对象)
- 数据监视
  - 通过watch来监视seller的变换解决异常问题

## vue插件
- vue-lazyload: 图片懒加载
```
    npm install --save vue-lazyload
    import VueLazyload from 'vue-lazyload'
    import loading from './common/imgs/loading.gif'

    Vue.use(VueLazyload, {
      loading
    }) // 内部会自定义一个全局指令 lazy来实现图片懒加载
    <img v-lazy="food.image">
```
- vue-scroller: 界面滑动
```
    npm install --save vue-scroller@2.2.1
    import VueScroller from 'vue-scroller'
    Vue.use(VueScroller)

    <scroller>列表div</scroller>
```

## 小球动画
1). 在页面定义6个小球的div, 并实现6个小球循环使用 (比每次创建一个新的div效率要高)
2). 利用vue中transition的钩子(生命周期回调函数)函数去控制动画(动画的起始是动态的, 通过样式无法指定)
3). 小球是两个嵌套的div组成(x轴与y轴的动画效果是不一样的)
4). 组件(父子或兄弟)间通信
    PubSubJS(消息订阅与发布/全局事件总线)
5). 强制重排与重绘
    https://www.cnblogs.com/zichi/p/4720000.html
6). 需要在transition标签上加上:css='false'禁止transition的样式

## vue UI库使用: mint-ui/element-ui/iview
- 引入mint-ui
- 实现按需自动打包使用的组件和样式
- 组件的分类
  - 标签组件
  - 函数组件

## 路由组件缓存与懒加载
- 路由组件缓存:
  - ``<keep-alive><router-view/></keep-alive>``
- 懒加载:
```
  import goods from '../pages/goods/goods.vue'
  const goods = () => import('../pages/goods/goods.vue')
```
