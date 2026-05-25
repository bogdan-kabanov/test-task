import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { subscriptions } from '../src/entities/subscription';
import { savePurchase } from '../src/shared/lib/storage';
import type { SubscriptionPlan } from '../src/entities/subscription';

function SubscriptionCardComponent({
  title,
  description,
  price,
  originalPrice,
  discount,
  onPress,
}: {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  onPress: () => void;
}) {
  const translateY = React.useRef(new Animated.Value(0)).current;
  const bgColor = React.useRef(new Animated.Value(0)).current;

  const animatedBg = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFA42D', '#E89325'],
  });

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(translateY, { toValue: -3, useNativeDriver: true }),
      Animated.timing(bgColor, { toValue: 1, duration: 100, useNativeDriver: false }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
      Animated.timing(bgColor, { toValue: 0, duration: 150, useNativeDriver: false }),
    ]).start();
  };

  return (
    <View style={styles.card}>
      <Image
        source={require('../assets/card-image.jpeg')}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
        {discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>Скидка {discount}</Text>
          </View>
        )}
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          accessibilityRole="button"
          accessibilityLabel={`Купить за ${price}`}
        >
          <Animated.View
            style={[
              styles.cardButton,
              { backgroundColor: animatedBg, transform: [{ translateY }] },
            ]}
          >
            <View style={styles.priceRow}>
              {originalPrice && (
                <Text style={styles.originalPrice}>{originalPrice}</Text>
              )}
              <Text style={styles.cardButtonText}>{price}</Text>
            </View>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

export default function PlansScreen() {
  const router = useRouter();

  const handlePurchase = async (plan: SubscriptionPlan) => {
    await savePurchase(plan);
    router.replace('/home?showPopup=true');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Image
          source={require('../assets/logotype.png')}
          style={styles.miniLogo}
          resizeMode="contain"
          accessibilityLabel="TestApp логотип"
        />
        <Text style={styles.headerTitle}>TestApp</Text>
      </View>
      {subscriptions.map((sub) => (
        <SubscriptionCardComponent
          key={sub.id}
          title={sub.title}
          description={sub.description}
          price={sub.price}
          originalPrice={sub.originalPrice}
          discount={sub.discount}
          onPress={() => handlePurchase(sub.plan)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA42D',
  },
  scrollContent: {
    padding: 16,
    paddingTop: 30,
  },
  miniLogo: {
    width: 60,
    height: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  discountBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  discountText: {
    color: '#2E7D32',
    fontSize: 13,
    fontWeight: '600',
  },
  cardButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#FFFFFF',
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  cardButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
