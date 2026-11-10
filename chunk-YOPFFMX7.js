import {
  TokenInstruction,
  addSigners
} from "./chunk-BGFIKFZK.js";
import {
  TOKEN_PROGRAM_ID,
  publicKey
} from "./chunk-XHYEPNL4.js";
import {
  TransactionInstruction,
  __toESM,
  require_Layout
} from "./chunk-5MXUSYBM.js";

// node_modules/@solana/spl-token/lib/esm/instructions/setAuthority.js
var import_buffer_layout2 = __toESM(require_Layout(), 1);

// node_modules/@solana/spl-token/lib/esm/serialization.js
var import_buffer_layout = __toESM(require_Layout(), 1);
var COptionPublicKeyLayout = class extends import_buffer_layout.Layout {
  constructor(property) {
    super(-1, property);
    this.publicKeyLayout = publicKey();
  }
  decode(buffer, offset = 0) {
    const option = buffer[offset];
    if (option === 0) {
      return null;
    }
    return this.publicKeyLayout.decode(buffer, offset + 1);
  }
  encode(src, buffer, offset = 0) {
    if (src === null) {
      buffer[offset] = 0;
      return 1;
    } else {
      buffer[offset] = 1;
      this.publicKeyLayout.encode(src, buffer, offset + 1);
      return 33;
    }
  }
  getSpan(buffer, offset = 0) {
    if (buffer) {
      const option = buffer[offset];
      return option === 0 ? 1 : 1 + this.publicKeyLayout.span;
    }
    throw new RangeError("Buffer must be provided");
  }
};

// node_modules/@solana/spl-token/lib/esm/instructions/setAuthority.js
var AuthorityType;
(function(AuthorityType2) {
  AuthorityType2[AuthorityType2["MintTokens"] = 0] = "MintTokens";
  AuthorityType2[AuthorityType2["FreezeAccount"] = 1] = "FreezeAccount";
  AuthorityType2[AuthorityType2["AccountOwner"] = 2] = "AccountOwner";
  AuthorityType2[AuthorityType2["CloseAccount"] = 3] = "CloseAccount";
  AuthorityType2[AuthorityType2["TransferFeeConfig"] = 4] = "TransferFeeConfig";
  AuthorityType2[AuthorityType2["WithheldWithdraw"] = 5] = "WithheldWithdraw";
  AuthorityType2[AuthorityType2["CloseMint"] = 6] = "CloseMint";
  AuthorityType2[AuthorityType2["InterestRate"] = 7] = "InterestRate";
  AuthorityType2[AuthorityType2["PermanentDelegate"] = 8] = "PermanentDelegate";
  AuthorityType2[AuthorityType2["ConfidentialTransferMint"] = 9] = "ConfidentialTransferMint";
  AuthorityType2[AuthorityType2["TransferHookProgramId"] = 10] = "TransferHookProgramId";
  AuthorityType2[AuthorityType2["ConfidentialTransferFeeConfig"] = 11] = "ConfidentialTransferFeeConfig";
  AuthorityType2[AuthorityType2["MetadataPointer"] = 12] = "MetadataPointer";
  AuthorityType2[AuthorityType2["GroupPointer"] = 13] = "GroupPointer";
  AuthorityType2[AuthorityType2["GroupMemberPointer"] = 14] = "GroupMemberPointer";
  AuthorityType2[AuthorityType2["ScaledUiAmountConfig"] = 15] = "ScaledUiAmountConfig";
  AuthorityType2[AuthorityType2["PausableConfig"] = 16] = "PausableConfig";
  AuthorityType2[AuthorityType2["PermissionedBurn"] = 17] = "PermissionedBurn";
})(AuthorityType || (AuthorityType = {}));
var setAuthorityInstructionData = (0, import_buffer_layout2.struct)([
  (0, import_buffer_layout2.u8)("instruction"),
  (0, import_buffer_layout2.u8)("authorityType"),
  new COptionPublicKeyLayout("newAuthority")
]);
function createSetAuthorityInstruction(account, currentAuthority, authorityType, newAuthority, multiSigners = [], programId = TOKEN_PROGRAM_ID) {
  const keys = addSigners([{ pubkey: account, isSigner: false, isWritable: true }], currentAuthority, multiSigners);
  const data = Buffer.alloc(35);
  setAuthorityInstructionData.encode({
    instruction: TokenInstruction.SetAuthority,
    authorityType,
    newAuthority
  }, data);
  return new TransactionInstruction({
    keys,
    programId,
    data: data.subarray(0, setAuthorityInstructionData.getSpan(data))
  });
}

export {
  COptionPublicKeyLayout,
  AuthorityType,
  createSetAuthorityInstruction
};
//# sourceMappingURL=chunk-YOPFFMX7.js.map
