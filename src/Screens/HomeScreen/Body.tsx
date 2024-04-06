import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import styles from './styles';
import Prominent from './Body/Prominent';
import UserInfo from './Body/UserInfo';
import Section2 from './Section2';

const Body = () => {
    return (
        <ScrollView style={styles.contentContainer}>
            <View style={styles.section1}>
                <Image
                    style={styles.notiImg}
                    source={require('../../assets/joyOfLife.jpg')}
                    resizeMode='contain'
                />
                <Prominent />
                <UserInfo />
            </View>
            <Section2 />
        </ScrollView>

    );
}

export default Body