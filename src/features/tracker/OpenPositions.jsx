import React, { useState, useEffect } from "react";

import { FaPlus, FaEdit, FaCheckCircle, FaTrash } from "react-icons/fa";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  setDoc,
  query,
  getDocs,
} from "firebase/firestore";

import { db } from "../../Services/firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import { getLivePrice } from "../../Services/getLivePrice";

const initialFormState = {
  stock: "",
  buyDate: "",
  buyPrice: "",
  qty: "",
  cmp: "",
  strategy: "",
  targetPrice: "",
  notes: "",
};

const OpenPositions = ({
  positions,
  setPositions,
  closedPositions,
  setClosedPositions,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.uid) return;

      try {
        const q = query(collection(db, "users", user.uid, "openPositions"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPositions(data);
      } catch (error) {
        console.error("Error fetching open positions:", error);
      }
    };

    fetchData();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchCMP = async () => {
    if (!formData.stock) {
      alert("Please enter the stock symbol.");
      return;
    }

    console.log("Fetching CMP for:", formData.stock);
    const livePrice = await getLivePrice(formData.stock);

    if (!livePrice) {
      alert("Failed to fetch CMP. Please check the symbol or try again.");
      return;
    }

    console.log("Fetched CMP:", livePrice);
    setFormData((prev) => ({ ...prev, cmp: livePrice.toFixed(2) }));
  };

  const calculateValues = (data) => {
    const buyValue = parseFloat(data.buyPrice) * parseFloat(data.qty);
    const currentValue = parseFloat(data.cmp) * parseFloat(data.qty);
    const gainPercent = (((currentValue - buyValue) / buyValue) * 100).toFixed(
      2
    );
    const targetValue = parseFloat(data.targetPrice) * parseFloat(data.qty);
    const totalGain = targetValue - buyValue;
    const remainingGain = targetValue - currentValue;

    const today = new Date();
    const buyDate = new Date(data.buyDate);
    const diffTime = today.getTime() - buyDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return {
      ...data,
      buyValue: parseFloat(buyValue.toFixed(2)),
      currentValue: parseFloat(currentValue.toFixed(2)),
      gainPercent: `${gainPercent}%`,
      targetValue: parseFloat(targetValue.toFixed(2)),
      totalGain: parseFloat(totalGain.toFixed(2)),
      remainingGain: parseFloat(remainingGain.toFixed(2)),
      dateValue: diffDays,
      days: diffDays,
    };
  };

  const handleEdit = (index) => {
    const pos = positions[index];
    setFormData(pos);
    setEditIndex(index);
    setModalOpen(true);
  };

  const handleDelete = async (index) => {
    const pos = positions[index];
    if (pos.id && user?.uid) {
      await deleteDoc(doc(db, "users", user.uid, "openPositions", pos.id));
      const updated = [...positions];
      updated.splice(index, 1);
      setPositions(updated);
    }
  };

  const handleBookProfit = async (index) => {
    const pos = positions[index];
    if (user?.uid && pos.id) {
      await deleteDoc(doc(db, "users", user.uid, "openPositions", pos.id));
      await addDoc(collection(db, "users", user.uid, "closedPositions"), {
        ...pos,
        closedAt: serverTimestamp(),
      });
      const updated = [...positions];
      updated.splice(index, 1);
      setPositions(updated);
      setClosedPositions((prev) => [...prev, pos]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.uid) {
      console.error("User not logged in.");
      alert("You must be logged in to add a stock.");
      return;
    }

    const fullData = calculateValues(formData);
    const updated = [...positions];

    try {
      if (editIndex !== null) {
        const existingDocId = positions[editIndex].id;
        if (existingDocId) {
          const ref = doc(
            db,
            "users",
            user.uid,
            "openPositions",
            existingDocId
          );
          await setDoc(ref, { ...fullData, updatedAt: serverTimestamp() });
          updated[editIndex] = { ...fullData, id: existingDocId };
          setPositions(updated);
        }
      } else {
        const docRef = await addDoc(
          collection(db, "users", user.uid, "openPositions"),
          {
            ...fullData,
            createdAt: serverTimestamp(),
          }
        );
        updated.push({ ...fullData, id: docRef.id });
        setPositions(updated);
      }

      setFormData(initialFormState);
      setEditIndex(null);
      setModalOpen(false);
    } catch (error) {
      console.error("Error writing document to Firestore:", error);
      alert(
        "Failed to save stock. Please check your connection or Firebase setup."
      );
    }
  };

  const filteredPositions = positions.filter(
    (pos) =>
      pos.stock.toLowerCase().includes(search.toLowerCase()) ||
      pos.strategy.toLowerCase().includes(search.toLowerCase())
  );

  const totals = filteredPositions.reduce(
    (acc, curr) => {
      acc.buyValue += curr.buyValue;
      acc.currentValue += curr.currentValue;
      return acc;
    },
    { buyValue: 0, currentValue: 0 }
  );

  return (
    <div className="bg-gray-100 shadow-md rounded-lg overflow-x-auto mt-6 p-4">
      <div className="flex justify-between items-center border-b pb-3 mb-3">
        <h2 className="text-xl font-bold text-gray-900">Open Positions</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Filter by stock or strategy..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1 text-sm border rounded"
          />
          <button
            onClick={() => {
              setModalOpen(true);
              setEditIndex(null);
              setFormData(initialFormState);
            }}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-2 text-sm"
          >
            <FaPlus /> Add Stock
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-800 mb-3">
        <strong>Total Buy Value:</strong> ₹{totals.buyValue.toFixed(2)} |{" "}
        <strong>Total Current Value:</strong> ₹{totals.currentValue.toFixed(2)}{" "}
        | <strong>Total Gain:</strong> ₹
        {(totals.currentValue - totals.buyValue).toFixed(2)}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">S. No.</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Buy Date</th>
              <th className="px-4 py-2">Buy Price</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Buy Value</th>
              <th className="px-4 py-2">CMP</th>
              <th className="px-4 py-2">Current Value</th>
              <th className="px-4 py-2">% Gain</th>
              <th className="px-4 py-2">Days</th>
              <th className="px-4 py-2">Strategy</th>
              <th className="px-4 py-2">Target</th>
              <th className="px-4 py-2">Total Gain</th>
              <th className="px-4 py-2">Remaining</th>
              <th className="px-4 py-2">Target Value</th>
              <th className="px-4 py-2">Notes</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPositions.map((pos, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{pos.stock}</td>
                <td className="px-4 py-2">{pos.buyDate}</td>
                <td className="px-4 py-2">{pos.buyPrice}</td>
                <td className="px-4 py-2">{pos.qty}</td>
                <td className="px-4 py-2">{pos.buyValue}</td>
                <td className="px-4 py-2">{pos.cmp}</td>
                <td className="px-4 py-2">{pos.currentValue}</td>
                <td className="px-4 py-2">{pos.gainPercent}</td>
                <td className="px-4 py-2">{pos.dateValue}</td>
                <td className="px-4 py-2">{pos.strategy}</td>
                <td className="px-4 py-2">{pos.targetPrice}</td>
                <td className="px-4 py-2">{pos.totalGain}</td>
                <td className="px-4 py-2">{pos.remainingGain}</td>
                <td className="px-4 py-2">{pos.targetValue}</td>
                <td className="px-4 py-2 max-w-xs overflow-y-auto whitespace-pre-wrap">
                  <div className="max-h-20 overflow-y-auto border p-1 rounded">
                    {pos.notes || "-"}
                  </div>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleBookProfit(index)}
                    className="flex items-center gap-1 text-green-700 hover:text-white hover:bg-green-600 border border-green-500 px-2 py-1 rounded text-xs"
                  >
                    <FaCheckCircle /> Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {editIndex !== null ? "Edit Stock" : "Add Stock"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {[
                "stock",
                "buyDate",
                "buyPrice",
                "qty",
                "strategy",
                "targetPrice",
              ].map((field) => (
                <input
                  key={field}
                  type={field === "buyDate" ? "date" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="border px-3 py-2 rounded text-sm"
                />
              ))}
              <div className="col-span-2 flex gap-2 items-center">
                <input
                  type="text"
                  name="cmp"
                  placeholder="CMP"
                  value={formData.cmp}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded text-sm w-full"
                  required
                />
                <button
                  type="button"
                  onClick={fetchCMP}
                  className="bg-blue-500 text-white px-3 py-2 rounded text-sm"
                >
                  Fetch
                </button>
              </div>
              <textarea
                name="notes"
                placeholder="Notes (optional)"
                value={formData.notes}
                onChange={handleChange}
                className="col-span-2 border px-3 py-2 rounded text-sm h-24"
              ></textarea>
              <div className="col-span-2 flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditIndex(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenPositions;
