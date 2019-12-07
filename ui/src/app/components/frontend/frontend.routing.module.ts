import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**import components */
import { FrontendComponent } from './frontend.component';


const routes: Routes = [
    {
        path:'',
        component : FrontendComponent,
        children:[
            {
                path : '',redirectTo : 'login'

            },

        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class FrontendRoutingModule { }