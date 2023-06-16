const router = require("express").Router();
const { UserPublic, validate } = require("../Models/UserPublic");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const user = await UserPublic.findOne({ email: req.body.email });
        if (user) return res.status(409).send({ message: "User Already Exists" });

        const salt = await bcrypt.genSalt(Number(10));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new UserPublic({ ...req.body, password: hashedPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});


module.exports = router;