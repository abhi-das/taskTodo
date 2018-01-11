import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Task } from '../models/task.module';


@Injectable()
export class TasksService {

  constructor(private _httpClient: HttpClient) { }

  domain: string = 'http://localhost:3000';

  getTasks(): Observable< any > {
  	return this._httpClient.get<Task[]>(`${this.domain}/api/tasks`)
  		.map(res => res);
  }

  addTask(task: Task): Observable< any > {

  	return this._httpClient.post<Task>(`${this.domain}/api/tasks`, task)
  		.map(res => res);
  }

  deleteTask(id:string): Observable< any > {
  	console.log('ser>>>>>>',id);
  	return this._httpClient.delete(`${this.domain}/api/task/${id}`)
  		.map(res => res);

  }

  updateTask(task: Task): Observable< any > {

  	return this._httpClient.put(`${this.domain}/api/tasks/${task['id']}`, task)
  		.map(res => res);

  }


}
