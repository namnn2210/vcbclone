import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from './styles';

export const BG = require('../../assets/BG.jpg');


export const InputReadBox = ({ txt, icon, txt2 }: { txt: string; icon?: any; txt2?: any }) => {
    return (
        <View
            style={{
                width: '100%',
                borderWidth: 1,
                height: 44,
                backgroundColor: 'white',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginVertical: 5,
            }}>
            <Text style={styles.greenTxt}>{txt}</Text>

            <FontAwesome name={icon} color={'black'} size={20} style={{ alignSelf: 'center' }} />

        </View>
    );
};
