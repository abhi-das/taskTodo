import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksService } from '../services/tasks.service';
import { TasksComponent } from './tasks.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

describe('TasksComponent', () => {
  
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let _tskSrv: TasksService;
  let element: any;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientModule, ReactiveFormsModule ],
      declarations: [ TasksComponent ],
      providers: [ TasksService ]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    // element =  fixture.nativeElement;
    _tskSrv = TestBed.get(TasksService);

    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('a. should get tasks, b. task list should be greater than 0', async(() => {
  
      component.getTaskList();
      fixture.detectChanges();
  
      expect(component.errMsg.isError).toBeFalsy();
      expect(component.taskList.length).toBeGreaterThan(0);

      // fixture.whenStable().then(() => {

      //   expect(element.querySelector('.btn-danger')).toBeTruthy();

      // });
      // console.log('errMsg >> ',component.errMsg.isError);
    }));




});
