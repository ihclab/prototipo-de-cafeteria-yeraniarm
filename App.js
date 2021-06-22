import * as React from 'react';
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import { SafeAreaView, View, Text, Image, TouchableOpacity, Keyboard, Alert, FlatList, StyleSheet, ScrollView,SectionList, StatusBar,TextInput } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const HamburgerIcon = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer} >
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Hamburger_icon_white.svg/1024px-Hamburger_icon_white.svg.png' }}
          style={{ width: 25, height: 25, marginLeft: 15 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const CustomSidebar = (props) => {
  const { state, descriptors, navigation } = props;
  let lastGroupName = '';
  let newGroup = true;

  return (
    <SafeAreaView style={{ flex: 1}}>
      <DrawerContentScrollView {...props}>
        {state.routes.map((route) => {
          const {
            drawerLabel,
            iconName,
            activeTintColor,
            groupName
          } = descriptors[route.key].options;
          if (lastGroupName !== groupName) {
            newGroup = true;
            lastGroupName = groupName;
          } else newGroup = false;
          return (
            <>
              {newGroup ? (
                <View style={styles.sectionView}>
                  <Text key={groupName} style={{ marginLeft: 10 }}>
                    {groupName}
                  </Text>
                  <View style={styles.separatorLine} />
                </View>
              ) : null}
              <DrawerItem
                style={{ alignItems: 'center' }}
                key={route.key}
                icon={
                  () => 
                  <Image style={{ width: 24, height: 24 }} source={ iconName } />
                }
                label={
                  ({ color }) =>
                    <Text style={{ color, textAlign: 'center' }}>
                      {drawerLabel}
                    </Text>
                }
                focused={
                  state.routes.findIndex(
                    (e) => e.name === route.name
                  ) === state.index
                }
                activeTintColor={activeTintColor}
                onPress={() => navigation.navigate(route.name)}
              />
            </>
          );
        })}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const HomeScreen = ({navigation}) => {
  // Mover el modal a cuando la orden ya esté lista, lo puse provisional aquí 
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  // hasta aquí termina lo que necesita el modal

  return (
    <SafeAreaView flex={1}>
      <View style={styles.MainContainer}>
        <Image style={{ width: 150, height: 150 }} source={ require('./img/logo.png') } />
        <Text style={{ fontSize: 20, color: 'black', textAlign: 'center', marginTop: 15 }}>Bienvenido a la cafetería de servicios  universitarios</Text>
        <TouchableOpacity 
        style={{ height: 'auto', width: 100, backgroundColor: '#65ACF3', marginTop: 25, borderRadius: 45, justifyContent: 'center', padding: 15, 
        }} onPress={()=>navigation.navigate('Second')}
        >
        <Text style={{ color:'white', textAlign: 'center' }}>Ordenar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={{ height: 'auto', width: 100, backgroundColor: '#65ACF3', marginTop: 25, borderRadius: 45, justifyContent: 'center', padding: 15, 
        }} onPress={showModal}
        >
        <Text style={{ color:'white', textAlign: 'center' }}>Orden Lista</Text>
        </TouchableOpacity>

        {/* Mover el modal a cuando la orden ya esté lista, lo puse provisional aquí  */}
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={{ padding: 50 }}>
          <Text style={{ fontSize: 18 }}>Su orden #18 está lista</Text>
          <Text style={{ marginTop: 25, fontSize: 16 }}>Por favor pase a la barra para poder recoger sus alimentos</Text>
          <Button style={{ marginTop: 25 }} onPress={hideModal}><Text style={{  color: 'black' }}>Ok</Text></Button>
        </Modal>

      </View>
    </SafeAreaView>
  );
};


const stylesJaime = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
    width: '100%',
    position: 'fixed',
    backgroundColor: 'white'
  },
   MainContainer1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: "100px",
    height: '390px',
    width: '300px',
    position: 'absolute',
    backgroundColor: '#F2EDED'
  },
  sectionView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  }
});
const SecondScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
      



  return (
    <SafeAreaView flex={1}>
      
      
      
      <View style={stylesJaime.MainContainer}>

        <Text style={{ position: "absolute", top: 7, fontSize: 25, color: 'black', fontWeight: "bold" }}>Mi orden</Text>
        <Text style={{ position: "absolute", top: 55, left: 35, fontSize: 18, color: 'black' }}>A nombre de:          </Text>
        <TextInput
        style={{position: "absolute", top: 55, left: 150, height: 22, borderColor:"black",borderWidth:1,              width: 110, fontWeight:'bold', color: 'white'}}
        />
          

          <View style={stylesJaime.MainContainer1}>
        
             <Text style={{ position: "absolute", top: 10, left : 15,  fontSize: 25 }}                 >__________________________</Text>

        <Image style={{ position: "absolute", top: 55, left: 15, width: 50, height: 40 }} source={ require            ('./img/hamburguesa1.jpg') } />
        <Text style={{ position: "absolute", top: 59, left : 85,  fontSize: 20 }}>2</Text>
        <Text style={{ position: "absolute", top: 63, left : 108,  fontSize: 14 }}>Hamburguesa</Text>
        <Text style={{ position: "absolute", top: 63, left : 215,  fontSize: 18, fontWeight:"bold" }}>$50.00</Text>


         <Image style={{ position: "absolute", top: 135, left: 15, width: 50, height: 40 }} source={ require            ('./img/agua.jpg') } />
        <Text style={{ position: "absolute", top: 139, left : 85,  fontSize: 20 }}>1</Text>
        <Text style={{ position: "absolute", top: 143, left : 108,  fontSize: 14 }}>Agua fresca</Text>
        <Text style={{ position: "absolute", top: 143, left : 215,  fontSize: 18, fontWeight:"bold" }}        >$25.00</Text>


        <Image style={{ position: "absolute", top: 215, left: 15, width: 50, height: 40 }} source={ require            ('./img/pay.jpg') } />
        <Text style={{ position: "absolute", top: 219, left : 85,  fontSize: 20 }}>1</Text>
        <Text style={{ position: "absolute", top: 223, left : 108,  fontSize: 14 }}>Postre</Text>
        <Text style={{ position: "absolute", top: 223, left : 215,  fontSize: 18, fontWeight:"bold" }}        >$25.00</Text>


<Text style={{ position: "absolute", top: 275, left : 15,  fontSize: 25 }}                 >__________________________</Text>


<Text style={{ position: "absolute", top: 320, left : 35,  fontSize: 20, color: "#897F7F" }}> Total: </Text>
<Text style={{ position: "absolute", top: 320, left : 175,  fontSize: 20, fontWeight: "bold"}}> $ 100.00 </Text>



 <TouchableOpacity 
        style={{ position:" absolute", top: 380, height: 25, width: 150, backgroundColor: '#6EED99', marginTop: 25, borderRadius: 5, justifyContent: 'center', padding: 15, 
        }} onPress={() => navigation.navigate('confirmation')}
        >
        <Text style={{ color:'white', textAlign: 'center' }}>Terminar orden</Text>
        </TouchableOpacity>


         <TouchableOpacity 
        style={{ position: "absolute", top: 340, left: 260, height: 50, width: 50, backgroundColor: '#65ACF3', marginTop: 25, borderRadius: 55, justifyContent: 'center', padding: 15, 
        } } onPress={() => navigation.navigate('sections')}
        >
        <Text style={{ color:'white', textAlign: 'center', fontWeight :"bold", fontSize: 25, }}>+</Text>
        </TouchableOpacity>


<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={{ padding: 50 }}>
          <Text style={{ fontSize: 18 }}>Orden registrada exitosamente</Text>
          <Text style={{ marginTop: 25, fontSize: 16 }}>Orden registrada con el #18</Text>
          <Button style={{ marginTop: 25 }} onPress={hideModal}><Text style={{  color: 'black' }}>Ok</Text></Button>
        </Modal>

      

      </View>

      </View>
    </SafeAreaView>
  );
};

