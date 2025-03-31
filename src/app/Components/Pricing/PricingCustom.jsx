"use client";
import React, { useState, useEffect } from "react";
// Assuming ApexCharts and Chart are used correctly elsewhere or needed for context
// import ApexCharts from "apexcharts"; 
import Chart from "react-apexcharts";
import CustomRangeSlider, { CustomRange } from "./CustomRange"; // Assuming this path is correct

export function CustomPricing() {
    // --- State ---
    const [audienceSize, setAudienceSize] = useState(40000);
    const [inventorySize, setInventorySize] = useState(2000);

    // Temporary state for input fields to allow free typing
    const [audienceInput, setAudienceInput] = useState(audienceSize.toString());
    const [inventoryInput, setInventoryInput] = useState(inventorySize.toString());

    // --- Constants ---
    const AUDIENCE_UPPER_BOUND = 100000;
    const AUDIENCE_LOWER_BOUND = 2500;
    const INVENTORY_UPPER_BOUND = 10000;
    const INVENTORY_LOWER_BOUND = 300;

    const AUDIENCE_MIN = 0;
    const AUDIENCE_MAX = 100000;
    const INVENTORY_MIN = 0;
    const INVENTORY_MAX = 10000;

    // --- Update Functions (Validation and State Commit) ---
    function updateAudienceSize(value) {
        const numericValue = parseInt(value, 10);

        // Handle NaN or invalid input - revert to current valid state
        if (isNaN(numericValue)) {
            setAudienceInput(audienceSize.toString()); // Reset input display
            return;
        }

        let finalValue = numericValue;
        if (numericValue > AUDIENCE_UPPER_BOUND) {
            finalValue = AUDIENCE_UPPER_BOUND;
        } else if (numericValue < AUDIENCE_LOWER_BOUND) {
            finalValue = AUDIENCE_LOWER_BOUND;
        }
        setAudienceSize(finalValue);
        // Sync input field *after* validation
        setAudienceInput(finalValue.toString());
    }

    function updateInventorySize(value) {
        const numericValue = parseInt(value, 10);

        // Handle NaN or invalid input - revert to current valid state
        if (isNaN(numericValue)) {
            setInventoryInput(inventorySize.toString()); // Reset input display
            return;
        }

        let finalValue = numericValue;
        if (numericValue > INVENTORY_UPPER_BOUND) {
            finalValue = INVENTORY_UPPER_BOUND;
        } else if (numericValue < INVENTORY_LOWER_BOUND) {
            finalValue = INVENTORY_LOWER_BOUND;
        }
        setInventorySize(finalValue);
        // Sync input field *after* validation
        setInventoryInput(finalValue.toString());
    }

    // --- Input Field Handlers ---
    const handleAudienceInputChange = (e) => {
        // Allow any typing in the input field
        setAudienceInput(e.target.value);
    };

    const handleInventoryInputChange = (e) => {
        // Allow any typing in the input field
        setInventoryInput(e.target.value);
    };

    const commitAudienceChange = () => {
        // Validate and update state when input loses focus or Enter is pressed
        updateAudienceSize(audienceInput);
    };

    const commitInventoryChange = () => {
        // Validate and update state when input loses focus or Enter is pressed
        updateInventorySize(inventoryInput);
    };

    const handleAudienceKeyDown = (e) => {
        if (e.key === 'Enter') {
            commitAudienceChange();
            e.target.blur(); // Optional: remove focus after Enter
        }
    };

    const handleInventoryKeyDown = (e) => {
        if (e.key === 'Enter') {
            commitInventoryChange();
            e.target.blur(); // Optional: remove focus after Enter
        }
    };


    // --- Effects ---
    // Sync input fields if the main state changes (e.g., via slider)
    useEffect(() => {
        setAudienceInput(audienceSize.toString());
    }, [audienceSize]);

    useEffect(() => {
        setInventoryInput(inventorySize.toString());
    }, [inventorySize]);


    // --- Calculations & Chart Config (Keep as is) ---
    const calculateSavings = () => {
        return 35; // Static value from design
    };

    const chartOptions = {
        // ... (Keep your existing chart options)
        chart: {
            type: "bar",
            height: 350,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: "60%",
                endingShape: "rounded",
                distributed: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: false,
        },
        series: [
            {
                name: "Estimated Cost",
                // TODO: Make chart data dynamic based on audience/inventory if needed
                data: [1000, 800, 200],
            },
        ],
        xaxis: {
            categories: ["Shopify", "WooCommerce", "Your Custom Store"],
            labels: {
                style: {
                    fontSize: "12px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 500,
                    colors: "#333",
                },
            },
        },
        yaxis: {
            title: {
                text: "Estimated Cost per Mo (in $)",
                style: {
                    fontSize: "14px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 600,
                    colors: "#333",
                },
            },
            labels: {
                style: {
                    fontSize: "12px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 500,
                    colors: "#333",
                },
            },
        },
        fill: {
            type: "solid",
            colors: ["#b39ae9", "#b39ae9", "#6e18ef"],
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return " $ " + val;
                },
            },
            style: {
                fontSize: "12px",
                fontFamily: "Helvetica, Arial, sans-serif",
            },
        },
        states: {
            hover: {
                filter: {
                    type: "lighten",
                    value: 0.15,
                },
            },
        },
        animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150,
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350,
            },
        },
        dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.2,
        },
    };

    const savingsPercentage = calculateSavings();
    // --- End Calculation Logic ---

    return (
        <div className="pricing sp">
            <div className="container">
                <div className="space30"></div>
                <div className="row">
                    <div className="custom-pricing-card">
                        <div className="custom-pricing-grid">
                            <div className="custom-pricing-left-col">
                                <div className="custom-pricing-left-col-top">
                                    <div className="heading4">
                                        <span
                                            className="span"
                                            data-aos="zoom-in-left"
                                            data-aos-duration="700"
                                        >
                                            Our Customized Pricing 👋
                                        </span>
                                    </div>
                                    <h1 className="custom-pricing-headline">
                                        Save a big portion of your revenue as you grow
                                    </h1>
                                    {/* Audience Size Input & Slider */}
                                    <div className="custom-range-slider-container">
                                        <div className="custom-range-slider-label">
                                            <label>Your Audience Size</label>
                                            <input
                                                type="number"
                                                // Use temporary state for value and onChange
                                                value={audienceInput}
                                                onChange={handleAudienceInputChange}
                                                // Validate on blur and Enter
                                                onBlur={commitAudienceChange}
                                                onKeyDown={handleAudienceKeyDown}
                                                // Keep min/max for browser hints, but validation is manual
                                                min={AUDIENCE_MIN}
                                                max={AUDIENCE_MAX}
                                                step={100} // Step might not be strictly enforced during typing
                                                placeholder="e.g. 40000" // Add placeholder
                                            />
                                        </div>
                                        <CustomRangeSlider
                                            min={AUDIENCE_MIN} // Use bounds for slider
                                            max={AUDIENCE_MAX}
                                            step={100}
                                            value={audienceSize} // Slider controlled by main state
                                            onChange={(value) => updateAudienceSize(value)} // Slider directly updates main state
                                        />
                                    </div>
                                    {/* Inventory Size Input & Slider */}
                                    <div className="custom-range-slider-container">
                                        <div className="custom-range-slider-label">
                                            <label>Your Inventory Size</label>
                                            <input
                                                type="number"
                                                // Use temporary state for value and onChange
                                                value={inventoryInput}
                                                onChange={handleInventoryInputChange}
                                                // Validate on blur and Enter
                                                onBlur={commitInventoryChange}
                                                onKeyDown={handleInventoryKeyDown}
                                                // Keep min/max for browser hints, but validation is manual
                                                min={INVENTORY_MIN}
                                                max={INVENTORY_MAX}
                                                step={100} // Step might not be strictly enforced during typing
                                                placeholder="e.g. 2000" // Add placeholder
                                            />
                                        </div>
                                        <CustomRangeSlider
                                            min={INVENTORY_MIN} // Use bounds for slider
                                            max={INVENTORY_MAX}
                                            step={100}
                                            value={inventorySize} // Slider controlled by main state
                                            onChange={(value) => updateInventorySize(value)} // Slider directly updates main state
                                        />
                                    </div>
                                </div>

                                <div className="custom-pricing-savings-area">
                                    <span className="custom-pricing-savings-percentage">
                                        {savingsPercentage}%
                                    </span>
                                    <p className="custom-pricing-savings-label">You Save</p>
                                </div>
                            </div>

                            {/* Chart Column */}
                            <div>
                                {typeof window !== "undefined" && (
                                    <Chart
                                        options={chartOptions}
                                        series={chartOptions.series}
                                        type="bar"
                                        height={420}
                                        width={600}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}