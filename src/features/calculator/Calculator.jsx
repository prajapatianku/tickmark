import { useState, useEffect, useRef } from "react";

const Calculator = () => {
  const [activeCalculator, setActiveCalculator] = useState("sip"); // State to manage which calculator is active

  // Function to render the active calculator component
  const renderCalculator = () => {
    switch (activeCalculator) {
      case "sip":
        return <SipCalculator />;
      case "lumpsum":
        return <LumpsumCalculator />;
      case "mtf":
        return <MtfCalculator />;
      case "brokerage":
        return <BrokerageCalculator />;
      default:
        return <SipCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 font-inter">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 w-full max-w-4xl px-2">
        <button
          className={`flex-1 min-w-[140px] px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base ${
            activeCalculator === "sip"
              ? "bg-blue-600 text-white transform scale-105"
              : "bg-white text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setActiveCalculator("sip")}
        >
          SIP Calculator
        </button>
        <button
          className={`flex-1 min-w-[140px] px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base ${
            activeCalculator === "lumpsum"
              ? "bg-blue-600 text-white transform scale-105"
              : "bg-white text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setActiveCalculator("lumpsum")}
        >
          Lumpsum Calculator
        </button>
        <button
          className={`flex-1 min-w-[140px] px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base ${
            activeCalculator === "mtf"
              ? "bg-blue-600 text-white transform scale-105"
              : "bg-white text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setActiveCalculator("mtf")}
        >
          MTF Calculator
        </button>
        <button
          className={`flex-1 min-w-[140px] px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base ${
            activeCalculator === "brokerage"
              ? "bg-blue-600 text-white transform scale-105"
              : "bg-white text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setActiveCalculator("brokerage")}
        >
          Brokerage Calculator
        </button>
      </div>

      {/* Render the active calculator */}
      <div className="w-full max-w-4xl bg-white p-4 md:p-8 rounded-xl shadow-lg border border-blue-200">
        {renderCalculator()}
      </div>
    </div>
  );
};

// Helper function to format numbers as currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// SIP Calculator Component
function SipCalculator() {
  // Removed default values, set to empty strings for placeholders
  const [monthlySavings, setMonthlySavings] = useState("");
  const [timeYears, setTimeYears] = useState("");
  const [expectedRate, setExpectedRate] = useState("");
  const [investedAmount, setInvestedAmount] = useState(0);
  const [profit, setProfit] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to calculate SIP
  const calculateSip = () => {
    const P = parseFloat(monthlySavings);
    const years = parseFloat(timeYears);
    const annualRate = parseFloat(expectedRate);

    if (
      isNaN(P) ||
      isNaN(years) ||
      isNaN(annualRate) ||
      P <= 0 ||
      years <= 0 ||
      annualRate <= 0
    ) {
      setInvestedAmount(0);
      setProfit(0);
      setTotalAmount(0);
      return;
    }

    const r = annualRate / 100 / 12; // Monthly rate of return
    const n = years * 12; // Total number of installments

    // Future Value of SIP (FV_SIP) formula
    // FV_SIP = P * (((1 + r)^n - 1) / r) * (1 + r)
    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const calculatedInvestedAmount = P * n;
    const calculatedProfit = futureValue - calculatedInvestedAmount;

    setInvestedAmount(calculatedInvestedAmount);
    setProfit(calculatedProfit);
    setTotalAmount(futureValue);
  };

  // Recalculate on input change
  useEffect(() => {
    calculateSip();
  }, [monthlySavings, timeYears, expectedRate]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4">
        SIP Calculator
      </h2>

      {/* Input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label
            htmlFor="monthlySavings"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            How much will you be saving each month?
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              ₹
            </span>
            <input
              type="number"
              id="monthlySavings"
              value={monthlySavings}
              onChange={(e) => setMonthlySavings(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="e.g., 25,000"
              min="0"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="timeYears"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Time (years)
          </label>
          <input
            type="number"
            id="timeYears"
            value={timeYears}
            onChange={(e) => setTimeYears(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="e.g., 10"
            min="0"
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="expectedRate"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Expected Rate of Return % (p.a.)
          </label>
          <div className="relative">
            <input
              type="number"
              id="expectedRate"
              value={expectedRate}
              onChange={(e) => setExpectedRate(e.target.value)}
              className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="e.g., 12"
              step="0.1"
              min="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              %
            </span>
          </div>
        </div>
      </div>

      {/* Results Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 shadow-inner text-center space-y-3 mt-6">
        <p className="text-gray-700 text-base sm:text-lg">
          Invested Amount:{" "}
          <span className="font-semibold text-blue-700">
            {formatCurrency(investedAmount)}
          </span>
        </p>
        <p className="text-gray-700 text-base sm:text-lg">
          Profit:{" "}
          <span className="font-semibold text-blue-700">
            {formatCurrency(profit)}
          </span>
        </p>
        <p className="text-gray-800 text-lg sm:text-xl font-bold">
          Total Amount:{" "}
          <span className="text-blue-800">{formatCurrency(totalAmount)}</span>
        </p>
      </div>
    </div>
  );
}

// Lumpsum Calculator Component
function LumpsumCalculator() {
  // Removed default values, set to empty strings for placeholders
  const [initialInvestment, setInitialInvestment] = useState("");
  const [timeYears, setTimeYears] = useState("");
  const [expectedRate, setExpectedRate] = useState("");
  const [futureValue, setFutureValue] = useState(0);
  const [profit, setProfit] = useState(0);

  // Function to calculate Lumpsum
  const calculateLumpsum = () => {
    const P = parseFloat(initialInvestment);
    const years = parseFloat(timeYears);
    const annualRate = parseFloat(expectedRate);

    if (
      isNaN(P) ||
      isNaN(years) ||
      isNaN(annualRate) ||
      P <= 0 ||
      years <= 0 ||
      annualRate <= 0
    ) {
      setFutureValue(0);
      setProfit(0);
      return;
    }

    const r = annualRate / 100; // Annual rate of return

    // Future Value of Lumpsum (FV_Lumpsum) formula
    // FV_Lumpsum = P * (1 + r)^n
    const calculatedFutureValue = P * Math.pow(1 + r, years);
    const calculatedProfit = calculatedFutureValue - P;

    setFutureValue(calculatedFutureValue);
    setProfit(calculatedProfit);
  };

  // Recalculate on input change
  useEffect(() => {
    calculateLumpsum();
  }, [initialInvestment, timeYears, expectedRate]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4">
        Lumpsum Calculator
      </h2>

      {/* Input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label
            htmlFor="initialInvestment"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Initial Investment (Lumpsum)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              ₹
            </span>
            <input
              type="number"
              id="initialInvestment"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="e.g., 100,000"
              min="0"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="lumpsumTimeYears"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Time (years)
          </label>
          <input
            type="number"
            id="lumpsumTimeYears"
            value={timeYears}
            onChange={(e) => setTimeYears(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="e.g., 10"
            min="0"
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="lumpsumExpectedRate"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Expected Rate of Return % (p.a.)
          </label>
          <div className="relative">
            <input
              type="number"
              id="lumpsumExpectedRate"
              value={expectedRate}
              onChange={(e) => setExpectedRate(e.target.value)}
              className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="e.g., 12"
              step="0.1"
              min="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              %
            </span>
          </div>
        </div>
      </div>

      {/* Results Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 shadow-inner text-center space-y-3 mt-6">
        <p className="text-gray-700 text-base sm:text-lg">
          Total Value:{" "}
          <span className="font-semibold text-blue-700">
            {formatCurrency(futureValue)}
          </span>
        </p>
        <p className="text-gray-700 text-base sm:text-lg">
          Profit:{" "}
          <span className="font-semibold text-blue-700">
            {formatCurrency(profit)}
          </span>
        </p>
      </div>
    </div>
  );
}

// MTF Calculator Component
function MtfCalculator() {
  // Removed default values, set to empty strings for placeholders
  const [buyPrice, setBuyPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [marginFactorX, setMarginFactorX] = useState(""); // Changed from marginRatio to marginFactorX
  const [targetGainPercentage, setTargetGainPercentage] = useState("");
  const [holdingPeriodDays, setHoldingPeriodDays] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const [totalInvestmentValue, setTotalInvestmentValue] = useState(0); // New state for total value
  const [yourCapital, setYourCapital] = useState(0);
  const [brokerFunding, setBrokerFunding] = useState(0);
  const [mtfInterest, setMtfInterest] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0); // New state for gross profit
  const [netProfit, setNetProfit] = useState(0);
  const [roi, setRoi] = useState(0);

  // Function to calculate MTF
  const calculateMtf = () => {
    const bPrice = parseFloat(buyPrice);
    const qty = parseFloat(quantity);
    const mFactorX = parseFloat(marginFactorX); // Parse as leverage factor
    const targetGainPct = parseFloat(targetGainPercentage);
    const holdingDays = parseFloat(holdingPeriodDays);
    const annualInterest = parseFloat(interestRate);

    // Basic validation for inputs
    if (
      isNaN(bPrice) ||
      isNaN(qty) ||
      isNaN(mFactorX) ||
      isNaN(targetGainPct) ||
      isNaN(holdingDays) ||
      isNaN(annualInterest) ||
      bPrice <= 0 ||
      qty <= 0 ||
      mFactorX <= 0 ||
      mFactorX > 100 ||
      targetGainPct < 0 || // Added mFactorX > 100 for sanity, though technically leverage can be higher
      holdingDays <= 0 ||
      annualInterest <= 0
    ) {
      setTotalInvestmentValue(0);
      setYourCapital(0);
      setBrokerFunding(0);
      setMtfInterest(0);
      setGrossProfit(0);
      setNetProfit(0);
      setRoi(0);
      return;
    }

    const calculatedTotalInvestment = bPrice * qty;
    setTotalInvestmentValue(calculatedTotalInvestment);

    // Calculate Your Capital based on Margin (X)
    // If broker gives 3x margin, your capital is Total Investment / 3
    const calculatedYourCapital = calculatedTotalInvestment / mFactorX;
    const calculatedBrokerFunding =
      calculatedTotalInvestment - calculatedYourCapital;

    // Calculate interest cost on a daily basis
    const calculatedMtfInterest =
      calculatedBrokerFunding * (annualInterest / 100) * (holdingDays / 365);

    // Calculate target profit (Gross Profit)
    const calculatedGrossProfit =
      calculatedTotalInvestment * (targetGainPct / 100);
    setGrossProfit(calculatedGrossProfit);

    // Calculate net profit (target profit minus interest cost)
    const calculatedNetProfit = calculatedGrossProfit - calculatedMtfInterest;

    // Calculate ROI
    const calculatedRoi =
      calculatedYourCapital > 0
        ? (calculatedNetProfit / calculatedYourCapital) * 100
        : 0;

    setYourCapital(calculatedYourCapital);
    setBrokerFunding(calculatedBrokerFunding);
    setMtfInterest(calculatedMtfInterest);
    setNetProfit(calculatedNetProfit);
    setRoi(calculatedRoi);
  };

  // Recalculate on input change
  useEffect(() => {
    calculateMtf();
  }, [
    buyPrice,
    quantity,
    marginFactorX,
    targetGainPercentage,
    holdingPeriodDays,
    interestRate,
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4">
        MTF Calculator
      </h2>

      {/* Input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label
            htmlFor="mtfBuyPrice"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Buy Price per Share (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              ₹
            </span>
            <input
              type="number"
              id="mtfBuyPrice"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="e.g., 1527.30"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="mtfQuantity"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Quantity
          </label>
          <input
            type="number"
            id="mtfQuantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="e.g., 100"
            min="1"
          />
        </div>
        <div>
          <label
            htmlFor="marginFactorX"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Margin (X) (e.g., 3 for 3x leverage)
          </label>
          <input
            type="number"
            id="marginFactorX"
            value={marginFactorX}
            onChange={(e) => setMarginFactorX(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="e.g., 3"
            min="1" // Minimum leverage is 1x (no leverage)
            step="0.1"
          />
        </div>
        <div>
          <label
            htmlFor="targetGainPercentage"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Target Gain (%)
          </label>
          <div className="relative">
            <input
              type="number"
              id="targetGainPercentage"
              value={targetGainPercentage}
              onChange={(e) => setTargetGainPercentage(e.target.value)}
              className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="e.g., 10"
              step="0.1"
              min="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              %
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="holdingPeriodDays"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Holding Period (Days)
          </label>
          <input
            type="number"
            id="holdingPeriodDays"
            value={holdingPeriodDays}
            onChange={(e) => setHoldingPeriodDays(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="e.g., 30"
            min="0"
          />
        </div>
        <div>
          <label
            htmlFor="mtfInterestRate"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Interest Rate (% per year)
          </label>
          <div className="relative">
            <input
              type="number"
              id="mtfInterestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="e.g., 10"
              step="0.1"
              min="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              %
            </span>
          </div>
        </div>
      </div>

      {/* Results Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 shadow-inner text-center space-y-3 mt-6">
        <p className="text-gray-700 text-base sm:text-lg">
          Total Investment Value:{" "}
          <span className="font-semibold text-blue-700">
            {formatCurrency(totalInvestmentValue)}
          </span>
        </p>
        <p className="text-gray-700 text-base sm:text-lg">
          Your Capital:{" "}
          <span className="font-semibold text-blue-700">
            {formatCurrency(yourCapital)}
          </span>
        </p>
        <p className="text-gray-700 text-base sm:text-lg">
          Broker Funding:{" "}
          <span className="font-semibold text-blue-700">
            {formatCurrency(brokerFunding)}
          </span>
        </p>
        <p className="text-gray-700 text-base sm:text-lg">
          MTF Interest:{" "}
          <span className="font-semibold text-blue-700">
            {formatCurrency(mtfInterest)}
          </span>
        </p>
        <p className="text-gray-700 text-base sm:text-lg">
          Gross Profit:{" "}
          <span className="font-semibold text-blue-700">
            {formatCurrency(grossProfit)}
          </span>
        </p>
        <p
          className={`text-gray-800 text-lg sm:text-xl font-bold ${
            netProfit >= 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          Net Profit:{" "}
          <span className="text-blue-800">{formatCurrency(netProfit)}</span>
        </p>
        <p
          className={`text-gray-800 text-lg sm:text-xl font-bold ${
            roi >= 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          ROI: <span className="text-blue-800">{roi.toFixed(2)}%</span>
        </p>
      </div>
    </div>
  );
}

// Brokerage Calculator Component
function BrokerageCalculator() {
  // Removed default values for buyPrice, sellPrice, numShares
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [numShares, setNumShares] = useState("");
  // Retained default values for other rates as per request
  const [brokerageRate, setBrokerageRate] = useState(0.03); // % of turnover
  const [flatFeePerTrade, setFlatFeePerTrade] = useState(20); // Max flat fee per trade
  const [sttRate, setSttRate] = useState(0.01); // STT on sell side for equity delivery
  const [transactionChargeRate, setTransactionChargeRate] = useState(0.00325); // % of turnover
  const [gstRate, setGstRate] = useState(18); // % of (brokerage + transaction charges)
  const [sebiFeeRate, setSebiFeeRate] = useState(0.000001); // % of turnover (0.0001% or 0.000001 as decimal)
  const [stampDutyRate, setStampDutyRate] = useState(0.003); // % of buy value (max 300 for equity delivery)

  const [buyValue, setBuyValue] = useState(0);
  const [sellValue, setSellValue] = useState(0);
  const [brokerageBuy, setBrokerageBuy] = useState(0);
  const [brokerageSell, setBrokerageSell] = useState(0);
  const [stt, setStt] = useState(0);
  const [transactionCharges, setTransactionCharges] = useState(0);
  const [gst, setGst] = useState(0);
  const [sebiFee, setSebiFee] = useState(0);
  const [stampDuty, setStampDuty] = useState(0);
  const [totalCharges, setTotalCharges] = useState(0);
  const [netProfitLoss, setNetProfitLoss] = useState(0);

  // Function to calculate brokerage and other charges
  const calculateBrokerage = () => {
    const bPrice = parseFloat(buyPrice);
    const sPrice = parseFloat(sellPrice);
    const shares = parseFloat(numShares);
    const bRate = parseFloat(brokerageRate);
    const flatFee = parseFloat(flatFeePerTrade);
    const stt_rate = parseFloat(sttRate);
    const trans_charge_rate = parseFloat(transactionChargeRate);
    const gst_rate = parseFloat(gstRate);
    const sebi_fee_rate = parseFloat(sebiFeeRate);
    const stamp_duty_rate = parseFloat(stampDutyRate);

    if (isNaN(bPrice) || isNaN(sPrice) || isNaN(shares) || shares <= 0) {
      resetBrokerageResults();
      return;
    }

    const calculatedBuyValue = bPrice * shares;
    const calculatedSellValue = sPrice * shares;

    // Brokerage
    const calculatedBrokerageBuy = Math.min(
      flatFee,
      (calculatedBuyValue * bRate) / 100
    );
    const calculatedBrokerageSell = Math.min(
      flatFee,
      (calculatedSellValue * bRate) / 100
    );
    setBrokerageBuy(calculatedBrokerageBuy);
    setBrokerageSell(calculatedBrokerageSell);

    // STT (Securities Transaction Tax) - only on sell side for delivery
    const calculatedStt = (calculatedSellValue * stt_rate) / 100;
    setStt(calculatedStt);

    // Transaction Charges (Exchange Turnover Charges)
    const totalTurnover = calculatedBuyValue + calculatedSellValue;
    const calculatedTransactionCharges =
      (totalTurnover * trans_charge_rate) / 100;
    setTransactionCharges(calculatedTransactionCharges);

    // GST (Goods and Services Tax)
    const taxableValueForGst =
      calculatedBrokerageBuy +
      calculatedBrokerageSell +
      calculatedTransactionCharges;
    const calculatedGst = (taxableValueForGst * gst_rate) / 100;
    setGst(calculatedGst);

    // SEBI Turnover Fees
    const calculatedSebiFee = totalTurnover * sebi_fee_rate;
    setSebiFee(calculatedSebiFee);

    // Stamp Duty - only on buy side (max 300 for equity delivery)
    const calculatedStampDuty = Math.min(
      300,
      (calculatedBuyValue * stamp_duty_rate) / 100
    );
    setStampDuty(calculatedStampDuty);

    // Total Charges
    const total =
      calculatedBrokerageBuy +
      calculatedBrokerageSell +
      calculatedStt +
      calculatedTransactionCharges +
      calculatedGst +
      calculatedSebiFee +
      calculatedStampDuty;
    setTotalCharges(total);

    // Net Profit/Loss
    const grossProfitLoss = calculatedSellValue - calculatedBuyValue;
    setNetProfitLoss(grossProfitLoss - total);

    setBuyValue(calculatedBuyValue);
    setSellValue(calculatedSellValue);
  };

  const resetBrokerageResults = () => {
    setBuyValue(0);
    setSellValue(0);
    setBrokerageBuy(0);
    setBrokerageSell(0);
    setStt(0);
    setTransactionCharges(0);
    setGst(0);
    setSebiFee(0);
    setStampDuty(0);
    setTotalCharges(0);
    setNetProfitLoss(0);
  };

  // Recalculate on input change
  useEffect(() => {
    calculateBrokerage();
  }, [
    buyPrice,
    sellPrice,
    numShares,
    brokerageRate,
    flatFeePerTrade,
    sttRate,
    transactionChargeRate,
    gstRate,
    sebiFeeRate,
    stampDutyRate,
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4">
        Brokerage Calculator (Equity Delivery)
      </h2>

      {/* Input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label
            htmlFor="buyPrice"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Buy Price per Share (₹)
          </label>
          <input
            type="number"
            id="buyPrice"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="e.g., 100"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label
            htmlFor="sellPrice"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Sell Price per Share (₹)
          </label>
          <input
            type="number"
            id="sellPrice"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="e.g., 105"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label
            htmlFor="numShares"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Number of Shares
          </label>
          <input
            type="number"
            id="numShares"
            value={numShares}
            onChange={(e) => setNumShares(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="e.g., 100"
            min="1"
          />
        </div>
        <div>
          <label
            htmlFor="brokerageRate"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Brokerage Rate (% of Turnover, e.g., 0.03 for 0.03%)
          </label>
          <div className="relative">
            <input
              type="number"
              id="brokerageRate"
              value={brokerageRate}
              onChange={(e) => setBrokerageRate(e.target.value)}
              className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="0.03"
              step="0.001"
              min="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              %
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="flatFeePerTrade"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Max Flat Fee per Trade (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              ₹
            </span>
            <input
              type="number"
              id="flatFeePerTrade"
              value={flatFeePerTrade}
              onChange={(e) => setFlatFeePerTrade(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="20"
              min="0"
            />
          </div>
        </div>
        {/* Advanced charges - can be hidden or made optional */}
        <div className="md:col-span-2 text-gray-600 text-sm">
          <p className="font-semibold mb-2">
            Other Charges (Approximate for Equity Delivery):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="sttRate"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                STT (% of Sell Value)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="sttRate"
                  value={sttRate}
                  onChange={(e) => setSttRate(e.target.value)}
                  className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="0.01"
                  step="0.001"
                  min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="transactionChargeRate"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Transaction Charges (% of Turnover)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="transactionChargeRate"
                  value={transactionChargeRate}
                  onChange={(e) => setTransactionChargeRate(e.target.value)}
                  className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="0.00325"
                  step="0.00001"
                  min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="gstRate"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                GST (% of Brokerage + Transaction Charges)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="gstRate"
                  value={gstRate}
                  onChange={(e) => setGstRate(e.target.value)}
                  className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="18"
                  step="0.1"
                  min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="sebiFeeRate"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                SEBI Turnover Fee (% of Turnover)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="sebiFeeRate"
                  value={sebiFeeRate}
                  onChange={(e) => setSebiFeeRate(e.target.value)}
                  className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="0.000001"
                  step="0.0000001"
                  min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2">
              {" "}
              {/* Adjusted for better mobile layout */}
              <label
                htmlFor="stampDutyRate"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Stamp Duty (% of Buy Value, Max ₹300)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="stampDutyRate"
                  value={stampDutyRate}
                  onChange={(e) => setStampDutyRate(e.target.value)}
                  className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="0.003"
                  step="0.0001"
                  min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 shadow-inner space-y-2 mt-6">
        <h3 className="text-lg font-semibold text-purple-700 mb-3">
          Summary of Charges:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
          <p>
            Buy Value:{" "}
            <span className="font-semibold">{formatCurrency(buyValue)}</span>
          </p>
          <p>
            Sell Value:{" "}
            <span className="font-semibold">{formatCurrency(sellValue)}</span>
          </p>
          <p>
            Brokerage (Buy):{" "}
            <span className="font-semibold">
              {formatCurrency(brokerageBuy)}
            </span>
          </p>
          <p>
            Brokerage (Sell):{" "}
            <span className="font-semibold">
              {formatCurrency(brokerageSell)}
            </span>
          </p>
          <p>
            STT: <span className="font-semibold">{formatCurrency(stt)}</span>
          </p>
          <p>
            Transaction Charges:{" "}
            <span className="font-semibold">
              {formatCurrency(transactionCharges)}
            </span>
          </p>
          <p>
            GST: <span className="font-semibold">{formatCurrency(gst)}</span>
          </p>
          <p>
            SEBI Turnover Fee:{" "}
            <span className="font-semibold">{formatCurrency(sebiFee)}</span>
          </p>
          <p>
            Stamp Duty:{" "}
            <span className="font-semibold">{formatCurrency(stampDuty)}</span>
          </p>
        </div>
        <div className="border-t border-blue-300 pt-3 mt-3">
          <p className="text-gray-800 text-lg sm:text-xl font-bold">
            Total Charges:{" "}
            <span className="text-blue-800">
              {formatCurrency(totalCharges)}
            </span>
          </p>
          <p
            className={`text-lg sm:text-xl font-bold mt-2 ${
              netProfitLoss >= 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            Net Profit/Loss:{" "}
            <span className="text-blue-800">
              {formatCurrency(netProfitLoss)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
