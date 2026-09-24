Sticky site header: wordmark, primary links, ⌘K search, theme toggle, Subscribe.

```jsx
<TopBar active="home" theme={t} onThemeChange={setT} onSearch={q => go(q)} />
```

- Links hide under 768px — pair with SideNav (tab bar). Search keeps working on mobile.
