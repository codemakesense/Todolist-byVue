// 全局注册 todo-list 组件
Vue.component("todo-list", {
    // 传入app模块的list数组和deltodo方法
    props: ["list", "deltodo" ],
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
        getCheckedValue (checked) {
            if (checked == true) {
                this.ischecked = true
            } else if (checked == false) {
                this.ischecked = false
            }
        },
    }
    
})
// 注册 add-todolist 组件
Vue.component("add-todolist", {
    // 传入Vue实例的 addtodo方法
    props: ["addtodo", ],
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
            >添加到待办事项</button>
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
        todoLists: [
            {key: 0, index: 0, title: "定一个写Vue应用的小目标", visible: true },
            {key: 1, index: 1, title: "定一个晚上12点前睡觉的小目标", visible: true },
            {key: 2, index: 2, title: "定一个明年2月份前换工作的小目标", visible: true },
            {key: 3, index: 3, title: "定一个学会Vue、ES6和Node.js技术栈的小目标", visible: true },
            {key: 4, index: 4, title: "这个应用已经阶段性完成，后面继续调试即可", visible: true },
        ],
        newTodo: "",    // 接收输入框的新待办事项
        deleteIndex: Number // 定义删除事项在数组的序号的变量类型
    },

    methods: {
        // 删除待办事项函数
        deleteTodo: function (arr, indx) {
            // 先将li元素是否可见设为false
            arr.visible = false
            // 修改数组，删除传入排序为indx参数的数组项
            this.todoLists.splice(indx, 1)
            // 重新遍历一次数组，将每个数组项的index属性初始化（即从头排序）
            for (var i = 0; i < this.todoLists.length; i++) {
                this.todoLists[i].index = i
            }
        },
        // 增加待办事项函数
        addTodo: function (addItem) {
            // 判断输入框中的文本是否为空
            if (addItem == "") {
                // 为空则提出提示
                alert("请输入有效的待办事项")
              // 插入到数组中，同时将key和index按数组长度顺序赋值  
            } else this.todoLists.push({key: this.todoLists.length, index: this.todoLists.length, title: addItem, visible: true, isfinish: false})
        },
        
    },

    computed: {
        // 实时统计数组中待办项的总数
        showLength: function () {
            var countLists = this.todoLists.length
            return countLists
        },
    }
})