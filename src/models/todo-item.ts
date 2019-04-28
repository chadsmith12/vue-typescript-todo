/**
 * Represents a todo item. 
 * Has the item that needs to be done and if the item is complete or not
 */
export default class ToDoItem {
    /**
     * The identifer of the to-do item
     */
    id: number;
    /**
     * The item that you need to do
     */
    item: string;
    /**
     * If this item is complete or not
     */
    isComplete: boolean;

    constructor(newId?: number, newItem?: string) {
        if(newId != null && newItem != null) {
            this.id = newId;
            this.item = newItem;
        }
        else {
            this.id = 0;
            this.item = "";
        }
        this.isComplete = false;
    }
}