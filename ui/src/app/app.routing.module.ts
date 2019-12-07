import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

const routes : Routes =[
{path: '',pathMatch:'full', redirectTo:'login'},
{path:'login',loadChildren:'./components/login/login.module#LoginModule'},
{path: 'f/c', loadChildren:'./components/frontend/frontend.module#FrontendModule'}


] 

@NgModule({
    imports:[
        RouterModule.forRoot(routes, {
         useHash:true
        })
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule {}