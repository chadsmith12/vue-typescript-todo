<template>
    <li class="todo" :class="{completed: item.isComplete, editing: editedItem == item}">
        <div class="view">
            <input class="toggle" type="checkbox" v-model="item.isComplete" />
            <label @dblclick="editItem(item)">{{ item.item }}</label>
            <button class="destroy" @click="removeTodo(item)"></button>
        </div>
        <input class="edit" type="text" v-model="item.item" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit"/>
    </li>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import ToDoItem from '../models/todo-item';
import { ToDoModle } from '../store/modules/todo-list-state';
@Component({})
export default class ToDo extends Vue {
    @Prop(ToDoItem)
    readonly item!: ToDoItem;

    editedItem: ToDoItem = new ToDoItem();
    editedCache: string = "";

    removeTodo(currentItem: ToDoItem) {
        ToDoModle.REMOVE_TODO_ITEM(currentItem);
    }

    editItem(currentItem: ToDoItem) {
        this.editedItem = currentItem;
        this.editedCache = currentItem.item;
    }

    doneEdit() {
        console.log("hello enter");
        this.editedItem = new ToDoItem();
        this.editedCache = "";
    }

    cancelEdit() {
        console.log("hello");
        this.item.item = this.editedCache;
        this.editedItem = new ToDoItem();
    }
}
</script>

