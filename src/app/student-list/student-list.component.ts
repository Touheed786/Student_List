import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../service/login.service';
declare var $: any;
import * as jQuery from 'jquery';
import { StudentService } from '../service/student.service';

export class Student {
  id: number;
  name: string;
  age: number;
  checked:boolean;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})


export class StudentListComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('ageInput') ageInputRef!: ElementRef<HTMLInputElement>;

  constructor(private loginService:LoginService,private studentService:StudentService) { }

  headerSelected:boolean = false;
  rowSelected:boolean = false;



  ngOnInit(): void {
    console.log(jQuery.fn.jquery);
    this.getStudents()
  }

  selectedIds: number[] = [];

  // students: Student[] = [
  //   { id: 9, name: 'John', age: 20 ,checked: false},
  //   { id: 7, name: 'Alice', age: 22 ,checked: false},
  //   { id: 3, name: 'Bob', age: 21 ,checked: false}
  //   // Add more students as needed
  // ];

  students = new Array<Student>();
  student = new Student;


  selectAll(event: any) {
    this.headerSelected = event.target.checked;
    if (this.headerSelected) {
      this.rowSelected  = true;
      // Select all students
      
      // this.selectedIds = this.students.map(student => student.id);
      for(let i = 0;i<this.students.length;i++){
        
      }
      this.students.forEach((student)=>{
        // student.checked = true;
        let index = this.selectedIds.indexOf(student.id);
        if(index === -1){
          this.selectedIds.push(student.id)
        }
      })
      // console.log(this.students)
      console.log(this.selectedIds)
    } else {
      this.headerSelected = false;
      this.rowSelected  = false;
      this.students.forEach((student)=>{
        // student.checked = false;
      })
      // Deselect all students
      this.selectedIds = [];
      console.log(this.selectedIds)
    }
  }


  toggleSelection(event: any, id: number) {
    console.log(id); // Log the ID of the checkbox
    
    // Add or remove the ID from the selectedIds array based on checkbox state
    if (event.target.checked) {
        this.selectedIds.push(id); // Add to selectedIds if the checkbox is checked
    } else {
        this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id); // Remove from selectedIds if the checkbox is unchecked
    }
    
    // Update the state of the header checkbox based on the selectedIds array
    if (this.students.length === this.selectedIds.length) {
        jQuery('#header-checkbox').prop('indeterminate', false); // If all checkboxes are checked, set the header checkbox to checked
        this.headerSelected = true;
    } else if (this.selectedIds.length > 0) {
        jQuery('#header-checkbox').prop('indeterminate', true); // If some checkboxes are checked, set the header checkbox to indeterminate
        this.headerSelected = false;
    } else {
        jQuery('#header-checkbox').prop('indeterminate', false); // If no checkboxes are checked, set the header checkbox to unchecked
        this.headerSelected = false;
    }
    
    console.log(this.selectedIds); // Log the selectedIds array
}


  deleteAll(){
      let param = new HttpParams;
      param = param.append("selectedIds",this.selectedIds.toString());
    this.studentService.bulkDelete(param).subscribe((data)=>{
      this.getStudents();
      console.log(data)
    })
  }

  deleteStudent(id:number){
    this.students = this.students.filter(student => student.id !==id)
  }

  addStudent(): void {
    if(this.student.name.trim() == "" || name == null || this.student.age == null){
      alert("Empty")
      return;
    }
    // Generate a unique ID for the new student
    // const id = this.students.length + 1;
    // const checked = false;
    // // Create a new student object and push it to the array
    // this.students.push({ id, name, age,checked });
    // this.nameInputRef.nativeElement.value = '';
    // this.ageInputRef.nativeElement.value = '';
    this.studentService.create(this.student).subscribe((data)=>{
      this.student = new Student;
      this.getStudents()
    })
    
  }

  getStudents(){
    this.studentService.getStudent().subscribe((student:Student[])=>{
      this.students = student;
      this.selectedIds = [];
    })
  }

}
