import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo';
import { haptic } from 'expo';

export default function App() {

    const DigiPet = () => {
        const [happiness, setHappiness] = useState(10);
        //timer to decrease hapiness level
        useEffect(() => {
            const interval = setInterval(() => {
                setHappiness(prevHappiness => Math.max(0, prevHappiness - 1)); // Ensure happiness doesn't go below 0
            }, 30000); // hapiness decrease every 30 seconds
            return () => clearInterval(interval);
        }, []);

        const treatPet = () => {
            setHappiness(prevHappiness => Math.min(100, prevHappiness + 10)); // Increase happiness when treated
            playSound(); // Play sound effect
            Haptic.selectionAsync(); // Provide haptic feedback

            const playSound = async () => {
                const soundObject = new Audio.Sound();
                try {
                    await soundObject.loadAsync(require());
                    await soundObject.playAsync();
                } catch (error) {
                    console.error('Error playing sound:', error);
                }
            };
            return (
                <View style={styles.container}>
                    <Text style={styles.pet}>{happiness >= 50 ? '' : ''}</Text>
                    <Text style={styles.happinessText}>Happiness: {happiness}</Text>
                    <Pressable onPress={treatPet} style={styles.treatButton}>
                        <Text style={styles.buttonText}>Treat</Text>
                    </Pressable>
                </View>
            );
        };
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
            },
            DigiPet: {
                fontSize: 80,
                marginBottom: 20,
            },
            happinessText: {
                fontSize: 20,
                marginBottom: 20,
            },
            treatButton: {
                backgroundColor: '#4CAF50',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
            },
            buttonText: {
                color: 'white',
                fontSize: 18,
            },
        });
