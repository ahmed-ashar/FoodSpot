const loginUser = async (req, res) => {
  try {
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    res.status(200).json({ message: "Admin logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
