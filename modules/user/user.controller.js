const { successResponse, errorResponse } = require('../../utils/response.helper');
const registerUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return errorResponse(res, 400, "name and email are required");
    }
    return successResponse(res, 201, "User registered successfully", { user: { name, email } });
}

const loginUser = (req, res) => {
    const { email } = req.body;
    if (!email) {
        return errorResponse(res, 400, "email is required");
    }
    if (email !== "user@example.com") {
        return errorResponse(res, 400, "Invalid email or password");
    }
    return successResponse(res, 200, "User signed in successfully");

}

const getUserProfile = (req, res) => {
    const user = req.user;
    return successResponse(res, 200, "User profile", { user });
}

const getUserOrders = (req, res) => {
    return successResponse(res, 200, "User orders", {
        orders: [
            { id: 1, item: "Product 1", price: 100 },
            { id: 2, item: "Product 2", price: 200 }
        ]
    });
}

const getUserStats = (req, res) => {
    const user = req.user;
    return successResponse(res, 200, "User stats", {
        user, stats: {
            totalOrders: 10,
            totalSpent: 1000
        }
    });
}

const getSingleUser = (req, res) => {
    const userId = req.params.id;
    return successResponse(res, 200, "Single user", { userId });
}


module.exports = { registerUser, loginUser, getUserProfile, getUserOrders, getUserStats, getSingleUser };