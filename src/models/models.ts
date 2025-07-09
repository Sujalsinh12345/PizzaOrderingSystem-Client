export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  address: string;
  city: string;
  // dateCreated?: Date;
  // isActive?: boolean;
}

export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber: string;
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
  name: string;
  price: number;
  description?: string;
  isVegetarian: boolean;
  isAvailable: boolean;
  imageUrl?: string;
}

export interface Pizza {
  id?: number;
  name: string;
  description: string;
  basePrice: number;
  size: PizzaSize;
  crust: CrustType;
  isVegetarian: boolean;
  isAvailable: boolean;
  imageUrl?: string;
  toppings?: Topping[];
}

export interface Order {
  id?: number;
  customerId: number;
  customer?: Customer;
  orderDate?: Date;
  totalAmount: number;
  status: OrderStatus;
  deliveryAddress: string;
  phoneNumber: string;
  specialInstructions?: string;
  orderItems?: OrderItem[];
  employeeId?: number;
  employee?: Employee;
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
  Customer = 'customer',
  Employee = 'Employee',
  Admin = 'Admin'
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}