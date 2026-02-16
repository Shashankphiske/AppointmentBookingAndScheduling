import helmet from "helmet"
import express from "express"
import dotenv from "dotenv"

const app = express();
app.use(express.json());
app.use(helmet());
dotenv.config();

app.get("/", (req, res) => {
    console.log("Hello, World!");
    res.send("Hello");
} )

app.listen(process.env.PORT, () => {
    console.log(`App is running in port ${process.env.PORT}`);
});