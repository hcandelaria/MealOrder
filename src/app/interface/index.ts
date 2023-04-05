export interface Item {
  name: string;
  description: string;
  status: string;
  price: number;
  thumbnail_url: string;
  size: string;
  spicy_level: string;
  available_date?: string;
  recurrence?: string;
}

export interface ItemType {
  items: Item[];
  serviceDate: string;
  addItem: (item: Item) => void;
  addItems: (item: [Item]) => void;
  removeItem: (index: number) => void;
  filterItems: (serviceDate: string) => void;
  setServiceDate: (serviceDate: string) => void;
}

export interface ShoppingCartType {
  shoppingCartId: string;
  serviceDate: string;
  customerName: string;
  customerPhone: string;
  comments: string;
  status: string;
  items: Item[];
  addItem: (item: Item) => void;
  addItems: (item: [Item]) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
  filterItems: (serviceDate: string) => void;
  setServiceDate: (serviceDate: string) => void;
}
