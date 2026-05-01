// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DataProvider } from './Utils/DataContext';
import Welcome from './screens/Welcome';
import Dashboard from './screens/Dashboard';
import AddExpense from './screens/AddExpense';
import ExpenseList from './screens/ExpenseList';
import Statistics from './screens/Statistics';
import Savings from './screens/Savings';
import { Text } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fff', height: 60 },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Dashboard}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🏠</Text> }}
      />
      <Tab.Screen 
        name="Add" 
        component={AddExpense}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>➕</Text> }}
      />
      <Tab.Screen 
        name="List" 
        component={ExpenseList}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📋</Text> }}
      />
      <Tab.Screen 
        name="Stats" 
        component={Statistics}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📊</Text> }}
      />
      <Tab.Screen 
        name="Save" 
        component={Savings}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>💰</Text> }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="AppTabs" component={MainTabs} />
          {/* Add Signup/Signin screens later if needed */}
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}