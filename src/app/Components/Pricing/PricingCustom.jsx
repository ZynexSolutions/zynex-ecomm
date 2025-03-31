"use client";
import React, { useState, useEffect, useMemo } from "react";
import Chart from "react-apexcharts";
import CustomRangeSlider from "./CustomRange"; // Assuming this path is correct
// Import the estimation function
import { estimateEcommerceCosts } from "../Utils/estimate"; // Adjust path if needed

export function CustomPricing() {
  // --- State ---
  const [audienceSize, setAudienceSize] = useState(40000);
  const [inventorySize, setInventorySize] = useState(2000);
  const [estimatedCosts, setEstimatedCosts] = useState([]); // State to hold calculation results

  // Temporary state for input fields to allow free typing
  const [audienceInput, setAudienceInput] = useState(audienceSize.toString());
  const [inventoryInput, setInventoryInput] = useState(
    inventorySize.toString()
  );

  // --- Constants ---
  // Input field bounds (soft validation) - adjust if needed
  const AUDIENCE_UPPER_BOUND = 100000;
  const AUDIENCE_LOWER_BOUND = 100; // Min sensible value for estimation
  const INVENTORY_UPPER_BOUND = 10000;
  const INVENTORY_LOWER_BOUND = 10; // Min sensible value for estimation

  // Slider bounds
  const AUDIENCE_MIN_SLIDER = 100;
  const AUDIENCE_MAX_SLIDER = 100000;
  const INVENTORY_MIN_SLIDER = 10;
  const INVENTORY_MAX_SLIDER = 10000;

  // --- Effect to Calculate Costs ---
  useEffect(() => {
    // Ensure valid numbers before calculating
    const validAudience = Math.max(
      AUDIENCE_LOWER_BOUND,
      Math.min(AUDIENCE_UPPER_BOUND, audienceSize)
    );
    const validInventory = Math.max(
      INVENTORY_LOWER_BOUND,
      Math.min(INVENTORY_UPPER_BOUND, inventorySize)
    );

    const results = estimateEcommerceCosts(validAudience, validInventory);

    console.log("[shopify ]", results[0].min_cost);
    console.log("[woo ]", results[1].min_cost);
    console.log("[medusa ]", results[2].min_cost);

    setEstimatedCosts(results);
  }, [audienceSize, inventorySize]); // Recalculate when size changes

  // --- Update Functions (Validation and State Commit) ---
  function updateAudienceSize(value) {
    const numericValue = parseInt(value, 10);

    if (isNaN(numericValue)) {
      setAudienceInput(audienceSize.toString());
      return;
    }

    // Apply bounds used for calculation
    let finalValue = Math.max(
      AUDIENCE_LOWER_BOUND,
      Math.min(AUDIENCE_UPPER_BOUND, numericValue)
    );

    setAudienceSize(finalValue);
    // Sync input field *after* validation/bounding
    setAudienceInput(finalValue.toString());
  }

  function updateInventorySize(value) {
    const numericValue = parseInt(value, 10);

    if (isNaN(numericValue)) {
      setInventoryInput(inventorySize.toString());
      return;
    }

    // Apply bounds used for calculation
    let finalValue = Math.max(
      INVENTORY_LOWER_BOUND,
      Math.min(INVENTORY_UPPER_BOUND, numericValue)
    );

    setInventorySize(finalValue);
    // Sync input field *after* validation/bounding
    setInventoryInput(finalValue.toString());
  }

  // --- Input Field Handlers ---
  const handleAudienceInputChange = (e) => {
    setAudienceInput(e.target.value);
  };

  const handleInventoryInputChange = (e) => {
    setInventoryInput(e.target.value);
  };

  const commitAudienceChange = () => {
    updateAudienceSize(audienceInput);
  };

  const commitInventoryChange = () => {
    updateInventorySize(inventoryInput);
  };

  const handleAudienceKeyDown = (e) => {
    if (e.key === "Enter") {
      commitAudienceChange();
      e.target.blur();
    }
  };

  const handleInventoryKeyDown = (e) => {
    if (e.key === "Enter") {
      commitInventoryChange();
      e.target.blur();
    }
  };

  // --- Effects to Sync Inputs from State (e.g., slider changes) ---
  useEffect(() => {
    // Only update input if it differs from the validated state string representation
    if (audienceInput !== audienceSize.toString()) {
      setAudienceInput(audienceSize.toString());
    }
  }, [audienceSize]);

  useEffect(() => {
    // Only update input if it differs from the validated state string representation
    if (inventoryInput !== inventorySize.toString()) {
      setInventoryInput(inventorySize.toString());
    }
  }, [inventorySize]);

  // --- Chart Data and Options ---
  const chartData = useMemo(() => {
    // Map estimatedCosts to chart series data, using min_cost
    // Order must match xaxis categories: Shopify, WooCommerce, Your Custom Store
    const shopifyCost =
      estimatedCosts.find((c) => c.platform === "Shopify")?.min_cost ?? 0;
    const wooCost =
      estimatedCosts.find((c) => c.platform === "WooCommerce (AWS)")
        ?.min_cost ?? 0;
    // Map Medusa JS to 'Your Custom Store'
    const customCost =
      estimatedCosts.find((c) => c.platform === "Medusa JS (AWS)")?.min_cost ??
      0;

    // Handle potential Infinity values for display (though min_cost shouldn't be Infinity here)
    // If using max_cost, this would be more important. Example:
    // const capInfinity = (cost) => (cost === Infinity ? 30000 : cost); // Cap at 30k for chart

    return [
      Math.round(shopifyCost), // Use Math.round for cleaner bars
      Math.round(wooCost),
      Math.round(customCost),
    ];
  }, [estimatedCosts]); // Recalculate chart data only when estimatedCosts changes

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
        animations: {
          // Move animations here
          enabled: true,
          easing: "easeinout",
          speed: 500, // Slightly faster might feel better
          animateGradually: {
            enabled: false, // Gradual animation might look weird with changing data
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: "60%",
          // endingShape: "rounded", // Use borderRadius instead
          distributed: true, // Color per bar
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
      },
      // Series data is now managed outside this memoized object
      xaxis: {
        categories: ["Shopify", "WooCommerce", "Your Custom Store"],
        labels: {
          style: {
            fontSize: "12px",
            fontFamily: "inherit", // Inherit font
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
            fontFamily: "inherit",
            fontWeight: 600,
            colors: "#333",
          },
        },
        labels: {
          formatter: function (val) {
            // Format Y-axis labels as currency
            return "$" + val.toLocaleString();
          },
          style: {
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 500,
            colors: "#333",
          },
        },
      },
      fill: {
        type: "solid",
        // Match colors from original options if specific
        colors: ["#b39ae9", "#b39ae9", "#6e18ef"], // Example: Shopify, Woo, Custom
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val.toLocaleString(); // Format tooltip value
          },
        },
        style: {
          fontSize: "12px",
          fontFamily: "inherit",
        },
      },
      states: {
        hover: {
          filter: {
            type: "lighten",
            value: 0.05, // Less intense hover
          },
        },
        active: {
          // Define active state (when clicking a bar, if needed)
          filter: {
            type: "darken",
            value: 0.9,
          },
        },
      },
      grid: {
        // Add subtle grid lines
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // Zebra stripes
          opacity: 0.5,
        },
      },
      // Removed animations from here as they are now under chart options
      // dropShadow: { // Optional: Keep or remove based on preference
      //     enabled: true,
      //     top: 3,
      //     left: 0,
      //     blur: 4,
      //     opacity: 0.2,
      // },
    }),
    []
  ); // Chart options (styles, labels etc.) don't depend on data, so empty dependency array

  // --- Calculations ---
  // TODO: Make savings dynamic based on calculated costs
  const calculateSavings = () => {
    const shopifyCost = chartData[0];
    const customCost = chartData[2];

    if (shopifyCost > 0 && customCost < shopifyCost) {
      const savings = ((shopifyCost - customCost) / shopifyCost) * 100;
      return Math.round(savings); // Return rounded percentage
    }
    return 0; // Default to 0 if no savings or invalid data
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
                      Estimate Your Costs 👋
                    </span>
                  </div>
                  <h1 className="custom-pricing-headline">
                    Save a big portion of your revenue as you grow
                  </h1>
                  {/* Audience Size Input & Slider */}
                  <div className="custom-range-slider-container">
                    <div className="custom-range-slider-label">
                      <label htmlFor="audience-input">Audience Size / mo</label>
                      <input
                        id="audience-input"
                        type="number"
                        value={audienceInput}
                        onChange={handleAudienceInputChange}
                        onBlur={commitAudienceChange}
                        onKeyDown={handleAudienceKeyDown}
                        min={AUDIENCE_LOWER_BOUND} // Min for direct input validation hint
                        max={AUDIENCE_UPPER_BOUND} // Max for direct input validation hint
                        step={100}
                        placeholder="e.g. 40000"
                      />
                    </div>
                    <CustomRangeSlider
                      min={AUDIENCE_MIN_SLIDER}
                      max={AUDIENCE_MAX_SLIDER}
                      step={100} // Adjust step for smoother sliding if needed
                      value={audienceSize}
                      onChange={(value) => updateAudienceSize(value)} // Slider directly updates main state
                    />
                  </div>
                  {/* Inventory Size Input & Slider */}
                  <div className="custom-range-slider-container">
                    <div className="custom-range-slider-label">
                      <label htmlFor="inventory-input">
                        Inventory Size (SKUs)
                      </label>
                      <input
                        id="inventory-input"
                        type="number"
                        value={inventoryInput}
                        onChange={handleInventoryInputChange}
                        onBlur={commitInventoryChange}
                        onKeyDown={handleInventoryKeyDown}
                        min={INVENTORY_LOWER_BOUND} // Min for direct input validation hint
                        max={INVENTORY_UPPER_BOUND} // Max for direct input validation hint
                        step={10} // Maybe smaller step for inventory
                        placeholder="e.g. 2000"
                      />
                    </div>
                    <CustomRangeSlider
                      min={INVENTORY_MIN_SLIDER}
                      max={INVENTORY_MAX_SLIDER}
                      step={50} // Adjust step for smoother sliding if needed
                      value={inventorySize}
                      onChange={(value) => updateInventorySize(value)} // Slider directly updates main state
                    />
                  </div>
                </div>

                <div className="custom-pricing-savings-area">
                  {/* Conditional rendering based on calculated savings */}
                  {savingsPercentage > 0 ? (
                    <>
                      <span className="custom-pricing-savings-percentage">
                        {savingsPercentage}%
                      </span>
                      <p className="custom-pricing-savings-label">
                        Estimated Savings vs Shopify
                      </p>
                    </>
                  ) : (
                    <p className="custom-pricing-savings-label">
                      Adjust sliders to estimate savings
                    </p>
                  )}
                </div>
              </div>

              {/* Chart Column */}
              <div className="custom-pricing-chart-col">
                {" "}
                {/* Added a class for potential styling */}
                {/* Conditional rendering prevents chart flash on server/initial load */}
                {typeof window !== "undefined" && chartData.length > 0 && (
                  <Chart
                    options={chartOptions}
                    // Pass series dynamically here
                    series={[{ name: "Estimated Cost", data: chartData }]}
                    type="bar"
                    height={420} // Adjust height as needed
                    width="100%" // Make width responsive
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="space30"></div> {/* Add spacing below card */}
      </div>
    </div>
  );
}
