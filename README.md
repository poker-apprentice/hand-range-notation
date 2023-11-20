# Hand Range Notation

TODO

## Installation

Add `@poker-apprentice/hand-range-notation` as a dependency.

- yarn:
  ```bash
  yarn add @poker-apprentice/hand-range-notation
  ```
- npm:
  ```bash
  npm install @poker-apprentice/hand-range-notation --save
  ```

## Usage

### `expandNotation`

This function is used to parse a string representing a [hand range](https://betandbeat.com/poker/terminology/hand-range-notation/). If a hand range cannot be parsed, it will throw an `InvalidHandRangeNotationError`.

```ts
// specific suited hands
const hands = expandNotation('AKs');
console.log(hands); // [['As', 'Ks'], ['Ah', 'Kh'], ['Ad', 'Kd'], ['Ac', 'Kc']]

// specific unsuited hands
const hands = expandNotation('AKo');
console.log(hands); // [['As', 'Kh'], ['As', 'Kd'], ['As', 'Kc'], /* ... */]

// specific hands regardless of suitedness
const hands = expandNotation('AK');
console.log(hands); // [['As', 'Ks'], ['As', 'Kh'], ['As', 'Kd'], /* ... */]

// specific hands with specific suits
const hands = expandNotation('AcKd');
console.log(hands); // [['Ac', 'Kd']]

// pocket pairs
const hands = expandNotation('TT');
console.log(hands); // [['Ts', 'Th'], ['Ts', 'Td'], ['Ts', 'Tc'], /* ... */]

// hand ranges
const hands = expandNotation('AKs-A2s');
const hands = expandNotation('KQo-KJo');
const hands = expandNotation('AK-AT');
const hands = expandNotation('99-22');

// hand minimums
const hands = expandNotation('AT+');
const hands = expandNotation('ATs+');
const hands = expandNotation('TT+');
```

### `notate`

TODO

### `normalizeNotation`

TODO
