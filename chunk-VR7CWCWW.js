import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  TokenOwnerOffCurveError,
  bool,
  publicKey,
  u64
} from "./chunk-XHYEPNL4.js";
import {
  PublicKey,
  __publicField,
  __toESM,
  require_Layout
} from "./chunk-5MXUSYBM.js";

// node_modules/@solana/spl-token/lib/esm/state/mint.js
var import_buffer_layout19 = __toESM(require_Layout(), 1);

// node_modules/@solana/spl-token/lib/esm/extensions/accountType.js
var AccountType;
(function(AccountType2) {
  AccountType2[AccountType2["Uninitialized"] = 0] = "Uninitialized";
  AccountType2[AccountType2["Mint"] = 1] = "Mint";
  AccountType2[AccountType2["Account"] = 2] = "Account";
})(AccountType || (AccountType = {}));
var ACCOUNT_TYPE_SIZE = 1;

// node_modules/@solana/spl-token/lib/esm/state/account.js
var import_buffer_layout2 = __toESM(require_Layout(), 1);

// node_modules/@solana/spl-token/lib/esm/state/multisig.js
var import_buffer_layout = __toESM(require_Layout(), 1);
var MultisigLayout = (0, import_buffer_layout.struct)([
  (0, import_buffer_layout.u8)("m"),
  (0, import_buffer_layout.u8)("n"),
  bool("isInitialized"),
  publicKey("signer1"),
  publicKey("signer2"),
  publicKey("signer3"),
  publicKey("signer4"),
  publicKey("signer5"),
  publicKey("signer6"),
  publicKey("signer7"),
  publicKey("signer8"),
  publicKey("signer9"),
  publicKey("signer10"),
  publicKey("signer11")
]);
var MULTISIG_SIZE = MultisigLayout.span;

// node_modules/@solana/spl-token/lib/esm/state/account.js
var AccountState;
(function(AccountState2) {
  AccountState2[AccountState2["Uninitialized"] = 0] = "Uninitialized";
  AccountState2[AccountState2["Initialized"] = 1] = "Initialized";
  AccountState2[AccountState2["Frozen"] = 2] = "Frozen";
})(AccountState || (AccountState = {}));
var AccountLayout = (0, import_buffer_layout2.struct)([
  publicKey("mint"),
  publicKey("owner"),
  u64("amount"),
  (0, import_buffer_layout2.u32)("delegateOption"),
  publicKey("delegate"),
  (0, import_buffer_layout2.u8)("state"),
  (0, import_buffer_layout2.u32)("isNativeOption"),
  u64("isNative"),
  u64("delegatedAmount"),
  (0, import_buffer_layout2.u32)("closeAuthorityOption"),
  publicKey("closeAuthority")
]);
var ACCOUNT_SIZE = AccountLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/cpiGuard/state.js
var import_buffer_layout3 = __toESM(require_Layout(), 1);
var CpiGuardLayout = (0, import_buffer_layout3.struct)([bool("lockCpi")]);
var CPI_GUARD_SIZE = CpiGuardLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/defaultAccountState/state.js
var import_buffer_layout4 = __toESM(require_Layout(), 1);
var DefaultAccountStateLayout = (0, import_buffer_layout4.struct)([(0, import_buffer_layout4.u8)("state")]);
var DEFAULT_ACCOUNT_STATE_SIZE = DefaultAccountStateLayout.span;

