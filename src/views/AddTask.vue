<script setup>
import ModalTodo from '@/components/ModalTodo.vue';
import { defineProps, ref, watch, onMounted } from 'vue';

const newTask = ref('')

const props = defineProps({
  togglePopup: Function,
  value:Array
});

watch(props.value, (newVal) => {
	    localStorage.setItem('todo', JSON.stringify(newVal))
    }, {
	        deep: true
        })


const addTodo = () =>{
      if (newTask.value.trim() === '') {
        return
      }

      props.value.push({
        todoId: new Date().getTime(),
        content: newTask.value,
        status: false,
        editable: false
      })

      newTask.value = '' 
      props.togglePopup('addButtonTrigger')  
    }
</script>

<template>
    <ModalTodo :TogglePopup="() => togglePopup('editButtonTrigger')">
      <div class="addTodo">
        <div>
          <h2>ADD TODO</h2>
        </div>
        <div class="add">
          <label for="title" :style="{fontSize:'2em'}">Title: </label>
          <input type="text" name="title" placeholder="e.g buy books" v-model="newTask">
        </div>
        <button @click="addTodo()">ADD</button>
      </div>
      </ModalTodo>
</template>