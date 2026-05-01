import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useData } from '../Utils/DataContext';

export default function Savings() {
  const [newGoal, setNewGoal] = useState('');
  const [addAmount, setAddAmount] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const { spendingGoal, savingsGoal, currentSavings, setSpendingGoal, setSavingsGoal, addToSavings } = useData();
  
  const progressPercent = (currentSavings / savingsGoal) * 100;
  const progressColor = progressPercent > 70 ? '#4CAF50' : progressPercent > 40 ? '#FF9800' : '#F44336';
  
  const handleSetSavingsGoal = () => {
    if (newGoal) {
      setSavingsGoal(parseInt(newGoal));
      alert('Savings goal updated!');
      setNewGoal('');
    }
  };
  
  const handleSetBudgetGoal = () => {
    if (newBudget) {
      setSpendingGoal(parseInt(newBudget));
      alert('Monthly budget updated!');
      setNewBudget('');
    }
  };
  
  const handleAddSavings = () => {
    if (addAmount) {
      addToSavings(parseFloat(addAmount));
      alert(`Added $${addAmount} to savings!`);
      setAddAmount('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💰 Goals & Savings</Text>
      
      {/* Current Status */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Status</Text>
        <View style={styles.statusRow}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Monthly Budget</Text>
            <Text style={styles.statusValue}>${spendingGoal}</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Savings Goal</Text>
            <Text style={styles.statusValue}>${savingsGoal}</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Current Savings</Text>
            <Text style={styles.statusValue}>${currentSavings}</Text>
          </View>
        </View>
      </View>
      
      {/* Savings Progress */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Savings Progress</Text>
        <Text style={styles.subText}>Goal: ${savingsGoal}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min(progressPercent, 100)}%`, backgroundColor: progressColor }]} />
          </View>
          <Text style={styles.progressText}>{progressPercent.toFixed(0)}% Complete</Text>
        </View>
        
        {progressPercent >= 100 && (
          <Text style={styles.successText}>🎉 Congratulations! Goal reached!</Text>
        )}
      </View>
      
      {/* Set Monthly Budget */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Set Monthly Budget</Text>
        <Text style={styles.subText}>Your spending limit for the month</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter monthly budget"
          value={newBudget}
          onChangeText={setNewBudget}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.budgetBtn} onPress={handleSetBudgetGoal}>
          <Text style={styles.btnText}>Set Budget</Text>
        </TouchableOpacity>
      </View>
      
      {/* Set Savings Goal */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Set Savings Goal</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new savings goal"
          value={newGoal}
          onChangeText={setNewGoal}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.goalBtn} onPress={handleSetSavingsGoal}>
          <Text style={styles.btnText}>Set Goal</Text>
        </TouchableOpacity>
      </View>
      
      {/* Add to Savings */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add to Savings</Text>
        <TextInput
          style={styles.input}
          placeholder="Amount to add"
          value={addAmount}
          onChangeText={setAddAmount}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAddSavings}>
          <Text style={styles.btnText}>Add Money</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f7', padding: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 15, marginBottom: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  subText: { fontSize: 14, color: '#666', marginBottom: 10 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  statusItem: { alignItems: 'center' },
  statusLabel: { fontSize: 12, color: '#666', marginBottom: 5 },
  statusValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  progressContainer: { marginTop: 15 },
  progressBar: { height: 10, backgroundColor: '#f0f0f0', borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5 },
  progressText: { textAlign: 'center', marginTop: 5, fontSize: 12, color: '#666' },
  successText: { color: '#4CAF50', fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
  input: { backgroundColor: '#f8f9fa', padding: 15, borderRadius: 10, marginTop: 10, fontSize: 16 },
  budgetBtn: { backgroundColor: '#FF9800', padding: 15, borderRadius: 10, marginTop: 15 },
  goalBtn: { backgroundColor: '#2196F3', padding: 15, borderRadius: 10, marginTop: 15 },
  addBtn: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, marginTop: 15 },
  btnText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});