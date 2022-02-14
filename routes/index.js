const router = require("express").Router()

router.get("/", (req, res, next) => {
    res.json("All good in here")
})

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
// Auth
const auth = require("./auth")
router.use("/auth", auth)

// Users
const users = require("./users")
router.use("/users", users)

module.exports = router
