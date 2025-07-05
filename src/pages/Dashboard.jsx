import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaClipboardList,
  FaRocket,
  FaCalculator,
  FaBook,
  FaPenFancy,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="mt-20 p-6 bg-blue-50 min-h-screen text-center">
      <motion.h1
        className="text-5xl font-bold text-black mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to your Dashboard
      </motion.h1>

      <motion.p
        className="text-lg text-black mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Get an overview of your investments, watchlist, and performance
        insights.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Portfolio Card */}
        <motion.div
          className="bg-blue-200 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FaChartLine className="text-black text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-semibold text-black mb-2">
            Portfolio Performance
          </h2>
          <p className="text-base text-black">
            Track the growth and gain/loss of your stock portfolio over time.
          </p>
        </motion.div>

        {/* Watchlist Card */}
        <motion.div
          className="bg-blue-200 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FaClipboardList className="text-black text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-semibold text-black mb-2">Watchlist</h2>
          <p className="text-base text-black">
            Keep an eye on your favorite stocks and get live updates.
          </p>
        </motion.div>

        {/* Quick Actions Card */}
        <motion.div
          className="bg-blue-200 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FaRocket className="text-black text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-semibold text-black mb-2">
            Quick Actions
          </h2>
          <p className="text-base text-black">
            Add new trades, update CMPs, or book profits instantly.
          </p>
        </motion.div>

        {/* Calculator Card - with toggle */}
        <Link to="/calculator">
          <motion.div
            className="bg-blue-200 p-6 rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <FaCalculator className="text-black text-4xl mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold text-black mb-2">
              Calculator
            </h2>
            <p className="text-base text-black">
              Use SIP calculator for estimating returns.
            </p>
          </motion.div>
        </Link>

        {/* Stock Journal Card */}
        <motion.div
          className="bg-blue-200 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FaBook className="text-black text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-semibold text-black mb-2">
            Stock Journal
          </h2>
          <p className="text-base text-black">
            Maintain detailed records of trades and strategies.
          </p>
        </motion.div>

        {/* Option Journal Card */}
        <motion.div
          className="bg-blue-200 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FaPenFancy className="text-black text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-semibold text-black mb-2">
            Option Journal
          </h2>
          <p className="text-base text-black">
            Log options trades with details to refine strategy.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
