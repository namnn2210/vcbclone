import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { listBank } from './listBank';

export const ModalListBank = React.memo(
  ({ modalVisible, setModalVisible, setBank }: { modalVisible: any; setModalVisible: any; setBank: any }) => {
    const [list, setList] = useState<any>([]);
    const [value, onChangeText] = useState('');

    const searchByShortName = (keyword: string) => {
      const result = list.filter((item: { short_name: string; }) => item.short_name.toLowerCase().includes(keyword.toLowerCase()));
      return result;
    };

    useEffect(() => {
      if (value !== '') {
        const data = searchByShortName(value);
        setList(data);
      } else {
        setList(listBank);
      }
    }, [value]);

    const onHandleBank = (item: any) => {
      setModalVisible(false);
      setBank(item);
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            marginTop: 55,
          }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#2f9929', '#2f9929', '#5db422']}
            style={{
              padding: 10,
              elevation: 2,
              borderTopRightRadius: 24,
              borderTopLeftRadius: 24,
              flexDirection: 'row-reverse',
            }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              height: 38,
            }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: '',
                  flex: 1
                }}>
                Ngân hàng thụ hưởng
              </Text>
              <Pressable
                style={{ justifyContent: 'center' }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 16,
                    fontFamily: '',
                  }}>
                  Đóng
                </Text>
              </Pressable>
            </View>
          </LinearGradient>
          <View style={{ height: 50, backgroundColor: '#F8F8F8', flexDirection: 'row', paddingHorizontal: 16 }}>
            <Ionicons name="search" color={'#787878'} size={28} style={{ alignSelf: 'center', marginRight: 10 }} />
            <TextInput
              style={{ width: 300, height: 40, alignSelf: 'center', fontSize: 16 }}
              placeholder="Tìm kiếm"
              placeholderTextColor={"#787878"}
              onChangeText={text => onChangeText(text)}
            />
          </View>
          <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
            {list === undefined ? (
              <View style={{ height: 1000, backgroundColor: 'white' }} />
            ) : (
              <View>
                {list.map((item: { code: React.Key | null | undefined; logo: null; logo_url: any; short_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                  <TouchableOpacity
                    style={{ flexDirection: 'row', padding: 16 }}
                    key={item.code}
                    onPress={() => {
                      onHandleBank(item);
                    }}>
                    <View style={{ height: 50, width: 50, borderRadius: 50, backgroundColor: '#F7F7F7', marginRight: 10 }}>
                      {item.logo !== null && (
                        <Image
                          source={{
                            uri: item.logo_url,
                          }}
                          style={{ height: 50, width: 50, alignSelf: 'center', borderRadius: 50 }}
                          resizeMode="contain"
                        />
                      )}
                    </View>
                    <View>
                      <Text style={{ fontFamily: '', fontSize: 15 }}>{item.short_name}</Text>
                      <Text style={{ fontFamily: '', fontSize: 13, color: '#A2A39E', width: 300 }}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View style={{ height: 1000, backgroundColor: 'white' }} />
          </ScrollView>
        </View>
      </Modal>
    );
  },
);
