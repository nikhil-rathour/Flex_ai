import { palettes as seedPalettes } from '../data/palettes.js';
import Palette from './paletteModel.js';

const normalizeId = (value) =>
  String(value || '')
    .trim()
    .toLowerCase();

const dedupePalettesById = (palettes) => {
  const unique = new Map();

  for (const palette of palettes) {
    const id = normalizeId(palette?.id);
    if (!id || unique.has(id)) {
      continue;
    }

    unique.set(id, {
      id,
      name: String(palette.name || '').trim(),
      colors: palette.colors
    });
  }

  return Array.from(unique.values());
};

export const syncPalettesFromSeed = async () => {
  const dedupedPalettes = dedupePalettesById(seedPalettes);

  if (dedupedPalettes.length === 0) {
    return;
  }

  const operations = dedupedPalettes.map((palette) => ({
    updateOne: {
      filter: { id: palette.id },
      update: {
        $set: {
          name: palette.name,
          colors: palette.colors,
          isActive: true
        }
      },
      upsert: true
    }
  }));

  const result = await Palette.bulkWrite(operations, { ordered: false });
  const upserted = result.upsertedCount || 0;
  const modified = result.modifiedCount || 0;
  console.log(`Palettes synced: ${dedupedPalettes.length} (upserted: ${upserted}, updated: ${modified})`);
};
