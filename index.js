const express = require("express")
const { connection } = require("./db")
require("dotenv").config()
const port = process.env.PORT
const app = express()
 const cors = require("cors")
 app.use(cors({ origin: '*' }));
const { userRouter } = require("./routes/user.routes")
const { noteRouter } = require("./routes/note.routes")
app.use(express.json())
app.use("/user", userRouter)
app.use("/note", noteRouter)
app.get("/", (req, res) => {
    res.send({
        message: "working now"
    })
})
app.listen(port, async () => {
    try {
        await connection
        console.log("data is connected")
    }
    catch (error) {
        console.log("there is an error conn")
    }
    console.log("server is running on port ", port)
})