import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, ImageStyle, StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ThumbnailProps {
    uri: string;
    size?: number;
    style?: StyleProp<ImageStyle>;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ uri, size = 100, style }) => {
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!uri) {
            setError(true);
            return;
        }

        Image.prefetch(uri)
            .then(() => {
                setError(false);
            })
            .catch(() => {
                console.log('Image load failed');
                setError(true);
            });
    }, [uri]);


    const handleError = () => {
        setError(true);
        console.log('Image failed to load');
    };

    if (error) {
        return (
            <View style={[styles.iconWrapper, { width: size, height: size }, style]}>
                <Icon name="account-group" size={size * 0.5} color="#aaa" />
            </View>
        );
    }

    return (
        <Image
            source={{ uri }}
            style={[{ width: size, height: size, borderRadius: 10 }, style]}
            onError={handleError}
        />
    );
};


const styles = StyleSheet.create({
    iconWrapper: {
        borderRadius: 10,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Thumbnail;
