import React, { useState } from "react";

type InvoiceStatus = "pending" | "paid";

interface InvoiceFormProps {
  onSubmit: (formData: FormData) => void; // Adjust function type if needed
}

const EditInvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [customerId, setCustomerId] = useState<string>("");
  const [status, setStatus] = useState<InvoiceStatus>("pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new FormData instance and append fields
    const data = new FormData();
    data.append("amount", amount.toString()); // Convert number to string
    data.append("customerId", customerId);
    data.append("status", status);

    // Pass the FormData object to the onSubmit function
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label>
          Customer ID:
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </label>
      </div>

      <button type="submit">Save Invoice</button>
    </form>
  );
};

export default EditInvoiceForm;



// 'use client';
// import React, { useState } from 'react';
// import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
// import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import { Button } from '@/app/ui/button';
// import { updateInvoice } from '@/app/lib/actions';

// export default function EditInvoiceForm({
//   invoice,
//   customers
// }: {
//   invoice: InvoiceForm;
//   customers: CustomerField[]
// }) {
//   const [formData, setFormData] = useState({
//     amount: invoice.amount,
//     customerId: invoice.customer_id,
//     status: invoice.status
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await updateInvoice(formData, invoice.id); 
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         {/* Customer Name */}
//         <div className="mb-4">
//           <label htmlFor="customer" className="mb-2 block text-sm font-medium">
//             Choose customer
//           </label>
//           <div className="relative">
//             <select
//               id="customer"
//               name="customerId"
//               value={formData.customerId}
//               onChange={handleChange}
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//             >
//               <option value="" disabled>
//                 Select a customer
//               </option>
//               {customers.map((customer) => (
//                 <option key={customer.id} value={customer.id}>
//                   {customer.name}
//                 </option>
//               ))}
//             </select>
//             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//         </div>

//         {/* Invoice Amount */}
//         <div className="mb-4">
//           <label htmlFor="amount" className="mb-2 block text-sm font-medium">
//             Choose an amount
//           </label>
//           <div className="relative mt-2 rounded-md">
//             <input
//               id="amount"
//               name="amount"
//               type="number"
//               step="0.01"
//               value={formData.amount}
//               onChange={handleChange}
//               placeholder="Enter USD amount"
//               className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//             />
//             <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//           </div>
//         </div>

//         {/* Invoice Status */}
//         <fieldset>
//           <legend className="mb-2 block text-sm font-medium">
//             Set the invoice status
//           </legend>
//           <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
//             <div className="flex gap-4">
//               <label className="flex items-center">
//                 <input
//                   id="pending"
//                   name="status"
//                   type="radio"
//                   value="pending"
//                   checked={formData.status === 'pending'}
//                   onChange={handleChange}
//                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                 />
//                 <span className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
//                   Pending <ClockIcon className="h-4 w-4" />
//                 </span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   id="paid"
//                   name="status"
//                   type="radio"
//                   value="paid"
//                   checked={formData.status === 'paid'}
//                   onChange={handleChange}
//                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                 />
//                 <span className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
//                   Paid <CheckIcon className="h-4 w-4" />
//                 </span>
//               </label>
//             </div>
//           </div>
//         </fieldset>
//       </div>
//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/invoices"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Cancel
//         </Link>
//         <Button type="submit">Edit Invoice</Button>
//       </div>
//     </form>
//   );
// }

// // // old
// // 'use client';

// // import React from 'react';
// // import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
// // import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
// // import Link from 'next/link';
// // import { Button } from '@/app/ui/button';
// // import { updateInvoice } from '@/app/lib/actions';
// // import { useActionState } from 'react';




// // export default function EditInvoiceForm({
// //   invoice,
// //   customers
// // }: {
// //   invoice: InvoiceForm;
// //   customers: CustomerField[]
// // }) 
// // {
// // const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
// // const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

 
// //   return (
// //     <form action={updateInvoiceWithId}>
// //       <div className="rounded-md bg-gray-50 p-4 md:p-6">
// //         {/* Customer Name */}
// //         <div className="mb-4">
// //           <label htmlFor="customer" className="mb-2 block text-sm font-medium">
// //             Choose customer
// //           </label>
// //           <div className="relative">
// //             <select
// //               id="customer"
// //               name="customerId"
// //               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
// //               defaultValue={invoice.customer_id}
// //             >
// //               <option value="" disabled>
// //                 Select a customer
// //               </option>
// //               {customers.map((customer) => (
// //                 <option key={customer.id} value={customer.id}>
// //                   {customer.name}
// //                 </option>
// //               ))}
// //             </select>
// //             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
// //           </div>
// //         </div>

