import { Module, getModule, Action, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store/store";
import ToDoItem from '@/models/todo-item';

interface IToDoListState {
    todoList: Array<ToDoItem>;
    nextId: number;
}

@Module({dynamic: true, store, name: "todo-state"})
class ToDoState extends VuexModule implements IToDoListState {
    todoList: ToDoItem[] = [];
    nextId: number = 0;

    get remainingTasks(): ToDoItem[] {
        const remainingItems = this.todoList.filter(item => !item.isComplete);

        return remainingItems;
    }

    get filters() {
        return {
            all: () =>  {
                return this.todoList;
            },
            active: () => {
                return this.remainingTasks;
            },
            completed: () => {
                return this.todoList.filter(item => item.isComplete);
            }
        }
    }

    @Mutation
    ADD_TODO_ITEM(item: ToDoItem) {
        this.todoList.push(item);
        this.nextId++;
    }

    @Mutation
    REMOVE_TODO_ITEM(item: ToDoItem) {
        const index = this.todoList.indexOf(item);
        this.todoList.splice(index, 1);
    }
}

export const ToDoModle: ToDoState = getModule(ToDoState);