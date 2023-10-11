# Package & version:

### ScryptPadding v1.0.0

# Description:

### Pad/Unpad messages using Scrypt hashing algorithm.

# How the package works?

1. Calculate the length for padding.

2. Hash the input into the right length (using Scrypt).

3. Prepend the hash to the message.

4. To unpad, create a loop for [x] rounds ([x] will get a value, according to the padding factor).

5. Hash the message, until an exact match with the padded hex hash.

6. Returns the matched message, If got a match, or return the original input.

# Example 1:

```
import { Pad, Unpad } from "scrypt-padding";
// or: const { Pad, Unpad } = await import("scrypt-padding");

// Step 1: Pad the message with a 4 characters length factor (default is 32).
const pad = Pad( "GO!", 4 );

// Step 2: Unpad the message ( which is: "b299fGO!" ).
const msg = Unpad( pad, 4 );

// The results: "GO!"
console.log(msg);
```

# Example 2:

```
import { Pad, Unpad } from "scrypt-padding";
// or: const { Pad, Unpad } = await import("scrypt-padding");

// Step 1: Pad the message with the default 32 characters length factor.
const pad = Pad( "GO!" );

// Step 2: Unpad the message ( which is: "b299f9ac20bcfc98098e42df93a0339d401f904194634bcdafff353be90c7GO!" ).
const msg = Unpad( pad );

// The results: "GO!"
console.log(msg);
```

# Third party:

* Scrypt implementation from [scrypt-js](http://npmjs.com/package/scrypt-js).

# License:

### This project is licensed under MIT open-source license.