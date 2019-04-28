<template>
<div>
  <section class="todoapp">
      <header class="header">
				<h1>ToDos</h1>
				<input 
          class="new-todo" 
          autofocus 
          autocomplete="false" 
          placeholder="What needs to be done...?"
          v-model="newToDo"
          @keyup.enter="addToDo">
			</header>
      <section class="main" v-show="todoList.length > 0">
        <ul class="todo-list">
          <ToDo v-for="item in todoList" :key="item.id" :item="item"/>
        </ul>
      </section>
      <footer class="footer" v-show="todoList.length > 0">
        <span class="todo-count">
          <strong>{{ remainingItems.length }}</strong> {{pluralize("item", remainingItems.left)}} left
        </span>
        <ul class="filters">
          <li><a @click="filterVisibility('all')" :class="{selected: visibility == 'all'}">All</a></li>
          <li><a @click="filterVisibility('active')"  :class="{selected: visibility == 'active'}">Active</a></li>
          <li><a @click="filterVisibility('completed')"  :class="{selected: visibility == 'completed'}">Completed</a></li>
        </ul>
      </footer>
  </section>
  <footer class="info">
    <p>Double click on an item to edit it</p>
    <p>Represents the <a href="http://todomvc.com">TodoMVC</a> written in TypsScript and Vue</p>
  </footer>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ToDoItem from "@/models/todo-item";
import ToDo from "@/components/ToDo.vue";
import { ToDoModle } from "@/store/modules/todo-list-state";

enum Visibilty {
  All = "all",
  Active = "active",
  Completed = "completed"
}

@Component({
  components: {
    ToDo
  }
})
export default class Home extends Vue {
  newToDo: string = "";
  visibility: Visibilty = Visibilty.All;

  get todoList() : ToDoItem[] {
    return ToDoModle.filters[this.visibility]();
  }

  get remainingItems() : ToDoItem[] {
    return ToDoModle.remainingTasks;
  }

  addToDo() {
    const id = ToDoModle.nextId;
    const newItem = new ToDoItem(id, this.newToDo)
    ToDoModle.ADD_TODO_ITEM(newItem);
    this.newToDo = "";
  }

  pluralize(word: string, count: number) {
    return word + (count === 1 ? '' : 's');
  }

  filterVisibility(newVisibilty: Visibilty) {
    this.visibility = newVisibilty;
  }
}
</script>
