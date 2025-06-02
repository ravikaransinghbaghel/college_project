import user from '../models/users.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const register = async (req, resp) => {
    const { fullname, username, gender, password, email } = req.body;
    if (!fullname || !username || !gender || !password || !email) {
        return resp.status(400).json({ message: 'All fields are required' });
    }

    const userExist = await user.findOne({ email });
    if (userExist) {
        return resp.status(400).json({ message: 'email already exists' });
    }

    const avatarType = gender === 'male' ? 'boy' : 'girl';
    const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;

    let emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.AuthorEmail, pass: process.env.EmailPass },
        });

        await transporter.sendMail({
            from: process.env.AuthorEmail,
            to: email,
            subject: `Email Verification - mmit aligarh`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #333;">Hello ${fullname},</h2>
                    <p>Thank you for registering with <strong>Your App Name</strong>!</p>
                    <p>Please use the OTP below to verify your email address:</p>
                    <div style="font-size: 24px; font-weight: bold; color: #4CAF50; margin: 20px 0;">
                        ${emailOtp}
                    </div>
                    <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
                    <p>If you did not request this, please ignore this email.</p>
                    <br/>
                    <p>Best regards,<br/><strong>mmit Aligarh</strong></p>
                </div>
            `,
        });

        const newUser = new user({ fullname, username, gender, password, avatar, email, emailOtp });
        await newUser.save();
        setTimeout(() => {
            newUser.emailOtp = null;
            newUser.save();
        }, 1000 * 60 * 5);

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        return resp.status(200)
            .cookie("userToken", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            })
            .json({
                success: true,
                user: newUser,
                auth_token: token,
            });

    } catch (error) {
        console.log('register error: ', error);
        return resp.status(500).json({ message: 'server down \n User could not be created' });
    }
};

export const login = async (req, resp) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return resp.status(400).json({ message: 'All fields are required' });
    }

    try {

        const loginUser = await user.findOne({ email, password });
        if (!loginUser) {
            return resp.status(400).json({ message: 'username and password is wrong !' });
        }

        if (loginUser?.isEmailVerified === false) {
            return resp.status(400).json({ message: 'email is not verify !' });
        }

        const token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        return resp.status(200)
            .cookie("userToken", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            })
            .json({
                success: true,
                loginUser,
                auth_token: token,
            });

    } catch (error) {
        console.log('register error: ', error);
        return resp.status(500).json({ message: 'User could not be login' });
    }
};

export const forgatPass = async (req, resp) => {
    const { email } = req.body;
    const randomPass = "1234567890asdfghjklpoiuytrewqzxcvbnm>!@#$%^&*";
    const len = randomPass.length;
    let pass = "";
    for (let index = 0; index < 6; index++) {
        pass += randomPass[Math.floor(Math.random() * len)]

    }

    try {
        const updatedUser = await user.findOneAndUpdate(
            { email },
            { $set: { password: pass } },
            { new: true }
        );

        if (!updatedUser) {
            return resp.status(404).json({ message: 'User not found' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.AuthorEmail, pass: process.env.EmailPass },
        });

        await transporter.sendMail({
            from: process.env.AuthorEmail,
            to: updatedUser.email,
            subject: 'Your New Password',
            html: `
                <p>Hello ${updatedUser.fullname || ''},</p>
                <p>Your password has been reset successfully. Here is your new password:</p>
                <h2>${pass}</h2>
                <p>Please log in and change it immediately to keep your account secure.</p>
                <br/>
                <p>Thank you,<br/>mmit Aligarh</p>
            `
        });

        return resp.status(200)
            .json({
                success: true,
                message: 'New password has been sent to your email'
            });

    } catch (error) {
        console.log('Forgot password error: ', error);
        return resp.status(500).json({ message: 'Could not reset password' });
    }
};

export const logout = async (req, resp) => {
    try {

        resp.status(200)
            .clearCookie("userToken", {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            })
            .json({ message: "Logged out successfully." });

    } catch (error) {
        console.log('register error: ', error);
        return resp.status(500).json({ message: 'User could not be login' });
    }
};

export const isEmailVerification = async (req, resp) => {
    const { emailOtp } = req.body;
    // console.log(req.user)
    try {
        const foundUser = await user.findById(req.user.id);
        if (!foundUser) return resp.status(400).json({ message: 'User not found' });

        if (foundUser.emailOtp !== emailOtp) return resp.status(400).json({ message: 'Invalid email OTP' });

        foundUser.isEmailVerified = true;
        foundUser.emailOtp = null;

        await foundUser.save();

        resp.json({ message: 'Email verified successfully' });
    } catch (err) {
        console.error(err);
        resp.status(500).json({ message: 'Server error' });
    }
}

export const getProfile = async (req, resp) => {
    try {
        const User = await user.findById(req.user.id);

        if (!User) {
            return resp.status(500).json({ message: 'User not found' });
        }
        return resp.status(200).json({
            success: true,
            User
        });
    } catch (error) {
        console.log(error)
        return resp.status(200).json({
            success: false,
            message: 'Server error'
        });
    }
}

export const getusers = async (req, resp) => {
    try {
        const userExist = await user.aggregate([
            {
                $match: {
                    _id: { $ne: new mongoose.Types.ObjectId(req.user.id) }
                }
            },
            {
                $lookup: {
                    from: "massages", 
                    let: { userId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        { $eq: ["$senderId", "$$userId"] },
                                        { $eq: ["$receiverId", "$$userId"] }
                                    ]
                                }
                            }
                        },
                        {
                            $sort: { updatedAt: -1 }
                        }
                    ],
                    as: "massages"
                }
            },
            {
                $addFields: {
                    latestMassageUpdate: { $max: "$massages.updatedAt" }
                }
            },
            {
                $sort: {
                    latestMassageUpdate: -1
                }
            },
        ]);

        if (!userExist)
            return resp.status(500).json({ message: 'User not found' });


        resp.status(200)
            .json({
                success: true,
                users: userExist,
            });
    }
    catch (err) {
        console.error(err);
        resp.status(500).json({ message: 'Server error' });
    }
}

export const searchuser = async (req, res) => {
    const q = req.query.q;

    try {
        if (!q || q.trim() === '') {
            return res.json({ users: [] });
        }

        const results = await user.find({
            fullname: { $regex: q, $options: 'i' },
        });

        res.json({ users: results });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
