import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Button,
  StatusBar,
} from 'react-native';
import {RNCamera} from "react-native-camera";

const PendingView = () => (
  <View style={{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }}>
      <Text style={{fontSize:30,color:"red"}}>Loading...</Text>
  </View>
)

const App = () => {
  const [image,setImage] = useState(null);

  const takePicture = async (camera) => {
    try {
      const options = {quality:0.9, base64:false}
      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0a79df" />
    {
      image ? (
        <View style={styles.preview}>
          <Text style={styles.camtext}>
            Here is your snap
          </Text>
          <Image style={styles.clicked} source={{uri:image,width:"100%",height:'80%'}} />
          <Button 
            title="Click New Image"
            onPress={
              () => {
                setImage(null)
              }
            }
          ></Button>
        </View>
      ) : (
      <RNCamera
       style={styles.preview}
       type={RNCamera.Constants.Type.back}
       captureAudio={false}
       flashMode={RNCamera.Constants.FlashMode.off}
       androidCameraPermissionOptions={{
         title:"Permission to use camera",
         message:"longer text to use camera",
         buttonPositive:"Accept",
         buttonNegative:"Reject"
       }}
       androidRecordAudioPermissionOptions={{
         title:"Permission to use audio",
         message:"longer text to use audio",
         buttonPositive:"Accept",
         buttonNegative:"Reject"
       }}
      >
         {
           ({camera,status}) => {
             if(status !== 'READY') return <PendingView />
             return(
               <View style={{
                 flex:0,
                 flexDirection:'row',
                 justifyContent:'center'
               }}>
                 <Pressable onPress={
                   ()=>takePicture(camera)
                 }
                 style={styles.capture}>
                   <Text>Snap</Text>
                 </Pressable>
               </View>
             )
           }
         }
      </RNCamera>
      )
    }
 </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#0a79df"
  },
  preview:{
    flex:1,
    justifyContent:"space-around",
    alignItems:"center"
  },
  capture:{
    flex:0,
    backgroundColor:"orange",
    padding:10,
    alignSelf:'center',
  },
  camtext:{
    backgroundColor:"#3498db",
    color:"#fff",
    // marginBottom:10,
    width:"100%",
    textAlign:"center",
    paddingVertical:12,
    fontSize:25
  },
  clicked:{
    width:300,
    height:300,
    borderRadius:150
  }
});

export default App;
