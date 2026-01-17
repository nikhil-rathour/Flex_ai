import CodeStorage from './codeStorageModel.js';

export const saveGeneratedCode = async (req, res) => {
  try {
    const { username, code } = req.body;
    const userId = req.user.uid;

    const savedCode = await CodeStorage.create({
      userId,
      username,
      code
    });

    res.status(201).json(savedCode);
  } catch (error) {
    console.error('Save code error:', error);
    res.status(500).json({ error: 'Failed to save code' });
  }
};

export const getUserCodes = async (req, res) => {
  try {
    const userId = req.user.uid;
    const codes = await CodeStorage.find({ userId }).sort({ createdAt: -1 });
    res.json(codes);
  } catch (error) {
    console.error('Fetch codes error:', error);
    res.status(500).json({ error: 'Failed to fetch codes' });
  }
};

export const getCodeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    const code = await CodeStorage.findOne({ _id: id, userId });
    if (!code) {
      return res.status(404).json({ error: 'Code not found' });
    }

    res.json(code);
  } catch (error) {
    console.error('Fetch code error:', error);
    res.status(500).json({ error: 'Failed to fetch code' });
  }
};

export const deleteCode = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    const code = await CodeStorage.findOne({ _id: id, userId });
    if (!code) {
      return res.status(404).json({ error: 'Code not found' });
    }

    await code.deleteOne();
    res.json({ message: 'Code deleted successfully' });
  } catch (error) {
    console.error('Delete code error:', error);
    res.status(500).json({ error: 'Failed to delete code' });
  }
};

export const updateCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, code } = req.body;
    const userId = req.user.uid;

    const existingCode = await CodeStorage.findOne({ _id: id, userId });
    if (!existingCode) {
      return res.status(404).json({ error: 'Code not found' });
    }

    if (username) existingCode.username = username;
    if (code) existingCode.code = code;

    await existingCode.save();
    res.json(existingCode);
  } catch (error) {
    console.error('Update code error:', error);
    res.status(500).json({ error: 'Failed to update code' });
  }
};

export const getCodeForEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    const code = await CodeStorage.findOne({ _id: id, userId });
    if (!code) {
      return res.status(404).json({ error: 'Code not found' });
    }

    res.json(code);
  } catch (error) {
    console.error('Fetch code for edit error:', error);
    res.status(500).json({ error: 'Failed to fetch code' });
  }
};

export const checkUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const exists = await CodeStorage.findOne({ username });
    res.json({ exists: !!exists });
  } catch (error) {
    console.error('Check username error:', error);
    res.status(500).json({ error: 'Failed to check username' });
  }
};

export const getCodeByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const code = await CodeStorage.findOne({ username });
    if (!code) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(code);
  } catch (error) {
    console.error('Fetch code by username error:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};
