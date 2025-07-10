export interface Customer {
  id?: number;
  customerId?: number;
  firstName: string;
  lastName: string;
  fname?: string;
  lname?: string;
  email: string;
  password?: string;
  phoneNumber: string;
  phoneNo?: string;
  address: string;
  city: string;
  // dateCreated?: Date;
  // isActive?: boolean;
}

export interface Employee {
  id?: number;
  employeeId?: number;
  firstName: string;
  lastName: string;
  fname?: string;
  lname?: string;
  email: string;
  password?: string;
  phoneNumber: string;
  phoneNo?: string;
  position: string;
  hireDate?: Date;
  salary: number;
  isActive?: boolean;
}

export interface Admin {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  dateCreated?: Date;
  isActive?: boolean;
}

export interface Topping {
  id?: number;
  toppingId?: number;
  toppingName?: string;
  name?: string;
  smallPrice: number;
  mediumPrice: number;
  largePrice: number;
  description?: string;
  imageUrl?: string;
  isVegetarian?: boolean;
  isAvailable?: boolean;
}

export interface Pizza {
  pizzaId?: number;
  name: string;
  smallPrice: number;
  mediumPrice: number;
  largePrice: number;
  category: string;
  imageUrl?: string;
  toppings?: Topping[];
}

export interface Order {
  orderId: number;
  customerId: number;
  employeeId?: number;
  pizzaId: number;
  orderStatus: string;
  totalPrice: number;
  deliveryDateTime: Date | null;
  // Add other fields as needed from your API
}

export interface OrderItem {
  id?: number;
  orderId?: number;
  pizzaId: number;
  pizza?: Pizza;
  quantity: number;
  price: number;
  customToppings?: Topping[];
  specialInstructions?: string;
}

export enum PizzaSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  XLarge = 'XLarge'
}

export enum CrustType {
  Thin = 'Thin',
  Thick = 'Thick',
  Stuffed = 'Stuffed',
  Gluten_Free = 'Gluten_Free'
}

export enum OrderStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Preparing = 'Preparing',
  Baking = 'Baking',
  Ready = 'Ready',
  Out_for_Delivery = 'Out_for_Delivery',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: Customer | Employee | Admin;
  role: UserRole;
  message?: string;
}

export enum UserRole {
  Customer = 'Customer',
  Employee = 'Employee',
  Admin = 'Admin'
}

export interface ApiResponse<T> {
  order: boolean;
  success: boolean;
  data?: T;
  ord?: T;
  pizza?: T;
  customers?: T;
  employees?: T;
  toppings?: T;
  cust?: T;
  emp?: T;
  top?: T;
  message?: string;
  errors?: string[];
}