import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID
} from "./chunk-KZEFVH3E.js";
import {
  Reader,
  Writer,
  discriminatorHex,
  encodeBase58
} from "./chunk-35EFKCYM.js";
import {
  getConfig
} from "./chunk-Y7EOAKKY.js";
import {
  PublicKey,
  SystemProgram,
  TransactionInstruction
} from "./chunk-5MXUSYBM.js";

// src/lib/discriminators.js
var IX = {
  initializePool: "5fb40aac54aee828",
  fundRewards: "7240a370afa71379",
  setApr: "1fc68fd4b218ce6f",
  setPaused: "5b3c7dc0b0e1a6da",
  stake: "ceb0ca12c8d1b36c",
  claim: "3ec6d6c1d59f6cd2",
  unstake: "5a5f6b2acd7c32e1"
};
var ACCOUNT = {
  pool: "f19a6d0411b16dbc",
  position: "aabc8fe47a40f7d0",
  userState: "48b155f94ca7ba7e"
};
var EVENT = {
  poolInitialized: "6476ad570cc6fee5",
  rewardFunded: "47216b3c92d107af",
  aprUpdated: "5038665b055ece07",
  pausedSet: "ab7d7f9ce9514442",
  staked: "0b922dcde63ad5f0",
  rewardClaimed: "311c57549e30e5af",
  unstaked: "1bb39cd72f47c307"
};

