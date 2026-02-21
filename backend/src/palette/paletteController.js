import Palette from './paletteModel.js';

const REQUIRED_COLOR_KEYS = [
  'background',
  'card',
  'primary',
  'secondary',
  'textPrimary',
  'textSecondary'
];

const isHexColor = (value) => /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(String(value || '').trim());

const normalizeId = (value) =>
  String(value || '')
    .trim()
    .toLowerCase();

const validateColors = (colors) => {
  if (!colors || typeof colors !== 'object') {
    return 'Colors object is required';
  }

  for (const key of REQUIRED_COLOR_KEYS) {
    if (!colors[key]) {
      return `Missing color value for "${key}"`;
    }
    if (!isHexColor(colors[key])) {
      return `Invalid hex color for "${key}"`;
    }
  }

  return null;
};

const buildPaletteResponse = (doc) => {
  const palette = doc.toObject ? doc.toObject() : doc;
  const { _id, ...rest } = palette;
  return rest;
};

export const getPalettes = async (req, res) => {
  try {
    const palettes = await Palette.find({ isActive: true }).sort({ createdAt: 1 });
    res.json(palettes.map(buildPaletteResponse));
  } catch (error) {
    console.error('Fetch palettes error:', error);
    res.status(500).json({ message: 'Failed to fetch palettes' });
  }
};

export const getPaletteById = async (req, res) => {
  try {
    const id = normalizeId(req.params.id);
    const palette = await Palette.findOne({ id, isActive: true });

    if (!palette) {
      return res.status(404).json({ message: 'Palette not found' });
    }

    res.json(buildPaletteResponse(palette));
  } catch (error) {
    console.error('Fetch palette error:', error);
    res.status(500).json({ message: 'Failed to fetch palette' });
  }
};

export const createPalette = async (req, res) => {
  try {
    const id = normalizeId(req.body.id);
    const name = String(req.body.name || '').trim();
    const colors = req.body.colors;

    if (!id || !name) {
      return res.status(400).json({ message: 'id and name are required' });
    }

    const colorValidationError = validateColors(colors);
    if (colorValidationError) {
      return res.status(400).json({ message: colorValidationError });
    }

    const existingPalette = await Palette.findOne({ id });
    if (existingPalette) {
      return res.status(409).json({ message: 'Palette id already exists' });
    }

    const created = await Palette.create({ id, name, colors });
    res.status(201).json(buildPaletteResponse(created));
  } catch (error) {
    console.error('Create palette error:', error);
    res.status(500).json({ message: 'Failed to create palette' });
  }
};

export const updatePalette = async (req, res) => {
  try {
    const id = normalizeId(req.params.id);
    const updates = {};

    if (req.body.name !== undefined) {
      const name = String(req.body.name || '').trim();
      if (!name) {
        return res.status(400).json({ message: 'name cannot be empty' });
      }
      updates.name = name;
    }

    if (req.body.colors !== undefined) {
      const colorValidationError = validateColors(req.body.colors);
      if (colorValidationError) {
        return res.status(400).json({ message: colorValidationError });
      }
      updates.colors = req.body.colors;
    }

    if (req.body.isActive !== undefined) {
      updates.isActive = Boolean(req.body.isActive);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    const updated = await Palette.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Palette not found' });
    }

    res.json(buildPaletteResponse(updated));
  } catch (error) {
    console.error('Update palette error:', error);
    res.status(500).json({ message: 'Failed to update palette' });
  }
};

export const deletePalette = async (req, res) => {
  try {
    const id = normalizeId(req.params.id);
    const deleted = await Palette.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({ message: 'Palette not found' });
    }

    res.json({ message: 'Palette deleted successfully' });
  } catch (error) {
    console.error('Delete palette error:', error);
    res.status(500).json({ message: 'Failed to delete palette' });
  }
};