// node_modules/@solana/errors/dist/index.browser.mjs
var SOLANA_ERROR__BLOCK_HEIGHT_EXCEEDED = 1;
var SOLANA_ERROR__INVALID_NONCE = 2;
var SOLANA_ERROR__NONCE_ACCOUNT_NOT_FOUND = 3;
var SOLANA_ERROR__BLOCKHASH_STRING_LENGTH_OUT_OF_RANGE = 4;
var SOLANA_ERROR__INVALID_BLOCKHASH_BYTE_LENGTH = 5;
var SOLANA_ERROR__LAMPORTS_OUT_OF_RANGE = 6;
var SOLANA_ERROR__MALFORMED_BIGINT_STRING = 7;
var SOLANA_ERROR__MALFORMED_NUMBER_STRING = 8;
var SOLANA_ERROR__TIMESTAMP_OUT_OF_RANGE = 9;
var SOLANA_ERROR__JSON_RPC__PARSE_ERROR = -32700;
var SOLANA_ERROR__JSON_RPC__INTERNAL_ERROR = -32603;
var SOLANA_ERROR__JSON_RPC__INVALID_PARAMS = -32602;
var SOLANA_ERROR__JSON_RPC__METHOD_NOT_FOUND = -32601;
var SOLANA_ERROR__JSON_RPC__INVALID_REQUEST = -32600;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED = -32016;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION = -32015;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET = -32014;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH = -32013;
var SOLANA_ERROR__JSON_RPC__SCAN_ERROR = -32012;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE = -32011;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX = -32010;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED = -32009;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NO_SNAPSHOT = -32008;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED = -32007;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE = -32006;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY = -32005;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE = -32004;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE = -32003;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE = -32002;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP = -32001;
var SOLANA_ERROR__ADDRESSES__INVALID_BYTE_LENGTH = 28e5;
var SOLANA_ERROR__ADDRESSES__STRING_LENGTH_OUT_OF_RANGE = 2800001;
var SOLANA_ERROR__ADDRESSES__INVALID_BASE58_ENCODED_ADDRESS = 2800002;
var SOLANA_ERROR__ADDRESSES__INVALID_ED25519_PUBLIC_KEY = 2800003;
var SOLANA_ERROR__ADDRESSES__MALFORMED_PDA = 2800004;
var SOLANA_ERROR__ADDRESSES__PDA_BUMP_SEED_OUT_OF_RANGE = 2800005;
var SOLANA_ERROR__ADDRESSES__MAX_NUMBER_OF_PDA_SEEDS_EXCEEDED = 2800006;
var SOLANA_ERROR__ADDRESSES__MAX_PDA_SEED_LENGTH_EXCEEDED = 2800007;
var SOLANA_ERROR__ADDRESSES__INVALID_SEEDS_POINT_ON_CURVE = 2800008;
var SOLANA_ERROR__ADDRESSES__FAILED_TO_FIND_VIABLE_PDA_BUMP_SEED = 2800009;
var SOLANA_ERROR__ADDRESSES__PDA_ENDS_WITH_PDA_MARKER = 2800010;
var SOLANA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND = 323e4;
var SOLANA_ERROR__ACCOUNTS__ONE_OR_MORE_ACCOUNTS_NOT_FOUND = 32300001;
var SOLANA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT = 3230002;
var SOLANA_ERROR__ACCOUNTS__EXPECTED_DECODED_ACCOUNT = 3230003;
var SOLANA_ERROR__ACCOUNTS__EXPECTED_ALL_ACCOUNTS_TO_BE_DECODED = 3230004;
var SOLANA_ERROR__SUBTLE_CRYPTO__DISALLOWED_IN_INSECURE_CONTEXT = 361e4;
var SOLANA_ERROR__SUBTLE_CRYPTO__DIGEST_UNIMPLEMENTED = 3610001;
var SOLANA_ERROR__SUBTLE_CRYPTO__ED25519_ALGORITHM_UNIMPLEMENTED = 3610002;
var SOLANA_ERROR__SUBTLE_CRYPTO__EXPORT_FUNCTION_UNIMPLEMENTED = 3610003;
var SOLANA_ERROR__SUBTLE_CRYPTO__GENERATE_FUNCTION_UNIMPLEMENTED = 3610004;
var SOLANA_ERROR__SUBTLE_CRYPTO__SIGN_FUNCTION_UNIMPLEMENTED = 3610005;
var SOLANA_ERROR__SUBTLE_CRYPTO__VERIFY_FUNCTION_UNIMPLEMENTED = 3610006;
var SOLANA_ERROR__SUBTLE_CRYPTO__CANNOT_EXPORT_NON_EXTRACTABLE_KEY = 3610007;
var SOLANA_ERROR__CRYPTO__RANDOM_VALUES_FUNCTION_UNIMPLEMENTED = 3611e3;
var SOLANA_ERROR__KEYS__INVALID_KEY_PAIR_BYTE_LENGTH = 3704e3;
var SOLANA_ERROR__KEYS__INVALID_PRIVATE_KEY_BYTE_LENGTH = 3704001;
var SOLANA_ERROR__KEYS__INVALID_SIGNATURE_BYTE_LENGTH = 3704002;
var SOLANA_ERROR__KEYS__SIGNATURE_STRING_LENGTH_OUT_OF_RANGE = 3704003;
var SOLANA_ERROR__KEYS__PUBLIC_KEY_MUST_MATCH_PRIVATE_KEY = 3704004;
var SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_ACCOUNTS = 4128e3;
var SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_DATA = 4128001;
var SOLANA_ERROR__INSTRUCTION__PROGRAM_ID_MISMATCH = 4128002;
var SOLANA_ERROR__INSTRUCTION_ERROR__UNKNOWN = 4615e3;
var SOLANA_ERROR__INSTRUCTION_ERROR__GENERIC_ERROR = 4615001;
var SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ARGUMENT = 4615002;
var SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_INSTRUCTION_DATA = 4615003;
var SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_DATA = 4615004;
var SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_TOO_SMALL = 4615005;
var SOLANA_ERROR__INSTRUCTION_ERROR__INSUFFICIENT_FUNDS = 4615006;
var SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_PROGRAM_ID = 4615007;
var SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_REQUIRED_SIGNATURE = 4615008;
var SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_ALREADY_INITIALIZED = 4615009;
var SOLANA_ERROR__INSTRUCTION_ERROR__UNINITIALIZED_ACCOUNT = 4615010;
var SOLANA_ERROR__INSTRUCTION_ERROR__UNBALANCED_INSTRUCTION = 4615011;
var SOLANA_ERROR__INSTRUCTION_ERROR__MODIFIED_PROGRAM_ID = 4615012;
var SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_LAMPORT_SPEND = 4615013;
var SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_DATA_MODIFIED = 4615014;
var SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_LAMPORT_CHANGE = 4615015;
var SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_DATA_MODIFIED = 4615016;
var SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_INDEX = 4615017;
var SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_MODIFIED = 4615018;
var SOLANA_ERROR__INSTRUCTION_ERROR__RENT_EPOCH_MODIFIED = 4615019;
var SOLANA_ERROR__INSTRUCTION_ERROR__NOT_ENOUGH_ACCOUNT_KEYS = 4615020;
var SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_SIZE_CHANGED = 4615021;
var SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_EXECUTABLE = 4615022;
var SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_FAILED = 4615023;
var SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_OUTSTANDING = 4615024;
var SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_OUT_OF_SYNC = 4615025;
var SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM = 4615026;
var SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ERROR = 4615027;
var SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_DATA_MODIFIED = 4615028;
var SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_LAMPORT_CHANGE = 4615029;
var SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_ACCOUNT_NOT_RENT_EXEMPT = 4615030;
var SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_PROGRAM_ID = 4615031;
var SOLANA_ERROR__INSTRUCTION_ERROR__CALL_DEPTH = 4615032;
var SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_ACCOUNT = 4615033;
var SOLANA_ERROR__INSTRUCTION_ERROR__REENTRANCY_NOT_ALLOWED = 4615034;
var SOLANA_ERROR__INSTRUCTION_ERROR__MAX_SEED_LENGTH_EXCEEDED = 4615035;
var SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_SEEDS = 4615036;
var SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_REALLOC = 4615037;
var SOLANA_ERROR__INSTRUCTION_ERROR__COMPUTATIONAL_BUDGET_EXCEEDED = 4615038;
var SOLANA_ERROR__INSTRUCTION_ERROR__PRIVILEGE_ESCALATION = 4615039;
var SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_ENVIRONMENT_SETUP_FAILURE = 4615040;
var SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPLETE = 4615041;
var SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPILE = 4615042;
var SOLANA_ERROR__INSTRUCTION_ERROR__IMMUTABLE = 4615043;
var SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_AUTHORITY = 4615044;
var SOLANA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR = 4615045;
var SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_RENT_EXEMPT = 4615046;
var SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_OWNER = 4615047;
var SOLANA_ERROR__INSTRUCTION_ERROR__ARITHMETIC_OVERFLOW = 4615048;
var SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_SYSVAR = 4615049;
var SOLANA_ERROR__INSTRUCTION_ERROR__ILLEGAL_OWNER = 4615050;
var SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_DATA_ALLOCATIONS_EXCEEDED = 4615051;
var SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_EXCEEDED = 4615052;
var SOLANA_ERROR__INSTRUCTION_ERROR__MAX_INSTRUCTION_TRACE_LENGTH_EXCEEDED = 4615053;
var SOLANA_ERROR__INSTRUCTION_ERROR__BUILTIN_PROGRAMS_MUST_CONSUME_COMPUTE_UNITS = 4615054;
var SOLANA_ERROR__SIGNER__ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS = 5508e3;
var SOLANA_ERROR__SIGNER__EXPECTED_KEY_PAIR_SIGNER = 5508001;
var SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_SIGNER = 5508002;
var SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_MODIFYING_SIGNER = 5508003;
var SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_PARTIAL_SIGNER = 5508004;
var SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SIGNER = 5508005;
var SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_MODIFYING_SIGNER = 5508006;
var SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_PARTIAL_SIGNER = 5508007;
var SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SENDING_SIGNER = 5508008;
var SOLANA_ERROR__SIGNER__TRANSACTION_CANNOT_HAVE_MULTIPLE_SENDING_SIGNERS = 5508009;
var SOLANA_ERROR__SIGNER__TRANSACTION_SENDING_SIGNER_MISSING = 5508010;
var SOLANA_ERROR__SIGNER__WALLET_MULTISIGN_UNIMPLEMENTED = 5508011;
var SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_CANNOT_PAY_FEES = 5663e3;
var SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE = 5663001;
var SOLANA_ERROR__TRANSACTION__EXPECTED_BLOCKHASH_LIFETIME = 5663002;
var SOLANA_ERROR__TRANSACTION__EXPECTED_NONCE_LIFETIME = 5663003;
var SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_OUT_OF_RANGE = 5663004;
var SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_CONTENTS_MISSING = 5663005;
var SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_INDEX_OUT_OF_RANGE = 5663006;
var SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_PROGRAM_ADDRESS_NOT_FOUND = 5663007;
var SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_FEE_PAYER_MISSING = 5663008;
var SOLANA_ERROR__TRANSACTION__SIGNATURES_MISSING = 5663009;
var SOLANA_ERROR__TRANSACTION__ADDRESS_MISSING = 5663010;
var SOLANA_ERROR__TRANSACTION__FEE_PAYER_MISSING = 5663011;
var SOLANA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING = 5663012;
var SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_INSTRUCTIONS_MISSING = 5663013;
var SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_FIRST_INSTRUCTION_MUST_BE_ADVANCE_NONCE = 5663014;
var SOLANA_ERROR__TRANSACTION__ADDRESSES_CANNOT_SIGN_TRANSACTION = 5663015;
var SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_SIGNATURES = 5663016;
var SOLANA_ERROR__TRANSACTION__MESSAGE_SIGNATURES_MISMATCH = 5663017;
var SOLANA_ERROR__TRANSACTION__FAILED_TO_ESTIMATE_COMPUTE_LIMIT = 5663018;
var SOLANA_ERROR__TRANSACTION_ERROR__UNKNOWN = 705e4;
var SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_IN_USE = 7050001;
var SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_LOADED_TWICE = 7050002;
var SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_NOT_FOUND = 7050003;
var SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_ACCOUNT_NOT_FOUND = 7050004;
var SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_FEE = 7050005;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_FOR_FEE = 7050006;
var SOLANA_ERROR__TRANSACTION_ERROR__ALREADY_PROCESSED = 7050007;
var SOLANA_ERROR__TRANSACTION_ERROR__BLOCKHASH_NOT_FOUND = 7050008;
var SOLANA_ERROR__TRANSACTION_ERROR__CALL_CHAIN_TOO_DEEP = 7050009;
var SOLANA_ERROR__TRANSACTION_ERROR__MISSING_SIGNATURE_FOR_FEE = 7050010;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_INDEX = 7050011;
var SOLANA_ERROR__TRANSACTION_ERROR__SIGNATURE_FAILURE = 7050012;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_PROGRAM_FOR_EXECUTION = 7050013;
var SOLANA_ERROR__TRANSACTION_ERROR__SANITIZE_FAILURE = 7050014;
var SOLANA_ERROR__TRANSACTION_ERROR__CLUSTER_MAINTENANCE = 7050015;
var SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_BORROW_OUTSTANDING = 7050016;
var SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_BLOCK_COST_LIMIT = 7050017;
var SOLANA_ERROR__TRANSACTION_ERROR__UNSUPPORTED_VERSION = 7050018;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_WRITABLE_ACCOUNT = 7050019;
var SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_ACCOUNT_COST_LIMIT = 7050020;
var SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_BLOCK_LIMIT = 7050021;
var SOLANA_ERROR__TRANSACTION_ERROR__TOO_MANY_ACCOUNT_LOCKS = 7050022;
var SOLANA_ERROR__TRANSACTION_ERROR__ADDRESS_LOOKUP_TABLE_NOT_FOUND = 7050023;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_OWNER = 7050024;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_DATA = 7050025;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_INDEX = 7050026;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_RENT_PAYING_ACCOUNT = 7050027;
var SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_VOTE_COST_LIMIT = 7050028;
var SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_TOTAL_LIMIT = 7050029;
var SOLANA_ERROR__TRANSACTION_ERROR__DUPLICATE_INSTRUCTION = 7050030;
var SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_RENT = 7050031;
var SOLANA_ERROR__TRANSACTION_ERROR__MAX_LOADED_ACCOUNTS_DATA_SIZE_EXCEEDED = 7050032;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_LOADED_ACCOUNTS_DATA_SIZE_LIMIT = 7050033;
var SOLANA_ERROR__TRANSACTION_ERROR__RESANITIZATION_NEEDED = 7050034;
var SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED = 7050035;
var SOLANA_ERROR__TRANSACTION_ERROR__UNBALANCED_TRANSACTION = 7050036;
var SOLANA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY = 8078e3;
var SOLANA_ERROR__CODECS__INVALID_BYTE_LENGTH = 8078001;
var SOLANA_ERROR__CODECS__EXPECTED_FIXED_LENGTH = 8078002;
var SOLANA_ERROR__CODECS__EXPECTED_VARIABLE_LENGTH = 8078003;
var SOLANA_ERROR__CODECS__ENCODER_DECODER_SIZE_COMPATIBILITY_MISMATCH = 8078004;
var SOLANA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH = 8078005;
var SOLANA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH = 8078006;
var SOLANA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS = 8078007;
var SOLANA_ERROR__CODECS__ENUM_DISCRIMINATOR_OUT_OF_RANGE = 8078008;
var SOLANA_ERROR__CODECS__INVALID_DISCRIMINATED_UNION_VARIANT = 8078009;
var SOLANA_ERROR__CODECS__INVALID_ENUM_VARIANT = 8078010;
var SOLANA_ERROR__CODECS__NUMBER_OUT_OF_RANGE = 8078011;
var SOLANA_ERROR__CODECS__INVALID_STRING_FOR_BASE = 8078012;
var SOLANA_ERROR__CODECS__EXPECTED_POSITIVE_BYTE_LENGTH = 8078013;
var SOLANA_ERROR__CODECS__OFFSET_OUT_OF_RANGE = 8078014;
var SOLANA_ERROR__CODECS__INVALID_LITERAL_UNION_VARIANT = 8078015;
var SOLANA_ERROR__CODECS__LITERAL_UNION_DISCRIMINATOR_OUT_OF_RANGE = 8078016;
var SOLANA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE = 8078017;
var SOLANA_ERROR__CODECS__INVALID_CONSTANT = 8078018;
var SOLANA_ERROR__CODECS__EXPECTED_ZERO_VALUE_TO_MATCH_ITEM_FIXED_SIZE = 8078019;
var SOLANA_ERROR__CODECS__ENCODED_BYTES_MUST_NOT_INCLUDE_SENTINEL = 8078020;
var SOLANA_ERROR__CODECS__SENTINEL_MISSING_IN_DECODED_BYTES = 8078021;
var SOLANA_ERROR__CODECS__CANNOT_USE_LEXICAL_VALUES_AS_ENUM_DISCRIMINATORS = 8078022;
var SOLANA_ERROR__RPC__INTEGER_OVERFLOW = 81e5;
var SOLANA_ERROR__RPC__TRANSPORT_HTTP_HEADER_FORBIDDEN = 8100001;
var SOLANA_ERROR__RPC__TRANSPORT_HTTP_ERROR = 8100002;
var SOLANA_ERROR__RPC_SUBSCRIPTIONS__CANNOT_CREATE_SUBSCRIPTION_REQUEST = 819e4;
var SOLANA_ERROR__RPC_SUBSCRIPTIONS__EXPECTED_SERVER_SUBSCRIPTION_ID = 8190001;
var SOLANA_ERROR__RPC_SUBSCRIPTIONS__TRANSPORT_CLOSED_BEFORE_MESSAGE_BUFFERED = 8190002;
var SOLANA_ERROR__RPC_SUBSCRIPTIONS__TRANSPORT_CONNECTION_CLOSED = 8190003;
var SOLANA_ERROR__RPC_SUBSCRIPTIONS__TRANSPORT_FAILED_TO_CONNECT = 8190004;
var SOLANA_ERROR__INVARIANT_VIOLATION__WEBSOCKET_MESSAGE_ITERATOR_STATE_MISSING = 99e5;
var SOLANA_ERROR__INVARIANT_VIOLATION__WEBSOCKET_MESSAGE_ITERATOR_MUST_NOT_POLL_BEFORE_RESOLVING_EXISTING_MESSAGE_PROMISE = 9900001;
var SOLANA_ERROR__INVARIANT_VIOLATION__CACHED_ABORTABLE_ITERABLE_CACHE_ENTRY_MISSING = 9900002;
var SOLANA_ERROR__INVARIANT_VIOLATION__SWITCH_MUST_BE_EXHAUSTIVE = 9900003;
function encodeValue(value) {
  if (Array.isArray(value)) {
    const commaSeparatedValues = value.map(encodeValue).join(
      "%2C%20"
      /* ", " */
    );
    return "%5B" + commaSeparatedValues + /* "]" */
    "%5D";
  } else if (typeof value === "bigint") {
    return `${value}n`;
  } else {
    return encodeURIComponent(
      String(
        value != null && Object.getPrototypeOf(value) === null ? (
          // Plain objects with no prototype don't have a `toString` method.
          // Convert them before stringifying them.
          { ...value }
        ) : value
      )
    );
  }
}
function encodeObjectContextEntry([key, value]) {
  return `${key}=${encodeValue(value)}`;
}
function encodeContextObject(context) {
  const searchParamsString = Object.entries(context).map(encodeObjectContextEntry).join("&");
  return btoa(searchParamsString);
}
var SolanaErrorMessages = {
  [SOLANA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND]: "Account not found at address: $address",
  [SOLANA_ERROR__ACCOUNTS__EXPECTED_ALL_ACCOUNTS_TO_BE_DECODED]: "Not all accounts were decoded. Encoded accounts found at addresses: $addresses.",
  [SOLANA_ERROR__ACCOUNTS__EXPECTED_DECODED_ACCOUNT]: "Expected decoded account at address: $address",
  [SOLANA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT]: "Failed to decode account data at address: $address",
  [SOLANA_ERROR__ACCOUNTS__ONE_OR_MORE_ACCOUNTS_NOT_FOUND]: "Accounts not found at addresses: $addresses",
  [SOLANA_ERROR__ADDRESSES__FAILED_TO_FIND_VIABLE_PDA_BUMP_SEED]: "Unable to find a viable program address bump seed.",
  [SOLANA_ERROR__ADDRESSES__INVALID_BASE58_ENCODED_ADDRESS]: "$putativeAddress is not a base58-encoded address.",
  [SOLANA_ERROR__ADDRESSES__INVALID_BYTE_LENGTH]: "Expected base58 encoded address to decode to a byte array of length 32. Actual length: $actualLength.",
  [SOLANA_ERROR__ADDRESSES__INVALID_ED25519_PUBLIC_KEY]: "The `CryptoKey` must be an `Ed25519` public key.",
  [SOLANA_ERROR__ADDRESSES__INVALID_SEEDS_POINT_ON_CURVE]: "Invalid seeds; point must fall off the Ed25519 curve.",
  [SOLANA_ERROR__ADDRESSES__MALFORMED_PDA]: "Expected given program derived address to have the following format: [Address, ProgramDerivedAddressBump].",
  [SOLANA_ERROR__ADDRESSES__MAX_NUMBER_OF_PDA_SEEDS_EXCEEDED]: "A maximum of $maxSeeds seeds, including the bump seed, may be supplied when creating an address. Received: $actual.",
  [SOLANA_ERROR__ADDRESSES__MAX_PDA_SEED_LENGTH_EXCEEDED]: "The seed at index $index with length $actual exceeds the maximum length of $maxSeedLength bytes.",
  [SOLANA_ERROR__ADDRESSES__PDA_BUMP_SEED_OUT_OF_RANGE]: "Expected program derived address bump to be in the range [0, 255], got: $bump.",
  [SOLANA_ERROR__ADDRESSES__PDA_ENDS_WITH_PDA_MARKER]: "Program address cannot end with PDA marker.",
  [SOLANA_ERROR__ADDRESSES__STRING_LENGTH_OUT_OF_RANGE]: "Expected base58-encoded address string of length in the range [32, 44]. Actual length: $actualLength.",
  [SOLANA_ERROR__BLOCKHASH_STRING_LENGTH_OUT_OF_RANGE]: "Expected base58-encoded blockash string of length in the range [32, 44]. Actual length: $actualLength.",
  [SOLANA_ERROR__BLOCK_HEIGHT_EXCEEDED]: "The network has progressed past the last block for which this transaction could have been committed.",
  [SOLANA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY]: "Codec [$codecDescription] cannot decode empty byte arrays.",
  [SOLANA_ERROR__CODECS__CANNOT_USE_LEXICAL_VALUES_AS_ENUM_DISCRIMINATORS]: "Enum codec cannot use lexical values [$stringValues] as discriminators. Either remove all lexical values or set `useValuesAsDiscriminators` to `false`.",
  [SOLANA_ERROR__CODECS__ENCODED_BYTES_MUST_NOT_INCLUDE_SENTINEL]: "Sentinel [$hexSentinel] must not be present in encoded bytes [$hexEncodedBytes].",
  [SOLANA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH]: "Encoder and decoder must have the same fixed size, got [$encoderFixedSize] and [$decoderFixedSize].",
  [SOLANA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH]: "Encoder and decoder must have the same max size, got [$encoderMaxSize] and [$decoderMaxSize].",
  [SOLANA_ERROR__CODECS__ENCODER_DECODER_SIZE_COMPATIBILITY_MISMATCH]: "Encoder and decoder must either both be fixed-size or variable-size.",
  [SOLANA_ERROR__CODECS__ENUM_DISCRIMINATOR_OUT_OF_RANGE]: "Enum discriminator out of range. Expected a number in [$formattedValidDiscriminators], got $discriminator.",
  [SOLANA_ERROR__CODECS__EXPECTED_FIXED_LENGTH]: "Expected a fixed-size codec, got a variable-size one.",
  [SOLANA_ERROR__CODECS__EXPECTED_POSITIVE_BYTE_LENGTH]: "Codec [$codecDescription] expected a positive byte length, got $bytesLength.",
  [SOLANA_ERROR__CODECS__EXPECTED_VARIABLE_LENGTH]: "Expected a variable-size codec, got a fixed-size one.",
  [SOLANA_ERROR__CODECS__EXPECTED_ZERO_VALUE_TO_MATCH_ITEM_FIXED_SIZE]: "Codec [$codecDescription] expected zero-value [$hexZeroValue] to have the same size as the provided fixed-size item [$expectedSize bytes].",
  [SOLANA_ERROR__CODECS__INVALID_BYTE_LENGTH]: "Codec [$codecDescription] expected $expected bytes, got $bytesLength.",
  [SOLANA_ERROR__CODECS__INVALID_CONSTANT]: "Expected byte array constant [$hexConstant] to be present in data [$hexData] at offset [$offset].",
  [SOLANA_ERROR__CODECS__INVALID_DISCRIMINATED_UNION_VARIANT]: "Invalid discriminated union variant. Expected one of [$variants], got $value.",
  [SOLANA_ERROR__CODECS__INVALID_ENUM_VARIANT]: "Invalid enum variant. Expected one of [$stringValues] or a number in [$formattedNumericalValues], got $variant.",
  [SOLANA_ERROR__CODECS__INVALID_LITERAL_UNION_VARIANT]: "Invalid literal union variant. Expected one of [$variants], got $value.",
  [SOLANA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS]: "Expected [$codecDescription] to have $expected items, got $actual.",
  [SOLANA_ERROR__CODECS__INVALID_STRING_FOR_BASE]: "Invalid value $value for base $base with alphabet $alphabet.",
  [SOLANA_ERROR__CODECS__LITERAL_UNION_DISCRIMINATOR_OUT_OF_RANGE]: "Literal union discriminator out of range. Expected a number between $minRange and $maxRange, got $discriminator.",
  [SOLANA_ERROR__CODECS__NUMBER_OUT_OF_RANGE]: "Codec [$codecDescription] expected number to be in the range [$min, $max], got $value.",
  [SOLANA_ERROR__CODECS__OFFSET_OUT_OF_RANGE]: "Codec [$codecDescription] expected offset to be in the range [0, $bytesLength], got $offset.",
  [SOLANA_ERROR__CODECS__SENTINEL_MISSING_IN_DECODED_BYTES]: "Expected sentinel [$hexSentinel] to be present in decoded bytes [$hexDecodedBytes].",
  [SOLANA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE]: "Union variant out of range. Expected an index between $minRange and $maxRange, got $variant.",
  [SOLANA_ERROR__CRYPTO__RANDOM_VALUES_FUNCTION_UNIMPLEMENTED]: "No random values implementation could be found.",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_ALREADY_INITIALIZED]: "instruction requires an uninitialized account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_FAILED]: "instruction tries to borrow reference for an account which is already borrowed",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_OUTSTANDING]: "instruction left account with an outstanding borrowed reference",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_SIZE_CHANGED]: "program other than the account's owner changed the size of the account data",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_TOO_SMALL]: "account data too small for instruction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_EXECUTABLE]: "instruction expected an executable account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_RENT_EXEMPT]: "An account does not have enough lamports to be rent-exempt",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ARITHMETIC_OVERFLOW]: "Program arithmetic overflowed",
  [SOLANA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR]: "Failed to serialize or deserialize account data: $encodedData",
  [SOLANA_ERROR__INSTRUCTION_ERROR__BUILTIN_PROGRAMS_MUST_CONSUME_COMPUTE_UNITS]: "Builtin programs must consume compute units",
  [SOLANA_ERROR__INSTRUCTION_ERROR__CALL_DEPTH]: "Cross-program invocation call depth too deep",
  [SOLANA_ERROR__INSTRUCTION_ERROR__COMPUTATIONAL_BUDGET_EXCEEDED]: "Computational budget exceeded",
  [SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM]: "custom program error: #$code",
  [SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_INDEX]: "instruction contains duplicate accounts",
  [SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_OUT_OF_SYNC]: "instruction modifications of multiply-passed account differ",
  [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_ACCOUNT_NOT_RENT_EXEMPT]: "executable accounts must be rent exempt",
  [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_DATA_MODIFIED]: "instruction changed executable accounts data",
  [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_LAMPORT_CHANGE]: "instruction changed the balance of an executable account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_MODIFIED]: "instruction changed executable bit of an account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_DATA_MODIFIED]: "instruction modified data of an account it does not own",
  [SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_LAMPORT_SPEND]: "instruction spent from the balance of an account it does not own",
  [SOLANA_ERROR__INSTRUCTION_ERROR__GENERIC_ERROR]: "generic instruction error",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ILLEGAL_OWNER]: "Provided owner is not allowed",
  [SOLANA_ERROR__INSTRUCTION_ERROR__IMMUTABLE]: "Account is immutable",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_AUTHORITY]: "Incorrect authority provided",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_PROGRAM_ID]: "incorrect program id for instruction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INSUFFICIENT_FUNDS]: "insufficient funds for instruction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_DATA]: "invalid account data for instruction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_OWNER]: "Invalid account owner",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ARGUMENT]: "invalid program argument",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ERROR]: "program returned invalid error code",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_INSTRUCTION_DATA]: "invalid instruction data",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_REALLOC]: "Failed to reallocate account data",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_SEEDS]: "Provided seeds do not result in a valid address",
  [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_DATA_ALLOCATIONS_EXCEEDED]: "Accounts data allocations exceeded the maximum allowed per transaction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_EXCEEDED]: "Max accounts exceeded",
  [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_INSTRUCTION_TRACE_LENGTH_EXCEEDED]: "Max instruction trace length exceeded",
  [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_SEED_LENGTH_EXCEEDED]: "Length of the seed is too long for address generation",
  [SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_ACCOUNT]: "An account required by the instruction is missing",
  [SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_REQUIRED_SIGNATURE]: "missing required signature for instruction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__MODIFIED_PROGRAM_ID]: "instruction illegally modified the program id of an account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__NOT_ENOUGH_ACCOUNT_KEYS]: "insufficient account keys for instruction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__PRIVILEGE_ESCALATION]: "Cross-program invocation with unauthorized signer or writable account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_ENVIRONMENT_SETUP_FAILURE]: "Failed to create program execution environment",
  [SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPILE]: "Program failed to compile",
  [SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPLETE]: "Program failed to complete",
  [SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_DATA_MODIFIED]: "instruction modified data of a read-only account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_LAMPORT_CHANGE]: "instruction changed the balance of a read-only account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__REENTRANCY_NOT_ALLOWED]: "Cross-program invocation reentrancy not allowed for this instruction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__RENT_EPOCH_MODIFIED]: "instruction modified rent epoch of an account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__UNBALANCED_INSTRUCTION]: "sum of account balances before and after instruction do not match",
  [SOLANA_ERROR__INSTRUCTION_ERROR__UNINITIALIZED_ACCOUNT]: "instruction requires an initialized account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__UNKNOWN]: "",
  [SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_PROGRAM_ID]: "Unsupported program id",
  [SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_SYSVAR]: "Unsupported sysvar",
  [SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_ACCOUNTS]: "The instruction does not have any accounts.",
  [SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_DATA]: "The instruction does not have any data.",
  [SOLANA_ERROR__INSTRUCTION__PROGRAM_ID_MISMATCH]: "Expected instruction to have progress address $expectedProgramAddress, got $actualProgramAddress.",
  [SOLANA_ERROR__INVALID_BLOCKHASH_BYTE_LENGTH]: "Expected base58 encoded blockhash to decode to a byte array of length 32. Actual length: $actualLength.",
  [SOLANA_ERROR__INVALID_NONCE]: "The nonce `$expectedNonceValue` is no longer valid. It has advanced to `$actualNonceValue`",
  [SOLANA_ERROR__INVARIANT_VIOLATION__CACHED_ABORTABLE_ITERABLE_CACHE_ENTRY_MISSING]: "Invariant violation: Found no abortable iterable cache entry for key `$cacheKey`. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
  [SOLANA_ERROR__INVARIANT_VIOLATION__SWITCH_MUST_BE_EXHAUSTIVE]: "Invariant violation: Switch statement non-exhaustive. Received unexpected value `$unexpectedValue`. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
  [SOLANA_ERROR__INVARIANT_VIOLATION__WEBSOCKET_MESSAGE_ITERATOR_MUST_NOT_POLL_BEFORE_RESOLVING_EXISTING_MESSAGE_PROMISE]: "Invariant violation: WebSocket message iterator state is corrupt; iterated without first resolving existing message promise. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
  [SOLANA_ERROR__INVARIANT_VIOLATION__WEBSOCKET_MESSAGE_ITERATOR_STATE_MISSING]: "Invariant violation: WebSocket message iterator is missing state storage. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
  [SOLANA_ERROR__JSON_RPC__INTERNAL_ERROR]: "JSON-RPC error: Internal JSON-RPC error ($__serverMessage)",
  [SOLANA_ERROR__JSON_RPC__INVALID_PARAMS]: "JSON-RPC error: Invalid method parameter(s) ($__serverMessage)",
  [SOLANA_ERROR__JSON_RPC__INVALID_REQUEST]: "JSON-RPC error: The JSON sent is not a valid `Request` object ($__serverMessage)",
  [SOLANA_ERROR__JSON_RPC__METHOD_NOT_FOUND]: "JSON-RPC error: The method does not exist / is not available ($__serverMessage)",
  [SOLANA_ERROR__JSON_RPC__PARSE_ERROR]: "JSON-RPC error: An error occurred on the server while parsing the JSON text ($__serverMessage)",
  [SOLANA_ERROR__JSON_RPC__SCAN_ERROR]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED]: "Minimum context slot has not been reached",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY]: "Node is unhealthy; behind by $numSlotsBehind slots",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NO_SNAPSHOT]: "No snapshot",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE]: "Transaction simulation failed",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE]: "Transaction history is not available from this node",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH]: "Transaction signature length mismatch",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE]: "Transaction signature verification failure",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION]: "$__serverMessage",
  [SOLANA_ERROR__KEYS__INVALID_KEY_PAIR_BYTE_LENGTH]: "Key pair bytes must be of length 64, got $byteLength.",
  [SOLANA_ERROR__KEYS__INVALID_PRIVATE_KEY_BYTE_LENGTH]: "Expected private key bytes with length 32. Actual length: $actualLength.",
  [SOLANA_ERROR__KEYS__INVALID_SIGNATURE_BYTE_LENGTH]: "Expected base58-encoded signature to decode to a byte array of length 64. Actual length: $actualLength.",
  [SOLANA_ERROR__KEYS__PUBLIC_KEY_MUST_MATCH_PRIVATE_KEY]: "The provided private key does not match the provided public key.",
  [SOLANA_ERROR__KEYS__SIGNATURE_STRING_LENGTH_OUT_OF_RANGE]: "Expected base58-encoded signature string of length in the range [64, 88]. Actual length: $actualLength.",
  [SOLANA_ERROR__LAMPORTS_OUT_OF_RANGE]: "Lamports value must be in the range [0, 2e64-1]",
  [SOLANA_ERROR__MALFORMED_BIGINT_STRING]: "`$value` cannot be parsed as a `BigInt`",
  [SOLANA_ERROR__MALFORMED_NUMBER_STRING]: "`$value` cannot be parsed as a `Number`",
  [SOLANA_ERROR__NONCE_ACCOUNT_NOT_FOUND]: "No nonce account could be found at address `$nonceAccountAddress`",
  [SOLANA_ERROR__RPC_SUBSCRIPTIONS__CANNOT_CREATE_SUBSCRIPTION_REQUEST]: "Either the notification name must end in 'Notifications' or the API must supply a subscription creator function for the notification '$notificationName' to map between the notification name and the subscribe/unsubscribe method names.",
  [SOLANA_ERROR__RPC_SUBSCRIPTIONS__EXPECTED_SERVER_SUBSCRIPTION_ID]: "Failed to obtain a subscription id from the server",
  [SOLANA_ERROR__RPC_SUBSCRIPTIONS__TRANSPORT_CLOSED_BEFORE_MESSAGE_BUFFERED]: "WebSocket was closed before payload could be added to the send buffer",
  [SOLANA_ERROR__RPC_SUBSCRIPTIONS__TRANSPORT_CONNECTION_CLOSED]: "WebSocket connection closed",
  [SOLANA_ERROR__RPC_SUBSCRIPTIONS__TRANSPORT_FAILED_TO_CONNECT]: "WebSocket failed to connect",
  [SOLANA_ERROR__RPC__INTEGER_OVERFLOW]: "The $argumentLabel argument to the `$methodName` RPC method$optionalPathLabel was `$value`. This number is unsafe for use with the Solana JSON-RPC because it exceeds `Number.MAX_SAFE_INTEGER`.",
  [SOLANA_ERROR__RPC__TRANSPORT_HTTP_ERROR]: "HTTP error ($statusCode): $message",
  [SOLANA_ERROR__RPC__TRANSPORT_HTTP_HEADER_FORBIDDEN]: "HTTP header(s) forbidden: $headers. Learn more at https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name.",
  [SOLANA_ERROR__SIGNER__ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS]: "Multiple distinct signers were identified for address `$address`. Please ensure that you are using the same signer instance for each address.",
  [SOLANA_ERROR__SIGNER__EXPECTED_KEY_PAIR_SIGNER]: "The provided value does not implement the `KeyPairSigner` interface",
  [SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_MODIFYING_SIGNER]: "The provided value does not implement the `MessageModifyingSigner` interface",
  [SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_PARTIAL_SIGNER]: "The provided value does not implement the `MessagePartialSigner` interface",
  [SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_SIGNER]: "The provided value does not implement any of the `MessageSigner` interfaces",
  [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_MODIFYING_SIGNER]: "The provided value does not implement the `TransactionModifyingSigner` interface",
  [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_PARTIAL_SIGNER]: "The provided value does not implement the `TransactionPartialSigner` interface",
  [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SENDING_SIGNER]: "The provided value does not implement the `TransactionSendingSigner` interface",
  [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SIGNER]: "The provided value does not implement any of the `TransactionSigner` interfaces",
  [SOLANA_ERROR__SIGNER__TRANSACTION_CANNOT_HAVE_MULTIPLE_SENDING_SIGNERS]: "More than one `TransactionSendingSigner` was identified.",
  [SOLANA_ERROR__SIGNER__TRANSACTION_SENDING_SIGNER_MISSING]: "No `TransactionSendingSigner` was identified. Please provide a valid `ITransactionWithSingleSendingSigner` transaction.",
  [SOLANA_ERROR__SIGNER__WALLET_MULTISIGN_UNIMPLEMENTED]: "Wallet account signers do not support signing multiple messages/transactions in a single operation",
  [SOLANA_ERROR__SUBTLE_CRYPTO__CANNOT_EXPORT_NON_EXTRACTABLE_KEY]: "Cannot export a non-extractable key.",
  [SOLANA_ERROR__SUBTLE_CRYPTO__DIGEST_UNIMPLEMENTED]: "No digest implementation could be found.",
  [SOLANA_ERROR__SUBTLE_CRYPTO__DISALLOWED_IN_INSECURE_CONTEXT]: "Cryptographic operations are only allowed in secure browser contexts. Read more here: https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts.",
  [SOLANA_ERROR__SUBTLE_CRYPTO__ED25519_ALGORITHM_UNIMPLEMENTED]: "This runtime does not support the generation of Ed25519 key pairs.\n\nInstall @solana/webcrypto-ed25519-polyfill and call its `install` function before generating keys in environments that do not support Ed25519.\n\nFor a list of runtimes that currently support Ed25519 operations, visit https://github.com/WICG/webcrypto-secure-curves/issues/20.",
  [SOLANA_ERROR__SUBTLE_CRYPTO__EXPORT_FUNCTION_UNIMPLEMENTED]: "No signature verification implementation could be found.",
  [SOLANA_ERROR__SUBTLE_CRYPTO__GENERATE_FUNCTION_UNIMPLEMENTED]: "No key generation implementation could be found.",
  [SOLANA_ERROR__SUBTLE_CRYPTO__SIGN_FUNCTION_UNIMPLEMENTED]: "No signing implementation could be found.",
  [SOLANA_ERROR__SUBTLE_CRYPTO__VERIFY_FUNCTION_UNIMPLEMENTED]: "No key export implementation could be found.",
  [SOLANA_ERROR__TIMESTAMP_OUT_OF_RANGE]: "Timestamp value must be in the range [-8.64e15, 8.64e15]. `$value` given",
  [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_BORROW_OUTSTANDING]: "Transaction processing left an account with an outstanding borrowed reference",
  [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_IN_USE]: "Account in use",
  [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_LOADED_TWICE]: "Account loaded twice",
  [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_NOT_FOUND]: "Attempt to debit an account but found no record of a prior credit.",
  [SOLANA_ERROR__TRANSACTION_ERROR__ADDRESS_LOOKUP_TABLE_NOT_FOUND]: "Transaction loads an address table account that doesn't exist",
  [SOLANA_ERROR__TRANSACTION_ERROR__ALREADY_PROCESSED]: "This transaction has already been processed",
  [SOLANA_ERROR__TRANSACTION_ERROR__BLOCKHASH_NOT_FOUND]: "Blockhash not found",
  [SOLANA_ERROR__TRANSACTION_ERROR__CALL_CHAIN_TOO_DEEP]: "Loader call chain is too deep",
  [SOLANA_ERROR__TRANSACTION_ERROR__CLUSTER_MAINTENANCE]: "Transactions are currently disabled due to cluster maintenance",
  [SOLANA_ERROR__TRANSACTION_ERROR__DUPLICATE_INSTRUCTION]: "Transaction contains a duplicate instruction ($index) that is not allowed",
  [SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_FEE]: "Insufficient funds for fee",
  [SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_RENT]: "Transaction results in an account ($accountIndex) with insufficient funds for rent",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_FOR_FEE]: "This account may not be used to pay transaction fees",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_INDEX]: "Transaction contains an invalid account reference",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_DATA]: "Transaction loads an address table account with invalid data",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_INDEX]: "Transaction address table lookup uses an invalid index",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_OWNER]: "Transaction loads an address table account with an invalid owner",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_LOADED_ACCOUNTS_DATA_SIZE_LIMIT]: "LoadedAccountsDataSizeLimit set for transaction must be greater than 0.",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_PROGRAM_FOR_EXECUTION]: "This program may not be used for executing instructions",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_RENT_PAYING_ACCOUNT]: "Transaction leaves an account with a lower balance than rent-exempt minimum",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_WRITABLE_ACCOUNT]: "Transaction loads a writable account that cannot be written",
  [SOLANA_ERROR__TRANSACTION_ERROR__MAX_LOADED_ACCOUNTS_DATA_SIZE_EXCEEDED]: "Transaction exceeded max loaded accounts data size cap",
  [SOLANA_ERROR__TRANSACTION_ERROR__MISSING_SIGNATURE_FOR_FEE]: "Transaction requires a fee but has no signature present",
  [SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_ACCOUNT_NOT_FOUND]: "Attempt to load a program that does not exist",
  [SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED]: "Execution of the program referenced by account at index $accountIndex is temporarily restricted.",
  [SOLANA_ERROR__TRANSACTION_ERROR__RESANITIZATION_NEEDED]: "ResanitizationNeeded",
  [SOLANA_ERROR__TRANSACTION_ERROR__SANITIZE_FAILURE]: "Transaction failed to sanitize accounts offsets correctly",
  [SOLANA_ERROR__TRANSACTION_ERROR__SIGNATURE_FAILURE]: "Transaction did not pass signature verification",
  [SOLANA_ERROR__TRANSACTION_ERROR__TOO_MANY_ACCOUNT_LOCKS]: "Transaction locked too many accounts",
  [SOLANA_ERROR__TRANSACTION_ERROR__UNBALANCED_TRANSACTION]: "Sum of account balances before and after transaction do not match",
  [SOLANA_ERROR__TRANSACTION_ERROR__UNKNOWN]: "The transaction failed with the error `$errorName`",
  [SOLANA_ERROR__TRANSACTION_ERROR__UNSUPPORTED_VERSION]: "Transaction version is unsupported",
  [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_BLOCK_LIMIT]: "Transaction would exceed account data limit within the block",
  [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_TOTAL_LIMIT]: "Transaction would exceed total account data limit",
  [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_ACCOUNT_COST_LIMIT]: "Transaction would exceed max account limit within the block",
  [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_BLOCK_COST_LIMIT]: "Transaction would exceed max Block Cost Limit",
  [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_VOTE_COST_LIMIT]: "Transaction would exceed max Vote Cost Limit",
  [SOLANA_ERROR__TRANSACTION__ADDRESSES_CANNOT_SIGN_TRANSACTION]: "Attempted to sign a transaction with an address that is not a signer for it",
  [SOLANA_ERROR__TRANSACTION__ADDRESS_MISSING]: "Transaction is missing an address at index: $index.",
  [SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_SIGNATURES]: "Transaction has no expected signers therefore it cannot be encoded",
  [SOLANA_ERROR__TRANSACTION__EXPECTED_BLOCKHASH_LIFETIME]: "Transaction does not have a blockhash lifetime",
  [SOLANA_ERROR__TRANSACTION__EXPECTED_NONCE_LIFETIME]: "Transaction is not a durable nonce transaction",
  [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_CONTENTS_MISSING]: "Contents of these address lookup tables unknown: $lookupTableAddresses",
  [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_INDEX_OUT_OF_RANGE]: "Lookup of address at index $highestRequestedIndex failed for lookup table `$lookupTableAddress`. Highest known index is $highestKnownIndex. The lookup table may have been extended since its contents were retrieved",
  [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_FEE_PAYER_MISSING]: "No fee payer set in CompiledTransaction",
  [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_PROGRAM_ADDRESS_NOT_FOUND]: "Could not find program address at index $index",
  [SOLANA_ERROR__TRANSACTION__FAILED_TO_ESTIMATE_COMPUTE_LIMIT]: "Failed to estimate the compute unit consumption for this transaction message. This is likely because simulating the transaction failed. Inspect the `cause` property of this error to learn more",
  [SOLANA_ERROR__TRANSACTION__FEE_PAYER_MISSING]: "Transaction is missing a fee payer.",
  [SOLANA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING]: "Could not determine this transaction's signature. Make sure that the transaction has been signed by its fee payer.",
  [SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_FIRST_INSTRUCTION_MUST_BE_ADVANCE_NONCE]: "Transaction first instruction is not advance nonce account instruction.",
  [SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_INSTRUCTIONS_MISSING]: "Transaction with no instructions cannot be durable nonce transaction.",
  [SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_CANNOT_PAY_FEES]: "This transaction includes an address (`$programAddress`) which is both invoked and set as the fee payer. Program addresses may not pay fees",
  [SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE]: "This transaction includes an address (`$programAddress`) which is both invoked and marked writable. Program addresses may not be writable",
  [SOLANA_ERROR__TRANSACTION__MESSAGE_SIGNATURES_MISMATCH]: "The transaction message expected the transaction to have $signerAddressesLength signatures, got $signaturesLength.",
  [SOLANA_ERROR__TRANSACTION__SIGNATURES_MISSING]: "Transaction is missing signatures for addresses: $addresses.",
  [SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_OUT_OF_RANGE]: "Transaction version must be in the range [0, 127]. `$actualVersion` given"
};
function getErrorMessage(code, context = {}) {
  if (false) {
    return getHumanReadableErrorMessage(code, context);
  } else {
    let decodingAdviceMessage = `Solana error #${code}; Decode this error by running \`npx @solana/errors decode -- ${code}`;
    if (Object.keys(context).length) {
      decodingAdviceMessage += ` '${encodeContextObject(context)}'`;
    }
    return `${decodingAdviceMessage}\``;
  }
}
var SolanaError = class extends Error {
  constructor(...[code, contextAndErrorOptions]) {
    let context;
    let errorOptions;
    if (contextAndErrorOptions) {
      const { cause, ...contextRest } = contextAndErrorOptions;
      if (cause) {
        errorOptions = { cause };
      }
      if (Object.keys(contextRest).length > 0) {
        context = contextRest;
      }
    }
    const message = getErrorMessage(code, context);
    super(message, errorOptions);
    __publicField(this, "cause", this.cause);
    __publicField(this, "context");
    this.context = {
      __code: code,
      ...context
    };
    this.name = "SolanaError";
  }
};

