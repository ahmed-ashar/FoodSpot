import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;
//   console.log(req.headers);
  

  if (!token) {
    return res.json({ success: false, message: "Login to add item to cart" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token_decode);
    req.body.userId = token_decode.id;
    
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: {err:error.message,here:"here"} });
  }
};

export default authUser;
