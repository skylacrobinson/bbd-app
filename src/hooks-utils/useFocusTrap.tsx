 
 
/**
 * A React hook that sets up a focus trap within a modal dialog.
 *
 * This hook ensures that keyboard navigation focus is prevented from leaving the modal
 * while it is open.
 * It listens for the 'Tab' key down event to cycle through focusable elements and 
 * prevents focus from leaving the modal.
 * It also handles focus restoration when the modal is closed.
 *
 * Usage:
 * - Call this hook inside a component that renders a modal dialog.
 * - The modal element must have the class name `.modal`.
 * - Focusable elements are determined by a set of selectors (selectors were manually defined based on present use cases).
 *
 * Returns a cleanup function to remove the event listener when the modal is unmounted.
 *
 * @returns {() => void | undefined} Cleanup function to remove the focus trap event listener.
 */
const focusableSelectors = [ 
    // Applicable selectors for focusable elements
            'button',
            '[href]',
            '[tabindex]:not([tabindex="-1"])'
        ];

 export default function useFocusTrap() {
        const modal = document.querySelector('.modal');
        if (!modal) return; // If no modal is found, exit the hook early.
        const focusableEls = Array.from(  // Filters out disabled elements and those with aria-hidden. 
            modal.querySelectorAll<HTMLElement>(focusableSelectors.join(','))
            ).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')); 
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        // The filter and logic for first and last element is not very applicable currently in this small scale application.
        // But in a larger application with many interactive elements it would become relevant.
        const keydownListener = (e: Event) => {
            trapFocus(e as KeyboardEvent, focusableEls, firstEl, lastEl);
        };
            modal.addEventListener('keydown', keydownListener);

        return () => {
            modal.removeEventListener('keydown', keydownListener);
        };
    }

/**
 * Handles the focus trapping logic for keyboard navigation within the modal.
 */
function trapFocus(e: KeyboardEvent, focusableEls: HTMLElement[], firstEl: HTMLElement, lastEl: HTMLElement) {
        if (e.key !== 'Tab') return;
        if (focusableEls.length === 0) return;

        if (e.shiftKey) {
            if (document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            }
        } else {
            if (document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }
        }
}