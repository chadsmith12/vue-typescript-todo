<template>
    <header class="header">
        <h1>ToDos</h1>
        <input class="new-todo" v-model="newTodo"/>
    </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

export default class ToDoList extends Vue {
    newTodo: string = "First ToDo";
}
</script>
