"use client";
import React, { useState, useEffect } from "react";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import CustomRangeSlider, { CustomRange } from "./CustomRange";

// Import the CSS file where you'll paste the styles
// Make sure the path is correct for your project structure
// import './CustomPricingStyles.css';

export function CustomPricing() {

    const [audienceSize, setAudienceSize] = useState(40000);
    const [inventorySize, setInventorySize] = useState(2000);

    const calculateSavings = () => {
        return 35; // Static value from design
    };

    const chartOptions = {
        chart: {
            type: "bar",
            height: 350,
            // background: '#f8f9fa', // Light background
            toolbar: { show: false }, // Hide toolbar
        },
        plotOptions: {
            bar: {
                borderRadius: 8, // Rounded corners
                columnWidth: "60%",
                endingShape: "rounded",
                distributed: true, // Distribute colors
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: false, // Remove bar strokes
        },
        series: [
            {
                name: "Estimated Cost",
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
            colors: ["#b39ae9", "#b39ae9", "#6e18ef"], // Add this line
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
        // You might keep 'service4 sp' if they define broader page layout/spacing
        <div className="pricing sp">
            <div className="container">
                {/* Replaces container */}
                {/* Optional: Heading section if needed outside the card */}

                <div className="space30"></div>

                {/* Main Card Element */}
                <div className="row">
                    <div className="custom-pricing-card">
                        <div className="custom-pricing-grid">
                            {/* Left Column: Controls & Savings */}
                            <div className="custom-pricing-left-col">
                                <div className="custom-pricing-left-col-top">
                                    {" "}
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
                                    <div className="custom-range-slider-container">
                                        <div className="custom-range-slider-label">
                                            <label>Your Audience Size</label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="100000"
                                                value={audienceSize}
                                                onChange={(e) => setAudienceSize(e.target.value)}
                                            />
                                        </div>
                                        <CustomRangeSlider
                                            min={0}
                                            max={100000}
                                            step={100}
                                            value={audienceSize}
                                            onChange={(value) => setAudienceSize(value)}
                                        />
                                    </div>
                                    <div className="custom-range-slider-container">
                                        <div className="custom-range-slider-label">
                                            <label>Your Inventory Size</label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="100000"
                                                value={inventorySize}
                                                onChange={(e) => setInventorySize(e.target.value)}
                                            />
                                        </div>
                                        <CustomRangeSlider
                                            min={0}
                                            max={10000}
                                            defaultValue={2000}
                                            step={100}
                                            value={inventorySize}
                                            onChange={(value) => setInventorySize(value)}
                                        />
                                    </div>
                                </div>

                                {/* Bottom group: Savings Display */}
                                <div className="custom-pricing-savings-area">
                                    <span className="custom-pricing-savings-percentage">
                                        {savingsPercentage}%
                                    </span>
                                    <p className="custom-pricing-savings-label">You Save</p>
                                </div>
                            </div>

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