const stylesRecent = StyleSheet.create({
  container: {
       marginTop: 3,
       marginLeft:5,
       marginRight:5,
       marginBottom:5,
       backgroundColor: '#fff',
     borderWidth: 1,
     borderColor: '#BBC1E0',
     flexDirection:'row',
     flexWrap:'wrap'
    },
    text1: {
      marginTop:10,
      marginBottom:10,
      marginLeft:4,
      height: 40,
      fontSize:12,
       color: 'black',
       textAlign:"left",
        padding:5     
    },
    text2: {
      marginTop:10,
      marginBottom:10,
      height: 40,
      fontSize:12,
      marginLeft:30,
       color: 'black',
       textAlign:"left",
        padding:5     
    }
 
   
 });
export  class ThirdScreen extends React.Component  {
  constructor(props,{navigation}) {
    super(props);
    this.state = {
          names: [
             {
                id: 18,
                nombre: 'Karen ',
                fecha:'02 de Diciembre de 2020',
                total: "$500.25"
             },
             {
                id: 19,
                nombre: 'Yerania',
                fecha:'10 de Diciembre de 2020',
                total: "$120.58"
             },
             {
                id: 20,
                nombre: 'Jaime',
                fecha:'02 de Diciembre de 2021',
                total: "$102.50"
             },
             {
                id: 21,
                nombre: 'Omar',
                fecha:'08 de Febrero de 2021',
                total: "$145.00"
             }
          ]
       }
    }
       alertItemName = (item) => {
          alert("Esto alerta no existira ya que se reenviara al detalle de la orden jeje")
       }
    
