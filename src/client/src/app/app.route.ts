import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';

export const localRoutes: Routes = [
	{
		path: 'tasks',
		component: TasksComponent
	},
	{ 
		path: '', pathMatch:'full', redirectTo: 'tasks' 
	}
];

@NgModule({
	imports: [RouterModule.forRoot(localRoutes)],
	exports: [RouterModule]
})
export class AppRouterModule {}