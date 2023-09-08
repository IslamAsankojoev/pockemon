interface IAbility {
  id: number;
  name: string;
  description: string;
  pokemon: IPokemonPopulated[];
}

interface IAbilityPopulated {
  ability: {
    name: string;
    url: string;
  }
}

interface IAbilityListItem {
  name: string;
  url: string;
}