import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([
    { id: '1', desc: 'Groceries', amount: 45.50, date: 'Today', category: 'Food', emoji: '🍕' },
    { id: '2', desc: 'Gas', amount: 35.00, date: 'Yesterday', category: 'Transport', emoji: '🚗' },
    { id: '3', desc: 'Netflix', amount: 15.99, date: 'Dec 5', category: 'Entertainment', emoji: '🎬' },
  ]);
  
  const [spendingGoal, setSpendingGoal] = useState(500);
  const [savingsGoal, setSavingsGoal] = useState(1000);
  const [currentSavings, setCurrentSavings] = useState(300);

  const categories = [
    { name: 'Food', emoji: '🍕', color: '#FF9800' },
    { name: 'Transport', emoji: '🚗', color: '#2196F3' },
    { name: 'Shopping', emoji: '🛍️', color: '#E91E63' },
    { name: 'Bills', emoji: '🧾', color: '#9C27B0' },
    { name: 'Entertainment', emoji: '🎬', color: '#4CAF50' },
    { name: 'Other', emoji: '📦', color: '#607D8B' },
  ];

  const addExpense = (newExpense) => {
    setExpenses(prev => [...prev, newExpense]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
  };

  // ADD THIS FUNCTION for editing expenses
  const editExpense = (id, updatedData) => {
    setExpenses(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const updateSpendingGoal = (goal) => {
    setSpendingGoal(goal);
  };

  const updateSavingsGoal = (goal) => {
    setSavingsGoal(goal);
  };

  const addToSavings = (amount) => {
    setCurrentSavings(prev => prev + amount);
  };

  return (
    <DataContext.Provider value={{
      expenses,
      spendingGoal,
      savingsGoal,
      currentSavings,
      categories,
      addExpense,
      deleteExpense,
      editExpense, 
      setSpendingGoal: updateSpendingGoal,
      setSavingsGoal: updateSavingsGoal,
      addToSavings,
    }}>
      {children}
    </DataContext.Provider>
  );
};