// node_modules/@solana/codecs-core/dist/index.browser.mjs
var padBytes = (bytes, length) => {
  if (bytes.length >= length) return bytes;
  const paddedBytes = new Uint8Array(length).fill(0);
  paddedBytes.set(bytes);
  return paddedBytes;
};
var fixBytes = (bytes, length) => padBytes(bytes.length <= length ? bytes : bytes.slice(0, length), length);
function getEncodedSize(value, encoder) {
  return "fixedSize" in encoder ? encoder.fixedSize : encoder.getSizeFromValue(value);
}
function createEncoder(encoder) {
  return Object.freeze({
    ...encoder,
    encode: (value) => {
      const bytes = new Uint8Array(getEncodedSize(value, encoder));
      encoder.write(value, bytes, 0);
      return bytes;
    }
  });
}
function createDecoder(decoder) {
  return Object.freeze({
    ...decoder,
    decode: (bytes, offset = 0) => decoder.read(bytes, offset)[0]
  });
}
function isFixedSize(codec) {
  return "fixedSize" in codec && typeof codec.fixedSize === "number";
}
function combineCodec(encoder, decoder) {
  if (isFixedSize(encoder) !== isFixedSize(decoder)) {
    throw new SolanaError(SOLANA_ERROR__CODECS__ENCODER_DECODER_SIZE_COMPATIBILITY_MISMATCH);
  }
  if (isFixedSize(encoder) && isFixedSize(decoder) && encoder.fixedSize !== decoder.fixedSize) {
    throw new SolanaError(SOLANA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH, {
      decoderFixedSize: decoder.fixedSize,
      encoderFixedSize: encoder.fixedSize
    });
  }
  if (!isFixedSize(encoder) && !isFixedSize(decoder) && encoder.maxSize !== decoder.maxSize) {
    throw new SolanaError(SOLANA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH, {
      decoderMaxSize: decoder.maxSize,
      encoderMaxSize: encoder.maxSize
    });
  }
  return {
    ...decoder,
    ...encoder,
    decode: decoder.decode,
    encode: encoder.encode,
    read: decoder.read,
    write: encoder.write
  };
}
function assertByteArrayIsNotEmptyForCodec(codecDescription, bytes, offset = 0) {
  if (bytes.length - offset <= 0) {
    throw new SolanaError(SOLANA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY, {
      codecDescription
    });
  }
}
function assertByteArrayHasEnoughBytesForCodec(codecDescription, expected, bytes, offset = 0) {
  const bytesLength = bytes.length - offset;
  if (bytesLength < expected) {
    throw new SolanaError(SOLANA_ERROR__CODECS__INVALID_BYTE_LENGTH, {
      bytesLength,
      codecDescription,
      expected
    });
  }
}
function fixEncoderSize(encoder, fixedBytes) {
  return createEncoder({
    fixedSize: fixedBytes,
    write: (value, bytes, offset) => {
      const variableByteArray = encoder.encode(value);
      const fixedByteArray = variableByteArray.length > fixedBytes ? variableByteArray.slice(0, fixedBytes) : variableByteArray;
      bytes.set(fixedByteArray, offset);
      return offset + fixedBytes;
    }
  });
}
function fixDecoderSize(decoder, fixedBytes) {
  return createDecoder({
    fixedSize: fixedBytes,
    read: (bytes, offset) => {
      assertByteArrayHasEnoughBytesForCodec("fixCodecSize", fixedBytes, bytes, offset);
      if (offset > 0 || bytes.length > fixedBytes) {
        bytes = bytes.slice(offset, offset + fixedBytes);
      }
      if (isFixedSize(decoder)) {
        bytes = fixBytes(bytes, decoder.fixedSize);
      }
      const [value] = decoder.read(bytes, 0);
      return [value, offset + fixedBytes];
    }
  });
}
function fixCodecSize(codec, fixedBytes) {
  return combineCodec(fixEncoderSize(codec, fixedBytes), fixDecoderSize(codec, fixedBytes));
}

