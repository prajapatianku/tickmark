import { useEffect, useState } from "react";
import OpenPositions from "../features/tracker/OpenPositions";
import ClosedPositions from "../features/tracker/ClosedPositions";
import {
  getOpenPositions,
  getClosedPositions,
  deleteClosedPosition,
} from "../Services/firestoreService";
import { useAuth } from "../context/AuthContext";

const Portfolio = () => {
  const { user } = useAuth();
  const [positions, setPositions] = useState([]);
  const [closedPositions, setClosedPositions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const closed = await getClosedPositions(user.uid);
        setClosedPositions(closed);
      }
    };
    fetchData();
  }, [user]);
  const handleDeleteClosed = async (positionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this position?"
    );
    if (!confirmDelete) return;

    try {
      await deleteClosedPosition(user.uid, positionId);
      setClosedPositions((prev) => prev.filter((pos) => pos.id !== positionId));
    } catch (error) {
      console.error("Failed to delete position:", error);
    }
  };

  return (
    <div className="p-4 mt-16">
      <OpenPositions
        positions={positions}
        setPositions={setPositions}
        closedPositions={closedPositions}
        setClosedPositions={setClosedPositions}
      />
      <ClosedPositions
        closedPositions={closedPositions}
        handleDelete={handleDeleteClosed}
      />
    </div>
  );
};

export default Portfolio;
