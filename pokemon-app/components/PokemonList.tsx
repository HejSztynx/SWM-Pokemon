import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useRef, useState } from "react";
import { ActivityIndicator, RefreshControl, View } from "react-native";
import { PokemonData } from "./types";
import PokemonCard from "./PokemonCard";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import PokemonBottomSheet from "./PokemonBottomSheet";
import { fetchPokemonPage } from "@/util/pokemonApi";

export default function PokemonList() {
  const bottomSheetRef = useRef<null | BottomSheet>(null);

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(
    null
  );

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
    queryFn: fetchPokemonPage,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const pokemons = useMemo(
    () => data?.pages.flatMap((page) => page.pokemons) || [],
    [data]
  );

  const handleOpenBottomSheet = useCallback((pokemon: PokemonData) => {
    setSelectedPokemon(pokemon);
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1 }}>
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
        <PokemonBottomSheet
          bottomSheetRef={bottomSheetRef}
          selectedPokemon={selectedPokemon}
        />
      </View>
    </GestureHandlerRootView>
  );
}
