export const scoringRules = {
    compulsoryRoutine: {
      baseQualityScore: 7.0,
      basePerformanceScore: 3.0,
      maxScore: 10.0
    },
    optionalRoutine: {
      baseQualityScore: 5.0,
      basePerformanceScore: 3.0,
      difficultyScore: 2.0,
      maxScore: 10.0
    },
    timeRequirements: {
      junior: { min: 70, max: 85 }, // seconds
      adult: { min: 80, max: 95 }
    }
  };
  