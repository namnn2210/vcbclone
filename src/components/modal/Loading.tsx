import colors from '../../constants/colors';
import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

interface LoadingProps {
  visible: boolean;
}
export default function Loading({ visible = false }: LoadingProps) {
  return (
    <Modal transparent visible={visible}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.main} size={'large'} />
      </View>
    </Modal>
  );
}
