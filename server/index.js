import express from "express"
import { config } from "dotenv"
import cors from "cors"
import userRoutes from "./routes/user.routes.js"
import { connectDB } from "./controllers/seed.controller.js"

const app = express()
app.use(express.json())
app.use(cors())

config()

const PORT = process.env.PORT;

(async () => {
    await connectDB()
})()

app.use("/api", userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on <http://localhost>:${PORT}`)
})
