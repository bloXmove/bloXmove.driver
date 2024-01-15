import React, {useState, useEffect, useRef} from 'react';
import {Alert, View, TouchableOpacity, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import Svgs from '../../../../assets/svg/svgs';
import {useSelector, useDispatch, connect} from 'react-redux';
import {
  getUser,
  updateUserData,
  updateUserToken,
  uploadFile,
  deleteAvatar,
  changeEmail,
} from '../utils/api/users';
import PhoneInput from 'react-native-phone-input';
import {displayErrors} from '../../../helpers';
import {Text, Button, COLORS, Input, InputEmail, FONTS} from '@components';
import {getNamePattern, required} from '@app/src/utils/validation';
import {Controller, useForm} from 'react-hook-form';
import {setUserData} from '../../Onboarding/redux';
import {InputSelect} from '@app/src/components/Input/InputSelect';
import authDeviceStorage from '@app/src/screens/utils/AuthDeviceStorage';
import {
  getVerificationStatus,
  getModels,
} from '@app/src/screens/utils/api/actions';

const ProfileEdit = props => {
  const {isEditVisible, setIsEditVisible, navigation} = props;
  const currentUser = useSelector(state => state.auth.user);
  const apiToken = useSelector(state => state.auth.token);
  const manufacturerList = useSelector(state => state.auth.manufacturerList);
  const [curVehicleManufacturer, setVehicleManufacturer] = useState(
    currentUser?.vehicleManufacturer,
  );
  const [curVehicleModel, setVehicleModel] = useState(
    currentUser?.vehicleModel,
  );
  const [curVehicleYear, setVehicleYear] = useState(
    currentUser?.vehicleYear.toString(),
  );
  const [curVehicleColor, setVehicleColor] = useState(
    currentUser?.vehicleColor.toString(),
  );
  const [modelList, setModelList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [models, setModels] = useState([]);
  // const curYear = new Date().getFullYear();
  // const yearData = Array.from(new Array(50), (val, index) => curYear - index);
  // const yearList = yearData.map(item => {
  //   return {value: item.toString(), label: item.toString()};
  // });
  const phoneRef = useRef();

  // User Information
  const [profileImg, setImg] = useState(currentUser?.avatar);
  const [errorImg, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    setFocus,
    control,
    // handleSubmit,
    setValue,
    getValues,
    formState: {isValid: isFormValid, isDirty},
  } = useForm({
    mode: 'onChange',
  });
  useEffect(() => {
    listModels(currentUser.vehicleManufacturer);
  }, [currentUser.vehicleManufacturer]);
  useEffect(() => {
    if (models.length === 0) {
      return;
    }
    let newYears = [];
    newYears.push({
      value: '',
      label: '',
    });
    models.map(item => {
      if (item.modelName === curVehicleModel) {
        const temp = {};
        temp.value = item.year;
        temp.label = item.year;
        newYears.push(temp);
      }
    });
    newYears.sort((a, b) => a.value - b.value);
    setYearList(newYears);
  }, [curVehicleModel, models]);

  const listModels = manuName => {
    getModels(manuName + '?page=1&size=1000&sort=DESC')
      .then(response => {
        const data = response.data.data;
        let newModels = [];
        let newYears = [];
        newModels.push({
          value: '',
          label: '',
        });
        newYears.push({
          value: '',
          label: '',
        });
        setModels(data);
        data.map(item => {
          if (newModels.findIndex(x => x.value === item.modelName) === -1) {
            const temp = {};
            temp.value = item.modelName;
            temp.label = item.modelName;
            newModels.push(temp);
          }
          if (newYears.findIndex(x => x.value === item.year) === -1) {
            const temp = {};
            temp.value = item.year;
            temp.label = item.year;
            newYears.push(temp);
          }
        });
        newYears.sort((a, b) => a.value - b.value);
        // setYearList(newYears);
        setModelList(newModels);
      })
      .catch(e => {
        console.log(e.response.data);
      });
  };
  const startUpload = async source => {
    setLoading(true);
    const data = {
      type: 'AVATAR',
      walletAddress: currentUser.walletAddress,
      file: {
        uri: source.path,
        type: source.mime,
        name: Date.now() + source.path.split('/').pop(),
      },
    };
    uploadFile(data, apiToken)
      .then(response => {
        if (response.success === true) {
          console.log(response.data);
          setError(false);
          setImg(response.data);
        }
        setLoading(false);
      })
      .catch(_error => {
        setLoading(false);
      });
  };

  const onLaunchCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      width: 400,
      height: 400,
    }).then(image => {
      setModalVisible(false);
      startUpload(image);
    });
  };

  const onOpenPhotos = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 400,
      height: 400,
    }).then(image => {
      setModalVisible(false);
      startUpload(image);
    });
  };

  const changeAvatar = type => {
    if (type === 0) {
      onLaunchCamera();
    } else {
      onOpenPhotos();
    }
  };

  const deleteAction = () => {
    Alert.alert('Do you want to remove profile pic?', '', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => deleteAvatarAction(),
        style: 'cancel',
      },
    ]);
  };

  const deleteAvatarAction = () => {
    // apiToken
    deleteAvatar(apiToken).then(() => {
      setImg('');
    });
  };

  const editAction = async () => {
    const {
      firstName,
      lastName,
      email,
      address,
      vehicleRegistrationNo,
      vehicleManufacturer,
      vehicleModel,
      vehicleYear,
      vehicleColor,
    } = getValues();
    if (!phoneRef.current.isValidNumber()) {
      Alert.alert('', 'Please input valid phone number');
      return;
    }
    setLoading(true);
    let newData = currentUser;
    newData.firstName = firstName;
    newData.lastName = lastName;
    newData.email = email;
    newData.phoneNumber = phoneRef.current.getValue();
    newData.address = address;
    newData.vehicleRegistrationNo = vehicleRegistrationNo;
    newData.vehicleManufacturer = vehicleManufacturer;
    newData.vehicleModel = vehicleModel;
    newData.vehicleYear = parseInt(vehicleYear, 10);
    newData.vehicleColor = vehicleColor;
    if (newData.companyCode === '') {
      newData.companyCode = 'string';
    }
    // newData.vehicleRegistrationNo = vehicleRegistrationNo;
    updateUserData(newData, apiToken)
      .then(async response => {
        await dispatch(
          setUserData({
            data: newData,
            loading: false,
          }),
        );
        checkVerify(newData.walletAddress, newData);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };

  const checkVerify = (accountId, userData) => {
    getVerificationStatus(accountId)
      .then(async response => {
        const result = response.data.data;
        if (result.status === true) {
          setIsEditVisible(false);
          setLoading(false);
        } else {
          setIsEditVisible(false);
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'ProcessingScreen',
                params: {
                  backFlag: true,
                  state: userData.state,
                },
              },
            ],
          });
          await authDeviceStorage.setExpired('');
        }
      })
      .catch(error => {
        setIsEditVisible(false);
        setLoading(false);
      });
  };

  const ColorList = [
    {value: 'Black', label: 'Black'},
    {value: 'Blue', label: 'Blue'},
    {value: 'Brown', label: 'Brown'},
    {value: 'Green', label: 'Green'},
    {value: 'Grey', label: 'Grey'},
    {value: 'Red', label: 'Red'},
    {value: 'Silver', label: 'Silver'},
    {value: 'White', label: 'White'},
    {value: 'Other', label: 'Other'},
  ];

  return (
    <>
      <Modal
        onSwipeComplete={() => setIsEditVisible(false)}
        avoidKeyboard={true}
        style={styles.modal}
        isVisible={isEditVisible}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsEditVisible(false)}>
              <Icon name="close" size={24} color={COLORS.black} />
            </TouchableOpacity>
            <Text textStyle="body18Semibold">Edit Profile</Text>
          </View>
          <View style={styles.content}>
            <View>
              <Text style={styles.sectionTitle} textStyle="body18Semibold">
                Personal Information
              </Text>
              <Controller
                name="firstName"
                control={control}
                defaultValue={currentUser.firstName}
                rules={{
                  required,
                  pattern: getNamePattern(),
                }}
                render={({
                  field: {onChange, value, onBlur},
                  fieldState: {error},
                }) => (
                  <Input
                    label="First name"
                    placeholder="Enter first name"
                    error={error?.message}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="next"
                    onSubmitEditing={() => setFocus('email')}
                  />
                )}
              />

              <Controller
                name="lastName"
                control={control}
                defaultValue={currentUser.lastName}
                rules={{
                  required,
                  pattern: getNamePattern(),
                }}
                render={({
                  field: {onChange, value, onBlur},
                  fieldState: {error},
                }) => (
                  <Input
                    label="First last name"
                    placeholder="Enter last name"
                    error={error?.message}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="next"
                    onSubmitEditing={() => setFocus('email')}
                  />
                )}
              />

              <InputEmail
                controllerProps={{
                  control,
                  defaultValue: currentUser.email,
                }}
                inputProps={{
                  returnKeyType: 'done',
                }}
              />
              <View style={styles.phoneNumberContainer}>
                <Text style={styles.phoneNumberLabel}>Phone Number</Text>
                <PhoneInput
                  ref={phoneRef}
                  initialCountry={'ng'}
                  style={styles.phoneInput}
                  initialValue={currentUser.phoneNumber}
                  textStyle={styles.phoneInputText}
                  placeholder="Enter Phone Number"
                  textProps={{
                    returnKeyType: 'done',
                    placeholder: 'Enter Phone Number',
                  }}
                  offset={10}
                />
              </View>
              <Controller
                name="address"
                control={control}
                defaultValue={currentUser.address}
                rules={{
                  required,
                  // pattern: getNamePattern(),
                }}
                render={({
                  field: {onChange, value, onBlur},
                  fieldState: {error},
                }) => (
                  <Input
                    label="Address"
                    placeholder="Enter address"
                    error={error?.message}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="next"
                    onSubmitEditing={() => setFocus('email')}
                  />
                )}
              />
              <Text style={styles.sectionTitle} textStyle="body18Semibold">
                Vehicle Information
              </Text>
              <Controller
                name="vehicleRegistrationNo"
                control={control}
                defaultValue={currentUser.vehicleRegistrationNo}
                rules={{
                  required,
                  // pattern: getNamePattern(),
                }}
                render={({
                  field: {onChange, value, onBlur},
                  fieldState: {error},
                }) => (
                  <Input
                    label="Plate Number"
                    placeholder="Enter plate Number"
                    error={error?.message}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="next"
                    onSubmitEditing={() => setFocus('email')}
                  />
                )}
              />
              <Controller
                name="vehicleManufacturer"
                control={control}
                rules={{required}}
                defaultValue={currentUser.vehicleManufacturer}
                render={({field: {onChange, value, ...field}}) => (
                  <InputSelect
                    items={manufacturerList}
                    onClose={() => {
                      if (!value) {
                        onChange(manufacturerList[0].value);
                      }
                    }}
                    // onValueChange={() => {
                    //   onChange(value);
                    // }}
                    value={curVehicleManufacturer}
                    onValueChange={temp => {
                      setVehicleManufacturer(temp);
                      onChange(temp);
                      listModels(temp);
                    }}
                    inputProps={{
                      ...field,
                      label: 'Manufacturer',
                      value,
                      onChangeText: onChange,
                    }}
                  />
                )}
              />
              <Controller
                name="vehicleModel"
                control={control}
                rules={{required}}
                defaultValue={currentUser.vehicleModel}
                render={({field: {onChange, value, ...field}}) => (
                  <InputSelect
                    items={modelList}
                    onClose={() => {
                      if (!value && modelList[0]) {
                        onChange(modelList[0].value);
                      }
                    }}
                    value={curVehicleModel}
                    onValueChange={temp => {
                      setVehicleModel(temp);
                      onChange(temp);
                    }}
                    inputProps={{
                      ...field,
                      label: 'Model',
                      value,
                      onChangeText: onChange,
                    }}
                  />
                )}
              />
              <Controller
                name="vehicleYear"
                control={control}
                rules={{required}}
                defaultValue={currentUser.vehicleYear.toString()}
                render={({field: {onChange, value, ...field}}) => (
                  <InputSelect
                    items={yearList}
                    onClose={() => {
                      if (!value) {
                        onChange(yearList[0].value);
                      }
                    }}
                    // value={currentUser.vehicleYear.toString()}
                    // onValueChange={onChange}
                    value={curVehicleYear}
                    onValueChange={temp => {
                      setVehicleYear(temp);
                      onChange(temp);
                    }}
                    inputProps={{
                      ...field,
                      label: 'Year',
                      value,
                      onChangeText: onChange,
                    }}
                  />
                )}
              />
              <Controller
                name="vehicleColor"
                control={control}
                rules={{required}}
                defaultValue={currentUser.vehicleColor}
                render={({field: {onChange, value, ...field}}) => (
                  <InputSelect
                    items={ColorList}
                    onClose={() => {
                      if (!value) {
                        onChange(ColorList[0].value);
                      }
                    }}
                    value={curVehicleColor}
                    onValueChange={temp => {
                      setVehicleColor(temp);
                      onChange(temp);
                    }}
                    inputProps={{
                      ...field,
                      label: 'Model',
                      value,
                      onChangeText: onChange,
                    }}
                  />
                )}
              />
            </View>
            <Button
              disabled={!isFormValid || isLoading || !isDirty}
              title="Save changes"
              onPress={editAction}
            />
          </View>
          {modalVisible && (
            <Modal
              swipeDirection={['down']}
              onSwipeComplete={() => setModalVisible(false)}
              style={styles.imagePickerModal}
              isVisible={modalVisible}>
              <View style={styles.imagePickerContent}>
                <View style={styles.imagePickerHeader}>
                  <Text textStyle="body18Semibold">Choose Image from</Text>
                  <Icon
                    name="close"
                    size={25}
                    color={'black'}
                    style={styles.connectCloseIcon}
                    onPress={() => setModalVisible(false)}
                  />
                </View>
                <View style={styles.imagePickerButtonContainer}>
                  <TouchableOpacity
                    onPress={() => changeAvatar(0)}
                    style={styles.imagePickerButton}>
                    <Icon name="camerao" size={30} color={COLORS.black} />
                    <Text>Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => changeAvatar(1)}
                    style={styles.imagePickerButton}>
                    <Icon name="jpgfile1" size={30} color={COLORS.black} />
                    <Text>Gallery</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </KeyboardAwareScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  modal: {
    backgroundColor: COLORS.white,
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 16,
  },
  closeButton: {
    marginRight: 32,
  },
  sectionTitle: {
    marginBottom: 16,
    marginTop: 8,
  },
  phoneNumberContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 112,
    height: 112,
    borderWidth: 1,
    borderColor: COLORS.form,
    borderRadius: 100,
  },
  phoneInput: {
    height: 64,
    backgroundColor: COLORS.white,

    paddingHorizontal: 16,
    paddingTop: 8,

    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.disabled,
  },
  phoneInputText: {
    marginTop: 6,
    color: COLORS.black,
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 18 * 1.35,
  },
  phoneNumberLabel: {
    position: 'absolute',
    zIndex: 2,

    left: 16,
    top: 10,

    fontFamily: FONTS.regular,
    fontSize: 10,
  },
  avatarContainer: {
    width: 112,
    height: 112,

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    marginBottom: 60,
    marginTop: 20,
  },
  imagePickerModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  imagePickerContent: {
    backgroundColor: COLORS.white,

    padding: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imagePickerButtonContainer: {
    flexDirection: 'row',

    justifyContent: 'space-around',
  },
  imagePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagePickerButton: {
    justifyContent: 'center',
    alignItems: 'center',

    paddingTop: 20,
  },
  cameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,

    backgroundColor: COLORS.primary,
    padding: 4,
    borderRadius: 20,
  },

  deleteAvatar: {
    position: 'absolute',
    left: 0,
    bottom: 0,

    backgroundColor: COLORS.disabled,
    padding: 4,
    borderRadius: 20,
  },
});

const mapStateToProps = ({auth}) => {
  return {
    user: auth.user,
    token: auth.token,
    loading: auth.loading,
  };
};

export default connect(mapStateToProps, {
  getUser,
  updateUserToken,
})(ProfileEdit);
