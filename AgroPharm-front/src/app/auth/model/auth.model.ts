export interface Login {
    email: string;
    password: string;
  }

export interface CurrentUser {
    email: string;
    role: string;
  }

  export interface AuthenticationResponse {
    accessToken: string;
    expiresIn: string;
    refreshToken: string;
  }

  export interface Address {
    street: string;
    streetNumber: string;
    city: string;
    country: string;
    postalCode: number;
  }

  export interface User {
    id?: number,
    email: string;
    firstName: string;
    lastName: string;
    address: Address;
    phoneNumber: string;
  }

  export interface Client {
    user: User;
    penaltyPoints: number;
    isEnabled: boolean;
  }

  export interface Seller {
    user: User;
  }

  export interface Deliverer{
    user: User;
  }

  export interface Admin{
    user: User;
  }
  
