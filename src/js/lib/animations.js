/**
 * Web Animations API helpers for PDS dashboard.
 * Uses Element.animate() for transitions and effects.
 */

const defaultDuration = 200;
const defaultEasing = "ease-out";

/**
 * Fade in an element.
 * @param {Element} el
 * @param {KeyframeAnimationOptions} [options]
 * @returns {Animation}
 */
export function fadeIn(el, options = {}) {
  return el.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    {
      duration: options.duration ?? defaultDuration,
      easing: options.easing ?? defaultEasing,
      fill: "forwards",
      ...options,
    }
  );
}

/**
 * Fade out an element.
 * @param {Element} el
 * @param {KeyframeAnimationOptions} [options]
 * @returns {Animation}
 */
export function fadeOut(el, options = {}) {
  return el.animate(
    [{ opacity: 1 }, { opacity: 0 }],
    {
      duration: options.duration ?? defaultDuration,
      easing: options.easing ?? defaultEasing,
      fill: "forwards",
      ...options,
    }
  );
}

/**
 * Slide in from the left (e.g. for panel content).
 * @param {Element} el
 * @param {KeyframeAnimationOptions} [options]
 * @returns {Animation}
 */
export function slideInLeft(el, options = {}) {
  return el.animate(
    [
      { transform: "translateX(-100%)", opacity: 0 },
      { transform: "translateX(0)", opacity: 1 },
    ],
    {
      duration: options.duration ?? 250,
      easing: options.easing ?? defaultEasing,
      fill: "forwards",
      ...options,
    }
  );
}

/**
 * Run transition: fade out old, then fade in new (for page changes).
 * @param {Element} outEl - Element to fade out
 * @param {Element} inEl - Element to fade in
 * @param {number} [duration]
 * @returns {Promise<void>}
 */
export function crossFade(outEl, inEl, duration = defaultDuration) {
  if (!outEl || !inEl) return Promise.resolve();
  const animOut = fadeOut(outEl, { duration: duration / 2 });
  return new Promise((resolve) => {
    animOut.finished.then(() => {
      if (inEl.parentNode) {
        fadeIn(inEl, { duration: duration / 2 }).finished.then(resolve);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Animate a single value (e.g. for progress or height).
 * @param {Element} el
 * @param {string} property - CSS property (e.g. 'transform', 'opacity')
 * @param {string|number} from
 * @param {string|number} to
 * @param {KeyframeAnimationOptions} [options]
 * @returns {Animation}
 */
export function animateValue(el, property, from, to, options = {}) {
  return el.animate(
    [{ [property]: from }, { [property]: to }],
    {
      duration: options.duration ?? defaultDuration,
      easing: options.easing ?? defaultEasing,
      fill: "forwards",
      ...options,
    }
  );
}
