import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../commons/services/page/pages.service';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
	dataReq : any;
  pageArr: any = [];

   loading :boolean = true;  
  box_img;
  project_path;
  need_help;
  state;
  number;
 mon_fri_text;
mon_fri_time;
sat_text;
sat_time;
sun_text;
sun_time;
customer_support_text;
customer_support_subtitle;
customer_support_email;
send_msg_button;
send_msg_button_url;
texas_text;
report_claim_text1;
report_claim_number;
report_claim_text;
report_claim_url;
  constructor(public api_page : PagesService, public api_sub : SubjectCallService) { }

  ngOnInit(): void {
    this.getContent();
  }
   getContent(){
    this.dataReq = {
      "language_id":  sessionStorage.getItem('lg')
    }
    // console.log(this.zipdata);
    
    this.api_page.Contact(this.dataReq).subscribe((data: {}) => {
      // console.log(data);

      if(data['status'] == "success"){
      console.log('contact',data['page']);
        this.pageArr = data['page'];
        this.project_path = data['project_path'];

        this.box_img = JSON.parse(data['page'].box_img);
        this.need_help = JSON.parse(data['page'].need_help);
          this.state= JSON.parse(data['page'].state);
    this.number= JSON.parse(data['page'].number);
   this.mon_fri_text = JSON.parse(data['page'].mon_fri_text);
this.mon_fri_time= JSON.parse(data['page'].mon_fri_time);
this.sat_text= JSON.parse(data['page'].sat_text);
this.sat_time= JSON.parse(data['page'].sat_time);
this.sun_text= JSON.parse(data['page'].sun_text);
this.sun_time= JSON.parse(data['page'].sun_time);
this.customer_support_text = JSON.parse(data['page'].customer_support_text);
this.customer_support_subtitle = JSON.parse(data['page'].customer_support_subtitle);
this.customer_support_email= JSON.parse(data['page'].customer_support_email);
this.send_msg_button= JSON.parse(data['page'].send_msg_button);
this.send_msg_button_url= JSON.parse(data['page'].send_msg_button_url);

this.texas_text = JSON.parse(data['page'].texas_text);

this.report_claim_text1 = JSON.parse(data['page'].report_claim_text1);
this.report_claim_number = JSON.parse(data['page'].report_claim_number);
this.report_claim_text = JSON.parse(data['page'].report_claim_text);
this.report_claim_url = JSON.parse(data['page'].report_claim_url);
this.loading = false;
      }else{
        this.pageArr = [];
      }

      // this.pageArr = data['page'];
      console.log(this.pageArr,'this.pageArr');
    });
  }

  onlanguageChange(newValue){
    // console.log(newValue, "new language");
    this.getContent();
    this.api_sub.sendMessage(1);
  }
}
