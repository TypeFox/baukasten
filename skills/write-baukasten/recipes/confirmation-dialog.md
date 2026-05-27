# Confirmation Dialog

A blocking confirmation modal pattern.

```tsx
<Modal open={showConfirm} onClose={() => setShowConfirm(false)} size="sm">
    <ModalHeader onClose={() => setShowConfirm(false)}>Confirm Delete</ModalHeader>
    <ModalBody>
        <Alert variant="warning">This action cannot be undone.</Alert>
    </ModalBody>
    <ModalFooter>
        <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
        </Button>
        <Button variant="primary" onClick={handleDelete}>
            Delete
        </Button>
    </ModalFooter>
</Modal>
```
