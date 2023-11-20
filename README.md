# Hand Range Notation

Convert poker hand range notation to and from actual poker hands.

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

This function is used to parse a string representing a [hand range notation](https://betandbeat.com/poker/terminology/hand-range-notation/). If a hand range notation cannot be parsed, it will throw an `InvalidHandRangeNotationError`.

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

// multiple ranges
const hands = expandNotation('ATs+, 99-22, AA, KQ, KJs, AcTd');
```

### `notate`

This function is used to generate a [hand range notation](https://betandbeat.com/poker/terminology/hand-range-notation/) string representing a collection of hands.

Only two-card Texas Hold'em hands are supported. Providing hands of any other length will result in an `InvalidHandError` being thrown.

```ts
const notation = notate([
  ['As', 'Ks'],
  ['Ah', 'Kh'],
  ['Ad', 'Kd'],
  ['Ac', 'Kc'],
  ['As', 'Qs'],
  ['Ah', 'Qh'],
  ['Ad', 'Qd'],
  ['Ac', 'Qc'],
  ['Js', 'Jh'],
  ['Js', 'Jd'],
  ['Js', 'Jc'],
  ['Jh', 'Jd'],
  ['Jh', 'Jc'],
  ['Jd', 'Jc'],
  ['Ts', 'Th'],
  ['Ts', 'Td'],
  ['Ts', 'Tc'],
  ['Th', 'Td'],
  ['Th', 'Tc'],
  ['Td', 'Tc'],
]);
console.log(notation); // 'JJ-TT,AQs+'
```

### `normalizeNotation`

This function converts the provided notation into a predictable/deterministic format.

```ts
const notation = normalizeNotation('AKs,TT,QAo,AA'));
console.log(notation); // 'AA,TT,AKs,AQo'

const hands = expandNotation('7d2c,3h2s,KQo,AQo,AKo,ATs+,TT+,A2s-A5s');
const notation = notate(hands);
console.log(notation); // 'TT+,ATs+,A5s-A2s,AQo+,KQo,7d2c,3h2s'
```
