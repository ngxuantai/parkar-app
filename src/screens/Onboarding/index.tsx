import { Images } from "@src/assets";
import FooterButton from "@src/components/Onboarding/FooterButton";
import Indicator from "@src/components/Onboarding/Indicator";
import SlideOnboarding from "@src/components/Onboarding/SlideOnboarding";
import { Layout } from "@src/constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";

const slides = [
  {
    id: "1",
    image: Images.LicensePlate,
    title: "Register vehicle",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "2",
    image: Images.Parking,
    title: "Find parking",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "3",
    image: Images.Card,
    title: "Easy payment",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const updateCurrentSlideIndex = (e: {
    nativeEvent: { contentOffset: { x: any } };
  }) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / Layout.window.width);
    setCurrentIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * Layout.window.width;
      slidesRef?.current.scrollToOffset({ offset });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * Layout.window.width;
    slidesRef?.current.scrollToOffset({ offset });
    setCurrentIndex(lastSlideIndex);
  };

  const getStarted = () => {
    navigation.navigate("SignIn");
  };

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SlideOnboarding item={item} />}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          onMomentumScrollEnd={updateCurrentSlideIndex}
        />
      </View>
      <Indicator style={styles.indicator} data={slides} scrollX={scrollX} />
      <FooterButton
        style={{ flex: 1 }}
        slides={slides}
        currentIndex={currentIndex}
        goToNextSlide={goToNextSlide}
        skip={skip}
        getStarted={getStarted}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  indicator: {
    flex: 1,
  },
});
