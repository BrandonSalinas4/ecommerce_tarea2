import User from "../models/user";
import jwt from "jsonwebtoken";

// Controlador para obtener los usuarios por ID
export const GetOneUserById = async (req, res) => {
    const user = await User.findOne({
        where:{ id: +req.params.id },    
    });

    res.json(user);
};

// Controlador para crear un usuario
export const CreateUser = async (req, res) => {
    const userToCreate = req.body;

    await User.create(userToCreate);

    res.status(201).json(userToCreate);
};

// Controlador para actualizar un usuario
export const UpdateUserById = async (req, res) => {
    await User.update(req.body, {
        where: {
            id: req.params.id,
        },
    });

    const userUpdated = await User.findOne({
        where: {
            id: +req.params.id,
        },
    });

    res.json(userUpdated);
};

// Controlador para eliminar un usuario por ID
export const DeleteUserById = async (req, res) => {
    const userToDelete = await User.findOne({
        where: {
            id: +req.params.id,
        },
    });

    await User.destroy({
        where: {
            id: +req.params.id,
        },
    });

    res.json(userToDelete);
};

// Controlador para autorización
export const Login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        where: {
            username: username,
            password: password,
        },
    });

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, "Ecommerce-2024", {
        expiresIn: 60 * 60,
    });

    res.json({ token: token });
};
