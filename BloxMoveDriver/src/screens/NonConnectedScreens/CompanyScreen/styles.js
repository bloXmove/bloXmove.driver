import { StyleSheet, Dimensions, Platform } from 'react-native'

const width = Dimensions.get('window').width

const codeInptCellWidth = width * 0.18

const dynamicStyles = (appStyles, colorScheme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            // justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
        },
        title: {
            fontSize: 18,
            fontWeight: '500',
            color: appStyles.colorSet[colorScheme].blackColor,
        },
        subTitle: {
            fontSize: 14,
            fontWeight: '500',
            color: appStyles.colorSet[colorScheme].grey9,
        },
        text: {
            fontSize: 16,
            textAlign: 'left',
            color: appStyles.colorSet[colorScheme].blackColor,
        },
        timeText : {
            fontSize: 16,
            textAlign: 'left',
            color: appStyles.colorSet[colorScheme].blackColor,
            paddingTop : 5,
        },
        depText: {
            fontSize: 16,
            textAlign: 'left',
            color: appStyles.colorSet[colorScheme].blackColor,
            paddingBottom : 10,
        },
        desText: {
            fontSize: 16,
            textAlign: 'left',
            color: appStyles.colorSet[colorScheme].blackColor,
            paddingTop: 10,
        },
        image: {
            width: "100%",
            position: "absolute",
            height: 200,
        },
        boxContainer: {
            width: "95%",
            backgroundColor: "white",
            borderRadius: 8,
            shadowColor: "rgba(0,0,0,0.5)",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        bottomContainer: {
            position: "absolute",
            bottom: 30,
        },
        flexContainer: {
            flexDirection: "row",
        },
        headerContainer: {
            backgroundColor: "#F7F7F7",
            borderTopEndRadius: 8,
            borderTopStartRadius: 8,
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 15,
            flexDirection : 'row'
        },
        bodyContainer: {
            backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
            borderTopEndRadius: 8,
            borderTopStartRadius: 8,
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        footerContainer: {
            backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
            borderBottomEndRadius: 8,
            borderBottomStartRadius: 8,
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        leftContainer: {
            width: "10%",
        },
        rightContainer: {
            justifyContent: "center",
            width: "85%",
        },
        centerContainer: {
            justifyContent: "center",
            alignItems: "center"
        },
        bodyBottomContainer: {
            backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
            borderTopEndRadius: 8,
            borderTopStartRadius: 8,
            paddingHorizontal: 20,
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: 'center'
        },
        bodySmallBottomContainer: {
            backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
            borderTopEndRadius: 8,
            borderTopStartRadius: 8,
            paddingHorizontal: 20,
            paddingVertical: 5,
            flexDirection: "row",
            alignItems: 'center'
        },
        iconContainer: {
            backgroundColor: appStyles.colorSet[colorScheme].mainColor,
            padding: 15,
            borderRadius: 50,
            color: "white",
            marginRight: 20,
        },
        mapContainer : { 
            width: "100%", 
            height: "100%", 
        },
        divider: {
            borderBottomColor: '#eee',
            borderBottomWidth: 0.5,
        },
        taxiMapIcon :{
            width : 50,
            height : 50,
        },
        makerImg: {
            width: 50,
            height: 50,
            resizeMode: 'contain',
            position: "absolute",
            right: 20,
            top: 10,
        },
        imgContainer : {
            backgroundColor : appStyles.colorSet[colorScheme].grey0,
            borderRadius : 50,
            width : 70,
            height : 70,
            top : -40,
            alignSelf : "center",
            alignContent : "center",
            justifyContent : 'center'
        },
        reviewImg : {
            width: 60,
            height: 60,
            resizeMode: 'contain',
            alignSelf : "center",
        },
        btnSMContainer: {
            alignItems: "center",
            alignSelf: "flex-end",
            backgroundColor: appStyles.colorSet[colorScheme].mainColor,
            padding: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'white',
            width: "30%",
        },
        btnContainer: {
            alignItems: "center",
            alignSelf: "flex-end",
            backgroundColor: appStyles.colorSet[colorScheme].mainColor,
            padding: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'white',
            width: "50%",
        },
        btnCancelContainer: {
            alignItems: "center",
            alignSelf: "flex-end",
            backgroundColor: appStyles.colorSet[colorScheme].blackColor,
            padding: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'white',
            width: "50%",
        },
        btnSMText: {
            fontSize : 14,
            fontWeight : "500",
            color : appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
        },
        btnText: {
            fontSize : 16,
            fontWeight : "500",
            color : appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
        },
        track: {
            position: "absolute",
            right: 0,
            top: -30,
        },
        // Modal
        modalView: {
            justifyContent: 'flex-end',
            margin: 0,
            flex: 1,
        },
        modalHeader: {
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingBottom: 23,
        },
        Modalcontent: {
            flex: Platform.OS ==='ios'?0.77:0.85,
            // flex: 1,
            height: "80%",
            backgroundColor: 'white',
            // padding: 22,
            // justifyContent: 'center',
            // alignItems: 'center',
            borderRadius: 20,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            paddingBottom: 30,
        },
        // Cancel
        headerImg: {
            width: "100%",
            height: 180,
            position: 'absolute',
            left: 0,
        },
        centerCarContainer: {
            width: 70,
            height: 70,
            marginTop: -40,
            backgroundColor: appStyles.colorSet[colorScheme].grey0,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
        },
        inputBox: {
            width: "100%",
            height: 100,
            borderWidth: 1,
            borderColor: appStyles.colorSet[colorScheme].grey3,
            padding: 10,
            color: appStyles.colorSet[colorScheme].blackColor,
            borderRadius: 8,
            // marginVertical : 10
            marginTop : 5,
            marginBottom : 10,
        },
        passInputBox: {
            width: "100%",
            height: 40,
            borderBottomWidth: 1,
            borderColor: appStyles.colorSet[colorScheme].grey3,
            color: appStyles.colorSet[colorScheme].blackColor,
            // paddingVertical: 10,
        },
    });
};

export default dynamicStyles;
