import React, {useState, useEffect, useRef} from 'react';
import {View, SafeAreaView, Platform, TouchableOpacity} from 'react-native';
import dynamicStyles from './styles';
import {Text, Input, Button} from '@components';
import {required, getNamePattern} from '@app/src/utils/validation';
import {InputSelect} from '@app/src/components/Input/InputSelect';
import {Controller, useForm} from 'react-hook-form';
import svgs from '../../../../assets/svg/svgs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {getModels} from '@app/src/screens/utils/api/actions';
import {ColorList} from '@app/src/lib/constants';

const VehicleInformationScreen = props => {
  const {navigation, route} = props;
  const accountId = route.params.accountId;
  const userType = route.params.userType;
  const personalData = route.params.data;
  const manuRef = useRef();

  const {
    setFocus,
    control,
    handleSubmit,
    getValues,
    formState: {isValid: isFormValid},
  } = useForm({
    mode: 'onChange',
  });

  const styles = dynamicStyles();

  const [loading, setLoading] = useState(false);
  const manufacturerList = useSelector(state => state.auth.manufacturerList);
  const [modelList, setModelList] = useState([]);

  const [yearList, setYearList] = useState([]);
  const [models, setModels] = useState([]);

  const [vehicleManufacturer, setVehicleManufacturer] = useState('');
  const [selectedModel, setModel] = useState('');

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
        setModels(data);
        // newYears.sort((a, b) => a.value - b.value);
        // setYearList(newYears);
        setModelList(newModels);
      })
      .catch(e => {
        console.log(e.response.data);
      });
  };
  useEffect(() => {
    let newYears = [];
    newYears.push({
      value: '',
      label: '',
    });
    models.map(item => {
      if (item.modelName === selectedModel) {
        const temp = {};
        temp.value = item.year;
        temp.label = item.year;
        newYears.push(temp);
      }
    });
    newYears.sort((a, b) => a.value - b.value);
    setYearList(newYears);
  }, [selectedModel, models]);

  const saveAction = async data => {
    const newData = {...data, ...personalData};
    navigation.navigate('Payment', {
      data: newData,
      accountId: accountId,
      userType: userType,
    });
  };
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <KeyboardAwareScrollView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.scrollContainer}>
        <View style={styles.container}>
          <View>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => goBack()}>
                <svgs.Back />
              </TouchableOpacity>
              <Text textStyle="body18Medium" style={styles.title}>
                Vehicle Information
              </Text>
            </View>
            <Text textStyle="body10Regular" style={styles.step}>
              Step 3 of 4
            </Text>
            <Text textStyle="body14Regular" style={styles.description}>
              Please fill the forms to provide your vehicle details
            </Text>
            <Controller
              name="vehicleRegistrationNo"
              control={control}
              defaultValue=""
              rules={{
                required,
              }}
              render={({
                field: {onChange, value, onBlur},
                fieldState: {error},
              }) => (
                <Input
                  label="Registration number"
                  placeholder="Enter registration number"
                  error={error?.message}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    Platform.OS === 'android'
                      ? manuRef.current?.focus()
                      : manuRef.current?.togglePicker(true);
                  }}
                />
              )}
            />
            <Controller
              name="vehicleManufacturer"
              control={control}
              rules={{required}}
              defaultValue=""
              render={({field: {onChange, value, ...field}}) => (
                <InputSelect
                  items={manufacturerList}
                  onClose={() => {
                    if (!value && manufacturerList[0]) {
                      onChange(manufacturerList[0].value);
                      listModels(manufacturerList[0].value);
                    }
                  }}
                  ref={Platform.OS === 'ios' ? manuRef : null}
                  pickerProps={{
                    ref: Platform.OS === 'android' ? manuRef : null,
                  }}
                  // onValueChange={onChange}
                  onValueChange={temp => {
                    setVehicleManufacturer(temp);
                    onChange(temp);
                    listModels(temp);
                  }}
                  inputProps={{
                    ...field,
                    label: 'Select manufacturer',
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
              defaultValue=""
              render={({field: {onChange, value, ...field}}) => (
                <InputSelect
                  items={modelList}
                  onClose={() => {
                    if (!value) {
                      // onChange(modelList[0].value);
                    }
                  }}
                  onValueChange={temp => {
                    setModel(temp);
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
              defaultValue=""
              render={({field: {onChange, value, ...field}}) => (
                <InputSelect
                  items={yearList}
                  onClose={() => {
                    if (!value) {
                      // onChange(yearList[0].value);
                    }
                  }}
                  onValueChange={onChange}
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
              defaultValue=""
              render={({field: {onChange, value, ...field}}) => (
                <InputSelect
                  items={ColorList}
                  onClose={() => {
                    if (!value) {
                      onChange(ColorList[0].value);
                    }
                  }}
                  onValueChange={onChange}
                  inputProps={{
                    ...field,
                    label: 'Color',
                    value,
                    onChangeText: onChange,
                  }}
                />
              )}
            />
            <Button
              onPress={handleSubmit(saveAction)}
              disabled={loading || !isFormValid}
              title="Continue"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default VehicleInformationScreen;
