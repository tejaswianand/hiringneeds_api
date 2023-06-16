const router = require("express").Router();
const { User, validate } = require("../Models/User");
const bcrypt = require("bcrypt");


// Get user

router.get("/:id", async (req, res) => {
    try {
        const post = await User.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all user

router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await User.find({ username });
        } else if (catName) {
            posts = await User.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await User.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update Post - Start
router.put("/:id", async (req, res) => {
    try {
        const post = await User.findById(req.params.id);
        try {
            const updatedPost = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            );
            res.status(200).json(updatedPost);
            console.log(updatedPost);
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;