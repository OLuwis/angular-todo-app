import { Injectable } from "@angular/core";
import { Item } from "../../types";

@Injectable({
  providedIn: "root"
})
export class ItemService {
  items: Item[] = []
  keyName = "todo-items"

  constructor() {
    if (!localStorage.getItem(this.keyName)) {
      localStorage.setItem(this.keyName, JSON.stringify([]))
    }
    this.items = JSON.parse(localStorage.getItem(this.keyName)!) as Item[]
  }

  getItem(id: string): Item {
    return this.items.find(item => item.id === id)!
  }

  getItemIndex(id: string): number {
    return this.items.findIndex(item => item.id === id)
  }

  getItems(): Item[] {
    return this.items
  }

  getItemsFiltered(filter: "all" | "done" | "pending"): Item[] {
    if (filter === "done") {
      console.log(this.items)
      return this.items.filter(item => item.done)
    }
    if (filter === "pending") {
      console.log(this.items)
      return this.items.filter(item => !item.done)
    }
    return this.items
  }

  addItem() {
    this.items.push({ id: crypto.randomUUID(), description: "New Item", done: false })
    this.flush()
  }

  updateItem(item: Item) {
    this.items[this.getItemIndex(item.id)] = {
      ...item,
      description: item.description,
      done: item.done
    }
    this.flush()
  }

  removeItem(id: string) {
    this.items.splice(this.getItemIndex(id), 1)
    this.flush()
  }

  flush() {
    localStorage.setItem(this.keyName, JSON.stringify(this.items))
  }
}