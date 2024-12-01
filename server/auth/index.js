// TODO: add auth here
const express = require('express');
const authRouter = express.Router();

const { requireAdmin, requireUser } = require("./utils")

const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

//<--------------------------------GET ALL USERS-------------------------------->
//NOTE: ONLY FOR ADMIN
//GET /auth/users
authRouter.get("/users",[requireUser, requireAdmin], async (req, res, next) => {
    try {
        const user = prisma.user
        const users = await user.findMany();

        delete user.password
        res.send(users);
    } catch (error) {
        next(error);
    }
});

//<--------------------------------GET ALL USERS FOR VALIDATING-------------------------------->
//GET /auth/users/validate
authRouter.get("/users/validate", async (req, res, next) => {
    try {
        const user = prisma.user
        const users = await user.findMany({
            select: {id: true, username: true}
        });
        res.send(users);
    } catch (error) {
        next(error);
    }
});

//<--------------------------------REGISTER USER-------------------------------->
// POST /auth/register
authRouter.post("/register", async (req, res, next) => {
    try {
        const { username, email, password, } = req.body
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        });
        delete user.password
        const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET);
        res.send({ token });
        console.log("Registration successful!");
    } catch (error) {
        next(error)
    }
})

//<--------------------------------LOGIN USERS-------------------------------->
//POST /auth/login
authRouter.post("/login", async (req, res, next) => {

    try {
        const { username, password } = req.body
        const user = await prisma.user.findUnique({
            where: {
                username: username
            },
        });

        const validPassword = await bcrypt.compare(
            password,
            user?.password ?? ""
        );

        //Check user and password
        if (!user) {
            return res.status(401).send("There is no user with that username.");
        } else if ( !validPassword) {
            return res.status(401).send("Incorrect password.");
        }

        //Create token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.send({ token });
        console.log("Login successful!");
    } catch (error) {
        next(error);
    }
})

//<--------------------------------GET USER PROFILE-------------------------------->
//GET /auth/account
authRouter.get("/account", requireUser, async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        });
        delete user.password
        res.send(user);
    } catch (error) {
        next(error)
    }
});

//<--------------------------------DELETE USER-------------------------------->
//NOTE: ONLY FOR ADMIN
//DELETE /auth/user/:id
authRouter.delete("/user/:id", requireAdmin, async (req, res, next) => {
    try {
        const deletedUser = await prisma.user.delete({
            where: {id: +req.params.id},
        });
        if (!deletedUser) {
            return res.status(404).send("User not found");
        }
        res.send("User successfully deleted");
    } catch (error) {
        next(error)
    }
})

//<--------------------------------PATCH USER-------------------------------->
//PATCH /auth/account/edit
authRouter.patch("/account/:id/edit", requireUser, async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        let hashedPassword = "";
        if (password !== null) {
            hashedPassword = await bcrypt.hash(password, SALT_COUNT);
            return hashedPassword;
        }
        
        const updatedUser = await prisma.user.update({
            where: {id: req.user.id},
            data: {
                username: username || undefined,
                email: email || undefined,
                password: hashedPassword || undefined
            }
        }) 
        delete updatedUser.password;
        res.send("User successfully updated")
    } catch (error) {
        next(error)
    }
})

//<--------------------------------PATCH ADMIN-------------------------------->
//NOTE: ONLY FOR ADMIN
//PATCH /auth/admin/:id
authRouter.patch("/admin/:id", [requireUser, requireAdmin], async (req, res, next) => {
    try {
        const {isAdmin} = req.body;
        const adminToggle = await prisma.user.update({
            where: {id: Number(req.params.id)},
            data: {isAdmin: isAdmin}
        })
        res.send(adminToggle)
    } catch (error) {
        next(error)
    }
})

module.exports = authRouter;