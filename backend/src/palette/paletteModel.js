import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema(
  {
    background: { type: String, required: true, trim: true },
    card: { type: String, required: true, trim: true },
    primary: { type: String, required: true, trim: true },
    secondary: { type: String, required: true, trim: true },
    textPrimary: { type: String, required: true, trim: true },
    textSecondary: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const paletteSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    colors: {
      type: colorSchema,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Palette = mongoose.model('Palette', paletteSchema);

export default Palette;
