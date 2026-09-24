Labelled text field — search, email, admin fields; mono uppercase label, orange focus ring.

```jsx
<Input label="Email" type="email" placeholder="you@company.com" />
<Input id="search" icon="search" label="Search" hideLabel end={<kbd>⌘K</kbd>} />
```

- `error` sets aria-invalid + message; `hint`; `counter` slot; `multiline` → textarea.
