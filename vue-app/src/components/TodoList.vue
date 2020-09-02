<template>
  <div>
    <center>
      <h1>Todo</h1>
      <div>
        <input
          type="text"
          placeholder="    What needs to be done"
          v-model="newTodo"
          @keyup.enter="addTodo"
          class="form-control"
        />
        &nbsp; &nbsp;
        <button
          type="button"
          class="btn btn-outline-success"
          id="addButton"
          @click="addTodo"
        >add</button>
      </div>
    </center>

    <br />
    <div v-for="(todo, index) in todos" :key="index">
      <div class="uncomplete">
        <input
          id="checkbox"
          class="checkbox"
          type="checkbox"
          v-model="todo.completed"
          @click="todo.checkboxStatus = true"
          v-if="!todo.complete && !todo.checkboxStatus"
        />
        &nbsp; &nbsp;
        <div style="display: inline">
          <div style="display: inline" v-if="!todo.editing" @dblclick="editTodo(todo)">
            <div style="display: inline" v-if="!todo.checkboxStatus">{{ todo.title }}</div>
          </div>
          <input
            v-else
            type="text"
            v-model="todo.title"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
            v-focus
          />
        </div>&nbsp;
        <!-- <button @click="delTodo(index)" class="delbutton" v-if="!todo.checkboxStatus">delete</button> -->
      </div>
    </div>

    <div class="complete">
      <h2>Todo Complete</h2>
      <div class="donetodo" v-for="(todo) in todos" :key="todo.id">
        <input
          id="checkbox"
          class="checkbox"
          type="checkbox"
          checked="true"
          @click="todo.checkboxStatus = false"
          v-if="todo.checkboxStatus"
        />
        <div v-if="todo.checkboxStatus" style="display:inline">
          <label class="donelist">{{ todo.title }}</label>
        </div>&nbsp; &nbsp;
        <button
          class="delbutton"
          @click="delTodo(todo)"
          v-if="todo.checkboxStatus"
        >delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase'
export default {
  name: 'todolist',
  props: {
    msg: String,
  },
  data() {
    return {
      newTodo: '',
      idForTodo: 3,
      beforeEdit: '',
      todos: [
        // {
        //   id: 1,
        //   title: 'homework1',
        //   completed: false,
        //   editing: false,
        //   checkboxStatus: false,
        // },
        // {
        //   id: 2,
        //   title: 'homework2',
        //   completed: false,
        //   editing: false,
        //   checkboxStatus: false,
        // },
      ],
    }
  },
  firestore() {
    return {
      todos: db.collection('todos'),
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      },
    },
  },
  methods: {
    addTodo() {
      this.$firestore.todos.add({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false,
        checkboxStatus: false,
      })
      this.newTodo = ''
    },
    delTodo(todo) {
      this.$firestore.todos.doc(todo['.key']).delete()
    },
    editTodo(todo) {
      // this.beforeEdit = todo.title
      // todo.editing = true
      this.$firestore.todos.doc(todo['.key']).update()
    },
    doneEdit(todo) {
      // ถ้าแก้ไขโดยลบทั้งหมด จะกลายเป็นค่าเดิมก่อนแก้ไข
      if (todo.title.length === 0) {
        todo.title = this.beforeEdit
      }
      todo.editing = false
    },
    cancelEdit(todo) {
      todo.title = this.beforeEdit
      todo.editing = false
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@background: #4fc08d;
@white: rgb(255, 255, 255);
@gray: rgb(75, 75, 75);
div {
  background-color: @white;
  color: @gray;
}

// เมื่อติ๊ก checkbox จะขีดฆ่า todo ที่ทำเสร็จแล้ว
.donelist {
  text-decoration: line-through;
  color: grey;
}

// ช่องเพิ่ม todo
input[type='text'] {
  border-radius: 20px;
  width: 250px;
  height: 30px;
  display: inline;
  border-width: thin;
  border-color: #e1e1e1;
}

// ช่อง checkbox
input[type='checkbox'] {
  background-color: @background;
}

// ปุ่ม add todo
.btn-outline-success {
  color: @white;
  background-color: #2c3e50;
  border-radius: 20px;

  height: 30px;
  border-style: none;
  width: 70px;
}
.btn-outline-success:hover {
  color: #2c3e50;
  font-weight: bold;
  background-color: #e7e7e7;
}

// ปุ่ม delete
.delbutton {
  .btn-outline-success;
  background-color: #3aa374;
}
.delbutton:hover {
  color: @background;
  font-weight: bold;
  background-color: #e7e7e7;
}
.donetodo {
  text-align: left;
  padding: 5px;
  padding-left: 39%;
}
.uncomplete {
  .donetodo;
}
</style>
