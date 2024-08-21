<script setup>
import AddTask from './AddTask.vue';
import EditTask from './EditTask.vue';
import DeleteTask from './DeleteTask.vue';

import { onMounted, ref, watch } from 'vue';

const popupTrigger = ref({
  addButtonTrigger: false,
  editButtonTrigger: false,
  deleteButtonTrigger: false
});

const TogglePopup = (trigger) => {
  popupTrigger.value[trigger] = !popupTrigger.value[trigger]
  console.log(popupTrigger.value[trigger]);
}

const todo = ref([])
const editableTask = ref({});
let editingIndex = null;

watch(todo, (newVal) => {
  localStorage.setItem('todo', JSON.stringify(newVal))
}, {
  deep: true
})

onMounted(() => {
  todo.value = JSON.parse(localStorage.getItem('todo')) || []
  console.log(todo.value);
})

const updateTask = (index) => {
  editingIndex = index
  editableTask.value = { ...todo.value[index] }
  TogglePopup('editButtonTrigger')
  console.log(editableTask.value);
}

const bully = ref('')

</script>

<template>
  <div class="container">
    <div class="hero">
      <h2>TODO APP</h2>
      <div class="search">
        <input type="text" class="search">
        <div @click="TogglePopup('addButtonTrigger')" class="custom-button">+</div>
      </div>

      <!-- Add Todo modal -->
      <AddTask v-if="popupTrigger.addButtonTrigger" :togglePopup="() => TogglePopup('addButtonTrigger')"
        :value="todo" />

      <!-- Edit Todo modal -->
      <EditTask v-if="popupTrigger.editButtonTrigger" :togglePopup="() => TogglePopup('editButtonTrigger')"
        :value="todo" :task="editableTask" :editIndex="editingIndex" />

      <!-- Delete Todo modal -->
      <DeleteTask v-if="popupTrigger.deleteButtonTrigger" :togglePopup="() => TogglePopup('deleteButtonTrigger')"
        :value="todo" :ace="bully" />


      <div v-for="(task, index) in todo" :key="index" class="items">

        <input type="checkbox" v-model="todo[index].status" />

        <label for="name">{{ task.content }}</label>
        <div class="but">
          <div class="custom-button" @click="updateTask(index)">edit</div>
          <!-- <button @click="updateTask(index)">edit</button> -->
           <div class="custom-button" @click="TogglePopup('deleteButtonTrigger'), bully = index">X </div>
          <!-- <button @click="TogglePopup('deleteButtonTrigger'), bully = index">x</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  padding: 0px;
  margin: 0px;
}

.but{
  /* background-color: red; */
  padding: 0.1em;
  width: 20%;
  display: flex;
  justify-content: space-between;
}

.strike {
  color: green;
}

.container {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  height: 100vh;
  
  /* width: 40%; */
  /* background-color: white; */
}

.hero {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  width: 40%;
  margin: 0 auto;
  background-color: gray;
}

.enter {
  /* background-color: blue; */
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.7rem 0;
}

.enter input {
  width: 60%;
  padding: 0.7rem 0;
  /* margin: 0 10%; */
}


.items {
  background-color: rgb(175, 180, 157);
  padding: 0.5rem;
  border-radius: 10px;
  /* margin-top: 5px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 7px 0;
}

.search {
  /* background-color: green; */
  width: 70%;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between
}

.custom-button {
  display: inline-block;
  background-color: #28a745;
  color: white;
  border-radius: 0.5rem;
  font-size: 1em;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  text-align: center;
  
}

.custom-button:hover {
  background-color: #218838;
}

.addTodo {
  /* background-color: blue; */
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center
}

.add {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}

.add input {
  padding: 8px;
}

@media screen and (max-width: 780px) {
  body{
    font-size: 10px;
  }
  .hero {
    width: 80%;
  }

  .but{
    width: 25%;
  }

}
</style>
