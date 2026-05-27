# Form Layout

Standard form composition using FormGroup, FieldLabel, and form controls.

```tsx
<FormGroup>
  <FieldLabel htmlFor="email" required>Email</FieldLabel>
  <Input id="email" type="email" fullWidth error={errors.email} />
  {errors.email && <FormHelper variant="error">{errors.email}</FormHelper>}
</FormGroup>

<FormGroup>
  <FieldLabel htmlFor="role">Role</FieldLabel>
  <Select
    id="role"
    fullWidth
    options={roleOptions}
    value={role}
    onChange={setRole}
  />
</FormGroup>

<FormGroup orientation="horizontal">
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save</Button>
</FormGroup>
```
