# FocusTrap
Traps the focus within an specified element. This, for example, can be used to trap the focus within a dialog.

## Usage

### Simple
Trapping the focus.
```javascript
FocusTrap.trap(document.getElementById("a-container-element"));
```
Releasing the focus.
```javascript
FocusTrap.trap(document.getElementById("a-container-element"));
```

### Restoring focus to the element which triggered the trap.
Trapping the focus.
```javascript
trapButton.addEventListener("click", function() {
  // Note that we have provided 'this' as a second argument.
  FocusTrap.trap(document.getElementById("a-container-element"), this);
});
```
Releasing the focus.
```javascript
releaseButton.addEventListener("click", function() {
  // We call the release method as usual. No changes here.
  FocusTrap.release();
});
```

### Restoring focus to any element.
Trapping the focus.
```javascript
trapButton.addEventListener("click", function() {
  FocusTrap.trap(document.getElementById("a-container-element"));
});
```
Releasing the focus.
```javascript
releaseButton.addEventListener("click", function() {
  // Specify any focusable element as an argument and the script will try to
  // restore the focus to that element.
  FocusTrap.release(document.getElementById("some-element"));
});
```
If you don't specify an element to which to restore the focus to. The script will determine the first focusable element in the document and restore the focus to that element.
