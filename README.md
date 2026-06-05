The page you linked is the **AdminLTE v4 collapsed sidebar layout**. The AdminLTE sidebar is the main navigation panel that appears on the left side of the dashboard and can expand, collapse, and behave responsively based on screen size. ([AdminLTE][1])

## Sidebar Structure

In AdminLTE 4, the layout is organized like this:

```html
<body>
  <div class="app-wrapper">

    <nav class="app-header">
      <!-- Top Navbar -->
    </nav>

    <aside class="app-sidebar">
      <!-- Sidebar -->
    </aside>

    <main class="app-main">
      <!-- Page Content -->
    </main>

    <footer class="app-footer">
      <!-- Footer -->
    </footer>

  </div>
</body>
```

The sidebar itself is the `<aside class="app-sidebar">` element. It typically contains:

* Brand/logo
* User information
* Navigation menu
* Nested menu groups (treeview) ([AdminLTE][1])

---

## Expanded Sidebar

Normal state:

```text
┌─────────────────────┐
│ LOGO                │
├─────────────────────┤
│ 🏠 Dashboard        │
│ 👥 Users            │
│ 📦 Products         │
│ ⚙️ Settings         │
└─────────────────────┘
```

Users can see:

* Icons
* Labels
* Nested menus

---

## Collapsed Sidebar

When the body has:

```html
<body class="sidebar-collapse">
```

the sidebar shrinks to an icon-only mode:

```text
┌─────┐
│ 🏠  │
│ 👥  │
│ 📦  │
│ ⚙️  │
└─────┘
```

Only icons remain visible, giving more space to the main content area. AdminLTE can automatically expand the sidebar temporarily on hover unless disabled. ([AdminLTE.IO][2])

---

## Responsive Behavior

AdminLTE uses:

```html
<aside class="app-sidebar sidebar-expand-lg">
```

Meaning:

| Screen Size                | Behavior                          |
| -------------------------- | --------------------------------- |
| Desktop (`lg` and above)   | Sidebar stays visible             |
| Tablet/Mobile (below `lg`) | Sidebar becomes off-canvas        |
| Mobile Toggle              | Opens/closes via hamburger button |

Available breakpoints:

```text
sidebar-expand-sm
sidebar-expand-md
sidebar-expand-lg
sidebar-expand-xl
sidebar-expand-xxl
```

These follow Bootstrap's breakpoint system. ([AdminLTE.IO][2])

---

## Example Navigation Menu

```html
<ul class="nav sidebar-menu">
  <li class="nav-item">
    <a href="/dashboard" class="nav-link">
      <i class="nav-icon bi bi-speedometer"></i>
      <p>Dashboard</p>
    </a>
  </li>

  <li class="nav-item">
    <a href="/users" class="nav-link">
      <i class="nav-icon bi bi-people"></i>
      <p>Users</p>
    </a>
  </li>
</ul>
```

Result:

```text
🏠 Dashboard
👥 Users
```

---

## Nested Menus (Treeview)

AdminLTE supports expandable menu groups:

```html
<li class="nav-item menu-open">
  <a href="#" class="nav-link">
    <i class="nav-icon bi bi-gear"></i>
    <p>
      Settings
      <i class="nav-arrow"></i>
    </p>
  </a>

  <ul class="nav nav-treeview">
    <li class="nav-item">
      <a href="/roles" class="nav-link">
        <p>Roles</p>
      </a>
    </li>

    <li class="nav-item">
      <a href="/permissions" class="nav-link">
        <p>Permissions</p>
      </a>
    </li>
  </ul>
</li>
```

Displayed as:

```text
⚙️ Settings ▼
   ├─ Roles
   └─ Permissions
```

---

## Sidebar Toggle

The navbar contains a button:

```html
<a href="#" data-lte-toggle="sidebar">
  ☰
</a>
```

Clicking it:

```text
Expanded → Collapsed
Collapsed → Expanded
```

AdminLTE's JavaScript handles the animation and state changes automatically. ([AdminLTE.IO][2])

---

## React Implementation Idea

For your React + Vite project, you can model the sidebar with:

```text
src/
├── layouts/
│   └── DashboardLayout.tsx
├── components/
│   ├── Sidebar.tsx
│   ├── SidebarMenu.tsx
│   └── Navbar.tsx
└── pages/
```

State example:

```tsx
const [collapsed, setCollapsed] = useState(false);
```

```tsx
<Sidebar collapsed={collapsed} />
<Navbar onToggle={() => setCollapsed(!collapsed)} />
```

CSS:

```css
.sidebar {
  width: 260px;
  transition: width .3s;
}

.sidebar.collapsed {
  width: 70px;
}
```

This reproduces the same AdminLTE behavior while keeping the implementation React-friendly.

### Key Concepts

1. **Sidebar = navigation container**
2. **Collapsed mode = icons only**
3. **Treeview = expandable submenus**
4. **Responsive mode = off-canvas on mobile**
5. **Toggle button = changes sidebar width/state**
6. **Content area automatically grows when sidebar collapses** ([AdminLTE][1])

This pattern is commonly used for admin dashboards because it maximizes screen space while keeping navigation accessible.

[1]: https://adminlte-v4.netlify.app/docs/layout?utm_source=chatgpt.com "Layout | AdminLTE 4"
[2]: https://adminlte.io/blog/customize-adminlte/?utm_source=chatgpt.com "How to Customize AdminLTE 4: Colors, Layout, and Dark Mode"
