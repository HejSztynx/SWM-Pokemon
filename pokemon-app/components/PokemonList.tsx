import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PokemonData } from "./types";
import PokemonCard from "./PokemonCard";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { usePokemonContext } from "./context/PokemonContext";

interface Page {
  pokemons: PokemonData[];
  nextPage: number;
}

const urlBase = "https://pokeapi.co/api/v2/pokemon/";

const fetchPokemonData = (id: number): Promise<PokemonData | null> => {
  return fetch(`${urlBase}${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => ({
      id: data.id.toString(),
      name: data.name,
      imageUrl: data.sprites.front_default,
    }))
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export default function PokemonList() {
  // const [message, setMessage] = useState<string>("nie wiem");

  const { setFavoritePokemon } = usePokemonContext();

  const bottomSheetRef = useRef<null | BottomSheet>(null);

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(
    null
  );

  const fetchPokemons = async (pageParam: number = 0) => {
    try {
      const ids = Array.from({ length: 20 }, (_, i) => pageParam * 20 + i + 1);
      const pokemonPromises = ids.map((id) => fetchPokemonData(id));
      const pokemonResults = await Promise.all(pokemonPromises);
      return pokemonResults.filter((item) => item !== null);
    } catch (err) {
      // setMessage(err.message);
      console.error("Error fetching pokemons", err);
      return [];
    }
  };

  const fetchPage = async ({ pageParam = 0 }): Promise<Page> => {
    const pokemons: PokemonData[] = await fetchPokemons(pageParam);
    console.log("page " + pageParam);

    return { pokemons, nextPage: pageParam + 1 };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    initialPageParam: 0,
    queryFn: fetchPage,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const pokemons = useMemo(
    () => data?.pages.flatMap((page) => page.pokemons) || [],
    [data]
  );

  const handleOpenBottomSheet = useCallback((pokemon: PokemonData) => {
    setSelectedPokemon(pokemon);
    console.log("otwieram " + pokemon.name);
    bottomSheetRef.current?.expand();
  }, []);

  const handlePressSetFavorite = () => {
    setFavoritePokemon(selectedPokemon);
  };

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlashList
          data={pokemons}
          keyExtractor={(item) => String(item.id)}
          refreshControl={
            <RefreshControl
              tintColor={"blue"}
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          }
          renderItem={({ item }) => (
            <PokemonCard
              pokemonData={item}
              onPress={() => handleOpenBottomSheet(item)}
            />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={() =>
            hasNextPage && !isFetchingNextPage && fetchNextPage()
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator
                color="blue"
                size="small"
                style={{ marginBottom: 5 }}
              />
            ) : null
          }
        />
        <BottomSheet ref={bottomSheetRef}>
          {selectedPokemon && (
            <BottomSheetView>
              <View style={styles.sheetContent}>
                <Text style={styles.title}>{selectedPokemon.name}</Text>
                <Button
                  title="Set as favorite"
                  onPress={handlePressSetFavorite}
                />
              </View>
            </BottomSheetView>
          )}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
