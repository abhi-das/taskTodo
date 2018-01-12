import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.module';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

    addTaskForm: FormGroup;
    taskList: Task[];
    errMsg: any = {
        isError: false,
        getTaskErr: {},
        newTaskErr: {},
        editTaskErr: {},
        deleteTaskErr: {}
    };

    constructor(private _taskSrv: TasksService, private _formBd: FormBuilder) {}

    ngOnInit() {

        this.addTaskForm = this._formBd.group({
            title: this._formBd.control(null),
            isDone: this._formBd.control(null)
        });

        this.getTaskList();
    }

    getTaskList() {

        this.errMsg.isError = false;
        this._taskSrv.getTasks().subscribe(
            (result) => {
                this.taskList = result;
            },
            (err: HttpErrorResponse) => {

                this.errMsg.isError = true;

                if (err.error instanceof Error) {

                    // A client-side or network error occurred.
                    this.errMsg.getTaskErr.message = err.error.message;

                } else {

                    // Backend returns unsuccessful response codes such as 404, 500 etc.
                    // console.log(err);
                    this.errMsg.getTaskErr.message = err.message;
                }
            }
        );
    }

    onNewTaskSubmit() {

        this.errMsg.isError = false;

        this._taskSrv.addTask(this.addTaskForm.value).subscribe(
            (res) => {

                // Option 1:
                // this.taskList.push(res);

                // Option 2:
                this.getTaskList();

                this.addTaskForm.reset();
            },
            (err: HttpErrorResponse) => {

                this.errMsg.isError = true;

                if (err.error instanceof Error) {

                    // A client-side or network error occurred.
                    this.errMsg.newTaskErr.message = err.error.message;

                } else {

                    // Backend returns unsuccessful response codes such as 404, 500 etc.
                    // console.log('onNew > ',err);
                    this.errMsg.newTaskErr.message = err.message;
                }
            }
        );
    }

    onTaskDelete(id: string) {

        this.errMsg.isError = false;

        this._taskSrv.deleteTask(id).subscribe(
            (res) => {

                if (res['ok'] === 1) {

                    // Option 1:
                    // let deletedItm = this.taskList.filter(itm => {
                    // 	return itm['_id'] === id;
                    // })

                    // let deleteItmIdx = this.taskList.indexOf(deletedItm[0])
                    // this.taskList.splice(deleteItmIdx, 1);

                    // Option 2:
                    this.getTaskList();
                } else {

                }
            },
            (err: HttpErrorResponse) => {

                this.errMsg.isError = true;

                if (err.error instanceof Error) {

                    // A client-side or network error occurred.
                    this.errMsg.deleteTaskErr.message = err.error.message;

                } else {

                    // Backend returns unsuccessful response codes such as 404, 500 etc.
                    // console.err('Server could not delete task.', err);
                    this.errMsg.deleteTaskErr.message = err.message;
                }
            }
        );
    }

    onEditTask(task: Task, $event: any) {

        const editTask = task;

        editTask['isDone'] = $event.target.checked.toString();

        this.errMsg.isError = false;

        this._taskSrv.updateTask(editTask).subscribe(
            (res) => {
                // console.log(res);
            },
            (err: HttpErrorResponse) => {

                this.errMsg.isError = true;

                if (err.error instanceof Error) {

                    // A client-side or network error occurred.
                    this.errMsg.editTaskErr.message = err.error.message;

                } else {

                    // Backend returns unsuccessful response codes such as 404, 500 etc.
                    // console.err('Server could not edit task.', err);
                    this.errMsg.editTaskErr.message = err.message;
                }
            }
        );
    }
}