// node_modules/@solana/codecs-numbers/dist/index.browser.mjs
function assertNumberIsBetweenForCodec(codecDescription, min, max, value) {
  if (value < min || value > max) {
    throw new SolanaError(SOLANA_ERROR__CODECS__NUMBER_OUT_OF_RANGE, {
      codecDescription,
      max,
      min,
      value
    });
  }
}
function isLittleEndian(config) {
  return config?.endian === 1 ? false : true;
}
function numberEncoderFactory(input) {
  return createEncoder({
    fixedSize: input.size,
    write(value, bytes, offset) {
      if (input.range) {
        assertNumberIsBetweenForCodec(input.name, input.range[0], input.range[1], value);
      }
      const arrayBuffer = new ArrayBuffer(input.size);
      input.set(new DataView(arrayBuffer), value, isLittleEndian(input.config));
      bytes.set(new Uint8Array(arrayBuffer), offset);
      return offset + input.size;
    }
  });
}
function numberDecoderFactory(input) {
  return createDecoder({
    fixedSize: input.size,
    read(bytes, offset = 0) {
      assertByteArrayIsNotEmptyForCodec(input.name, bytes, offset);
      assertByteArrayHasEnoughBytesForCodec(input.name, input.size, bytes, offset);
      const view = new DataView(toArrayBuffer(bytes, offset, input.size));
      return [input.get(view, isLittleEndian(input.config)), offset + input.size];
    }
  });
}
function toArrayBuffer(bytes, offset, length) {
  const bytesOffset = bytes.byteOffset + (offset ?? 0);
  const bytesLength = length ?? bytes.byteLength;
  return bytes.buffer.slice(bytesOffset, bytesOffset + bytesLength);
}
var getU64Encoder = (config = {}) => numberEncoderFactory({
  config,
  name: "u64",
  range: [0n, BigInt("0xffffffffffffffff")],
  set: (view, value, le) => view.setBigUint64(0, BigInt(value), le),
  size: 8
});
var getU64Decoder = (config = {}) => numberDecoderFactory({
  config,
  get: (view, le) => view.getBigUint64(0, le),
  name: "u64",
  size: 8
});
var getU64Codec = (config = {}) => combineCodec(getU64Encoder(config), getU64Decoder(config));

