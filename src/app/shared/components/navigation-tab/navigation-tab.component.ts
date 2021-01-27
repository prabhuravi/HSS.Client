import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-tab',
  templateUrl: './navigation-tab.component.html',
  styleUrls: ['./navigation-tab.component.scss']
})
export class NavigationTabComponent implements OnInit {

  @Input() routeList = [];
  activeTab: number = 0;

  constructor() { }

  ngOnInit() {
  }

  tabClicked(i): void {
    this.activeTab = i;
  }

}
