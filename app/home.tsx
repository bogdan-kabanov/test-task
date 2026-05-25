import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getPurchase, Purchase } from '../src/shared/lib/storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const { showPopup } = useLocalSearchParams<{ showPopup?: string }>();
  const [popupVisible, setPopupVisible] = useState(false);
  const [purchase, setPurchase] = useState<Purchase | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getPurchase();
      setPurchase(data);
    })();
  }, []);

  useEffect(() => {
    if (showPopup === 'true') {
      setPopupVisible(true);
    }
  }, [showPopup]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={require('../assets/logotype.png')}
            style={styles.miniLogo}
            resizeMode="contain"
            accessibilityLabel="TestApp логотип"
          />
          <Text style={styles.headerTitle}>TestApp</Text>
        </View>
        <Text style={styles.heading}>Главная</Text>
        <Text style={styles.subtitle}>
          Ваша подписка: {purchase?.plan === 'monthly' ? '1 месяц' : '1 год'}
        </Text>
        <Image
          source={require('../assets/card-image.jpeg')}
          style={styles.bottomImage}
          resizeMode="cover"
        />
      </ScrollView>

      <Modal
        visible={popupVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setPopupVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.imageWrapper}>
              <Image
                source={require('../assets/card-image.jpeg')}
                style={styles.modalImage}
                resizeMode="cover"
              />
              <View style={styles.imageDarkOverlay} />
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>Покупка совершена!</Text>
              <Text style={styles.modalSectionTitle}>Список доступных услуг:</Text>
              <View style={styles.serviceItem}>
                <Text style={styles.serviceText}>🎵 Подписка на музыку</Text>
              </View>
              <Pressable
                style={styles.listenButton}
                onPress={() => setPopupVisible(false)}
                accessibilityRole="button"
                accessibilityLabel="Слушать"
              >
                <Text style={styles.listenButtonText}>Слушать</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA42D',
  },
  scrollContent: {
    padding: 16,
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  miniLogo: {
    width: 60,
    height: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  bottomImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginTop: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    width: SCREEN_WIDTH - 40,
    maxHeight: '80%',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  imageDarkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalBody: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  serviceItem: {
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  serviceText: {
    fontSize: 15,
    color: '#333333',
  },
  listenButton: {
    backgroundColor: '#FFA42D',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  listenButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
