import React from 'react';
import { Stack } from 'expo-router';
import Colors from '../../../constants/Colors';

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notes"
        options={{
          title: '',
          headerStyle: {
            backgroundColor: Colors.default.white,
          },
          headerShadowVisible: false,
          headerTintColor: Colors.default.primary,
        }}
      />
    </Stack>
  );
};

export default StackLayout;