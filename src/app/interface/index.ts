export interface Item {
  PK: string;
  SK: string;
  GSI1PK?: string;
  GSI1SK?: string;
  Data: {
    Name: string;
    Description: string;
    Status: string;
    Price: number;
    Thumbnail_Url: string;
    Size: any;
    Spicy_Level: any;
    Current_Size?: any;
    Current_Spicy_Level?: any;
    Available_Date?: string;
    Order_Quantity?: number;
    Recurrence?: string;
  };
}

export interface ItemType {
  items: Item[];
  service_date: string;
  addItem: (item: Item) => void;
  addItems: (item: [Item]) => void;
  removeItem: (index: number) => void;
  filterItems: (serviceDate: string) => void;
  setServiceDate: (serviceDate: string) => void;
}

export interface ShoppingCartType {
  shopping_cart_id: string;
  service_date: string;
  customer_name: string;
  customer_phone: string;
  comments: string;
  status: string;
  items: Item[];
  addItem: (item: Item) => void;
  updateItem: (item: Item, index: number) => void;
  addItems: (item: [Item]) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
  filterItems: (serviceDate: string) => void;
  setServiceDate: (serviceDate: string) => void;
}
