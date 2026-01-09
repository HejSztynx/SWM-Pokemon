import { PokemonData, PokemonTypeDto } from "@/components/types";

interface Page {
  pokemons: PokemonData[];
  nextPage: number;
}

const urlBase = "https://pokeapi.co/api/v2/pokemon/";

const pokemonDataUrl = (id: number) => {
  return `${urlBase}${id}`;
};

const fetchPokemonData = (id: number): Promise<PokemonData | null> => {
  return fetch(pokemonDataUrl(id))
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
      types: data.types,
      cryUrl: data.cries.latest,
    }))
    .then((data) => {
      const typesDto: PokemonTypeDto[] = data.types;
      data.types = typesDto.map((typeDto) => typeDto.type);
      return data;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

const fetchPokemons = async (pageParam: number = 0) => {
  try {
    const ids = Array.from({ length: 20 }, (_, i) => pageParam * 20 + i + 1);
    const pokemonPromises = ids.map((id) => fetchPokemonData(id));
    const pokemonResults = await Promise.all(pokemonPromises);
    return pokemonResults.filter((item) => item !== null);
  } catch (err) {
    console.error("Error fetching pokemons", err);
    return [];
  }
};

export const fetchPokemonPage = async ({ pageParam = 0 }): Promise<Page> => {
  const pokemons: PokemonData[] = await fetchPokemons(pageParam);

  return { pokemons, nextPage: pageParam + 1 };
};
