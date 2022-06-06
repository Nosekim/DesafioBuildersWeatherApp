import { PermissionsAndroid, Platform, Linking, Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const checkLocationPermission = async () => await PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION');

const hasLocationPermissionIOS: () => Promise<boolean> = async () => {
  try {
    const permission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then((result) => result)
      .catch(() => { throw "Error permission" })
      .finally(() => { })

    if (permission === RESULTS.GRANTED) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  };
};

export const requestIOSLocationPermission = async () => {
  return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        return { granted: false, requestable: false }
      case RESULTS.DENIED:
        return { granted: false, requestable: true }
      case RESULTS.LIMITED:
        return { granted: false, requestable: true }
      case RESULTS.GRANTED:
        return { granted: true, requestable: true }
      case RESULTS.BLOCKED:
        return { granted: false, requestable: false }
      default:
        return { granted: false, requestable: false }
    }
  })
    .catch(error => {
      return { granted: false, requestable: false }
    })
}

export const requestAndroidLocationPermission = async () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  )
    .then(async res => {
      switch (res) {
        case PermissionsAndroid.RESULTS.GRANTED:
          return { granted: true, requestable: true }
        case PermissionsAndroid.RESULTS.DENIED:
          return { granted: false, requestable: true }
        case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
          return { granted: false, requestable: false }
        default:
          return { granted: false, requestable: true }
      }
    })
    .catch(error => {
      return { granted: false, requestable: false }
    })
}

const checkLocationPermissionAndroid = async () => {
  const havePermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    .then(async res => {
      if (res) {
        return true
      } else {
        return false;
      }
    })
    .catch(error => {
      console.log(error)
      return false
    })

  return havePermission
}

const hasLocationPermissionAndroid = async () => {
  const haveLocationPermission = await checkLocationPermissionAndroid();
  return haveLocationPermission;
}

export const hasLocationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'ios') {
      const locationPermission = await hasLocationPermissionIOS();
      return locationPermission;
    } else {
      const locationPermission = await hasLocationPermissionAndroid();
      return locationPermission;
    }
  } catch (error) {
    Alert.alert("Erro nas permissões de localização.");
    return false;
  }
};