---
name: JSON Converter Cutting Table
description: A local drafting table for moving structured data between JSON and simple YAML shapes.
colors:
  cloth: "#252328"
  cloth-light: "#302d34"
  bone: "#e7e0d2"
  gold: "#d7ae5d"
  coral: "#d98272"
  blue: "#9ab6bb"
  line: "#5b555c"
typography:
  display:
    fontFamily: "Avenir Next, Trebuchet MS, sans-serif"
    fontSize: "clamp(4rem, 9vw, 9rem)"
    fontWeight: 500
    lineHeight: 0.78
    letterSpacing: "-0.11em"
  serif-accent:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(4rem, 9vw, 9rem)"
    fontWeight: 400
  code:
    fontFamily: "Courier New, monospace"
    fontSize: "14px"
    lineHeight: 1.65
  label:
    fontFamily: "Avenir Next, Trebuchet MS, sans-serif"
    fontSize: "10px"
    letterSpacing: "0.15em"
rounded:
  none: "0"
  chip: "999px"
spacing:
  table: "28px"
  piece: "18px"
components:
  transform:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.cloth}"
    rounded: "{rounded.none}"
    padding: "12px 16px 12px 18px"
---

# Design System: JSON Converter Cutting Table

## Overview

**Creative North Star: "A pattern-cutting studio."**

Structured data is treated as a pattern: the source is laid flat, a named transformation pulls a cord, and the finished piece appears opposite it. Charcoal cloth, bone type, gold controls, and coral transfer marks make the conversion causal and tactile.

## Colors

Charcoal cloth keeps the workbench focused. Gold is the cord and active operation; blue is reserved for finished data; coral marks the transfer between pieces.

### Primary
- **Drafting gold** (#d7ae5d): transformation controls, labels, and copy action.
- **Finished blue** (#9ab6bb): output data and local status.
- **Transfer coral** (#d98272): pull connector and italic display accent.

### Neutral
- **Charcoal cloth** (#252328): page ground.
- **Raised cloth** (#302d34): workbench surface.
- **Bone paper** (#e7e0d2): readable text.
- **Seam line** (#5b555c): drafting rules.

## Typography

**Display Font:** Avenir Next, Trebuchet MS, sans-serif with Georgia for the italic accent
**Body Font:** Avenir Next, Trebuchet MS, sans-serif
**Code Font:** Courier New, monospace

**Character:** fashion-studio scale and editorial italic meet strict code output.

### Hierarchy
- **Display** (500, clamp 4rem–9rem, .78): opening metaphor.
- **Headline** (400, clamp 2rem–3.7rem, .9): table title.
- **Code** (400, 14px, 1.65): editable and finished pieces.
- **Label** (400, 10px, uppercase, .15em): pattern and operation metadata.

## Layout

The workbench is one framed table: transformation row on top, source and result pieces in the middle, and the pull action at the bottom. The center cord becomes a horizontal transfer on phones while pieces stack.

## Elevation & Depth

Depth is tonal rather than shadowed: cloth ground, raised cloth table, and inset piece windows. Gold marks the active layer and no blur or glass effect is used.

## Shapes

Controls and panels are square; the only rounded form is a small operation cord node and optional metadata chip. The drafting grid and one-pixel rules provide the physical grammar.

## Components

### Transformation row
- **Rest:** quiet operation label with an unlit cord node.
- **Active:** bone label, gold node, and a faint cloth tint.

### Pattern pieces
- **Source:** editable monospaced textarea with character count and clear action.
- **Finished:** read-only monospaced output with error copy in coral and copy action in gold.

### Pull action
- **Style:** rectangular gold button with an arrow, paired with a truthful simple-YAML note.

## Do's and Don'ts

### Do:
- **Do** show the source and result side by side when width allows.
- **Do** explain that YAML support is intentionally simple and client-side.

### Don't:
- **Don't** present conversion as a server workflow or a full jq replacement.
- **Don't** use generic rounded input cards that erase the pattern-cutting metaphor.
