import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from '../../seller/model/order.model';
import { OrdersService } from '../../seller/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrl: './client-orders.component.css'
})
export class ClientOrdersComponent implements OnInit{
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: string = '';
  productFilter: string = '';

  orderStatuses = Object.values(OrderStatus);

  constructor(private orderService: OrdersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.orderService.getClientsOrders().subscribe(data => {
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

  cancelOrder(orderId: number): void {
    this.orderService.cancelOrder(orderId).subscribe(
      response => {
        console.log('Order cancelled', response);
        this.toastr.success('Narudžbina je uspešno otkazana!', 'Uspeh');
        this.toastr.info('Dobili ste 5 kaznenih bodova!', 'Obaveštenje');
        this.loadOrders();
      },
      error => {
        this.toastr.error('Došlo je do greške prilikom otkazivanja narudžbine.', 'Greška');
      }
    );
  }
  
  getStatusKey(value: string): OrderStatus | undefined {
    return Object.keys(this.statusTranslations).find(
      (key) => this.statusTranslations[key as keyof typeof this.statusTranslations] === value
    ) as OrderStatus | undefined;
  }

  loadOrders(): void {
    this.orderService.getClientsOrders().subscribe(data => {
      this.orders = data;
      this.applyFilters();
    });
  }
  
  ngOnChanges(): void {
    this.applyFilters();
  }
}
