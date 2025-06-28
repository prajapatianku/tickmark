import { useEffect, useState } from "react";
import OpenPositions from "../features/tracker/OpenPositions";
import ClosedPositions from "../features/tracker/ClosedPositions";
import {
  getOpenPositions,
  getClosedPositions,
} from "../Services/firestoreService";
import { useAuth } from "../context/AuthContext";

const Portfolio = () => {
  const { user } = useAuth();
  const [positions, setPositions] = useState([]);
  const [closedPositions, setClosedPositions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const open = await getOpenPositions(user.uid);
        const closed = await getClosedPositions(user.uid);
        setPositions(open);
        setClosedPositions(closed);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="p-4 mt-16">
      <OpenPositions
        positions={positions}
        setPositions={setPositions}
        closedPositions={closedPositions}
        setClosedPositions={setClosedPositions}
      />
      <ClosedPositions closedPositions={closedPositions} />
    </div>
  );
};

export default Portfolio;
