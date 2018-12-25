import React from "react";
import { unstable_createResource as createResource } from "react-cache";
import sleep from "sleep-promise";

let Resource = createResource(id =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res =>
    res.json()
  )
);

export function Detail({ pokemonId: id }) {
  let pokemon = Resource.read(id);

  return <article>{pokemon.name}</article>;
}

let CollectionResource = createResource(() =>
  fetch("https://pokeapi.co/api/v2/pokemon/").then(res =>
    res.json()
  )
);

export function ListItem({
  className,
  component: Component = "li",
  ...props
}) {
  return (
    <Component
      className={["pokemon-list-item", className].join(" ")}
      {...props}
    />
  );
}

export function List({ renderItem }) {
  return CollectionResource.read().results.map(pokemon =>
    renderItem({
      id: pokemon.url.split("/")[6],
      ...pokemon,
    })
  );
}

export function ListError() {
  return <span>Couldn't catch 'em all</span>;
}

export function DetailFallback() {
  return <span>Looking for Pokemon...</span>;
}

export function ListFallback() {
  return <span>Looing for Pokemons...</span>;
}