      render() {
        return (
           <View>
           <Text style={{padding: 10, fontSize: 16,color: 'black',                                  textAlign:'left'}}>
           Ordenes recientes
          </Text>
                {
                   this.state.names.map((item, index) => (
                     
                      <TouchableOpacity
                         key = {item.id}
                         style = {stylesRecent.container}
                         onPress = {() =>this.props.navigation.navigate('confirmation')}>
    
                         <div style={{backgroundColor:'#D4D4E2', height:18, padding:3}}> 
                         <span style={{ fontSize: 12,color:'black'}}>
                         #{item.id}</span></div>
    
                         <Text style = {stylesRecent.text1}>
                            A nombre de{"\n"}{item.nombre}
                         </Text>
                         <Text style = {stylesRecent.text2}>
                            Fecha: {item.fecha}{"\n"}Total: {item.total}
                         </Text>
    
                      </TouchableOpacity>
                    
                   ))
                }
             </View>
        );
      }
    }

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
    width: '100%',
    position: 'fixed',
    backgroundColor: 'white'
  },
  sectionView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  }
});


const menuScreen=({navigation})=>{
  const [visible, setVisible] = React.useState(false);
  const [number, onChangeNumber] = React.useState(0);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 10};

  const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"]
    }
  ];
  const Item = ({ title }) => (
    <View style={stylesmenu.item}  >
     <Image
          
          style={stylesmenu.tinyLogo}
          source={{
            uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
          }}
        />
      <Text style={stylesmenu.title} onPress={showModal}>{title}</Text>
    </View>
  );
  return (
    <SafeAreaView style={stylesmenu.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item}  />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={stylesmenu.header}  >{title}</Text>
      )}
     
    />
     <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={{ padding: 10 }}>
          <Text style={{ fontSize: 18,textAlign: 'center',marginTop:20 }}>¿cuántas unidades de este  alimento desea ordenar?</Text>
          <TextInput
        style={stylesmenu.input}
        onChangeText={onChangeNumber}
        value={number}
      />
      <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
          <Button style={{backgroundColor:'red',margin: 15 }} onPress={hideModal}><Text style={{  color: 'black' }}>Cancelar</Text></Button>
          <Button style={{backgroundColor:'blue',margin: 15 }} onPress={() => navigation.navigate('Second')}><Text style={{  color: 'black' }}>Ordenar</Text></Button>
          </div>
        </Modal>
  </SafeAreaView>
  );
} 
const stylesmenu = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    height:'auto',
paddingTop: StatusBar.currentHeight,
marginHorizontal: 16
},
item: {
flex: 2,
flexDirection: 'row',
backgroundColor: "#FFFFFF",
padding: 0,
marginVertical: 8,
textAlign: 'center',
borderRadius:10
},
header: {
fontSize: 22,

textAlign: 'center'
},
title: {
fontSize: 24,
textAlign: 'center'
},
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
   tinyLogo: {
    width: 100,
    height: 90,
    marginTop:0,
    marginRight:50,
    borderRadius:10
  },
  input: {
    height: 40,
    margin: 12,
    marginTop:30,
    marginBottom:20,
    borderWidth: 1,
    padding:10
  }
});

