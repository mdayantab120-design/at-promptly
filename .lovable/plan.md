## Issue

In `src/routes/index.tsx`:

1. `categories` appends `"Trending", "Instagram", "Photography"` to `baseCategories`, but those values now also exist in the prompts data (cards 11/12/13), so the chips render twice.
2. The `subsets` map (`Trending: prompts.slice(0,6)`, etc.) filters by index, not by category. The new cards (ids 11–13) are excluded from those subsets, so selecting Trending/Instagram/Photography does NOT show the new cards.

## Fix

Edit only `src/routes/index.tsx`:

- Remove the `subsets` constant entirely.
- Replace the categories line with a single deduped list built from the prompts data:
  ```ts
  const categories = ["All", ...Array.from(new Set(prompts.map(p => p.category)))];
  ```
- Simplify the `filtered` useMemo to filter only by `category === "All" || p.category === category` plus the search query.

Result: one chip per category (no duplicates), all chips filter the same masonry grid, and Photography / Instagram / Trending each include the new cards (Neon Eclipse, Doodle Dreams, Echo).

No other files change.