import { Filter } from '../types';
import { ItemService } from './item/item.service';
import { ItemComponent } from "./item/item.component";
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer } from '@angular/platform-browser';
import { GITHUB_ICON } from '../svgs';
import { NgScrollbarModule } from "ngx-scrollbar"

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, ItemComponent, MatButtonToggleModule, MatButtonModule, MatIconModule, MatCardModule, NgScrollbarModule],
})
export class AppComponent {
  itemService = inject(ItemService)

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral("github", sanitizer.bypassSecurityTrustHtml(GITHUB_ICON))
  }

  filter: Filter = "all"

  addItem() {
    this.filter = "all"
    this.itemService.addItem()
  }
}