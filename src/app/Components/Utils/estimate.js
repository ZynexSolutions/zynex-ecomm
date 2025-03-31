/**
 * Estimates the monthly cost range for Shopify, WooCommerce (on AWS),
 * and Medusa JS (on AWS) based on user count and inventory size.
 *
 * This function uses the cost brackets provided in the analysis document (implicit).
 * It primarily uses user count to determine the scale bracket, as the
 * tables in the document correlate user count and inventory size for
 * their examples.
 *
 * Note: These are rough estimates based on the provided document's tables.
 * Actual costs can vary significantly based on specific configurations,
 * app/plugin choices, transaction volumes, actual resource usage on AWS,
 * data transfer, and technical management required. The '+' in the
 * document's upper range indicates costs could be higher than the stated maximum.
 *
 * @param {number} user_count Estimated number of monthly users.
 * @param {number} inventory_size Estimated number of distinct inventory items (SKUs).
 * @returns {Array<Object>} An array containing objects, each representing a platform
 *                          and its estimated minimum and maximum monthly cost.
 *                          Example:
 *                          [
/**
 * Estimates the monthly cost range for Shopify, WooCommerce (on AWS),
 * and Medusa JS (on AWS) based on user count and inventory size.
 * Incorporates linear scaling within brackets and ensures Woo > Custom cost.
 *
 * Note: These are rough estimates. Scaling factors are illustrative.
 * Actual costs depend heavily on specific usage, configuration, and choices.
 *
 * @param {number} user_count Estimated number of monthly users.
 * @param {number} inventory_size Estimated number of distinct inventory items (SKUs).
 * @returns {Array<Object>} An array containing objects with platform costs.
 */
