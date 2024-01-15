import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Rating} from 'react-native-ratings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {journeyDetail, journeyReview} from '../../utils/api/jonuney';
import {displayErrors} from '../../../../helpers/displayErrors';
import {Button, COLORS, Input, Text} from '@components';
import {Controller, useForm} from 'react-hook-form';
import Profile from '@app/assets/image/icons/profile.svg';
import {styles} from './styles';

const ReviewTripScreen = props => {
  const {navigation, route} = props;
  const item = route.params.item;

  const {control, getValues} = useForm({
    mode: 'onChange',
  });

  const [rate, setRate] = useState(5);
  const [loading, setLoading] = useState(false);
  const apiToken = useSelector(state => state.auth.token);

  const submitReview = async () => {
    const {message} = getValues();

    setLoading(true);
    const data = {
      score: rate,
      reportNotComplete: false,
      remark: message,
    };
    journeyReview(item.id, data, apiToken)
      .then(response => {
        setLoading(false);
        getJourney(apiToken, item.id);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };
  const getJourney = async (token, id) => {
    journeyDetail(id, token)
      .then(response => {
        setLoading(false);
        navigation.navigate('Home');
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text textStyle="body18Semibold">Rate your driver</Text>
      </View>
      <View style={styles.content}>
        <Text textStyle="header24">
          Please rate your Driver & ride experience
        </Text>
        <View style={styles.driverInfo}>
          <Profile style={styles.profile} />
          <Text style={{textAlign: 'center'}} textStyle="body18Regular">
            {item?.driver?.firstName} {item?.driver?.lastName}
          </Text>
        </View>
        <Rating
          type="custom"
          ratingCount={5}
          imageSize={40}
          style={styles.rating}
          defaultRating={rate}
          startingValue={rate}
          onFinishRating={rating => {
            setRate(rating);
          }}
        />

        <Controller
          name="message"
          control={control}
          defaultValue=""
          render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
            <Input
              label="Leave a review"
              placeholder="Message"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="done"
            />
          )}
        />
      </View>
      <Button
        disabled={loading}
        title="Submit Feedback"
        onPress={() => submitReview()}
      />
    </KeyboardAwareScrollView>
  );
};

export default ReviewTripScreen;
