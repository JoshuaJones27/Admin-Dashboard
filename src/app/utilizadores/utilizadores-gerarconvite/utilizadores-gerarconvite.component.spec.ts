import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizadoresGerarconviteComponent } from './utilizadores-gerarconvite.component';

describe('UtilizadoresGerarconviteComponent', () => {
  let component: UtilizadoresGerarconviteComponent;
  let fixture: ComponentFixture<UtilizadoresGerarconviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilizadoresGerarconviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilizadoresGerarconviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
