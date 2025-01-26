import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaginaFormComponent } from './pagina-form.component';

describe('PaginaFormComponent', () => {
  let component: PaginaFormComponent;
  let fixture: ComponentFixture<PaginaFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PaginaFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
