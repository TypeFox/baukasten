# Sidebar Navigation with Menu

Vertical navigation list using the Menu component with icons.

```tsx
<Menu size="md">
    <MenuItem
        icon={<Icon name="home" />}
        selected={page === 'home'}
        onClick={() => setPage('home')}
    >
        Home
    </MenuItem>
    <MenuItem
        icon={<Icon name="settings-gear" />}
        selected={page === 'settings'}
        onClick={() => setPage('settings')}
    >
        Settings
    </MenuItem>
    <MenuDivider />
    <SubMenu label="Advanced" icon={<Icon name="tools" />}>
        <MenuItem>Configuration</MenuItem>
        <MenuItem>Extensions</MenuItem>
    </SubMenu>
</Menu>
```
