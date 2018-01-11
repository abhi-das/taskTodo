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

		this.getTaskList();
	}

	getTaskList() {

		this._taskSrv.getTasks().subscribe(result => {
			this.taskList = result;
		});

	}

	onNewTaskSubmit() {

		this._taskSrv.addTask(this.addTaskForm.value).subscribe(res => {
			this.taskList.push(res);
			this.addTaskForm.reset();
		})

	}

	onTaskDelete(id: string) {
		this._taskSrv.deleteTask(id).subscribe(res => {
			
			if(res['ok'] == '1') {

				let deletedItm = this.taskList.filter(itm => {
					return itm['_id'] === id;
				})

				let deleteItmIdx = this.taskList.indexOf(deletedItm[0])
				this.taskList.splice(deleteItmIdx, 1);
			}
		})
	}

	onEditTask(task: Task, $event: any) {

		var editTask = task;
		editTask['isDone'] = $event.target.checked.toString();

		this._taskSrv.updateTask(editTask).subscribe(res => {
			// console.log(res);
		})

	}

}
