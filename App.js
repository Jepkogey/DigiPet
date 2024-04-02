import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Haptic } from 'expo';

export default function App() {
    const [happiness, setHappiness] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            setHappiness(prevHappiness => Math.max(0, prevHappiness - 1));
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const treatPet = async () => {
        setHappiness(prevHappiness => Math.min(100, prevHappiness + 10));
        Haptic.selectionAsync(); //provide haptic feedback
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pet}>{happiness >= 50 ? '\u{1F604}' : '\u{1F622}'}</Text>
            <Text style={styles.happinessText}>Happiness: {happiness}</Text>
            <Pressable onPress={treatPet} style={styles.treatButton}>
                <Text style={styles.buttonText}>Treat</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    pet: {
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
