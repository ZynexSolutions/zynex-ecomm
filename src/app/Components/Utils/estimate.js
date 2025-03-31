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
 *                              {platform: 'Shopify', min_cost: 149, max_cost: 455, notes: ''},
 *                              {platform: 'WooCommerce (AWS)', min_cost: 110, max_cost: 290, notes: ''},
 *                              {platform: 'Medusa JS (AWS)', min_cost: 160, max_cost: 330, notes: ''}
 *                          ]
 *                          The 'max_cost' will be set to Infinity if the document indicated '+'.
 */
function estimateEcommerceCosts(user_count, inventory_size) {
    const results = [];
    const plusNote = "Upper range can be significantly higher ('+' in source).";

    // --- Shopify Cost Estimation (Based on Table 1 logic) ---
    let shopifyMin = 0;
    let shopifyMax = 0;
    let shopifyNote = "";

    if (user_count <= 100) {
        // Corresponds roughly to 10 inventory -> Basic Plan
        [shopifyMin, shopifyMax] = [39, 119];
    } else if (user_count <= 1000) {
        // Corresponds roughly to 100 inventory -> Shopify Plan
        [shopifyMin, shopifyMax] = [149, 455];
    } else if (user_count <= 10000) {
        // Corresponds roughly to 1,000 inventory -> Advanced Plan
        [shopifyMin, shopifyMax] = [949, 2899];
    } else { // user_count > 10000
        // Corresponds roughly to 10,000 inventory -> Shopify Plus
        [shopifyMin, shopifyMax] = [7800, Infinity];
        shopifyNote = plusNote;
    }

    // Heuristic adjustment for inventory mismatch
    if (user_count <= 100 && inventory_size > 100) { // Small users, large inventory
        shopifyMin = Math.max(shopifyMin, 149); // Likely needs apps pushing cost towards next tier
        shopifyMax = shopifyMax !== Infinity ? Math.max(shopifyMax, 455) : Infinity;
    } else if (user_count <= 1000 && inventory_size > 1000) { // Medium users, large inventory
        shopifyMin = Math.max(shopifyMin, 949);
        shopifyMax = shopifyMax !== Infinity ? Math.max(shopifyMax, 2899) : Infinity;
    } else if (user_count <= 10000 && inventory_size > 10000) { // Large users, very large inventory
        shopifyMin = Math.max(shopifyMin, 7800);
        shopifyMax = Infinity; // Definitely pushes into Plus territory / higher app costs
        shopifyNote = plusNote;
    }

    results.push({
        platform: 'Shopify',
        min_cost: shopifyMin,
        max_cost: shopifyMax,
        notes: shopifyNote
    });

    // --- WooCommerce on AWS Cost Estimation (Based on Table 2 logic) ---
    let wooMin = 0;
    let wooMax = 0;
    let wooNote = "";

    if (user_count <= 100) {
        // Corresponds roughly to 10 inventory
        [wooMin, wooMax] = [35, 90];
    } else if (user_count <= 1000) {
        // Corresponds roughly to 100 inventory
        [wooMin, wooMax] = [110, 290];
    } else if (user_count <= 10000) {
        // Corresponds roughly to 1,000 inventory
        [wooMin, wooMax] = [320, 760];
    } else { // user_count > 10000
        // Corresponds roughly to 10,000 inventory
        [wooMin, wooMax] = [840, Infinity];
        wooNote = plusNote;
    }

    // Heuristic adjustment for inventory mismatch (AWS costs sensitive to storage/DB size)
    if (user_count <= 100 && inventory_size > 100) {
        wooMin = Math.max(wooMin, 110); // Higher AWS/plugin costs expected
        wooMax = wooMax !== Infinity ? Math.max(wooMax, 290) : Infinity;
    } else if (user_count <= 1000 && inventory_size > 1000) {
        wooMin = Math.max(wooMin, 320);
        wooMax = wooMax !== Infinity ? Math.max(wooMax, 760) : Infinity;
    } else if (user_count <= 10000 && inventory_size > 10000) {
        wooMin = Math.max(wooMin, 840);
        wooMax = Infinity; // Higher tier AWS resources likely needed
        wooNote = plusNote;
    }

    results.push({
        platform: 'WooCommerce (AWS)',
        min_cost: wooMin,
        max_cost: wooMax,
        notes: wooNote
    });

    // --- Medusa JS on AWS Cost Estimation (Based on Table 3 logic) ---
    let medusaMin = 0;
    let medusaMax = 0;
    let medusaNote = "";

    if (user_count <= 100) {
        // Corresponds roughly to 10 inventory
        [medusaMin, medusaMax] = [60, 125];
    } else if (user_count <= 1000) {
        // Corresponds roughly to 100 inventory
        [medusaMin, medusaMax] = [160, 330];
    } else if (user_count <= 10000) {
        // Corresponds roughly to 1,000 inventory
        [medusaMin, medusaMax] = [430, 920];
    } else { // user_count > 10000
        // Corresponds roughly to 10,000 inventory
        [medusaMin, medusaMax] = [1200, Infinity];
        medusaNote = plusNote;
    }

    // Heuristic adjustment for inventory mismatch (AWS costs sensitive to storage/DB size)
    if (user_count <= 100 && inventory_size > 100) {
        medusaMin = Math.max(medusaMin, 160); // Higher AWS costs expected
        medusaMax = medusaMax !== Infinity ? Math.max(medusaMax, 330) : Infinity;
    } else if (user_count <= 1000 && inventory_size > 1000) {
        medusaMin = Math.max(medusaMin, 430);
        medusaMax = medusaMax !== Infinity ? Math.max(medusaMax, 920) : Infinity;
    } else if (user_count <= 10000 && inventory_size > 10000) {
        medusaMin = Math.max(medusaMin, 1200);
        medusaMax = Infinity; // Higher tier AWS resources needed
        medusaNote = plusNote;
    }

    results.push({
        platform: 'Medusa JS (AWS)',
        min_cost: medusaMin,
        max_cost: medusaMax,
        notes: medusaNote
    });

    // Final formatting (apply Math.ceil to non-infinite costs)
    results.forEach(result => {
        // Always ceil min_cost
        result.min_cost = Math.ceil(result.min_cost);
        // Only ceil max_cost if it's not Infinity
        if (result.max_cost !== Infinity) {
            result.max_cost = Math.ceil(result.max_cost);
        }
    });

    return results;
}

// --- Helper function for Example Usage Formatting ---
function formatCostOutput(cost) {
    let maxCostStr;
    // Use known upper bounds from document examples when Infinity is the calculated max
    if (cost.max_cost === Infinity) {
        if (cost.platform === 'Shopify') maxCostStr = "24300+";
        else if (cost.platform === 'WooCommerce (AWS)') maxCostStr = "2100+";
        else if (cost.platform === 'Medusa JS (AWS)') maxCostStr = "2750+";
        else maxCostStr = "N/A+"; // Generic fallback if somehow another platform ended up Infinity
    } else {
        maxCostStr = `${cost.max_cost}`;
    }
    // Ensure notes string is not undefined/null before appending
    const notesString = cost.notes ? ` ${cost.notes}` : "";
    return `  - ${cost.platform}: $${cost.min_cost} - $${maxCostStr} per month${notesString}`;
}