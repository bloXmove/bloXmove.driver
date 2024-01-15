import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Linking,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard,
} from 'react-native';
import svgs from '../../../../assets/svg/svgs';
import {Text, Input, Button} from '@components';
import {required, getNamePattern} from '@app/src/utils/validation';
import {Controller, useForm} from 'react-hook-form';
import dynamicStyles from './styles';
import {restoreSinger} from '@app/src/lib/WalletFacade';

const RecoveryScreen = props => {
  const {navigation, route} = props;
  const userType = route.params.userType;
  const styles = dynamicStyles();

  const {
    setFocus,
    control,
    handleSubmit,
    getValues,
    formState: {isValid: isFormValid, errors},
  } = useForm({
    mode: 'onChange',
  });
  const [loading, setLoading] = useState();

  const saveAction = async data => {
    const {recovery} = data;
    setLoading(true);
    try {
      const res = await restoreSinger(recovery.trim());
      if (res !== false) {
        navigation.navigate('Grant', {
          accountId: res.address,
          userType: userType,
          exist: true,
        });
        setLoading(false);
      } else {
        Alert.alert('Please input valid recovery phrase');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Please input valid recovery phrase');
      setLoading(false);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}>
        <View>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              disabled={loading}
              style={styles.btnToggle}
              onPress={() => goBack()}>
              <svgs.Back />
            </TouchableOpacity>
            <Text textStyle="header24" style={styles.title}>
              Welcome
            </Text>
          </View>
          <Text textStyle="body14Regular" style={styles.description}>
            Enter your recovery phrase to sign in to your account
          </Text>
          <Controller
            name="recovery"
            control={control}
            defaultValue=""
            rules={{
              required,
              pattern: getNamePattern(),
            }}
            render={({
              field: {onChange, value, onBlur},
              fieldState: {error},
            }) => (
              <Input
                label="Recovery phrase"
                placeholder="Enter recovery phrase"
                error={error?.message}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="done"
                containerStyles={styles.messageBox}
                customLabelStyles={styles.labelStyle}
                inputStyles={styles.inputStyle}
                multiline={true}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
              />
            )}
          />
        </View>

        <View>
          <Text textStyle="body10Regular" style={styles.terms}>
            By continuing, I agree to BloXmove’s{' '}
            <Text
              textStyle="body10SemiBold"
              style={styles.link}
              onPress={async () =>
                await Linking.openURL(
                  'https://bloxmove.ng/terms-for-passengers/',
                )
              }>
              Terms and conditions
            </Text>
            ,{' '}
            <Text textStyle="body10SemiBold" style={styles.link}>
              Payments Terms of Service
            </Text>{' '}
            and{' '}
            <Text textStyle="body10SemiBold" style={styles.link}>
              Privacy Policy
            </Text>
          </Text>
          <Button
            onPress={handleSubmit(saveAction)}
            disabled={loading || !isFormValid}
            title="Continue"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecoveryScreen;