const sectionsScreen=({navigation})=>{
  const DATA = [];
  const data = [
    { key: 'Desayunos' },
    { key: 'Comidas' },
    { key: 'Bebidas' },
    { key: 'Postres' },
    
  ];
  
   const column1Data = data.filter((item, i) => i%2 === 0);
    const column2Data = data.filter((item, i) => i%2 === 1);
    const styles3 = StyleSheet.create({
      container: {
        flex: 2,
        flexDirection: 'row',
        height:'auto'
      },
      column: {
        flex: 1,
        flexDirection: 'column',
        margin:2
      },
      row: {
        flexDirection: 'row'
      },
      item: {
          backgroundColor: "#C4C4C4",
        padding: 20,
        marginVertical: 8,
        flex: 1,
        borderRadius:10
        
      },
      title: {
        fontSize: 32,
      },
    });
    return (
      <>
      <Text style={{ marginTop: 5, fontSize: 26,textAlign: 'center'  }}>Menú</Text>
      <View style={ styles3.container }>
  
        <View style={ styles3.column }>
          <FlatList
            data={ column1Data }
            renderItem={ ({ item }) => (
              <View  style={ styles3.item } >
                <Text onPress={() => navigation.navigate('menu')} style={{textAlign: 'center'  }}>{ item.key }</Text>
              </View>
            ) }
          />
        </View>
  
        <View style={ styles3.column }>
          <FlatList
            data={ column2Data }
            renderItem={ ({ item }) => (
              <View style={ styles3.item }>
                <Text style={{textAlign: 'center'  }}>{ item.key }</Text>
              </View>
            ) }
          />
        </View>
  
      </View>
      </>
    );
}
const confirmationScreen=()=>{
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
      



  return (
    <SafeAreaView flex={1}>
      
      
      
      <View style={stylesJaime.MainContainer}>

      <Text style={{ position: "absolute", top: 7, fontSize: 25, color: 'black', fontWeight: "bold" }}>Orden #18</Text> 
          

          <View style={stylesJaime.MainContainer1}>
        
             <Text style={{ position: "absolute", top: 10, left : 15,  fontSize: 25 }}                 >__________________________</Text>

             <Image style={{ position: "absolute", top: 55, left: 15, width: 50, height: 40 }} source={ require            ('./img/hamburguesa1.jpg') } />
        <Text style={{ position: "absolute", top: 59, left : 85,  fontSize: 20 }}>2</Text>
        <Text style={{ position: "absolute", top: 63, left : 108,  fontSize: 14 }}>Hamburguesa</Text>
        <Text style={{ position: "absolute", top: 63, left : 215,  fontSize: 18, fontWeight:"bold" }}>$50.00</Text>


         <Image style={{ position: "absolute", top: 135, left: 15, width: 50, height: 40 }} source={ require            ('./img/agua.jpg') } />
        <Text style={{ position: "absolute", top: 139, left : 85,  fontSize: 20 }}>1</Text>
        <Text style={{ position: "absolute", top: 143, left : 108,  fontSize: 14 }}>Agua fresca</Text>
        <Text style={{ position: "absolute", top: 143, left : 215,  fontSize: 18, fontWeight:"bold" }}        >$25.00</Text>


        <Image style={{ position: "absolute", top: 215, left: 15, width: 50, height: 40 }} source={ require            ('./img/pay.jpg') } />
        <Text style={{ position: "absolute", top: 219, left : 85,  fontSize: 20 }}>1</Text>
        <Text style={{ position: "absolute", top: 223, left : 108,  fontSize: 14 }}>Postre</Text>
        <Text style={{ position: "absolute", top: 223, left : 215,  fontSize: 18, fontWeight:"bold" }}        >$25.00</Text>


<Text style={{ position: "absolute", top: 275, left : 15,  fontSize: 25 }}                 >__________________________</Text>


<Text style={{ position: "absolute", top: 320, left : 35,  fontSize: 20, color: "#897F7F" }}> Total: </Text>
<Text style={{ position: "absolute", top: 320, left : 175,  fontSize: 20, fontWeight: "bold"}}> $ 100.00 </Text>


<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={{ padding: 50 }}>
          <Text style={{ fontSize: 18 }}>Orden registrada exitosamente</Text>
          <Text style={{ marginTop: 25, fontSize: 16 }}>Orden registrada con el #18</Text>
          <Button style={{ marginTop: 25 }} onPress={hideModal}><Text style={{  color: 'black' }}>Ok</Text></Button>
        </Modal>

      

      </View>

      </View>
    </SafeAreaView>
  );
}
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Cafetería',
          headerLeft: () => (<HamburgerIcon navigationProps={navigation} />),
          headerStyle: {
            backgroundColor: '#F36565',
          },
          headerTintColor: '#fff',
        }}
      />
      
    </Stack.Navigator>
  );
}

function SecondStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <HamburgerIcon navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#F36565',
        },
        headerTintColor: '#fff',
      }}>

      <Stack.Screen
        name="SecondScreen"
        component={SecondScreen}
        options={{
          title: 'Ordenar',
        }}
      />

    </Stack.Navigator>
  );
}

function ThirdStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <HamburgerIcon navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#F36565',
        },
        headerTintColor: '#fff',
      }}>

      <Stack.Screen
        name="ThirdScreen"
        component={ThirdScreen}
        options={{
          title: 'Recientes',
        }}
      />

    </Stack.Navigator>
  );
}


function fourthStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <HamburgerIcon navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#F36565',
        },
        headerTintColor: '#fff',
      }}>

      <Stack.Screen
        name="FourthScreen"
        component={menuScreen}
        options={{
          title: 'Menú',
        }}
      />

    </Stack.Navigator>
  );
}

function fifthStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <HamburgerIcon navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#F36565',
        },
        headerTintColor: '#fff',
      }}>

      <Stack.Screen
        name="FourthScreen"
        component={sectionsScreen}
        options={{
          title: 'Menú',
        }}
      />

    </Stack.Navigator>
  );
}

function sixthStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <HamburgerIcon navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#F36565',
        },
        headerTintColor: '#fff',
      }}>

      <Stack.Screen
        name="FourthScreen"
        component={confirmationScreen}
        options={{
          title: 'Menú',
        }}
      />

    </Stack.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomSidebar {...props} />}>
        
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Menú',
            activeTintColor: '#F36565',
            iconName: require("./img/menu.png")
          }}
          component={HomeStack}
        />

        <Drawer.Screen
          name="Second"
          options={{
            drawerLabel: 'Ordenar',
            activeTintColor: '#F36565',
            iconName: require("./img/ordenar.png")
          }}
          component={SecondStack}
        />

        <Drawer.Screen
          name="Third"
          options={{
            drawerLabel: 'Recientes',
            activeTintColor: '#F36565',
            iconName: require("./img/recientes.png")
          }}
          component={ThirdStack}
        />
        <Drawer.Screen
           name="menu"
           
           component={fourthStack}
        />
         <Drawer.Screen
           name="sections"
           
           component={fifthStack}
        />
         <Drawer.Screen
           name="confirmation"
           
           component={sixthStack}
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}