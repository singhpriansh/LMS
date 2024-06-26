import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../../feature/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private dialog: MatDialog) {}

    // closeDialog() {
    //     this.dialog.close('Pizza!');
    // }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = "An unknown error occured!";
                if(error.error.message){
                    errorMessage = error.error.message;
                }
                this.dialog.open(ErrorComponent, {
                    data: {
                        message: errorMessage
                    }
                }
                );
                // console.log(error);
                // alert(error.error.error.message);
                return throwError(error);
            })
        );
    }
}