/**
 * Calculate final score
 * @param {number} qualityScore 
 * @param {number} performanceScore 
 * @returns {number}
 */
export function calculateFinalScore(qualityScore: number, performanceScore: number) {
    const total = qualityScore + performanceScore;
    return Math.max(0, total);
  }

/**
 * Calculate quality score from base and deductions
 * @param {number} baseScore - Base quality score (7.0 for compulsory)
 * @param {number} totalDeductions - Sum of all deductions
 * @returns {number}
 */
export function calculateQualityScore(baseScore: number, totalDeductions: number) {
    return Math.max(0, baseScore - totalDeductions);
  }
  