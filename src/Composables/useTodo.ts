import { type Ref, ref, watch, onMounted, defineProps, computed } from 'vue'
import type { Task } from '../Interfaces/Task'
// import { it } from 'node:test'

export function useTodo(todo: Ref<Task[]> ) {
  // const todo = ref<Task[]>([])
  const editableTask: Ref<Partial<Task>> = ref({})
  let editingIndex: number | null = 0

  // const props = defineProps({
  //     togglePopup: Function,
  //     value:Array
  //   });

  // watch(
  //   todo,
  //   (newVal) => {
  //     localStorage.setItem('todo', JSON.stringify(newVal))
  //   },
  //   {
  //     deep: true
  //   }
  // )
  // onMounted(() => {
  //   const storedTasks = localStorage.getItem('todo')
  //   todo.value = storedTasks ? JSON.parse(storedTasks) : []
  // })


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

// const searchQuery = ref('');

// const filteredResults = computed(() => {
//   if (!searchQuery) {
//     return todo.value
//   } else{
//     return todo.value.filter(item => 
//       item.content.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   }
// })

const filteredTasks = computed(() => {
  return (query: string) => {
    if (!query) {
      return todo.value;
    }
    return todo.value.filter(item =>
      item.content.toLowerCase().includes(query.toLowerCase())
    );
  };
});

  const addTask = (newCon: string) => {
    if (newCon.trim() === '') {
      console.log('Task content is empty, not adding.');
      return
    }
    console.log('here');
    


    todo.value.push({
      todoId: new Date().getTime().toString(),
      content: newCon,
      status: false,
      editable: false
    });

    console.log('Task added:', todo.value);

    console.log('Task input cleared:', newCon);


    // taskContent.value = ''
    //   props.togglePopup('addButtonTrigger')
  }

  const editTask = (index: number) => {
    const updateTask = (index: number) => {
      editingIndex = index
      editableTask.value = { ...todo.value[index] }
      // TogglePopup('editButtonTrigger')
      console.log(editableTask.value)
    }
  }

  const saveTask = (newTask: Ref<String>) => {
    if (editingIndex !== null) {
      editableTask.value.content = newTask.value
      // todo.value[editingIndex] = {...editableTask}
      const task = todo.value[editingIndex]
      task.content = editableTask.value.content
      newTask.value = ''
      // props.togglePopup('editButtonTrigger')
    }
  }

  const deleteTask = (index: number) => {
    if (todo.value[index]) {
      todo.value.splice(index, 1);
    }
  };

  const toggleTaskStatus = (index: number) => {
    if (todo.value[index]) {
      todo.value[index].status = !todo.value[index].status
    }
  }

  return {
    todo,
    editableTask,
    addTask,
    editTask,
    deleteTask,
    toggleTaskStatus,
    saveTask,
    filteredTasks
  };
}
