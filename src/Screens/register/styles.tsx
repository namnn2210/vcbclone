import dimens from '../../constants/dimens';
import colors from '../../constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: dimens.fontLarge,
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 40,
    marginHorizontal: 20,
  },
  input: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: dimens.fontNormal,
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingTop: 50,
  },
  icon: {
    marginVertical: 40,
  },
  topContain: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bottomContain: { flex: 2, paddingHorizontal: 20, width: dimens.screenWidth },
  txtSignUp: {
    color: colors.white,
    fontSize: dimens.fontNormal,
    textAlign: 'center',
  },
  txtMap: {
    color: colors.white,
    fontSize: dimens.fontNormal,
    textAlign: 'center',
    marginLeft: 10,
  },
  txtBack: {
    color: colors.white,
    fontSize: dimens.fontNormal,
  },
  iconBack: {
    marginLeft: 10,
    marginRight: 5,
  },
  passContain: {
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputPassword: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: dimens.fontNormal,
    padding: 10,
    flex: 1,
  },
  txtError: {
    color: colors.lightGray,
    fontSize: dimens.fontSmall,
    marginTop: 10,
  }
});
