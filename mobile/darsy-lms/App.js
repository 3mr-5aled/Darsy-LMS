import * as React from "react"
import { WebView } from "react-native-webview"
import { useEffect, useRef } from "react"
import { ActivityIndicator, BackHandler, Platform, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { usePreventScreenCapture } from "expo-screen-capture"

export default function App() {
  usePreventScreenCapture()

  const webViewRef = useRef(null)
  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack()
      return true // prevent default behavior (exit app)
    }
    return false
  }

  useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress)
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress)
      }
    }
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1d232a" }}>
      <WebView
        originWhitelist={"https://darsy-lms-beta.vercel.app/"}
        source={{ uri: "https://darsy-lms-beta.vercel.app/" }}
        ref={webViewRef}
        startInLoadingState
        renderLoading={() => (
          <View style={{ flex: 1 }}>
            <ActivityIndicator size="large" color="lightskyblue" />
          </View>
        )}
      />
    </SafeAreaView>
  )
}
