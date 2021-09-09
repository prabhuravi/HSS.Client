import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSectionComponent } from './manage-section.component';
import { SharedModule } from '../../../../shared/shared.module';

describe('ManageSectionComponent', () => {
  let component: ManageSectionComponent;
  let fixture: ComponentFixture<ManageSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ ManageSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
