import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useData } from '../Utils/DataContext';  // Change this import

export default function AddExpense() {
  const { categories, addExpense } = useData();  // Use context
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food');

  const handleAddExpense = () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      desc: description,
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      category: selectedCategory,
      emoji: categories.find(cat => cat.name === selectedCategory)?.emoji || '📦'
    };

    addExpense(newExpense);  // This will trigger re-renders
    
    Alert.alert('Success', 'Expense added successfully!');
    
    // Clear form
    setDescription('');
    setAmount('');
    setSelectedCategory('Food');
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>➕ Add Expense</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="What did you spend on?"
          value={description}
          onChangeText={setDescription}
        />
        
        <Text style={styles.label}>Amount ($)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />
        
        <Text style={styles.label}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              style={[
                styles.categoryBtn,
                selectedCategory === category.name && styles.categoryBtnSelected
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              <Text style={[
                styles.categoryText,
                selectedCategory === category.name && styles.categoryTextSelected
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <TouchableOpacity style={styles.addBtn} onPress={handleAddExpense}>
          <Text style={styles.addBtnText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💡 Quick Tips</Text>
        <Text style={styles.tip}>• Add expenses right after purchase</Text>
        <Text style={styles.tip}>• Categorize properly for better insights</Text>
        <Text style={styles.tip}>• Set realistic monthly goals</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryBtn: {
    alignItems: 'center',
    marginRight: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    minWidth: 70,
  },
  categoryBtnSelected: {
    backgroundColor: '#2196F3',
  },
  categoryEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
  },
  categoryTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  addBtn: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tip: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    paddingLeft: 5,
  },
});