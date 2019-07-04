import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-reset',
    templateUrl: './confirm-reset.component.html'
})
export class ConfirmResetComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ConfirmResetComponent>) { }

    ngOnInit() {
    }

    cancel = () => {
        this.dialogRef.close();
    }

}
