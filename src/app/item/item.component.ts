import { Item } from "../../types";
import { ItemService } from "./item.service";
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-item',
  standalone: true,
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
  imports: [CommonModule, MatCheckboxModule, MatButtonModule, MatIconModule],
})
export class ItemComponent {
  itemService = inject(ItemService)

  @Input() item!: Item;

  isEditable = false

  updateItemState() {
    this.item.done = !this.item.done
    this.itemService.updateItem(this.item)
  }

  updateItemDesc(description: string) {
    this.isEditable = false
    this.item.description = description
    this.itemService.updateItem(this.item)
  }

  removeItem() {
    this.itemService.removeItem(this.item.id)
  }
}