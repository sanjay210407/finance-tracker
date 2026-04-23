const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config({ quiet: true });

const app = express();

const parseOrigins = (value = "") =>
	value
		.split(",")
		.map((origin) => origin.trim())
		.filter(Boolean);

const allowedOrigins = [
	"https://finance-tracker-git-main-sanjay210407s-projects.vercel.app",
	"https://finance-tracker-pe9x.vercel.app",
	"https://finance-tracker-2d6w.vercel.app",
	"http://localhost:3000",
	...parseOrigins(process.env.FRONTEND_URL),
	...parseOrigins(process.env.CORS_ORIGIN),
];

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				return callback(null, true);
			}

			return callback(new Error("Not allowed by CORS"));
		},
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	})
);
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "Finance Tracker API is running" });
});

app.get("/api/health", (req, res) => {
	res.json({ status: "ok" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
	await connectDB();
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
