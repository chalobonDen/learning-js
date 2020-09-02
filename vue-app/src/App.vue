<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <TodoList />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TodoList from 'd:/internship/webapp-starter-master/vue-app/src/components/TodoList.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    TodoList,
  },
  mounted() {
    this.getAPIVersion()
  },
  methods: {
    getAPIVersion() {
      axios
        .get('/api/version')
        .then((response) => {
          console.log(`version=${response.data}`)
        })
        .catch((error) => {
          console.error('error:', error.status, error)
        })
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
