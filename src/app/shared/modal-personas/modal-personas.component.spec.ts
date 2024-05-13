import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPersonasComponent } from './modal-personas.component';

describe('ModalPersonasComponent', () => {
  let component: ModalPersonasComponent;
  let fixture: ComponentFixture<ModalPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPersonasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
