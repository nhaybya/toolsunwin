import { Prediction, TrendAnalysis, PatternAnalysis, PatternType, Strategy, PredictionType } from '../types';

export function calculateTrend(numbers: number[]): TrendAnalysis {
  const firstHalf = numbers.slice(0, 3);
  const secondHalf = numbers.slice(-3);
  
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  
  const difference = secondAvg - firstAvg;
  const strength = Math.abs(difference) / 3;
  
  return {
    direction: difference > 0 ? 'up' : 'down',
    strength: Math.min(strength, 1)
  };
}

export function calculateVolatility(numbers: number[]): number {
  let diffs = [];
  for (let i = 1; i < numbers.length; i++) {
    diffs.push(Math.abs(numbers[i] - numbers[i-1]));
  }
  return diffs.reduce((a, b) => a + b, 0) / diffs.length;
}

export function detectPatterns(numbers: number[]): PatternAnalysis {
  // Simple pattern detection
  const patterns: Record<PatternType, { confidence: number, description: string }> = {
    WAVE: { confidence: 20, description: 'Dao động ngắn hạn' },
    TRIANGLE: { confidence: 15, description: 'Tụ vào một khoảng hẹp' },
    CHANNEL: { confidence: 25, description: 'Dao động trong một phạm vi ổn định' }
  };
  
  const range = Math.max(...numbers) - Math.min(...numbers);
  const lastThree = numbers.slice(-3);
  const lastThreeRange = Math.max(...lastThree) - Math.min(...lastThree);
  
  let patternType: PatternType = 'WAVE';
  let confidence = 0;
  
  if (lastThreeRange <= 3) {
    patternType = 'TRIANGLE';
    confidence = patterns.TRIANGLE.confidence;
  } else if (range <= 5) {
    patternType = 'CHANNEL';
    confidence = patterns.CHANNEL.confidence;
  } else {
    patternType = 'WAVE';
    confidence = patterns.WAVE.confidence;
  }
  
  return {
    mainPattern: patternType,
    description: patterns[patternType].description,
    confidence
  };
}

export function calculateSpecialNumbers(numbers: number[], predictedType: PredictionType): {
  primary: number,
  secondary: number[],
  avoid: number[]
} {
  // Calculate mean and volatility
  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  const volatility = calculateVolatility(numbers);
  
  const result = {
    primary: 0,
    secondary: [] as number[],
    avoid: [] as number[]
  };
  
  if (predictedType === 'TÀI') {
    // For TÀI - focus on numbers 11-18
    result.primary = Math.round(Math.min(18, Math.max(11, mean + volatility)));
    
    // Secondary numbers
    result.secondary = [
      Math.min(18, Math.max(11, result.primary + 1)),
      Math.min(18, Math.max(11, result.primary - 1))
    ].filter(n => n !== result.primary);
    
    // Numbers to avoid
    result.avoid = [3, 4, 5, 6, 7, 8];
    
  } else {
    // For XỈU - focus on numbers 3-10
    result.primary = Math.round(Math.max(3, Math.min(10, mean - volatility)));
    
    // Secondary numbers
    result.secondary = [
      Math.max(3, Math.min(10, result.primary + 1)),
      Math.max(3, Math.min(10, result.primary - 1))
    ].filter(n => n !== result.primary);
    
    // Numbers to avoid
    result.avoid = [13, 14, 15, 16, 17, 18];
  }
  
  // Filter to ensure no duplicates and valid ranges
  result.secondary = [...new Set(result.secondary)];
  return result;
}

export function analyzePrediction(numbers: number[], strategy: Strategy): Prediction {
  // Calculate basic statistics
  const sum = numbers.reduce((a, b) => a + b, 0);
  const average = sum / numbers.length;
  const trend = calculateTrend(numbers);
  const volatility = calculateVolatility(numbers);
  const patterns = detectPatterns(numbers);
  
  // Determine TÀI or XỈU prediction
  // TÀI is >=11, XỈU is <=10
  let lastThree = numbers.slice(-3);
  let tailCount = lastThree.filter(n => n >= 11).length;
  let xiuCount = lastThree.filter(n => n <= 10).length;
  
  // Base prediction on trend and recent pattern
  let predictedType: PredictionType;
  let confidence: number;
  
  // Strategy adjustments
  let strategyFactor = 0;
  
  switch(strategy) {
    case 'aggressive':
      strategyFactor = 0.2; // More likely to suggest opposite of trend
      break;
    case 'conservative':
      strategyFactor = -0.1; // More likely to follow trend
      break;
    default:
      strategyFactor = 0; // Balanced
  }
  
  // Calculate confidence and prediction
  if (trend.direction === 'up' && trend.strength > (0.5 + strategyFactor)) {
    predictedType = 'TÀI';
    confidence = Math.round(60 + trend.strength * 20);
  } else if (trend.direction === 'down' && trend.strength > (0.5 + strategyFactor)) {
    predictedType = 'XỈU';
    confidence = Math.round(60 + trend.strength * 20);
  } else if (tailCount > xiuCount) {
    // Pattern interruption - suggest opposite
    predictedType = 'XỈU';
    confidence = Math.round(50 + (tailCount - xiuCount) * 10);
  } else if (xiuCount > tailCount) {
    predictedType = 'TÀI';
    confidence = Math.round(50 + (xiuCount - tailCount) * 10);
  } else {
    // If tied, use average as tiebreaker
    predictedType = average >= 10.5 ? 'TÀI' : 'XỈU';
    confidence = 55;
  }
  
  // Further confidence adjustment based on pattern recognition
  confidence = Math.min(confidence + patterns.confidence, 95);
  
  // Calculate special numbers for the prediction
  const specialNumbers = calculateSpecialNumbers(numbers, predictedType);
  
  return {
    type: predictedType,
    confidence,
    primaryNumber: specialNumbers.primary,
    secondaryNumbers: specialNumbers.secondary,
    avoid: specialNumbers.avoid,
    pattern: patterns.mainPattern,
    patternDescription: patterns.description
  };
}
