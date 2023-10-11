import { Pad , Unpad } from "./index.mjs";

/* => TEST <= */

// Step 1: Pad the message with the default 32 characters length factor.
const pad = Pad( "GO!" );

// Step 2: Unpad the message ( which is: "b299f9ac20bcfc98098e42df93a0339d401f904194634bcdafff353be90c7GO!" ).
const msg = Unpad( pad );

// The results: true
console.log( msg === "GO!" );