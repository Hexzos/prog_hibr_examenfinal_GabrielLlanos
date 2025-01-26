import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaginaListComponent } from './pagina-list.component';

describe('PaginaListComponent', () => {
  let component: PaginaListComponent;
  let fixture: ComponentFixture<PaginaListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PaginaListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