// src/lib/program.js
var POOL_SEED = "pool";
var AUTHORITY_SEED = "authority";
var POSITION_SEED = "position";
var USER_SEED = "user";
function programId() {
  return new PublicKey(getConfig().staking.programId);
}
function poolPda() {
  return PublicKey.findProgramAddressSync([Buffer.from(POOL_SEED)], programId())[0];
}
function authorityPda() {
  return PublicKey.findProgramAddressSync([Buffer.from(AUTHORITY_SEED)], programId())[0];
}
function userStatePda(owner) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(USER_SEED), owner.toBuffer()],
    programId()
  )[0];
}
function positionPda(owner, nonce) {
  const bytes = new Uint8Array(8);
  new DataView(bytes.buffer).setBigUint64(0, BigInt(nonce), true);
  return PublicKey.findProgramAddressSync(
    [Buffer.from(POSITION_SEED), owner.toBuffer(), bytes],
    programId()
  )[0];
}
function discriminator(hex) {
  return Uint8Array.from(hex.match(/.{2}/g).map((byte) => parseInt(byte, 16)));
}
function instruction(hex, data, keys) {
  return new TransactionInstruction({
    programId: programId(),
    keys,
    data: Buffer.from(data)
  });
}
function base(hex) {
  return new Writer().raw(discriminator(hex));
}
function ixInitializePool({ admin, mint, principalVault, rewardVault, tiers, minStake }) {
  const writer = base(IX.initializePool);
  for (const tier of tiers) {
    writer.u64(tier.aprBps).u64(tier.lockSecs).u64(tier.capSecs);
  }
  writer.u64(minStake);
  return instruction(IX.initializePool, writer.bytes(), [
    { pubkey: admin, isSigner: true, isWritable: true },
    { pubkey: poolPda(), isSigner: false, isWritable: true },
    { pubkey: mint, isSigner: false, isWritable: false },
    { pubkey: authorityPda(), isSigner: false, isWritable: false },
    { pubkey: principalVault, isSigner: false, isWritable: true },
    { pubkey: rewardVault, isSigner: false, isWritable: true },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
  ]);
}
function ixFundRewards({ admin, adminAta, rewardVault, amount }) {
  const writer = base(IX.fundRewards).u64(amount).bytes();
  return instruction(IX.fundRewards, writer, [
    { pubkey: admin, isSigner: true, isWritable: true },
    { pubkey: poolPda(), isSigner: false, isWritable: true },
    { pubkey: adminAta, isSigner: false, isWritable: true },
    { pubkey: rewardVault, isSigner: false, isWritable: true },
    { pubkey: authorityPda(), isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }
  ]);
}
function ixSetApr({ admin, tier, aprBps }) {
  const writer = base(IX.setApr).u8(tier).u64(aprBps).bytes();
  return instruction(IX.setApr, writer, [
    { pubkey: admin, isSigner: true, isWritable: true },
    { pubkey: poolPda(), isSigner: false, isWritable: true }
  ]);
}
function ixSetPaused({ admin, paused }) {
  const writer = base(IX.setPaused).bool(paused).bytes();
  return instruction(IX.setPaused, writer, [
    { pubkey: admin, isSigner: true, isWritable: true },
    { pubkey: poolPda(), isSigner: false, isWritable: true }
  ]);
}
function ixStake({ owner, userState, position, ownerAta, principalVault, rewardVault, tier, amount, nonce }) {
  const writer = base(IX.stake).u8(tier).u64(amount).u64(nonce).bytes();
  return instruction(IX.stake, writer, [
    { pubkey: owner, isSigner: true, isWritable: true },
    { pubkey: poolPda(), isSigner: false, isWritable: true },
    { pubkey: userState, isSigner: false, isWritable: true },
    { pubkey: position, isSigner: false, isWritable: true },
    { pubkey: ownerAta, isSigner: false, isWritable: true },
    { pubkey: principalVault, isSigner: false, isWritable: true },
    { pubkey: rewardVault, isSigner: false, isWritable: true },
    { pubkey: authorityPda(), isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
  ]);
}
function ixClaim({ owner, userState, position, ownerAta, rewardVault, nonce }) {
  const writer = base(IX.claim).u64(nonce).bytes();
  return instruction(IX.claim, writer, [
    { pubkey: owner, isSigner: true, isWritable: true },
    { pubkey: poolPda(), isSigner: false, isWritable: true },
    { pubkey: position, isSigner: false, isWritable: true },
    { pubkey: userState, isSigner: false, isWritable: true },
    { pubkey: ownerAta, isSigner: false, isWritable: true },
    { pubkey: rewardVault, isSigner: false, isWritable: true },
    { pubkey: authorityPda(), isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }
  ]);
}
function ixUnstake({ owner, userState, position, ownerAta, principalVault, rewardVault, nonce }) {
  const writer = base(IX.unstake).u64(nonce).bytes();
  return instruction(IX.unstake, writer, [
    { pubkey: owner, isSigner: true, isWritable: true },
    { pubkey: poolPda(), isSigner: false, isWritable: true },
    { pubkey: position, isSigner: false, isWritable: true },
    { pubkey: userState, isSigner: false, isWritable: true },
    { pubkey: ownerAta, isSigner: false, isWritable: true },
    { pubkey: principalVault, isSigner: false, isWritable: true },
    { pubkey: rewardVault, isSigner: false, isWritable: true },
    { pubkey: authorityPda(), isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }
  ]);
}
function expectDiscriminator(reader, hex, name) {
  const actual = discriminatorHex(reader.bytes.slice(reader.offset, reader.offset + 8));
  reader.offset += 8;
  if (actual !== hex) {
    throw new Error(`${name} \u8D26\u6237\u7C7B\u578B\u4E0D\u5339\u914D\uFF08\u671F\u671B ${hex}\uFF0C\u5B9E\u9645 ${actual}\uFF09`);
  }
}
function decodePool(address, data) {
  const reader = new Reader(data);
  expectDiscriminator(reader, ACCOUNT.pool, "Pool");
  const pool = {
    address,
    mint: reader.pubkey(),
    admin: reader.pubkey(),
    bump: reader.u8(),
    authorityBump: reader.u8(),
    principalVault: reader.pubkey(),
    rewardVault: reader.pubkey(),
    paused: reader.bool(),
    minStake: reader.u64(),
    totalStaked: reader.u64(),
    totalCommitted: reader.u128(),
    totalPaid: reader.u128(),
    totalFunded: reader.u128(),
    stakerCount: reader.u64(),
    positionCount: reader.u64(),
    tiers: []
  };
  for (let i = 0; i < 5; i += 1) {
    pool.tiers.push({
      aprBps: reader.u64(),
      lockSecs: reader.u64(),
      capSecs: reader.u64(),
      enabled: reader.bool()
    });
  }
  return pool;
}
function decodePosition(address, data) {
  const reader = new Reader(data);
  expectDiscriminator(reader, ACCOUNT.position, "Position");
  return {
    address,
    pool: reader.pubkey(),
    owner: reader.pubkey(),
    nonce: reader.u64(),
    tier: reader.u8(),
    amount: reader.u64(),
    aprBps: reader.u64(),
    capSecs: reader.u64(),
    startTs: reader.i64(),
    unlockTs: reader.i64(),
    claimed: reader.u128(),
    committed: reader.u128(),
    bump: reader.u8()
  };
}
function decodeUserState(address, data) {
  const reader = new Reader(data);
  expectDiscriminator(reader, ACCOUNT.userState, "UserState");
  return {
    address,
    pool: reader.pubkey(),
    owner: reader.pubkey(),
    nextNonce: reader.u64(),
    activePositions: reader.u16(),
    totalStaked: reader.u64(),
    totalClaimed: reader.u128(),
    bump: reader.u8()
  };
}
async function fetchPool(connection) {
  const info = await connection.getAccountInfo(poolPda(), "confirmed");
  return info ? decodePool(poolPda().toBase58(), info.data) : null;
}
async function fetchUserState(connection, owner) {
  const address = userStatePda(owner);
  const info = await connection.getAccountInfo(address, "confirmed");
  return info ? decodeUserState(address.toBase58(), info.data) : null;
}
async function fetchPositions(connection, owner) {
  const userState = await fetchUserState(connection, owner);
  const count = Number(userState?.nextNonce ?? 0n);
  if (count === 0) return [];
  const addresses = Array.from({ length: count }, (_, nonce) => positionPda(owner, nonce));
  const infos = await connection.getMultipleAccountsInfo(addresses, "confirmed");
  const positions = [];
  infos.forEach((info, index) => {
    if (!info) return;
    try {
      positions.push(decodePosition(addresses[index].toBase58(), info.data));
    } catch {
    }
  });
  return positions;
}
async function fetchAllPositions(connection) {
  try {
    const accounts = await connection.getProgramAccounts(programId(), {
      commitment: "confirmed",
      filters: [
        { memcmp: { offset: 0, bytes: encodeBase58(discriminator(ACCOUNT.position)) } }
      ]
    });
    return {
      supported: true,
      positions: accounts.map(({ pubkey, account }) => decodePosition(pubkey.toBase58(), account.data))
    };
  } catch (error) {
    return { supported: false, positions: [], error: error.message };
  }
}
function parseEvents(logs) {
  const events = [];
  for (const line of logs ?? []) {
    const marker = "Program data: ";
    const index = line.indexOf(marker);
    if (index < 0) continue;
    let bytes;
    try {
      bytes = Buffer.from(line.slice(index + marker.length).trim(), "base64");
    } catch {
      continue;
    }
    if (bytes.length < 8) continue;
    const kind = discriminatorHex(bytes);
    const reader = new Reader(new Uint8Array(bytes), 8);
    try {
      switch (kind) {
        case EVENT.rewardFunded:
          events.push({
            kind: "rewardFunded",
            amount: reader.u64(),
            available: reader.u128(),
            totalFunded: reader.u128(),
            timestamp: reader.i64()
          });
          break;
        case EVENT.aprUpdated:
          events.push({
            kind: "aprUpdated",
            tier: reader.u8(),
            previousAprBps: reader.u64(),
            newAprBps: reader.u64(),
            timestamp: reader.i64()
          });
          break;
        case EVENT.pausedSet:
          events.push({ kind: "pausedSet", paused: reader.bool(), timestamp: reader.i64() });
          break;
        case EVENT.unstaked:
          events.push({
            kind: "unstaked",
            owner: reader.pubkey(),
            nonce: reader.u64(),
            principal: reader.u64(),
            rewards: reader.u128(),
            releasedCommitment: reader.u128(),
            timestamp: reader.i64()
          });
          break;
        case EVENT.rewardClaimed:
          events.push({
            kind: "rewardClaimed",
            owner: reader.pubkey(),
            nonce: reader.u64(),
            amount: reader.u128(),
            timestamp: reader.i64()
          });
          break;
        case EVENT.staked:
          events.push({
            kind: "staked",
            owner: reader.pubkey(),
            tier: reader.u8(),
            amount: reader.u64(),
            aprBps: reader.u64(),
            unlockTs: reader.i64(),
            committed: reader.u128(),
            timestamp: reader.i64()
          });
          break;
        default:
          break;
      }
    } catch {
    }
  }
  return events;
}

// src/lib/rewards.js
var BPS_DENOMINATOR = 10000n;
var YEAR_SECONDS = 31536000n;
function maxReward(amount, aprBps, capSecs) {
  return BigInt(amount) * BigInt(aprBps) * BigInt(capSecs) / (BPS_DENOMINATOR * YEAR_SECONDS);
}
function accrued(amount, aprBps, elapsedSecs, capSecs) {
  const effective = BigInt(elapsedSecs) < BigInt(capSecs) ? BigInt(elapsedSecs) : BigInt(capSecs);
  return maxReward(amount, aprBps, effective);
}
function claimable(amount, aprBps, elapsedSecs, capSecs, claimed) {
  const earned = accrued(amount, aprBps, elapsedSecs, capSecs);
  return earned > BigInt(claimed) ? earned - BigInt(claimed) : 0n;
}
function availableRewards(rewardVaultAmount, totalCommitted) {
  const vault = BigInt(rewardVaultAmount);
  const committed = BigInt(totalCommitted);
  return vault > committed ? vault - committed : 0n;
}
function rewardPoolUsageBps(totalCommitted, rewardVaultAmount) {
  const vault = BigInt(rewardVaultAmount);
  if (vault === 0n) return 0n;
  return BigInt(totalCommitted) * 10000n / vault;
}

export {
  authorityPda,
  userStatePda,
  positionPda,
  ixInitializePool,
  ixFundRewards,
  ixSetApr,
  ixSetPaused,
  ixStake,
  ixClaim,
  ixUnstake,
  fetchPool,
  fetchUserState,
  fetchPositions,
  fetchAllPositions,
  parseEvents,
  maxReward,
  claimable,
  availableRewards,
  rewardPoolUsageBps
};
//# sourceMappingURL=chunk-2LSJYRX7.js.map
