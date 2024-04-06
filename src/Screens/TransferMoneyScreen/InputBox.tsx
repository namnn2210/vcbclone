import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from './styles';

export const BG = require('../../assets/BG.jpg');

export const InputBox = React.memo(
  ({ txt, icon, txt2, color }: { txt: string; icon?: any; txt2?: any; color?: any }) => {
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
        <Text style={{ ...styles.greenTxt, color: color ? 'gray' : '#4aa924' }}>{txt}</Text>
        {!txt2 ? (
          <FontAwesome name={icon} color={'black'} size={20} style={{ alignSelf: 'center' }} />
        ) : (
          <Text
            style={{
              alignSelf: 'center',
              color: '#4aa924',
              fontSize: 15,
              fontFamily: '',
              textAlign: 'center',
            }}>
            {txt2}
          </Text>
        )}
      </View>
    );
  },
);
