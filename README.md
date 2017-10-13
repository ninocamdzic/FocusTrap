# FocusTrap
Traps the focus within an specified element. This, for example, can be used to trap the focus within a dialog.

## Usage: Simple
```javascript
FocusTrap.trap(document.getElementById("a-container-element"));
```

## Usage: Restoring focus after releasing the trap.
```javascript
trapButton.addEventListener("click", function() {
  FocusTrap.trap(document.getElementById("a-container-element"), this);
});

releaseButton.addEventListener("click", function() {
  FocusTrap.release();
});
```
## Usage: Restoring focus to any element.
```javascript
trapButton.addEventListener("click", function() {
  FocusTrap.trap(document.getElementById("a-container-element"));
});

releaseButton.addEventListener("click", function() {
  FocusTrap.release(document.getElementById("some-element"));
});
```
Not if you don't specify an element to which to restore the focus to. The script will determine the first focusable element in the document and restore the focus to that element.
