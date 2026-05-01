import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Add this import
import { useData } from '../Utils/DataContext';

export default function Dashboard() {
  const navigation = useNavigation(); // Add this hook
  const { expenses, spendingGoal, savingsGoal, currentSavings } = useData();
  
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = spendingGoal - totalSpent;
  const spentPercent = spendingGoal > 0 ? (totalSpent / spendingGoal) * 100 : 0;
  
  // Savings calculations with proper logic
  const savingsPercent = savingsGoal > 0 ? (currentSavings / savingsGoal) * 100 : 0;
  const savingsDifference = currentSavings - savingsGoal; // Positive = extra saved, Negative = still need to save
  const isGoalExceeded = currentSavings >= savingsGoal;
  
  // Colors based on progress
  const spentColor = spentPercent > 80 ? '#F44336' : spentPercent > 50 ? '#FF9800' : '#4CAF50';
  const saveColor = isGoalExceeded ? '#4CAF50' : savingsPercent > 40 ? '#FF9800' : '#F44336';

  // Function to navigate to Savings screen
  const goToSavingsScreen = () => {
    navigation.navigate('Save'); // 'Save' is the name you used in Tab.Navigator
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💰 Expense Tracker</Text>
        <Text style={styles.headerSub}>Track your spending</Text>
      </View>

      {/* Spending Progress */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Monthly Spending</Text>
          <TouchableOpacity onPress={goToSavingsScreen}>
            <Text style={styles.editText}>Edit Goal</Text>
          </TouchableOpacity>
        </View>
        
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { 
            width: `${Math.min(spentPercent, 100)}%`, 
            backgroundColor: spentColor 
          }]} />
        </View>
        
        <View style={styles.progressRow}>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Spent</Text>
            <Text style={styles.progressValue}>${totalSpent.toFixed(2)}</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Remaining</Text>
            <Text style={[styles.progressValue, { 
              color: remainingBudget >= 0 ? '#4CAF50' : '#F44336' 
            }]}>
              ${remainingBudget.toFixed(2)}
            </Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Budget</Text>
            <Text style={styles.progressValue}>${spendingGoal}</Text>
          </View>
        </View>
      </View>

      {/* Quick Stats - Simple 2x2 grid */}
      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <View style={[styles.statBox, {backgroundColor: '#4CAF50'}]}>
            <Text style={styles.statNumber}>{expenses.length}</Text>
            <Text style={styles.statLabel}>Expenses</Text>
          </View>
          
          <View style={[styles.statBox, {backgroundColor: '#FF9800'}]}>
            <Text style={styles.statNumber}>${totalSpent.toFixed(0)}</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </View>
        </View>
        
        <View style={styles.statRow}>
          <View style={[styles.statBox, {backgroundColor: '#2196F3'}]}>
            <Text style={styles.statNumber}>${currentSavings}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          
          <View style={[styles.statBox, {backgroundColor: '#9C27B0'}]}>
            <Text style={styles.statNumber}>${spendingGoal}</Text>
            <Text style={styles.statLabel}>Budget</Text>
          </View>
        </View>
      </View>

      {/* Savings Progress Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Savings Progress</Text>
          <TouchableOpacity onPress={goToSavingsScreen}>
            <Text style={styles.editText}>Edit Goal</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { 
            width: `${Math.min(savingsPercent, 100)}%`, 
            backgroundColor: saveColor 
          }]} />
        </View>
        
        <View style={styles.progressRow}>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Saved</Text>
            <Text style={styles.progressValue}>${currentSavings}</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>
              {isGoalExceeded ? 'Extra Saved' : 'Remaining'}
            </Text>
            <Text style={[styles.progressValue, { 
              color: isGoalExceeded ? '#4CAF50' : '#F44336' 
            }]}>
              {isGoalExceeded ? 
                `+$${Math.abs(savingsDifference).toFixed(0)}` : 
                `$${Math.abs(savingsDifference).toFixed(0)}`
              }
            </Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Goal</Text>
            <Text style={styles.progressValue}>${savingsGoal}</Text>
          </View>
        </View>
        
        {/* Success message when goal is exceeded */}
        {isGoalExceeded && (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>🎉 Goal Exceeded! Well done!</Text>
            <Text style={styles.successSubText}>
              You saved ${Math.abs(savingsDifference).toFixed(2)} more than your goal!
            </Text>
          </View>
        )}
        
        {/* Progress message when close to goal */}
        {!isGoalExceeded && savingsPercent >= 80 && (
          <View style={styles.nearGoalContainer}>
            <Text style={styles.nearGoalText}>📈 Almost there! {savingsPercent.toFixed(0)}% complete</Text>
          </View>
        )}
      </View>

      {/* Recent Expenses */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Expenses</Text>
        
        {expenses.length > 0 ? (
          expenses.slice(-3).reverse().map((item) => (
            <View key={item.id} style={styles.expenseItem}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseDesc}>{item.desc}</Text>
                <Text style={styles.expenseDate}>{item.date}</Text>
              </View>
              <Text style={styles.expenseAmount}>-${item.amount.toFixed(2)}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noExpenses}>No expenses yet. Add your first expense!</Text>
        )}
      </View>
      
      {/* Padding at bottom */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

// Keep all your styles the same...
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f7',
  },
  header: { 
    backgroundColor: '#2196F3', 
    padding: 25,
    paddingTop: 40,
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20,
    marginBottom: 15,
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: 'white',
    marginBottom: 5,
  },
  headerSub: { 
    fontSize: 16, 
    color: '#E3F2FD',
  },
  card: { 
    backgroundColor: 'white', 
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20, 
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333',
  },
  editText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  progressBar: { 
    height: 10, 
    backgroundColor: '#f0f0f0', 
    borderRadius: 5, 
    overflow: 'hidden',
    marginBottom: 15,
  },
  progressFill: { 
    height: '100%', 
    borderRadius: 5,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  progressValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statsContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statBox: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  successContainer: {
    marginTop: 15,
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  successText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 14,
  },
  successSubText: {
    color: '#388E3C',
    fontSize: 12,
    marginTop: 3,
  },
  nearGoalContainer: {
    marginTop: 15,
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  nearGoalText: {
    color: '#FF9800',
    fontWeight: 'bold',
    fontSize: 14,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseDesc: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  expenseDate: {
    fontSize: 14,
    color: '#888',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44336',
  },
  noExpenses: {
    textAlign: 'center',
    color: '#999',
    padding: 20,
    fontSize: 16,
  },
  bottomPadding: {
    height: 30,
  },
});