export function estimateEcommerceCosts(user_count, inventory_size) {
    const results = [];
    const plusNote = "Upper range scales significantly and can be higher.";

    // --- Define Base Brackets & Scaling Factors (Illustrative Estimates) ---
    // [user_threshold, item_threshold, baseMin, baseMax, userFactorMin, itemFactorMin, userFactorMax, itemFactorMax]
    const shopifyBrackets = [
        // Basic Plan Level
        { threshold: 0, item_base: 0, baseMin: 39, baseMax: 119, uFMin: 0.01, iFMin: 0.1, uFMax: 0.02, iFMax: 0.5 }, // Slight scale for apps/txns
        // Shopify Plan Level
        { threshold: 100, item_base: 10, baseMin: 149, baseMax: 455, uFMin: 0.02, iFMin: 0.2, uFMax: 0.05, iFMax: 1.0 }, // Apps/Txns scale more
        // Advanced Plan Level
        { threshold: 1000, item_base: 100, baseMin: 949, baseMax: 2899, uFMin: 0.03, iFMin: 0.3, uFMax: 0.10, iFMax: 1.5 }, // Higher apps/txns/features
        // Shopify Plus Level (Base cost + Significant Scaling)
        { threshold: 10000, item_base: 1000, baseMin: 7800, baseMax: Infinity, uFMin: 0.05, iFMin: 0.4, uFMax: 0.15, iFMax: 2.0 } // Base + scaling for apps/txns/support
    ];

    const wooBrackets = [
        { threshold: 0, item_base: 0, baseMin: 35, baseMax: 90, uFMin: 0.02, iFMin: 0.01, uFMax: 0.04, iFMax: 0.05 }, // Basic AWS + plugins
        { threshold: 100, item_base: 10, baseMin: 110, baseMax: 290, uFMin: 0.03, iFMin: 0.02, uFMax: 0.07, iFMax: 0.10 }, // Slightly bigger AWS
        { threshold: 1000, item_base: 100, baseMin: 320, baseMax: 760, uFMin: 0.05, iFMin: 0.03, uFMax: 0.10, iFMax: 0.15 }, // Scaling AWS needs
        { threshold: 10000, item_base: 1000, baseMin: 840, baseMax: Infinity, uFMin: 0.07, iFMin: 0.05, uFMax: 0.15, iFMax: 0.25 } // Significant AWS scaling
    ];

    const medusaBrackets = [ // Medusa ("Your Custom Store")
        { threshold: 0, item_base: 0, baseMin: 60, baseMax: 125, uFMin: 0.01, iFMin: 0.01, uFMax: 0.03, iFMax: 0.04 }, // Basic AWS optimized
        { threshold: 100, item_base: 10, baseMin: 160, baseMax: 330, uFMin: 0.02, iFMin: 0.015, uFMax: 0.05, iFMax: 0.08 }, // Slightly bigger optimized AWS
        { threshold: 1000, item_base: 100, baseMin: 430, baseMax: 920, uFMin: 0.03, iFMin: 0.02, uFMax: 0.08, iFMax: 0.12 }, // Scaling optimized AWS
        { threshold: 10000, item_base: 1000, baseMin: 1200, baseMax: Infinity, uFMin: 0.04, iFMin: 0.03, uFMax: 0.12, iFMax: 0.20 } // Significant optimized AWS scaling
    ];

    // Helper to find the correct bracket
    const findBracket = (brackets, count) => {
        let selectedBracket = brackets[0];
        for (let i = brackets.length - 1; i >= 0; i--) {
            if (count >= brackets[i].threshold) {
                selectedBracket = brackets[i];
                break;
            }
        }
        return selectedBracket;
    };

    // Helper to calculate scaled cost
    const calculateCost = (bracket, userCount, inventoryCount) => {
        const excessUsers = Math.max(0, userCount - bracket.threshold);
        // Scale items based on the excess over the *bracket's assumed item base*
        const excessItems = Math.max(0, inventoryCount - bracket.item_base);

        let min_cost = bracket.baseMin + (excessUsers * bracket.uFMin) + (excessItems * bracket.iFMin);
        let max_cost = bracket.baseMax; // Start with base max

        if (max_cost !== Infinity) {
            // Apply scaling to the max cost as well, if it's not Infinity
            // Use potentially higher scaling factors for the upper range estimate
            max_cost += (excessUsers * bracket.uFMax) + (excessItems * bracket.iFMax);
            // Ensure max is never less than min after scaling
            max_cost = Math.max(min_cost, max_cost);
        } else {
            // If baseMax is Infinity, min cost still scales up
            // max_cost remains Infinity
        }

        return { min_cost, max_cost };
    };

    // --- Calculate Costs for each Platform ---
    const shopifyBracket = findBracket(shopifyBrackets, user_count);
    const wooBracket = findBracket(wooBrackets, user_count);
    const medusaBracket = findBracket(medusaBrackets, user_count);

    let { min_cost: shopifyMin, max_cost: shopifyMax } = calculateCost(shopifyBracket, user_count, inventory_size);
    let { min_cost: wooMin, max_cost: wooMax } = calculateCost(wooBracket, user_count, inventory_size);
    let { min_cost: medusaMin, max_cost: medusaMax } = calculateCost(medusaBracket, user_count, inventory_size);

    let shopifyNote = shopifyMax === Infinity ? plusNote : "";
    let wooNote = wooMax === Infinity ? plusNote : "";
    let medusaNote = medusaMax === Infinity ? plusNote : "";


    // --- Apply Business Rule: WooCommerce Cost >= 110% of Medusa Cost ---
    const minWooTarget = medusaMin * 1.10;
    if (wooMin < minWooTarget) {
        const adjustment = minWooTarget - wooMin;
        wooMin = minWooTarget;
        // Also adjust wooMax proportionally upwards if it's not Infinity
        if (wooMax !== Infinity) {
            // Adjust max by at least the same amount, maybe more proportionally
            // Simple approach: add the same difference.
            wooMax += adjustment;
            // Ensure max is still >= min
            wooMax = Math.max(wooMin, wooMax);
        }
        wooNote += " (Adjusted to be >10% higher than Custom)";
    }

    // Ensure Woo Max is Infinity if Medusa Max is, for the highest bracket
    if (medusaMax === Infinity && wooBracket.threshold === medusaBracket.threshold && wooMax !== Infinity) {
        // If they are in the same highest bracket based on user count
        wooMax = Infinity;
        wooNote = plusNote + (wooNote.includes("Adjusted") ? " (Adjusted...)" : ""); // Combine notes
    }


    // --- Format Results ---
    results.push({
        platform: 'Shopify',
        min_cost: Math.ceil(shopifyMin),
        max_cost: shopifyMax === Infinity ? Infinity : Math.ceil(shopifyMax),
        notes: shopifyNote.trim()
    });

    results.push({
        platform: 'WooCommerce (AWS)',
        min_cost: Math.ceil(wooMin),
        max_cost: wooMax === Infinity ? Infinity : Math.ceil(wooMax),
        notes: wooNote.trim()
    });

    results.push({ // Represents "Your Custom Store"
        platform: 'Medusa JS (AWS)',
        min_cost: Math.ceil(medusaMin),
        max_cost: medusaMax === Infinity ? Infinity : Math.ceil(medusaMax),
        notes: medusaNote.trim()
    });

    return results;
}


// --- Example Usage Formatting (No change needed from previous version) ---
function formatCostOutput(cost) {
    let maxCostStr;
    if (cost.max_cost === Infinity) {
        // Use indicative upper bounds if available, or generic '+'
        // These could be dynamically estimated too, but for simplicity:
        if (cost.platform === 'Shopify') maxCostStr = `${Math.ceil(cost.min_cost * 2.5)}+`; // Example scaling for display
        else if (cost.platform === 'WooCommerce (AWS)') maxCostStr = `${Math.ceil(cost.min_cost * 2.0)}+`; // Example scaling
        else if (cost.platform === 'Medusa JS (AWS)') maxCostStr = `${Math.ceil(cost.min_cost * 1.8)}+`; // Example scaling
        else maxCostStr = `${cost.min_cost}+`;
    } else {
        maxCostStr = `${cost.max_cost}`;
    }
    const notesString = cost.notes ? ` (${cost.notes})` : ""; // Wrap notes in parens
    return `  - ${cost.platform}: $${cost.min_cost} - $${maxCostStr} per month${notesString}`;
}
