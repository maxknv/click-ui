---
'@clickhouse/click-ui': minor
---

Introduces click-ui's own `DialogProps` and `DialogTriggerProps` types, replacing direct Radix UI type re-exports. This decouples the public API from internal implementation details.

**What's new:**
- `DialogProps`, `DialogTriggerProps` - click-ui's own types with the same API you're used to

**How to migrate?**

For most users, no changes needed! `DialogProps` works exactly as before.

If you were importing Radix types directly from click-ui (`HoverCardProps`, `PopoverProps`, `ContextMenuProps`), import from Radix instead:

```tsx
// Before
import { HoverCardProps } from '@clickhouse/click-ui';

// After
import { HoverCardProps } from '@radix-ui/react-hover-card';
```
