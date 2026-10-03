# Kiln — design plan

**Subject:** a daily habit tracker. **Who:** people building small routines, checking in one-handed, mostly morning and evening. **Core action:** tap a habit to "fire" it for today. **Moment:** quick, glanceable, satisfying.

## Directions
1. Paper and ink: off-white, black serif, hairlines. Quiet, but reads as a notes app.
2. Pastel sticker sheet: playful chips. Reads as every habit app.
3. **Kiln (chosen):** charcoal ash and glowing ember. Habits are pieces in a kiln; a check-in "fires" them. Chosen because the metaphor gives the color, the words and the signature moment.

## Palette (tokens in src/global.css)
- Ash (background): dark `#1C1917`, light `#F3EFE9`
- Clay (surface): dark `#272220`, light `#FBF9F5`
- Bone (foreground): dark `#F2ECE2`, light `#231D1A`
- Smoke (muted text): warm grey
- Ember (accent): `#F2611D` light / brighter in dark
- Glaze (future use): deep teal

## Type
System font. Big rounded numerals for streaks (font-rounded, bold), sentence-case labels, no all-caps.

## Shell
```
Today | Streaks      (native tab bar, content scrolls under)
```
Today: large title + date, "2 of 4 fired" line, then one tall tile per habit: ember disc on the left (ring when cold, filled with flame when fired), name, streak on the right. Add button in a header row.
Streaks: per-habit card with current and best streak and a 14-day strip of small squares (lit = ember).
New habit: form sheet with name field and icon picker.

## Signature moment
Tapping a disc fires it: the ember fills outward from the center, a glow ring expands and fades, success haptic. Firing the last habit of the day shows a "Kiln is full" banner with one more success haptic.

## Dials
Motion standard (timing only), variance low, density cozy.

## Unmistakable because
The tracker speaks in kiln words (fire, cold, lit) and glows ember on warm charcoal instead of ticking boxes on white.