// //         {/* Invoice Amount */}
// //         <div className="mb-4">
// //           <label htmlFor="amount" className="mb-2 block text-sm font-medium">
// //             Choose an amount
// //           </label>
// //           <div className="relative mt-2 rounded-md">
// //             <div className="relative">
// //               <input
// //                 id="amount"
// //                 name="amount"
// //                 type="number"
// //                 step="0.01"
// //                 defaultValue={invoice.amount}
// //                 placeholder="Enter USD amount"
// //                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
// //               />
// //               <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Invoice Status */}
// //         <fieldset>
// //           <legend className="mb-2 block text-sm font-medium">
// //             Set the invoice status
// //           </legend>
// //           <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
// //             <div className="flex gap-4">
// //               <div className="flex items-center">
// //                 <input
// //                   id="pending"
// //                   name="status"
// //                   type="radio"
// //                   value="pending"
// //                   defaultChecked={invoice.status === 'pending'}
// //                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
// //                 />
// //                 <label
// //                   htmlFor="pending"
// //                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
// //                 >
// //                   Pending <ClockIcon className="h-4 w-4" />
// //                 </label>
// //               </div>
// //               <div className="flex items-center">
// //                 <input
// //                   id="paid"
// //                   name="status"
// //                   type="radio"
// //                   value="paid"
// //                   defaultChecked={invoice.status === 'paid'}
// //                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
// //                 />
// //                 <label
// //                   htmlFor="paid"
// //                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
// //                 >
// //                   Paid <CheckIcon className="h-4 w-4" />
// //                 </label>
// //               </div>
// //             </div>
// //           </div>
// //         </fieldset>
// //       </div>
// //       <div className="mt-6 flex justify-end gap-4">
// //         <Link
// //           href="/dashboard/invoices"
// //           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
// //         >
// //           Cancel
// //         </Link>
// //         <Button type="submit">Edit Invoice</Button>
// //       </div>
// //     </form>
// //   );
  
// // }

// // 'use client';

// // import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
// // import {
// //   CheckIcon,
// //   ClockIcon,
// //   CurrencyDollarIcon,
// //   UserCircleIcon,
// // } from '@heroicons/react/24/outline';
// // import Link from 'next/link';
// // import { Button } from '@/app/ui/button';
// // import { updateInvoice } from '@/app/lib/actions';
// // // Replace useActionState with useState for demonstration or import from correct source if it's custom
// // import { useState } from 'react';

// // // Define initialState if not already defined
// // const initialState = { /* your initial state here */ };

// // export default function EditInvoiceForm({
// //   invoice,
// //   customers,
// // }: {
// //   invoice: InvoiceForm;
// //   customers: CustomerField[];
// // }) {
// //   const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
// //   // If useActionState is not available, use useState or a similar hook
// //   const [state, setState] = useState(initialState);

// //   // Submit handler
// //   const handleSubmit = async (event: React.FormEvent) => {
// //     event.preventDefault();
// //     await updateInvoiceWithId(state); // Adjust based on how updateInvoice needs data
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <div className="rounded-md bg-gray-50 p-4 md:p-6">
// //         {/* Customer Name */}
// //         <div className="mb-4">
// //           <label htmlFor="customer" className="mb-2 block text-sm font-medium">
// //             Choose customer
// //           </label>
// //           <div className="relative">
// //             <select
// //               id="customer"
// //               name="customerId"
// //               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
// //               defaultValue={invoice.customer_id}
// //             >
// //               <option value="" disabled>
// //                 Select a customer
// //               </option>
// //               {customers.map((customer) => (
// //                 <option key={customer.id} value={customer.id}>
// //                   {customer.name}
// //                 </option>
// //               ))}
// //             </select>
// //             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
// //           </div>
// //         </div>

// //         {/* Invoice Amount */}
// //         <div className="mb-4">
// //           <label htmlFor="amount" className="mb-2 block text-sm font-medium">
// //             Choose an amount
// //           </label>
// //           <div className="relative mt-2 rounded-md">
// //             <div className="relative">
// //               <input
// //                 id="amount"
// //                 name="amount"
// //                 type="number"
// //                 step="0.01"
// //                 defaultValue={invoice.amount}
// //                 placeholder="Enter USD amount"
// //                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
// //               />
// //               <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Invoice Status */}
// //         <fieldset>
// //           <legend className="mb-2 block text-sm font-medium">
// //             Set the invoice status
// //           </legend>
// //           <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
// //             <div className="flex gap-4">
// //               <div className="flex items-center">
// //                 <input
// //                   id="pending"
// //                   name="status"
// //                   type="radio"
// //                   value="pending"
// //                   defaultChecked={invoice.status === 'pending'}
// //                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
// //                 />
// //                 <label
// //                   htmlFor="pending"
// //                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
// //                 >
// //                   Pending <ClockIcon className="h-4 w-4" />
// //                 </label>
// //               </div>
// //               <div className="flex items-center">
// //                 <input
// //                   id="paid"
// //                   name="status"
// //                   type="radio"
// //                   value="paid"
// //                   defaultChecked={invoice.status === 'paid'}
// //                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
// //                 />
// //                 <label
// //                   htmlFor="paid"
// //                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
// //                 >
// //                   Paid <CheckIcon className="h-4 w-4" />
// //                 </label>
// //               </div>
// //             </div>
// //           </div>
// //         </fieldset>
// //       </div>
// //       <div className="mt-6 flex justify-end gap-4">
// //         <Link
// //           href="/dashboard/invoices"
// //           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
// //         >
// //           Cancel
// //         </Link>
// //         <Button type="submit">Edit Invoice</Button>
// //       </div>
// //     </form>
// //   );
// // }