// node_modules/@solana/codecs-data-structures/dist/index.browser.mjs
function sumCodecSizes(sizes) {
  return sizes.reduce((all, size) => all === null || size === null ? null : all + size, 0);
}
function getFixedSize(codec) {
  return isFixedSize(codec) ? codec.fixedSize : null;
}
function getMaxSize(codec) {
  return isFixedSize(codec) ? codec.fixedSize : codec.maxSize ?? null;
}
function getBytesEncoder() {
  return createEncoder({
    getSizeFromValue: (value) => value.length,
    write: (value, bytes, offset) => {
      bytes.set(value, offset);
      return offset + value.length;
    }
  });
}
function getBytesDecoder() {
  return createDecoder({
    read: (bytes, offset) => {
      const slice = bytes.slice(offset);
      return [slice, offset + slice.length];
    }
  });
}
function getBytesCodec() {
  return combineCodec(getBytesEncoder(), getBytesDecoder());
}
function getStructEncoder(fields) {
  const fieldCodecs = fields.map(([, codec]) => codec);
  const fixedSize = sumCodecSizes(fieldCodecs.map(getFixedSize));
  const maxSize = sumCodecSizes(fieldCodecs.map(getMaxSize)) ?? void 0;
  return createEncoder({
    ...fixedSize === null ? {
      getSizeFromValue: (value) => fields.map(([key, codec]) => getEncodedSize(value[key], codec)).reduce((all, one) => all + one, 0),
      maxSize
    } : { fixedSize },
    write: (struct20, bytes, offset) => {
      fields.forEach(([key, codec]) => {
        offset = codec.write(struct20[key], bytes, offset);
      });
      return offset;
    }
  });
}
function getStructDecoder(fields) {
  const fieldCodecs = fields.map(([, codec]) => codec);
  const fixedSize = sumCodecSizes(fieldCodecs.map(getFixedSize));
  const maxSize = sumCodecSizes(fieldCodecs.map(getMaxSize)) ?? void 0;
  return createDecoder({
    ...fixedSize === null ? { maxSize } : { fixedSize },
    read: (bytes, offset) => {
      const struct20 = {};
      fields.forEach(([key, codec]) => {
        const [value, newOffset] = codec.read(bytes, offset);
        offset = newOffset;
        struct20[key] = value;
      });
      return [struct20, offset];
    }
  });
}
function getStructCodec(fields) {
  return combineCodec(
    getStructEncoder(fields),
    getStructDecoder(fields)
  );
}

