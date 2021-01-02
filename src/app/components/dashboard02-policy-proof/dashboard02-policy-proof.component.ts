import { Component, OnInit } from '@angular/core';
import { SubjectCallService } from '../../commons/services/subject-call/subject-call.service';
import { DashboardService } from '../../commons/services/dashboard/dashboard.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard02-policy-proof',
  templateUrl: './dashboard02-policy-proof.component.html',
  styleUrls: ['./dashboard02-policy-proof.component.css']
})
export class Dashboard02PolicyProofComponent implements OnInit {
  loading : boolean =true;
  policy;
  token;
  documentId :any = []; 
  documentslist :any = []; 
  policyid :any = []; 
  constructor(public routers: ActivatedRoute,public router: Router,public dash: DashboardService, public api_sub: SubjectCallService) { }

  ngOnInit(): void {
    $(".cst_mCst_scroll_Desk").mCustomScrollbar({
      theme:"dark"
    });
    
    if(localStorage.getItem('policyDetailList')!= undefined || localStorage.getItem('policyDetailList')!= null)
    {
      this.policy = JSON.parse(localStorage.getItem('policyDetailList'));
      console.log(this.policy);
    }
    this.documentsListStable();
    this.loading = false;
  }
  
  onDocopendec(){
    let docid = this.documentId.documentId;
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
  onDocopen(){
    let docid = this.policyid.documentId;
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
  documentsListStable() {
    console.log(this.policy.policyNumber);
              let docreq = {
                "policyNo": this.policy.policyNumber
              
              };
              this.dash.documentListstable(docreq).subscribe((datanew: {}) => {
            
                console.log('datanew', datanew);
                this.documentslist = datanew['documents'];
                for(let i = 0; i< this.documentslist.length;i++){
                  if(this.documentslist[i].documentId.startsWith("PI_ID_TX")){
                      this.policyid = this.documentslist[i];
                  }
                   if(this.documentslist[i].documentId.startsWith("DEC_PTXNSA"))
                   this.documentId  = this.documentslist[i];
                }
                this.loading  = false;
              });
          
           }
}
