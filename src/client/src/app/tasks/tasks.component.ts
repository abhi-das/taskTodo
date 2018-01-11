import { Component, OnInit } from '@angular/core';

import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.module';

import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

	addTaskForm: FormGroup;
	taskList: Task[];

	constructor(private _taskSrv: TasksService, private _formBd: FormBuilder) { }

	ngOnInit() {

		this.addTaskForm = this._formBd.group({
			title: this._formBd.control(null),
			isDone: this._formBd.control(null)
		});

		// this.addTaskForm.get('isDone').valueChanges.subscribe(vl => {
		// 	this.addTaskForm.reset();
		// });

		this.getTaskList();
	}

	getTaskList() {

		this._taskSrv.getTasks().subscribe(result => {
			this.taskList = result;
		});

	}

	onNewTaskSubmit() {
		// console.log(this.addTaskForm.value);

		this._taskSrv.addTask(this.addTaskForm.value).subscribe(res => {
			this.taskList.push(res);
			this.addTaskForm.reset();
		})

	}

	onTaskDelete(id: string) {
		this._taskSrv.deleteTask(id).subscribe(res => {
			// this.taskList.
			console.log(res);
		})
	}

}
