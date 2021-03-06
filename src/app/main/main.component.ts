/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
import { Component } from '@angular/core';
import { SidebarsVisibilityService } from '@kognifai/poseidon-sidebar-visibilityservice';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(
    public sidebarsVisibilityService: SidebarsVisibilityService
  ) { }

  onPageOverlayClick(e: MouseEvent): void {
    e.preventDefault();
    if (this.sidebarsVisibilityService.pageOverlayActive) {
      this.sidebarsVisibilityService.navigationPanelActive = false;
      this.sidebarsVisibilityService.navigationButtonActive = false;
      this.sidebarsVisibilityService.toolsPanelActive = false;
      this.sidebarsVisibilityService.toolsButtonActive = false;
      this.sidebarsVisibilityService.pageOverlayAnimating = false;
      setTimeout(() => {
        this.sidebarsVisibilityService.pageOverlayActive = false;
        this.sidebarsVisibilityService.navigationPanelHidden = true;
        this.sidebarsVisibilityService.toolsPanelHidden = true;
      }, 350);
    }
  }
}
