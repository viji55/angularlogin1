import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()

export class GlobalConfig{

}

export const GlobalVariable = Object.freeze({
    BASE_API_URL : environment.api_url,
    BASE_FOLDER_URL:'api/',
    BASE_FRONTEND_URL: environment.frontend_url,
    PORT_NUMBER: '4200',
    PER_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
    ShowFirstLastButtons: true
})

const customerApi = 'customer';
const adminApi    = 'admin';
export const NodeApiUrl = Object.freeze({
    ADMINLOGIN : adminApi +'/login',

});
