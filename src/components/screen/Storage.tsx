import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import React, { useState } from 'react';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function(props: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={{ fontSize: 20, marginBottom: 10 }}>!!!Storage!!!</Text>
      <ScrollView>
        <Text style={{ fontSize: 100 }}>
          please don't please don't please don't please don't please don't
          please don't please don't please don't please don't please don't
          please don't
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0b792',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
