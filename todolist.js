// 全局注册 todo-list-work 组件
Vue.component("todo-list-work", {
  // 传入app模块的list数组和deltodo方法
  props: ["list", "deltodo"],
  // 初始化待办事项是否可见的checkbox的属性，ischecked
  data: function () {
    return {
      ischecked: false,
    }
  },
  // 设置组件模板 
  // 点击checkbox时，调用getCheckedValue函数
  // 将list.title所在的span元素的class是否生效为与ischecked关联，
  // 点击删除按钮时调用Vue实例中的deltodo方法并传入两个参数，当前的list以及对应的list.index
  template: `
        <div class="content-list">
            <div class="finish-input">
                <input type="checkbox"
                    v-on:click="getCheckedValue($event.target.checked)"
                >
            </div>
            <div
                v-bind:class="{ 'todo-list-fin': ischecked }"
                class="todo-list"
            >{{ list.title }}</div>
            <div class="del-button">
                <button
                    v-on:click="deltodo(list, list.index)"
                >删除</button>
            </div>
        </div>
    `,
  methods: {
    // 定义开关checked方法，点击一次则变更ischecked的boolean属性
    getCheckedValue(checked) {
      if (checked == true) {
        this.ischecked = true
        this.list.isfinished = true
      } else if (checked == false) {
        this.ischecked = false
        this.list.isfinished = false
      }
    },
  }

})

// 全局注册 todo-list-learn 组件
Vue.component("todo-list-learn", {
  // 传入app模块的list数组和deltodo方法
  props: ["list", "deltodo"],
  // 初始化待办事项是否可见的checkbox的属性，ischecked
  data: function () {
    return {
      ischecked: false,
    }
  },
  // 设置组件模板 
  // 点击checkbox时，调用getCheckedValue函数
  // 将list.title所在的span元素的class是否生效为与ischecked关联，
  // 点击删除按钮时调用Vue实例中的deltodo方法并传入两个参数，当前的list以及对应的list.index
  template: `
        <div class="content-list">
            <div class="finish-input">
                <input type="checkbox"
                    v-on:click="getCheckedValue($event.target.checked)"
                >
            </div>
            <div
                v-bind:class="{ 'todo-list-fin': ischecked }"
                class="todo-list"
            >{{ list.title }}</div>
            <div class="del-button">
                <button
                    v-on:click="deltodo(list, list.index)"
                >删除</button>
            </div>
        </div>
    `,
  methods: {
    // 定义开关checked方法，点击一次则变更ischecked的boolean属性
    getCheckedValue(checked) {
      if (checked == true) {
        this.ischecked = true
        this.list.isfinished = true
      } else if (checked == false) {
        this.ischecked = false
        this.list.isfinished = false
      }
    },
  }

})


// 注册 add-todolist 组件
Vue.component("add-todolist", {
  // 传入Vue实例的 addtodo方法
  props: ["addtodo",],
  // 设置组件模板
  // 将输入框的值与inputValue变量进行绑定
  // 当输入框的值变更时，更新inputValue的值为输入框的值
  // 为输入框 回车事件 和 添加待办按钮 点击事件 添加事件监听，并触发pushTodolist
  template: `
        <div>
            <input 
                placeholder="请输入待办事项" 
                v-bind:value="inputValue"
                v-on:input="inputValue = $event.target.value"
                v-on:keyup.enter="pushTodolist"
                class="addlist-input"
            >
            <button 
                v-on:click="pushTodolist"
                class="addlist-btn"
            >+ 添加到待办事项</button>
            <slot></slot>
        </div>
        ` ,
  // 初始化输入框的inputValue值
  data: function () {
    return {
      inputValue: ""
    }
  },

  methods: {
    // 定义方法，向父组件add-todolist传入调用Vue实例的addtodo方法的请求，并将输入框的值作为参数一起传入
    // 同时清空输入框的值
    pushTodolist: function () {
      this.$emit('addtodo', this.inputValue)
      this.inputValue = ""
    }
  }

})

var todoContent = new Vue({
  // 绑定在ID为todolist-app的元素下
  el: "#todolist-app",

  // 初始化一些变量
  data: {
    todoWorkLists: [
      { key: 0, index: 0, visible: true, type: "work", isfinished: false, title: "定一个晚上12点前睡觉的小目标" },
      { key: 1, index: 1, visible: true, type: "work", isfinished: false, title: "定一个晚上12点前睡觉的小目标" },
      { key: 2, index: 2, visible: true, type: "work", isfinished: false, title: "定一个晚上12点前睡觉的小目标" },
      { key: 3, index: 3, visible: true, type: "work", isfinished: false, title: "定一个晚上12点前睡觉的小目标" },
      { key: 4, index: 4, visible: true, type: "work", isfinished: false, title: "定一个晚上12点前睡觉的小目标" },
      { key: 5, index: 5, visible: true, type: "learn", isfinished: false, title: "学点有用的东西" },
      { key: 6, index: 6, visible: true, type: "learn", isfinished: false, title: "学点有用的东西" },
      { key: 7, index: 7, visible: true, type: "learn", isfinished: false, title: "学点有用的东西" },
      { key: 8, index: 8, visible: true, type: "learn", isfinished: false, title: "学点有用的东西" },
      { key: 9, index: 9, visible: true, type: "learn", isfinished: false, title: "学点有用的东西" },
    ],
    currentLists: [],
    tabs: [
      { type: "work", name: "工作" },
      { type: "learn", name: "学习" }
    ],
    currentTab: "work",
    newTodo: "",    // 接收输入框的新待办事项
    deleteIndex: Number // 定义删除事项在数组的序号的变量类型
  },

  methods: {
    // 删除待办事项函数
    deleteTodo: function (arr, indx) {
      // 先将li元素是否可见设为false
      arr.visible = false
      // 修改数组，删除传入排序为indx参数的数组项
      this.currentLists.splice(indx, 1)
      // 重新遍历一次数组，将每个数组项的index属性初始化（即从头排序）
      for (var i = 0; i < this.currentLists.length; i++) {
        this.currentLists[i].index = i
      }
    },
    // 增加待办事项函数
    addTodo: function (addItem) {
      // 判断输入框中的文本是否为空
      if (addItem == "") {
        // 为空则提出提示
        alert("请输入有效的待办事项")
        // 插入到数组中，同时将key和index按数组长度顺序赋值  
      } else this.todoWorkLists.push({ key: this.todoWorkLists.length, index: this.currentLists.length, type: this.currentTab, title: addItem, visible: true, isfinished: false })
    },
    /*changeTodolists: function () {
        this.currentTab = this.tabs.type
        this.currentLists = 
    }*/
  },

  computed: {
    // 实时统计数组中待办项的总数
    countList: function () {
      var count = this.currentLists.length
      return count
    },
    countUnfinished() {
      var count = 0
      for (let i = 0; i < this.currentLists.length; i++) {
        if (this.currentLists[i].isfinished == false) {
          count = count + 1
        }
      }
      return count
    },
    currentTabComponent: function () {
      return "todo-list-" + this.currentTab.toLowerCase()
    },
    getTypeLists: function () {
      return this.currentLists = this.todoWorkLists.filter(item => item.type == this.currentTab)
    }
  },

  /*created: function () {
      this.currentLists = this.todoWorkLists
  }*/
})