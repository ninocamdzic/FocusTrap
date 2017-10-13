/**
* FocusTrap v0.1.0
* Copyright(c) Nino Camdzic 2017
*
* Traps the focus within an specified element.
*/
(function(document) {
	const NS = window.FocusTrap = window.FocusTrap || {};
	const TAB_KEY_CODE = 9;
	const FOCUSABLE = "a, object, input, iframe, [tabindex]";

	let opener;
	let trapped;
	let first;
	let last;
	let lastFocused;
	let active = false;

	// Handle switching to first and last element when needed.
	function handleKeyDown(e) {
		let elem;
		
		if(e.keyCode === TAB_KEY_CODE && e.shiftKey && document.activeElement === first) {
			elem = last;
		} else if(e.keyCode === TAB_KEY_CODE && document.activeElement === last) {
			elem = first;
		}
		
		if(elem) {
			elem.focus();
			e.preventDefault();
			e.stopImmediatePropagation();
		}
	}

	// Keep track of the lastFocused element so we can restore the focus on that
	// element when the user clicks outside the trap.
	function handleFocus(e) {
		if(trapped.contains(e.target)) {
			lastFocused = e.target;
		}
	}

	// Handle clicks, mousedown and contextmenu outside of the trap.
	function handleClick(e) {
		if(!trapped.contains(e.target)) {
			e.target.blur();
			e.preventDefault();
			e.stopImmediatePropagation();
			lastFocused.focus();
		}
	}

	// Restore the focus on the specified element otherwise try to find the first
	// focusable element in the document and focus that.
	function restoreFocus(elem) {
		if(elem) {
			elem.focus();
		} else {
			let elems = document.querySelectorAll(FOCUSABLE);
			
			if(elems.length > 0) {
				elems[0].focus();
			}
		}
	}

	/**
	 * Trap the focus within the specified element. Only one trap can be active at once.
	 * This method returns true if the trap was activated, otherwise false.
	 *
	 * @param elem The element where the focus should be traped in.
	 * @param trigger(optional) - The element which triggered the trap.
	 */
	NS.trap = function(elem, trigger) {
		if(active) {
			return false;
		}

		active = true;
		trapped = elem;
		opener = trigger;
		let focusable = trapped.querySelectorAll(FOCUSABLE);
		first = focusable[0];
		last = focusable[focusable.length - 1];

		document.addEventListener("focus", handleFocus, true);
		document.addEventListener("keydown", handleKeyDown, true);
		document.addEventListener("mousedown", handleClick, true);
		document.addEventListener("click", handleClick, true);
		document.addEventListener("contextmenu", handleClick, true);
		first.focus();
		
		return true;
	};
		
	/**
	 * Release the focus.
	 *
	 * @param elem(optional) If an element is specified the focus will be restored on the specified
	 *                       element. If no element is specified the method will try to restore the
	 *						 focus on the trigger(see trap method). If the trigger was not specified
	 *						 the method will try to find the first focusable element in the document
	 *						 and focus that.
	 */
	NS.release = function(elem) {
		first = null;
		last = null;
		active = false;
		
		document.removeEventListener("focus", handleFocus, true);
		document.removeEventListener("keydown", handleKeyDown, true);
		document.removeEventListener("mousedown", handleClick, true);
		document.removeEventListener("click", handleClick, true);
		document.removeEventListener("contextmenu", handleClick, true);
		restoreFocus(elem || opener);
	};
})(document);