// node_modules/@solana/spl-token-group/lib/esm/state/tokenGroup.js
var tokenGroupCodec = getStructCodec([
  ["updateAuthority", fixCodecSize(getBytesCodec(), 32)],
  ["mint", fixCodecSize(getBytesCodec(), 32)],
  ["size", getU64Codec()],
  ["maxSize", getU64Codec()]
]);
var TOKEN_GROUP_SIZE = tokenGroupCodec.fixedSize;

// node_modules/@solana/spl-token-group/lib/esm/state/tokenGroupMember.js
var tokenGroupMemberCodec = getStructCodec([
  ["mint", fixCodecSize(getBytesCodec(), 32)],
  ["group", fixCodecSize(getBytesCodec(), 32)],
  ["memberNumber", getU64Codec()]
]);
var TOKEN_GROUP_MEMBER_SIZE = tokenGroupMemberCodec.fixedSize;

// node_modules/@solana/spl-token/lib/esm/extensions/groupMemberPointer/state.js
var import_buffer_layout5 = __toESM(require_Layout(), 1);
var GroupMemberPointerLayout = (0, import_buffer_layout5.struct)([
  publicKey("authority"),
  publicKey("memberAddress")
]);
var GROUP_MEMBER_POINTER_SIZE = GroupMemberPointerLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/groupPointer/state.js
var import_buffer_layout6 = __toESM(require_Layout(), 1);
var GroupPointerLayout = (0, import_buffer_layout6.struct)([
  publicKey("authority"),
  publicKey("groupAddress")
]);
var GROUP_POINTER_SIZE = GroupPointerLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/immutableOwner.js
var import_buffer_layout7 = __toESM(require_Layout(), 1);
var ImmutableOwnerLayout = (0, import_buffer_layout7.struct)([]);
var IMMUTABLE_OWNER_SIZE = ImmutableOwnerLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/interestBearingMint/state.js
var import_buffer_layout8 = __toESM(require_Layout(), 1);
var InterestBearingMintConfigStateLayout = (0, import_buffer_layout8.struct)([
  publicKey("rateAuthority"),
  (0, import_buffer_layout8.ns64)("initializationTimestamp"),
  (0, import_buffer_layout8.s16)("preUpdateAverageRate"),
  (0, import_buffer_layout8.ns64)("lastUpdateTimestamp"),
  (0, import_buffer_layout8.s16)("currentRate")
]);
var INTEREST_BEARING_MINT_CONFIG_STATE_SIZE = InterestBearingMintConfigStateLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/memoTransfer/state.js
var import_buffer_layout9 = __toESM(require_Layout(), 1);
var MemoTransferLayout = (0, import_buffer_layout9.struct)([bool("requireIncomingTransferMemos")]);
var MEMO_TRANSFER_SIZE = MemoTransferLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/metadataPointer/state.js
var import_buffer_layout10 = __toESM(require_Layout(), 1);
var MetadataPointerLayout = (0, import_buffer_layout10.struct)([
  publicKey("authority"),
  publicKey("metadataAddress")
]);
var METADATA_POINTER_SIZE = MetadataPointerLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/mintCloseAuthority.js
var import_buffer_layout11 = __toESM(require_Layout(), 1);
var MintCloseAuthorityLayout = (0, import_buffer_layout11.struct)([publicKey("closeAuthority")]);
var MINT_CLOSE_AUTHORITY_SIZE = MintCloseAuthorityLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/nonTransferable.js
var import_buffer_layout12 = __toESM(require_Layout(), 1);
var NonTransferableLayout = (0, import_buffer_layout12.struct)([]);
var NON_TRANSFERABLE_SIZE = NonTransferableLayout.span;
var NON_TRANSFERABLE_ACCOUNT_SIZE = NonTransferableLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/pausable/state.js
var import_buffer_layout13 = __toESM(require_Layout(), 1);
var PausableConfigLayout = (0, import_buffer_layout13.struct)([publicKey("authority"), bool("paused")]);
var PAUSABLE_CONFIG_SIZE = PausableConfigLayout.span;
var PausableAccountLayout = (0, import_buffer_layout13.struct)([]);
var PAUSABLE_ACCOUNT_SIZE = PausableAccountLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/permanentDelegate.js
var import_buffer_layout14 = __toESM(require_Layout(), 1);
var PermanentDelegateLayout = (0, import_buffer_layout14.struct)([publicKey("delegate")]);
var PERMANENT_DELEGATE_SIZE = PermanentDelegateLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/permissionedBurn/state.js
var import_buffer_layout15 = __toESM(require_Layout(), 1);
var PermissionedBurnLayout = (0, import_buffer_layout15.struct)([publicKey("authority")]);
var PERMISSIONED_BURN_SIZE = PermissionedBurnLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/scaledUiAmount/state.js
var import_buffer_layout16 = __toESM(require_Layout(), 1);
var ScaledUiAmountConfigLayout = (0, import_buffer_layout16.struct)([
  publicKey("authority"),
  (0, import_buffer_layout16.f64)("multiplier"),
  u64("newMultiplierEffectiveTimestamp"),
  (0, import_buffer_layout16.f64)("newMultiplier")
]);
var SCALED_UI_AMOUNT_CONFIG_SIZE = ScaledUiAmountConfigLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/transferFee/state.js
var import_buffer_layout17 = __toESM(require_Layout(), 1);
var MAX_FEE_BASIS_POINTS = 1e4;
var ONE_IN_BASIS_POINTS = BigInt(MAX_FEE_BASIS_POINTS);
function transferFeeLayout(property) {
  return (0, import_buffer_layout17.struct)([u64("epoch"), u64("maximumFee"), (0, import_buffer_layout17.u16)("transferFeeBasisPoints")], property);
}
var TransferFeeConfigLayout = (0, import_buffer_layout17.struct)([
  publicKey("transferFeeConfigAuthority"),
  publicKey("withdrawWithheldAuthority"),
  u64("withheldAmount"),
  transferFeeLayout("olderTransferFee"),
  transferFeeLayout("newerTransferFee")
]);
var TRANSFER_FEE_CONFIG_SIZE = TransferFeeConfigLayout.span;
var TransferFeeAmountLayout = (0, import_buffer_layout17.struct)([u64("withheldAmount")]);
var TRANSFER_FEE_AMOUNT_SIZE = TransferFeeAmountLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/transferHook/state.js
var import_buffer_layout18 = __toESM(require_Layout(), 1);
var TransferHookLayout = (0, import_buffer_layout18.struct)([publicKey("authority"), publicKey("programId")]);
var TRANSFER_HOOK_SIZE = TransferHookLayout.span;
var TransferHookAccountLayout = (0, import_buffer_layout18.struct)([bool("transferring")]);
var TRANSFER_HOOK_ACCOUNT_SIZE = TransferHookAccountLayout.span;
var ExtraAccountMetaLayout = (0, import_buffer_layout18.struct)([
  (0, import_buffer_layout18.u8)("discriminator"),
  (0, import_buffer_layout18.blob)(32, "addressConfig"),
  bool("isSigner"),
  bool("isWritable")
]);
var ExtraAccountMetaListLayout = (0, import_buffer_layout18.struct)([
  (0, import_buffer_layout18.u32)("count"),
  (0, import_buffer_layout18.seq)(ExtraAccountMetaLayout, (0, import_buffer_layout18.greedy)(ExtraAccountMetaLayout.span), "extraAccounts")
]);
var ExtraAccountMetaAccountDataLayout = (0, import_buffer_layout18.struct)([
  u64("instructionDiscriminator"),
  (0, import_buffer_layout18.u32)("length"),
  ExtraAccountMetaListLayout.replicate("extraAccountsList")
]);

