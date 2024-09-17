import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from '../model/order.model';
import { OrdersService } from '../orders.service';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../common/report.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: string = '';
  productFilter: string = '';

  orderStatuses = Object.values(OrderStatus);

  constructor(private orderService: OrdersService, private toastr: ToastrService, private reportService: ReportService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
      this.applyFilters();
    });
  }

  statusTranslations: { [key in OrderStatus]: string } = {
    [OrderStatus.CREATED]: 'Kreirano',
    [OrderStatus.CANCELLED]: 'Otkazano',
    [OrderStatus.APPROVED]: 'Odobreno',
    [OrderStatus.COLLECTED_FOR_DELIVERY]: 'Preuzeta za isporuku',
    [OrderStatus.DELIVERY_COMPLETED_SUCCESSFULLY]: 'Isporuka završena -> uspešno',
    [OrderStatus.DELIVERY_COMPLETED_UNSUCCESSFULLY]: 'Isporuka završena -> neuspešno',
    [OrderStatus.REJECTED]: 'Odbijeno'
  };  

  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesStatus = !this.selectedStatus || order.status === this.getStatusKey(this.selectedStatus);
      const matchesProduct = !this.productFilter || order.orderItems.some(item => item.product.name.toLowerCase().includes(this.productFilter.toLowerCase()));

      return matchesStatus && matchesProduct;
    });
  }

  approveOrder(orderId: number): void {
    this.orderService.approveOrder(orderId).subscribe(
      response => {
        this.toastr.success('Narudžbina je uspešno odobrena!', 'Uspeh');
        this.loadOrders();
      },
      error => {
        this.toastr.error('Došlo je do greške prilikom odobravanja narudžbine.', 'Greška');
      }
    );
  }

  rejectOrder(orderId: number): void {
    this.orderService.rejectOrder(orderId).subscribe(
      response => {
        this.toastr.success('Narudžbina je uspešno odbijena!', 'Uspeh');
        this.loadOrders();
      },
      error => {
        this.toastr.error('Došlo je do greške prilikom odbijanja narudžbine.', 'Greška');
      }
    );
  }
  
  getStatusKey(value: string): OrderStatus | undefined {
    return Object.keys(this.statusTranslations).find(
      (key) => this.statusTranslations[key as keyof typeof this.statusTranslations] === value
    ) as OrderStatus | undefined;
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
      this.applyFilters();
    });
  }
  
  ngOnChanges(): void {
    this.applyFilters();
  }

  downloadReport(): void {
    this.reportService.downloadOrdersReport();
  }
  
}
