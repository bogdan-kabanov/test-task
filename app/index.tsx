import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PrimaryButton } from '../src/shared/ui';
import { getPurchase } from '../src/shared/lib/storage';

export default function WelcomeScreen() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const purchase = await getPurchase();
      if (purchase.purchased) {
        router.replace('/home');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require('../assets/logotype.png')}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="TestApp логотип"
      />
      <Text style={styles.title}>TestApp</Text>
      <View style={styles.spacer} />
      <PrimaryButton
        title="Продолжить"
        onPress={() => router.push('/plans')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA42D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  spacer: {
    height: 32,
  },
});
