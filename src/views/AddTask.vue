<script lang="ts" setup>
import ModalTodo from '@/components/ModalTodo.vue';
import { defineProps, ref, watch, onMounted, type Ref } from 'vue';
import { useTodo } from '@/Composables/useTodo';
import type { Task } from '@/Interfaces/Task';

const newTask = ref('');
const todo = ref<Task[]>([])

const props = defineProps<{
  togglePopup: (trigger: string) => void;
  // value:Array
}> ();

watch(
  todo,
  (newVal) => {
    localStorage.setItem('todo', JSON.stringify(newVal))
  },
  {
    deep: true
  }
)
onMounted(() => {
  const storedTasks = localStorage.getItem('todo')
  todo.value = storedTasks ? JSON.parse(storedTasks) : []
  console.log(todo.value);

})
const {addTask} = useTodo(todo);
// const props = defineProps({
//   togglePopup: Function,
//   value:Array
// });

// watch(props.value, (newVal) => {
// 	    localStorage.setItem('todo', JSON.stringify(newVal))
//     }, {
// 	        deep: true
//         })


// const addTodo = () =>{
//       if (newTask.value.trim() === '') {
//         return
//       }

//       props.value.push({
//         todoId: new Date().getTime(),
//         content: newTask.value,
//         status: false,
//         editable: false
//       })

//       newTask.value = '' 
//       props.togglePopup('addButtonTrigger')  
//     }
</script>

<template>
    <ModalTodo :TogglePopup="() => togglePopup('editButtonTrigger')">
      <div class="addTodo">
        <div>
          <h2>ADD TODO</h2>
        </div>
        <div class="add">
          <label for="title" :style="{fontSize:'2em'}">Title: </label>
          <input type="text" name="title" placeholder="e.g buy books" v-model="newTask" @keyup.enter="addTask(newTask)">
        </div>
        <button @click="addTask(newTask)">ADD</button>
      </div>
      </ModalTodo>
</template>