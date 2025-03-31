import React, { useRef, useEffect } from 'react';

const CustomRangeSlider = ({
    min = 0,
    max = 100,
    value, // Receive value as a prop
    onChange,
    className = ''
}) => {
    // References to DOM elements
    const sliderRef = useRef(null);
    const trackRef = useRef(null);

    // Calculate the fill percentage based on the current value
    const getFillPercentage = () => {
        return ((value - min) / (max - min)) * 100;
    };

    // Handle click/touch on the track to update the value
    const handleTrackClick = (e) => {
        if (!trackRef.current) return;

        const rect = trackRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentageClicked = (x / rect.width) * 100;

        // Ensure the value stays within bounds
        let newValue = Math.min(max, Math.max(min,
            min + (percentageClicked / 100) * (max - min)
        ));

        // Round the newValue to the nearest integer
        newValue = Math.round(newValue);

        // Call the onChange callback if provided
        if (onChange) {
            onChange(newValue); // Pass the new value to the parent
        }
    };

    // Handle drag/slide interaction
    const handleSliderDrag = (e) => {
        handleTrackClick(e);
    };

    // Setup event listeners for drag interactions
    useEffect(() => {
        const handleMouseMove = (e) => {
            handleSliderDrag(e);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        const handleMouseDown = () => {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };

        const sliderElement = sliderRef.current;
        if (sliderElement) {
            sliderElement.addEventListener('mousedown', handleMouseDown);
        }

        return () => {
            if (sliderElement) {
                sliderElement.removeEventListener('mousedown', handleMouseDown);
            }
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [min, max, onChange]);

    return (
        <div
            className={`custom-slider-container ${className}`}
            ref={sliderRef}
        >
            <div
                className="custom-slider-track"
                ref={trackRef}
                onClick={handleTrackClick}
            >
                <div
                    className="custom-slider-fill"
                    style={{ width: `${getFillPercentage()}%` }}
                ></div>
            </div>
        </div>
    );
};

export default CustomRangeSlider;