// node_modules/@solana/spl-token/lib/esm/extensions/extensionType.js
var ExtensionType;
(function(ExtensionType2) {
  ExtensionType2[ExtensionType2["Uninitialized"] = 0] = "Uninitialized";
  ExtensionType2[ExtensionType2["TransferFeeConfig"] = 1] = "TransferFeeConfig";
  ExtensionType2[ExtensionType2["TransferFeeAmount"] = 2] = "TransferFeeAmount";
  ExtensionType2[ExtensionType2["MintCloseAuthority"] = 3] = "MintCloseAuthority";
  ExtensionType2[ExtensionType2["ConfidentialTransferMint"] = 4] = "ConfidentialTransferMint";
  ExtensionType2[ExtensionType2["ConfidentialTransferAccount"] = 5] = "ConfidentialTransferAccount";
  ExtensionType2[ExtensionType2["DefaultAccountState"] = 6] = "DefaultAccountState";
  ExtensionType2[ExtensionType2["ImmutableOwner"] = 7] = "ImmutableOwner";
  ExtensionType2[ExtensionType2["MemoTransfer"] = 8] = "MemoTransfer";
  ExtensionType2[ExtensionType2["NonTransferable"] = 9] = "NonTransferable";
  ExtensionType2[ExtensionType2["InterestBearingConfig"] = 10] = "InterestBearingConfig";
  ExtensionType2[ExtensionType2["CpiGuard"] = 11] = "CpiGuard";
  ExtensionType2[ExtensionType2["PermanentDelegate"] = 12] = "PermanentDelegate";
  ExtensionType2[ExtensionType2["NonTransferableAccount"] = 13] = "NonTransferableAccount";
  ExtensionType2[ExtensionType2["TransferHook"] = 14] = "TransferHook";
  ExtensionType2[ExtensionType2["TransferHookAccount"] = 15] = "TransferHookAccount";
  ExtensionType2[ExtensionType2["MetadataPointer"] = 18] = "MetadataPointer";
  ExtensionType2[ExtensionType2["TokenMetadata"] = 19] = "TokenMetadata";
  ExtensionType2[ExtensionType2["GroupPointer"] = 20] = "GroupPointer";
  ExtensionType2[ExtensionType2["TokenGroup"] = 21] = "TokenGroup";
  ExtensionType2[ExtensionType2["GroupMemberPointer"] = 22] = "GroupMemberPointer";
  ExtensionType2[ExtensionType2["TokenGroupMember"] = 23] = "TokenGroupMember";
  ExtensionType2[ExtensionType2["ScaledUiAmountConfig"] = 25] = "ScaledUiAmountConfig";
  ExtensionType2[ExtensionType2["PausableConfig"] = 26] = "PausableConfig";
  ExtensionType2[ExtensionType2["PausableAccount"] = 27] = "PausableAccount";
  ExtensionType2[ExtensionType2["PermissionedBurn"] = 28] = "PermissionedBurn";
})(ExtensionType || (ExtensionType = {}));
var TYPE_SIZE = 2;
var LENGTH_SIZE = 2;
function addTypeAndLengthToLen(len) {
  return len + TYPE_SIZE + LENGTH_SIZE;
}
function isVariableLengthExtension(e) {
  switch (e) {
    case ExtensionType.TokenMetadata:
      return true;
    default:
      return false;
  }
}
function getTypeLen(e) {
  switch (e) {
    case ExtensionType.Uninitialized:
      return 0;
    case ExtensionType.TransferFeeConfig:
      return TRANSFER_FEE_CONFIG_SIZE;
    case ExtensionType.TransferFeeAmount:
      return TRANSFER_FEE_AMOUNT_SIZE;
    case ExtensionType.MintCloseAuthority:
      return MINT_CLOSE_AUTHORITY_SIZE;
    case ExtensionType.ConfidentialTransferMint:
      return 65;
    case ExtensionType.ConfidentialTransferAccount:
      return 295;
    case ExtensionType.CpiGuard:
      return CPI_GUARD_SIZE;
    case ExtensionType.DefaultAccountState:
      return DEFAULT_ACCOUNT_STATE_SIZE;
    case ExtensionType.ImmutableOwner:
      return IMMUTABLE_OWNER_SIZE;
    case ExtensionType.MemoTransfer:
      return MEMO_TRANSFER_SIZE;
    case ExtensionType.MetadataPointer:
      return METADATA_POINTER_SIZE;
    case ExtensionType.NonTransferable:
      return NON_TRANSFERABLE_SIZE;
    case ExtensionType.InterestBearingConfig:
      return INTEREST_BEARING_MINT_CONFIG_STATE_SIZE;
    case ExtensionType.PermanentDelegate:
      return PERMANENT_DELEGATE_SIZE;
    case ExtensionType.NonTransferableAccount:
      return NON_TRANSFERABLE_ACCOUNT_SIZE;
    case ExtensionType.TransferHook:
      return TRANSFER_HOOK_SIZE;
    case ExtensionType.TransferHookAccount:
      return TRANSFER_HOOK_ACCOUNT_SIZE;
    case ExtensionType.GroupPointer:
      return GROUP_POINTER_SIZE;
    case ExtensionType.GroupMemberPointer:
      return GROUP_MEMBER_POINTER_SIZE;
    case ExtensionType.TokenGroup:
      return TOKEN_GROUP_SIZE;
    case ExtensionType.TokenGroupMember:
      return TOKEN_GROUP_MEMBER_SIZE;
    case ExtensionType.ScaledUiAmountConfig:
      return SCALED_UI_AMOUNT_CONFIG_SIZE;
    case ExtensionType.PausableConfig:
      return PAUSABLE_CONFIG_SIZE;
    case ExtensionType.PausableAccount:
      return PAUSABLE_ACCOUNT_SIZE;
    case ExtensionType.PermissionedBurn:
      return PERMISSIONED_BURN_SIZE;
    case ExtensionType.TokenMetadata:
      throw Error(`Cannot get type length for variable extension type: ${e}`);
    default:
      throw Error(`Unknown extension type: ${e}`);
  }
}
function getLen(extensionTypes, baseSize, variableLengthExtensions = {}) {
  if (extensionTypes.length === 0 && Object.keys(variableLengthExtensions).length === 0) {
    return baseSize;
  } else {
    const accountLength = ACCOUNT_SIZE + ACCOUNT_TYPE_SIZE + extensionTypes.filter((element, i) => i === extensionTypes.indexOf(element)).map((element) => addTypeAndLengthToLen(getTypeLen(element))).reduce((a, b) => a + b, 0) + Object.entries(variableLengthExtensions).map(([extension, len]) => {
      if (!isVariableLengthExtension(Number(extension))) {
        throw Error(`Extension ${extension} is not variable length`);
      }
      return addTypeAndLengthToLen(len);
    }).reduce((a, b) => a + b, 0);
    if (accountLength === MULTISIG_SIZE) {
      return accountLength + TYPE_SIZE;
    } else {
      return accountLength;
    }
  }
}
function getMintLen(extensionTypes, variableLengthExtensions = {}) {
  return getLen(extensionTypes, MINT_SIZE, variableLengthExtensions);
}

