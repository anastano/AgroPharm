import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  downloadOrdersReport(): void {
    this.http.get(environment.apiHost + 'reports/orders', { responseType: 'blob' })
      .subscribe((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'orders_report.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
  }


}
