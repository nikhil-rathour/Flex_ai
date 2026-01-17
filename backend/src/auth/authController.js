import User from "./authUserModel.js";


export const userCreation = async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user;
    console.log('User data from Firebase:', { uid, email, name, picture });

    let existingUser = await User.findOne({ uid });
    if (!existingUser) {
      existingUser = await User.create({ uid, email, name, picture });
      console.log('New user created:', existingUser);
    } else {
      console.log('Existing user found:', existingUser);
    }

    res.json(existingUser);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}


