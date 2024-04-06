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
  },
  passContain: {
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputPassword: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: dimens.fontNormal,
    padding: 10,
    flex: 1,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingTop: 60,
  },
  icon: {
    marginVertical: 40,
  },
  topContain: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bottomContain: { flex: 2, paddingHorizontal: 20, width: dimens.screenWidth },
  note: {
    color: colors.lightGray,
    fontSize: dimens.fontNormal,
    marginVertical: 10,
  },
  txtSignUp: {
    color: colors.white,
    fontSize: dimens.fontNormal,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  txtContain: {
    marginTop: 40,
  },
  txtMap: {
    color: colors.white,
    fontSize: dimens.fontNormal,
    textAlign: 'center',
    marginLeft: 10,
    marginBottom: 25
  },
  txtNext: { alignSelf: 'center', color: colors.white, fontWeight: 'bold', fontSize: 17 },
  txtName: { alignSelf: 'center', color: colors.white, marginTop: 5, fontSize: 16, textTransform: 'uppercase' },
  txtForgotPass: {
    color: colors.main,
    fontWeight: 'bold',
    fontSize: dimens.fontNormal,
    textDecorationLine: 'underline',
  },
  contain: { flexDirection: 'row', flex: 1, },
  btnLogin: { flex: 1, marginRight: 10 },
  txtIcon: { flex: 1, color: colors.white, textAlign: 'center', marginTop: 10 },
  iconQR: { flex: 1, marginBottom: 10 },
  iconContain: { alignItems: 'center', flex: 1 },
  rowView: { flexDirection: 'row', flex: 1, marginTop: 270, justifyContent: 'space-between' },
  avatarContain: {
    borderWidth: 2,
    borderColor: 'white',
    height: 70,
    width: 70,
    backgroundColor: '#bee472',
    borderRadius: 50,
    justifyContent: 'center',
  },
  txtBack: {
    color: colors.white,
    fontSize: dimens.fontNormal,
  },
  iconBack: {
    marginLeft: 10,
    marginRight: 5,
  },
});
