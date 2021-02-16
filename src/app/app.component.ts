import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/api-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'fhir-app-test';
  fields:any[] = [];
  formFieldColl:any[] = [];
  pageForm: any;
  jsonFlag = false;
  
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {

    this.apiService.getPatients().subscribe(
      data => {
        console.log(data);
      }
    )

    this.apiService.getQuestionJsonData().subscribe( response => {
      let controls:any = {};
      let data: any = response;
      this.fields = data.item;
      for(let field of  this.fields){
        let obj: any = {};
        obj.label = field.text;
        obj.type = field.type;
        obj.fieldX = 'field' + field.linkId;
        obj.linkId = field.linkId;
        obj.validation  = {};
        this.formFieldColl.push(obj)
        if (field.item != undefined) {
          for(let subField of  field.item){
          let obj: any = {};
          obj.label = subField.text;
          obj.type = subField.type;
          obj.fieldX = 'field' + subField.linkId;
          obj.linkId = subField.linkId;
          obj.validation  = {};
          controls['field' +  subField.linkId] = new FormControl('', obj.validation);
          this.formFieldColl.push(obj)
          }
        }
        if( field.type != 'group') {
        controls['field' +  field.linkId] = new FormControl('', obj.validation);
        }
      }
      this.pageForm = new FormGroup(controls);
    });
  }
  
}


