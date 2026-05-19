import React from "react";
import Badge from "./Badge";

const OrderTable = ({ orders }) => {
  return (
    <div className="bg-white border border-bg-soft rounded-[25px] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-bg-main/40 border-b border-bg-soft text-secondary-dark/50 font-bold uppercase tracking-wider">
              <th className="p-4 pl-6">ID Invoice</th>
              <th className="p-4">Pelanggan</th>
              <th className="p-4">Kurasi Produk</th>
              <th className="p-4">Total</th>
              <th className="p-4 pr-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-soft/50 font-medium">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-bg-main/10 transition-colors">
                <td className="p-4 pl-6 font-mono font-bold text-primary-dark">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4 italic font-playfair text-sm">{order.product}</td>
                <td className="p-4 font-bold">{order.total}</td>
                <td className="p-4 pr-6 text-right">
                  <Badge type={order.status === "Completed" ? "success" : order.status === "Pending" ? "warning" : "danger"}>
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;