// node_modules/@solana/spl-token/lib/esm/state/mint.js
var MintLayout = (0, import_buffer_layout19.struct)([
  (0, import_buffer_layout19.u32)("mintAuthorityOption"),
  publicKey("mintAuthority"),
  u64("supply"),
  (0, import_buffer_layout19.u8)("decimals"),
  bool("isInitialized"),
  (0, import_buffer_layout19.u32)("freezeAuthorityOption"),
  publicKey("freezeAuthority")
]);
var MINT_SIZE = MintLayout.span;
async function getMinimumBalanceForRentExemptMint(connection, commitment) {
  return await getMinimumBalanceForRentExemptMintWithExtensions(connection, [], commitment);
}
async function getMinimumBalanceForRentExemptMintWithExtensions(connection, extensions, commitment) {
  const mintLen = getMintLen(extensions);
  return await connection.getMinimumBalanceForRentExemption(mintLen, commitment);
}
function getAssociatedTokenAddressSync(mint, owner, allowOwnerOffCurve = false, programId = TOKEN_PROGRAM_ID, associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID) {
  if (!allowOwnerOffCurve && !PublicKey.isOnCurve(owner.toBuffer()))
    throw new TokenOwnerOffCurveError();
  const [address] = PublicKey.findProgramAddressSync([owner.toBuffer(), programId.toBuffer(), mint.toBuffer()], associatedTokenProgramId);
  return address;
}

// src/lib/tokenAccount.js
async function readTokenAmount(connection, address) {
  const info = await connection.getAccountInfo(address, "confirmed");
  if (!info || info.data.length < 72) return null;
  const view = new DataView(info.data.buffer, info.data.byteOffset + 64, 8);
  return view.getBigUint64(0, true);
}
async function readTokenAmountOrZero(connection, address) {
  try {
    const amount = await readTokenAmount(connection, address);
    return amount ?? 0n;
  } catch {
    return 0n;
  }
}

export {
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddressSync,
  readTokenAmountOrZero
};
//# sourceMappingURL=chunk-VR7CWCWW.js.map
