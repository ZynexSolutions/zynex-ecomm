import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react"; // Import useMemo

// Simple throttle function (put this outside your component or in a utils file)
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Wrap component export in React.memo for potential extra optimization
const CustomRangeSlider = React.memo(
  ({
    // <-- Use React.memo
    min = 0,
    max = 100,
    step = 1,
    value,
    onChange,
    className = "",
  }) => {
    const sliderRef = useRef(null);
    const trackRef = useRef(null);
    const handleRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const throttleDelay = 100; // Adjust ms delay (e.g., 30-100ms) as needed

    // --- Throttled onChange ---
    // Create a stable throttled version of onChange using useMemo
    const throttledOnChange = useMemo(() => {
      if (!onChange) return () => {}; // Return no-op if onChange is not provided
      return throttle(onChange, throttleDelay);
    }, [onChange, throttleDelay]); // Recreate only if onChange function or delay changes

    // --- Value Calculation (Keep as is) ---
    const calculateValueFromPosition = useCallback(
      (clientX) => {
        // ... (Keep your existing calculation logic)
        if (!trackRef.current) return value;
        const trackRect = trackRef.current.getBoundingClientRect();
        const trackWidth = trackRect.width;
        let relativeX = Math.max(
          0,
          Math.min(trackWidth, clientX - trackRect.left)
        );
        let percentage = relativeX / trackWidth;
        let newValue = min + percentage * (max - min);
        if (step > 0) {
          newValue = Math.round(newValue / step) * step;
        } else {
          newValue = Math.round(newValue);
        }
        newValue = Math.max(min, Math.min(max, newValue));
        return newValue;
      },
      [min, max, step, value]
    );

    // --- Event Handlers ---
    const handleInteractionStart = useCallback(
      (e) => {
        setIsDragging(true);
        const clientX =
          e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
        const newValue = calculateValueFromPosition(clientX);
        // Still call original onChange immediately on start for responsiveness
        if (onChange && newValue !== value) {
          onChange(newValue);
        }
        e.preventDefault();
      },
      [calculateValueFromPosition, onChange, value]
    );

    const handleInteractionMove = useCallback(
      (e) => {
        if (!isDragging || !trackRef.current) return;

        const clientX =
          e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        const newValue = calculateValueFromPosition(clientX);

        // Only call the *throttled* version during move
        if (newValue !== value) {
          throttledOnChange(newValue); // <--- Use throttled function here
        }
        e.preventDefault();
      },
      [isDragging, calculateValueFromPosition, value, throttledOnChange]
    ); // Add throttledOnChange to deps

    const handleInteractionEnd = useCallback(() => {
      // Optional: Ensure the very final value is set
      // This can be useful if the last throttled call didn't fire exactly at mouseup
      // Requires getting the final position, which we don't have directly here.
      // Often, the last throttled call or the initial click/drag is sufficient.
      // If you absolutely need the final precise value, you might need to store
      // the last calculated value in a ref and call onChange with it here if needed.
      // For minimal change, we'll omit this for now.
      setIsDragging(false);
    }, []);

    // --- Effects for Global Listeners (Keep as is) ---
    useEffect(() => {
      if (isDragging) {
        // ... (add listeners)
        document.addEventListener("mousemove", handleInteractionMove);
        document.addEventListener("mouseup", handleInteractionEnd);
        document.addEventListener("touchmove", handleInteractionMove, {
          passive: false,
        });
        document.addEventListener("touchend", handleInteractionEnd);
        document.addEventListener("touchcancel", handleInteractionEnd);
      }
      return () => {
        // ... (remove listeners)
        document.removeEventListener("mousemove", handleInteractionMove);
        document.removeEventListener("mouseup", handleInteractionEnd);
        document.removeEventListener("touchmove", handleInteractionMove);
        document.removeEventListener("touchend", handleInteractionEnd);
        document.removeEventListener("touchcancel", handleInteractionEnd);
      };
    }, [isDragging, handleInteractionMove, handleInteractionEnd]);

    // --- Style Calculation (Keep as is) ---
    const getPercentage = useCallback(() => {
      // ... (Keep as is)
      if (max === min) return 0;
      return ((value - min) / (max - min)) * 100;
    }, [min, max, value]);

    const fillPercentage = getPercentage();
    const handleStyle = { left: `${fillPercentage}%` };
    const fillStyle = { width: `${fillPercentage}%` };

    // --- Render (Keep as is) ---
    return (
      <div
        ref={sliderRef}
        // ... (rest of the JSX)
        className={`custom-slider-container ${className} ${
          isDragging ? "dragging" : ""
        }`}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
      >
        <div className="custom-slider-track" ref={trackRef}>
          <div className="custom-slider-fill" style={fillStyle}></div>
          <div
            className="custom-slider-handle"
            ref={handleRef}
            style={handleStyle}
          ></div>
        </div>
      </div>
    );
  }
); // <-- Close React.memo

CustomRangeSlider.displayName = "CustomRangeSlider";

export default CustomRangeSlider;
