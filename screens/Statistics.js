import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useData } from '../Utils/DataContext';

export default function Statistics() {
  const { expenses, spendingGoal } = useData();
  
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = spendingGoal - totalSpent;
  
  // Group by category
  const categoryData = {};
  
  expenses.forEach(item => {
    if (!categoryData[item.category]) {
      categoryData[item.category] = { 
        total: 0, 
        emoji: item.emoji
      };
    }
    categoryData[item.category].total += item.amount;
  });
  
  // Create categories array with percentages
  let categoriesArray = Object.keys(categoryData).map(key => ({
    name: key,
    amount: categoryData[key].total,
    emoji: categoryData[key].emoji,
    percentage: totalSpent > 0 ? ((categoryData[key].total / totalSpent) * 100).toFixed(1) : 0
  }));

  // Sort by amount (largest first)
  categoriesArray.sort((a, b) => b.amount - a.amount);

  // Define base colors for each category
  const baseColors = {
    'Food': '#FF9800',      // Orange
    'Transport': '#2196F3', // Blue
    'Shopping': '#E91E63',  // Pink
    'Bills': '#9C27B0',     // Purple
    'Entertainment': '#4CAF50', // Green
    'Other': '#607D8B'      // Gray
  };

  // Function to adjust color intensity based on percentage
  const getAdjustedColor = (categoryName, percentage) => {
    const baseColor = baseColors[categoryName] || '#757575';
    
    // Convert percentage to intensity (0-1)
    const intensity = percentage / 100;
    
    // Adjust color based on intensity
    // Higher percentage = darker/more saturated color
    if (categoryName === 'Food') {
      // For orange: increase saturation for higher percentages
      return intensity > 0.7 ? '#FF5722' : 
             intensity > 0.4 ? '#FF9800' : '#FFB74D';
    } else if (categoryName === 'Transport') {
      // For blue: darker blue for higher percentages
      return intensity > 0.7 ? '#1976D2' : 
             intensity > 0.4 ? '#2196F3' : '#64B5F6';
    } else if (categoryName === 'Shopping') {
      // For pink: darker pink for higher percentages
      return intensity > 0.7 ? '#C2185B' : 
             intensity > 0.4 ? '#E91E63' : '#F06292';
    } else if (categoryName === 'Bills') {
      // For purple: darker purple for higher percentages
      return intensity > 0.7 ? '#7B1FA2' : 
             intensity > 0.4 ? '#9C27B0' : '#BA68C8';
    } else if (categoryName === 'Entertainment') {
      // For green: darker green for higher percentages
      return intensity > 0.7 ? '#388E3C' : 
             intensity > 0.4 ? '#4CAF50' : '#81C784';
    } else {
      // For other: darker gray for higher percentages
      return intensity > 0.7 ? '#455A64' : 
             intensity > 0.4 ? '#607D8B' : '#90A4AE';
    }
  };

  // Add adjusted colors to categories array
  categoriesArray = categoriesArray.map(category => ({
    ...category,
    color: getAdjustedColor(category.name, parseFloat(category.percentage))
  }));

  // Function to render pie chart
  const renderPieChart = () => {
    if (categoriesArray.length === 0) {
      return (
        <View style={styles.emptyChart}>
          <Text style={styles.emptyChartText}>No expenses to display</Text>
        </View>
      );
    }

    let startAngle = 0;
    const chartSize = 220;
    const radius = chartSize / 2;
    const center = chartSize / 2;

    // Calculate segments
    const segments = categoriesArray.map((category) => {
      const angle = (category.amount / totalSpent) * 360;
      const endAngle = startAngle + angle;
      
      const segment = {
        color: category.color,
        startAngle,
        endAngle,
        angle,
        percentage: category.percentage
      };
      
      startAngle = endAngle;
      return segment;
    });

    return (
      <View style={styles.chartContainer}>
        <View style={styles.pieChartWrapper}>
          <View style={[styles.pieChart, { width: chartSize, height: chartSize }]}>
            {segments.map((segment, index) => (
              <View key={index} style={styles.chartSegment}>
                <View style={[styles.segment, { 
                  backgroundColor: segment.color,
                  transform: [
                    { rotate: `${segment.startAngle}deg` },
                  ]
                }]} />
              </View>
            ))}
            <View style={styles.chartCenter}>
              <Text style={styles.chartCenterText}>Total Spent</Text>
              <Text style={styles.chartCenterAmount}>${totalSpent.toFixed(2)}</Text>
            </View>
          </View>
        </View>
        
        {/* Legend with percentage indicators */}
        <View style={styles.legendContainer}>
          {categoriesArray.map((category, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={styles.legendLeft}>
                <View style={[styles.legendColor, { 
                  backgroundColor: category.color,
                  shadowColor: category.color,
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 3,
                }]} />
                <Text style={styles.legendEmoji}>{category.emoji}</Text>
                <Text style={styles.legendName}>{category.name}</Text>
              </View>
              <View style={styles.legendRight}>
                <View style={styles.percentageBarContainer}>
                  <View style={[styles.percentageBar, { 
                    width: `${category.percentage}%`,
                    backgroundColor: category.color 
                  }]} />
                </View>
                <Text style={styles.legendPercentage}>{category.percentage}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Calculate largest category
  const largestCategory = categoriesArray.length > 0 ? categoriesArray[0] : null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Statistics</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly Spending Overview</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Spent</Text>
            <Text style={styles.statValue}>${totalSpent.toFixed(2)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Budget</Text>
            <Text style={styles.statValue}>${spendingGoal}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Remaining</Text>
            <Text style={[styles.statValue, { 
              color: remainingBudget >= 0 ? '#4CAF50' : '#F44336' 
            }]}>
              ${remainingBudget.toFixed(2)}
            </Text>
          </View>
        </View>
        
        {/* Largest spending category */}
        {largestCategory && (
          <View style={styles.largestCategoryContainer}>
            <Text style={styles.largestCategoryTitle}>🏆 Largest Spending Category</Text>
            <View style={styles.largestCategoryRow}>
              <View style={styles.largestCategoryLeft}>
                <Text style={styles.largestCategoryEmoji}>{largestCategory.emoji}</Text>
                <Text style={styles.largestCategoryName}>{largestCategory.name}</Text>
              </View>
              <View style={styles.largestCategoryRight}>
                <Text style={styles.largestCategoryAmount}>${largestCategory.amount.toFixed(2)}</Text>
                <Text style={styles.largestCategoryPercentage}>{largestCategory.percentage}% of total</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Spending Distribution</Text>
        <Text style={styles.cardSubtitle}>Color intensity shows percentage share</Text>
        
        {renderPieChart()}
        
        {/* Detailed breakdown */}
        <View style={styles.breakdownContainer}>
          <Text style={styles.breakdownTitle}>Detailed Breakdown</Text>
          {categoriesArray.map((category, index) => (
            <View key={index} style={[
              styles.breakdownItem,
              index === 0 && styles.topSpendingItem
            ]}>
              <View style={styles.breakdownLeft}>
                <View style={[styles.breakdownColorDot, { backgroundColor: category.color }]} />
                <View>
                  <Text style={styles.breakdownCategoryName}>
                    {category.emoji} {category.name}
                  </Text>
                  <Text style={styles.breakdownCategoryInfo}>
                    {category.percentage}% of total spending
                  </Text>
                </View>
              </View>
              <View style={styles.breakdownRight}>
                <Text style={styles.breakdownAmount}>${category.amount.toFixed(2)}</Text>
                <View style={styles.intensityIndicator}>
                  <Text style={styles.intensityText}>
                    {parseFloat(category.percentage) > 50 ? 'High' : 
                     parseFloat(category.percentage) > 25 ? 'Medium' : 'Low'}
                  </Text>
                  <View style={[
                    styles.intensityDot,
                    { 
                      backgroundColor: category.color,
                      opacity: parseFloat(category.percentage) / 100 + 0.3
                    }
                  ]} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f7', 
    padding: 15 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#333' 
  },
  card: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    color: '#333' 
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  largestCategoryContainer: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  largestCategoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  largestCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  largestCategoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  largestCategoryEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  largestCategoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  largestCategoryRight: {
    alignItems: 'flex-end',
  },
  largestCategoryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
    marginBottom: 2,
  },
  largestCategoryPercentage: {
    fontSize: 12,
    color: '#666',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pieChartWrapper: {
    position: 'relative',
    marginBottom: 25,
  },
  pieChart: {
    borderRadius: 110,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  chartSegment: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  segment: {
    width: '50%',
    height: '100%',
    position: 'absolute',
    left: '50%',
    transformOrigin: '0% 50%',
  },
  chartCenter: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    marginLeft: -45,
    marginTop: -45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  chartCenterText: {
    fontSize: 12,
    color: '#666',
  },
  chartCenterAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  legendContainer: {
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  legendEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  legendName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  legendRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageBarContainer: {
    width: 60,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginRight: 10,
    overflow: 'hidden',
  },
  percentageBar: {
    height: '100%',
    borderRadius: 3,
  },
  legendPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 40,
    textAlign: 'right',
  },
  emptyChart: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyChartText: {
    color: '#999',
    fontSize: 16,
  },
  breakdownContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  topSpendingItem: {
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  breakdownColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  breakdownCategoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  breakdownCategoryInfo: {
    fontSize: 12,
    color: '#666',
  },
  breakdownRight: {
    alignItems: 'flex-end',
  },
  breakdownAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  intensityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  intensityText: {
    fontSize: 11,
    color: '#666',
    marginRight: 5,
    fontWeight: '500',
  },
  intensityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});