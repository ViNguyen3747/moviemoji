import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.css']
})
export class NoResultsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NoResultsComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();    
  }

}
