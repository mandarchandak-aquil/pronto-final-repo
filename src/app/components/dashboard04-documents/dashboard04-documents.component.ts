import { Component, OnInit } from '@angular/core';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard04-documents',
  templateUrl: './dashboard04-documents.component.html',
  styleUrls: ['./dashboard04-documents.component.css']
})
export class Dashboard04DocumentsComponent implements OnInit {
loading : boolean = true;
  constructor(public routers: ActivatedRoute,public router: Router,public dash: DashboardService, public api_sub: SubjectCallService) { }
  token;
  documentslist: any = [];
  documentslistfinal: any = [];
  docreq;
  load: boolean = false;
  productInfoList;
  dataReq;
  documentslistnew;
  firstdoc;
  userdata;
  policyNo;
  ngOnInit(): void {
    localStorage.removeItem('policyNo');
    this.routers.params.subscribe(function(params){
      localStorage.setItem('policyNo', JSON.stringify(params));


     })
     console.log('policyno', localStorage.getItem('policyNo'));
   this.policyNo =  JSON.parse(localStorage.getItem('policyNo'));
    this.userdata = JSON.parse(sessionStorage.getItem('userdata'));
    console.log('this.policyNo.length',this.policyNo.length);
    if(this.policyNo.hasOwnProperty('policyNo')){
    
      this.documentsList();
    }else{
      this.documentsListStable();
    }
  
        $(".cst_mCst_scroll_Desk").mCustomScrollbar({
          theme: "dark"
        
        });
 
  }
  documentsList(){
    this.dash.documentListstable(this.policyNo).subscribe((datanew: {}) => {
      console.log('datanew',datanew);
      if(datanew['message'] == 'SUCCESS'){
        this.documentslist.push({
          "policyNo": this.policyNo.policyNo,
          "documents" : datanew['documents']
        });
        this.loading  = false;
      }else{
        this.loading  = false;
      }
    });
  }
  documentsListStable() {
    
    this.dash.verifyToken().subscribe((data: {}) => {
      console.log('verifyToken');
      if (data['token']) {
        this.token = data['token'];
        this.dataReq = {
          "emailId": this.userdata.email,
          "token": this.token
        }
        console.log('this.dataReq',this.dataReq);
        this.dash.policyListstable(this.dataReq).subscribe((data: {}) => {
          console.log('data',data);
          if (data['message'] == 'SUCCESS') {
            this.productInfoList = data['productInfoList'];
            for (let i = 0; i < this.productInfoList.length; i++) {
              this.docreq = '';
              this.docreq = {
                "policyNo": this.productInfoList[i].policyNo,
                "token": this.token
              };
              console.log('this.docreq', this.docreq);
              this.dash.documentListstable(this.docreq).subscribe((datanew: {}) => {
                console.log('this.productInfoList.length', i, this.productInfoList);
                console.log('datanew', datanew);
                this.documentslist.push({
                  "policyNo": this.productInfoList[i].policyNo,
                  "documents" : datanew['documents']
                });
                this.loading  = false;

              this.firstdoc  = this.documentslist[0].documents ;
              console.log('this.firstdoc',this.documentslist.length);
                for(let i = 0;i<=this.documentslist.length;i++){
                 // this.documentslistnew[i] = JSON.parse(this.documentslist[i]);
                 console.log('this.firstinndoc',JSON.parse(this.documentslist[i]));
                  this.documentslistnew[i] = {
                    "policyNo": this.documentslist[i].policyNo,
                    "documents" : JSON.parse(this.documentslist[i]['documents'])
                  };
                }

                console.log(' ?',this.documentslistnew);
              });
            }

          }else{
            this.loading  = false;
          }
        });
      }
    });


  }

  onDocopen(docid){
    console.log('doc',docid);
    this.dash.verifyToken().subscribe((data: {}) => {
      if (data['token']) {
        this.token = data['token'];
        console.log("https://stableapi.prontoinsurance.com/policyinfo/services/document/view?docId="+docid+"&token="+this.token+"");
        window.open("https://stableapi.prontoinsurance.com/policyinfo/services/document/view?docId="+docid+"&token="+this.token+"", "_blank");
        //sthis.router.navigate(["https://stableapi.prontoinsurance.com/policyinfo/services/document/view?docId='"+docid+"'&token='"+this.token+"'"]);
    
  }

  });
}
  loadmore() {
    console.log('innnnnnnnnn');
    this.load = true;
  }

  onlanguageChange(newValue) {
    // console.log(newValue, "new language");

    this.api_sub.sendMessage(1);
  }

}
