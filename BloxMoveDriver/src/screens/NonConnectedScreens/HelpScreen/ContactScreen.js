import React, {useState} from 'react';
import {View, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {customerServiveAPI} from '../utils';
import {displayErrors} from '../../../helpers/displayErrors';
import {Button, COLORS, Input, InputEmail, Text} from '@components';
import {Controller, useForm} from 'react-hook-form';
import {getNamePattern, required} from '@app/src/utils/validation';
import {InputSelect} from '@app/src/components/Input/InputSelect';
import {styles} from './styles';

const ContactScreen = props => {
  const {navigation} = props;

  const currentUser = useSelector(state => state.auth.user);
  const apiToken = useSelector(state => state.auth.token);
  const [isLoading, setLoading] = useState(false);
  const SUBJECTS = [
    {label: 'Other', value: 'OTHER'},
    {label: 'Ride Booking', value: 'RIDE_BOOKING'},
    {label: 'Payment', value: 'PAYMENT'},
    {label: 'Profile', value: 'PROFILE'},
    {label: 'Driver Info', value: 'DRIVER_INFO'},
  ];

  const {
    setFocus,
    control,
    handleSubmit,
    formState: {isValid: isFormValid},
  } = useForm({
    mode: 'onChange',
  });

  const sendMessage = async ({email, content, subject}) => {
    const data = {
      freshdeskType: 'Driver App Ticket',
      email: email,
      type: subject,
      content: content,
    };
    setLoading(true);
    customerServiveAPI
      .contactUsNonMember(apiToken, data)
      .then(response => {
        setLoading(false);
        Alert.alert('Thanks for contacting us', '', [
          {
            text: 'OK',
            onPress: () => {
              props.navigation.goBack();
            },
          },
        ]);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text textStyle="body18Semibold">Contact us</Text>
        </View>
        <View>
          <View>
            <InputEmail
              controllerProps={{
                control,
                defaultValue: currentUser ? currentUser.email : '',
              }}
              inputProps={{
                returnKeyType: 'next',
                onSubmitEditing: () => setFocus('subject'),
                editable: true,
              }}
            />
            <Controller
              name="subject"
              control={control}
              rules={{required}}
              defaultValue={SUBJECTS[0].value}
              render={({field: {onChange, value, ...field}}) => (
                <InputSelect
                  items={SUBJECTS}
                  onClose={() => {
                    if (!value) {
                      onChange(SUBJECTS[0].value);
                    }
                  }}
                  onValueChange={onChange}
                  inputProps={{
                    ...field,
                    label: 'Subject',
                    value,
                    onChangeText: onChange,
                  }}
                />
              )}
            />
            <Controller
              name="content"
              control={control}
              defaultValue=""
              rules={{
                required,
                // pattern: getNamePattern(),
              }}
              render={({
                field: {onChange, value, onBlur},
                fieldState: {error},
              }) => (
                <Input
                  label="Message"
                  placeholder="Message"
                  error={error?.message}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="done"
                  multiline={true}
                  containerStyles={styles.messageBox}
                  customLabelStyles={styles.labelStyle}
                  inputStyles={styles.inputStyle}
                />
              )}
            />
          </View>

          <Button
            title="Send"
            disabled={isLoading || !isFormValid}
            onPress={handleSubmit(sendMessage)}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
ContactScreen.propTypes = {
  appConfig: PropTypes.object,
};

export default ContactScreen;
