import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGIN = 'LOGIN';
const USER = 'USER';

export const LocalStorage = {
  async setLogin() {
    await AsyncStorage.setItem(LOGIN, 'true');
  },

  async getLogin() {
    const response = await AsyncStorage.getItem(LOGIN);
    return response == null ? null : response;
  },

  async setUser(params: any) {
    try {
      let temp = JSON.stringify(params);
      await AsyncStorage.setItem(USER, temp);
    } catch (error) {
      console.log(error);
    }
  },

  async getUser() {
    const response = await AsyncStorage.getItem(USER);
    return response == null ? null : JSON.parse(response);
  },

  async logout() {
    await AsyncStorage.multiRemove([USER, LOGIN]);
  },

  async deleteLogin() {
    await AsyncStorage.removeItem(LOGIN);
  }
};
