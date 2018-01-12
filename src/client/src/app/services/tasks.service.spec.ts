import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TasksService } from './tasks.service';

import { MockBackend } from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';

import { XHRBackend, ResponseOptions, Response } from '@angular/http';

import { Task } from '../models/task.module';

describe('TasksService', () => {

    let mockNewTask: Task;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [TasksService, {
                provide: XHRBackend,
                useClass: MockBackend
            }]
        });

        mockNewTask = {
            _id: '5a58063867d2501e21420416',
            title: 'Deploy Webapp 1',
            isDone: 'false'
        };

    });

    it('should be created TasksService', inject([TasksService], (_tskSrv: TasksService) => {
        expect(_tskSrv).toBeTruthy();
    }));

    it('should return task list from mock data',
        inject([TasksService], (_tskSrv) => {

            _tskSrv.getTasks().subscribe(
                (res) => {
                    // console.log(res);
                    expect(res.length).toBeGreaterThan(1);
                }
            );
        })
    );

    it('should add new task in the list',
        inject([TasksService], (_tskSrv) => {

            _tskSrv.addTask(mockNewTask).subscribe(
                (res) => {

                    expect(res['_id']).toBe(mockNewTask['_id']);
                }
            );
        })
    );

    it('should update the task',
        inject([TasksService], (_tskSrv) => {

            const updateTask = {
                _id: '5a58063867d2501e21420416',
                title: 'Deploy Webapp 1 Now New Name',
                isDone: 'true'
            };

            _tskSrv.updateTask(updateTask).subscribe(
                (res) => {
                    // console.log(res);
                    expect(res['ok']).toBe(1);
                }
            );
        })
    );

    it('should delete task from the list',
        inject([TasksService], (_tskSrv) => {

            _tskSrv.deleteTask(mockNewTask['_id']).subscribe(
                (res) => {
                    // console.log(res);
                    expect(res['ok']).toBe(1);
                }
            );
        })
    );

});