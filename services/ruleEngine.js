// Legacy file - re-exports from modular rule engine
// All logic has been moved to services/ruleEngine/ for better organization

const { 
  analyzeChart, 
  analyzeChartForQuestion 
} = require("./ruleEngine/index");

// Export with original function names for backward compatibility
exports.analyzeChart = analyzeChart;
exports.analyzeChartForQuestion = analyzeChartForQuestion;