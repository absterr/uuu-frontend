# Tailwind CSS (v4)

## Syntax

- Use Tailwind v4 syntax only, not older/v3 conventions.

## Values & scale

- Avoid arbitrary-value classes (`max-w-[1120px]`) when an equivalent theme/scale value exists (`max-w-280`).
- Convert the actual pixel value to the correct Tailwind scale value. Never guess.
  - `max-w-[1120px]` → `max-w-280`
  - `min-h-[520px]` → `min-h-130`
  - `max-w-[480px]` → `max-w-120`
- Avoid styles that trigger editor warnings when a proper Tailwind class exists instead.

## Style placement

- Keep styles inline in component markup by default.
- `globals.css` should contain only:
  - Tailwind import
  - global/theme configuration
  - genuinely global browser/base styles
  - styles too repeated or too complex to reasonably express inline
- Repetition alone doesn't justify extraction, readability and real reuse do. Don't extract generic patterns (`flex flex-col gap-*`, card layouts, headings) into globals.css just because they recur.

## Spacing

- Avoid margins unless truly necessary (e.g. spacing an icon from adjacent text).
- Prefer `flex gap-*` or padding over margin.
- `mx-auto` + `max-w-*` is the standard pattern for centering section containers at their top level, skip it only in rare cases where it breaks the intended style (e.g. a full-bleed background color).
- Section-level spacing should generally use padding.

## Class ordering

- Write classes in consecutive, readable order: base style, immediately followed by its breakpoint/variant override, then the next property.
  - `text-sm md:text-base`
  - `px-4 md:px-8`
  - `py-6 md:py-10`
- Apply the same base-then-variant ordering logic to all variants, not just responsive breakpoints (e.g. `hover:`, `dark:`).
- Use the `cn` utility to combine classes conditionally.
