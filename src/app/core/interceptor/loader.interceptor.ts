import { Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as $ from 'jquery';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    public requests1: HttpErrorResponse;
 
    constructor( private router: Router) {
       
     }
 
    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
            $('#loader').remove();
             //  this.SpinnerService.hide();
         //  this.loaderService.isLoading.next(this.requests.length > 0);
        }
       
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // ////console.log(this.requests1,"No of requests--->" + JSON.stringify(this.requests));
        this.requests.push(req);
       // $('#loader').remove();
      // var child= '<div id="loader" class="preloaderOuter"> <div class="preloader"> <div class="circle-dot circ1"></div> <div class="circle-dot circ2"></div> <div class="circle-dot circ3"></div> <div class="circle-dot circ4"></div> </div> </div>';
      var child= '<div id="loader" class="preloaderOuter"><div class="preload_logoOuter preloader_sm"><div class="preload_flip"><div class="preload_logo logoFront"><img class="w-100" src="./assets/images/pronto_preloader.png" alt=""></div> <div class="preload_logo logoBack"><img class="w-100" src="./assets/images/pronto_preloader.png" alt=""></div> </div></div> </div>' 
      $(document.body).append(child);
        return Observable.create(observer => {
            const subscription = next.handle(req)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                        
                           console.log('testinterceptor');
                            // if(event.body['loginStatus']==20)
                            // {
                            //     window.localStorage.clear();
                            //     this.router.navigate(['/login']);
                                
                            // }
                            
                           
                            this.removeRequest(req);
                            observer.next(event);
                        }
                    },
                    
                    err => {
                        
                        console.log('errortestinterceptor');
                        this.removeRequest(req);
                        observer.error(err);
                      
                    },
                    () => {
                        this.removeRequest(req);
                        
                        observer.complete();
                        console.log('completeinterceptor');
                        //
                        $('#loader').remove();
      
                    });
                   
            // remove request from queue when cancelled
            return () => {
                console.log('removeinterceptor');
                this.removeRequest(req);
                subscription.unsubscribe();
               
            };
        });
    }
    

}
