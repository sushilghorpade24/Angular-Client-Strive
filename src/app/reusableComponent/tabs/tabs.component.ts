import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  @Input() tabs: string[] = ["Tab 1", "Tab 2", "Tab 3"];
  @Input() activeTab: string = this.tabs[0];
  @Output() tabChange = new EventEmitter<string>();

  onTabSelect(tab: string) {
    this.activeTab = tab;
    this.tabChange.emit(tab);
  }
}
