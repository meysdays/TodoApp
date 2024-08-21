<script setup>
import { defineProps, ref } from 'vue';
// const props = defineProps(['TogglePopup']);
// const props = defineProps({
//   togglePopup: Function
// });

const props = defineProps({
  TogglePopup: {
    type: Function,
  },
  value:Array
});

const a = ref('')
</script>

<template>
    <div class="popup">
        <div class="popup-inner">

            <div class="close">
                <button @click="props.TogglePopup('addButtonTrigger')">X</button>
            </div>
            
            <slot></slot>
            
        </div>
    </div>
</template>

<style>
.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.2);
	
	display: flex;
	align-items: center;
	justify-content: center;
}

.popup-inner {
		background: #FFF;
		padding: 32px 0;
        width: 35%;
}
.close{
    display: flex;
    justify-content: flex-end;
    padding: 10px
    
}
</style>