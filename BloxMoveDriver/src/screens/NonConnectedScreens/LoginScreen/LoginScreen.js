import React, {useState} from 'react';
import {
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text, Input, InputEmail, Button} from '@components';
import {required} from '@app/src/utils/validation';
import {Controller, useForm} from 'react-hook-form';
import dynamicStyles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import authDeviceStorage from '@app/src/screens/utils/AuthDeviceStorage';

const LoginScreen = props => {
  const {navigation} = props;
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
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [loading, setLoading] = useState();
  const [password, setPassword] = useState('');

  const saveAction = async data => {
    // Tunde32@gmail.com
    if (
      data.email.toLowerCase() !== 'tunde32@gmail.com' ||
      data.firstName !== 'driver123'
    ) {
      Alert.alert(
        '',
        "We couldn't find a user with the provided username. Please make sure you entered it correctly and try once more.",
      );
      return;
    }
    await authDeviceStorage.setNonverifedShowOnboardingFlow('true');
    navigation.reset({
      index: 0,
      routes: [{name: 'NavStack'}],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View>
              <View style={styles.header}>
                <Icon
                  name="arrow-back-outline"
                  size={24}
                  color="black"
                  style={styles.backIcon}
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [
                        {
                          name: 'LoginStack',
                        },
                      ],
                    });
                  }}
                />
                <Text textStyle="header24" style={styles.title}>
                  Welcome
                </Text>
              </View>
              <Text textStyle="body14Regular" style={styles.description}>
                Enter your Log I1n information
              </Text>
              <InputEmail
                controllerProps={{
                  control,
                  defaultValue: '',
                }}
                inputProps={{
                  returnKeyType: 'done',
                }}
              />
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{
                  required,
                  minLength: {
                    value: 8,
                    message: 'Passwords must be longer than 8 characters.',
                  },
                }}
                render={({
                  field: {onChange, value, onBlur},
                  fieldState: {error},
                }) => (
                  <View>
                    <Input
                      label="Password"
                      placeholder="Enter password"
                      error={error?.message}
                      value={value}
                      onChangeText={temp => {
                        setPassword(temp);
                        onChange(temp);
                      }}
                      onBlur={temp => {
                        setPasswordFocus(false);
                        onBlur(temp);
                      }}
                      onFocus={() => {
                        setPasswordFocus(true);
                      }}
                      returnKeyType="done"
                      inputStyles={styles.passwordContainer}
                      secureTextEntry={!isPasswordVisible ? true : false}
                    />
                    <Icon
                      suppressHighlighting
                      name={
                        !isPasswordVisible ? 'eye-outline' : 'eye-off-outline'
                      }
                      size={20}
                      color={'black'}
                      onPress={() => setPasswordVisible(!isPasswordVisible)}
                      style={[
                        styles.passwordVisible,
                        {
                          display: password.length > 0 ? 'flex' : 'none',
                        },
                      ]}
                    />
                  </View>
                )}
              />
              <Button
                onPress={handleSubmit(saveAction)}
                disabled={loading || !isFormValid}
                title="Continue"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
