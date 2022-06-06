import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  //Components
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    width: '100%',
    padding: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  leftContent: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  rightContent: {
    display: 'flex',
    flex: 1,
    padding: 5
  },
  icon: {

  },
  cardRightContent: {
    display: 'flex',
    backgroundColor: '#fff',
    //flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  //Texts
  condition: {
    fontFamily: "Jura-Regular",
    fontSize: 20,
    textAlign: 'center'
  },
  cityName: {
    fontFamily: "Jura-Regular",
    fontSize: 32,
  },
  temperature: {
    fontFamily: "Jura-Regular",
    fontSize: 72,
    textAlign: 'center'
  },
  minmax: {
    fontFamily: "Jura-Regular",
    fontSize: 20
  },
});

export default styles;