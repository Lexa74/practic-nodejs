import { Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

type userType = {
  id: string;
  name: string;
  age: number;
  isAdmin: boolean;
  experience: number;
};

type paramsType = {
  id: string;
};

const getUsers = (_: Request, res: Response) => {
  User.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getUserById = (req: Request<paramsType, {}, userType>, res: Response) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const addUser = (req: Request<paramsType>, res: Response) => {
  User.create(req.body)
    .then(() => {
      res.status(200).json({ message: "Created user" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const registerUser = (req: Request<paramsType>, res: Response) => {
  User.findOne({ email: req.body.email })
    .then((userOne) => {
      if (userOne) {
        throw new Error("Такой пользователь существует");
      }
      return User.create(req.body);
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const loginUser = (req: Request<paramsType>, res: Response) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((userOne) => {
      if (!userOne) {
        return res
          .status(402)
          .json({ message: "Такого пользователя не существует" });
      }
      if (userOne.password !== password) {
        return res.status(402).json({ message: "Пароль не совпадает" });
      }
      const accessToken = jwt.sign({ email }, "jwt-access-token", {
        expiresIn: "1m",
      });

      const refreshToken = jwt.sign({ email }, "jwt-refresh-token", {
        expiresIn: "5m",
      });

      res.cookie("accessToken", accessToken, { maxAge: 60 * 1000 });
      res.cookie("refreshToken", refreshToken, { maxAge: 5 * 60 * 1000 });

      res.status(200).json({ accessToken, refreshToken });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const refreshToken = (req: Request, res: Response) => {
  const { refresh } = req.body;

  if (!refresh) {
    res.status(404).json({ message: "В теле не указан токен" });
  }

  jwt.verify(refresh, "jwt-refresh-token", (error: any, user: any) => {
    if (error) {
      return res.status(403).json({ message: "Некоректный токен" });
    }
    const accessToken = jwt.sign({ email: user.email }, "jwt-refresh-token", {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign({ email: user.email }, "jwt-refresh-token", {
      expiresIn: "5m",
    });
    res.cookie("accessToken", accessToken, { maxAge: 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { maxAge: 5 * 60 * 1000 });

    res.status(200).json({ accessToken });
  });
};

const updateUser = (req: Request<paramsType, {}, userType>, res: Response) => {
  const idParam = req.params.id;
  User.findByIdAndUpdate(idParam, req.body)
    .then(() => User.findById(idParam))
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const delUser = (req: Request<paramsType, {}, userType>, res: Response) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "ID не существует" });
      }
      res.status(200).json({ message: "Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

export {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  delUser,
  registerUser,
  loginUser,
  refreshToken,
};
