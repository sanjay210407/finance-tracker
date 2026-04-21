import { useEffect, useState } from "react";
import API from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [editId, setEditId] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);

  const navigate = useNavigate();


  const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Finance Report", 20, 20);

  doc.setFontSize(12);
  doc.text(`Balance: ₹${balance}`, 20, 40);
  doc.text(`Income: ₹${totalIncome}`, 20, 50);
  doc.text(`Expense: ₹${totalExpense}`, 20, 60);

  let y = 80;

  doc.text("Transactions:", 20, y);
  y += 10;

  transactions.forEach((t, index) => {
    doc.text(
      `${index + 1}. ${t.type} - ${t.category} - ₹${t.amount}`,
      20,
      y
    );
    y += 10;
  });

  doc.save("finance-report.pdf");
};

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Fetch Transactions
  const fetchTransactions = async () => {
    const res = await API.get("/transactions");
    setTransactions(res.data);
  };

  // Fetch Monthly Data
  const fetchMonthly = async () => {
    const res = await API.get("/transactions/monthly");

    const formatted = res.data.map((item) => ({
      name: `${item._id.month}/${item._id.year}`,
      value: item.total
    }));

    setMonthlyData(formatted);
  };

  useEffect(() => {
    fetchTransactions();
    fetchMonthly();
  }, []);

  // Add / Update Transaction
  const addTransaction = async () => {
    if (!amount || !category) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      await API.put(`/transactions/${editId}`, {
        type,
        amount: Number(amount),
        category,
      });
      setEditId(null);
    } else {
      await API.post("/transactions", {
        type,
        amount: Number(amount),
        category,
      });
    }

    setAmount("");
    setCategory("");
    fetchTransactions();
    fetchMonthly();
  };

  // Delete Transaction
  const deleteTransaction = async (id) => {
    await API.delete(`/transactions/${id}`);
    fetchTransactions();
    fetchMonthly();
  };

  // Calculations
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);

  const chartData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  const COLORS = ["#0EA5A5", "#F97316"];

  return (
    <div className="dashboard-page">
      <div className="dashboard-glow dashboard-glow-one" />
      <div className="dashboard-glow dashboard-glow-two" />
      <div className="dashboard-layout">

      <Navbar
        title="Finance Dashboard"
        subtitle="Track spending, monitor trends, and export reports instantly."
        onDownload={downloadPDF}
        onLogout={logout}
      />

      {/* Balance Cards */}
      <div className="dashboard-summary-grid">
        <div className="dashboard-card dashboard-card-balance">
          <h2 className="dashboard-card-label">Balance</h2>
          <p className="dashboard-card-value">{formatCurrency(balance)}</p>
        </div>

        <div className="dashboard-card dashboard-card-income">
          <h2 className="dashboard-card-label">Income</h2>
          <p className="dashboard-card-value">{formatCurrency(totalIncome)}</p>
        </div>

        <div className="dashboard-card dashboard-card-expense">
          <h2 className="dashboard-card-label">Expense</h2>
          <p className="dashboard-card-value">{formatCurrency(totalExpense)}</p>
        </div>
      </div>

      {/* Alert */}
      {totalExpense > totalIncome && (
        <div className="dashboard-alert">
          ⚠️ You are spending more than you earn!
        </div>
      )}

      {/* Add Transaction */}
      <div className="dashboard-panel">
        <h3 className="dashboard-panel-title">Add Transaction</h3>

        <div className="dashboard-form-row">
          <select
            className="dashboard-input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input
            className="dashboard-input"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            className="dashboard-input"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button
            onClick={addTransaction}
            className="dashboard-submit-btn"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div className="dashboard-panel">
        <h3 className="dashboard-panel-title">Transactions</h3>

        {!transactions.length && (
          <p className="dashboard-empty">No transactions yet. Add your first entry above.</p>
        )}

        {transactions.map((t) => (
          <div
            key={t._id}
            className="dashboard-transaction-row"
          >
            <div>
              <p className="dashboard-tx-category">{t.category}</p>
              <p className="dashboard-tx-type">{t.type}</p>
            </div>

            <div className="dashboard-row-actions">
              <span className="dashboard-tx-amount">{formatCurrency(t.amount)}</span>

              <button
                onClick={() => {
                  setEditId(t._id);
                  setAmount(t.amount);
                  setCategory(t.category);
                  setType(t.type);
                }}
                className="dashboard-action-btn dashboard-action-btn-edit"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTransaction(t._id)}
                className="dashboard-action-btn dashboard-action-btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="dashboard-chart-grid">
        <div className="dashboard-panel">
          <h3 className="dashboard-panel-title">Overview</h3>
          <div className="dashboard-chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
            <Pie data={chartData} dataKey="value" outerRadius={84} innerRadius={42} paddingAngle={4}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
          </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-panel">
          <h3 className="dashboard-panel-title">Monthly Trend</h3>
          <div className="dashboard-chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 12, right: 14, left: 8, bottom: 6 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#cbd5e1" />
            <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 12 }} />
            <YAxis tick={{ fill: "#475569", fontSize: 12 }} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Line type="monotone" dataKey="value" stroke="#0ea5a5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      </div>
      <Footer />    </div>
  );
}

export default Dashboard;