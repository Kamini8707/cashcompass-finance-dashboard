import { useState, useEffect, useRef } from "react";

/**
 * Animated counter with smooth easing and color feedback.
 */
export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1800,
  decimals = 0,
  formatFn = null,
  className = "",
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [colorClass, setColorClass] = useState("");
  const ref = useRef(null);
  const startTime = useRef(null);
  const rafId = useRef(null);
  const prevValue = useRef(value);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Animate counter
  useEffect(() => {
    if (!isVisible) return;

    const startVal = displayValue;
    const endVal = value;
    startTime.current = performance.now();

    // Change color when value updates
    if (endVal > prevValue.current) {
      setColorClass("text-green-400");
    } else if (endVal < prevValue.current) {
      setColorClass("text-red-400");
    }

    setTimeout(() => setColorClass(""), 800);
    prevValue.current = endVal;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (now) => {
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = startVal + (endVal - startVal) * eased;

      setDisplayValue(current);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [value, isVisible, duration]);

  // Indian currency formatting
  const formatCurrency = (num) => {
    return num.toLocaleString("en-IN");
  };

  const formatted = formatFn
    ? formatFn(Math.round(displayValue))
    : decimals > 0
      ? displayValue.toFixed(decimals)
      : formatCurrency(Math.round(displayValue));

  return (
    <span
      ref={ref}
      className={`tabular-nums transition-all duration-300 ${colorClass} ${className}`}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/**
 * Animated percentage counter
 */
export function AnimatedPercentage({ value, duration = 1500, className = "" }) {
  const [display, setDisplay] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const start = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutQuart(progress);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value, isVisible, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display.toFixed(1)}%
    </span>
  );
}
