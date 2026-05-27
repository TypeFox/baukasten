# Toolbar

Horizontal action bar with grouped buttons and a divider.

```tsx
<div style={{ display: 'flex', gap: 'var(--bk-gap-sm)', alignItems: 'center' }}>
    <IconButton icon={<Icon name="new-file" />} variant="ghost" aria-label="New File" />
    <IconButton icon={<Icon name="save" />} variant="ghost" aria-label="Save" />
    <Divider orientation="vertical" />
    <IconButton icon={<Icon name="play" />} variant="ghost" aria-label="Run" />
    <IconButton icon={<Icon name="debug" />} variant="ghost" aria-label="Debug" />
</div>
```
