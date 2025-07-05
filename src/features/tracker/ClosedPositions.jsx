import React from "react";

const ClosedPositions = ({ closedPositions, handleDelete }) => {
  const formatNumber = (num) => parseFloat(num).toFixed(2);

  const totalBookedProfit = closedPositions.reduce((acc, pos) => {
    return acc + (parseFloat(pos.gain) || 0);
  }, 0);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto mt-10">
      <h2 className="text-xl font-semibold text-gray-800 px-4 py-3 border-b">
        Closed Positions
      </h2>
      <div className="px-4 py-2 text-gray-800 font-medium">
        Total Booked Profit:{" "}
        <span className="text-green-600 font-semibold">
          ₹{totalBookedProfit.toFixed(2)}
        </span>
      </div>

      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">S. No.</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Buy Date</th>
            <th className="px-4 py-2">Buy Rate</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Buy Value</th>
            <th className="px-4 py-2">Sell Date</th>
            <th className="px-4 py-2">Sell Price</th>
            <th className="px-4 py-2">Sell Value</th>
            <th className="px-4 py-2">Gain</th>
            <th className="px-4 py-2">Days</th>
            <th className="px-4 py-2">% Gain</th>
            <th className="px-4 py-2">% Annual Gain</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {closedPositions.map((pos, index) => (
            <tr key={pos.id || index} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{pos.stock}</td>
              <td className="px-4 py-2">{pos.buyDate}</td>
              <td className="px-4 py-2">{formatNumber(pos.buyPrice)}</td>
              <td className="px-4 py-2">{pos.qty}</td>
              <td className="px-4 py-2">{formatNumber(pos.buyValue)}</td>
              <td className="px-4 py-2">{pos.sellDate}</td>
              <td className="px-4 py-2">{formatNumber(pos.sellPrice)}</td>
              <td className="px-4 py-2">{formatNumber(pos.sellValue)}</td>
              <td className="px-4 py-2">{formatNumber(pos.gain)}</td>
              <td className="px-4 py-2">{pos.days}</td>
              <td className="px-4 py-2">{formatNumber(pos.percentGain)}</td>
              <td className="px-4 py-2">{formatNumber(pos.annualGain)}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => {
                    console.log("Deleting:", pos.id); // 🔍 log it
                    handleDelete(pos.id);
                  }}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClosedPositions;
