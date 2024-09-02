import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from '../../seller/model/order.model';
import { OrdersService } from '../../seller/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deliverer-orders',
  templateUrl: './deliverer-orders.component.html',
  styleUrl: './deliverer-orders.component.css'
})
export class DelivererOrdersComponent implements OnInit{
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: string = '';
  delivererFilter: string = '';
  addressFilter = '';
  dateSortOrder: string = 'asc';

  orderStatuses = Object.values(OrderStatus);

  constructor(private orderService: OrdersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void{
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
      const matchesDeliverer = !this.delivererFilter || 
        (order.deliverer && (order.deliverer.firstName.toLowerCase().includes(this.delivererFilter.toLowerCase()) || 
        order.deliverer.lastName.toLowerCase().includes(this.delivererFilter.toLowerCase())));
      const matchesAddress = !this.addressFilter || 
        `${order.address.street} ${order.address.city} ${order.address.country}`.toLowerCase().includes(this.addressFilter.toLowerCase());
      
      return matchesStatus && matchesDeliverer && matchesAddress;
    });
  }
  
  getStatusKey(value: string): OrderStatus | undefined {
    return Object.keys(this.statusTranslations).find(
      (key) => this.statusTranslations[key as keyof typeof this.statusTranslations] === value
    ) as OrderStatus | undefined;
  }
  
  ngOnChanges(): void {
    this.applyFilters();
    this.sortOrders();
  }

  sortOrders(): void {
    this.filteredOrders.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return this.dateSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
  
  markOrderCollectedForDelivery(orderId: number): void {
    this.orderService.colectOrderForDelivery(orderId).subscribe(
      response => {
        this.toastr.success('Narudžbina je označena kao preuzeta!', 'Uspeh');
        this.loadOrders();
      },
      error => {
        this.toastr.error('Došlo je do greške prilikom promene statusa narudžbine.', 'Greška');
      }
    );
  }

  markOrderAsSuccesfullyDelivered(orderId: number): void {
    this.orderService.markOrderCompletedSuccessfully(orderId).subscribe(
      response => {
        this.toastr.success('Narudžbina je označena kao uspešna!', 'Uspeh');
        this.loadOrders();
      },
      error => {
        this.toastr.error('Došlo je do greške prilikom promene statusa narudžbine.', 'Greška');
      }
    );
  }

  markOrderAsUnuccesfullyDelivered(orderId: number): void {
    this.orderService.markOrderCompletedUnsuccessfully(orderId).subscribe(
      response => {
        this.toastr.success('Narudžbina je označena kao neuspešna!', 'Uspeh');
        this.loadOrders();
      },
      error => {
        this.toastr.error('Došlo je do greške prilikom promene statusa narudžbine.', 'Greška');
      }
    );
  }
}
