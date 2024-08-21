<script setup>
import { defineProps, watch } from 'vue';
import ModalTodo from '@/components/ModalTodo.vue';

const props = defineProps({
  togglePopup: Function,
  value:Array,
  ace:Number
});

watch(props.value, (newVal) => {
	    localStorage.setItem('todo', JSON.stringify(newVal))
    }, {
	        deep: true
        })

const removeTodo = (index) => {
  props.value.splice(index, 1);
  props.togglePopup('deleteButtonTrigger')
  }

</script>

<template>
    <ModalTodo :TogglePopup="() => togglePopup('deleteButtonTrigger')">
      <div class="addTodo">
        <div>
          <h2>DELETE TASK</h2>
        </div>
        <div class="add">
          <label for="title" :style="{fontSize:'2em'}">CONFIRM </label>
        </div>
        <button @click="props.togglePopup('deleteButtonTrigger')">CANCEL</button>
        <button @click="removeTodo(props.ace)">DELETE</button>
      </div>
      </ModalTodo>
</template>