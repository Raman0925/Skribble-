const { ApiError } = require('../utils/apiError');
const { asyncHandler } = require('../utils/asyncHandler');
const { validateSignUpData } = require('../utils/validation');
const User  = require('../models/User.models');
const {ApiResponse} = require('../utils/apiResponse')


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}
const loginUser = asyncHandler(async (req, res) =>{
    const {emailID, userName, Password} = req.body
   
    if (!userName && !emailID) {
        throw new ApiError(400, "username or email is required")
    }
    const user = await User.findOne({
        $or: [{userName}, {emailID}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
     throw new ApiError(401, "Invalid user credentials")
     }
 
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)
 
     const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
 
     const options = {
         httpOnly: true,
         secure: true
     }
 
     return res
     .status(200)
     .cookie("accessToken", accessToken, options)
     .cookie("refreshToken", refreshToken, options)
     .json(
         new ApiResponse(
             200, 
             {
                 user: loggedInUser, accessToken, refreshToken
             },
             "User logged In Successfully"
         )
     )
 
 })




const registerUser = asyncHandler(async (req, res) => {
  try {
    validateSignUpData(req);
  } catch (error) {
    throw new ApiError(400, 'All fields are Required');
  }
  const { firstName, lastName, userName, emailID, Password } = req.body;
  const existedUser = await User.findOne({
    $or: [{ userName }, { emailId }],
  });
  if (existedUser) {
    throw new ApiError(409, 'User with email or username already exists');
  }
  const savedUser = await User.create(
    firstName,
    lastName,
    userName,
    emailID,
    Password
  );
  const createdUser = await User.findById(savedUser._id).select('-Password');
  if (!createdUser){
    throw new ApiError(500,"Something went wrong while registering a user");
  }
  return res.status(201).json(new ApiResponse(200,createdUser,"User registered Successfully"));
});

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})
module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
