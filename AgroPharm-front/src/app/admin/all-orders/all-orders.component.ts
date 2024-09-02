import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from '../../seller/model/order.model';
import { OrdersService } from '../../seller/orders.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit{
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: string = '';
  clientFilter: string = '';
  delivererFilter: string = '';

  orderStatuses = Object.values(OrderStatus);

  constructor(private orderService: OrdersService) { }

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
      const matchesClient = !this.clientFilter || 
        (order.client.firstName.toLowerCase().includes(this.clientFilter.toLowerCase()) || 
        order.client.lastName.toLowerCase().includes(this.clientFilter.toLowerCase()));
      const matchesDeliverer = !this.delivererFilter || 
        (order.deliverer && (order.deliverer.firstName.toLowerCase().includes(this.delivererFilter.toLowerCase()) || 
        order.deliverer.lastName.toLowerCase().includes(this.delivererFilter.toLowerCase())));
  
      return matchesStatus && matchesClient && matchesDeliverer;
    });
  }
  
  getStatusKey(value: string): OrderStatus | undefined {
    return Object.keys(this.statusTranslations).find(
      (key) => this.statusTranslations[key as keyof typeof this.statusTranslations] === value
    ) as OrderStatus | undefined;
  }
  
  ngOnChanges(): void {
    this.applyFilters();
  }
}
