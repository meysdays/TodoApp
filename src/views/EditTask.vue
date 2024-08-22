<script setup>
import { ref, watch } from 'vue';
import ModalTodo from '@/components/ModalTodo.vue';


const newTask = ref('')

const props = defineProps({
  togglePopup: Function,
  value:Array,
  task: Object,
  editIndex: Number
});

watch(props.value, (newVal) => {
	    localStorage.setItem('todo', JSON.stringify(newVal))
    }, {
	        deep: true
})

const saveEdit = () => {
      if (props.editIndex !== null) {
        props.task.content = newTask.value
        props.value[props.editIndex] = {...props.task}
        newTask.value =''
        props.togglePopup('editButtonTrigger') 
      }
    }
</script>

<template>
    <ModalTodo :TogglePopup="() => togglePopup('editButtonTrigger')"
      >
      <div class="addTodo">
        <div>
          <h2>EDIT TODO</h2>
        </div>
        <div class="add">
          <label for="title" :style="{fontSize:'2em'}">Title: </label>
          <input type="text" name="title" placeholder="e.g buy books" v-model="newTask" @keyup.enter="saveEdit()">
        </div>
        <button @click="saveEdit()">SAVE</button>
      </div>
      </ModalTodo>
</template>