import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService:LoginService) { }

  newUser:User = new User;

  ngOnInit(): void {
  }

  // createUser()
  // {
  //   this.userService.create(this.newUser).subscribe((data)=>{
  //     console.log("Success")
  //     alert("success")
  //   },(error)=>{
  //     console.log(error)
  //   })
  // }


  onFileSelected(event: any) {
    this.newUser.samplePic = event.target.files[0] as File;
  }

  createUser() {
    const formData = new FormData();
    formData.append('username', this.newUser.username);
    formData.append('name', this.newUser.name);
    formData.append('address', this.newUser.address);
    if (this.newUser.samplePic) {
      formData.append('samplePic', this.newUser.samplePic, this.newUser.samplePic.name);
    }

    this.userService.create(formData).subscribe((data) => {
      console.log("Success");
      alert("User created successfully");
    }, (error) => {
      console.log(error);
    });
  }
}
