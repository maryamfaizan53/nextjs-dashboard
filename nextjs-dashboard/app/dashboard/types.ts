// types.ts
export type Invoice = {
  id: any;
  amount: number;
  customerId: any;
  status: "pending" | "paid";
};

export type CustomerField = {
  id: any;
  name: string;
  // Add more fields if necessary
};
