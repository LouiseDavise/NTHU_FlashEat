# NTHU FlashEat: design plan

**Subject:** campus lunch pre-order at NTHU. **Users:** students and faculty between classes, guests, stall staff.
**Core action:** reserve a 5-minute pickup slot and later show a 4-digit code. **Moment of use:** one hand, walking,
11:45, ten minutes before the rush; for staff, a phone propped on a counter with wet hands.

## Three directions
1. Heat-map first: white page, purple heat bars as the hero, label-style tickets for the kitchen. (chosen)
2. Photographic menu feed with food photos. Lost: stall photos would be invented, and the brief forbids stock hero looks.
3. Dark kitchen display. Lost: dark mode is out of scope and the brief asks white, purple, black.

## Palette (tokens in src/global.css)
Kiln purple #5E2B8C (accent), pressed #4A2170, lilac surface #F4EFF9, heat scale #EDE4F5 / #C9B3E0 / #9C77C9 / #5E2B8C,
ink #111111, grey #6B6B6B, hairline #E6E6E6. Status only for meaning: green #16A34A, amber #F59E0B, red #DC2626.

## Type
System font. 28/22/17/15/13 scale. Tabular monospace for order codes (labels, like a thermal printout). 48 bold spaced for the pickup code.

## Shell
```
┌──────────────────────────┐ purple band (safe area inside)
│ FlashEat  11:45 Demo EN|中 ⚙│
│ ‹ back        Switch role │
├──────────────────────────┤
│ white page, 16 padding    │  no tab bar: a focused one-flow app;
│ ...                       │  tenants get their own segmented tabs
└──────────────────────────┘
```
## Screens
- Welcome: tall purple top with wordmark and slogan, then three stacked role cards with their own fields.
- Customer home (chosen): active order card, title, legend, three cafeteria cards each dominated by its 12-block heat bar
  with a "now" marker at 11:45. Alternative (list of big numbers) lost: the heat bar is the thesis.
- Stall list: compact rows with prep time and line wait. Menu: list with steppers, slot chips row, sticky cart bar.
- Checkout: summary, note, radio list. My order: tracker, white QR card, giant code.
- Tenant: segmented New / Preparing / Ready, dashed-top label tickets. Pickup check: digit boxes and a big keypad; results fill the screen.

## Signature moment
Pickup check VERIFIED: full green screen, checkmark pops in with a success haptic. The red ALARM pulses with a warning haptic.
Customer side: the green "Your order is on Shelf A-3" banner slides in from the top.

## Check against defaults
Not a settings-page layout: home is heat bars, tenant screens are tickets, pickup check is a keypad. Accent is the NTHU purple, not the starter's. Seed data is campus-specific.

**Unmistakable:** a lunch-rush heat strip with a "now" tick, and kitchen tickets that look like printed labels.
