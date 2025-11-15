import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, StatusBar, ActivityIndicator, TextInput } from "react-native";
import { WebView } from "react-native-webview";
import type { WebView as WebViewType } from "react-native-webview";

const KAKAO_APP_KEY = "f143a20f2be877dcef35366b593462b0";
const BACKEND_URL = "http://13.209.202.27:8080/map/main";

export default function HomeScreen() {
  const webViewRef = useRef<WebViewType>(null);
  const [searchText, setSearchText] = useState("");

  const kakaoMapHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false"></script>
      <style>
        html, body, #map { width:100%; height:100%; margin:0; padding:0; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        kakao.maps.load(async function() {
          const container = document.getElementById("map");
          const map = new kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(37.5665, 126.9780),
            level: 3
          });

          async function loadMarkers() {
            const res = await fetch("${BACKEND_URL}");
            const data = await res.json();
            const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

            data.forEach((pos) => {
              const markerImage = new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(24, 35));
              const marker = new kakao.maps.Marker({
                map,
                position: new kakao.maps.LatLng(pos.latitude, pos.longitude),
                title: pos.name,
                image: markerImage,
              });

              const content = \`
                <div style="padding:8px;font-size:13px;max-width:220px;">
                  <b>\${pos.name}</b><br>
                  주소: \${pos.lotAddress ?? "-"}<br>
                  연락처: \${pos.tel ?? "-"}<br>
                  설명: \${pos.description ?? "-"}<br>
                </div>\`;
              const infowindow = new kakao.maps.InfoWindow({ content });
              kakao.maps.event.addListener(marker, "click", () => infowindow.open(map, marker));
            });
          }

          await loadMarkers();

          // 🔍 React Native에서 검색어가 오면 지도 이동
          document.addEventListener("message", function(e) {
            const keyword = e.data.trim();
            if (!keyword) return;

            // Kakao Places API로 검색
            const ps = new kakao.maps.services.Places();
            ps.keywordSearch(keyword, function(result, status) {
              if (status === kakao.maps.services.Status.OK) {
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                map.setCenter(coords);
                const marker = new kakao.maps.Marker({ position: coords });
                marker.setMap(map);
              } else {
                alert("검색 결과가 없습니다.");
              }
            });
          });
        });
      </script>
    </body>
  </html>`;

  // 🔍 입력 시 지도에 검색어 전달
  const handleSearchSubmit = () => {
    if (webViewRef.current && searchText.trim()) {
      webViewRef.current.postMessage(searchText);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.serviceTitle}>CHAJAJJU</Text>
      </View>

      <View style={styles.mapWrapper}>
        <WebView
          ref={webViewRef}
          originWhitelist={["*"]}
          source={{ html: kakaoMapHTML }}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          renderLoading={() => <ActivityIndicator size="large" color="#2cd543" />}
        />

        {/* 🟩 지도 위에 검색 입력창 */}
        <View style={styles.searchBoxWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="거점 이름으로 검색하세요"
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#2cd5431b",
    marginTop:30,
  },
  serviceTitle: { fontSize: 20, fontWeight: "800", color: "#2cd5439e" },
  mapWrapper: {
    flex: 1,
    position: "relative",
    margin: 3,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2cd5431b",
  },
  searchBoxWrapper: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  searchInput: {
    fontSize: 15,
    color: "#333",
  },
});