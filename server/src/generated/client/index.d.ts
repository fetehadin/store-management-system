
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Supplier
 * 
 */
export type Supplier = $Result.DefaultSelection<Prisma.$SupplierPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Retailer
 * 
 */
export type Retailer = $Result.DefaultSelection<Prisma.$RetailerPayload>
/**
 * Model SupportedBank
 * 
 */
export type SupportedBank = $Result.DefaultSelection<Prisma.$SupportedBankPayload>
/**
 * Model InventoryBatch
 * 
 */
export type InventoryBatch = $Result.DefaultSelection<Prisma.$InventoryBatchPayload>
/**
 * Model StockIssuance
 * 
 */
export type StockIssuance = $Result.DefaultSelection<Prisma.$StockIssuancePayload>
/**
 * Model IssuanceItem
 * 
 */
export type IssuanceItem = $Result.DefaultSelection<Prisma.$IssuanceItemPayload>
/**
 * Model Sale
 * 
 */
export type Sale = $Result.DefaultSelection<Prisma.$SalePayload>
/**
 * Model PaymentProof
 * 
 */
export type PaymentProof = $Result.DefaultSelection<Prisma.$PaymentProofPayload>
/**
 * Model LedgerEntry
 * 
 */
export type LedgerEntry = $Result.DefaultSelection<Prisma.$LedgerEntryPayload>
/**
 * Model StockReturn
 * 
 */
export type StockReturn = $Result.DefaultSelection<Prisma.$StockReturnPayload>
/**
 * Model ReturnItem
 * 
 */
export type ReturnItem = $Result.DefaultSelection<Prisma.$ReturnItemPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  SALES_REP: 'SALES_REP'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ProofStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ProofStatus = (typeof ProofStatus)[keyof typeof ProofStatus]


export const AuditEntity: {
  ADMIN_STORE: 'ADMIN_STORE',
  SALES_REP: 'SALES_REP',
  SUPPLIER: 'SUPPLIER',
  DIRECT_BUYER: 'DIRECT_BUYER'
};

export type AuditEntity = (typeof AuditEntity)[keyof typeof AuditEntity]


export const IssuanceStatus: {
  ISSUED: 'ISSUED',
  RETURNED: 'RETURNED',
  PARTIAL_RETURNED: 'PARTIAL_RETURNED'
};

export type IssuanceStatus = (typeof IssuanceStatus)[keyof typeof IssuanceStatus]


export const ReturnStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ReturnStatus = (typeof ReturnStatus)[keyof typeof ReturnStatus]


export const ReturnDestination: {
  WAREHOUSE: 'WAREHOUSE',
  SUPPLIER: 'SUPPLIER'
};

export type ReturnDestination = (typeof ReturnDestination)[keyof typeof ReturnDestination]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ProofStatus = $Enums.ProofStatus

export const ProofStatus: typeof $Enums.ProofStatus

export type AuditEntity = $Enums.AuditEntity

export const AuditEntity: typeof $Enums.AuditEntity

export type IssuanceStatus = $Enums.IssuanceStatus

export const IssuanceStatus: typeof $Enums.IssuanceStatus

export type ReturnStatus = $Enums.ReturnStatus

export const ReturnStatus: typeof $Enums.ReturnStatus

export type ReturnDestination = $Enums.ReturnDestination

export const ReturnDestination: typeof $Enums.ReturnDestination

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supplier`: Exposes CRUD operations for the **Supplier** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Suppliers
    * const suppliers = await prisma.supplier.findMany()
    * ```
    */
  get supplier(): Prisma.SupplierDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.retailer`: Exposes CRUD operations for the **Retailer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Retailers
    * const retailers = await prisma.retailer.findMany()
    * ```
    */
  get retailer(): Prisma.RetailerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supportedBank`: Exposes CRUD operations for the **SupportedBank** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupportedBanks
    * const supportedBanks = await prisma.supportedBank.findMany()
    * ```
    */
  get supportedBank(): Prisma.SupportedBankDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inventoryBatch`: Exposes CRUD operations for the **InventoryBatch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InventoryBatches
    * const inventoryBatches = await prisma.inventoryBatch.findMany()
    * ```
    */
  get inventoryBatch(): Prisma.InventoryBatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stockIssuance`: Exposes CRUD operations for the **StockIssuance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StockIssuances
    * const stockIssuances = await prisma.stockIssuance.findMany()
    * ```
    */
  get stockIssuance(): Prisma.StockIssuanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.issuanceItem`: Exposes CRUD operations for the **IssuanceItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IssuanceItems
    * const issuanceItems = await prisma.issuanceItem.findMany()
    * ```
    */
  get issuanceItem(): Prisma.IssuanceItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sale`: Exposes CRUD operations for the **Sale** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sales
    * const sales = await prisma.sale.findMany()
    * ```
    */
  get sale(): Prisma.SaleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentProof`: Exposes CRUD operations for the **PaymentProof** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentProofs
    * const paymentProofs = await prisma.paymentProof.findMany()
    * ```
    */
  get paymentProof(): Prisma.PaymentProofDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ledgerEntry`: Exposes CRUD operations for the **LedgerEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LedgerEntries
    * const ledgerEntries = await prisma.ledgerEntry.findMany()
    * ```
    */
  get ledgerEntry(): Prisma.LedgerEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stockReturn`: Exposes CRUD operations for the **StockReturn** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StockReturns
    * const stockReturns = await prisma.stockReturn.findMany()
    * ```
    */
  get stockReturn(): Prisma.StockReturnDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.returnItem`: Exposes CRUD operations for the **ReturnItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReturnItems
    * const returnItems = await prisma.returnItem.findMany()
    * ```
    */
  get returnItem(): Prisma.ReturnItemDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Supplier: 'Supplier',
    Product: 'Product',
    Retailer: 'Retailer',
    SupportedBank: 'SupportedBank',
    InventoryBatch: 'InventoryBatch',
    StockIssuance: 'StockIssuance',
    IssuanceItem: 'IssuanceItem',
    Sale: 'Sale',
    PaymentProof: 'PaymentProof',
    LedgerEntry: 'LedgerEntry',
    StockReturn: 'StockReturn',
    ReturnItem: 'ReturnItem'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "supplier" | "product" | "retailer" | "supportedBank" | "inventoryBatch" | "stockIssuance" | "issuanceItem" | "sale" | "paymentProof" | "ledgerEntry" | "stockReturn" | "returnItem"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Supplier: {
        payload: Prisma.$SupplierPayload<ExtArgs>
        fields: Prisma.SupplierFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplierFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplierFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findFirst: {
            args: Prisma.SupplierFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplierFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findMany: {
            args: Prisma.SupplierFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          create: {
            args: Prisma.SupplierCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          createMany: {
            args: Prisma.SupplierCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupplierCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          delete: {
            args: Prisma.SupplierDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          update: {
            args: Prisma.SupplierUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          deleteMany: {
            args: Prisma.SupplierDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupplierUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SupplierUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          upsert: {
            args: Prisma.SupplierUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          aggregate: {
            args: Prisma.SupplierAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupplier>
          }
          groupBy: {
            args: Prisma.SupplierGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupplierGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplierCountArgs<ExtArgs>
            result: $Utils.Optional<SupplierCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Retailer: {
        payload: Prisma.$RetailerPayload<ExtArgs>
        fields: Prisma.RetailerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RetailerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetailerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RetailerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetailerPayload>
          }
          findFirst: {
            args: Prisma.RetailerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetailerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RetailerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetailerPayload>
          }
          findMany: {
            args: Prisma.RetailerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetailerPayload>[]
          }
          create: {
            args: Prisma.RetailerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetailerPayload>
          }
          createMany: {
            args: Prisma.RetailerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RetailerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetailerPayload>[]
          }
          delete: {
            args: Prisma.RetailerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetailerPayload>
          }
          update: {
            args: Prisma.RetailerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetailerPayload>
          }
          deleteMany: {
            args: Prisma.RetailerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RetailerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RetailerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetailerPayload>[]
          }
          upsert: {
            args: Prisma.RetailerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetailerPayload>
          }
          aggregate: {
            args: Prisma.RetailerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRetailer>
          }
          groupBy: {
            args: Prisma.RetailerGroupByArgs<ExtArgs>
            result: $Utils.Optional<RetailerGroupByOutputType>[]
          }
          count: {
            args: Prisma.RetailerCountArgs<ExtArgs>
            result: $Utils.Optional<RetailerCountAggregateOutputType> | number
          }
        }
      }
      SupportedBank: {
        payload: Prisma.$SupportedBankPayload<ExtArgs>
        fields: Prisma.SupportedBankFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupportedBankFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportedBankPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupportedBankFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportedBankPayload>
          }
          findFirst: {
            args: Prisma.SupportedBankFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportedBankPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupportedBankFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportedBankPayload>
          }
          findMany: {
            args: Prisma.SupportedBankFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportedBankPayload>[]
          }
          create: {
            args: Prisma.SupportedBankCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportedBankPayload>
          }
          createMany: {
            args: Prisma.SupportedBankCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupportedBankCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportedBankPayload>[]
          }
          delete: {
            args: Prisma.SupportedBankDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportedBankPayload>
          }
          update: {
            args: Prisma.SupportedBankUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportedBankPayload>
          }
          deleteMany: {
            args: Prisma.SupportedBankDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupportedBankUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SupportedBankUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportedBankPayload>[]
          }
          upsert: {
            args: Prisma.SupportedBankUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportedBankPayload>
          }
          aggregate: {
            args: Prisma.SupportedBankAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupportedBank>
          }
          groupBy: {
            args: Prisma.SupportedBankGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupportedBankGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupportedBankCountArgs<ExtArgs>
            result: $Utils.Optional<SupportedBankCountAggregateOutputType> | number
          }
        }
      }
      InventoryBatch: {
        payload: Prisma.$InventoryBatchPayload<ExtArgs>
        fields: Prisma.InventoryBatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InventoryBatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryBatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InventoryBatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryBatchPayload>
          }
          findFirst: {
            args: Prisma.InventoryBatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryBatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InventoryBatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryBatchPayload>
          }
          findMany: {
            args: Prisma.InventoryBatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryBatchPayload>[]
          }
          create: {
            args: Prisma.InventoryBatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryBatchPayload>
          }
          createMany: {
            args: Prisma.InventoryBatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InventoryBatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryBatchPayload>[]
          }
          delete: {
            args: Prisma.InventoryBatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryBatchPayload>
          }
          update: {
            args: Prisma.InventoryBatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryBatchPayload>
          }
          deleteMany: {
            args: Prisma.InventoryBatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InventoryBatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InventoryBatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryBatchPayload>[]
          }
          upsert: {
            args: Prisma.InventoryBatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryBatchPayload>
          }
          aggregate: {
            args: Prisma.InventoryBatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInventoryBatch>
          }
          groupBy: {
            args: Prisma.InventoryBatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<InventoryBatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.InventoryBatchCountArgs<ExtArgs>
            result: $Utils.Optional<InventoryBatchCountAggregateOutputType> | number
          }
        }
      }
      StockIssuance: {
        payload: Prisma.$StockIssuancePayload<ExtArgs>
        fields: Prisma.StockIssuanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockIssuanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockIssuancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockIssuanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockIssuancePayload>
          }
          findFirst: {
            args: Prisma.StockIssuanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockIssuancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockIssuanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockIssuancePayload>
          }
          findMany: {
            args: Prisma.StockIssuanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockIssuancePayload>[]
          }
          create: {
            args: Prisma.StockIssuanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockIssuancePayload>
          }
          createMany: {
            args: Prisma.StockIssuanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockIssuanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockIssuancePayload>[]
          }
          delete: {
            args: Prisma.StockIssuanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockIssuancePayload>
          }
          update: {
            args: Prisma.StockIssuanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockIssuancePayload>
          }
          deleteMany: {
            args: Prisma.StockIssuanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockIssuanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockIssuanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockIssuancePayload>[]
          }
          upsert: {
            args: Prisma.StockIssuanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockIssuancePayload>
          }
          aggregate: {
            args: Prisma.StockIssuanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStockIssuance>
          }
          groupBy: {
            args: Prisma.StockIssuanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockIssuanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockIssuanceCountArgs<ExtArgs>
            result: $Utils.Optional<StockIssuanceCountAggregateOutputType> | number
          }
        }
      }
      IssuanceItem: {
        payload: Prisma.$IssuanceItemPayload<ExtArgs>
        fields: Prisma.IssuanceItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IssuanceItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuanceItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IssuanceItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuanceItemPayload>
          }
          findFirst: {
            args: Prisma.IssuanceItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuanceItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IssuanceItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuanceItemPayload>
          }
          findMany: {
            args: Prisma.IssuanceItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuanceItemPayload>[]
          }
          create: {
            args: Prisma.IssuanceItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuanceItemPayload>
          }
          createMany: {
            args: Prisma.IssuanceItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IssuanceItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuanceItemPayload>[]
          }
          delete: {
            args: Prisma.IssuanceItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuanceItemPayload>
          }
          update: {
            args: Prisma.IssuanceItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuanceItemPayload>
          }
          deleteMany: {
            args: Prisma.IssuanceItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IssuanceItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IssuanceItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuanceItemPayload>[]
          }
          upsert: {
            args: Prisma.IssuanceItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuanceItemPayload>
          }
          aggregate: {
            args: Prisma.IssuanceItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIssuanceItem>
          }
          groupBy: {
            args: Prisma.IssuanceItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<IssuanceItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.IssuanceItemCountArgs<ExtArgs>
            result: $Utils.Optional<IssuanceItemCountAggregateOutputType> | number
          }
        }
      }
      Sale: {
        payload: Prisma.$SalePayload<ExtArgs>
        fields: Prisma.SaleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findFirst: {
            args: Prisma.SaleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findMany: {
            args: Prisma.SaleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          create: {
            args: Prisma.SaleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          createMany: {
            args: Prisma.SaleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SaleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          delete: {
            args: Prisma.SaleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          update: {
            args: Prisma.SaleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          deleteMany: {
            args: Prisma.SaleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SaleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          upsert: {
            args: Prisma.SaleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          aggregate: {
            args: Prisma.SaleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSale>
          }
          groupBy: {
            args: Prisma.SaleGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleGroupByOutputType>[]
          }
          count: {
            args: Prisma.SaleCountArgs<ExtArgs>
            result: $Utils.Optional<SaleCountAggregateOutputType> | number
          }
        }
      }
      PaymentProof: {
        payload: Prisma.$PaymentProofPayload<ExtArgs>
        fields: Prisma.PaymentProofFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentProofFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProofPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentProofFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProofPayload>
          }
          findFirst: {
            args: Prisma.PaymentProofFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProofPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentProofFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProofPayload>
          }
          findMany: {
            args: Prisma.PaymentProofFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProofPayload>[]
          }
          create: {
            args: Prisma.PaymentProofCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProofPayload>
          }
          createMany: {
            args: Prisma.PaymentProofCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentProofCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProofPayload>[]
          }
          delete: {
            args: Prisma.PaymentProofDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProofPayload>
          }
          update: {
            args: Prisma.PaymentProofUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProofPayload>
          }
          deleteMany: {
            args: Prisma.PaymentProofDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentProofUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentProofUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProofPayload>[]
          }
          upsert: {
            args: Prisma.PaymentProofUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProofPayload>
          }
          aggregate: {
            args: Prisma.PaymentProofAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentProof>
          }
          groupBy: {
            args: Prisma.PaymentProofGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentProofGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentProofCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentProofCountAggregateOutputType> | number
          }
        }
      }
      LedgerEntry: {
        payload: Prisma.$LedgerEntryPayload<ExtArgs>
        fields: Prisma.LedgerEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LedgerEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LedgerEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          findFirst: {
            args: Prisma.LedgerEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LedgerEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          findMany: {
            args: Prisma.LedgerEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>[]
          }
          create: {
            args: Prisma.LedgerEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          createMany: {
            args: Prisma.LedgerEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LedgerEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>[]
          }
          delete: {
            args: Prisma.LedgerEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          update: {
            args: Prisma.LedgerEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          deleteMany: {
            args: Prisma.LedgerEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LedgerEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LedgerEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>[]
          }
          upsert: {
            args: Prisma.LedgerEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          aggregate: {
            args: Prisma.LedgerEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLedgerEntry>
          }
          groupBy: {
            args: Prisma.LedgerEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<LedgerEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.LedgerEntryCountArgs<ExtArgs>
            result: $Utils.Optional<LedgerEntryCountAggregateOutputType> | number
          }
        }
      }
      StockReturn: {
        payload: Prisma.$StockReturnPayload<ExtArgs>
        fields: Prisma.StockReturnFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockReturnFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReturnPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockReturnFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReturnPayload>
          }
          findFirst: {
            args: Prisma.StockReturnFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReturnPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockReturnFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReturnPayload>
          }
          findMany: {
            args: Prisma.StockReturnFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReturnPayload>[]
          }
          create: {
            args: Prisma.StockReturnCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReturnPayload>
          }
          createMany: {
            args: Prisma.StockReturnCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockReturnCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReturnPayload>[]
          }
          delete: {
            args: Prisma.StockReturnDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReturnPayload>
          }
          update: {
            args: Prisma.StockReturnUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReturnPayload>
          }
          deleteMany: {
            args: Prisma.StockReturnDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockReturnUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockReturnUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReturnPayload>[]
          }
          upsert: {
            args: Prisma.StockReturnUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReturnPayload>
          }
          aggregate: {
            args: Prisma.StockReturnAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStockReturn>
          }
          groupBy: {
            args: Prisma.StockReturnGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockReturnGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockReturnCountArgs<ExtArgs>
            result: $Utils.Optional<StockReturnCountAggregateOutputType> | number
          }
        }
      }
      ReturnItem: {
        payload: Prisma.$ReturnItemPayload<ExtArgs>
        fields: Prisma.ReturnItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReturnItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReturnItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>
          }
          findFirst: {
            args: Prisma.ReturnItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReturnItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>
          }
          findMany: {
            args: Prisma.ReturnItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>[]
          }
          create: {
            args: Prisma.ReturnItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>
          }
          createMany: {
            args: Prisma.ReturnItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReturnItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>[]
          }
          delete: {
            args: Prisma.ReturnItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>
          }
          update: {
            args: Prisma.ReturnItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>
          }
          deleteMany: {
            args: Prisma.ReturnItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReturnItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReturnItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>[]
          }
          upsert: {
            args: Prisma.ReturnItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>
          }
          aggregate: {
            args: Prisma.ReturnItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReturnItem>
          }
          groupBy: {
            args: Prisma.ReturnItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReturnItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReturnItemCountArgs<ExtArgs>
            result: $Utils.Optional<ReturnItemCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    supplier?: SupplierOmit
    product?: ProductOmit
    retailer?: RetailerOmit
    supportedBank?: SupportedBankOmit
    inventoryBatch?: InventoryBatchOmit
    stockIssuance?: StockIssuanceOmit
    issuanceItem?: IssuanceItemOmit
    sale?: SaleOmit
    paymentProof?: PaymentProofOmit
    ledgerEntry?: LedgerEntryOmit
    stockReturn?: StockReturnOmit
    returnItem?: ReturnItemOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    stockIssusances: number
    paymentProofs: number
    sales: number
    returns: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stockIssusances?: boolean | UserCountOutputTypeCountStockIssusancesArgs
    paymentProofs?: boolean | UserCountOutputTypeCountPaymentProofsArgs
    sales?: boolean | UserCountOutputTypeCountSalesArgs
    returns?: boolean | UserCountOutputTypeCountReturnsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStockIssusancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockIssuanceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentProofsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentProofWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReturnsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockReturnWhereInput
  }


  /**
   * Count Type SupplierCountOutputType
   */

  export type SupplierCountOutputType = {
    batches: number
  }

  export type SupplierCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batches?: boolean | SupplierCountOutputTypeCountBatchesArgs
  }

  // Custom InputTypes
  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierCountOutputType
     */
    select?: SupplierCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeCountBatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventoryBatchWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    batches: number
    sales: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batches?: boolean | ProductCountOutputTypeCountBatchesArgs
    sales?: boolean | ProductCountOutputTypeCountSalesArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountBatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventoryBatchWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }


  /**
   * Count Type RetailerCountOutputType
   */

  export type RetailerCountOutputType = {
    sales: number
  }

  export type RetailerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | RetailerCountOutputTypeCountSalesArgs
  }

  // Custom InputTypes
  /**
   * RetailerCountOutputType without action
   */
  export type RetailerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetailerCountOutputType
     */
    select?: RetailerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RetailerCountOutputType without action
   */
  export type RetailerCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }


  /**
   * Count Type StockIssuanceCountOutputType
   */

  export type StockIssuanceCountOutputType = {
    items: number
  }

  export type StockIssuanceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | StockIssuanceCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * StockIssuanceCountOutputType without action
   */
  export type StockIssuanceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockIssuanceCountOutputType
     */
    select?: StockIssuanceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StockIssuanceCountOutputType without action
   */
  export type StockIssuanceCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IssuanceItemWhereInput
  }


  /**
   * Count Type StockReturnCountOutputType
   */

  export type StockReturnCountOutputType = {
    items: number
  }

  export type StockReturnCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | StockReturnCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * StockReturnCountOutputType without action
   */
  export type StockReturnCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReturnCountOutputType
     */
    select?: StockReturnCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StockReturnCountOutputType without action
   */
  export type StockReturnCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReturnItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    creditLimit: Decimal | null
    creditBalance: Decimal | null
  }

  export type UserSumAggregateOutputType = {
    creditLimit: Decimal | null
    creditBalance: Decimal | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    fullName: string | null
    username: string | null
    passwordHash: string | null
    profilePic: string | null
    role: $Enums.Role | null
    requiresPasswordChange: boolean | null
    isActive: boolean | null
    creditLimit: Decimal | null
    creditBalance: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    username: string | null
    passwordHash: string | null
    profilePic: string | null
    role: $Enums.Role | null
    requiresPasswordChange: boolean | null
    isActive: boolean | null
    creditLimit: Decimal | null
    creditBalance: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    fullName: number
    username: number
    passwordHash: number
    profilePic: number
    role: number
    requiresPasswordChange: number
    isActive: number
    creditLimit: number
    creditBalance: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    creditLimit?: true
    creditBalance?: true
  }

  export type UserSumAggregateInputType = {
    creditLimit?: true
    creditBalance?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    fullName?: true
    username?: true
    passwordHash?: true
    profilePic?: true
    role?: true
    requiresPasswordChange?: true
    isActive?: true
    creditLimit?: true
    creditBalance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    fullName?: true
    username?: true
    passwordHash?: true
    profilePic?: true
    role?: true
    requiresPasswordChange?: true
    isActive?: true
    creditLimit?: true
    creditBalance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    fullName?: true
    username?: true
    passwordHash?: true
    profilePic?: true
    role?: true
    requiresPasswordChange?: true
    isActive?: true
    creditLimit?: true
    creditBalance?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    fullName: string
    username: string
    passwordHash: string
    profilePic: string | null
    role: $Enums.Role
    requiresPasswordChange: boolean
    isActive: boolean
    creditLimit: Decimal
    creditBalance: Decimal
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    username?: boolean
    passwordHash?: boolean
    profilePic?: boolean
    role?: boolean
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: boolean
    creditBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stockIssusances?: boolean | User$stockIssusancesArgs<ExtArgs>
    paymentProofs?: boolean | User$paymentProofsArgs<ExtArgs>
    sales?: boolean | User$salesArgs<ExtArgs>
    returns?: boolean | User$returnsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    username?: boolean
    passwordHash?: boolean
    profilePic?: boolean
    role?: boolean
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: boolean
    creditBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    username?: boolean
    passwordHash?: boolean
    profilePic?: boolean
    role?: boolean
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: boolean
    creditBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    fullName?: boolean
    username?: boolean
    passwordHash?: boolean
    profilePic?: boolean
    role?: boolean
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: boolean
    creditBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "username" | "passwordHash" | "profilePic" | "role" | "requiresPasswordChange" | "isActive" | "creditLimit" | "creditBalance" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stockIssusances?: boolean | User$stockIssusancesArgs<ExtArgs>
    paymentProofs?: boolean | User$paymentProofsArgs<ExtArgs>
    sales?: boolean | User$salesArgs<ExtArgs>
    returns?: boolean | User$returnsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      stockIssusances: Prisma.$StockIssuancePayload<ExtArgs>[]
      paymentProofs: Prisma.$PaymentProofPayload<ExtArgs>[]
      sales: Prisma.$SalePayload<ExtArgs>[]
      returns: Prisma.$StockReturnPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      username: string
      passwordHash: string
      profilePic: string | null
      role: $Enums.Role
      requiresPasswordChange: boolean
      isActive: boolean
      creditLimit: Prisma.Decimal
      creditBalance: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stockIssusances<T extends User$stockIssusancesArgs<ExtArgs> = {}>(args?: Subset<T, User$stockIssusancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockIssuancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    paymentProofs<T extends User$paymentProofsArgs<ExtArgs> = {}>(args?: Subset<T, User$paymentProofsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentProofPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sales<T extends User$salesArgs<ExtArgs> = {}>(args?: Subset<T, User$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    returns<T extends User$returnsArgs<ExtArgs> = {}>(args?: Subset<T, User$returnsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReturnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly profilePic: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly requiresPasswordChange: FieldRef<"User", 'Boolean'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly creditLimit: FieldRef<"User", 'Decimal'>
    readonly creditBalance: FieldRef<"User", 'Decimal'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.stockIssusances
   */
  export type User$stockIssusancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockIssuance
     */
    select?: StockIssuanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockIssuance
     */
    omit?: StockIssuanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIssuanceInclude<ExtArgs> | null
    where?: StockIssuanceWhereInput
    orderBy?: StockIssuanceOrderByWithRelationInput | StockIssuanceOrderByWithRelationInput[]
    cursor?: StockIssuanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockIssuanceScalarFieldEnum | StockIssuanceScalarFieldEnum[]
  }

  /**
   * User.paymentProofs
   */
  export type User$paymentProofsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProof
     */
    select?: PaymentProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProof
     */
    omit?: PaymentProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProofInclude<ExtArgs> | null
    where?: PaymentProofWhereInput
    orderBy?: PaymentProofOrderByWithRelationInput | PaymentProofOrderByWithRelationInput[]
    cursor?: PaymentProofWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentProofScalarFieldEnum | PaymentProofScalarFieldEnum[]
  }

  /**
   * User.sales
   */
  export type User$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * User.returns
   */
  export type User$returnsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReturn
     */
    select?: StockReturnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReturn
     */
    omit?: StockReturnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReturnInclude<ExtArgs> | null
    where?: StockReturnWhereInput
    orderBy?: StockReturnOrderByWithRelationInput | StockReturnOrderByWithRelationInput[]
    cursor?: StockReturnWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockReturnScalarFieldEnum | StockReturnScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Supplier
   */

  export type AggregateSupplier = {
    _count: SupplierCountAggregateOutputType | null
    _avg: SupplierAvgAggregateOutputType | null
    _sum: SupplierSumAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  export type SupplierAvgAggregateOutputType = {
    creditBalance: Decimal | null
  }

  export type SupplierSumAggregateOutputType = {
    creditBalance: Decimal | null
  }

  export type SupplierMinAggregateOutputType = {
    id: string | null
    name: string | null
    creditBalance: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierMaxAggregateOutputType = {
    id: string | null
    name: string | null
    creditBalance: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierCountAggregateOutputType = {
    id: number
    name: number
    creditBalance: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SupplierAvgAggregateInputType = {
    creditBalance?: true
  }

  export type SupplierSumAggregateInputType = {
    creditBalance?: true
  }

  export type SupplierMinAggregateInputType = {
    id?: true
    name?: true
    creditBalance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierMaxAggregateInputType = {
    id?: true
    name?: true
    creditBalance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierCountAggregateInputType = {
    id?: true
    name?: true
    creditBalance?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SupplierAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Supplier to aggregate.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Suppliers
    **/
    _count?: true | SupplierCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SupplierAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SupplierSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplierMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplierMaxAggregateInputType
  }

  export type GetSupplierAggregateType<T extends SupplierAggregateArgs> = {
        [P in keyof T & keyof AggregateSupplier]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupplier[P]>
      : GetScalarType<T[P], AggregateSupplier[P]>
  }




  export type SupplierGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplierWhereInput
    orderBy?: SupplierOrderByWithAggregationInput | SupplierOrderByWithAggregationInput[]
    by: SupplierScalarFieldEnum[] | SupplierScalarFieldEnum
    having?: SupplierScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplierCountAggregateInputType | true
    _avg?: SupplierAvgAggregateInputType
    _sum?: SupplierSumAggregateInputType
    _min?: SupplierMinAggregateInputType
    _max?: SupplierMaxAggregateInputType
  }

  export type SupplierGroupByOutputType = {
    id: string
    name: string
    creditBalance: Decimal
    createdAt: Date
    updatedAt: Date
    _count: SupplierCountAggregateOutputType | null
    _avg: SupplierAvgAggregateOutputType | null
    _sum: SupplierSumAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  type GetSupplierGroupByPayload<T extends SupplierGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplierGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplierGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplierGroupByOutputType[P]>
            : GetScalarType<T[P], SupplierGroupByOutputType[P]>
        }
      >
    >


  export type SupplierSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    creditBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    batches?: boolean | Supplier$batchesArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supplier"]>

  export type SupplierSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    creditBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["supplier"]>

  export type SupplierSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    creditBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["supplier"]>

  export type SupplierSelectScalar = {
    id?: boolean
    name?: boolean
    creditBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SupplierOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "creditBalance" | "createdAt" | "updatedAt", ExtArgs["result"]["supplier"]>
  export type SupplierInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batches?: boolean | Supplier$batchesArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SupplierIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SupplierIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SupplierPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Supplier"
    objects: {
      batches: Prisma.$InventoryBatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      creditBalance: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["supplier"]>
    composites: {}
  }

  type SupplierGetPayload<S extends boolean | null | undefined | SupplierDefaultArgs> = $Result.GetResult<Prisma.$SupplierPayload, S>

  type SupplierCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupplierFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupplierCountAggregateInputType | true
    }

  export interface SupplierDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Supplier'], meta: { name: 'Supplier' } }
    /**
     * Find zero or one Supplier that matches the filter.
     * @param {SupplierFindUniqueArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupplierFindUniqueArgs>(args: SelectSubset<T, SupplierFindUniqueArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Supplier that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupplierFindUniqueOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupplierFindUniqueOrThrowArgs>(args: SelectSubset<T, SupplierFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Supplier that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupplierFindFirstArgs>(args?: SelectSubset<T, SupplierFindFirstArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Supplier that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupplierFindFirstOrThrowArgs>(args?: SelectSubset<T, SupplierFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Suppliers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suppliers
     * const suppliers = await prisma.supplier.findMany()
     * 
     * // Get first 10 Suppliers
     * const suppliers = await prisma.supplier.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplierWithIdOnly = await prisma.supplier.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupplierFindManyArgs>(args?: SelectSubset<T, SupplierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Supplier.
     * @param {SupplierCreateArgs} args - Arguments to create a Supplier.
     * @example
     * // Create one Supplier
     * const Supplier = await prisma.supplier.create({
     *   data: {
     *     // ... data to create a Supplier
     *   }
     * })
     * 
     */
    create<T extends SupplierCreateArgs>(args: SelectSubset<T, SupplierCreateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Suppliers.
     * @param {SupplierCreateManyArgs} args - Arguments to create many Suppliers.
     * @example
     * // Create many Suppliers
     * const supplier = await prisma.supplier.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupplierCreateManyArgs>(args?: SelectSubset<T, SupplierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Suppliers and returns the data saved in the database.
     * @param {SupplierCreateManyAndReturnArgs} args - Arguments to create many Suppliers.
     * @example
     * // Create many Suppliers
     * const supplier = await prisma.supplier.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Suppliers and only return the `id`
     * const supplierWithIdOnly = await prisma.supplier.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupplierCreateManyAndReturnArgs>(args?: SelectSubset<T, SupplierCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Supplier.
     * @param {SupplierDeleteArgs} args - Arguments to delete one Supplier.
     * @example
     * // Delete one Supplier
     * const Supplier = await prisma.supplier.delete({
     *   where: {
     *     // ... filter to delete one Supplier
     *   }
     * })
     * 
     */
    delete<T extends SupplierDeleteArgs>(args: SelectSubset<T, SupplierDeleteArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Supplier.
     * @param {SupplierUpdateArgs} args - Arguments to update one Supplier.
     * @example
     * // Update one Supplier
     * const supplier = await prisma.supplier.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupplierUpdateArgs>(args: SelectSubset<T, SupplierUpdateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Suppliers.
     * @param {SupplierDeleteManyArgs} args - Arguments to filter Suppliers to delete.
     * @example
     * // Delete a few Suppliers
     * const { count } = await prisma.supplier.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupplierDeleteManyArgs>(args?: SelectSubset<T, SupplierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suppliers
     * const supplier = await prisma.supplier.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupplierUpdateManyArgs>(args: SelectSubset<T, SupplierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suppliers and returns the data updated in the database.
     * @param {SupplierUpdateManyAndReturnArgs} args - Arguments to update many Suppliers.
     * @example
     * // Update many Suppliers
     * const supplier = await prisma.supplier.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Suppliers and only return the `id`
     * const supplierWithIdOnly = await prisma.supplier.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SupplierUpdateManyAndReturnArgs>(args: SelectSubset<T, SupplierUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Supplier.
     * @param {SupplierUpsertArgs} args - Arguments to update or create a Supplier.
     * @example
     * // Update or create a Supplier
     * const supplier = await prisma.supplier.upsert({
     *   create: {
     *     // ... data to create a Supplier
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Supplier we want to update
     *   }
     * })
     */
    upsert<T extends SupplierUpsertArgs>(args: SelectSubset<T, SupplierUpsertArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierCountArgs} args - Arguments to filter Suppliers to count.
     * @example
     * // Count the number of Suppliers
     * const count = await prisma.supplier.count({
     *   where: {
     *     // ... the filter for the Suppliers we want to count
     *   }
     * })
    **/
    count<T extends SupplierCountArgs>(
      args?: Subset<T, SupplierCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplierCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupplierAggregateArgs>(args: Subset<T, SupplierAggregateArgs>): Prisma.PrismaPromise<GetSupplierAggregateType<T>>

    /**
     * Group by Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupplierGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplierGroupByArgs['orderBy'] }
        : { orderBy?: SupplierGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupplierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Supplier model
   */
  readonly fields: SupplierFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Supplier.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplierClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    batches<T extends Supplier$batchesArgs<ExtArgs> = {}>(args?: Subset<T, Supplier$batchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryBatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Supplier model
   */
  interface SupplierFieldRefs {
    readonly id: FieldRef<"Supplier", 'String'>
    readonly name: FieldRef<"Supplier", 'String'>
    readonly creditBalance: FieldRef<"Supplier", 'Decimal'>
    readonly createdAt: FieldRef<"Supplier", 'DateTime'>
    readonly updatedAt: FieldRef<"Supplier", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Supplier findUnique
   */
  export type SupplierFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findUniqueOrThrow
   */
  export type SupplierFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findFirst
   */
  export type SupplierFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findFirstOrThrow
   */
  export type SupplierFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findMany
   */
  export type SupplierFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Suppliers to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier create
   */
  export type SupplierCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to create a Supplier.
     */
    data: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
  }

  /**
   * Supplier createMany
   */
  export type SupplierCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Suppliers.
     */
    data: SupplierCreateManyInput | SupplierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Supplier createManyAndReturn
   */
  export type SupplierCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * The data used to create many Suppliers.
     */
    data: SupplierCreateManyInput | SupplierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Supplier update
   */
  export type SupplierUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to update a Supplier.
     */
    data: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
    /**
     * Choose, which Supplier to update.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier updateMany
   */
  export type SupplierUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Suppliers.
     */
    data: XOR<SupplierUpdateManyMutationInput, SupplierUncheckedUpdateManyInput>
    /**
     * Filter which Suppliers to update
     */
    where?: SupplierWhereInput
    /**
     * Limit how many Suppliers to update.
     */
    limit?: number
  }

  /**
   * Supplier updateManyAndReturn
   */
  export type SupplierUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * The data used to update Suppliers.
     */
    data: XOR<SupplierUpdateManyMutationInput, SupplierUncheckedUpdateManyInput>
    /**
     * Filter which Suppliers to update
     */
    where?: SupplierWhereInput
    /**
     * Limit how many Suppliers to update.
     */
    limit?: number
  }

  /**
   * Supplier upsert
   */
  export type SupplierUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The filter to search for the Supplier to update in case it exists.
     */
    where: SupplierWhereUniqueInput
    /**
     * In case the Supplier found by the `where` argument doesn't exist, create a new Supplier with this data.
     */
    create: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
    /**
     * In case the Supplier was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
  }

  /**
   * Supplier delete
   */
  export type SupplierDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter which Supplier to delete.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier deleteMany
   */
  export type SupplierDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suppliers to delete
     */
    where?: SupplierWhereInput
    /**
     * Limit how many Suppliers to delete.
     */
    limit?: number
  }

  /**
   * Supplier.batches
   */
  export type Supplier$batchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryBatch
     */
    select?: InventoryBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryBatch
     */
    omit?: InventoryBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryBatchInclude<ExtArgs> | null
    where?: InventoryBatchWhereInput
    orderBy?: InventoryBatchOrderByWithRelationInput | InventoryBatchOrderByWithRelationInput[]
    cursor?: InventoryBatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InventoryBatchScalarFieldEnum | InventoryBatchScalarFieldEnum[]
  }

  /**
   * Supplier without action
   */
  export type SupplierDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: Decimal | null
  }

  export type ProductSumAggregateOutputType = {
    price: Decimal | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    imageUrl: string | null
    price: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    imageUrl: string | null
    price: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    description: number
    category: number
    imageUrl: number
    price: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    imageUrl?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    imageUrl?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    imageUrl?: true
    price?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    description: string | null
    category: string | null
    imageUrl: string | null
    price: Decimal
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    imageUrl?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    batches?: boolean | Product$batchesArgs<ExtArgs>
    sales?: boolean | Product$salesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    imageUrl?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    imageUrl?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    imageUrl?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "category" | "imageUrl" | "price" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batches?: boolean | Product$batchesArgs<ExtArgs>
    sales?: boolean | Product$salesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      batches: Prisma.$InventoryBatchPayload<ExtArgs>[]
      sales: Prisma.$SalePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      category: string | null
      imageUrl: string | null
      price: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    batches<T extends Product$batchesArgs<ExtArgs> = {}>(args?: Subset<T, Product$batchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryBatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sales<T extends Product$salesArgs<ExtArgs> = {}>(args?: Subset<T, Product$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly category: FieldRef<"Product", 'String'>
    readonly imageUrl: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Decimal'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.batches
   */
  export type Product$batchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryBatch
     */
    select?: InventoryBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryBatch
     */
    omit?: InventoryBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryBatchInclude<ExtArgs> | null
    where?: InventoryBatchWhereInput
    orderBy?: InventoryBatchOrderByWithRelationInput | InventoryBatchOrderByWithRelationInput[]
    cursor?: InventoryBatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InventoryBatchScalarFieldEnum | InventoryBatchScalarFieldEnum[]
  }

  /**
   * Product.sales
   */
  export type Product$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Retailer
   */

  export type AggregateRetailer = {
    _count: RetailerCountAggregateOutputType | null
    _min: RetailerMinAggregateOutputType | null
    _max: RetailerMaxAggregateOutputType | null
  }

  export type RetailerMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RetailerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RetailerCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    address: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RetailerMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RetailerMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RetailerCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    address?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RetailerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Retailer to aggregate.
     */
    where?: RetailerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Retailers to fetch.
     */
    orderBy?: RetailerOrderByWithRelationInput | RetailerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RetailerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Retailers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Retailers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Retailers
    **/
    _count?: true | RetailerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RetailerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RetailerMaxAggregateInputType
  }

  export type GetRetailerAggregateType<T extends RetailerAggregateArgs> = {
        [P in keyof T & keyof AggregateRetailer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRetailer[P]>
      : GetScalarType<T[P], AggregateRetailer[P]>
  }




  export type RetailerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RetailerWhereInput
    orderBy?: RetailerOrderByWithAggregationInput | RetailerOrderByWithAggregationInput[]
    by: RetailerScalarFieldEnum[] | RetailerScalarFieldEnum
    having?: RetailerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RetailerCountAggregateInputType | true
    _min?: RetailerMinAggregateInputType
    _max?: RetailerMaxAggregateInputType
  }

  export type RetailerGroupByOutputType = {
    id: string
    name: string
    phone: string | null
    address: string | null
    createdAt: Date
    updatedAt: Date
    _count: RetailerCountAggregateOutputType | null
    _min: RetailerMinAggregateOutputType | null
    _max: RetailerMaxAggregateOutputType | null
  }

  type GetRetailerGroupByPayload<T extends RetailerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RetailerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RetailerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RetailerGroupByOutputType[P]>
            : GetScalarType<T[P], RetailerGroupByOutputType[P]>
        }
      >
    >


  export type RetailerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sales?: boolean | Retailer$salesArgs<ExtArgs>
    _count?: boolean | RetailerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["retailer"]>

  export type RetailerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["retailer"]>

  export type RetailerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["retailer"]>

  export type RetailerSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RetailerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "phone" | "address" | "createdAt" | "updatedAt", ExtArgs["result"]["retailer"]>
  export type RetailerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | Retailer$salesArgs<ExtArgs>
    _count?: boolean | RetailerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RetailerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RetailerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RetailerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Retailer"
    objects: {
      sales: Prisma.$SalePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phone: string | null
      address: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["retailer"]>
    composites: {}
  }

  type RetailerGetPayload<S extends boolean | null | undefined | RetailerDefaultArgs> = $Result.GetResult<Prisma.$RetailerPayload, S>

  type RetailerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RetailerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RetailerCountAggregateInputType | true
    }

  export interface RetailerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Retailer'], meta: { name: 'Retailer' } }
    /**
     * Find zero or one Retailer that matches the filter.
     * @param {RetailerFindUniqueArgs} args - Arguments to find a Retailer
     * @example
     * // Get one Retailer
     * const retailer = await prisma.retailer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RetailerFindUniqueArgs>(args: SelectSubset<T, RetailerFindUniqueArgs<ExtArgs>>): Prisma__RetailerClient<$Result.GetResult<Prisma.$RetailerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Retailer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RetailerFindUniqueOrThrowArgs} args - Arguments to find a Retailer
     * @example
     * // Get one Retailer
     * const retailer = await prisma.retailer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RetailerFindUniqueOrThrowArgs>(args: SelectSubset<T, RetailerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RetailerClient<$Result.GetResult<Prisma.$RetailerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Retailer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetailerFindFirstArgs} args - Arguments to find a Retailer
     * @example
     * // Get one Retailer
     * const retailer = await prisma.retailer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RetailerFindFirstArgs>(args?: SelectSubset<T, RetailerFindFirstArgs<ExtArgs>>): Prisma__RetailerClient<$Result.GetResult<Prisma.$RetailerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Retailer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetailerFindFirstOrThrowArgs} args - Arguments to find a Retailer
     * @example
     * // Get one Retailer
     * const retailer = await prisma.retailer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RetailerFindFirstOrThrowArgs>(args?: SelectSubset<T, RetailerFindFirstOrThrowArgs<ExtArgs>>): Prisma__RetailerClient<$Result.GetResult<Prisma.$RetailerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Retailers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetailerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Retailers
     * const retailers = await prisma.retailer.findMany()
     * 
     * // Get first 10 Retailers
     * const retailers = await prisma.retailer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const retailerWithIdOnly = await prisma.retailer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RetailerFindManyArgs>(args?: SelectSubset<T, RetailerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetailerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Retailer.
     * @param {RetailerCreateArgs} args - Arguments to create a Retailer.
     * @example
     * // Create one Retailer
     * const Retailer = await prisma.retailer.create({
     *   data: {
     *     // ... data to create a Retailer
     *   }
     * })
     * 
     */
    create<T extends RetailerCreateArgs>(args: SelectSubset<T, RetailerCreateArgs<ExtArgs>>): Prisma__RetailerClient<$Result.GetResult<Prisma.$RetailerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Retailers.
     * @param {RetailerCreateManyArgs} args - Arguments to create many Retailers.
     * @example
     * // Create many Retailers
     * const retailer = await prisma.retailer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RetailerCreateManyArgs>(args?: SelectSubset<T, RetailerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Retailers and returns the data saved in the database.
     * @param {RetailerCreateManyAndReturnArgs} args - Arguments to create many Retailers.
     * @example
     * // Create many Retailers
     * const retailer = await prisma.retailer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Retailers and only return the `id`
     * const retailerWithIdOnly = await prisma.retailer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RetailerCreateManyAndReturnArgs>(args?: SelectSubset<T, RetailerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetailerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Retailer.
     * @param {RetailerDeleteArgs} args - Arguments to delete one Retailer.
     * @example
     * // Delete one Retailer
     * const Retailer = await prisma.retailer.delete({
     *   where: {
     *     // ... filter to delete one Retailer
     *   }
     * })
     * 
     */
    delete<T extends RetailerDeleteArgs>(args: SelectSubset<T, RetailerDeleteArgs<ExtArgs>>): Prisma__RetailerClient<$Result.GetResult<Prisma.$RetailerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Retailer.
     * @param {RetailerUpdateArgs} args - Arguments to update one Retailer.
     * @example
     * // Update one Retailer
     * const retailer = await prisma.retailer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RetailerUpdateArgs>(args: SelectSubset<T, RetailerUpdateArgs<ExtArgs>>): Prisma__RetailerClient<$Result.GetResult<Prisma.$RetailerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Retailers.
     * @param {RetailerDeleteManyArgs} args - Arguments to filter Retailers to delete.
     * @example
     * // Delete a few Retailers
     * const { count } = await prisma.retailer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RetailerDeleteManyArgs>(args?: SelectSubset<T, RetailerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Retailers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetailerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Retailers
     * const retailer = await prisma.retailer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RetailerUpdateManyArgs>(args: SelectSubset<T, RetailerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Retailers and returns the data updated in the database.
     * @param {RetailerUpdateManyAndReturnArgs} args - Arguments to update many Retailers.
     * @example
     * // Update many Retailers
     * const retailer = await prisma.retailer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Retailers and only return the `id`
     * const retailerWithIdOnly = await prisma.retailer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RetailerUpdateManyAndReturnArgs>(args: SelectSubset<T, RetailerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetailerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Retailer.
     * @param {RetailerUpsertArgs} args - Arguments to update or create a Retailer.
     * @example
     * // Update or create a Retailer
     * const retailer = await prisma.retailer.upsert({
     *   create: {
     *     // ... data to create a Retailer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Retailer we want to update
     *   }
     * })
     */
    upsert<T extends RetailerUpsertArgs>(args: SelectSubset<T, RetailerUpsertArgs<ExtArgs>>): Prisma__RetailerClient<$Result.GetResult<Prisma.$RetailerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Retailers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetailerCountArgs} args - Arguments to filter Retailers to count.
     * @example
     * // Count the number of Retailers
     * const count = await prisma.retailer.count({
     *   where: {
     *     // ... the filter for the Retailers we want to count
     *   }
     * })
    **/
    count<T extends RetailerCountArgs>(
      args?: Subset<T, RetailerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RetailerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Retailer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetailerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RetailerAggregateArgs>(args: Subset<T, RetailerAggregateArgs>): Prisma.PrismaPromise<GetRetailerAggregateType<T>>

    /**
     * Group by Retailer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetailerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RetailerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RetailerGroupByArgs['orderBy'] }
        : { orderBy?: RetailerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RetailerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRetailerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Retailer model
   */
  readonly fields: RetailerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Retailer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RetailerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sales<T extends Retailer$salesArgs<ExtArgs> = {}>(args?: Subset<T, Retailer$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Retailer model
   */
  interface RetailerFieldRefs {
    readonly id: FieldRef<"Retailer", 'String'>
    readonly name: FieldRef<"Retailer", 'String'>
    readonly phone: FieldRef<"Retailer", 'String'>
    readonly address: FieldRef<"Retailer", 'String'>
    readonly createdAt: FieldRef<"Retailer", 'DateTime'>
    readonly updatedAt: FieldRef<"Retailer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Retailer findUnique
   */
  export type RetailerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retailer
     */
    select?: RetailerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retailer
     */
    omit?: RetailerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetailerInclude<ExtArgs> | null
    /**
     * Filter, which Retailer to fetch.
     */
    where: RetailerWhereUniqueInput
  }

  /**
   * Retailer findUniqueOrThrow
   */
  export type RetailerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retailer
     */
    select?: RetailerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retailer
     */
    omit?: RetailerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetailerInclude<ExtArgs> | null
    /**
     * Filter, which Retailer to fetch.
     */
    where: RetailerWhereUniqueInput
  }

  /**
   * Retailer findFirst
   */
  export type RetailerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retailer
     */
    select?: RetailerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retailer
     */
    omit?: RetailerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetailerInclude<ExtArgs> | null
    /**
     * Filter, which Retailer to fetch.
     */
    where?: RetailerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Retailers to fetch.
     */
    orderBy?: RetailerOrderByWithRelationInput | RetailerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Retailers.
     */
    cursor?: RetailerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Retailers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Retailers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Retailers.
     */
    distinct?: RetailerScalarFieldEnum | RetailerScalarFieldEnum[]
  }

  /**
   * Retailer findFirstOrThrow
   */
  export type RetailerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retailer
     */
    select?: RetailerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retailer
     */
    omit?: RetailerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetailerInclude<ExtArgs> | null
    /**
     * Filter, which Retailer to fetch.
     */
    where?: RetailerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Retailers to fetch.
     */
    orderBy?: RetailerOrderByWithRelationInput | RetailerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Retailers.
     */
    cursor?: RetailerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Retailers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Retailers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Retailers.
     */
    distinct?: RetailerScalarFieldEnum | RetailerScalarFieldEnum[]
  }

  /**
   * Retailer findMany
   */
  export type RetailerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retailer
     */
    select?: RetailerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retailer
     */
    omit?: RetailerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetailerInclude<ExtArgs> | null
    /**
     * Filter, which Retailers to fetch.
     */
    where?: RetailerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Retailers to fetch.
     */
    orderBy?: RetailerOrderByWithRelationInput | RetailerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Retailers.
     */
    cursor?: RetailerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Retailers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Retailers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Retailers.
     */
    distinct?: RetailerScalarFieldEnum | RetailerScalarFieldEnum[]
  }

  /**
   * Retailer create
   */
  export type RetailerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retailer
     */
    select?: RetailerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retailer
     */
    omit?: RetailerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetailerInclude<ExtArgs> | null
    /**
     * The data needed to create a Retailer.
     */
    data: XOR<RetailerCreateInput, RetailerUncheckedCreateInput>
  }

  /**
   * Retailer createMany
   */
  export type RetailerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Retailers.
     */
    data: RetailerCreateManyInput | RetailerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Retailer createManyAndReturn
   */
  export type RetailerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retailer
     */
    select?: RetailerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Retailer
     */
    omit?: RetailerOmit<ExtArgs> | null
    /**
     * The data used to create many Retailers.
     */
    data: RetailerCreateManyInput | RetailerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Retailer update
   */
  export type RetailerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retailer
     */
    select?: RetailerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retailer
     */
    omit?: RetailerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetailerInclude<ExtArgs> | null
    /**
     * The data needed to update a Retailer.
     */
    data: XOR<RetailerUpdateInput, RetailerUncheckedUpdateInput>
    /**
     * Choose, which Retailer to update.
     */
    where: RetailerWhereUniqueInput
  }

  /**
   * Retailer updateMany
   */
  export type RetailerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Retailers.
     */
    data: XOR<RetailerUpdateManyMutationInput, RetailerUncheckedUpdateManyInput>
    /**
     * Filter which Retailers to update
     */
    where?: RetailerWhereInput
    /**
     * Limit how many Retailers to update.
     */
    limit?: number
  }

  /**
   * Retailer updateManyAndReturn
   */
  export type RetailerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retailer
     */
    select?: RetailerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Retailer
     */
    omit?: RetailerOmit<ExtArgs> | null
    /**
     * The data used to update Retailers.
     */
    data: XOR<RetailerUpdateManyMutationInput, RetailerUncheckedUpdateManyInput>
    /**
     * Filter which Retailers to update
     */
    where?: RetailerWhereInput
    /**
     * Limit how many Retailers to update.
     */
    limit?: number
  }

  /**
   * Retailer upsert
   */
  export type RetailerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retailer
     */
    select?: RetailerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retailer
     */
    omit?: RetailerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetailerInclude<ExtArgs> | null
    /**
     * The filter to search for the Retailer to update in case it exists.
     */
    where: RetailerWhereUniqueInput
    /**
     * In case the Retailer found by the `where` argument doesn't exist, create a new Retailer with this data.
     */
    create: XOR<RetailerCreateInput, RetailerUncheckedCreateInput>
    /**
     * In case the Retailer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RetailerUpdateInput, RetailerUncheckedUpdateInput>
  }

  /**
   * Retailer delete
   */
  export type RetailerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retailer
     */
    select?: RetailerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retailer
     */
    omit?: RetailerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetailerInclude<ExtArgs> | null
    /**
     * Filter which Retailer to delete.
     */
    where: RetailerWhereUniqueInput
  }

  /**
   * Retailer deleteMany
   */
  export type RetailerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Retailers to delete
     */
    where?: RetailerWhereInput
    /**
     * Limit how many Retailers to delete.
     */
    limit?: number
  }

  /**
   * Retailer.sales
   */
  export type Retailer$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Retailer without action
   */
  export type RetailerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Retailer
     */
    select?: RetailerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Retailer
     */
    omit?: RetailerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RetailerInclude<ExtArgs> | null
  }


  /**
   * Model SupportedBank
   */

  export type AggregateSupportedBank = {
    _count: SupportedBankCountAggregateOutputType | null
    _min: SupportedBankMinAggregateOutputType | null
    _max: SupportedBankMaxAggregateOutputType | null
  }

  export type SupportedBankMinAggregateOutputType = {
    id: string | null
    name: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type SupportedBankMaxAggregateOutputType = {
    id: string | null
    name: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type SupportedBankCountAggregateOutputType = {
    id: number
    name: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type SupportedBankMinAggregateInputType = {
    id?: true
    name?: true
    isActive?: true
    createdAt?: true
  }

  export type SupportedBankMaxAggregateInputType = {
    id?: true
    name?: true
    isActive?: true
    createdAt?: true
  }

  export type SupportedBankCountAggregateInputType = {
    id?: true
    name?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type SupportedBankAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportedBank to aggregate.
     */
    where?: SupportedBankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportedBanks to fetch.
     */
    orderBy?: SupportedBankOrderByWithRelationInput | SupportedBankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupportedBankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportedBanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportedBanks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupportedBanks
    **/
    _count?: true | SupportedBankCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupportedBankMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupportedBankMaxAggregateInputType
  }

  export type GetSupportedBankAggregateType<T extends SupportedBankAggregateArgs> = {
        [P in keyof T & keyof AggregateSupportedBank]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupportedBank[P]>
      : GetScalarType<T[P], AggregateSupportedBank[P]>
  }




  export type SupportedBankGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportedBankWhereInput
    orderBy?: SupportedBankOrderByWithAggregationInput | SupportedBankOrderByWithAggregationInput[]
    by: SupportedBankScalarFieldEnum[] | SupportedBankScalarFieldEnum
    having?: SupportedBankScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupportedBankCountAggregateInputType | true
    _min?: SupportedBankMinAggregateInputType
    _max?: SupportedBankMaxAggregateInputType
  }

  export type SupportedBankGroupByOutputType = {
    id: string
    name: string
    isActive: boolean
    createdAt: Date
    _count: SupportedBankCountAggregateOutputType | null
    _min: SupportedBankMinAggregateOutputType | null
    _max: SupportedBankMaxAggregateOutputType | null
  }

  type GetSupportedBankGroupByPayload<T extends SupportedBankGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupportedBankGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupportedBankGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupportedBankGroupByOutputType[P]>
            : GetScalarType<T[P], SupportedBankGroupByOutputType[P]>
        }
      >
    >


  export type SupportedBankSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["supportedBank"]>

  export type SupportedBankSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["supportedBank"]>

  export type SupportedBankSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["supportedBank"]>

  export type SupportedBankSelectScalar = {
    id?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type SupportedBankOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "isActive" | "createdAt", ExtArgs["result"]["supportedBank"]>

  export type $SupportedBankPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupportedBank"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["supportedBank"]>
    composites: {}
  }

  type SupportedBankGetPayload<S extends boolean | null | undefined | SupportedBankDefaultArgs> = $Result.GetResult<Prisma.$SupportedBankPayload, S>

  type SupportedBankCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupportedBankFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupportedBankCountAggregateInputType | true
    }

  export interface SupportedBankDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupportedBank'], meta: { name: 'SupportedBank' } }
    /**
     * Find zero or one SupportedBank that matches the filter.
     * @param {SupportedBankFindUniqueArgs} args - Arguments to find a SupportedBank
     * @example
     * // Get one SupportedBank
     * const supportedBank = await prisma.supportedBank.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupportedBankFindUniqueArgs>(args: SelectSubset<T, SupportedBankFindUniqueArgs<ExtArgs>>): Prisma__SupportedBankClient<$Result.GetResult<Prisma.$SupportedBankPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SupportedBank that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupportedBankFindUniqueOrThrowArgs} args - Arguments to find a SupportedBank
     * @example
     * // Get one SupportedBank
     * const supportedBank = await prisma.supportedBank.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupportedBankFindUniqueOrThrowArgs>(args: SelectSubset<T, SupportedBankFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupportedBankClient<$Result.GetResult<Prisma.$SupportedBankPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportedBank that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportedBankFindFirstArgs} args - Arguments to find a SupportedBank
     * @example
     * // Get one SupportedBank
     * const supportedBank = await prisma.supportedBank.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupportedBankFindFirstArgs>(args?: SelectSubset<T, SupportedBankFindFirstArgs<ExtArgs>>): Prisma__SupportedBankClient<$Result.GetResult<Prisma.$SupportedBankPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportedBank that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportedBankFindFirstOrThrowArgs} args - Arguments to find a SupportedBank
     * @example
     * // Get one SupportedBank
     * const supportedBank = await prisma.supportedBank.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupportedBankFindFirstOrThrowArgs>(args?: SelectSubset<T, SupportedBankFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupportedBankClient<$Result.GetResult<Prisma.$SupportedBankPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SupportedBanks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportedBankFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupportedBanks
     * const supportedBanks = await prisma.supportedBank.findMany()
     * 
     * // Get first 10 SupportedBanks
     * const supportedBanks = await prisma.supportedBank.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supportedBankWithIdOnly = await prisma.supportedBank.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupportedBankFindManyArgs>(args?: SelectSubset<T, SupportedBankFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportedBankPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SupportedBank.
     * @param {SupportedBankCreateArgs} args - Arguments to create a SupportedBank.
     * @example
     * // Create one SupportedBank
     * const SupportedBank = await prisma.supportedBank.create({
     *   data: {
     *     // ... data to create a SupportedBank
     *   }
     * })
     * 
     */
    create<T extends SupportedBankCreateArgs>(args: SelectSubset<T, SupportedBankCreateArgs<ExtArgs>>): Prisma__SupportedBankClient<$Result.GetResult<Prisma.$SupportedBankPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SupportedBanks.
     * @param {SupportedBankCreateManyArgs} args - Arguments to create many SupportedBanks.
     * @example
     * // Create many SupportedBanks
     * const supportedBank = await prisma.supportedBank.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupportedBankCreateManyArgs>(args?: SelectSubset<T, SupportedBankCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SupportedBanks and returns the data saved in the database.
     * @param {SupportedBankCreateManyAndReturnArgs} args - Arguments to create many SupportedBanks.
     * @example
     * // Create many SupportedBanks
     * const supportedBank = await prisma.supportedBank.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SupportedBanks and only return the `id`
     * const supportedBankWithIdOnly = await prisma.supportedBank.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupportedBankCreateManyAndReturnArgs>(args?: SelectSubset<T, SupportedBankCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportedBankPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SupportedBank.
     * @param {SupportedBankDeleteArgs} args - Arguments to delete one SupportedBank.
     * @example
     * // Delete one SupportedBank
     * const SupportedBank = await prisma.supportedBank.delete({
     *   where: {
     *     // ... filter to delete one SupportedBank
     *   }
     * })
     * 
     */
    delete<T extends SupportedBankDeleteArgs>(args: SelectSubset<T, SupportedBankDeleteArgs<ExtArgs>>): Prisma__SupportedBankClient<$Result.GetResult<Prisma.$SupportedBankPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SupportedBank.
     * @param {SupportedBankUpdateArgs} args - Arguments to update one SupportedBank.
     * @example
     * // Update one SupportedBank
     * const supportedBank = await prisma.supportedBank.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupportedBankUpdateArgs>(args: SelectSubset<T, SupportedBankUpdateArgs<ExtArgs>>): Prisma__SupportedBankClient<$Result.GetResult<Prisma.$SupportedBankPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SupportedBanks.
     * @param {SupportedBankDeleteManyArgs} args - Arguments to filter SupportedBanks to delete.
     * @example
     * // Delete a few SupportedBanks
     * const { count } = await prisma.supportedBank.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupportedBankDeleteManyArgs>(args?: SelectSubset<T, SupportedBankDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportedBanks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportedBankUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupportedBanks
     * const supportedBank = await prisma.supportedBank.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupportedBankUpdateManyArgs>(args: SelectSubset<T, SupportedBankUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportedBanks and returns the data updated in the database.
     * @param {SupportedBankUpdateManyAndReturnArgs} args - Arguments to update many SupportedBanks.
     * @example
     * // Update many SupportedBanks
     * const supportedBank = await prisma.supportedBank.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SupportedBanks and only return the `id`
     * const supportedBankWithIdOnly = await prisma.supportedBank.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SupportedBankUpdateManyAndReturnArgs>(args: SelectSubset<T, SupportedBankUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportedBankPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SupportedBank.
     * @param {SupportedBankUpsertArgs} args - Arguments to update or create a SupportedBank.
     * @example
     * // Update or create a SupportedBank
     * const supportedBank = await prisma.supportedBank.upsert({
     *   create: {
     *     // ... data to create a SupportedBank
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupportedBank we want to update
     *   }
     * })
     */
    upsert<T extends SupportedBankUpsertArgs>(args: SelectSubset<T, SupportedBankUpsertArgs<ExtArgs>>): Prisma__SupportedBankClient<$Result.GetResult<Prisma.$SupportedBankPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SupportedBanks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportedBankCountArgs} args - Arguments to filter SupportedBanks to count.
     * @example
     * // Count the number of SupportedBanks
     * const count = await prisma.supportedBank.count({
     *   where: {
     *     // ... the filter for the SupportedBanks we want to count
     *   }
     * })
    **/
    count<T extends SupportedBankCountArgs>(
      args?: Subset<T, SupportedBankCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupportedBankCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupportedBank.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportedBankAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupportedBankAggregateArgs>(args: Subset<T, SupportedBankAggregateArgs>): Prisma.PrismaPromise<GetSupportedBankAggregateType<T>>

    /**
     * Group by SupportedBank.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportedBankGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupportedBankGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupportedBankGroupByArgs['orderBy'] }
        : { orderBy?: SupportedBankGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupportedBankGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupportedBankGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupportedBank model
   */
  readonly fields: SupportedBankFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupportedBank.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupportedBankClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SupportedBank model
   */
  interface SupportedBankFieldRefs {
    readonly id: FieldRef<"SupportedBank", 'String'>
    readonly name: FieldRef<"SupportedBank", 'String'>
    readonly isActive: FieldRef<"SupportedBank", 'Boolean'>
    readonly createdAt: FieldRef<"SupportedBank", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SupportedBank findUnique
   */
  export type SupportedBankFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportedBank
     */
    select?: SupportedBankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportedBank
     */
    omit?: SupportedBankOmit<ExtArgs> | null
    /**
     * Filter, which SupportedBank to fetch.
     */
    where: SupportedBankWhereUniqueInput
  }

  /**
   * SupportedBank findUniqueOrThrow
   */
  export type SupportedBankFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportedBank
     */
    select?: SupportedBankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportedBank
     */
    omit?: SupportedBankOmit<ExtArgs> | null
    /**
     * Filter, which SupportedBank to fetch.
     */
    where: SupportedBankWhereUniqueInput
  }

  /**
   * SupportedBank findFirst
   */
  export type SupportedBankFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportedBank
     */
    select?: SupportedBankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportedBank
     */
    omit?: SupportedBankOmit<ExtArgs> | null
    /**
     * Filter, which SupportedBank to fetch.
     */
    where?: SupportedBankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportedBanks to fetch.
     */
    orderBy?: SupportedBankOrderByWithRelationInput | SupportedBankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportedBanks.
     */
    cursor?: SupportedBankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportedBanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportedBanks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportedBanks.
     */
    distinct?: SupportedBankScalarFieldEnum | SupportedBankScalarFieldEnum[]
  }

  /**
   * SupportedBank findFirstOrThrow
   */
  export type SupportedBankFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportedBank
     */
    select?: SupportedBankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportedBank
     */
    omit?: SupportedBankOmit<ExtArgs> | null
    /**
     * Filter, which SupportedBank to fetch.
     */
    where?: SupportedBankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportedBanks to fetch.
     */
    orderBy?: SupportedBankOrderByWithRelationInput | SupportedBankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportedBanks.
     */
    cursor?: SupportedBankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportedBanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportedBanks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportedBanks.
     */
    distinct?: SupportedBankScalarFieldEnum | SupportedBankScalarFieldEnum[]
  }

  /**
   * SupportedBank findMany
   */
  export type SupportedBankFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportedBank
     */
    select?: SupportedBankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportedBank
     */
    omit?: SupportedBankOmit<ExtArgs> | null
    /**
     * Filter, which SupportedBanks to fetch.
     */
    where?: SupportedBankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportedBanks to fetch.
     */
    orderBy?: SupportedBankOrderByWithRelationInput | SupportedBankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupportedBanks.
     */
    cursor?: SupportedBankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportedBanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportedBanks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportedBanks.
     */
    distinct?: SupportedBankScalarFieldEnum | SupportedBankScalarFieldEnum[]
  }

  /**
   * SupportedBank create
   */
  export type SupportedBankCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportedBank
     */
    select?: SupportedBankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportedBank
     */
    omit?: SupportedBankOmit<ExtArgs> | null
    /**
     * The data needed to create a SupportedBank.
     */
    data: XOR<SupportedBankCreateInput, SupportedBankUncheckedCreateInput>
  }

  /**
   * SupportedBank createMany
   */
  export type SupportedBankCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupportedBanks.
     */
    data: SupportedBankCreateManyInput | SupportedBankCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportedBank createManyAndReturn
   */
  export type SupportedBankCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportedBank
     */
    select?: SupportedBankSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportedBank
     */
    omit?: SupportedBankOmit<ExtArgs> | null
    /**
     * The data used to create many SupportedBanks.
     */
    data: SupportedBankCreateManyInput | SupportedBankCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportedBank update
   */
  export type SupportedBankUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportedBank
     */
    select?: SupportedBankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportedBank
     */
    omit?: SupportedBankOmit<ExtArgs> | null
    /**
     * The data needed to update a SupportedBank.
     */
    data: XOR<SupportedBankUpdateInput, SupportedBankUncheckedUpdateInput>
    /**
     * Choose, which SupportedBank to update.
     */
    where: SupportedBankWhereUniqueInput
  }

  /**
   * SupportedBank updateMany
   */
  export type SupportedBankUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupportedBanks.
     */
    data: XOR<SupportedBankUpdateManyMutationInput, SupportedBankUncheckedUpdateManyInput>
    /**
     * Filter which SupportedBanks to update
     */
    where?: SupportedBankWhereInput
    /**
     * Limit how many SupportedBanks to update.
     */
    limit?: number
  }

  /**
   * SupportedBank updateManyAndReturn
   */
  export type SupportedBankUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportedBank
     */
    select?: SupportedBankSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportedBank
     */
    omit?: SupportedBankOmit<ExtArgs> | null
    /**
     * The data used to update SupportedBanks.
     */
    data: XOR<SupportedBankUpdateManyMutationInput, SupportedBankUncheckedUpdateManyInput>
    /**
     * Filter which SupportedBanks to update
     */
    where?: SupportedBankWhereInput
    /**
     * Limit how many SupportedBanks to update.
     */
    limit?: number
  }

  /**
   * SupportedBank upsert
   */
  export type SupportedBankUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportedBank
     */
    select?: SupportedBankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportedBank
     */
    omit?: SupportedBankOmit<ExtArgs> | null
    /**
     * The filter to search for the SupportedBank to update in case it exists.
     */
    where: SupportedBankWhereUniqueInput
    /**
     * In case the SupportedBank found by the `where` argument doesn't exist, create a new SupportedBank with this data.
     */
    create: XOR<SupportedBankCreateInput, SupportedBankUncheckedCreateInput>
    /**
     * In case the SupportedBank was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupportedBankUpdateInput, SupportedBankUncheckedUpdateInput>
  }

  /**
   * SupportedBank delete
   */
  export type SupportedBankDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportedBank
     */
    select?: SupportedBankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportedBank
     */
    omit?: SupportedBankOmit<ExtArgs> | null
    /**
     * Filter which SupportedBank to delete.
     */
    where: SupportedBankWhereUniqueInput
  }

  /**
   * SupportedBank deleteMany
   */
  export type SupportedBankDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportedBanks to delete
     */
    where?: SupportedBankWhereInput
    /**
     * Limit how many SupportedBanks to delete.
     */
    limit?: number
  }

  /**
   * SupportedBank without action
   */
  export type SupportedBankDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportedBank
     */
    select?: SupportedBankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportedBank
     */
    omit?: SupportedBankOmit<ExtArgs> | null
  }


  /**
   * Model InventoryBatch
   */

  export type AggregateInventoryBatch = {
    _count: InventoryBatchCountAggregateOutputType | null
    _avg: InventoryBatchAvgAggregateOutputType | null
    _sum: InventoryBatchSumAggregateOutputType | null
    _min: InventoryBatchMinAggregateOutputType | null
    _max: InventoryBatchMaxAggregateOutputType | null
  }

  export type InventoryBatchAvgAggregateOutputType = {
    quantityRecieved: number | null
    remainingQty: number | null
    unitCostPrice: Decimal | null
  }

  export type InventoryBatchSumAggregateOutputType = {
    quantityRecieved: number | null
    remainingQty: number | null
    unitCostPrice: Decimal | null
  }

  export type InventoryBatchMinAggregateOutputType = {
    id: string | null
    batchCode: string | null
    productId: string | null
    supplierId: string | null
    quantityRecieved: number | null
    remainingQty: number | null
    unitCostPrice: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InventoryBatchMaxAggregateOutputType = {
    id: string | null
    batchCode: string | null
    productId: string | null
    supplierId: string | null
    quantityRecieved: number | null
    remainingQty: number | null
    unitCostPrice: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InventoryBatchCountAggregateOutputType = {
    id: number
    batchCode: number
    productId: number
    supplierId: number
    quantityRecieved: number
    remainingQty: number
    unitCostPrice: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InventoryBatchAvgAggregateInputType = {
    quantityRecieved?: true
    remainingQty?: true
    unitCostPrice?: true
  }

  export type InventoryBatchSumAggregateInputType = {
    quantityRecieved?: true
    remainingQty?: true
    unitCostPrice?: true
  }

  export type InventoryBatchMinAggregateInputType = {
    id?: true
    batchCode?: true
    productId?: true
    supplierId?: true
    quantityRecieved?: true
    remainingQty?: true
    unitCostPrice?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InventoryBatchMaxAggregateInputType = {
    id?: true
    batchCode?: true
    productId?: true
    supplierId?: true
    quantityRecieved?: true
    remainingQty?: true
    unitCostPrice?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InventoryBatchCountAggregateInputType = {
    id?: true
    batchCode?: true
    productId?: true
    supplierId?: true
    quantityRecieved?: true
    remainingQty?: true
    unitCostPrice?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InventoryBatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InventoryBatch to aggregate.
     */
    where?: InventoryBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryBatches to fetch.
     */
    orderBy?: InventoryBatchOrderByWithRelationInput | InventoryBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InventoryBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InventoryBatches
    **/
    _count?: true | InventoryBatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InventoryBatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InventoryBatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InventoryBatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InventoryBatchMaxAggregateInputType
  }

  export type GetInventoryBatchAggregateType<T extends InventoryBatchAggregateArgs> = {
        [P in keyof T & keyof AggregateInventoryBatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInventoryBatch[P]>
      : GetScalarType<T[P], AggregateInventoryBatch[P]>
  }




  export type InventoryBatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventoryBatchWhereInput
    orderBy?: InventoryBatchOrderByWithAggregationInput | InventoryBatchOrderByWithAggregationInput[]
    by: InventoryBatchScalarFieldEnum[] | InventoryBatchScalarFieldEnum
    having?: InventoryBatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InventoryBatchCountAggregateInputType | true
    _avg?: InventoryBatchAvgAggregateInputType
    _sum?: InventoryBatchSumAggregateInputType
    _min?: InventoryBatchMinAggregateInputType
    _max?: InventoryBatchMaxAggregateInputType
  }

  export type InventoryBatchGroupByOutputType = {
    id: string
    batchCode: string
    productId: string
    supplierId: string
    quantityRecieved: number
    remainingQty: number
    unitCostPrice: Decimal
    createdAt: Date
    updatedAt: Date
    _count: InventoryBatchCountAggregateOutputType | null
    _avg: InventoryBatchAvgAggregateOutputType | null
    _sum: InventoryBatchSumAggregateOutputType | null
    _min: InventoryBatchMinAggregateOutputType | null
    _max: InventoryBatchMaxAggregateOutputType | null
  }

  type GetInventoryBatchGroupByPayload<T extends InventoryBatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InventoryBatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InventoryBatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InventoryBatchGroupByOutputType[P]>
            : GetScalarType<T[P], InventoryBatchGroupByOutputType[P]>
        }
      >
    >


  export type InventoryBatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchCode?: boolean
    productId?: boolean
    supplierId?: boolean
    quantityRecieved?: boolean
    remainingQty?: boolean
    unitCostPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventoryBatch"]>

  export type InventoryBatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchCode?: boolean
    productId?: boolean
    supplierId?: boolean
    quantityRecieved?: boolean
    remainingQty?: boolean
    unitCostPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventoryBatch"]>

  export type InventoryBatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchCode?: boolean
    productId?: boolean
    supplierId?: boolean
    quantityRecieved?: boolean
    remainingQty?: boolean
    unitCostPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventoryBatch"]>

  export type InventoryBatchSelectScalar = {
    id?: boolean
    batchCode?: boolean
    productId?: boolean
    supplierId?: boolean
    quantityRecieved?: boolean
    remainingQty?: boolean
    unitCostPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InventoryBatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "batchCode" | "productId" | "supplierId" | "quantityRecieved" | "remainingQty" | "unitCostPrice" | "createdAt" | "updatedAt", ExtArgs["result"]["inventoryBatch"]>
  export type InventoryBatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
  }
  export type InventoryBatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
  }
  export type InventoryBatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
  }

  export type $InventoryBatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InventoryBatch"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      supplier: Prisma.$SupplierPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      batchCode: string
      productId: string
      supplierId: string
      quantityRecieved: number
      remainingQty: number
      unitCostPrice: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["inventoryBatch"]>
    composites: {}
  }

  type InventoryBatchGetPayload<S extends boolean | null | undefined | InventoryBatchDefaultArgs> = $Result.GetResult<Prisma.$InventoryBatchPayload, S>

  type InventoryBatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InventoryBatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InventoryBatchCountAggregateInputType | true
    }

  export interface InventoryBatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InventoryBatch'], meta: { name: 'InventoryBatch' } }
    /**
     * Find zero or one InventoryBatch that matches the filter.
     * @param {InventoryBatchFindUniqueArgs} args - Arguments to find a InventoryBatch
     * @example
     * // Get one InventoryBatch
     * const inventoryBatch = await prisma.inventoryBatch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InventoryBatchFindUniqueArgs>(args: SelectSubset<T, InventoryBatchFindUniqueArgs<ExtArgs>>): Prisma__InventoryBatchClient<$Result.GetResult<Prisma.$InventoryBatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InventoryBatch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InventoryBatchFindUniqueOrThrowArgs} args - Arguments to find a InventoryBatch
     * @example
     * // Get one InventoryBatch
     * const inventoryBatch = await prisma.inventoryBatch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InventoryBatchFindUniqueOrThrowArgs>(args: SelectSubset<T, InventoryBatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InventoryBatchClient<$Result.GetResult<Prisma.$InventoryBatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InventoryBatch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryBatchFindFirstArgs} args - Arguments to find a InventoryBatch
     * @example
     * // Get one InventoryBatch
     * const inventoryBatch = await prisma.inventoryBatch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InventoryBatchFindFirstArgs>(args?: SelectSubset<T, InventoryBatchFindFirstArgs<ExtArgs>>): Prisma__InventoryBatchClient<$Result.GetResult<Prisma.$InventoryBatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InventoryBatch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryBatchFindFirstOrThrowArgs} args - Arguments to find a InventoryBatch
     * @example
     * // Get one InventoryBatch
     * const inventoryBatch = await prisma.inventoryBatch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InventoryBatchFindFirstOrThrowArgs>(args?: SelectSubset<T, InventoryBatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__InventoryBatchClient<$Result.GetResult<Prisma.$InventoryBatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InventoryBatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryBatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InventoryBatches
     * const inventoryBatches = await prisma.inventoryBatch.findMany()
     * 
     * // Get first 10 InventoryBatches
     * const inventoryBatches = await prisma.inventoryBatch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inventoryBatchWithIdOnly = await prisma.inventoryBatch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InventoryBatchFindManyArgs>(args?: SelectSubset<T, InventoryBatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryBatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InventoryBatch.
     * @param {InventoryBatchCreateArgs} args - Arguments to create a InventoryBatch.
     * @example
     * // Create one InventoryBatch
     * const InventoryBatch = await prisma.inventoryBatch.create({
     *   data: {
     *     // ... data to create a InventoryBatch
     *   }
     * })
     * 
     */
    create<T extends InventoryBatchCreateArgs>(args: SelectSubset<T, InventoryBatchCreateArgs<ExtArgs>>): Prisma__InventoryBatchClient<$Result.GetResult<Prisma.$InventoryBatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InventoryBatches.
     * @param {InventoryBatchCreateManyArgs} args - Arguments to create many InventoryBatches.
     * @example
     * // Create many InventoryBatches
     * const inventoryBatch = await prisma.inventoryBatch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InventoryBatchCreateManyArgs>(args?: SelectSubset<T, InventoryBatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InventoryBatches and returns the data saved in the database.
     * @param {InventoryBatchCreateManyAndReturnArgs} args - Arguments to create many InventoryBatches.
     * @example
     * // Create many InventoryBatches
     * const inventoryBatch = await prisma.inventoryBatch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InventoryBatches and only return the `id`
     * const inventoryBatchWithIdOnly = await prisma.inventoryBatch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InventoryBatchCreateManyAndReturnArgs>(args?: SelectSubset<T, InventoryBatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryBatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InventoryBatch.
     * @param {InventoryBatchDeleteArgs} args - Arguments to delete one InventoryBatch.
     * @example
     * // Delete one InventoryBatch
     * const InventoryBatch = await prisma.inventoryBatch.delete({
     *   where: {
     *     // ... filter to delete one InventoryBatch
     *   }
     * })
     * 
     */
    delete<T extends InventoryBatchDeleteArgs>(args: SelectSubset<T, InventoryBatchDeleteArgs<ExtArgs>>): Prisma__InventoryBatchClient<$Result.GetResult<Prisma.$InventoryBatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InventoryBatch.
     * @param {InventoryBatchUpdateArgs} args - Arguments to update one InventoryBatch.
     * @example
     * // Update one InventoryBatch
     * const inventoryBatch = await prisma.inventoryBatch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InventoryBatchUpdateArgs>(args: SelectSubset<T, InventoryBatchUpdateArgs<ExtArgs>>): Prisma__InventoryBatchClient<$Result.GetResult<Prisma.$InventoryBatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InventoryBatches.
     * @param {InventoryBatchDeleteManyArgs} args - Arguments to filter InventoryBatches to delete.
     * @example
     * // Delete a few InventoryBatches
     * const { count } = await prisma.inventoryBatch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InventoryBatchDeleteManyArgs>(args?: SelectSubset<T, InventoryBatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InventoryBatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryBatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InventoryBatches
     * const inventoryBatch = await prisma.inventoryBatch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InventoryBatchUpdateManyArgs>(args: SelectSubset<T, InventoryBatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InventoryBatches and returns the data updated in the database.
     * @param {InventoryBatchUpdateManyAndReturnArgs} args - Arguments to update many InventoryBatches.
     * @example
     * // Update many InventoryBatches
     * const inventoryBatch = await prisma.inventoryBatch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InventoryBatches and only return the `id`
     * const inventoryBatchWithIdOnly = await prisma.inventoryBatch.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InventoryBatchUpdateManyAndReturnArgs>(args: SelectSubset<T, InventoryBatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryBatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InventoryBatch.
     * @param {InventoryBatchUpsertArgs} args - Arguments to update or create a InventoryBatch.
     * @example
     * // Update or create a InventoryBatch
     * const inventoryBatch = await prisma.inventoryBatch.upsert({
     *   create: {
     *     // ... data to create a InventoryBatch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InventoryBatch we want to update
     *   }
     * })
     */
    upsert<T extends InventoryBatchUpsertArgs>(args: SelectSubset<T, InventoryBatchUpsertArgs<ExtArgs>>): Prisma__InventoryBatchClient<$Result.GetResult<Prisma.$InventoryBatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InventoryBatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryBatchCountArgs} args - Arguments to filter InventoryBatches to count.
     * @example
     * // Count the number of InventoryBatches
     * const count = await prisma.inventoryBatch.count({
     *   where: {
     *     // ... the filter for the InventoryBatches we want to count
     *   }
     * })
    **/
    count<T extends InventoryBatchCountArgs>(
      args?: Subset<T, InventoryBatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InventoryBatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InventoryBatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryBatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InventoryBatchAggregateArgs>(args: Subset<T, InventoryBatchAggregateArgs>): Prisma.PrismaPromise<GetInventoryBatchAggregateType<T>>

    /**
     * Group by InventoryBatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryBatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InventoryBatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InventoryBatchGroupByArgs['orderBy'] }
        : { orderBy?: InventoryBatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InventoryBatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventoryBatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InventoryBatch model
   */
  readonly fields: InventoryBatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InventoryBatch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InventoryBatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    supplier<T extends SupplierDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SupplierDefaultArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InventoryBatch model
   */
  interface InventoryBatchFieldRefs {
    readonly id: FieldRef<"InventoryBatch", 'String'>
    readonly batchCode: FieldRef<"InventoryBatch", 'String'>
    readonly productId: FieldRef<"InventoryBatch", 'String'>
    readonly supplierId: FieldRef<"InventoryBatch", 'String'>
    readonly quantityRecieved: FieldRef<"InventoryBatch", 'Int'>
    readonly remainingQty: FieldRef<"InventoryBatch", 'Int'>
    readonly unitCostPrice: FieldRef<"InventoryBatch", 'Decimal'>
    readonly createdAt: FieldRef<"InventoryBatch", 'DateTime'>
    readonly updatedAt: FieldRef<"InventoryBatch", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InventoryBatch findUnique
   */
  export type InventoryBatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryBatch
     */
    select?: InventoryBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryBatch
     */
    omit?: InventoryBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryBatchInclude<ExtArgs> | null
    /**
     * Filter, which InventoryBatch to fetch.
     */
    where: InventoryBatchWhereUniqueInput
  }

  /**
   * InventoryBatch findUniqueOrThrow
   */
  export type InventoryBatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryBatch
     */
    select?: InventoryBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryBatch
     */
    omit?: InventoryBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryBatchInclude<ExtArgs> | null
    /**
     * Filter, which InventoryBatch to fetch.
     */
    where: InventoryBatchWhereUniqueInput
  }

  /**
   * InventoryBatch findFirst
   */
  export type InventoryBatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryBatch
     */
    select?: InventoryBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryBatch
     */
    omit?: InventoryBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryBatchInclude<ExtArgs> | null
    /**
     * Filter, which InventoryBatch to fetch.
     */
    where?: InventoryBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryBatches to fetch.
     */
    orderBy?: InventoryBatchOrderByWithRelationInput | InventoryBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InventoryBatches.
     */
    cursor?: InventoryBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryBatches.
     */
    distinct?: InventoryBatchScalarFieldEnum | InventoryBatchScalarFieldEnum[]
  }

  /**
   * InventoryBatch findFirstOrThrow
   */
  export type InventoryBatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryBatch
     */
    select?: InventoryBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryBatch
     */
    omit?: InventoryBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryBatchInclude<ExtArgs> | null
    /**
     * Filter, which InventoryBatch to fetch.
     */
    where?: InventoryBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryBatches to fetch.
     */
    orderBy?: InventoryBatchOrderByWithRelationInput | InventoryBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InventoryBatches.
     */
    cursor?: InventoryBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryBatches.
     */
    distinct?: InventoryBatchScalarFieldEnum | InventoryBatchScalarFieldEnum[]
  }

  /**
   * InventoryBatch findMany
   */
  export type InventoryBatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryBatch
     */
    select?: InventoryBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryBatch
     */
    omit?: InventoryBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryBatchInclude<ExtArgs> | null
    /**
     * Filter, which InventoryBatches to fetch.
     */
    where?: InventoryBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryBatches to fetch.
     */
    orderBy?: InventoryBatchOrderByWithRelationInput | InventoryBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InventoryBatches.
     */
    cursor?: InventoryBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryBatches.
     */
    distinct?: InventoryBatchScalarFieldEnum | InventoryBatchScalarFieldEnum[]
  }

  /**
   * InventoryBatch create
   */
  export type InventoryBatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryBatch
     */
    select?: InventoryBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryBatch
     */
    omit?: InventoryBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryBatchInclude<ExtArgs> | null
    /**
     * The data needed to create a InventoryBatch.
     */
    data: XOR<InventoryBatchCreateInput, InventoryBatchUncheckedCreateInput>
  }

  /**
   * InventoryBatch createMany
   */
  export type InventoryBatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InventoryBatches.
     */
    data: InventoryBatchCreateManyInput | InventoryBatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InventoryBatch createManyAndReturn
   */
  export type InventoryBatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryBatch
     */
    select?: InventoryBatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryBatch
     */
    omit?: InventoryBatchOmit<ExtArgs> | null
    /**
     * The data used to create many InventoryBatches.
     */
    data: InventoryBatchCreateManyInput | InventoryBatchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryBatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InventoryBatch update
   */
  export type InventoryBatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryBatch
     */
    select?: InventoryBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryBatch
     */
    omit?: InventoryBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryBatchInclude<ExtArgs> | null
    /**
     * The data needed to update a InventoryBatch.
     */
    data: XOR<InventoryBatchUpdateInput, InventoryBatchUncheckedUpdateInput>
    /**
     * Choose, which InventoryBatch to update.
     */
    where: InventoryBatchWhereUniqueInput
  }

  /**
   * InventoryBatch updateMany
   */
  export type InventoryBatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InventoryBatches.
     */
    data: XOR<InventoryBatchUpdateManyMutationInput, InventoryBatchUncheckedUpdateManyInput>
    /**
     * Filter which InventoryBatches to update
     */
    where?: InventoryBatchWhereInput
    /**
     * Limit how many InventoryBatches to update.
     */
    limit?: number
  }

  /**
   * InventoryBatch updateManyAndReturn
   */
  export type InventoryBatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryBatch
     */
    select?: InventoryBatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryBatch
     */
    omit?: InventoryBatchOmit<ExtArgs> | null
    /**
     * The data used to update InventoryBatches.
     */
    data: XOR<InventoryBatchUpdateManyMutationInput, InventoryBatchUncheckedUpdateManyInput>
    /**
     * Filter which InventoryBatches to update
     */
    where?: InventoryBatchWhereInput
    /**
     * Limit how many InventoryBatches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryBatchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InventoryBatch upsert
   */
  export type InventoryBatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryBatch
     */
    select?: InventoryBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryBatch
     */
    omit?: InventoryBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryBatchInclude<ExtArgs> | null
    /**
     * The filter to search for the InventoryBatch to update in case it exists.
     */
    where: InventoryBatchWhereUniqueInput
    /**
     * In case the InventoryBatch found by the `where` argument doesn't exist, create a new InventoryBatch with this data.
     */
    create: XOR<InventoryBatchCreateInput, InventoryBatchUncheckedCreateInput>
    /**
     * In case the InventoryBatch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InventoryBatchUpdateInput, InventoryBatchUncheckedUpdateInput>
  }

  /**
   * InventoryBatch delete
   */
  export type InventoryBatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryBatch
     */
    select?: InventoryBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryBatch
     */
    omit?: InventoryBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryBatchInclude<ExtArgs> | null
    /**
     * Filter which InventoryBatch to delete.
     */
    where: InventoryBatchWhereUniqueInput
  }

  /**
   * InventoryBatch deleteMany
   */
  export type InventoryBatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InventoryBatches to delete
     */
    where?: InventoryBatchWhereInput
    /**
     * Limit how many InventoryBatches to delete.
     */
    limit?: number
  }

  /**
   * InventoryBatch without action
   */
  export type InventoryBatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryBatch
     */
    select?: InventoryBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryBatch
     */
    omit?: InventoryBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryBatchInclude<ExtArgs> | null
  }


  /**
   * Model StockIssuance
   */

  export type AggregateStockIssuance = {
    _count: StockIssuanceCountAggregateOutputType | null
    _avg: StockIssuanceAvgAggregateOutputType | null
    _sum: StockIssuanceSumAggregateOutputType | null
    _min: StockIssuanceMinAggregateOutputType | null
    _max: StockIssuanceMaxAggregateOutputType | null
  }

  export type StockIssuanceAvgAggregateOutputType = {
    totalWholesaleValue: Decimal | null
  }

  export type StockIssuanceSumAggregateOutputType = {
    totalWholesaleValue: Decimal | null
  }

  export type StockIssuanceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    status: $Enums.IssuanceStatus | null
    totalWholesaleValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockIssuanceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    status: $Enums.IssuanceStatus | null
    totalWholesaleValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockIssuanceCountAggregateOutputType = {
    id: number
    userId: number
    status: number
    totalWholesaleValue: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StockIssuanceAvgAggregateInputType = {
    totalWholesaleValue?: true
  }

  export type StockIssuanceSumAggregateInputType = {
    totalWholesaleValue?: true
  }

  export type StockIssuanceMinAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    totalWholesaleValue?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockIssuanceMaxAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    totalWholesaleValue?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockIssuanceCountAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    totalWholesaleValue?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StockIssuanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockIssuance to aggregate.
     */
    where?: StockIssuanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockIssuances to fetch.
     */
    orderBy?: StockIssuanceOrderByWithRelationInput | StockIssuanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockIssuanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockIssuances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockIssuances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StockIssuances
    **/
    _count?: true | StockIssuanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockIssuanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockIssuanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockIssuanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockIssuanceMaxAggregateInputType
  }

  export type GetStockIssuanceAggregateType<T extends StockIssuanceAggregateArgs> = {
        [P in keyof T & keyof AggregateStockIssuance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStockIssuance[P]>
      : GetScalarType<T[P], AggregateStockIssuance[P]>
  }




  export type StockIssuanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockIssuanceWhereInput
    orderBy?: StockIssuanceOrderByWithAggregationInput | StockIssuanceOrderByWithAggregationInput[]
    by: StockIssuanceScalarFieldEnum[] | StockIssuanceScalarFieldEnum
    having?: StockIssuanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockIssuanceCountAggregateInputType | true
    _avg?: StockIssuanceAvgAggregateInputType
    _sum?: StockIssuanceSumAggregateInputType
    _min?: StockIssuanceMinAggregateInputType
    _max?: StockIssuanceMaxAggregateInputType
  }

  export type StockIssuanceGroupByOutputType = {
    id: string
    userId: string
    status: $Enums.IssuanceStatus
    totalWholesaleValue: Decimal
    createdAt: Date
    updatedAt: Date
    _count: StockIssuanceCountAggregateOutputType | null
    _avg: StockIssuanceAvgAggregateOutputType | null
    _sum: StockIssuanceSumAggregateOutputType | null
    _min: StockIssuanceMinAggregateOutputType | null
    _max: StockIssuanceMaxAggregateOutputType | null
  }

  type GetStockIssuanceGroupByPayload<T extends StockIssuanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockIssuanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockIssuanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockIssuanceGroupByOutputType[P]>
            : GetScalarType<T[P], StockIssuanceGroupByOutputType[P]>
        }
      >
    >


  export type StockIssuanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    totalWholesaleValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | StockIssuance$itemsArgs<ExtArgs>
    _count?: boolean | StockIssuanceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockIssuance"]>

  export type StockIssuanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    totalWholesaleValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockIssuance"]>

  export type StockIssuanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    totalWholesaleValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockIssuance"]>

  export type StockIssuanceSelectScalar = {
    id?: boolean
    userId?: boolean
    status?: boolean
    totalWholesaleValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StockIssuanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "status" | "totalWholesaleValue" | "createdAt" | "updatedAt", ExtArgs["result"]["stockIssuance"]>
  export type StockIssuanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | StockIssuance$itemsArgs<ExtArgs>
    _count?: boolean | StockIssuanceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StockIssuanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StockIssuanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StockIssuancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StockIssuance"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      items: Prisma.$IssuanceItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      status: $Enums.IssuanceStatus
      totalWholesaleValue: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stockIssuance"]>
    composites: {}
  }

  type StockIssuanceGetPayload<S extends boolean | null | undefined | StockIssuanceDefaultArgs> = $Result.GetResult<Prisma.$StockIssuancePayload, S>

  type StockIssuanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockIssuanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockIssuanceCountAggregateInputType | true
    }

  export interface StockIssuanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StockIssuance'], meta: { name: 'StockIssuance' } }
    /**
     * Find zero or one StockIssuance that matches the filter.
     * @param {StockIssuanceFindUniqueArgs} args - Arguments to find a StockIssuance
     * @example
     * // Get one StockIssuance
     * const stockIssuance = await prisma.stockIssuance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockIssuanceFindUniqueArgs>(args: SelectSubset<T, StockIssuanceFindUniqueArgs<ExtArgs>>): Prisma__StockIssuanceClient<$Result.GetResult<Prisma.$StockIssuancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StockIssuance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockIssuanceFindUniqueOrThrowArgs} args - Arguments to find a StockIssuance
     * @example
     * // Get one StockIssuance
     * const stockIssuance = await prisma.stockIssuance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockIssuanceFindUniqueOrThrowArgs>(args: SelectSubset<T, StockIssuanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockIssuanceClient<$Result.GetResult<Prisma.$StockIssuancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockIssuance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockIssuanceFindFirstArgs} args - Arguments to find a StockIssuance
     * @example
     * // Get one StockIssuance
     * const stockIssuance = await prisma.stockIssuance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockIssuanceFindFirstArgs>(args?: SelectSubset<T, StockIssuanceFindFirstArgs<ExtArgs>>): Prisma__StockIssuanceClient<$Result.GetResult<Prisma.$StockIssuancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockIssuance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockIssuanceFindFirstOrThrowArgs} args - Arguments to find a StockIssuance
     * @example
     * // Get one StockIssuance
     * const stockIssuance = await prisma.stockIssuance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockIssuanceFindFirstOrThrowArgs>(args?: SelectSubset<T, StockIssuanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockIssuanceClient<$Result.GetResult<Prisma.$StockIssuancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StockIssuances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockIssuanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockIssuances
     * const stockIssuances = await prisma.stockIssuance.findMany()
     * 
     * // Get first 10 StockIssuances
     * const stockIssuances = await prisma.stockIssuance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockIssuanceWithIdOnly = await prisma.stockIssuance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockIssuanceFindManyArgs>(args?: SelectSubset<T, StockIssuanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockIssuancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StockIssuance.
     * @param {StockIssuanceCreateArgs} args - Arguments to create a StockIssuance.
     * @example
     * // Create one StockIssuance
     * const StockIssuance = await prisma.stockIssuance.create({
     *   data: {
     *     // ... data to create a StockIssuance
     *   }
     * })
     * 
     */
    create<T extends StockIssuanceCreateArgs>(args: SelectSubset<T, StockIssuanceCreateArgs<ExtArgs>>): Prisma__StockIssuanceClient<$Result.GetResult<Prisma.$StockIssuancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StockIssuances.
     * @param {StockIssuanceCreateManyArgs} args - Arguments to create many StockIssuances.
     * @example
     * // Create many StockIssuances
     * const stockIssuance = await prisma.stockIssuance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockIssuanceCreateManyArgs>(args?: SelectSubset<T, StockIssuanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StockIssuances and returns the data saved in the database.
     * @param {StockIssuanceCreateManyAndReturnArgs} args - Arguments to create many StockIssuances.
     * @example
     * // Create many StockIssuances
     * const stockIssuance = await prisma.stockIssuance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StockIssuances and only return the `id`
     * const stockIssuanceWithIdOnly = await prisma.stockIssuance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockIssuanceCreateManyAndReturnArgs>(args?: SelectSubset<T, StockIssuanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockIssuancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StockIssuance.
     * @param {StockIssuanceDeleteArgs} args - Arguments to delete one StockIssuance.
     * @example
     * // Delete one StockIssuance
     * const StockIssuance = await prisma.stockIssuance.delete({
     *   where: {
     *     // ... filter to delete one StockIssuance
     *   }
     * })
     * 
     */
    delete<T extends StockIssuanceDeleteArgs>(args: SelectSubset<T, StockIssuanceDeleteArgs<ExtArgs>>): Prisma__StockIssuanceClient<$Result.GetResult<Prisma.$StockIssuancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StockIssuance.
     * @param {StockIssuanceUpdateArgs} args - Arguments to update one StockIssuance.
     * @example
     * // Update one StockIssuance
     * const stockIssuance = await prisma.stockIssuance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockIssuanceUpdateArgs>(args: SelectSubset<T, StockIssuanceUpdateArgs<ExtArgs>>): Prisma__StockIssuanceClient<$Result.GetResult<Prisma.$StockIssuancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StockIssuances.
     * @param {StockIssuanceDeleteManyArgs} args - Arguments to filter StockIssuances to delete.
     * @example
     * // Delete a few StockIssuances
     * const { count } = await prisma.stockIssuance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockIssuanceDeleteManyArgs>(args?: SelectSubset<T, StockIssuanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockIssuances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockIssuanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockIssuances
     * const stockIssuance = await prisma.stockIssuance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockIssuanceUpdateManyArgs>(args: SelectSubset<T, StockIssuanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockIssuances and returns the data updated in the database.
     * @param {StockIssuanceUpdateManyAndReturnArgs} args - Arguments to update many StockIssuances.
     * @example
     * // Update many StockIssuances
     * const stockIssuance = await prisma.stockIssuance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StockIssuances and only return the `id`
     * const stockIssuanceWithIdOnly = await prisma.stockIssuance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StockIssuanceUpdateManyAndReturnArgs>(args: SelectSubset<T, StockIssuanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockIssuancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StockIssuance.
     * @param {StockIssuanceUpsertArgs} args - Arguments to update or create a StockIssuance.
     * @example
     * // Update or create a StockIssuance
     * const stockIssuance = await prisma.stockIssuance.upsert({
     *   create: {
     *     // ... data to create a StockIssuance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockIssuance we want to update
     *   }
     * })
     */
    upsert<T extends StockIssuanceUpsertArgs>(args: SelectSubset<T, StockIssuanceUpsertArgs<ExtArgs>>): Prisma__StockIssuanceClient<$Result.GetResult<Prisma.$StockIssuancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StockIssuances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockIssuanceCountArgs} args - Arguments to filter StockIssuances to count.
     * @example
     * // Count the number of StockIssuances
     * const count = await prisma.stockIssuance.count({
     *   where: {
     *     // ... the filter for the StockIssuances we want to count
     *   }
     * })
    **/
    count<T extends StockIssuanceCountArgs>(
      args?: Subset<T, StockIssuanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockIssuanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StockIssuance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockIssuanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockIssuanceAggregateArgs>(args: Subset<T, StockIssuanceAggregateArgs>): Prisma.PrismaPromise<GetStockIssuanceAggregateType<T>>

    /**
     * Group by StockIssuance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockIssuanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockIssuanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockIssuanceGroupByArgs['orderBy'] }
        : { orderBy?: StockIssuanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockIssuanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockIssuanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StockIssuance model
   */
  readonly fields: StockIssuanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StockIssuance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockIssuanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends StockIssuance$itemsArgs<ExtArgs> = {}>(args?: Subset<T, StockIssuance$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IssuanceItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StockIssuance model
   */
  interface StockIssuanceFieldRefs {
    readonly id: FieldRef<"StockIssuance", 'String'>
    readonly userId: FieldRef<"StockIssuance", 'String'>
    readonly status: FieldRef<"StockIssuance", 'IssuanceStatus'>
    readonly totalWholesaleValue: FieldRef<"StockIssuance", 'Decimal'>
    readonly createdAt: FieldRef<"StockIssuance", 'DateTime'>
    readonly updatedAt: FieldRef<"StockIssuance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StockIssuance findUnique
   */
  export type StockIssuanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockIssuance
     */
    select?: StockIssuanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockIssuance
     */
    omit?: StockIssuanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIssuanceInclude<ExtArgs> | null
    /**
     * Filter, which StockIssuance to fetch.
     */
    where: StockIssuanceWhereUniqueInput
  }

  /**
   * StockIssuance findUniqueOrThrow
   */
  export type StockIssuanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockIssuance
     */
    select?: StockIssuanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockIssuance
     */
    omit?: StockIssuanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIssuanceInclude<ExtArgs> | null
    /**
     * Filter, which StockIssuance to fetch.
     */
    where: StockIssuanceWhereUniqueInput
  }

  /**
   * StockIssuance findFirst
   */
  export type StockIssuanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockIssuance
     */
    select?: StockIssuanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockIssuance
     */
    omit?: StockIssuanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIssuanceInclude<ExtArgs> | null
    /**
     * Filter, which StockIssuance to fetch.
     */
    where?: StockIssuanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockIssuances to fetch.
     */
    orderBy?: StockIssuanceOrderByWithRelationInput | StockIssuanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockIssuances.
     */
    cursor?: StockIssuanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockIssuances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockIssuances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockIssuances.
     */
    distinct?: StockIssuanceScalarFieldEnum | StockIssuanceScalarFieldEnum[]
  }

  /**
   * StockIssuance findFirstOrThrow
   */
  export type StockIssuanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockIssuance
     */
    select?: StockIssuanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockIssuance
     */
    omit?: StockIssuanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIssuanceInclude<ExtArgs> | null
    /**
     * Filter, which StockIssuance to fetch.
     */
    where?: StockIssuanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockIssuances to fetch.
     */
    orderBy?: StockIssuanceOrderByWithRelationInput | StockIssuanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockIssuances.
     */
    cursor?: StockIssuanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockIssuances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockIssuances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockIssuances.
     */
    distinct?: StockIssuanceScalarFieldEnum | StockIssuanceScalarFieldEnum[]
  }

  /**
   * StockIssuance findMany
   */
  export type StockIssuanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockIssuance
     */
    select?: StockIssuanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockIssuance
     */
    omit?: StockIssuanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIssuanceInclude<ExtArgs> | null
    /**
     * Filter, which StockIssuances to fetch.
     */
    where?: StockIssuanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockIssuances to fetch.
     */
    orderBy?: StockIssuanceOrderByWithRelationInput | StockIssuanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StockIssuances.
     */
    cursor?: StockIssuanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockIssuances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockIssuances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockIssuances.
     */
    distinct?: StockIssuanceScalarFieldEnum | StockIssuanceScalarFieldEnum[]
  }

  /**
   * StockIssuance create
   */
  export type StockIssuanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockIssuance
     */
    select?: StockIssuanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockIssuance
     */
    omit?: StockIssuanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIssuanceInclude<ExtArgs> | null
    /**
     * The data needed to create a StockIssuance.
     */
    data: XOR<StockIssuanceCreateInput, StockIssuanceUncheckedCreateInput>
  }

  /**
   * StockIssuance createMany
   */
  export type StockIssuanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockIssuances.
     */
    data: StockIssuanceCreateManyInput | StockIssuanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockIssuance createManyAndReturn
   */
  export type StockIssuanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockIssuance
     */
    select?: StockIssuanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockIssuance
     */
    omit?: StockIssuanceOmit<ExtArgs> | null
    /**
     * The data used to create many StockIssuances.
     */
    data: StockIssuanceCreateManyInput | StockIssuanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIssuanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockIssuance update
   */
  export type StockIssuanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockIssuance
     */
    select?: StockIssuanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockIssuance
     */
    omit?: StockIssuanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIssuanceInclude<ExtArgs> | null
    /**
     * The data needed to update a StockIssuance.
     */
    data: XOR<StockIssuanceUpdateInput, StockIssuanceUncheckedUpdateInput>
    /**
     * Choose, which StockIssuance to update.
     */
    where: StockIssuanceWhereUniqueInput
  }

  /**
   * StockIssuance updateMany
   */
  export type StockIssuanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StockIssuances.
     */
    data: XOR<StockIssuanceUpdateManyMutationInput, StockIssuanceUncheckedUpdateManyInput>
    /**
     * Filter which StockIssuances to update
     */
    where?: StockIssuanceWhereInput
    /**
     * Limit how many StockIssuances to update.
     */
    limit?: number
  }

  /**
   * StockIssuance updateManyAndReturn
   */
  export type StockIssuanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockIssuance
     */
    select?: StockIssuanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockIssuance
     */
    omit?: StockIssuanceOmit<ExtArgs> | null
    /**
     * The data used to update StockIssuances.
     */
    data: XOR<StockIssuanceUpdateManyMutationInput, StockIssuanceUncheckedUpdateManyInput>
    /**
     * Filter which StockIssuances to update
     */
    where?: StockIssuanceWhereInput
    /**
     * Limit how many StockIssuances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIssuanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockIssuance upsert
   */
  export type StockIssuanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockIssuance
     */
    select?: StockIssuanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockIssuance
     */
    omit?: StockIssuanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIssuanceInclude<ExtArgs> | null
    /**
     * The filter to search for the StockIssuance to update in case it exists.
     */
    where: StockIssuanceWhereUniqueInput
    /**
     * In case the StockIssuance found by the `where` argument doesn't exist, create a new StockIssuance with this data.
     */
    create: XOR<StockIssuanceCreateInput, StockIssuanceUncheckedCreateInput>
    /**
     * In case the StockIssuance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockIssuanceUpdateInput, StockIssuanceUncheckedUpdateInput>
  }

  /**
   * StockIssuance delete
   */
  export type StockIssuanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockIssuance
     */
    select?: StockIssuanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockIssuance
     */
    omit?: StockIssuanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIssuanceInclude<ExtArgs> | null
    /**
     * Filter which StockIssuance to delete.
     */
    where: StockIssuanceWhereUniqueInput
  }

  /**
   * StockIssuance deleteMany
   */
  export type StockIssuanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockIssuances to delete
     */
    where?: StockIssuanceWhereInput
    /**
     * Limit how many StockIssuances to delete.
     */
    limit?: number
  }

  /**
   * StockIssuance.items
   */
  export type StockIssuance$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssuanceItem
     */
    select?: IssuanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IssuanceItem
     */
    omit?: IssuanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssuanceItemInclude<ExtArgs> | null
    where?: IssuanceItemWhereInput
    orderBy?: IssuanceItemOrderByWithRelationInput | IssuanceItemOrderByWithRelationInput[]
    cursor?: IssuanceItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IssuanceItemScalarFieldEnum | IssuanceItemScalarFieldEnum[]
  }

  /**
   * StockIssuance without action
   */
  export type StockIssuanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockIssuance
     */
    select?: StockIssuanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockIssuance
     */
    omit?: StockIssuanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIssuanceInclude<ExtArgs> | null
  }


  /**
   * Model IssuanceItem
   */

  export type AggregateIssuanceItem = {
    _count: IssuanceItemCountAggregateOutputType | null
    _avg: IssuanceItemAvgAggregateOutputType | null
    _sum: IssuanceItemSumAggregateOutputType | null
    _min: IssuanceItemMinAggregateOutputType | null
    _max: IssuanceItemMaxAggregateOutputType | null
  }

  export type IssuanceItemAvgAggregateOutputType = {
    wholesalePrice: Decimal | null
    qtyIssued: number | null
    qtyRemaining: number | null
    cogsCalculated: Decimal | null
  }

  export type IssuanceItemSumAggregateOutputType = {
    wholesalePrice: Decimal | null
    qtyIssued: number | null
    qtyRemaining: number | null
    cogsCalculated: Decimal | null
  }

  export type IssuanceItemMinAggregateOutputType = {
    id: string | null
    issuanceId: string | null
    productId: string | null
    wholesalePrice: Decimal | null
    qtyIssued: number | null
    qtyRemaining: number | null
    cogsCalculated: Decimal | null
  }

  export type IssuanceItemMaxAggregateOutputType = {
    id: string | null
    issuanceId: string | null
    productId: string | null
    wholesalePrice: Decimal | null
    qtyIssued: number | null
    qtyRemaining: number | null
    cogsCalculated: Decimal | null
  }

  export type IssuanceItemCountAggregateOutputType = {
    id: number
    issuanceId: number
    productId: number
    wholesalePrice: number
    qtyIssued: number
    qtyRemaining: number
    cogsCalculated: number
    _all: number
  }


  export type IssuanceItemAvgAggregateInputType = {
    wholesalePrice?: true
    qtyIssued?: true
    qtyRemaining?: true
    cogsCalculated?: true
  }

  export type IssuanceItemSumAggregateInputType = {
    wholesalePrice?: true
    qtyIssued?: true
    qtyRemaining?: true
    cogsCalculated?: true
  }

  export type IssuanceItemMinAggregateInputType = {
    id?: true
    issuanceId?: true
    productId?: true
    wholesalePrice?: true
    qtyIssued?: true
    qtyRemaining?: true
    cogsCalculated?: true
  }

  export type IssuanceItemMaxAggregateInputType = {
    id?: true
    issuanceId?: true
    productId?: true
    wholesalePrice?: true
    qtyIssued?: true
    qtyRemaining?: true
    cogsCalculated?: true
  }

  export type IssuanceItemCountAggregateInputType = {
    id?: true
    issuanceId?: true
    productId?: true
    wholesalePrice?: true
    qtyIssued?: true
    qtyRemaining?: true
    cogsCalculated?: true
    _all?: true
  }

  export type IssuanceItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IssuanceItem to aggregate.
     */
    where?: IssuanceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IssuanceItems to fetch.
     */
    orderBy?: IssuanceItemOrderByWithRelationInput | IssuanceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IssuanceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IssuanceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IssuanceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IssuanceItems
    **/
    _count?: true | IssuanceItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IssuanceItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IssuanceItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IssuanceItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IssuanceItemMaxAggregateInputType
  }

  export type GetIssuanceItemAggregateType<T extends IssuanceItemAggregateArgs> = {
        [P in keyof T & keyof AggregateIssuanceItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIssuanceItem[P]>
      : GetScalarType<T[P], AggregateIssuanceItem[P]>
  }




  export type IssuanceItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IssuanceItemWhereInput
    orderBy?: IssuanceItemOrderByWithAggregationInput | IssuanceItemOrderByWithAggregationInput[]
    by: IssuanceItemScalarFieldEnum[] | IssuanceItemScalarFieldEnum
    having?: IssuanceItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IssuanceItemCountAggregateInputType | true
    _avg?: IssuanceItemAvgAggregateInputType
    _sum?: IssuanceItemSumAggregateInputType
    _min?: IssuanceItemMinAggregateInputType
    _max?: IssuanceItemMaxAggregateInputType
  }

  export type IssuanceItemGroupByOutputType = {
    id: string
    issuanceId: string
    productId: string
    wholesalePrice: Decimal
    qtyIssued: number
    qtyRemaining: number
    cogsCalculated: Decimal
    _count: IssuanceItemCountAggregateOutputType | null
    _avg: IssuanceItemAvgAggregateOutputType | null
    _sum: IssuanceItemSumAggregateOutputType | null
    _min: IssuanceItemMinAggregateOutputType | null
    _max: IssuanceItemMaxAggregateOutputType | null
  }

  type GetIssuanceItemGroupByPayload<T extends IssuanceItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IssuanceItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IssuanceItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IssuanceItemGroupByOutputType[P]>
            : GetScalarType<T[P], IssuanceItemGroupByOutputType[P]>
        }
      >
    >


  export type IssuanceItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    issuanceId?: boolean
    productId?: boolean
    wholesalePrice?: boolean
    qtyIssued?: boolean
    qtyRemaining?: boolean
    cogsCalculated?: boolean
    issuance?: boolean | StockIssuanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["issuanceItem"]>

  export type IssuanceItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    issuanceId?: boolean
    productId?: boolean
    wholesalePrice?: boolean
    qtyIssued?: boolean
    qtyRemaining?: boolean
    cogsCalculated?: boolean
    issuance?: boolean | StockIssuanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["issuanceItem"]>

  export type IssuanceItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    issuanceId?: boolean
    productId?: boolean
    wholesalePrice?: boolean
    qtyIssued?: boolean
    qtyRemaining?: boolean
    cogsCalculated?: boolean
    issuance?: boolean | StockIssuanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["issuanceItem"]>

  export type IssuanceItemSelectScalar = {
    id?: boolean
    issuanceId?: boolean
    productId?: boolean
    wholesalePrice?: boolean
    qtyIssued?: boolean
    qtyRemaining?: boolean
    cogsCalculated?: boolean
  }

  export type IssuanceItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "issuanceId" | "productId" | "wholesalePrice" | "qtyIssued" | "qtyRemaining" | "cogsCalculated", ExtArgs["result"]["issuanceItem"]>
  export type IssuanceItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    issuance?: boolean | StockIssuanceDefaultArgs<ExtArgs>
  }
  export type IssuanceItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    issuance?: boolean | StockIssuanceDefaultArgs<ExtArgs>
  }
  export type IssuanceItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    issuance?: boolean | StockIssuanceDefaultArgs<ExtArgs>
  }

  export type $IssuanceItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IssuanceItem"
    objects: {
      issuance: Prisma.$StockIssuancePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      issuanceId: string
      productId: string
      wholesalePrice: Prisma.Decimal
      qtyIssued: number
      qtyRemaining: number
      cogsCalculated: Prisma.Decimal
    }, ExtArgs["result"]["issuanceItem"]>
    composites: {}
  }

  type IssuanceItemGetPayload<S extends boolean | null | undefined | IssuanceItemDefaultArgs> = $Result.GetResult<Prisma.$IssuanceItemPayload, S>

  type IssuanceItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IssuanceItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IssuanceItemCountAggregateInputType | true
    }

  export interface IssuanceItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IssuanceItem'], meta: { name: 'IssuanceItem' } }
    /**
     * Find zero or one IssuanceItem that matches the filter.
     * @param {IssuanceItemFindUniqueArgs} args - Arguments to find a IssuanceItem
     * @example
     * // Get one IssuanceItem
     * const issuanceItem = await prisma.issuanceItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IssuanceItemFindUniqueArgs>(args: SelectSubset<T, IssuanceItemFindUniqueArgs<ExtArgs>>): Prisma__IssuanceItemClient<$Result.GetResult<Prisma.$IssuanceItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IssuanceItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IssuanceItemFindUniqueOrThrowArgs} args - Arguments to find a IssuanceItem
     * @example
     * // Get one IssuanceItem
     * const issuanceItem = await prisma.issuanceItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IssuanceItemFindUniqueOrThrowArgs>(args: SelectSubset<T, IssuanceItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IssuanceItemClient<$Result.GetResult<Prisma.$IssuanceItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IssuanceItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssuanceItemFindFirstArgs} args - Arguments to find a IssuanceItem
     * @example
     * // Get one IssuanceItem
     * const issuanceItem = await prisma.issuanceItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IssuanceItemFindFirstArgs>(args?: SelectSubset<T, IssuanceItemFindFirstArgs<ExtArgs>>): Prisma__IssuanceItemClient<$Result.GetResult<Prisma.$IssuanceItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IssuanceItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssuanceItemFindFirstOrThrowArgs} args - Arguments to find a IssuanceItem
     * @example
     * // Get one IssuanceItem
     * const issuanceItem = await prisma.issuanceItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IssuanceItemFindFirstOrThrowArgs>(args?: SelectSubset<T, IssuanceItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__IssuanceItemClient<$Result.GetResult<Prisma.$IssuanceItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IssuanceItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssuanceItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IssuanceItems
     * const issuanceItems = await prisma.issuanceItem.findMany()
     * 
     * // Get first 10 IssuanceItems
     * const issuanceItems = await prisma.issuanceItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const issuanceItemWithIdOnly = await prisma.issuanceItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IssuanceItemFindManyArgs>(args?: SelectSubset<T, IssuanceItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IssuanceItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IssuanceItem.
     * @param {IssuanceItemCreateArgs} args - Arguments to create a IssuanceItem.
     * @example
     * // Create one IssuanceItem
     * const IssuanceItem = await prisma.issuanceItem.create({
     *   data: {
     *     // ... data to create a IssuanceItem
     *   }
     * })
     * 
     */
    create<T extends IssuanceItemCreateArgs>(args: SelectSubset<T, IssuanceItemCreateArgs<ExtArgs>>): Prisma__IssuanceItemClient<$Result.GetResult<Prisma.$IssuanceItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IssuanceItems.
     * @param {IssuanceItemCreateManyArgs} args - Arguments to create many IssuanceItems.
     * @example
     * // Create many IssuanceItems
     * const issuanceItem = await prisma.issuanceItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IssuanceItemCreateManyArgs>(args?: SelectSubset<T, IssuanceItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IssuanceItems and returns the data saved in the database.
     * @param {IssuanceItemCreateManyAndReturnArgs} args - Arguments to create many IssuanceItems.
     * @example
     * // Create many IssuanceItems
     * const issuanceItem = await prisma.issuanceItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IssuanceItems and only return the `id`
     * const issuanceItemWithIdOnly = await prisma.issuanceItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IssuanceItemCreateManyAndReturnArgs>(args?: SelectSubset<T, IssuanceItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IssuanceItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IssuanceItem.
     * @param {IssuanceItemDeleteArgs} args - Arguments to delete one IssuanceItem.
     * @example
     * // Delete one IssuanceItem
     * const IssuanceItem = await prisma.issuanceItem.delete({
     *   where: {
     *     // ... filter to delete one IssuanceItem
     *   }
     * })
     * 
     */
    delete<T extends IssuanceItemDeleteArgs>(args: SelectSubset<T, IssuanceItemDeleteArgs<ExtArgs>>): Prisma__IssuanceItemClient<$Result.GetResult<Prisma.$IssuanceItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IssuanceItem.
     * @param {IssuanceItemUpdateArgs} args - Arguments to update one IssuanceItem.
     * @example
     * // Update one IssuanceItem
     * const issuanceItem = await prisma.issuanceItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IssuanceItemUpdateArgs>(args: SelectSubset<T, IssuanceItemUpdateArgs<ExtArgs>>): Prisma__IssuanceItemClient<$Result.GetResult<Prisma.$IssuanceItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IssuanceItems.
     * @param {IssuanceItemDeleteManyArgs} args - Arguments to filter IssuanceItems to delete.
     * @example
     * // Delete a few IssuanceItems
     * const { count } = await prisma.issuanceItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IssuanceItemDeleteManyArgs>(args?: SelectSubset<T, IssuanceItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IssuanceItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssuanceItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IssuanceItems
     * const issuanceItem = await prisma.issuanceItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IssuanceItemUpdateManyArgs>(args: SelectSubset<T, IssuanceItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IssuanceItems and returns the data updated in the database.
     * @param {IssuanceItemUpdateManyAndReturnArgs} args - Arguments to update many IssuanceItems.
     * @example
     * // Update many IssuanceItems
     * const issuanceItem = await prisma.issuanceItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IssuanceItems and only return the `id`
     * const issuanceItemWithIdOnly = await prisma.issuanceItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IssuanceItemUpdateManyAndReturnArgs>(args: SelectSubset<T, IssuanceItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IssuanceItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IssuanceItem.
     * @param {IssuanceItemUpsertArgs} args - Arguments to update or create a IssuanceItem.
     * @example
     * // Update or create a IssuanceItem
     * const issuanceItem = await prisma.issuanceItem.upsert({
     *   create: {
     *     // ... data to create a IssuanceItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IssuanceItem we want to update
     *   }
     * })
     */
    upsert<T extends IssuanceItemUpsertArgs>(args: SelectSubset<T, IssuanceItemUpsertArgs<ExtArgs>>): Prisma__IssuanceItemClient<$Result.GetResult<Prisma.$IssuanceItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IssuanceItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssuanceItemCountArgs} args - Arguments to filter IssuanceItems to count.
     * @example
     * // Count the number of IssuanceItems
     * const count = await prisma.issuanceItem.count({
     *   where: {
     *     // ... the filter for the IssuanceItems we want to count
     *   }
     * })
    **/
    count<T extends IssuanceItemCountArgs>(
      args?: Subset<T, IssuanceItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IssuanceItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IssuanceItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssuanceItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IssuanceItemAggregateArgs>(args: Subset<T, IssuanceItemAggregateArgs>): Prisma.PrismaPromise<GetIssuanceItemAggregateType<T>>

    /**
     * Group by IssuanceItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssuanceItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IssuanceItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IssuanceItemGroupByArgs['orderBy'] }
        : { orderBy?: IssuanceItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IssuanceItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIssuanceItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IssuanceItem model
   */
  readonly fields: IssuanceItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IssuanceItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IssuanceItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    issuance<T extends StockIssuanceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockIssuanceDefaultArgs<ExtArgs>>): Prisma__StockIssuanceClient<$Result.GetResult<Prisma.$StockIssuancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IssuanceItem model
   */
  interface IssuanceItemFieldRefs {
    readonly id: FieldRef<"IssuanceItem", 'String'>
    readonly issuanceId: FieldRef<"IssuanceItem", 'String'>
    readonly productId: FieldRef<"IssuanceItem", 'String'>
    readonly wholesalePrice: FieldRef<"IssuanceItem", 'Decimal'>
    readonly qtyIssued: FieldRef<"IssuanceItem", 'Int'>
    readonly qtyRemaining: FieldRef<"IssuanceItem", 'Int'>
    readonly cogsCalculated: FieldRef<"IssuanceItem", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * IssuanceItem findUnique
   */
  export type IssuanceItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssuanceItem
     */
    select?: IssuanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IssuanceItem
     */
    omit?: IssuanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssuanceItemInclude<ExtArgs> | null
    /**
     * Filter, which IssuanceItem to fetch.
     */
    where: IssuanceItemWhereUniqueInput
  }

  /**
   * IssuanceItem findUniqueOrThrow
   */
  export type IssuanceItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssuanceItem
     */
    select?: IssuanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IssuanceItem
     */
    omit?: IssuanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssuanceItemInclude<ExtArgs> | null
    /**
     * Filter, which IssuanceItem to fetch.
     */
    where: IssuanceItemWhereUniqueInput
  }

  /**
   * IssuanceItem findFirst
   */
  export type IssuanceItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssuanceItem
     */
    select?: IssuanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IssuanceItem
     */
    omit?: IssuanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssuanceItemInclude<ExtArgs> | null
    /**
     * Filter, which IssuanceItem to fetch.
     */
    where?: IssuanceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IssuanceItems to fetch.
     */
    orderBy?: IssuanceItemOrderByWithRelationInput | IssuanceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IssuanceItems.
     */
    cursor?: IssuanceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IssuanceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IssuanceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IssuanceItems.
     */
    distinct?: IssuanceItemScalarFieldEnum | IssuanceItemScalarFieldEnum[]
  }

  /**
   * IssuanceItem findFirstOrThrow
   */
  export type IssuanceItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssuanceItem
     */
    select?: IssuanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IssuanceItem
     */
    omit?: IssuanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssuanceItemInclude<ExtArgs> | null
    /**
     * Filter, which IssuanceItem to fetch.
     */
    where?: IssuanceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IssuanceItems to fetch.
     */
    orderBy?: IssuanceItemOrderByWithRelationInput | IssuanceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IssuanceItems.
     */
    cursor?: IssuanceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IssuanceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IssuanceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IssuanceItems.
     */
    distinct?: IssuanceItemScalarFieldEnum | IssuanceItemScalarFieldEnum[]
  }

  /**
   * IssuanceItem findMany
   */
  export type IssuanceItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssuanceItem
     */
    select?: IssuanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IssuanceItem
     */
    omit?: IssuanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssuanceItemInclude<ExtArgs> | null
    /**
     * Filter, which IssuanceItems to fetch.
     */
    where?: IssuanceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IssuanceItems to fetch.
     */
    orderBy?: IssuanceItemOrderByWithRelationInput | IssuanceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IssuanceItems.
     */
    cursor?: IssuanceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IssuanceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IssuanceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IssuanceItems.
     */
    distinct?: IssuanceItemScalarFieldEnum | IssuanceItemScalarFieldEnum[]
  }

  /**
   * IssuanceItem create
   */
  export type IssuanceItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssuanceItem
     */
    select?: IssuanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IssuanceItem
     */
    omit?: IssuanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssuanceItemInclude<ExtArgs> | null
    /**
     * The data needed to create a IssuanceItem.
     */
    data: XOR<IssuanceItemCreateInput, IssuanceItemUncheckedCreateInput>
  }

  /**
   * IssuanceItem createMany
   */
  export type IssuanceItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IssuanceItems.
     */
    data: IssuanceItemCreateManyInput | IssuanceItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IssuanceItem createManyAndReturn
   */
  export type IssuanceItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssuanceItem
     */
    select?: IssuanceItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IssuanceItem
     */
    omit?: IssuanceItemOmit<ExtArgs> | null
    /**
     * The data used to create many IssuanceItems.
     */
    data: IssuanceItemCreateManyInput | IssuanceItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssuanceItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * IssuanceItem update
   */
  export type IssuanceItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssuanceItem
     */
    select?: IssuanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IssuanceItem
     */
    omit?: IssuanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssuanceItemInclude<ExtArgs> | null
    /**
     * The data needed to update a IssuanceItem.
     */
    data: XOR<IssuanceItemUpdateInput, IssuanceItemUncheckedUpdateInput>
    /**
     * Choose, which IssuanceItem to update.
     */
    where: IssuanceItemWhereUniqueInput
  }

  /**
   * IssuanceItem updateMany
   */
  export type IssuanceItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IssuanceItems.
     */
    data: XOR<IssuanceItemUpdateManyMutationInput, IssuanceItemUncheckedUpdateManyInput>
    /**
     * Filter which IssuanceItems to update
     */
    where?: IssuanceItemWhereInput
    /**
     * Limit how many IssuanceItems to update.
     */
    limit?: number
  }

  /**
   * IssuanceItem updateManyAndReturn
   */
  export type IssuanceItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssuanceItem
     */
    select?: IssuanceItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IssuanceItem
     */
    omit?: IssuanceItemOmit<ExtArgs> | null
    /**
     * The data used to update IssuanceItems.
     */
    data: XOR<IssuanceItemUpdateManyMutationInput, IssuanceItemUncheckedUpdateManyInput>
    /**
     * Filter which IssuanceItems to update
     */
    where?: IssuanceItemWhereInput
    /**
     * Limit how many IssuanceItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssuanceItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * IssuanceItem upsert
   */
  export type IssuanceItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssuanceItem
     */
    select?: IssuanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IssuanceItem
     */
    omit?: IssuanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssuanceItemInclude<ExtArgs> | null
    /**
     * The filter to search for the IssuanceItem to update in case it exists.
     */
    where: IssuanceItemWhereUniqueInput
    /**
     * In case the IssuanceItem found by the `where` argument doesn't exist, create a new IssuanceItem with this data.
     */
    create: XOR<IssuanceItemCreateInput, IssuanceItemUncheckedCreateInput>
    /**
     * In case the IssuanceItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IssuanceItemUpdateInput, IssuanceItemUncheckedUpdateInput>
  }

  /**
   * IssuanceItem delete
   */
  export type IssuanceItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssuanceItem
     */
    select?: IssuanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IssuanceItem
     */
    omit?: IssuanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssuanceItemInclude<ExtArgs> | null
    /**
     * Filter which IssuanceItem to delete.
     */
    where: IssuanceItemWhereUniqueInput
  }

  /**
   * IssuanceItem deleteMany
   */
  export type IssuanceItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IssuanceItems to delete
     */
    where?: IssuanceItemWhereInput
    /**
     * Limit how many IssuanceItems to delete.
     */
    limit?: number
  }

  /**
   * IssuanceItem without action
   */
  export type IssuanceItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssuanceItem
     */
    select?: IssuanceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IssuanceItem
     */
    omit?: IssuanceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssuanceItemInclude<ExtArgs> | null
  }


  /**
   * Model Sale
   */

  export type AggregateSale = {
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  export type SaleAvgAggregateOutputType = {
    quantity: number | null
    totalAmount: Decimal | null
  }

  export type SaleSumAggregateOutputType = {
    quantity: number | null
    totalAmount: Decimal | null
  }

  export type SaleMinAggregateOutputType = {
    id: string | null
    salesRepId: string | null
    retailerId: string | null
    productId: string | null
    quantity: number | null
    totalAmount: Decimal | null
    paymentMethod: string | null
    createdAt: Date | null
  }

  export type SaleMaxAggregateOutputType = {
    id: string | null
    salesRepId: string | null
    retailerId: string | null
    productId: string | null
    quantity: number | null
    totalAmount: Decimal | null
    paymentMethod: string | null
    createdAt: Date | null
  }

  export type SaleCountAggregateOutputType = {
    id: number
    salesRepId: number
    retailerId: number
    productId: number
    quantity: number
    totalAmount: number
    paymentMethod: number
    createdAt: number
    _all: number
  }


  export type SaleAvgAggregateInputType = {
    quantity?: true
    totalAmount?: true
  }

  export type SaleSumAggregateInputType = {
    quantity?: true
    totalAmount?: true
  }

  export type SaleMinAggregateInputType = {
    id?: true
    salesRepId?: true
    retailerId?: true
    productId?: true
    quantity?: true
    totalAmount?: true
    paymentMethod?: true
    createdAt?: true
  }

  export type SaleMaxAggregateInputType = {
    id?: true
    salesRepId?: true
    retailerId?: true
    productId?: true
    quantity?: true
    totalAmount?: true
    paymentMethod?: true
    createdAt?: true
  }

  export type SaleCountAggregateInputType = {
    id?: true
    salesRepId?: true
    retailerId?: true
    productId?: true
    quantity?: true
    totalAmount?: true
    paymentMethod?: true
    createdAt?: true
    _all?: true
  }

  export type SaleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sale to aggregate.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sales
    **/
    _count?: true | SaleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SaleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SaleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleMaxAggregateInputType
  }

  export type GetSaleAggregateType<T extends SaleAggregateArgs> = {
        [P in keyof T & keyof AggregateSale]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSale[P]>
      : GetScalarType<T[P], AggregateSale[P]>
  }




  export type SaleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithAggregationInput | SaleOrderByWithAggregationInput[]
    by: SaleScalarFieldEnum[] | SaleScalarFieldEnum
    having?: SaleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleCountAggregateInputType | true
    _avg?: SaleAvgAggregateInputType
    _sum?: SaleSumAggregateInputType
    _min?: SaleMinAggregateInputType
    _max?: SaleMaxAggregateInputType
  }

  export type SaleGroupByOutputType = {
    id: string
    salesRepId: string
    retailerId: string
    productId: string
    quantity: number
    totalAmount: Decimal
    paymentMethod: string
    createdAt: Date
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  type GetSaleGroupByPayload<T extends SaleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleGroupByOutputType[P]>
            : GetScalarType<T[P], SaleGroupByOutputType[P]>
        }
      >
    >


  export type SaleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    salesRepId?: boolean
    retailerId?: boolean
    productId?: boolean
    quantity?: boolean
    totalAmount?: boolean
    paymentMethod?: boolean
    createdAt?: boolean
    salesRep?: boolean | UserDefaultArgs<ExtArgs>
    retailer?: boolean | RetailerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    salesRepId?: boolean
    retailerId?: boolean
    productId?: boolean
    quantity?: boolean
    totalAmount?: boolean
    paymentMethod?: boolean
    createdAt?: boolean
    salesRep?: boolean | UserDefaultArgs<ExtArgs>
    retailer?: boolean | RetailerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    salesRepId?: boolean
    retailerId?: boolean
    productId?: boolean
    quantity?: boolean
    totalAmount?: boolean
    paymentMethod?: boolean
    createdAt?: boolean
    salesRep?: boolean | UserDefaultArgs<ExtArgs>
    retailer?: boolean | RetailerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectScalar = {
    id?: boolean
    salesRepId?: boolean
    retailerId?: boolean
    productId?: boolean
    quantity?: boolean
    totalAmount?: boolean
    paymentMethod?: boolean
    createdAt?: boolean
  }

  export type SaleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "salesRepId" | "retailerId" | "productId" | "quantity" | "totalAmount" | "paymentMethod" | "createdAt", ExtArgs["result"]["sale"]>
  export type SaleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    salesRep?: boolean | UserDefaultArgs<ExtArgs>
    retailer?: boolean | RetailerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type SaleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    salesRep?: boolean | UserDefaultArgs<ExtArgs>
    retailer?: boolean | RetailerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type SaleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    salesRep?: boolean | UserDefaultArgs<ExtArgs>
    retailer?: boolean | RetailerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $SalePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sale"
    objects: {
      salesRep: Prisma.$UserPayload<ExtArgs>
      retailer: Prisma.$RetailerPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      salesRepId: string
      retailerId: string
      productId: string
      quantity: number
      totalAmount: Prisma.Decimal
      paymentMethod: string
      createdAt: Date
    }, ExtArgs["result"]["sale"]>
    composites: {}
  }

  type SaleGetPayload<S extends boolean | null | undefined | SaleDefaultArgs> = $Result.GetResult<Prisma.$SalePayload, S>

  type SaleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SaleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SaleCountAggregateInputType | true
    }

  export interface SaleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sale'], meta: { name: 'Sale' } }
    /**
     * Find zero or one Sale that matches the filter.
     * @param {SaleFindUniqueArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleFindUniqueArgs>(args: SelectSubset<T, SaleFindUniqueArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sale that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SaleFindUniqueOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleFindUniqueOrThrowArgs>(args: SelectSubset<T, SaleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sale that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleFindFirstArgs>(args?: SelectSubset<T, SaleFindFirstArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sale that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleFindFirstOrThrowArgs>(args?: SelectSubset<T, SaleFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sales that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sales
     * const sales = await prisma.sale.findMany()
     * 
     * // Get first 10 Sales
     * const sales = await prisma.sale.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const saleWithIdOnly = await prisma.sale.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SaleFindManyArgs>(args?: SelectSubset<T, SaleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sale.
     * @param {SaleCreateArgs} args - Arguments to create a Sale.
     * @example
     * // Create one Sale
     * const Sale = await prisma.sale.create({
     *   data: {
     *     // ... data to create a Sale
     *   }
     * })
     * 
     */
    create<T extends SaleCreateArgs>(args: SelectSubset<T, SaleCreateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sales.
     * @param {SaleCreateManyArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaleCreateManyArgs>(args?: SelectSubset<T, SaleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sales and returns the data saved in the database.
     * @param {SaleCreateManyAndReturnArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sales and only return the `id`
     * const saleWithIdOnly = await prisma.sale.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SaleCreateManyAndReturnArgs>(args?: SelectSubset<T, SaleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sale.
     * @param {SaleDeleteArgs} args - Arguments to delete one Sale.
     * @example
     * // Delete one Sale
     * const Sale = await prisma.sale.delete({
     *   where: {
     *     // ... filter to delete one Sale
     *   }
     * })
     * 
     */
    delete<T extends SaleDeleteArgs>(args: SelectSubset<T, SaleDeleteArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sale.
     * @param {SaleUpdateArgs} args - Arguments to update one Sale.
     * @example
     * // Update one Sale
     * const sale = await prisma.sale.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaleUpdateArgs>(args: SelectSubset<T, SaleUpdateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sales.
     * @param {SaleDeleteManyArgs} args - Arguments to filter Sales to delete.
     * @example
     * // Delete a few Sales
     * const { count } = await prisma.sale.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaleDeleteManyArgs>(args?: SelectSubset<T, SaleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sales
     * const sale = await prisma.sale.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaleUpdateManyArgs>(args: SelectSubset<T, SaleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales and returns the data updated in the database.
     * @param {SaleUpdateManyAndReturnArgs} args - Arguments to update many Sales.
     * @example
     * // Update many Sales
     * const sale = await prisma.sale.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sales and only return the `id`
     * const saleWithIdOnly = await prisma.sale.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SaleUpdateManyAndReturnArgs>(args: SelectSubset<T, SaleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sale.
     * @param {SaleUpsertArgs} args - Arguments to update or create a Sale.
     * @example
     * // Update or create a Sale
     * const sale = await prisma.sale.upsert({
     *   create: {
     *     // ... data to create a Sale
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sale we want to update
     *   }
     * })
     */
    upsert<T extends SaleUpsertArgs>(args: SelectSubset<T, SaleUpsertArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleCountArgs} args - Arguments to filter Sales to count.
     * @example
     * // Count the number of Sales
     * const count = await prisma.sale.count({
     *   where: {
     *     // ... the filter for the Sales we want to count
     *   }
     * })
    **/
    count<T extends SaleCountArgs>(
      args?: Subset<T, SaleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SaleAggregateArgs>(args: Subset<T, SaleAggregateArgs>): Prisma.PrismaPromise<GetSaleAggregateType<T>>

    /**
     * Group by Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SaleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaleGroupByArgs['orderBy'] }
        : { orderBy?: SaleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SaleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sale model
   */
  readonly fields: SaleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sale.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    salesRep<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    retailer<T extends RetailerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RetailerDefaultArgs<ExtArgs>>): Prisma__RetailerClient<$Result.GetResult<Prisma.$RetailerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sale model
   */
  interface SaleFieldRefs {
    readonly id: FieldRef<"Sale", 'String'>
    readonly salesRepId: FieldRef<"Sale", 'String'>
    readonly retailerId: FieldRef<"Sale", 'String'>
    readonly productId: FieldRef<"Sale", 'String'>
    readonly quantity: FieldRef<"Sale", 'Int'>
    readonly totalAmount: FieldRef<"Sale", 'Decimal'>
    readonly paymentMethod: FieldRef<"Sale", 'String'>
    readonly createdAt: FieldRef<"Sale", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Sale findUnique
   */
  export type SaleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findUniqueOrThrow
   */
  export type SaleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findFirst
   */
  export type SaleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findFirstOrThrow
   */
  export type SaleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findMany
   */
  export type SaleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sales to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale create
   */
  export type SaleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to create a Sale.
     */
    data: XOR<SaleCreateInput, SaleUncheckedCreateInput>
  }

  /**
   * Sale createMany
   */
  export type SaleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sale createManyAndReturn
   */
  export type SaleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sale update
   */
  export type SaleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to update a Sale.
     */
    data: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
    /**
     * Choose, which Sale to update.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale updateMany
   */
  export type SaleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sales.
     */
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyInput>
    /**
     * Filter which Sales to update
     */
    where?: SaleWhereInput
    /**
     * Limit how many Sales to update.
     */
    limit?: number
  }

  /**
   * Sale updateManyAndReturn
   */
  export type SaleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * The data used to update Sales.
     */
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyInput>
    /**
     * Filter which Sales to update
     */
    where?: SaleWhereInput
    /**
     * Limit how many Sales to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sale upsert
   */
  export type SaleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The filter to search for the Sale to update in case it exists.
     */
    where: SaleWhereUniqueInput
    /**
     * In case the Sale found by the `where` argument doesn't exist, create a new Sale with this data.
     */
    create: XOR<SaleCreateInput, SaleUncheckedCreateInput>
    /**
     * In case the Sale was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
  }

  /**
   * Sale delete
   */
  export type SaleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter which Sale to delete.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale deleteMany
   */
  export type SaleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sales to delete
     */
    where?: SaleWhereInput
    /**
     * Limit how many Sales to delete.
     */
    limit?: number
  }

  /**
   * Sale without action
   */
  export type SaleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
  }


  /**
   * Model PaymentProof
   */

  export type AggregatePaymentProof = {
    _count: PaymentProofCountAggregateOutputType | null
    _avg: PaymentProofAvgAggregateOutputType | null
    _sum: PaymentProofSumAggregateOutputType | null
    _min: PaymentProofMinAggregateOutputType | null
    _max: PaymentProofMaxAggregateOutputType | null
  }

  export type PaymentProofAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentProofSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentProofMinAggregateOutputType = {
    id: string | null
    userId: string | null
    transactionRedId: string | null
    sha256Hash: string | null
    amount: Decimal | null
    bankName: string | null
    senderName: string | null
    reasonRemark: string | null
    receipeImageUrl: string | null
    status: $Enums.ProofStatus | null
    adminRemark: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentProofMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    transactionRedId: string | null
    sha256Hash: string | null
    amount: Decimal | null
    bankName: string | null
    senderName: string | null
    reasonRemark: string | null
    receipeImageUrl: string | null
    status: $Enums.ProofStatus | null
    adminRemark: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentProofCountAggregateOutputType = {
    id: number
    userId: number
    transactionRedId: number
    sha256Hash: number
    amount: number
    bankName: number
    senderName: number
    reasonRemark: number
    receipeImageUrl: number
    status: number
    adminRemark: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentProofAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentProofSumAggregateInputType = {
    amount?: true
  }

  export type PaymentProofMinAggregateInputType = {
    id?: true
    userId?: true
    transactionRedId?: true
    sha256Hash?: true
    amount?: true
    bankName?: true
    senderName?: true
    reasonRemark?: true
    receipeImageUrl?: true
    status?: true
    adminRemark?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentProofMaxAggregateInputType = {
    id?: true
    userId?: true
    transactionRedId?: true
    sha256Hash?: true
    amount?: true
    bankName?: true
    senderName?: true
    reasonRemark?: true
    receipeImageUrl?: true
    status?: true
    adminRemark?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentProofCountAggregateInputType = {
    id?: true
    userId?: true
    transactionRedId?: true
    sha256Hash?: true
    amount?: true
    bankName?: true
    senderName?: true
    reasonRemark?: true
    receipeImageUrl?: true
    status?: true
    adminRemark?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentProofAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentProof to aggregate.
     */
    where?: PaymentProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentProofs to fetch.
     */
    orderBy?: PaymentProofOrderByWithRelationInput | PaymentProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentProofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentProofs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentProofs
    **/
    _count?: true | PaymentProofCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentProofAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentProofSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentProofMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentProofMaxAggregateInputType
  }

  export type GetPaymentProofAggregateType<T extends PaymentProofAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentProof]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentProof[P]>
      : GetScalarType<T[P], AggregatePaymentProof[P]>
  }




  export type PaymentProofGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentProofWhereInput
    orderBy?: PaymentProofOrderByWithAggregationInput | PaymentProofOrderByWithAggregationInput[]
    by: PaymentProofScalarFieldEnum[] | PaymentProofScalarFieldEnum
    having?: PaymentProofScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentProofCountAggregateInputType | true
    _avg?: PaymentProofAvgAggregateInputType
    _sum?: PaymentProofSumAggregateInputType
    _min?: PaymentProofMinAggregateInputType
    _max?: PaymentProofMaxAggregateInputType
  }

  export type PaymentProofGroupByOutputType = {
    id: string
    userId: string
    transactionRedId: string
    sha256Hash: string
    amount: Decimal
    bankName: string
    senderName: string | null
    reasonRemark: string | null
    receipeImageUrl: string | null
    status: $Enums.ProofStatus
    adminRemark: string | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentProofCountAggregateOutputType | null
    _avg: PaymentProofAvgAggregateOutputType | null
    _sum: PaymentProofSumAggregateOutputType | null
    _min: PaymentProofMinAggregateOutputType | null
    _max: PaymentProofMaxAggregateOutputType | null
  }

  type GetPaymentProofGroupByPayload<T extends PaymentProofGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentProofGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentProofGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentProofGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentProofGroupByOutputType[P]>
        }
      >
    >


  export type PaymentProofSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    transactionRedId?: boolean
    sha256Hash?: boolean
    amount?: boolean
    bankName?: boolean
    senderName?: boolean
    reasonRemark?: boolean
    receipeImageUrl?: boolean
    status?: boolean
    adminRemark?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentProof"]>

  export type PaymentProofSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    transactionRedId?: boolean
    sha256Hash?: boolean
    amount?: boolean
    bankName?: boolean
    senderName?: boolean
    reasonRemark?: boolean
    receipeImageUrl?: boolean
    status?: boolean
    adminRemark?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentProof"]>

  export type PaymentProofSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    transactionRedId?: boolean
    sha256Hash?: boolean
    amount?: boolean
    bankName?: boolean
    senderName?: boolean
    reasonRemark?: boolean
    receipeImageUrl?: boolean
    status?: boolean
    adminRemark?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentProof"]>

  export type PaymentProofSelectScalar = {
    id?: boolean
    userId?: boolean
    transactionRedId?: boolean
    sha256Hash?: boolean
    amount?: boolean
    bankName?: boolean
    senderName?: boolean
    reasonRemark?: boolean
    receipeImageUrl?: boolean
    status?: boolean
    adminRemark?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentProofOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "transactionRedId" | "sha256Hash" | "amount" | "bankName" | "senderName" | "reasonRemark" | "receipeImageUrl" | "status" | "adminRemark" | "createdAt" | "updatedAt", ExtArgs["result"]["paymentProof"]>
  export type PaymentProofInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PaymentProofIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PaymentProofIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PaymentProofPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentProof"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      transactionRedId: string
      sha256Hash: string
      amount: Prisma.Decimal
      bankName: string
      senderName: string | null
      reasonRemark: string | null
      receipeImageUrl: string | null
      status: $Enums.ProofStatus
      adminRemark: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["paymentProof"]>
    composites: {}
  }

  type PaymentProofGetPayload<S extends boolean | null | undefined | PaymentProofDefaultArgs> = $Result.GetResult<Prisma.$PaymentProofPayload, S>

  type PaymentProofCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentProofFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentProofCountAggregateInputType | true
    }

  export interface PaymentProofDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentProof'], meta: { name: 'PaymentProof' } }
    /**
     * Find zero or one PaymentProof that matches the filter.
     * @param {PaymentProofFindUniqueArgs} args - Arguments to find a PaymentProof
     * @example
     * // Get one PaymentProof
     * const paymentProof = await prisma.paymentProof.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentProofFindUniqueArgs>(args: SelectSubset<T, PaymentProofFindUniqueArgs<ExtArgs>>): Prisma__PaymentProofClient<$Result.GetResult<Prisma.$PaymentProofPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentProof that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentProofFindUniqueOrThrowArgs} args - Arguments to find a PaymentProof
     * @example
     * // Get one PaymentProof
     * const paymentProof = await prisma.paymentProof.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentProofFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentProofFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentProofClient<$Result.GetResult<Prisma.$PaymentProofPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentProof that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProofFindFirstArgs} args - Arguments to find a PaymentProof
     * @example
     * // Get one PaymentProof
     * const paymentProof = await prisma.paymentProof.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentProofFindFirstArgs>(args?: SelectSubset<T, PaymentProofFindFirstArgs<ExtArgs>>): Prisma__PaymentProofClient<$Result.GetResult<Prisma.$PaymentProofPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentProof that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProofFindFirstOrThrowArgs} args - Arguments to find a PaymentProof
     * @example
     * // Get one PaymentProof
     * const paymentProof = await prisma.paymentProof.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentProofFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentProofFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentProofClient<$Result.GetResult<Prisma.$PaymentProofPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentProofs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProofFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentProofs
     * const paymentProofs = await prisma.paymentProof.findMany()
     * 
     * // Get first 10 PaymentProofs
     * const paymentProofs = await prisma.paymentProof.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentProofWithIdOnly = await prisma.paymentProof.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentProofFindManyArgs>(args?: SelectSubset<T, PaymentProofFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentProofPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentProof.
     * @param {PaymentProofCreateArgs} args - Arguments to create a PaymentProof.
     * @example
     * // Create one PaymentProof
     * const PaymentProof = await prisma.paymentProof.create({
     *   data: {
     *     // ... data to create a PaymentProof
     *   }
     * })
     * 
     */
    create<T extends PaymentProofCreateArgs>(args: SelectSubset<T, PaymentProofCreateArgs<ExtArgs>>): Prisma__PaymentProofClient<$Result.GetResult<Prisma.$PaymentProofPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentProofs.
     * @param {PaymentProofCreateManyArgs} args - Arguments to create many PaymentProofs.
     * @example
     * // Create many PaymentProofs
     * const paymentProof = await prisma.paymentProof.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentProofCreateManyArgs>(args?: SelectSubset<T, PaymentProofCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentProofs and returns the data saved in the database.
     * @param {PaymentProofCreateManyAndReturnArgs} args - Arguments to create many PaymentProofs.
     * @example
     * // Create many PaymentProofs
     * const paymentProof = await prisma.paymentProof.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentProofs and only return the `id`
     * const paymentProofWithIdOnly = await prisma.paymentProof.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentProofCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentProofCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentProofPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PaymentProof.
     * @param {PaymentProofDeleteArgs} args - Arguments to delete one PaymentProof.
     * @example
     * // Delete one PaymentProof
     * const PaymentProof = await prisma.paymentProof.delete({
     *   where: {
     *     // ... filter to delete one PaymentProof
     *   }
     * })
     * 
     */
    delete<T extends PaymentProofDeleteArgs>(args: SelectSubset<T, PaymentProofDeleteArgs<ExtArgs>>): Prisma__PaymentProofClient<$Result.GetResult<Prisma.$PaymentProofPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentProof.
     * @param {PaymentProofUpdateArgs} args - Arguments to update one PaymentProof.
     * @example
     * // Update one PaymentProof
     * const paymentProof = await prisma.paymentProof.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentProofUpdateArgs>(args: SelectSubset<T, PaymentProofUpdateArgs<ExtArgs>>): Prisma__PaymentProofClient<$Result.GetResult<Prisma.$PaymentProofPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentProofs.
     * @param {PaymentProofDeleteManyArgs} args - Arguments to filter PaymentProofs to delete.
     * @example
     * // Delete a few PaymentProofs
     * const { count } = await prisma.paymentProof.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentProofDeleteManyArgs>(args?: SelectSubset<T, PaymentProofDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentProofs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProofUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentProofs
     * const paymentProof = await prisma.paymentProof.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentProofUpdateManyArgs>(args: SelectSubset<T, PaymentProofUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentProofs and returns the data updated in the database.
     * @param {PaymentProofUpdateManyAndReturnArgs} args - Arguments to update many PaymentProofs.
     * @example
     * // Update many PaymentProofs
     * const paymentProof = await prisma.paymentProof.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PaymentProofs and only return the `id`
     * const paymentProofWithIdOnly = await prisma.paymentProof.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentProofUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentProofUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentProofPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PaymentProof.
     * @param {PaymentProofUpsertArgs} args - Arguments to update or create a PaymentProof.
     * @example
     * // Update or create a PaymentProof
     * const paymentProof = await prisma.paymentProof.upsert({
     *   create: {
     *     // ... data to create a PaymentProof
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentProof we want to update
     *   }
     * })
     */
    upsert<T extends PaymentProofUpsertArgs>(args: SelectSubset<T, PaymentProofUpsertArgs<ExtArgs>>): Prisma__PaymentProofClient<$Result.GetResult<Prisma.$PaymentProofPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentProofs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProofCountArgs} args - Arguments to filter PaymentProofs to count.
     * @example
     * // Count the number of PaymentProofs
     * const count = await prisma.paymentProof.count({
     *   where: {
     *     // ... the filter for the PaymentProofs we want to count
     *   }
     * })
    **/
    count<T extends PaymentProofCountArgs>(
      args?: Subset<T, PaymentProofCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentProofCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentProof.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProofAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentProofAggregateArgs>(args: Subset<T, PaymentProofAggregateArgs>): Prisma.PrismaPromise<GetPaymentProofAggregateType<T>>

    /**
     * Group by PaymentProof.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProofGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentProofGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentProofGroupByArgs['orderBy'] }
        : { orderBy?: PaymentProofGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentProofGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentProofGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentProof model
   */
  readonly fields: PaymentProofFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentProof.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentProofClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PaymentProof model
   */
  interface PaymentProofFieldRefs {
    readonly id: FieldRef<"PaymentProof", 'String'>
    readonly userId: FieldRef<"PaymentProof", 'String'>
    readonly transactionRedId: FieldRef<"PaymentProof", 'String'>
    readonly sha256Hash: FieldRef<"PaymentProof", 'String'>
    readonly amount: FieldRef<"PaymentProof", 'Decimal'>
    readonly bankName: FieldRef<"PaymentProof", 'String'>
    readonly senderName: FieldRef<"PaymentProof", 'String'>
    readonly reasonRemark: FieldRef<"PaymentProof", 'String'>
    readonly receipeImageUrl: FieldRef<"PaymentProof", 'String'>
    readonly status: FieldRef<"PaymentProof", 'ProofStatus'>
    readonly adminRemark: FieldRef<"PaymentProof", 'String'>
    readonly createdAt: FieldRef<"PaymentProof", 'DateTime'>
    readonly updatedAt: FieldRef<"PaymentProof", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentProof findUnique
   */
  export type PaymentProofFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProof
     */
    select?: PaymentProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProof
     */
    omit?: PaymentProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProofInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProof to fetch.
     */
    where: PaymentProofWhereUniqueInput
  }

  /**
   * PaymentProof findUniqueOrThrow
   */
  export type PaymentProofFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProof
     */
    select?: PaymentProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProof
     */
    omit?: PaymentProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProofInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProof to fetch.
     */
    where: PaymentProofWhereUniqueInput
  }

  /**
   * PaymentProof findFirst
   */
  export type PaymentProofFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProof
     */
    select?: PaymentProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProof
     */
    omit?: PaymentProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProofInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProof to fetch.
     */
    where?: PaymentProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentProofs to fetch.
     */
    orderBy?: PaymentProofOrderByWithRelationInput | PaymentProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentProofs.
     */
    cursor?: PaymentProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentProofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentProofs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentProofs.
     */
    distinct?: PaymentProofScalarFieldEnum | PaymentProofScalarFieldEnum[]
  }

  /**
   * PaymentProof findFirstOrThrow
   */
  export type PaymentProofFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProof
     */
    select?: PaymentProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProof
     */
    omit?: PaymentProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProofInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProof to fetch.
     */
    where?: PaymentProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentProofs to fetch.
     */
    orderBy?: PaymentProofOrderByWithRelationInput | PaymentProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentProofs.
     */
    cursor?: PaymentProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentProofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentProofs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentProofs.
     */
    distinct?: PaymentProofScalarFieldEnum | PaymentProofScalarFieldEnum[]
  }

  /**
   * PaymentProof findMany
   */
  export type PaymentProofFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProof
     */
    select?: PaymentProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProof
     */
    omit?: PaymentProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProofInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProofs to fetch.
     */
    where?: PaymentProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentProofs to fetch.
     */
    orderBy?: PaymentProofOrderByWithRelationInput | PaymentProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentProofs.
     */
    cursor?: PaymentProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentProofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentProofs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentProofs.
     */
    distinct?: PaymentProofScalarFieldEnum | PaymentProofScalarFieldEnum[]
  }

  /**
   * PaymentProof create
   */
  export type PaymentProofCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProof
     */
    select?: PaymentProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProof
     */
    omit?: PaymentProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProofInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentProof.
     */
    data: XOR<PaymentProofCreateInput, PaymentProofUncheckedCreateInput>
  }

  /**
   * PaymentProof createMany
   */
  export type PaymentProofCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentProofs.
     */
    data: PaymentProofCreateManyInput | PaymentProofCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentProof createManyAndReturn
   */
  export type PaymentProofCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProof
     */
    select?: PaymentProofSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProof
     */
    omit?: PaymentProofOmit<ExtArgs> | null
    /**
     * The data used to create many PaymentProofs.
     */
    data: PaymentProofCreateManyInput | PaymentProofCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProofIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentProof update
   */
  export type PaymentProofUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProof
     */
    select?: PaymentProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProof
     */
    omit?: PaymentProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProofInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentProof.
     */
    data: XOR<PaymentProofUpdateInput, PaymentProofUncheckedUpdateInput>
    /**
     * Choose, which PaymentProof to update.
     */
    where: PaymentProofWhereUniqueInput
  }

  /**
   * PaymentProof updateMany
   */
  export type PaymentProofUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentProofs.
     */
    data: XOR<PaymentProofUpdateManyMutationInput, PaymentProofUncheckedUpdateManyInput>
    /**
     * Filter which PaymentProofs to update
     */
    where?: PaymentProofWhereInput
    /**
     * Limit how many PaymentProofs to update.
     */
    limit?: number
  }

  /**
   * PaymentProof updateManyAndReturn
   */
  export type PaymentProofUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProof
     */
    select?: PaymentProofSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProof
     */
    omit?: PaymentProofOmit<ExtArgs> | null
    /**
     * The data used to update PaymentProofs.
     */
    data: XOR<PaymentProofUpdateManyMutationInput, PaymentProofUncheckedUpdateManyInput>
    /**
     * Filter which PaymentProofs to update
     */
    where?: PaymentProofWhereInput
    /**
     * Limit how many PaymentProofs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProofIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentProof upsert
   */
  export type PaymentProofUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProof
     */
    select?: PaymentProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProof
     */
    omit?: PaymentProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProofInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentProof to update in case it exists.
     */
    where: PaymentProofWhereUniqueInput
    /**
     * In case the PaymentProof found by the `where` argument doesn't exist, create a new PaymentProof with this data.
     */
    create: XOR<PaymentProofCreateInput, PaymentProofUncheckedCreateInput>
    /**
     * In case the PaymentProof was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentProofUpdateInput, PaymentProofUncheckedUpdateInput>
  }

  /**
   * PaymentProof delete
   */
  export type PaymentProofDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProof
     */
    select?: PaymentProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProof
     */
    omit?: PaymentProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProofInclude<ExtArgs> | null
    /**
     * Filter which PaymentProof to delete.
     */
    where: PaymentProofWhereUniqueInput
  }

  /**
   * PaymentProof deleteMany
   */
  export type PaymentProofDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentProofs to delete
     */
    where?: PaymentProofWhereInput
    /**
     * Limit how many PaymentProofs to delete.
     */
    limit?: number
  }

  /**
   * PaymentProof without action
   */
  export type PaymentProofDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProof
     */
    select?: PaymentProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProof
     */
    omit?: PaymentProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProofInclude<ExtArgs> | null
  }


  /**
   * Model LedgerEntry
   */

  export type AggregateLedgerEntry = {
    _count: LedgerEntryCountAggregateOutputType | null
    _avg: LedgerEntryAvgAggregateOutputType | null
    _sum: LedgerEntrySumAggregateOutputType | null
    _min: LedgerEntryMinAggregateOutputType | null
    _max: LedgerEntryMaxAggregateOutputType | null
  }

  export type LedgerEntryAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type LedgerEntrySumAggregateOutputType = {
    amount: Decimal | null
  }

  export type LedgerEntryMinAggregateOutputType = {
    id: string | null
    transactionDate: Date | null
    fromEntity: $Enums.AuditEntity | null
    fromEntityId: string | null
    toEntity: $Enums.AuditEntity | null
    toEntityId: string | null
    amount: Decimal | null
    transferMethod: string | null
    receiptUrl: string | null
    auditRemark: string | null
    transactionRefId: string | null
    createdAt: Date | null
  }

  export type LedgerEntryMaxAggregateOutputType = {
    id: string | null
    transactionDate: Date | null
    fromEntity: $Enums.AuditEntity | null
    fromEntityId: string | null
    toEntity: $Enums.AuditEntity | null
    toEntityId: string | null
    amount: Decimal | null
    transferMethod: string | null
    receiptUrl: string | null
    auditRemark: string | null
    transactionRefId: string | null
    createdAt: Date | null
  }

  export type LedgerEntryCountAggregateOutputType = {
    id: number
    transactionDate: number
    fromEntity: number
    fromEntityId: number
    toEntity: number
    toEntityId: number
    amount: number
    transferMethod: number
    receiptUrl: number
    auditRemark: number
    transactionRefId: number
    createdAt: number
    _all: number
  }


  export type LedgerEntryAvgAggregateInputType = {
    amount?: true
  }

  export type LedgerEntrySumAggregateInputType = {
    amount?: true
  }

  export type LedgerEntryMinAggregateInputType = {
    id?: true
    transactionDate?: true
    fromEntity?: true
    fromEntityId?: true
    toEntity?: true
    toEntityId?: true
    amount?: true
    transferMethod?: true
    receiptUrl?: true
    auditRemark?: true
    transactionRefId?: true
    createdAt?: true
  }

  export type LedgerEntryMaxAggregateInputType = {
    id?: true
    transactionDate?: true
    fromEntity?: true
    fromEntityId?: true
    toEntity?: true
    toEntityId?: true
    amount?: true
    transferMethod?: true
    receiptUrl?: true
    auditRemark?: true
    transactionRefId?: true
    createdAt?: true
  }

  export type LedgerEntryCountAggregateInputType = {
    id?: true
    transactionDate?: true
    fromEntity?: true
    fromEntityId?: true
    toEntity?: true
    toEntityId?: true
    amount?: true
    transferMethod?: true
    receiptUrl?: true
    auditRemark?: true
    transactionRefId?: true
    createdAt?: true
    _all?: true
  }

  export type LedgerEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LedgerEntry to aggregate.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LedgerEntries
    **/
    _count?: true | LedgerEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LedgerEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LedgerEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LedgerEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LedgerEntryMaxAggregateInputType
  }

  export type GetLedgerEntryAggregateType<T extends LedgerEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateLedgerEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLedgerEntry[P]>
      : GetScalarType<T[P], AggregateLedgerEntry[P]>
  }




  export type LedgerEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LedgerEntryWhereInput
    orderBy?: LedgerEntryOrderByWithAggregationInput | LedgerEntryOrderByWithAggregationInput[]
    by: LedgerEntryScalarFieldEnum[] | LedgerEntryScalarFieldEnum
    having?: LedgerEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LedgerEntryCountAggregateInputType | true
    _avg?: LedgerEntryAvgAggregateInputType
    _sum?: LedgerEntrySumAggregateInputType
    _min?: LedgerEntryMinAggregateInputType
    _max?: LedgerEntryMaxAggregateInputType
  }

  export type LedgerEntryGroupByOutputType = {
    id: string
    transactionDate: Date
    fromEntity: $Enums.AuditEntity
    fromEntityId: string | null
    toEntity: $Enums.AuditEntity
    toEntityId: string | null
    amount: Decimal
    transferMethod: string
    receiptUrl: string | null
    auditRemark: string | null
    transactionRefId: string | null
    createdAt: Date
    _count: LedgerEntryCountAggregateOutputType | null
    _avg: LedgerEntryAvgAggregateOutputType | null
    _sum: LedgerEntrySumAggregateOutputType | null
    _min: LedgerEntryMinAggregateOutputType | null
    _max: LedgerEntryMaxAggregateOutputType | null
  }

  type GetLedgerEntryGroupByPayload<T extends LedgerEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LedgerEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LedgerEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LedgerEntryGroupByOutputType[P]>
            : GetScalarType<T[P], LedgerEntryGroupByOutputType[P]>
        }
      >
    >


  export type LedgerEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionDate?: boolean
    fromEntity?: boolean
    fromEntityId?: boolean
    toEntity?: boolean
    toEntityId?: boolean
    amount?: boolean
    transferMethod?: boolean
    receiptUrl?: boolean
    auditRemark?: boolean
    transactionRefId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["ledgerEntry"]>

  export type LedgerEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionDate?: boolean
    fromEntity?: boolean
    fromEntityId?: boolean
    toEntity?: boolean
    toEntityId?: boolean
    amount?: boolean
    transferMethod?: boolean
    receiptUrl?: boolean
    auditRemark?: boolean
    transactionRefId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["ledgerEntry"]>

  export type LedgerEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionDate?: boolean
    fromEntity?: boolean
    fromEntityId?: boolean
    toEntity?: boolean
    toEntityId?: boolean
    amount?: boolean
    transferMethod?: boolean
    receiptUrl?: boolean
    auditRemark?: boolean
    transactionRefId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["ledgerEntry"]>

  export type LedgerEntrySelectScalar = {
    id?: boolean
    transactionDate?: boolean
    fromEntity?: boolean
    fromEntityId?: boolean
    toEntity?: boolean
    toEntityId?: boolean
    amount?: boolean
    transferMethod?: boolean
    receiptUrl?: boolean
    auditRemark?: boolean
    transactionRefId?: boolean
    createdAt?: boolean
  }

  export type LedgerEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "transactionDate" | "fromEntity" | "fromEntityId" | "toEntity" | "toEntityId" | "amount" | "transferMethod" | "receiptUrl" | "auditRemark" | "transactionRefId" | "createdAt", ExtArgs["result"]["ledgerEntry"]>

  export type $LedgerEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LedgerEntry"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      transactionDate: Date
      fromEntity: $Enums.AuditEntity
      fromEntityId: string | null
      toEntity: $Enums.AuditEntity
      toEntityId: string | null
      amount: Prisma.Decimal
      transferMethod: string
      receiptUrl: string | null
      auditRemark: string | null
      transactionRefId: string | null
      createdAt: Date
    }, ExtArgs["result"]["ledgerEntry"]>
    composites: {}
  }

  type LedgerEntryGetPayload<S extends boolean | null | undefined | LedgerEntryDefaultArgs> = $Result.GetResult<Prisma.$LedgerEntryPayload, S>

  type LedgerEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LedgerEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LedgerEntryCountAggregateInputType | true
    }

  export interface LedgerEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LedgerEntry'], meta: { name: 'LedgerEntry' } }
    /**
     * Find zero or one LedgerEntry that matches the filter.
     * @param {LedgerEntryFindUniqueArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LedgerEntryFindUniqueArgs>(args: SelectSubset<T, LedgerEntryFindUniqueArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LedgerEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LedgerEntryFindUniqueOrThrowArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LedgerEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, LedgerEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LedgerEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryFindFirstArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LedgerEntryFindFirstArgs>(args?: SelectSubset<T, LedgerEntryFindFirstArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LedgerEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryFindFirstOrThrowArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LedgerEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, LedgerEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LedgerEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LedgerEntries
     * const ledgerEntries = await prisma.ledgerEntry.findMany()
     * 
     * // Get first 10 LedgerEntries
     * const ledgerEntries = await prisma.ledgerEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ledgerEntryWithIdOnly = await prisma.ledgerEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LedgerEntryFindManyArgs>(args?: SelectSubset<T, LedgerEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LedgerEntry.
     * @param {LedgerEntryCreateArgs} args - Arguments to create a LedgerEntry.
     * @example
     * // Create one LedgerEntry
     * const LedgerEntry = await prisma.ledgerEntry.create({
     *   data: {
     *     // ... data to create a LedgerEntry
     *   }
     * })
     * 
     */
    create<T extends LedgerEntryCreateArgs>(args: SelectSubset<T, LedgerEntryCreateArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LedgerEntries.
     * @param {LedgerEntryCreateManyArgs} args - Arguments to create many LedgerEntries.
     * @example
     * // Create many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LedgerEntryCreateManyArgs>(args?: SelectSubset<T, LedgerEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LedgerEntries and returns the data saved in the database.
     * @param {LedgerEntryCreateManyAndReturnArgs} args - Arguments to create many LedgerEntries.
     * @example
     * // Create many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LedgerEntries and only return the `id`
     * const ledgerEntryWithIdOnly = await prisma.ledgerEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LedgerEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, LedgerEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LedgerEntry.
     * @param {LedgerEntryDeleteArgs} args - Arguments to delete one LedgerEntry.
     * @example
     * // Delete one LedgerEntry
     * const LedgerEntry = await prisma.ledgerEntry.delete({
     *   where: {
     *     // ... filter to delete one LedgerEntry
     *   }
     * })
     * 
     */
    delete<T extends LedgerEntryDeleteArgs>(args: SelectSubset<T, LedgerEntryDeleteArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LedgerEntry.
     * @param {LedgerEntryUpdateArgs} args - Arguments to update one LedgerEntry.
     * @example
     * // Update one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LedgerEntryUpdateArgs>(args: SelectSubset<T, LedgerEntryUpdateArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LedgerEntries.
     * @param {LedgerEntryDeleteManyArgs} args - Arguments to filter LedgerEntries to delete.
     * @example
     * // Delete a few LedgerEntries
     * const { count } = await prisma.ledgerEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LedgerEntryDeleteManyArgs>(args?: SelectSubset<T, LedgerEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LedgerEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LedgerEntryUpdateManyArgs>(args: SelectSubset<T, LedgerEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LedgerEntries and returns the data updated in the database.
     * @param {LedgerEntryUpdateManyAndReturnArgs} args - Arguments to update many LedgerEntries.
     * @example
     * // Update many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LedgerEntries and only return the `id`
     * const ledgerEntryWithIdOnly = await prisma.ledgerEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LedgerEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, LedgerEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LedgerEntry.
     * @param {LedgerEntryUpsertArgs} args - Arguments to update or create a LedgerEntry.
     * @example
     * // Update or create a LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.upsert({
     *   create: {
     *     // ... data to create a LedgerEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LedgerEntry we want to update
     *   }
     * })
     */
    upsert<T extends LedgerEntryUpsertArgs>(args: SelectSubset<T, LedgerEntryUpsertArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LedgerEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryCountArgs} args - Arguments to filter LedgerEntries to count.
     * @example
     * // Count the number of LedgerEntries
     * const count = await prisma.ledgerEntry.count({
     *   where: {
     *     // ... the filter for the LedgerEntries we want to count
     *   }
     * })
    **/
    count<T extends LedgerEntryCountArgs>(
      args?: Subset<T, LedgerEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LedgerEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LedgerEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LedgerEntryAggregateArgs>(args: Subset<T, LedgerEntryAggregateArgs>): Prisma.PrismaPromise<GetLedgerEntryAggregateType<T>>

    /**
     * Group by LedgerEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LedgerEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LedgerEntryGroupByArgs['orderBy'] }
        : { orderBy?: LedgerEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LedgerEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLedgerEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LedgerEntry model
   */
  readonly fields: LedgerEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LedgerEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LedgerEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LedgerEntry model
   */
  interface LedgerEntryFieldRefs {
    readonly id: FieldRef<"LedgerEntry", 'String'>
    readonly transactionDate: FieldRef<"LedgerEntry", 'DateTime'>
    readonly fromEntity: FieldRef<"LedgerEntry", 'AuditEntity'>
    readonly fromEntityId: FieldRef<"LedgerEntry", 'String'>
    readonly toEntity: FieldRef<"LedgerEntry", 'AuditEntity'>
    readonly toEntityId: FieldRef<"LedgerEntry", 'String'>
    readonly amount: FieldRef<"LedgerEntry", 'Decimal'>
    readonly transferMethod: FieldRef<"LedgerEntry", 'String'>
    readonly receiptUrl: FieldRef<"LedgerEntry", 'String'>
    readonly auditRemark: FieldRef<"LedgerEntry", 'String'>
    readonly transactionRefId: FieldRef<"LedgerEntry", 'String'>
    readonly createdAt: FieldRef<"LedgerEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LedgerEntry findUnique
   */
  export type LedgerEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where: LedgerEntryWhereUniqueInput
  }

  /**
   * LedgerEntry findUniqueOrThrow
   */
  export type LedgerEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where: LedgerEntryWhereUniqueInput
  }

  /**
   * LedgerEntry findFirst
   */
  export type LedgerEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LedgerEntries.
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerEntries.
     */
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }

  /**
   * LedgerEntry findFirstOrThrow
   */
  export type LedgerEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LedgerEntries.
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerEntries.
     */
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }

  /**
   * LedgerEntry findMany
   */
  export type LedgerEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Filter, which LedgerEntries to fetch.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LedgerEntries.
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerEntries.
     */
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }

  /**
   * LedgerEntry create
   */
  export type LedgerEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * The data needed to create a LedgerEntry.
     */
    data: XOR<LedgerEntryCreateInput, LedgerEntryUncheckedCreateInput>
  }

  /**
   * LedgerEntry createMany
   */
  export type LedgerEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LedgerEntries.
     */
    data: LedgerEntryCreateManyInput | LedgerEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LedgerEntry createManyAndReturn
   */
  export type LedgerEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * The data used to create many LedgerEntries.
     */
    data: LedgerEntryCreateManyInput | LedgerEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LedgerEntry update
   */
  export type LedgerEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * The data needed to update a LedgerEntry.
     */
    data: XOR<LedgerEntryUpdateInput, LedgerEntryUncheckedUpdateInput>
    /**
     * Choose, which LedgerEntry to update.
     */
    where: LedgerEntryWhereUniqueInput
  }

  /**
   * LedgerEntry updateMany
   */
  export type LedgerEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LedgerEntries.
     */
    data: XOR<LedgerEntryUpdateManyMutationInput, LedgerEntryUncheckedUpdateManyInput>
    /**
     * Filter which LedgerEntries to update
     */
    where?: LedgerEntryWhereInput
    /**
     * Limit how many LedgerEntries to update.
     */
    limit?: number
  }

  /**
   * LedgerEntry updateManyAndReturn
   */
  export type LedgerEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * The data used to update LedgerEntries.
     */
    data: XOR<LedgerEntryUpdateManyMutationInput, LedgerEntryUncheckedUpdateManyInput>
    /**
     * Filter which LedgerEntries to update
     */
    where?: LedgerEntryWhereInput
    /**
     * Limit how many LedgerEntries to update.
     */
    limit?: number
  }

  /**
   * LedgerEntry upsert
   */
  export type LedgerEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * The filter to search for the LedgerEntry to update in case it exists.
     */
    where: LedgerEntryWhereUniqueInput
    /**
     * In case the LedgerEntry found by the `where` argument doesn't exist, create a new LedgerEntry with this data.
     */
    create: XOR<LedgerEntryCreateInput, LedgerEntryUncheckedCreateInput>
    /**
     * In case the LedgerEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LedgerEntryUpdateInput, LedgerEntryUncheckedUpdateInput>
  }

  /**
   * LedgerEntry delete
   */
  export type LedgerEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Filter which LedgerEntry to delete.
     */
    where: LedgerEntryWhereUniqueInput
  }

  /**
   * LedgerEntry deleteMany
   */
  export type LedgerEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LedgerEntries to delete
     */
    where?: LedgerEntryWhereInput
    /**
     * Limit how many LedgerEntries to delete.
     */
    limit?: number
  }

  /**
   * LedgerEntry without action
   */
  export type LedgerEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
  }


  /**
   * Model StockReturn
   */

  export type AggregateStockReturn = {
    _count: StockReturnCountAggregateOutputType | null
    _avg: StockReturnAvgAggregateOutputType | null
    _sum: StockReturnSumAggregateOutputType | null
    _min: StockReturnMinAggregateOutputType | null
    _max: StockReturnMaxAggregateOutputType | null
  }

  export type StockReturnAvgAggregateOutputType = {
    totalValue: Decimal | null
  }

  export type StockReturnSumAggregateOutputType = {
    totalValue: Decimal | null
  }

  export type StockReturnMinAggregateOutputType = {
    id: string | null
    userId: string | null
    totalValue: Decimal | null
    reason: string | null
    status: $Enums.ReturnStatus | null
    destination: $Enums.ReturnDestination | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockReturnMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    totalValue: Decimal | null
    reason: string | null
    status: $Enums.ReturnStatus | null
    destination: $Enums.ReturnDestination | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockReturnCountAggregateOutputType = {
    id: number
    userId: number
    totalValue: number
    reason: number
    status: number
    destination: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StockReturnAvgAggregateInputType = {
    totalValue?: true
  }

  export type StockReturnSumAggregateInputType = {
    totalValue?: true
  }

  export type StockReturnMinAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    reason?: true
    status?: true
    destination?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockReturnMaxAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    reason?: true
    status?: true
    destination?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockReturnCountAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    reason?: true
    status?: true
    destination?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StockReturnAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockReturn to aggregate.
     */
    where?: StockReturnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReturns to fetch.
     */
    orderBy?: StockReturnOrderByWithRelationInput | StockReturnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockReturnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReturns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReturns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StockReturns
    **/
    _count?: true | StockReturnCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockReturnAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockReturnSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockReturnMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockReturnMaxAggregateInputType
  }

  export type GetStockReturnAggregateType<T extends StockReturnAggregateArgs> = {
        [P in keyof T & keyof AggregateStockReturn]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStockReturn[P]>
      : GetScalarType<T[P], AggregateStockReturn[P]>
  }




  export type StockReturnGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockReturnWhereInput
    orderBy?: StockReturnOrderByWithAggregationInput | StockReturnOrderByWithAggregationInput[]
    by: StockReturnScalarFieldEnum[] | StockReturnScalarFieldEnum
    having?: StockReturnScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockReturnCountAggregateInputType | true
    _avg?: StockReturnAvgAggregateInputType
    _sum?: StockReturnSumAggregateInputType
    _min?: StockReturnMinAggregateInputType
    _max?: StockReturnMaxAggregateInputType
  }

  export type StockReturnGroupByOutputType = {
    id: string
    userId: string
    totalValue: Decimal
    reason: string
    status: $Enums.ReturnStatus
    destination: $Enums.ReturnDestination | null
    createdAt: Date
    updatedAt: Date
    _count: StockReturnCountAggregateOutputType | null
    _avg: StockReturnAvgAggregateOutputType | null
    _sum: StockReturnSumAggregateOutputType | null
    _min: StockReturnMinAggregateOutputType | null
    _max: StockReturnMaxAggregateOutputType | null
  }

  type GetStockReturnGroupByPayload<T extends StockReturnGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockReturnGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockReturnGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockReturnGroupByOutputType[P]>
            : GetScalarType<T[P], StockReturnGroupByOutputType[P]>
        }
      >
    >


  export type StockReturnSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    totalValue?: boolean
    reason?: boolean
    status?: boolean
    destination?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | StockReturn$itemsArgs<ExtArgs>
    _count?: boolean | StockReturnCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockReturn"]>

  export type StockReturnSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    totalValue?: boolean
    reason?: boolean
    status?: boolean
    destination?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockReturn"]>

  export type StockReturnSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    totalValue?: boolean
    reason?: boolean
    status?: boolean
    destination?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockReturn"]>

  export type StockReturnSelectScalar = {
    id?: boolean
    userId?: boolean
    totalValue?: boolean
    reason?: boolean
    status?: boolean
    destination?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StockReturnOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "totalValue" | "reason" | "status" | "destination" | "createdAt" | "updatedAt", ExtArgs["result"]["stockReturn"]>
  export type StockReturnInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | StockReturn$itemsArgs<ExtArgs>
    _count?: boolean | StockReturnCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StockReturnIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StockReturnIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StockReturnPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StockReturn"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      items: Prisma.$ReturnItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      totalValue: Prisma.Decimal
      reason: string
      status: $Enums.ReturnStatus
      destination: $Enums.ReturnDestination | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stockReturn"]>
    composites: {}
  }

  type StockReturnGetPayload<S extends boolean | null | undefined | StockReturnDefaultArgs> = $Result.GetResult<Prisma.$StockReturnPayload, S>

  type StockReturnCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockReturnFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockReturnCountAggregateInputType | true
    }

  export interface StockReturnDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StockReturn'], meta: { name: 'StockReturn' } }
    /**
     * Find zero or one StockReturn that matches the filter.
     * @param {StockReturnFindUniqueArgs} args - Arguments to find a StockReturn
     * @example
     * // Get one StockReturn
     * const stockReturn = await prisma.stockReturn.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockReturnFindUniqueArgs>(args: SelectSubset<T, StockReturnFindUniqueArgs<ExtArgs>>): Prisma__StockReturnClient<$Result.GetResult<Prisma.$StockReturnPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StockReturn that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockReturnFindUniqueOrThrowArgs} args - Arguments to find a StockReturn
     * @example
     * // Get one StockReturn
     * const stockReturn = await prisma.stockReturn.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockReturnFindUniqueOrThrowArgs>(args: SelectSubset<T, StockReturnFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockReturnClient<$Result.GetResult<Prisma.$StockReturnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockReturn that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReturnFindFirstArgs} args - Arguments to find a StockReturn
     * @example
     * // Get one StockReturn
     * const stockReturn = await prisma.stockReturn.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockReturnFindFirstArgs>(args?: SelectSubset<T, StockReturnFindFirstArgs<ExtArgs>>): Prisma__StockReturnClient<$Result.GetResult<Prisma.$StockReturnPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockReturn that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReturnFindFirstOrThrowArgs} args - Arguments to find a StockReturn
     * @example
     * // Get one StockReturn
     * const stockReturn = await prisma.stockReturn.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockReturnFindFirstOrThrowArgs>(args?: SelectSubset<T, StockReturnFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockReturnClient<$Result.GetResult<Prisma.$StockReturnPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StockReturns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReturnFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockReturns
     * const stockReturns = await prisma.stockReturn.findMany()
     * 
     * // Get first 10 StockReturns
     * const stockReturns = await prisma.stockReturn.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockReturnWithIdOnly = await prisma.stockReturn.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockReturnFindManyArgs>(args?: SelectSubset<T, StockReturnFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReturnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StockReturn.
     * @param {StockReturnCreateArgs} args - Arguments to create a StockReturn.
     * @example
     * // Create one StockReturn
     * const StockReturn = await prisma.stockReturn.create({
     *   data: {
     *     // ... data to create a StockReturn
     *   }
     * })
     * 
     */
    create<T extends StockReturnCreateArgs>(args: SelectSubset<T, StockReturnCreateArgs<ExtArgs>>): Prisma__StockReturnClient<$Result.GetResult<Prisma.$StockReturnPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StockReturns.
     * @param {StockReturnCreateManyArgs} args - Arguments to create many StockReturns.
     * @example
     * // Create many StockReturns
     * const stockReturn = await prisma.stockReturn.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockReturnCreateManyArgs>(args?: SelectSubset<T, StockReturnCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StockReturns and returns the data saved in the database.
     * @param {StockReturnCreateManyAndReturnArgs} args - Arguments to create many StockReturns.
     * @example
     * // Create many StockReturns
     * const stockReturn = await prisma.stockReturn.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StockReturns and only return the `id`
     * const stockReturnWithIdOnly = await prisma.stockReturn.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockReturnCreateManyAndReturnArgs>(args?: SelectSubset<T, StockReturnCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReturnPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StockReturn.
     * @param {StockReturnDeleteArgs} args - Arguments to delete one StockReturn.
     * @example
     * // Delete one StockReturn
     * const StockReturn = await prisma.stockReturn.delete({
     *   where: {
     *     // ... filter to delete one StockReturn
     *   }
     * })
     * 
     */
    delete<T extends StockReturnDeleteArgs>(args: SelectSubset<T, StockReturnDeleteArgs<ExtArgs>>): Prisma__StockReturnClient<$Result.GetResult<Prisma.$StockReturnPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StockReturn.
     * @param {StockReturnUpdateArgs} args - Arguments to update one StockReturn.
     * @example
     * // Update one StockReturn
     * const stockReturn = await prisma.stockReturn.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockReturnUpdateArgs>(args: SelectSubset<T, StockReturnUpdateArgs<ExtArgs>>): Prisma__StockReturnClient<$Result.GetResult<Prisma.$StockReturnPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StockReturns.
     * @param {StockReturnDeleteManyArgs} args - Arguments to filter StockReturns to delete.
     * @example
     * // Delete a few StockReturns
     * const { count } = await prisma.stockReturn.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockReturnDeleteManyArgs>(args?: SelectSubset<T, StockReturnDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockReturns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReturnUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockReturns
     * const stockReturn = await prisma.stockReturn.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockReturnUpdateManyArgs>(args: SelectSubset<T, StockReturnUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockReturns and returns the data updated in the database.
     * @param {StockReturnUpdateManyAndReturnArgs} args - Arguments to update many StockReturns.
     * @example
     * // Update many StockReturns
     * const stockReturn = await prisma.stockReturn.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StockReturns and only return the `id`
     * const stockReturnWithIdOnly = await prisma.stockReturn.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StockReturnUpdateManyAndReturnArgs>(args: SelectSubset<T, StockReturnUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReturnPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StockReturn.
     * @param {StockReturnUpsertArgs} args - Arguments to update or create a StockReturn.
     * @example
     * // Update or create a StockReturn
     * const stockReturn = await prisma.stockReturn.upsert({
     *   create: {
     *     // ... data to create a StockReturn
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockReturn we want to update
     *   }
     * })
     */
    upsert<T extends StockReturnUpsertArgs>(args: SelectSubset<T, StockReturnUpsertArgs<ExtArgs>>): Prisma__StockReturnClient<$Result.GetResult<Prisma.$StockReturnPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StockReturns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReturnCountArgs} args - Arguments to filter StockReturns to count.
     * @example
     * // Count the number of StockReturns
     * const count = await prisma.stockReturn.count({
     *   where: {
     *     // ... the filter for the StockReturns we want to count
     *   }
     * })
    **/
    count<T extends StockReturnCountArgs>(
      args?: Subset<T, StockReturnCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockReturnCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StockReturn.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReturnAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockReturnAggregateArgs>(args: Subset<T, StockReturnAggregateArgs>): Prisma.PrismaPromise<GetStockReturnAggregateType<T>>

    /**
     * Group by StockReturn.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReturnGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockReturnGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockReturnGroupByArgs['orderBy'] }
        : { orderBy?: StockReturnGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockReturnGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockReturnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StockReturn model
   */
  readonly fields: StockReturnFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StockReturn.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockReturnClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends StockReturn$itemsArgs<ExtArgs> = {}>(args?: Subset<T, StockReturn$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StockReturn model
   */
  interface StockReturnFieldRefs {
    readonly id: FieldRef<"StockReturn", 'String'>
    readonly userId: FieldRef<"StockReturn", 'String'>
    readonly totalValue: FieldRef<"StockReturn", 'Decimal'>
    readonly reason: FieldRef<"StockReturn", 'String'>
    readonly status: FieldRef<"StockReturn", 'ReturnStatus'>
    readonly destination: FieldRef<"StockReturn", 'ReturnDestination'>
    readonly createdAt: FieldRef<"StockReturn", 'DateTime'>
    readonly updatedAt: FieldRef<"StockReturn", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StockReturn findUnique
   */
  export type StockReturnFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReturn
     */
    select?: StockReturnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReturn
     */
    omit?: StockReturnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReturnInclude<ExtArgs> | null
    /**
     * Filter, which StockReturn to fetch.
     */
    where: StockReturnWhereUniqueInput
  }

  /**
   * StockReturn findUniqueOrThrow
   */
  export type StockReturnFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReturn
     */
    select?: StockReturnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReturn
     */
    omit?: StockReturnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReturnInclude<ExtArgs> | null
    /**
     * Filter, which StockReturn to fetch.
     */
    where: StockReturnWhereUniqueInput
  }

  /**
   * StockReturn findFirst
   */
  export type StockReturnFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReturn
     */
    select?: StockReturnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReturn
     */
    omit?: StockReturnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReturnInclude<ExtArgs> | null
    /**
     * Filter, which StockReturn to fetch.
     */
    where?: StockReturnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReturns to fetch.
     */
    orderBy?: StockReturnOrderByWithRelationInput | StockReturnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockReturns.
     */
    cursor?: StockReturnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReturns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReturns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockReturns.
     */
    distinct?: StockReturnScalarFieldEnum | StockReturnScalarFieldEnum[]
  }

  /**
   * StockReturn findFirstOrThrow
   */
  export type StockReturnFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReturn
     */
    select?: StockReturnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReturn
     */
    omit?: StockReturnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReturnInclude<ExtArgs> | null
    /**
     * Filter, which StockReturn to fetch.
     */
    where?: StockReturnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReturns to fetch.
     */
    orderBy?: StockReturnOrderByWithRelationInput | StockReturnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockReturns.
     */
    cursor?: StockReturnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReturns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReturns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockReturns.
     */
    distinct?: StockReturnScalarFieldEnum | StockReturnScalarFieldEnum[]
  }

  /**
   * StockReturn findMany
   */
  export type StockReturnFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReturn
     */
    select?: StockReturnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReturn
     */
    omit?: StockReturnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReturnInclude<ExtArgs> | null
    /**
     * Filter, which StockReturns to fetch.
     */
    where?: StockReturnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReturns to fetch.
     */
    orderBy?: StockReturnOrderByWithRelationInput | StockReturnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StockReturns.
     */
    cursor?: StockReturnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReturns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReturns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockReturns.
     */
    distinct?: StockReturnScalarFieldEnum | StockReturnScalarFieldEnum[]
  }

  /**
   * StockReturn create
   */
  export type StockReturnCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReturn
     */
    select?: StockReturnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReturn
     */
    omit?: StockReturnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReturnInclude<ExtArgs> | null
    /**
     * The data needed to create a StockReturn.
     */
    data: XOR<StockReturnCreateInput, StockReturnUncheckedCreateInput>
  }

  /**
   * StockReturn createMany
   */
  export type StockReturnCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockReturns.
     */
    data: StockReturnCreateManyInput | StockReturnCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockReturn createManyAndReturn
   */
  export type StockReturnCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReturn
     */
    select?: StockReturnSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockReturn
     */
    omit?: StockReturnOmit<ExtArgs> | null
    /**
     * The data used to create many StockReturns.
     */
    data: StockReturnCreateManyInput | StockReturnCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReturnIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockReturn update
   */
  export type StockReturnUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReturn
     */
    select?: StockReturnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReturn
     */
    omit?: StockReturnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReturnInclude<ExtArgs> | null
    /**
     * The data needed to update a StockReturn.
     */
    data: XOR<StockReturnUpdateInput, StockReturnUncheckedUpdateInput>
    /**
     * Choose, which StockReturn to update.
     */
    where: StockReturnWhereUniqueInput
  }

  /**
   * StockReturn updateMany
   */
  export type StockReturnUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StockReturns.
     */
    data: XOR<StockReturnUpdateManyMutationInput, StockReturnUncheckedUpdateManyInput>
    /**
     * Filter which StockReturns to update
     */
    where?: StockReturnWhereInput
    /**
     * Limit how many StockReturns to update.
     */
    limit?: number
  }

  /**
   * StockReturn updateManyAndReturn
   */
  export type StockReturnUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReturn
     */
    select?: StockReturnSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockReturn
     */
    omit?: StockReturnOmit<ExtArgs> | null
    /**
     * The data used to update StockReturns.
     */
    data: XOR<StockReturnUpdateManyMutationInput, StockReturnUncheckedUpdateManyInput>
    /**
     * Filter which StockReturns to update
     */
    where?: StockReturnWhereInput
    /**
     * Limit how many StockReturns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReturnIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockReturn upsert
   */
  export type StockReturnUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReturn
     */
    select?: StockReturnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReturn
     */
    omit?: StockReturnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReturnInclude<ExtArgs> | null
    /**
     * The filter to search for the StockReturn to update in case it exists.
     */
    where: StockReturnWhereUniqueInput
    /**
     * In case the StockReturn found by the `where` argument doesn't exist, create a new StockReturn with this data.
     */
    create: XOR<StockReturnCreateInput, StockReturnUncheckedCreateInput>
    /**
     * In case the StockReturn was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockReturnUpdateInput, StockReturnUncheckedUpdateInput>
  }

  /**
   * StockReturn delete
   */
  export type StockReturnDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReturn
     */
    select?: StockReturnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReturn
     */
    omit?: StockReturnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReturnInclude<ExtArgs> | null
    /**
     * Filter which StockReturn to delete.
     */
    where: StockReturnWhereUniqueInput
  }

  /**
   * StockReturn deleteMany
   */
  export type StockReturnDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockReturns to delete
     */
    where?: StockReturnWhereInput
    /**
     * Limit how many StockReturns to delete.
     */
    limit?: number
  }

  /**
   * StockReturn.items
   */
  export type StockReturn$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    where?: ReturnItemWhereInput
    orderBy?: ReturnItemOrderByWithRelationInput | ReturnItemOrderByWithRelationInput[]
    cursor?: ReturnItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReturnItemScalarFieldEnum | ReturnItemScalarFieldEnum[]
  }

  /**
   * StockReturn without action
   */
  export type StockReturnDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReturn
     */
    select?: StockReturnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReturn
     */
    omit?: StockReturnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReturnInclude<ExtArgs> | null
  }


  /**
   * Model ReturnItem
   */

  export type AggregateReturnItem = {
    _count: ReturnItemCountAggregateOutputType | null
    _avg: ReturnItemAvgAggregateOutputType | null
    _sum: ReturnItemSumAggregateOutputType | null
    _min: ReturnItemMinAggregateOutputType | null
    _max: ReturnItemMaxAggregateOutputType | null
  }

  export type ReturnItemAvgAggregateOutputType = {
    quantity: number | null
  }

  export type ReturnItemSumAggregateOutputType = {
    quantity: number | null
  }

  export type ReturnItemMinAggregateOutputType = {
    id: string | null
    stockReturnId: string | null
    itemId: string | null
    quantity: number | null
  }

  export type ReturnItemMaxAggregateOutputType = {
    id: string | null
    stockReturnId: string | null
    itemId: string | null
    quantity: number | null
  }

  export type ReturnItemCountAggregateOutputType = {
    id: number
    stockReturnId: number
    itemId: number
    quantity: number
    _all: number
  }


  export type ReturnItemAvgAggregateInputType = {
    quantity?: true
  }

  export type ReturnItemSumAggregateInputType = {
    quantity?: true
  }

  export type ReturnItemMinAggregateInputType = {
    id?: true
    stockReturnId?: true
    itemId?: true
    quantity?: true
  }

  export type ReturnItemMaxAggregateInputType = {
    id?: true
    stockReturnId?: true
    itemId?: true
    quantity?: true
  }

  export type ReturnItemCountAggregateInputType = {
    id?: true
    stockReturnId?: true
    itemId?: true
    quantity?: true
    _all?: true
  }

  export type ReturnItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReturnItem to aggregate.
     */
    where?: ReturnItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReturnItems to fetch.
     */
    orderBy?: ReturnItemOrderByWithRelationInput | ReturnItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReturnItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReturnItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReturnItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReturnItems
    **/
    _count?: true | ReturnItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReturnItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReturnItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReturnItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReturnItemMaxAggregateInputType
  }

  export type GetReturnItemAggregateType<T extends ReturnItemAggregateArgs> = {
        [P in keyof T & keyof AggregateReturnItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReturnItem[P]>
      : GetScalarType<T[P], AggregateReturnItem[P]>
  }




  export type ReturnItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReturnItemWhereInput
    orderBy?: ReturnItemOrderByWithAggregationInput | ReturnItemOrderByWithAggregationInput[]
    by: ReturnItemScalarFieldEnum[] | ReturnItemScalarFieldEnum
    having?: ReturnItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReturnItemCountAggregateInputType | true
    _avg?: ReturnItemAvgAggregateInputType
    _sum?: ReturnItemSumAggregateInputType
    _min?: ReturnItemMinAggregateInputType
    _max?: ReturnItemMaxAggregateInputType
  }

  export type ReturnItemGroupByOutputType = {
    id: string
    stockReturnId: string
    itemId: string
    quantity: number
    _count: ReturnItemCountAggregateOutputType | null
    _avg: ReturnItemAvgAggregateOutputType | null
    _sum: ReturnItemSumAggregateOutputType | null
    _min: ReturnItemMinAggregateOutputType | null
    _max: ReturnItemMaxAggregateOutputType | null
  }

  type GetReturnItemGroupByPayload<T extends ReturnItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReturnItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReturnItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReturnItemGroupByOutputType[P]>
            : GetScalarType<T[P], ReturnItemGroupByOutputType[P]>
        }
      >
    >


  export type ReturnItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stockReturnId?: boolean
    itemId?: boolean
    quantity?: boolean
    stockReturn?: boolean | StockReturnDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["returnItem"]>

  export type ReturnItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stockReturnId?: boolean
    itemId?: boolean
    quantity?: boolean
    stockReturn?: boolean | StockReturnDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["returnItem"]>

  export type ReturnItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stockReturnId?: boolean
    itemId?: boolean
    quantity?: boolean
    stockReturn?: boolean | StockReturnDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["returnItem"]>

  export type ReturnItemSelectScalar = {
    id?: boolean
    stockReturnId?: boolean
    itemId?: boolean
    quantity?: boolean
  }

  export type ReturnItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stockReturnId" | "itemId" | "quantity", ExtArgs["result"]["returnItem"]>
  export type ReturnItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stockReturn?: boolean | StockReturnDefaultArgs<ExtArgs>
  }
  export type ReturnItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stockReturn?: boolean | StockReturnDefaultArgs<ExtArgs>
  }
  export type ReturnItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stockReturn?: boolean | StockReturnDefaultArgs<ExtArgs>
  }

  export type $ReturnItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReturnItem"
    objects: {
      stockReturn: Prisma.$StockReturnPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      stockReturnId: string
      itemId: string
      quantity: number
    }, ExtArgs["result"]["returnItem"]>
    composites: {}
  }

  type ReturnItemGetPayload<S extends boolean | null | undefined | ReturnItemDefaultArgs> = $Result.GetResult<Prisma.$ReturnItemPayload, S>

  type ReturnItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReturnItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReturnItemCountAggregateInputType | true
    }

  export interface ReturnItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReturnItem'], meta: { name: 'ReturnItem' } }
    /**
     * Find zero or one ReturnItem that matches the filter.
     * @param {ReturnItemFindUniqueArgs} args - Arguments to find a ReturnItem
     * @example
     * // Get one ReturnItem
     * const returnItem = await prisma.returnItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReturnItemFindUniqueArgs>(args: SelectSubset<T, ReturnItemFindUniqueArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReturnItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReturnItemFindUniqueOrThrowArgs} args - Arguments to find a ReturnItem
     * @example
     * // Get one ReturnItem
     * const returnItem = await prisma.returnItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReturnItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ReturnItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReturnItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnItemFindFirstArgs} args - Arguments to find a ReturnItem
     * @example
     * // Get one ReturnItem
     * const returnItem = await prisma.returnItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReturnItemFindFirstArgs>(args?: SelectSubset<T, ReturnItemFindFirstArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReturnItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnItemFindFirstOrThrowArgs} args - Arguments to find a ReturnItem
     * @example
     * // Get one ReturnItem
     * const returnItem = await prisma.returnItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReturnItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ReturnItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReturnItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReturnItems
     * const returnItems = await prisma.returnItem.findMany()
     * 
     * // Get first 10 ReturnItems
     * const returnItems = await prisma.returnItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const returnItemWithIdOnly = await prisma.returnItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReturnItemFindManyArgs>(args?: SelectSubset<T, ReturnItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReturnItem.
     * @param {ReturnItemCreateArgs} args - Arguments to create a ReturnItem.
     * @example
     * // Create one ReturnItem
     * const ReturnItem = await prisma.returnItem.create({
     *   data: {
     *     // ... data to create a ReturnItem
     *   }
     * })
     * 
     */
    create<T extends ReturnItemCreateArgs>(args: SelectSubset<T, ReturnItemCreateArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReturnItems.
     * @param {ReturnItemCreateManyArgs} args - Arguments to create many ReturnItems.
     * @example
     * // Create many ReturnItems
     * const returnItem = await prisma.returnItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReturnItemCreateManyArgs>(args?: SelectSubset<T, ReturnItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReturnItems and returns the data saved in the database.
     * @param {ReturnItemCreateManyAndReturnArgs} args - Arguments to create many ReturnItems.
     * @example
     * // Create many ReturnItems
     * const returnItem = await prisma.returnItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReturnItems and only return the `id`
     * const returnItemWithIdOnly = await prisma.returnItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReturnItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ReturnItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReturnItem.
     * @param {ReturnItemDeleteArgs} args - Arguments to delete one ReturnItem.
     * @example
     * // Delete one ReturnItem
     * const ReturnItem = await prisma.returnItem.delete({
     *   where: {
     *     // ... filter to delete one ReturnItem
     *   }
     * })
     * 
     */
    delete<T extends ReturnItemDeleteArgs>(args: SelectSubset<T, ReturnItemDeleteArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReturnItem.
     * @param {ReturnItemUpdateArgs} args - Arguments to update one ReturnItem.
     * @example
     * // Update one ReturnItem
     * const returnItem = await prisma.returnItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReturnItemUpdateArgs>(args: SelectSubset<T, ReturnItemUpdateArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReturnItems.
     * @param {ReturnItemDeleteManyArgs} args - Arguments to filter ReturnItems to delete.
     * @example
     * // Delete a few ReturnItems
     * const { count } = await prisma.returnItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReturnItemDeleteManyArgs>(args?: SelectSubset<T, ReturnItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReturnItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReturnItems
     * const returnItem = await prisma.returnItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReturnItemUpdateManyArgs>(args: SelectSubset<T, ReturnItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReturnItems and returns the data updated in the database.
     * @param {ReturnItemUpdateManyAndReturnArgs} args - Arguments to update many ReturnItems.
     * @example
     * // Update many ReturnItems
     * const returnItem = await prisma.returnItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReturnItems and only return the `id`
     * const returnItemWithIdOnly = await prisma.returnItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReturnItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ReturnItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReturnItem.
     * @param {ReturnItemUpsertArgs} args - Arguments to update or create a ReturnItem.
     * @example
     * // Update or create a ReturnItem
     * const returnItem = await prisma.returnItem.upsert({
     *   create: {
     *     // ... data to create a ReturnItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReturnItem we want to update
     *   }
     * })
     */
    upsert<T extends ReturnItemUpsertArgs>(args: SelectSubset<T, ReturnItemUpsertArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReturnItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnItemCountArgs} args - Arguments to filter ReturnItems to count.
     * @example
     * // Count the number of ReturnItems
     * const count = await prisma.returnItem.count({
     *   where: {
     *     // ... the filter for the ReturnItems we want to count
     *   }
     * })
    **/
    count<T extends ReturnItemCountArgs>(
      args?: Subset<T, ReturnItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReturnItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReturnItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReturnItemAggregateArgs>(args: Subset<T, ReturnItemAggregateArgs>): Prisma.PrismaPromise<GetReturnItemAggregateType<T>>

    /**
     * Group by ReturnItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReturnItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReturnItemGroupByArgs['orderBy'] }
        : { orderBy?: ReturnItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReturnItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReturnItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReturnItem model
   */
  readonly fields: ReturnItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReturnItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReturnItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stockReturn<T extends StockReturnDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockReturnDefaultArgs<ExtArgs>>): Prisma__StockReturnClient<$Result.GetResult<Prisma.$StockReturnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReturnItem model
   */
  interface ReturnItemFieldRefs {
    readonly id: FieldRef<"ReturnItem", 'String'>
    readonly stockReturnId: FieldRef<"ReturnItem", 'String'>
    readonly itemId: FieldRef<"ReturnItem", 'String'>
    readonly quantity: FieldRef<"ReturnItem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ReturnItem findUnique
   */
  export type ReturnItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * Filter, which ReturnItem to fetch.
     */
    where: ReturnItemWhereUniqueInput
  }

  /**
   * ReturnItem findUniqueOrThrow
   */
  export type ReturnItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * Filter, which ReturnItem to fetch.
     */
    where: ReturnItemWhereUniqueInput
  }

  /**
   * ReturnItem findFirst
   */
  export type ReturnItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * Filter, which ReturnItem to fetch.
     */
    where?: ReturnItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReturnItems to fetch.
     */
    orderBy?: ReturnItemOrderByWithRelationInput | ReturnItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReturnItems.
     */
    cursor?: ReturnItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReturnItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReturnItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReturnItems.
     */
    distinct?: ReturnItemScalarFieldEnum | ReturnItemScalarFieldEnum[]
  }

  /**
   * ReturnItem findFirstOrThrow
   */
  export type ReturnItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * Filter, which ReturnItem to fetch.
     */
    where?: ReturnItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReturnItems to fetch.
     */
    orderBy?: ReturnItemOrderByWithRelationInput | ReturnItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReturnItems.
     */
    cursor?: ReturnItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReturnItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReturnItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReturnItems.
     */
    distinct?: ReturnItemScalarFieldEnum | ReturnItemScalarFieldEnum[]
  }

  /**
   * ReturnItem findMany
   */
  export type ReturnItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * Filter, which ReturnItems to fetch.
     */
    where?: ReturnItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReturnItems to fetch.
     */
    orderBy?: ReturnItemOrderByWithRelationInput | ReturnItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReturnItems.
     */
    cursor?: ReturnItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReturnItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReturnItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReturnItems.
     */
    distinct?: ReturnItemScalarFieldEnum | ReturnItemScalarFieldEnum[]
  }

  /**
   * ReturnItem create
   */
  export type ReturnItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ReturnItem.
     */
    data: XOR<ReturnItemCreateInput, ReturnItemUncheckedCreateInput>
  }

  /**
   * ReturnItem createMany
   */
  export type ReturnItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReturnItems.
     */
    data: ReturnItemCreateManyInput | ReturnItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReturnItem createManyAndReturn
   */
  export type ReturnItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * The data used to create many ReturnItems.
     */
    data: ReturnItemCreateManyInput | ReturnItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReturnItem update
   */
  export type ReturnItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ReturnItem.
     */
    data: XOR<ReturnItemUpdateInput, ReturnItemUncheckedUpdateInput>
    /**
     * Choose, which ReturnItem to update.
     */
    where: ReturnItemWhereUniqueInput
  }

  /**
   * ReturnItem updateMany
   */
  export type ReturnItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReturnItems.
     */
    data: XOR<ReturnItemUpdateManyMutationInput, ReturnItemUncheckedUpdateManyInput>
    /**
     * Filter which ReturnItems to update
     */
    where?: ReturnItemWhereInput
    /**
     * Limit how many ReturnItems to update.
     */
    limit?: number
  }

  /**
   * ReturnItem updateManyAndReturn
   */
  export type ReturnItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * The data used to update ReturnItems.
     */
    data: XOR<ReturnItemUpdateManyMutationInput, ReturnItemUncheckedUpdateManyInput>
    /**
     * Filter which ReturnItems to update
     */
    where?: ReturnItemWhereInput
    /**
     * Limit how many ReturnItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReturnItem upsert
   */
  export type ReturnItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ReturnItem to update in case it exists.
     */
    where: ReturnItemWhereUniqueInput
    /**
     * In case the ReturnItem found by the `where` argument doesn't exist, create a new ReturnItem with this data.
     */
    create: XOR<ReturnItemCreateInput, ReturnItemUncheckedCreateInput>
    /**
     * In case the ReturnItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReturnItemUpdateInput, ReturnItemUncheckedUpdateInput>
  }

  /**
   * ReturnItem delete
   */
  export type ReturnItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * Filter which ReturnItem to delete.
     */
    where: ReturnItemWhereUniqueInput
  }

  /**
   * ReturnItem deleteMany
   */
  export type ReturnItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReturnItems to delete
     */
    where?: ReturnItemWhereInput
    /**
     * Limit how many ReturnItems to delete.
     */
    limit?: number
  }

  /**
   * ReturnItem without action
   */
  export type ReturnItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    username: 'username',
    passwordHash: 'passwordHash',
    profilePic: 'profilePic',
    role: 'role',
    requiresPasswordChange: 'requiresPasswordChange',
    isActive: 'isActive',
    creditLimit: 'creditLimit',
    creditBalance: 'creditBalance',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SupplierScalarFieldEnum: {
    id: 'id',
    name: 'name',
    creditBalance: 'creditBalance',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SupplierScalarFieldEnum = (typeof SupplierScalarFieldEnum)[keyof typeof SupplierScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    category: 'category',
    imageUrl: 'imageUrl',
    price: 'price',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const RetailerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    address: 'address',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RetailerScalarFieldEnum = (typeof RetailerScalarFieldEnum)[keyof typeof RetailerScalarFieldEnum]


  export const SupportedBankScalarFieldEnum: {
    id: 'id',
    name: 'name',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type SupportedBankScalarFieldEnum = (typeof SupportedBankScalarFieldEnum)[keyof typeof SupportedBankScalarFieldEnum]


  export const InventoryBatchScalarFieldEnum: {
    id: 'id',
    batchCode: 'batchCode',
    productId: 'productId',
    supplierId: 'supplierId',
    quantityRecieved: 'quantityRecieved',
    remainingQty: 'remainingQty',
    unitCostPrice: 'unitCostPrice',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InventoryBatchScalarFieldEnum = (typeof InventoryBatchScalarFieldEnum)[keyof typeof InventoryBatchScalarFieldEnum]


  export const StockIssuanceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    status: 'status',
    totalWholesaleValue: 'totalWholesaleValue',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StockIssuanceScalarFieldEnum = (typeof StockIssuanceScalarFieldEnum)[keyof typeof StockIssuanceScalarFieldEnum]


  export const IssuanceItemScalarFieldEnum: {
    id: 'id',
    issuanceId: 'issuanceId',
    productId: 'productId',
    wholesalePrice: 'wholesalePrice',
    qtyIssued: 'qtyIssued',
    qtyRemaining: 'qtyRemaining',
    cogsCalculated: 'cogsCalculated'
  };

  export type IssuanceItemScalarFieldEnum = (typeof IssuanceItemScalarFieldEnum)[keyof typeof IssuanceItemScalarFieldEnum]


  export const SaleScalarFieldEnum: {
    id: 'id',
    salesRepId: 'salesRepId',
    retailerId: 'retailerId',
    productId: 'productId',
    quantity: 'quantity',
    totalAmount: 'totalAmount',
    paymentMethod: 'paymentMethod',
    createdAt: 'createdAt'
  };

  export type SaleScalarFieldEnum = (typeof SaleScalarFieldEnum)[keyof typeof SaleScalarFieldEnum]


  export const PaymentProofScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    transactionRedId: 'transactionRedId',
    sha256Hash: 'sha256Hash',
    amount: 'amount',
    bankName: 'bankName',
    senderName: 'senderName',
    reasonRemark: 'reasonRemark',
    receipeImageUrl: 'receipeImageUrl',
    status: 'status',
    adminRemark: 'adminRemark',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentProofScalarFieldEnum = (typeof PaymentProofScalarFieldEnum)[keyof typeof PaymentProofScalarFieldEnum]


  export const LedgerEntryScalarFieldEnum: {
    id: 'id',
    transactionDate: 'transactionDate',
    fromEntity: 'fromEntity',
    fromEntityId: 'fromEntityId',
    toEntity: 'toEntity',
    toEntityId: 'toEntityId',
    amount: 'amount',
    transferMethod: 'transferMethod',
    receiptUrl: 'receiptUrl',
    auditRemark: 'auditRemark',
    transactionRefId: 'transactionRefId',
    createdAt: 'createdAt'
  };

  export type LedgerEntryScalarFieldEnum = (typeof LedgerEntryScalarFieldEnum)[keyof typeof LedgerEntryScalarFieldEnum]


  export const StockReturnScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    totalValue: 'totalValue',
    reason: 'reason',
    status: 'status',
    destination: 'destination',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StockReturnScalarFieldEnum = (typeof StockReturnScalarFieldEnum)[keyof typeof StockReturnScalarFieldEnum]


  export const ReturnItemScalarFieldEnum: {
    id: 'id',
    stockReturnId: 'stockReturnId',
    itemId: 'itemId',
    quantity: 'quantity'
  };

  export type ReturnItemScalarFieldEnum = (typeof ReturnItemScalarFieldEnum)[keyof typeof ReturnItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'IssuanceStatus'
   */
  export type EnumIssuanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IssuanceStatus'>
    


  /**
   * Reference to a field of type 'IssuanceStatus[]'
   */
  export type ListEnumIssuanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IssuanceStatus[]'>
    


  /**
   * Reference to a field of type 'ProofStatus'
   */
  export type EnumProofStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProofStatus'>
    


  /**
   * Reference to a field of type 'ProofStatus[]'
   */
  export type ListEnumProofStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProofStatus[]'>
    


  /**
   * Reference to a field of type 'AuditEntity'
   */
  export type EnumAuditEntityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditEntity'>
    


  /**
   * Reference to a field of type 'AuditEntity[]'
   */
  export type ListEnumAuditEntityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditEntity[]'>
    


  /**
   * Reference to a field of type 'ReturnStatus'
   */
  export type EnumReturnStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReturnStatus'>
    


  /**
   * Reference to a field of type 'ReturnStatus[]'
   */
  export type ListEnumReturnStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReturnStatus[]'>
    


  /**
   * Reference to a field of type 'ReturnDestination'
   */
  export type EnumReturnDestinationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReturnDestination'>
    


  /**
   * Reference to a field of type 'ReturnDestination[]'
   */
  export type ListEnumReturnDestinationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReturnDestination[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    profilePic?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    requiresPasswordChange?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    creditLimit?: DecimalFilter<"User"> | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalFilter<"User"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    stockIssusances?: StockIssuanceListRelationFilter
    paymentProofs?: PaymentProofListRelationFilter
    sales?: SaleListRelationFilter
    returns?: StockReturnListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    profilePic?: SortOrderInput | SortOrder
    role?: SortOrder
    requiresPasswordChange?: SortOrder
    isActive?: SortOrder
    creditLimit?: SortOrder
    creditBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stockIssusances?: StockIssuanceOrderByRelationAggregateInput
    paymentProofs?: PaymentProofOrderByRelationAggregateInput
    sales?: SaleOrderByRelationAggregateInput
    returns?: StockReturnOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    profilePic?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    requiresPasswordChange?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    creditLimit?: DecimalFilter<"User"> | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalFilter<"User"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    stockIssusances?: StockIssuanceListRelationFilter
    paymentProofs?: PaymentProofListRelationFilter
    sales?: SaleListRelationFilter
    returns?: StockReturnListRelationFilter
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    profilePic?: SortOrderInput | SortOrder
    role?: SortOrder
    requiresPasswordChange?: SortOrder
    isActive?: SortOrder
    creditLimit?: SortOrder
    creditBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    profilePic?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    requiresPasswordChange?: BoolWithAggregatesFilter<"User"> | boolean
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    creditLimit?: DecimalWithAggregatesFilter<"User"> | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalWithAggregatesFilter<"User"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SupplierWhereInput = {
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    id?: StringFilter<"Supplier"> | string
    name?: StringFilter<"Supplier"> | string
    creditBalance?: DecimalFilter<"Supplier"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeFilter<"Supplier"> | Date | string
    batches?: InventoryBatchListRelationFilter
  }

  export type SupplierOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    creditBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    batches?: InventoryBatchOrderByRelationAggregateInput
  }

  export type SupplierWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    name?: StringFilter<"Supplier"> | string
    creditBalance?: DecimalFilter<"Supplier"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeFilter<"Supplier"> | Date | string
    batches?: InventoryBatchListRelationFilter
  }, "id">

  export type SupplierOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    creditBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SupplierCountOrderByAggregateInput
    _avg?: SupplierAvgOrderByAggregateInput
    _max?: SupplierMaxOrderByAggregateInput
    _min?: SupplierMinOrderByAggregateInput
    _sum?: SupplierSumOrderByAggregateInput
  }

  export type SupplierScalarWhereWithAggregatesInput = {
    AND?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    OR?: SupplierScalarWhereWithAggregatesInput[]
    NOT?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Supplier"> | string
    name?: StringWithAggregatesFilter<"Supplier"> | string
    creditBalance?: DecimalWithAggregatesFilter<"Supplier"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Supplier"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    category?: StringNullableFilter<"Product"> | string | null
    imageUrl?: StringNullableFilter<"Product"> | string | null
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    batches?: InventoryBatchListRelationFilter
    sales?: SaleListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    batches?: InventoryBatchOrderByRelationAggregateInput
    sales?: SaleOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    category?: StringNullableFilter<"Product"> | string | null
    imageUrl?: StringNullableFilter<"Product"> | string | null
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    batches?: InventoryBatchListRelationFilter
    sales?: SaleListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    category?: StringNullableWithAggregatesFilter<"Product"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Product"> | string | null
    price?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type RetailerWhereInput = {
    AND?: RetailerWhereInput | RetailerWhereInput[]
    OR?: RetailerWhereInput[]
    NOT?: RetailerWhereInput | RetailerWhereInput[]
    id?: StringFilter<"Retailer"> | string
    name?: StringFilter<"Retailer"> | string
    phone?: StringNullableFilter<"Retailer"> | string | null
    address?: StringNullableFilter<"Retailer"> | string | null
    createdAt?: DateTimeFilter<"Retailer"> | Date | string
    updatedAt?: DateTimeFilter<"Retailer"> | Date | string
    sales?: SaleListRelationFilter
  }

  export type RetailerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sales?: SaleOrderByRelationAggregateInput
  }

  export type RetailerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phone?: string
    AND?: RetailerWhereInput | RetailerWhereInput[]
    OR?: RetailerWhereInput[]
    NOT?: RetailerWhereInput | RetailerWhereInput[]
    name?: StringFilter<"Retailer"> | string
    address?: StringNullableFilter<"Retailer"> | string | null
    createdAt?: DateTimeFilter<"Retailer"> | Date | string
    updatedAt?: DateTimeFilter<"Retailer"> | Date | string
    sales?: SaleListRelationFilter
  }, "id" | "phone">

  export type RetailerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RetailerCountOrderByAggregateInput
    _max?: RetailerMaxOrderByAggregateInput
    _min?: RetailerMinOrderByAggregateInput
  }

  export type RetailerScalarWhereWithAggregatesInput = {
    AND?: RetailerScalarWhereWithAggregatesInput | RetailerScalarWhereWithAggregatesInput[]
    OR?: RetailerScalarWhereWithAggregatesInput[]
    NOT?: RetailerScalarWhereWithAggregatesInput | RetailerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Retailer"> | string
    name?: StringWithAggregatesFilter<"Retailer"> | string
    phone?: StringNullableWithAggregatesFilter<"Retailer"> | string | null
    address?: StringNullableWithAggregatesFilter<"Retailer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Retailer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Retailer"> | Date | string
  }

  export type SupportedBankWhereInput = {
    AND?: SupportedBankWhereInput | SupportedBankWhereInput[]
    OR?: SupportedBankWhereInput[]
    NOT?: SupportedBankWhereInput | SupportedBankWhereInput[]
    id?: StringFilter<"SupportedBank"> | string
    name?: StringFilter<"SupportedBank"> | string
    isActive?: BoolFilter<"SupportedBank"> | boolean
    createdAt?: DateTimeFilter<"SupportedBank"> | Date | string
  }

  export type SupportedBankOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type SupportedBankWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: SupportedBankWhereInput | SupportedBankWhereInput[]
    OR?: SupportedBankWhereInput[]
    NOT?: SupportedBankWhereInput | SupportedBankWhereInput[]
    isActive?: BoolFilter<"SupportedBank"> | boolean
    createdAt?: DateTimeFilter<"SupportedBank"> | Date | string
  }, "id" | "name">

  export type SupportedBankOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: SupportedBankCountOrderByAggregateInput
    _max?: SupportedBankMaxOrderByAggregateInput
    _min?: SupportedBankMinOrderByAggregateInput
  }

  export type SupportedBankScalarWhereWithAggregatesInput = {
    AND?: SupportedBankScalarWhereWithAggregatesInput | SupportedBankScalarWhereWithAggregatesInput[]
    OR?: SupportedBankScalarWhereWithAggregatesInput[]
    NOT?: SupportedBankScalarWhereWithAggregatesInput | SupportedBankScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SupportedBank"> | string
    name?: StringWithAggregatesFilter<"SupportedBank"> | string
    isActive?: BoolWithAggregatesFilter<"SupportedBank"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"SupportedBank"> | Date | string
  }

  export type InventoryBatchWhereInput = {
    AND?: InventoryBatchWhereInput | InventoryBatchWhereInput[]
    OR?: InventoryBatchWhereInput[]
    NOT?: InventoryBatchWhereInput | InventoryBatchWhereInput[]
    id?: StringFilter<"InventoryBatch"> | string
    batchCode?: StringFilter<"InventoryBatch"> | string
    productId?: StringFilter<"InventoryBatch"> | string
    supplierId?: StringFilter<"InventoryBatch"> | string
    quantityRecieved?: IntFilter<"InventoryBatch"> | number
    remainingQty?: IntFilter<"InventoryBatch"> | number
    unitCostPrice?: DecimalFilter<"InventoryBatch"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"InventoryBatch"> | Date | string
    updatedAt?: DateTimeFilter<"InventoryBatch"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    supplier?: XOR<SupplierScalarRelationFilter, SupplierWhereInput>
  }

  export type InventoryBatchOrderByWithRelationInput = {
    id?: SortOrder
    batchCode?: SortOrder
    productId?: SortOrder
    supplierId?: SortOrder
    quantityRecieved?: SortOrder
    remainingQty?: SortOrder
    unitCostPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    supplier?: SupplierOrderByWithRelationInput
  }

  export type InventoryBatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InventoryBatchWhereInput | InventoryBatchWhereInput[]
    OR?: InventoryBatchWhereInput[]
    NOT?: InventoryBatchWhereInput | InventoryBatchWhereInput[]
    batchCode?: StringFilter<"InventoryBatch"> | string
    productId?: StringFilter<"InventoryBatch"> | string
    supplierId?: StringFilter<"InventoryBatch"> | string
    quantityRecieved?: IntFilter<"InventoryBatch"> | number
    remainingQty?: IntFilter<"InventoryBatch"> | number
    unitCostPrice?: DecimalFilter<"InventoryBatch"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"InventoryBatch"> | Date | string
    updatedAt?: DateTimeFilter<"InventoryBatch"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    supplier?: XOR<SupplierScalarRelationFilter, SupplierWhereInput>
  }, "id">

  export type InventoryBatchOrderByWithAggregationInput = {
    id?: SortOrder
    batchCode?: SortOrder
    productId?: SortOrder
    supplierId?: SortOrder
    quantityRecieved?: SortOrder
    remainingQty?: SortOrder
    unitCostPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InventoryBatchCountOrderByAggregateInput
    _avg?: InventoryBatchAvgOrderByAggregateInput
    _max?: InventoryBatchMaxOrderByAggregateInput
    _min?: InventoryBatchMinOrderByAggregateInput
    _sum?: InventoryBatchSumOrderByAggregateInput
  }

  export type InventoryBatchScalarWhereWithAggregatesInput = {
    AND?: InventoryBatchScalarWhereWithAggregatesInput | InventoryBatchScalarWhereWithAggregatesInput[]
    OR?: InventoryBatchScalarWhereWithAggregatesInput[]
    NOT?: InventoryBatchScalarWhereWithAggregatesInput | InventoryBatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InventoryBatch"> | string
    batchCode?: StringWithAggregatesFilter<"InventoryBatch"> | string
    productId?: StringWithAggregatesFilter<"InventoryBatch"> | string
    supplierId?: StringWithAggregatesFilter<"InventoryBatch"> | string
    quantityRecieved?: IntWithAggregatesFilter<"InventoryBatch"> | number
    remainingQty?: IntWithAggregatesFilter<"InventoryBatch"> | number
    unitCostPrice?: DecimalWithAggregatesFilter<"InventoryBatch"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"InventoryBatch"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"InventoryBatch"> | Date | string
  }

  export type StockIssuanceWhereInput = {
    AND?: StockIssuanceWhereInput | StockIssuanceWhereInput[]
    OR?: StockIssuanceWhereInput[]
    NOT?: StockIssuanceWhereInput | StockIssuanceWhereInput[]
    id?: StringFilter<"StockIssuance"> | string
    userId?: StringFilter<"StockIssuance"> | string
    status?: EnumIssuanceStatusFilter<"StockIssuance"> | $Enums.IssuanceStatus
    totalWholesaleValue?: DecimalFilter<"StockIssuance"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"StockIssuance"> | Date | string
    updatedAt?: DateTimeFilter<"StockIssuance"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: IssuanceItemListRelationFilter
  }

  export type StockIssuanceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    totalWholesaleValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    items?: IssuanceItemOrderByRelationAggregateInput
  }

  export type StockIssuanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StockIssuanceWhereInput | StockIssuanceWhereInput[]
    OR?: StockIssuanceWhereInput[]
    NOT?: StockIssuanceWhereInput | StockIssuanceWhereInput[]
    userId?: StringFilter<"StockIssuance"> | string
    status?: EnumIssuanceStatusFilter<"StockIssuance"> | $Enums.IssuanceStatus
    totalWholesaleValue?: DecimalFilter<"StockIssuance"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"StockIssuance"> | Date | string
    updatedAt?: DateTimeFilter<"StockIssuance"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: IssuanceItemListRelationFilter
  }, "id">

  export type StockIssuanceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    totalWholesaleValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StockIssuanceCountOrderByAggregateInput
    _avg?: StockIssuanceAvgOrderByAggregateInput
    _max?: StockIssuanceMaxOrderByAggregateInput
    _min?: StockIssuanceMinOrderByAggregateInput
    _sum?: StockIssuanceSumOrderByAggregateInput
  }

  export type StockIssuanceScalarWhereWithAggregatesInput = {
    AND?: StockIssuanceScalarWhereWithAggregatesInput | StockIssuanceScalarWhereWithAggregatesInput[]
    OR?: StockIssuanceScalarWhereWithAggregatesInput[]
    NOT?: StockIssuanceScalarWhereWithAggregatesInput | StockIssuanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StockIssuance"> | string
    userId?: StringWithAggregatesFilter<"StockIssuance"> | string
    status?: EnumIssuanceStatusWithAggregatesFilter<"StockIssuance"> | $Enums.IssuanceStatus
    totalWholesaleValue?: DecimalWithAggregatesFilter<"StockIssuance"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"StockIssuance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StockIssuance"> | Date | string
  }

  export type IssuanceItemWhereInput = {
    AND?: IssuanceItemWhereInput | IssuanceItemWhereInput[]
    OR?: IssuanceItemWhereInput[]
    NOT?: IssuanceItemWhereInput | IssuanceItemWhereInput[]
    id?: StringFilter<"IssuanceItem"> | string
    issuanceId?: StringFilter<"IssuanceItem"> | string
    productId?: StringFilter<"IssuanceItem"> | string
    wholesalePrice?: DecimalFilter<"IssuanceItem"> | Decimal | DecimalJsLike | number | string
    qtyIssued?: IntFilter<"IssuanceItem"> | number
    qtyRemaining?: IntFilter<"IssuanceItem"> | number
    cogsCalculated?: DecimalFilter<"IssuanceItem"> | Decimal | DecimalJsLike | number | string
    issuance?: XOR<StockIssuanceScalarRelationFilter, StockIssuanceWhereInput>
  }

  export type IssuanceItemOrderByWithRelationInput = {
    id?: SortOrder
    issuanceId?: SortOrder
    productId?: SortOrder
    wholesalePrice?: SortOrder
    qtyIssued?: SortOrder
    qtyRemaining?: SortOrder
    cogsCalculated?: SortOrder
    issuance?: StockIssuanceOrderByWithRelationInput
  }

  export type IssuanceItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: IssuanceItemWhereInput | IssuanceItemWhereInput[]
    OR?: IssuanceItemWhereInput[]
    NOT?: IssuanceItemWhereInput | IssuanceItemWhereInput[]
    issuanceId?: StringFilter<"IssuanceItem"> | string
    productId?: StringFilter<"IssuanceItem"> | string
    wholesalePrice?: DecimalFilter<"IssuanceItem"> | Decimal | DecimalJsLike | number | string
    qtyIssued?: IntFilter<"IssuanceItem"> | number
    qtyRemaining?: IntFilter<"IssuanceItem"> | number
    cogsCalculated?: DecimalFilter<"IssuanceItem"> | Decimal | DecimalJsLike | number | string
    issuance?: XOR<StockIssuanceScalarRelationFilter, StockIssuanceWhereInput>
  }, "id">

  export type IssuanceItemOrderByWithAggregationInput = {
    id?: SortOrder
    issuanceId?: SortOrder
    productId?: SortOrder
    wholesalePrice?: SortOrder
    qtyIssued?: SortOrder
    qtyRemaining?: SortOrder
    cogsCalculated?: SortOrder
    _count?: IssuanceItemCountOrderByAggregateInput
    _avg?: IssuanceItemAvgOrderByAggregateInput
    _max?: IssuanceItemMaxOrderByAggregateInput
    _min?: IssuanceItemMinOrderByAggregateInput
    _sum?: IssuanceItemSumOrderByAggregateInput
  }

  export type IssuanceItemScalarWhereWithAggregatesInput = {
    AND?: IssuanceItemScalarWhereWithAggregatesInput | IssuanceItemScalarWhereWithAggregatesInput[]
    OR?: IssuanceItemScalarWhereWithAggregatesInput[]
    NOT?: IssuanceItemScalarWhereWithAggregatesInput | IssuanceItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IssuanceItem"> | string
    issuanceId?: StringWithAggregatesFilter<"IssuanceItem"> | string
    productId?: StringWithAggregatesFilter<"IssuanceItem"> | string
    wholesalePrice?: DecimalWithAggregatesFilter<"IssuanceItem"> | Decimal | DecimalJsLike | number | string
    qtyIssued?: IntWithAggregatesFilter<"IssuanceItem"> | number
    qtyRemaining?: IntWithAggregatesFilter<"IssuanceItem"> | number
    cogsCalculated?: DecimalWithAggregatesFilter<"IssuanceItem"> | Decimal | DecimalJsLike | number | string
  }

  export type SaleWhereInput = {
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    id?: StringFilter<"Sale"> | string
    salesRepId?: StringFilter<"Sale"> | string
    retailerId?: StringFilter<"Sale"> | string
    productId?: StringFilter<"Sale"> | string
    quantity?: IntFilter<"Sale"> | number
    totalAmount?: DecimalFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFilter<"Sale"> | string
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    salesRep?: XOR<UserScalarRelationFilter, UserWhereInput>
    retailer?: XOR<RetailerScalarRelationFilter, RetailerWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type SaleOrderByWithRelationInput = {
    id?: SortOrder
    salesRepId?: SortOrder
    retailerId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    totalAmount?: SortOrder
    paymentMethod?: SortOrder
    createdAt?: SortOrder
    salesRep?: UserOrderByWithRelationInput
    retailer?: RetailerOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type SaleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    salesRepId?: StringFilter<"Sale"> | string
    retailerId?: StringFilter<"Sale"> | string
    productId?: StringFilter<"Sale"> | string
    quantity?: IntFilter<"Sale"> | number
    totalAmount?: DecimalFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFilter<"Sale"> | string
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    salesRep?: XOR<UserScalarRelationFilter, UserWhereInput>
    retailer?: XOR<RetailerScalarRelationFilter, RetailerWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type SaleOrderByWithAggregationInput = {
    id?: SortOrder
    salesRepId?: SortOrder
    retailerId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    totalAmount?: SortOrder
    paymentMethod?: SortOrder
    createdAt?: SortOrder
    _count?: SaleCountOrderByAggregateInput
    _avg?: SaleAvgOrderByAggregateInput
    _max?: SaleMaxOrderByAggregateInput
    _min?: SaleMinOrderByAggregateInput
    _sum?: SaleSumOrderByAggregateInput
  }

  export type SaleScalarWhereWithAggregatesInput = {
    AND?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    OR?: SaleScalarWhereWithAggregatesInput[]
    NOT?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sale"> | string
    salesRepId?: StringWithAggregatesFilter<"Sale"> | string
    retailerId?: StringWithAggregatesFilter<"Sale"> | string
    productId?: StringWithAggregatesFilter<"Sale"> | string
    quantity?: IntWithAggregatesFilter<"Sale"> | number
    totalAmount?: DecimalWithAggregatesFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringWithAggregatesFilter<"Sale"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
  }

  export type PaymentProofWhereInput = {
    AND?: PaymentProofWhereInput | PaymentProofWhereInput[]
    OR?: PaymentProofWhereInput[]
    NOT?: PaymentProofWhereInput | PaymentProofWhereInput[]
    id?: StringFilter<"PaymentProof"> | string
    userId?: StringFilter<"PaymentProof"> | string
    transactionRedId?: StringFilter<"PaymentProof"> | string
    sha256Hash?: StringFilter<"PaymentProof"> | string
    amount?: DecimalFilter<"PaymentProof"> | Decimal | DecimalJsLike | number | string
    bankName?: StringFilter<"PaymentProof"> | string
    senderName?: StringNullableFilter<"PaymentProof"> | string | null
    reasonRemark?: StringNullableFilter<"PaymentProof"> | string | null
    receipeImageUrl?: StringNullableFilter<"PaymentProof"> | string | null
    status?: EnumProofStatusFilter<"PaymentProof"> | $Enums.ProofStatus
    adminRemark?: StringNullableFilter<"PaymentProof"> | string | null
    createdAt?: DateTimeFilter<"PaymentProof"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentProof"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PaymentProofOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    transactionRedId?: SortOrder
    sha256Hash?: SortOrder
    amount?: SortOrder
    bankName?: SortOrder
    senderName?: SortOrderInput | SortOrder
    reasonRemark?: SortOrderInput | SortOrder
    receipeImageUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    adminRemark?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PaymentProofWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transactionRedId?: string
    sha256Hash?: string
    AND?: PaymentProofWhereInput | PaymentProofWhereInput[]
    OR?: PaymentProofWhereInput[]
    NOT?: PaymentProofWhereInput | PaymentProofWhereInput[]
    userId?: StringFilter<"PaymentProof"> | string
    amount?: DecimalFilter<"PaymentProof"> | Decimal | DecimalJsLike | number | string
    bankName?: StringFilter<"PaymentProof"> | string
    senderName?: StringNullableFilter<"PaymentProof"> | string | null
    reasonRemark?: StringNullableFilter<"PaymentProof"> | string | null
    receipeImageUrl?: StringNullableFilter<"PaymentProof"> | string | null
    status?: EnumProofStatusFilter<"PaymentProof"> | $Enums.ProofStatus
    adminRemark?: StringNullableFilter<"PaymentProof"> | string | null
    createdAt?: DateTimeFilter<"PaymentProof"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentProof"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "transactionRedId" | "sha256Hash">

  export type PaymentProofOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    transactionRedId?: SortOrder
    sha256Hash?: SortOrder
    amount?: SortOrder
    bankName?: SortOrder
    senderName?: SortOrderInput | SortOrder
    reasonRemark?: SortOrderInput | SortOrder
    receipeImageUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    adminRemark?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentProofCountOrderByAggregateInput
    _avg?: PaymentProofAvgOrderByAggregateInput
    _max?: PaymentProofMaxOrderByAggregateInput
    _min?: PaymentProofMinOrderByAggregateInput
    _sum?: PaymentProofSumOrderByAggregateInput
  }

  export type PaymentProofScalarWhereWithAggregatesInput = {
    AND?: PaymentProofScalarWhereWithAggregatesInput | PaymentProofScalarWhereWithAggregatesInput[]
    OR?: PaymentProofScalarWhereWithAggregatesInput[]
    NOT?: PaymentProofScalarWhereWithAggregatesInput | PaymentProofScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PaymentProof"> | string
    userId?: StringWithAggregatesFilter<"PaymentProof"> | string
    transactionRedId?: StringWithAggregatesFilter<"PaymentProof"> | string
    sha256Hash?: StringWithAggregatesFilter<"PaymentProof"> | string
    amount?: DecimalWithAggregatesFilter<"PaymentProof"> | Decimal | DecimalJsLike | number | string
    bankName?: StringWithAggregatesFilter<"PaymentProof"> | string
    senderName?: StringNullableWithAggregatesFilter<"PaymentProof"> | string | null
    reasonRemark?: StringNullableWithAggregatesFilter<"PaymentProof"> | string | null
    receipeImageUrl?: StringNullableWithAggregatesFilter<"PaymentProof"> | string | null
    status?: EnumProofStatusWithAggregatesFilter<"PaymentProof"> | $Enums.ProofStatus
    adminRemark?: StringNullableWithAggregatesFilter<"PaymentProof"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PaymentProof"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PaymentProof"> | Date | string
  }

  export type LedgerEntryWhereInput = {
    AND?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    OR?: LedgerEntryWhereInput[]
    NOT?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    id?: StringFilter<"LedgerEntry"> | string
    transactionDate?: DateTimeFilter<"LedgerEntry"> | Date | string
    fromEntity?: EnumAuditEntityFilter<"LedgerEntry"> | $Enums.AuditEntity
    fromEntityId?: StringNullableFilter<"LedgerEntry"> | string | null
    toEntity?: EnumAuditEntityFilter<"LedgerEntry"> | $Enums.AuditEntity
    toEntityId?: StringNullableFilter<"LedgerEntry"> | string | null
    amount?: DecimalFilter<"LedgerEntry"> | Decimal | DecimalJsLike | number | string
    transferMethod?: StringFilter<"LedgerEntry"> | string
    receiptUrl?: StringNullableFilter<"LedgerEntry"> | string | null
    auditRemark?: StringNullableFilter<"LedgerEntry"> | string | null
    transactionRefId?: StringNullableFilter<"LedgerEntry"> | string | null
    createdAt?: DateTimeFilter<"LedgerEntry"> | Date | string
  }

  export type LedgerEntryOrderByWithRelationInput = {
    id?: SortOrder
    transactionDate?: SortOrder
    fromEntity?: SortOrder
    fromEntityId?: SortOrderInput | SortOrder
    toEntity?: SortOrder
    toEntityId?: SortOrderInput | SortOrder
    amount?: SortOrder
    transferMethod?: SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    auditRemark?: SortOrderInput | SortOrder
    transactionRefId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type LedgerEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transactionRefId?: string
    AND?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    OR?: LedgerEntryWhereInput[]
    NOT?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    transactionDate?: DateTimeFilter<"LedgerEntry"> | Date | string
    fromEntity?: EnumAuditEntityFilter<"LedgerEntry"> | $Enums.AuditEntity
    fromEntityId?: StringNullableFilter<"LedgerEntry"> | string | null
    toEntity?: EnumAuditEntityFilter<"LedgerEntry"> | $Enums.AuditEntity
    toEntityId?: StringNullableFilter<"LedgerEntry"> | string | null
    amount?: DecimalFilter<"LedgerEntry"> | Decimal | DecimalJsLike | number | string
    transferMethod?: StringFilter<"LedgerEntry"> | string
    receiptUrl?: StringNullableFilter<"LedgerEntry"> | string | null
    auditRemark?: StringNullableFilter<"LedgerEntry"> | string | null
    createdAt?: DateTimeFilter<"LedgerEntry"> | Date | string
  }, "id" | "transactionRefId">

  export type LedgerEntryOrderByWithAggregationInput = {
    id?: SortOrder
    transactionDate?: SortOrder
    fromEntity?: SortOrder
    fromEntityId?: SortOrderInput | SortOrder
    toEntity?: SortOrder
    toEntityId?: SortOrderInput | SortOrder
    amount?: SortOrder
    transferMethod?: SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    auditRemark?: SortOrderInput | SortOrder
    transactionRefId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LedgerEntryCountOrderByAggregateInput
    _avg?: LedgerEntryAvgOrderByAggregateInput
    _max?: LedgerEntryMaxOrderByAggregateInput
    _min?: LedgerEntryMinOrderByAggregateInput
    _sum?: LedgerEntrySumOrderByAggregateInput
  }

  export type LedgerEntryScalarWhereWithAggregatesInput = {
    AND?: LedgerEntryScalarWhereWithAggregatesInput | LedgerEntryScalarWhereWithAggregatesInput[]
    OR?: LedgerEntryScalarWhereWithAggregatesInput[]
    NOT?: LedgerEntryScalarWhereWithAggregatesInput | LedgerEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LedgerEntry"> | string
    transactionDate?: DateTimeWithAggregatesFilter<"LedgerEntry"> | Date | string
    fromEntity?: EnumAuditEntityWithAggregatesFilter<"LedgerEntry"> | $Enums.AuditEntity
    fromEntityId?: StringNullableWithAggregatesFilter<"LedgerEntry"> | string | null
    toEntity?: EnumAuditEntityWithAggregatesFilter<"LedgerEntry"> | $Enums.AuditEntity
    toEntityId?: StringNullableWithAggregatesFilter<"LedgerEntry"> | string | null
    amount?: DecimalWithAggregatesFilter<"LedgerEntry"> | Decimal | DecimalJsLike | number | string
    transferMethod?: StringWithAggregatesFilter<"LedgerEntry"> | string
    receiptUrl?: StringNullableWithAggregatesFilter<"LedgerEntry"> | string | null
    auditRemark?: StringNullableWithAggregatesFilter<"LedgerEntry"> | string | null
    transactionRefId?: StringNullableWithAggregatesFilter<"LedgerEntry"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LedgerEntry"> | Date | string
  }

  export type StockReturnWhereInput = {
    AND?: StockReturnWhereInput | StockReturnWhereInput[]
    OR?: StockReturnWhereInput[]
    NOT?: StockReturnWhereInput | StockReturnWhereInput[]
    id?: StringFilter<"StockReturn"> | string
    userId?: StringFilter<"StockReturn"> | string
    totalValue?: DecimalFilter<"StockReturn"> | Decimal | DecimalJsLike | number | string
    reason?: StringFilter<"StockReturn"> | string
    status?: EnumReturnStatusFilter<"StockReturn"> | $Enums.ReturnStatus
    destination?: EnumReturnDestinationNullableFilter<"StockReturn"> | $Enums.ReturnDestination | null
    createdAt?: DateTimeFilter<"StockReturn"> | Date | string
    updatedAt?: DateTimeFilter<"StockReturn"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: ReturnItemListRelationFilter
  }

  export type StockReturnOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    destination?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    items?: ReturnItemOrderByRelationAggregateInput
  }

  export type StockReturnWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StockReturnWhereInput | StockReturnWhereInput[]
    OR?: StockReturnWhereInput[]
    NOT?: StockReturnWhereInput | StockReturnWhereInput[]
    userId?: StringFilter<"StockReturn"> | string
    totalValue?: DecimalFilter<"StockReturn"> | Decimal | DecimalJsLike | number | string
    reason?: StringFilter<"StockReturn"> | string
    status?: EnumReturnStatusFilter<"StockReturn"> | $Enums.ReturnStatus
    destination?: EnumReturnDestinationNullableFilter<"StockReturn"> | $Enums.ReturnDestination | null
    createdAt?: DateTimeFilter<"StockReturn"> | Date | string
    updatedAt?: DateTimeFilter<"StockReturn"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: ReturnItemListRelationFilter
  }, "id">

  export type StockReturnOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    destination?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StockReturnCountOrderByAggregateInput
    _avg?: StockReturnAvgOrderByAggregateInput
    _max?: StockReturnMaxOrderByAggregateInput
    _min?: StockReturnMinOrderByAggregateInput
    _sum?: StockReturnSumOrderByAggregateInput
  }

  export type StockReturnScalarWhereWithAggregatesInput = {
    AND?: StockReturnScalarWhereWithAggregatesInput | StockReturnScalarWhereWithAggregatesInput[]
    OR?: StockReturnScalarWhereWithAggregatesInput[]
    NOT?: StockReturnScalarWhereWithAggregatesInput | StockReturnScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StockReturn"> | string
    userId?: StringWithAggregatesFilter<"StockReturn"> | string
    totalValue?: DecimalWithAggregatesFilter<"StockReturn"> | Decimal | DecimalJsLike | number | string
    reason?: StringWithAggregatesFilter<"StockReturn"> | string
    status?: EnumReturnStatusWithAggregatesFilter<"StockReturn"> | $Enums.ReturnStatus
    destination?: EnumReturnDestinationNullableWithAggregatesFilter<"StockReturn"> | $Enums.ReturnDestination | null
    createdAt?: DateTimeWithAggregatesFilter<"StockReturn"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StockReturn"> | Date | string
  }

  export type ReturnItemWhereInput = {
    AND?: ReturnItemWhereInput | ReturnItemWhereInput[]
    OR?: ReturnItemWhereInput[]
    NOT?: ReturnItemWhereInput | ReturnItemWhereInput[]
    id?: StringFilter<"ReturnItem"> | string
    stockReturnId?: StringFilter<"ReturnItem"> | string
    itemId?: StringFilter<"ReturnItem"> | string
    quantity?: IntFilter<"ReturnItem"> | number
    stockReturn?: XOR<StockReturnScalarRelationFilter, StockReturnWhereInput>
  }

  export type ReturnItemOrderByWithRelationInput = {
    id?: SortOrder
    stockReturnId?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
    stockReturn?: StockReturnOrderByWithRelationInput
  }

  export type ReturnItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReturnItemWhereInput | ReturnItemWhereInput[]
    OR?: ReturnItemWhereInput[]
    NOT?: ReturnItemWhereInput | ReturnItemWhereInput[]
    stockReturnId?: StringFilter<"ReturnItem"> | string
    itemId?: StringFilter<"ReturnItem"> | string
    quantity?: IntFilter<"ReturnItem"> | number
    stockReturn?: XOR<StockReturnScalarRelationFilter, StockReturnWhereInput>
  }, "id">

  export type ReturnItemOrderByWithAggregationInput = {
    id?: SortOrder
    stockReturnId?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
    _count?: ReturnItemCountOrderByAggregateInput
    _avg?: ReturnItemAvgOrderByAggregateInput
    _max?: ReturnItemMaxOrderByAggregateInput
    _min?: ReturnItemMinOrderByAggregateInput
    _sum?: ReturnItemSumOrderByAggregateInput
  }

  export type ReturnItemScalarWhereWithAggregatesInput = {
    AND?: ReturnItemScalarWhereWithAggregatesInput | ReturnItemScalarWhereWithAggregatesInput[]
    OR?: ReturnItemScalarWhereWithAggregatesInput[]
    NOT?: ReturnItemScalarWhereWithAggregatesInput | ReturnItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReturnItem"> | string
    stockReturnId?: StringWithAggregatesFilter<"ReturnItem"> | string
    itemId?: StringWithAggregatesFilter<"ReturnItem"> | string
    quantity?: IntWithAggregatesFilter<"ReturnItem"> | number
  }

  export type UserCreateInput = {
    id?: string
    fullName: string
    username: string
    passwordHash: string
    profilePic?: string | null
    role?: $Enums.Role
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: Decimal | DecimalJsLike | number | string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stockIssusances?: StockIssuanceCreateNestedManyWithoutUserInput
    paymentProofs?: PaymentProofCreateNestedManyWithoutUserInput
    sales?: SaleCreateNestedManyWithoutSalesRepInput
    returns?: StockReturnCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    fullName: string
    username: string
    passwordHash: string
    profilePic?: string | null
    role?: $Enums.Role
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: Decimal | DecimalJsLike | number | string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stockIssusances?: StockIssuanceUncheckedCreateNestedManyWithoutUserInput
    paymentProofs?: PaymentProofUncheckedCreateNestedManyWithoutUserInput
    sales?: SaleUncheckedCreateNestedManyWithoutSalesRepInput
    returns?: StockReturnUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    requiresPasswordChange?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stockIssusances?: StockIssuanceUpdateManyWithoutUserNestedInput
    paymentProofs?: PaymentProofUpdateManyWithoutUserNestedInput
    sales?: SaleUpdateManyWithoutSalesRepNestedInput
    returns?: StockReturnUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    requiresPasswordChange?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stockIssusances?: StockIssuanceUncheckedUpdateManyWithoutUserNestedInput
    paymentProofs?: PaymentProofUncheckedUpdateManyWithoutUserNestedInput
    sales?: SaleUncheckedUpdateManyWithoutSalesRepNestedInput
    returns?: StockReturnUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    fullName: string
    username: string
    passwordHash: string
    profilePic?: string | null
    role?: $Enums.Role
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: Decimal | DecimalJsLike | number | string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    requiresPasswordChange?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    requiresPasswordChange?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierCreateInput = {
    id?: string
    name: string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    batches?: InventoryBatchCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUncheckedCreateInput = {
    id?: string
    name: string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    batches?: InventoryBatchUncheckedCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batches?: InventoryBatchUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batches?: InventoryBatchUncheckedUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierCreateManyInput = {
    id?: string
    name: string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    description?: string | null
    category?: string | null
    imageUrl?: string | null
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    batches?: InventoryBatchCreateNestedManyWithoutProductInput
    sales?: SaleCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    category?: string | null
    imageUrl?: string | null
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    batches?: InventoryBatchUncheckedCreateNestedManyWithoutProductInput
    sales?: SaleUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batches?: InventoryBatchUpdateManyWithoutProductNestedInput
    sales?: SaleUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batches?: InventoryBatchUncheckedUpdateManyWithoutProductNestedInput
    sales?: SaleUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    category?: string | null
    imageUrl?: string | null
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetailerCreateInput = {
    id?: string
    name: string
    phone?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleCreateNestedManyWithoutRetailerInput
  }

  export type RetailerUncheckedCreateInput = {
    id?: string
    name: string
    phone?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleUncheckedCreateNestedManyWithoutRetailerInput
  }

  export type RetailerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUpdateManyWithoutRetailerNestedInput
  }

  export type RetailerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUncheckedUpdateManyWithoutRetailerNestedInput
  }

  export type RetailerCreateManyInput = {
    id?: string
    name: string
    phone?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RetailerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetailerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportedBankCreateInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type SupportedBankUncheckedCreateInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type SupportedBankUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportedBankUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportedBankCreateManyInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type SupportedBankUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportedBankUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryBatchCreateInput = {
    id?: string
    batchCode: string
    quantityRecieved: number
    remainingQty: number
    unitCostPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutBatchesInput
    supplier: SupplierCreateNestedOneWithoutBatchesInput
  }

  export type InventoryBatchUncheckedCreateInput = {
    id?: string
    batchCode: string
    productId: string
    supplierId: string
    quantityRecieved: number
    remainingQty: number
    unitCostPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InventoryBatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchCode?: StringFieldUpdateOperationsInput | string
    quantityRecieved?: IntFieldUpdateOperationsInput | number
    remainingQty?: IntFieldUpdateOperationsInput | number
    unitCostPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutBatchesNestedInput
    supplier?: SupplierUpdateOneRequiredWithoutBatchesNestedInput
  }

  export type InventoryBatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchCode?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    quantityRecieved?: IntFieldUpdateOperationsInput | number
    remainingQty?: IntFieldUpdateOperationsInput | number
    unitCostPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryBatchCreateManyInput = {
    id?: string
    batchCode: string
    productId: string
    supplierId: string
    quantityRecieved: number
    remainingQty: number
    unitCostPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InventoryBatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchCode?: StringFieldUpdateOperationsInput | string
    quantityRecieved?: IntFieldUpdateOperationsInput | number
    remainingQty?: IntFieldUpdateOperationsInput | number
    unitCostPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryBatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchCode?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    quantityRecieved?: IntFieldUpdateOperationsInput | number
    remainingQty?: IntFieldUpdateOperationsInput | number
    unitCostPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockIssuanceCreateInput = {
    id?: string
    status?: $Enums.IssuanceStatus
    totalWholesaleValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStockIssusancesInput
    items?: IssuanceItemCreateNestedManyWithoutIssuanceInput
  }

  export type StockIssuanceUncheckedCreateInput = {
    id?: string
    userId: string
    status?: $Enums.IssuanceStatus
    totalWholesaleValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: IssuanceItemUncheckedCreateNestedManyWithoutIssuanceInput
  }

  export type StockIssuanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumIssuanceStatusFieldUpdateOperationsInput | $Enums.IssuanceStatus
    totalWholesaleValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStockIssusancesNestedInput
    items?: IssuanceItemUpdateManyWithoutIssuanceNestedInput
  }

  export type StockIssuanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumIssuanceStatusFieldUpdateOperationsInput | $Enums.IssuanceStatus
    totalWholesaleValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: IssuanceItemUncheckedUpdateManyWithoutIssuanceNestedInput
  }

  export type StockIssuanceCreateManyInput = {
    id?: string
    userId: string
    status?: $Enums.IssuanceStatus
    totalWholesaleValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockIssuanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumIssuanceStatusFieldUpdateOperationsInput | $Enums.IssuanceStatus
    totalWholesaleValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockIssuanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumIssuanceStatusFieldUpdateOperationsInput | $Enums.IssuanceStatus
    totalWholesaleValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IssuanceItemCreateInput = {
    id?: string
    productId: string
    wholesalePrice: Decimal | DecimalJsLike | number | string
    qtyIssued: number
    qtyRemaining: number
    cogsCalculated: Decimal | DecimalJsLike | number | string
    issuance: StockIssuanceCreateNestedOneWithoutItemsInput
  }

  export type IssuanceItemUncheckedCreateInput = {
    id?: string
    issuanceId: string
    productId: string
    wholesalePrice: Decimal | DecimalJsLike | number | string
    qtyIssued: number
    qtyRemaining: number
    cogsCalculated: Decimal | DecimalJsLike | number | string
  }

  export type IssuanceItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    wholesalePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qtyIssued?: IntFieldUpdateOperationsInput | number
    qtyRemaining?: IntFieldUpdateOperationsInput | number
    cogsCalculated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    issuance?: StockIssuanceUpdateOneRequiredWithoutItemsNestedInput
  }

  export type IssuanceItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    issuanceId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    wholesalePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qtyIssued?: IntFieldUpdateOperationsInput | number
    qtyRemaining?: IntFieldUpdateOperationsInput | number
    cogsCalculated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type IssuanceItemCreateManyInput = {
    id?: string
    issuanceId: string
    productId: string
    wholesalePrice: Decimal | DecimalJsLike | number | string
    qtyIssued: number
    qtyRemaining: number
    cogsCalculated: Decimal | DecimalJsLike | number | string
  }

  export type IssuanceItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    wholesalePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qtyIssued?: IntFieldUpdateOperationsInput | number
    qtyRemaining?: IntFieldUpdateOperationsInput | number
    cogsCalculated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type IssuanceItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    issuanceId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    wholesalePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qtyIssued?: IntFieldUpdateOperationsInput | number
    qtyRemaining?: IntFieldUpdateOperationsInput | number
    cogsCalculated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type SaleCreateInput = {
    id?: string
    quantity: number
    totalAmount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    createdAt?: Date | string
    salesRep: UserCreateNestedOneWithoutSalesInput
    retailer: RetailerCreateNestedOneWithoutSalesInput
    product: ProductCreateNestedOneWithoutSalesInput
  }

  export type SaleUncheckedCreateInput = {
    id?: string
    salesRepId: string
    retailerId: string
    productId: string
    quantity: number
    totalAmount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    createdAt?: Date | string
  }

  export type SaleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    salesRep?: UserUpdateOneRequiredWithoutSalesNestedInput
    retailer?: RetailerUpdateOneRequiredWithoutSalesNestedInput
    product?: ProductUpdateOneRequiredWithoutSalesNestedInput
  }

  export type SaleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    salesRepId?: StringFieldUpdateOperationsInput | string
    retailerId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleCreateManyInput = {
    id?: string
    salesRepId: string
    retailerId: string
    productId: string
    quantity: number
    totalAmount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    createdAt?: Date | string
  }

  export type SaleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    salesRepId?: StringFieldUpdateOperationsInput | string
    retailerId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentProofCreateInput = {
    id?: string
    transactionRedId: string
    sha256Hash: string
    amount: Decimal | DecimalJsLike | number | string
    bankName: string
    senderName?: string | null
    reasonRemark?: string | null
    receipeImageUrl?: string | null
    status?: $Enums.ProofStatus
    adminRemark?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPaymentProofsInput
  }

  export type PaymentProofUncheckedCreateInput = {
    id?: string
    userId: string
    transactionRedId: string
    sha256Hash: string
    amount: Decimal | DecimalJsLike | number | string
    bankName: string
    senderName?: string | null
    reasonRemark?: string | null
    receipeImageUrl?: string | null
    status?: $Enums.ProofStatus
    adminRemark?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentProofUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionRedId?: StringFieldUpdateOperationsInput | string
    sha256Hash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    bankName?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    reasonRemark?: NullableStringFieldUpdateOperationsInput | string | null
    receipeImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProofStatusFieldUpdateOperationsInput | $Enums.ProofStatus
    adminRemark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPaymentProofsNestedInput
  }

  export type PaymentProofUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    transactionRedId?: StringFieldUpdateOperationsInput | string
    sha256Hash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    bankName?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    reasonRemark?: NullableStringFieldUpdateOperationsInput | string | null
    receipeImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProofStatusFieldUpdateOperationsInput | $Enums.ProofStatus
    adminRemark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentProofCreateManyInput = {
    id?: string
    userId: string
    transactionRedId: string
    sha256Hash: string
    amount: Decimal | DecimalJsLike | number | string
    bankName: string
    senderName?: string | null
    reasonRemark?: string | null
    receipeImageUrl?: string | null
    status?: $Enums.ProofStatus
    adminRemark?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentProofUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionRedId?: StringFieldUpdateOperationsInput | string
    sha256Hash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    bankName?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    reasonRemark?: NullableStringFieldUpdateOperationsInput | string | null
    receipeImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProofStatusFieldUpdateOperationsInput | $Enums.ProofStatus
    adminRemark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentProofUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    transactionRedId?: StringFieldUpdateOperationsInput | string
    sha256Hash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    bankName?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    reasonRemark?: NullableStringFieldUpdateOperationsInput | string | null
    receipeImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProofStatusFieldUpdateOperationsInput | $Enums.ProofStatus
    adminRemark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryCreateInput = {
    id?: string
    transactionDate?: Date | string
    fromEntity: $Enums.AuditEntity
    fromEntityId?: string | null
    toEntity: $Enums.AuditEntity
    toEntityId?: string | null
    amount: Decimal | DecimalJsLike | number | string
    transferMethod: string
    receiptUrl?: string | null
    auditRemark?: string | null
    transactionRefId?: string | null
    createdAt?: Date | string
  }

  export type LedgerEntryUncheckedCreateInput = {
    id?: string
    transactionDate?: Date | string
    fromEntity: $Enums.AuditEntity
    fromEntityId?: string | null
    toEntity: $Enums.AuditEntity
    toEntityId?: string | null
    amount: Decimal | DecimalJsLike | number | string
    transferMethod: string
    receiptUrl?: string | null
    auditRemark?: string | null
    transactionRefId?: string | null
    createdAt?: Date | string
  }

  export type LedgerEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    fromEntity?: EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity
    fromEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    toEntity?: EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity
    toEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transferMethod?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    auditRemark?: NullableStringFieldUpdateOperationsInput | string | null
    transactionRefId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    fromEntity?: EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity
    fromEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    toEntity?: EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity
    toEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transferMethod?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    auditRemark?: NullableStringFieldUpdateOperationsInput | string | null
    transactionRefId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryCreateManyInput = {
    id?: string
    transactionDate?: Date | string
    fromEntity: $Enums.AuditEntity
    fromEntityId?: string | null
    toEntity: $Enums.AuditEntity
    toEntityId?: string | null
    amount: Decimal | DecimalJsLike | number | string
    transferMethod: string
    receiptUrl?: string | null
    auditRemark?: string | null
    transactionRefId?: string | null
    createdAt?: Date | string
  }

  export type LedgerEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    fromEntity?: EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity
    fromEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    toEntity?: EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity
    toEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transferMethod?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    auditRemark?: NullableStringFieldUpdateOperationsInput | string | null
    transactionRefId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    fromEntity?: EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity
    fromEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    toEntity?: EnumAuditEntityFieldUpdateOperationsInput | $Enums.AuditEntity
    toEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transferMethod?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    auditRemark?: NullableStringFieldUpdateOperationsInput | string | null
    transactionRefId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockReturnCreateInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.ReturnStatus
    destination?: $Enums.ReturnDestination | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReturnsInput
    items?: ReturnItemCreateNestedManyWithoutStockReturnInput
  }

  export type StockReturnUncheckedCreateInput = {
    id?: string
    userId: string
    totalValue: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.ReturnStatus
    destination?: $Enums.ReturnDestination | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ReturnItemUncheckedCreateNestedManyWithoutStockReturnInput
  }

  export type StockReturnUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumReturnStatusFieldUpdateOperationsInput | $Enums.ReturnStatus
    destination?: NullableEnumReturnDestinationFieldUpdateOperationsInput | $Enums.ReturnDestination | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReturnsNestedInput
    items?: ReturnItemUpdateManyWithoutStockReturnNestedInput
  }

  export type StockReturnUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumReturnStatusFieldUpdateOperationsInput | $Enums.ReturnStatus
    destination?: NullableEnumReturnDestinationFieldUpdateOperationsInput | $Enums.ReturnDestination | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ReturnItemUncheckedUpdateManyWithoutStockReturnNestedInput
  }

  export type StockReturnCreateManyInput = {
    id?: string
    userId: string
    totalValue: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.ReturnStatus
    destination?: $Enums.ReturnDestination | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockReturnUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumReturnStatusFieldUpdateOperationsInput | $Enums.ReturnStatus
    destination?: NullableEnumReturnDestinationFieldUpdateOperationsInput | $Enums.ReturnDestination | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockReturnUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumReturnStatusFieldUpdateOperationsInput | $Enums.ReturnStatus
    destination?: NullableEnumReturnDestinationFieldUpdateOperationsInput | $Enums.ReturnDestination | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReturnItemCreateInput = {
    id?: string
    itemId: string
    quantity: number
    stockReturn: StockReturnCreateNestedOneWithoutItemsInput
  }

  export type ReturnItemUncheckedCreateInput = {
    id?: string
    stockReturnId: string
    itemId: string
    quantity: number
  }

  export type ReturnItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    stockReturn?: StockReturnUpdateOneRequiredWithoutItemsNestedInput
  }

  export type ReturnItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stockReturnId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type ReturnItemCreateManyInput = {
    id?: string
    stockReturnId: string
    itemId: string
    quantity: number
  }

  export type ReturnItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type ReturnItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    stockReturnId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StockIssuanceListRelationFilter = {
    every?: StockIssuanceWhereInput
    some?: StockIssuanceWhereInput
    none?: StockIssuanceWhereInput
  }

  export type PaymentProofListRelationFilter = {
    every?: PaymentProofWhereInput
    some?: PaymentProofWhereInput
    none?: PaymentProofWhereInput
  }

  export type SaleListRelationFilter = {
    every?: SaleWhereInput
    some?: SaleWhereInput
    none?: SaleWhereInput
  }

  export type StockReturnListRelationFilter = {
    every?: StockReturnWhereInput
    some?: StockReturnWhereInput
    none?: StockReturnWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StockIssuanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentProofOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SaleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StockReturnOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    profilePic?: SortOrder
    role?: SortOrder
    requiresPasswordChange?: SortOrder
    isActive?: SortOrder
    creditLimit?: SortOrder
    creditBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    creditLimit?: SortOrder
    creditBalance?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    profilePic?: SortOrder
    role?: SortOrder
    requiresPasswordChange?: SortOrder
    isActive?: SortOrder
    creditLimit?: SortOrder
    creditBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    profilePic?: SortOrder
    role?: SortOrder
    requiresPasswordChange?: SortOrder
    isActive?: SortOrder
    creditLimit?: SortOrder
    creditBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    creditLimit?: SortOrder
    creditBalance?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type InventoryBatchListRelationFilter = {
    every?: InventoryBatchWhereInput
    some?: InventoryBatchWhereInput
    none?: InventoryBatchWhereInput
  }

  export type InventoryBatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SupplierCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    creditBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierAvgOrderByAggregateInput = {
    creditBalance?: SortOrder
  }

  export type SupplierMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    creditBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    creditBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierSumOrderByAggregateInput = {
    creditBalance?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    imageUrl?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    imageUrl?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    imageUrl?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type RetailerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RetailerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RetailerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupportedBankCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type SupportedBankMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type SupportedBankMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type SupplierScalarRelationFilter = {
    is?: SupplierWhereInput
    isNot?: SupplierWhereInput
  }

  export type InventoryBatchCountOrderByAggregateInput = {
    id?: SortOrder
    batchCode?: SortOrder
    productId?: SortOrder
    supplierId?: SortOrder
    quantityRecieved?: SortOrder
    remainingQty?: SortOrder
    unitCostPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InventoryBatchAvgOrderByAggregateInput = {
    quantityRecieved?: SortOrder
    remainingQty?: SortOrder
    unitCostPrice?: SortOrder
  }

  export type InventoryBatchMaxOrderByAggregateInput = {
    id?: SortOrder
    batchCode?: SortOrder
    productId?: SortOrder
    supplierId?: SortOrder
    quantityRecieved?: SortOrder
    remainingQty?: SortOrder
    unitCostPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InventoryBatchMinOrderByAggregateInput = {
    id?: SortOrder
    batchCode?: SortOrder
    productId?: SortOrder
    supplierId?: SortOrder
    quantityRecieved?: SortOrder
    remainingQty?: SortOrder
    unitCostPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InventoryBatchSumOrderByAggregateInput = {
    quantityRecieved?: SortOrder
    remainingQty?: SortOrder
    unitCostPrice?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumIssuanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.IssuanceStatus | EnumIssuanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.IssuanceStatus[] | ListEnumIssuanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.IssuanceStatus[] | ListEnumIssuanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumIssuanceStatusFilter<$PrismaModel> | $Enums.IssuanceStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type IssuanceItemListRelationFilter = {
    every?: IssuanceItemWhereInput
    some?: IssuanceItemWhereInput
    none?: IssuanceItemWhereInput
  }

  export type IssuanceItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StockIssuanceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    totalWholesaleValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockIssuanceAvgOrderByAggregateInput = {
    totalWholesaleValue?: SortOrder
  }

  export type StockIssuanceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    totalWholesaleValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockIssuanceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    totalWholesaleValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockIssuanceSumOrderByAggregateInput = {
    totalWholesaleValue?: SortOrder
  }

  export type EnumIssuanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IssuanceStatus | EnumIssuanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.IssuanceStatus[] | ListEnumIssuanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.IssuanceStatus[] | ListEnumIssuanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumIssuanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.IssuanceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIssuanceStatusFilter<$PrismaModel>
    _max?: NestedEnumIssuanceStatusFilter<$PrismaModel>
  }

  export type StockIssuanceScalarRelationFilter = {
    is?: StockIssuanceWhereInput
    isNot?: StockIssuanceWhereInput
  }

  export type IssuanceItemCountOrderByAggregateInput = {
    id?: SortOrder
    issuanceId?: SortOrder
    productId?: SortOrder
    wholesalePrice?: SortOrder
    qtyIssued?: SortOrder
    qtyRemaining?: SortOrder
    cogsCalculated?: SortOrder
  }

  export type IssuanceItemAvgOrderByAggregateInput = {
    wholesalePrice?: SortOrder
    qtyIssued?: SortOrder
    qtyRemaining?: SortOrder
    cogsCalculated?: SortOrder
  }

  export type IssuanceItemMaxOrderByAggregateInput = {
    id?: SortOrder
    issuanceId?: SortOrder
    productId?: SortOrder
    wholesalePrice?: SortOrder
    qtyIssued?: SortOrder
    qtyRemaining?: SortOrder
    cogsCalculated?: SortOrder
  }

  export type IssuanceItemMinOrderByAggregateInput = {
    id?: SortOrder
    issuanceId?: SortOrder
    productId?: SortOrder
    wholesalePrice?: SortOrder
    qtyIssued?: SortOrder
    qtyRemaining?: SortOrder
    cogsCalculated?: SortOrder
  }

  export type IssuanceItemSumOrderByAggregateInput = {
    wholesalePrice?: SortOrder
    qtyIssued?: SortOrder
    qtyRemaining?: SortOrder
    cogsCalculated?: SortOrder
  }

  export type RetailerScalarRelationFilter = {
    is?: RetailerWhereInput
    isNot?: RetailerWhereInput
  }

  export type SaleCountOrderByAggregateInput = {
    id?: SortOrder
    salesRepId?: SortOrder
    retailerId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    totalAmount?: SortOrder
    paymentMethod?: SortOrder
    createdAt?: SortOrder
  }

  export type SaleAvgOrderByAggregateInput = {
    quantity?: SortOrder
    totalAmount?: SortOrder
  }

  export type SaleMaxOrderByAggregateInput = {
    id?: SortOrder
    salesRepId?: SortOrder
    retailerId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    totalAmount?: SortOrder
    paymentMethod?: SortOrder
    createdAt?: SortOrder
  }

  export type SaleMinOrderByAggregateInput = {
    id?: SortOrder
    salesRepId?: SortOrder
    retailerId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    totalAmount?: SortOrder
    paymentMethod?: SortOrder
    createdAt?: SortOrder
  }

  export type SaleSumOrderByAggregateInput = {
    quantity?: SortOrder
    totalAmount?: SortOrder
  }

  export type EnumProofStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProofStatus | EnumProofStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProofStatus[] | ListEnumProofStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProofStatus[] | ListEnumProofStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProofStatusFilter<$PrismaModel> | $Enums.ProofStatus
  }

  export type PaymentProofCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    transactionRedId?: SortOrder
    sha256Hash?: SortOrder
    amount?: SortOrder
    bankName?: SortOrder
    senderName?: SortOrder
    reasonRemark?: SortOrder
    receipeImageUrl?: SortOrder
    status?: SortOrder
    adminRemark?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentProofAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentProofMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    transactionRedId?: SortOrder
    sha256Hash?: SortOrder
    amount?: SortOrder
    bankName?: SortOrder
    senderName?: SortOrder
    reasonRemark?: SortOrder
    receipeImageUrl?: SortOrder
    status?: SortOrder
    adminRemark?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentProofMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    transactionRedId?: SortOrder
    sha256Hash?: SortOrder
    amount?: SortOrder
    bankName?: SortOrder
    senderName?: SortOrder
    reasonRemark?: SortOrder
    receipeImageUrl?: SortOrder
    status?: SortOrder
    adminRemark?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentProofSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumProofStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProofStatus | EnumProofStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProofStatus[] | ListEnumProofStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProofStatus[] | ListEnumProofStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProofStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProofStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProofStatusFilter<$PrismaModel>
    _max?: NestedEnumProofStatusFilter<$PrismaModel>
  }

  export type EnumAuditEntityFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditEntity | EnumAuditEntityFieldRefInput<$PrismaModel>
    in?: $Enums.AuditEntity[] | ListEnumAuditEntityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditEntity[] | ListEnumAuditEntityFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditEntityFilter<$PrismaModel> | $Enums.AuditEntity
  }

  export type LedgerEntryCountOrderByAggregateInput = {
    id?: SortOrder
    transactionDate?: SortOrder
    fromEntity?: SortOrder
    fromEntityId?: SortOrder
    toEntity?: SortOrder
    toEntityId?: SortOrder
    amount?: SortOrder
    transferMethod?: SortOrder
    receiptUrl?: SortOrder
    auditRemark?: SortOrder
    transactionRefId?: SortOrder
    createdAt?: SortOrder
  }

  export type LedgerEntryAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type LedgerEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    transactionDate?: SortOrder
    fromEntity?: SortOrder
    fromEntityId?: SortOrder
    toEntity?: SortOrder
    toEntityId?: SortOrder
    amount?: SortOrder
    transferMethod?: SortOrder
    receiptUrl?: SortOrder
    auditRemark?: SortOrder
    transactionRefId?: SortOrder
    createdAt?: SortOrder
  }

  export type LedgerEntryMinOrderByAggregateInput = {
    id?: SortOrder
    transactionDate?: SortOrder
    fromEntity?: SortOrder
    fromEntityId?: SortOrder
    toEntity?: SortOrder
    toEntityId?: SortOrder
    amount?: SortOrder
    transferMethod?: SortOrder
    receiptUrl?: SortOrder
    auditRemark?: SortOrder
    transactionRefId?: SortOrder
    createdAt?: SortOrder
  }

  export type LedgerEntrySumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumAuditEntityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditEntity | EnumAuditEntityFieldRefInput<$PrismaModel>
    in?: $Enums.AuditEntity[] | ListEnumAuditEntityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditEntity[] | ListEnumAuditEntityFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditEntityWithAggregatesFilter<$PrismaModel> | $Enums.AuditEntity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditEntityFilter<$PrismaModel>
    _max?: NestedEnumAuditEntityFilter<$PrismaModel>
  }

  export type EnumReturnStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReturnStatus | EnumReturnStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReturnStatus[] | ListEnumReturnStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReturnStatus[] | ListEnumReturnStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReturnStatusFilter<$PrismaModel> | $Enums.ReturnStatus
  }

  export type EnumReturnDestinationNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ReturnDestination | EnumReturnDestinationFieldRefInput<$PrismaModel> | null
    in?: $Enums.ReturnDestination[] | ListEnumReturnDestinationFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ReturnDestination[] | ListEnumReturnDestinationFieldRefInput<$PrismaModel> | null
    not?: NestedEnumReturnDestinationNullableFilter<$PrismaModel> | $Enums.ReturnDestination | null
  }

  export type ReturnItemListRelationFilter = {
    every?: ReturnItemWhereInput
    some?: ReturnItemWhereInput
    none?: ReturnItemWhereInput
  }

  export type ReturnItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StockReturnCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    destination?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockReturnAvgOrderByAggregateInput = {
    totalValue?: SortOrder
  }

  export type StockReturnMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    destination?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockReturnMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    destination?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockReturnSumOrderByAggregateInput = {
    totalValue?: SortOrder
  }

  export type EnumReturnStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReturnStatus | EnumReturnStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReturnStatus[] | ListEnumReturnStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReturnStatus[] | ListEnumReturnStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReturnStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReturnStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReturnStatusFilter<$PrismaModel>
    _max?: NestedEnumReturnStatusFilter<$PrismaModel>
  }

  export type EnumReturnDestinationNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReturnDestination | EnumReturnDestinationFieldRefInput<$PrismaModel> | null
    in?: $Enums.ReturnDestination[] | ListEnumReturnDestinationFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ReturnDestination[] | ListEnumReturnDestinationFieldRefInput<$PrismaModel> | null
    not?: NestedEnumReturnDestinationNullableWithAggregatesFilter<$PrismaModel> | $Enums.ReturnDestination | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumReturnDestinationNullableFilter<$PrismaModel>
    _max?: NestedEnumReturnDestinationNullableFilter<$PrismaModel>
  }

  export type StockReturnScalarRelationFilter = {
    is?: StockReturnWhereInput
    isNot?: StockReturnWhereInput
  }

  export type ReturnItemCountOrderByAggregateInput = {
    id?: SortOrder
    stockReturnId?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
  }

  export type ReturnItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type ReturnItemMaxOrderByAggregateInput = {
    id?: SortOrder
    stockReturnId?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
  }

  export type ReturnItemMinOrderByAggregateInput = {
    id?: SortOrder
    stockReturnId?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
  }

  export type ReturnItemSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type StockIssuanceCreateNestedManyWithoutUserInput = {
    create?: XOR<StockIssuanceCreateWithoutUserInput, StockIssuanceUncheckedCreateWithoutUserInput> | StockIssuanceCreateWithoutUserInput[] | StockIssuanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StockIssuanceCreateOrConnectWithoutUserInput | StockIssuanceCreateOrConnectWithoutUserInput[]
    createMany?: StockIssuanceCreateManyUserInputEnvelope
    connect?: StockIssuanceWhereUniqueInput | StockIssuanceWhereUniqueInput[]
  }

  export type PaymentProofCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentProofCreateWithoutUserInput, PaymentProofUncheckedCreateWithoutUserInput> | PaymentProofCreateWithoutUserInput[] | PaymentProofUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentProofCreateOrConnectWithoutUserInput | PaymentProofCreateOrConnectWithoutUserInput[]
    createMany?: PaymentProofCreateManyUserInputEnvelope
    connect?: PaymentProofWhereUniqueInput | PaymentProofWhereUniqueInput[]
  }

  export type SaleCreateNestedManyWithoutSalesRepInput = {
    create?: XOR<SaleCreateWithoutSalesRepInput, SaleUncheckedCreateWithoutSalesRepInput> | SaleCreateWithoutSalesRepInput[] | SaleUncheckedCreateWithoutSalesRepInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutSalesRepInput | SaleCreateOrConnectWithoutSalesRepInput[]
    createMany?: SaleCreateManySalesRepInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type StockReturnCreateNestedManyWithoutUserInput = {
    create?: XOR<StockReturnCreateWithoutUserInput, StockReturnUncheckedCreateWithoutUserInput> | StockReturnCreateWithoutUserInput[] | StockReturnUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StockReturnCreateOrConnectWithoutUserInput | StockReturnCreateOrConnectWithoutUserInput[]
    createMany?: StockReturnCreateManyUserInputEnvelope
    connect?: StockReturnWhereUniqueInput | StockReturnWhereUniqueInput[]
  }

  export type StockIssuanceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StockIssuanceCreateWithoutUserInput, StockIssuanceUncheckedCreateWithoutUserInput> | StockIssuanceCreateWithoutUserInput[] | StockIssuanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StockIssuanceCreateOrConnectWithoutUserInput | StockIssuanceCreateOrConnectWithoutUserInput[]
    createMany?: StockIssuanceCreateManyUserInputEnvelope
    connect?: StockIssuanceWhereUniqueInput | StockIssuanceWhereUniqueInput[]
  }

  export type PaymentProofUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentProofCreateWithoutUserInput, PaymentProofUncheckedCreateWithoutUserInput> | PaymentProofCreateWithoutUserInput[] | PaymentProofUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentProofCreateOrConnectWithoutUserInput | PaymentProofCreateOrConnectWithoutUserInput[]
    createMany?: PaymentProofCreateManyUserInputEnvelope
    connect?: PaymentProofWhereUniqueInput | PaymentProofWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutSalesRepInput = {
    create?: XOR<SaleCreateWithoutSalesRepInput, SaleUncheckedCreateWithoutSalesRepInput> | SaleCreateWithoutSalesRepInput[] | SaleUncheckedCreateWithoutSalesRepInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutSalesRepInput | SaleCreateOrConnectWithoutSalesRepInput[]
    createMany?: SaleCreateManySalesRepInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type StockReturnUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StockReturnCreateWithoutUserInput, StockReturnUncheckedCreateWithoutUserInput> | StockReturnCreateWithoutUserInput[] | StockReturnUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StockReturnCreateOrConnectWithoutUserInput | StockReturnCreateOrConnectWithoutUserInput[]
    createMany?: StockReturnCreateManyUserInputEnvelope
    connect?: StockReturnWhereUniqueInput | StockReturnWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StockIssuanceUpdateManyWithoutUserNestedInput = {
    create?: XOR<StockIssuanceCreateWithoutUserInput, StockIssuanceUncheckedCreateWithoutUserInput> | StockIssuanceCreateWithoutUserInput[] | StockIssuanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StockIssuanceCreateOrConnectWithoutUserInput | StockIssuanceCreateOrConnectWithoutUserInput[]
    upsert?: StockIssuanceUpsertWithWhereUniqueWithoutUserInput | StockIssuanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StockIssuanceCreateManyUserInputEnvelope
    set?: StockIssuanceWhereUniqueInput | StockIssuanceWhereUniqueInput[]
    disconnect?: StockIssuanceWhereUniqueInput | StockIssuanceWhereUniqueInput[]
    delete?: StockIssuanceWhereUniqueInput | StockIssuanceWhereUniqueInput[]
    connect?: StockIssuanceWhereUniqueInput | StockIssuanceWhereUniqueInput[]
    update?: StockIssuanceUpdateWithWhereUniqueWithoutUserInput | StockIssuanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StockIssuanceUpdateManyWithWhereWithoutUserInput | StockIssuanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StockIssuanceScalarWhereInput | StockIssuanceScalarWhereInput[]
  }

  export type PaymentProofUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentProofCreateWithoutUserInput, PaymentProofUncheckedCreateWithoutUserInput> | PaymentProofCreateWithoutUserInput[] | PaymentProofUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentProofCreateOrConnectWithoutUserInput | PaymentProofCreateOrConnectWithoutUserInput[]
    upsert?: PaymentProofUpsertWithWhereUniqueWithoutUserInput | PaymentProofUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentProofCreateManyUserInputEnvelope
    set?: PaymentProofWhereUniqueInput | PaymentProofWhereUniqueInput[]
    disconnect?: PaymentProofWhereUniqueInput | PaymentProofWhereUniqueInput[]
    delete?: PaymentProofWhereUniqueInput | PaymentProofWhereUniqueInput[]
    connect?: PaymentProofWhereUniqueInput | PaymentProofWhereUniqueInput[]
    update?: PaymentProofUpdateWithWhereUniqueWithoutUserInput | PaymentProofUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentProofUpdateManyWithWhereWithoutUserInput | PaymentProofUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentProofScalarWhereInput | PaymentProofScalarWhereInput[]
  }

  export type SaleUpdateManyWithoutSalesRepNestedInput = {
    create?: XOR<SaleCreateWithoutSalesRepInput, SaleUncheckedCreateWithoutSalesRepInput> | SaleCreateWithoutSalesRepInput[] | SaleUncheckedCreateWithoutSalesRepInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutSalesRepInput | SaleCreateOrConnectWithoutSalesRepInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutSalesRepInput | SaleUpsertWithWhereUniqueWithoutSalesRepInput[]
    createMany?: SaleCreateManySalesRepInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutSalesRepInput | SaleUpdateWithWhereUniqueWithoutSalesRepInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutSalesRepInput | SaleUpdateManyWithWhereWithoutSalesRepInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type StockReturnUpdateManyWithoutUserNestedInput = {
    create?: XOR<StockReturnCreateWithoutUserInput, StockReturnUncheckedCreateWithoutUserInput> | StockReturnCreateWithoutUserInput[] | StockReturnUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StockReturnCreateOrConnectWithoutUserInput | StockReturnCreateOrConnectWithoutUserInput[]
    upsert?: StockReturnUpsertWithWhereUniqueWithoutUserInput | StockReturnUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StockReturnCreateManyUserInputEnvelope
    set?: StockReturnWhereUniqueInput | StockReturnWhereUniqueInput[]
    disconnect?: StockReturnWhereUniqueInput | StockReturnWhereUniqueInput[]
    delete?: StockReturnWhereUniqueInput | StockReturnWhereUniqueInput[]
    connect?: StockReturnWhereUniqueInput | StockReturnWhereUniqueInput[]
    update?: StockReturnUpdateWithWhereUniqueWithoutUserInput | StockReturnUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StockReturnUpdateManyWithWhereWithoutUserInput | StockReturnUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StockReturnScalarWhereInput | StockReturnScalarWhereInput[]
  }

  export type StockIssuanceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StockIssuanceCreateWithoutUserInput, StockIssuanceUncheckedCreateWithoutUserInput> | StockIssuanceCreateWithoutUserInput[] | StockIssuanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StockIssuanceCreateOrConnectWithoutUserInput | StockIssuanceCreateOrConnectWithoutUserInput[]
    upsert?: StockIssuanceUpsertWithWhereUniqueWithoutUserInput | StockIssuanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StockIssuanceCreateManyUserInputEnvelope
    set?: StockIssuanceWhereUniqueInput | StockIssuanceWhereUniqueInput[]
    disconnect?: StockIssuanceWhereUniqueInput | StockIssuanceWhereUniqueInput[]
    delete?: StockIssuanceWhereUniqueInput | StockIssuanceWhereUniqueInput[]
    connect?: StockIssuanceWhereUniqueInput | StockIssuanceWhereUniqueInput[]
    update?: StockIssuanceUpdateWithWhereUniqueWithoutUserInput | StockIssuanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StockIssuanceUpdateManyWithWhereWithoutUserInput | StockIssuanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StockIssuanceScalarWhereInput | StockIssuanceScalarWhereInput[]
  }

  export type PaymentProofUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentProofCreateWithoutUserInput, PaymentProofUncheckedCreateWithoutUserInput> | PaymentProofCreateWithoutUserInput[] | PaymentProofUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentProofCreateOrConnectWithoutUserInput | PaymentProofCreateOrConnectWithoutUserInput[]
    upsert?: PaymentProofUpsertWithWhereUniqueWithoutUserInput | PaymentProofUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentProofCreateManyUserInputEnvelope
    set?: PaymentProofWhereUniqueInput | PaymentProofWhereUniqueInput[]
    disconnect?: PaymentProofWhereUniqueInput | PaymentProofWhereUniqueInput[]
    delete?: PaymentProofWhereUniqueInput | PaymentProofWhereUniqueInput[]
    connect?: PaymentProofWhereUniqueInput | PaymentProofWhereUniqueInput[]
    update?: PaymentProofUpdateWithWhereUniqueWithoutUserInput | PaymentProofUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentProofUpdateManyWithWhereWithoutUserInput | PaymentProofUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentProofScalarWhereInput | PaymentProofScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutSalesRepNestedInput = {
    create?: XOR<SaleCreateWithoutSalesRepInput, SaleUncheckedCreateWithoutSalesRepInput> | SaleCreateWithoutSalesRepInput[] | SaleUncheckedCreateWithoutSalesRepInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutSalesRepInput | SaleCreateOrConnectWithoutSalesRepInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutSalesRepInput | SaleUpsertWithWhereUniqueWithoutSalesRepInput[]
    createMany?: SaleCreateManySalesRepInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutSalesRepInput | SaleUpdateWithWhereUniqueWithoutSalesRepInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutSalesRepInput | SaleUpdateManyWithWhereWithoutSalesRepInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type StockReturnUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StockReturnCreateWithoutUserInput, StockReturnUncheckedCreateWithoutUserInput> | StockReturnCreateWithoutUserInput[] | StockReturnUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StockReturnCreateOrConnectWithoutUserInput | StockReturnCreateOrConnectWithoutUserInput[]
    upsert?: StockReturnUpsertWithWhereUniqueWithoutUserInput | StockReturnUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StockReturnCreateManyUserInputEnvelope
    set?: StockReturnWhereUniqueInput | StockReturnWhereUniqueInput[]
    disconnect?: StockReturnWhereUniqueInput | StockReturnWhereUniqueInput[]
    delete?: StockReturnWhereUniqueInput | StockReturnWhereUniqueInput[]
    connect?: StockReturnWhereUniqueInput | StockReturnWhereUniqueInput[]
    update?: StockReturnUpdateWithWhereUniqueWithoutUserInput | StockReturnUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StockReturnUpdateManyWithWhereWithoutUserInput | StockReturnUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StockReturnScalarWhereInput | StockReturnScalarWhereInput[]
  }

  export type InventoryBatchCreateNestedManyWithoutSupplierInput = {
    create?: XOR<InventoryBatchCreateWithoutSupplierInput, InventoryBatchUncheckedCreateWithoutSupplierInput> | InventoryBatchCreateWithoutSupplierInput[] | InventoryBatchUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: InventoryBatchCreateOrConnectWithoutSupplierInput | InventoryBatchCreateOrConnectWithoutSupplierInput[]
    createMany?: InventoryBatchCreateManySupplierInputEnvelope
    connect?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
  }

  export type InventoryBatchUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: XOR<InventoryBatchCreateWithoutSupplierInput, InventoryBatchUncheckedCreateWithoutSupplierInput> | InventoryBatchCreateWithoutSupplierInput[] | InventoryBatchUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: InventoryBatchCreateOrConnectWithoutSupplierInput | InventoryBatchCreateOrConnectWithoutSupplierInput[]
    createMany?: InventoryBatchCreateManySupplierInputEnvelope
    connect?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
  }

  export type InventoryBatchUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<InventoryBatchCreateWithoutSupplierInput, InventoryBatchUncheckedCreateWithoutSupplierInput> | InventoryBatchCreateWithoutSupplierInput[] | InventoryBatchUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: InventoryBatchCreateOrConnectWithoutSupplierInput | InventoryBatchCreateOrConnectWithoutSupplierInput[]
    upsert?: InventoryBatchUpsertWithWhereUniqueWithoutSupplierInput | InventoryBatchUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: InventoryBatchCreateManySupplierInputEnvelope
    set?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    disconnect?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    delete?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    connect?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    update?: InventoryBatchUpdateWithWhereUniqueWithoutSupplierInput | InventoryBatchUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: InventoryBatchUpdateManyWithWhereWithoutSupplierInput | InventoryBatchUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: InventoryBatchScalarWhereInput | InventoryBatchScalarWhereInput[]
  }

  export type InventoryBatchUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<InventoryBatchCreateWithoutSupplierInput, InventoryBatchUncheckedCreateWithoutSupplierInput> | InventoryBatchCreateWithoutSupplierInput[] | InventoryBatchUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: InventoryBatchCreateOrConnectWithoutSupplierInput | InventoryBatchCreateOrConnectWithoutSupplierInput[]
    upsert?: InventoryBatchUpsertWithWhereUniqueWithoutSupplierInput | InventoryBatchUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: InventoryBatchCreateManySupplierInputEnvelope
    set?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    disconnect?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    delete?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    connect?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    update?: InventoryBatchUpdateWithWhereUniqueWithoutSupplierInput | InventoryBatchUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: InventoryBatchUpdateManyWithWhereWithoutSupplierInput | InventoryBatchUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: InventoryBatchScalarWhereInput | InventoryBatchScalarWhereInput[]
  }

  export type InventoryBatchCreateNestedManyWithoutProductInput = {
    create?: XOR<InventoryBatchCreateWithoutProductInput, InventoryBatchUncheckedCreateWithoutProductInput> | InventoryBatchCreateWithoutProductInput[] | InventoryBatchUncheckedCreateWithoutProductInput[]
    connectOrCreate?: InventoryBatchCreateOrConnectWithoutProductInput | InventoryBatchCreateOrConnectWithoutProductInput[]
    createMany?: InventoryBatchCreateManyProductInputEnvelope
    connect?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
  }

  export type SaleCreateNestedManyWithoutProductInput = {
    create?: XOR<SaleCreateWithoutProductInput, SaleUncheckedCreateWithoutProductInput> | SaleCreateWithoutProductInput[] | SaleUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutProductInput | SaleCreateOrConnectWithoutProductInput[]
    createMany?: SaleCreateManyProductInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type InventoryBatchUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<InventoryBatchCreateWithoutProductInput, InventoryBatchUncheckedCreateWithoutProductInput> | InventoryBatchCreateWithoutProductInput[] | InventoryBatchUncheckedCreateWithoutProductInput[]
    connectOrCreate?: InventoryBatchCreateOrConnectWithoutProductInput | InventoryBatchCreateOrConnectWithoutProductInput[]
    createMany?: InventoryBatchCreateManyProductInputEnvelope
    connect?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<SaleCreateWithoutProductInput, SaleUncheckedCreateWithoutProductInput> | SaleCreateWithoutProductInput[] | SaleUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutProductInput | SaleCreateOrConnectWithoutProductInput[]
    createMany?: SaleCreateManyProductInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type InventoryBatchUpdateManyWithoutProductNestedInput = {
    create?: XOR<InventoryBatchCreateWithoutProductInput, InventoryBatchUncheckedCreateWithoutProductInput> | InventoryBatchCreateWithoutProductInput[] | InventoryBatchUncheckedCreateWithoutProductInput[]
    connectOrCreate?: InventoryBatchCreateOrConnectWithoutProductInput | InventoryBatchCreateOrConnectWithoutProductInput[]
    upsert?: InventoryBatchUpsertWithWhereUniqueWithoutProductInput | InventoryBatchUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: InventoryBatchCreateManyProductInputEnvelope
    set?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    disconnect?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    delete?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    connect?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    update?: InventoryBatchUpdateWithWhereUniqueWithoutProductInput | InventoryBatchUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: InventoryBatchUpdateManyWithWhereWithoutProductInput | InventoryBatchUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: InventoryBatchScalarWhereInput | InventoryBatchScalarWhereInput[]
  }

  export type SaleUpdateManyWithoutProductNestedInput = {
    create?: XOR<SaleCreateWithoutProductInput, SaleUncheckedCreateWithoutProductInput> | SaleCreateWithoutProductInput[] | SaleUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutProductInput | SaleCreateOrConnectWithoutProductInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutProductInput | SaleUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SaleCreateManyProductInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutProductInput | SaleUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutProductInput | SaleUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type InventoryBatchUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<InventoryBatchCreateWithoutProductInput, InventoryBatchUncheckedCreateWithoutProductInput> | InventoryBatchCreateWithoutProductInput[] | InventoryBatchUncheckedCreateWithoutProductInput[]
    connectOrCreate?: InventoryBatchCreateOrConnectWithoutProductInput | InventoryBatchCreateOrConnectWithoutProductInput[]
    upsert?: InventoryBatchUpsertWithWhereUniqueWithoutProductInput | InventoryBatchUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: InventoryBatchCreateManyProductInputEnvelope
    set?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    disconnect?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    delete?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    connect?: InventoryBatchWhereUniqueInput | InventoryBatchWhereUniqueInput[]
    update?: InventoryBatchUpdateWithWhereUniqueWithoutProductInput | InventoryBatchUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: InventoryBatchUpdateManyWithWhereWithoutProductInput | InventoryBatchUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: InventoryBatchScalarWhereInput | InventoryBatchScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<SaleCreateWithoutProductInput, SaleUncheckedCreateWithoutProductInput> | SaleCreateWithoutProductInput[] | SaleUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutProductInput | SaleCreateOrConnectWithoutProductInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutProductInput | SaleUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SaleCreateManyProductInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutProductInput | SaleUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutProductInput | SaleUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type SaleCreateNestedManyWithoutRetailerInput = {
    create?: XOR<SaleCreateWithoutRetailerInput, SaleUncheckedCreateWithoutRetailerInput> | SaleCreateWithoutRetailerInput[] | SaleUncheckedCreateWithoutRetailerInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutRetailerInput | SaleCreateOrConnectWithoutRetailerInput[]
    createMany?: SaleCreateManyRetailerInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutRetailerInput = {
    create?: XOR<SaleCreateWithoutRetailerInput, SaleUncheckedCreateWithoutRetailerInput> | SaleCreateWithoutRetailerInput[] | SaleUncheckedCreateWithoutRetailerInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutRetailerInput | SaleCreateOrConnectWithoutRetailerInput[]
    createMany?: SaleCreateManyRetailerInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type SaleUpdateManyWithoutRetailerNestedInput = {
    create?: XOR<SaleCreateWithoutRetailerInput, SaleUncheckedCreateWithoutRetailerInput> | SaleCreateWithoutRetailerInput[] | SaleUncheckedCreateWithoutRetailerInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutRetailerInput | SaleCreateOrConnectWithoutRetailerInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutRetailerInput | SaleUpsertWithWhereUniqueWithoutRetailerInput[]
    createMany?: SaleCreateManyRetailerInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutRetailerInput | SaleUpdateWithWhereUniqueWithoutRetailerInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutRetailerInput | SaleUpdateManyWithWhereWithoutRetailerInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutRetailerNestedInput = {
    create?: XOR<SaleCreateWithoutRetailerInput, SaleUncheckedCreateWithoutRetailerInput> | SaleCreateWithoutRetailerInput[] | SaleUncheckedCreateWithoutRetailerInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutRetailerInput | SaleCreateOrConnectWithoutRetailerInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutRetailerInput | SaleUpsertWithWhereUniqueWithoutRetailerInput[]
    createMany?: SaleCreateManyRetailerInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutRetailerInput | SaleUpdateWithWhereUniqueWithoutRetailerInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutRetailerInput | SaleUpdateManyWithWhereWithoutRetailerInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutBatchesInput = {
    create?: XOR<ProductCreateWithoutBatchesInput, ProductUncheckedCreateWithoutBatchesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutBatchesInput
    connect?: ProductWhereUniqueInput
  }

  export type SupplierCreateNestedOneWithoutBatchesInput = {
    create?: XOR<SupplierCreateWithoutBatchesInput, SupplierUncheckedCreateWithoutBatchesInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutBatchesInput
    connect?: SupplierWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductUpdateOneRequiredWithoutBatchesNestedInput = {
    create?: XOR<ProductCreateWithoutBatchesInput, ProductUncheckedCreateWithoutBatchesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutBatchesInput
    upsert?: ProductUpsertWithoutBatchesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutBatchesInput, ProductUpdateWithoutBatchesInput>, ProductUncheckedUpdateWithoutBatchesInput>
  }

  export type SupplierUpdateOneRequiredWithoutBatchesNestedInput = {
    create?: XOR<SupplierCreateWithoutBatchesInput, SupplierUncheckedCreateWithoutBatchesInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutBatchesInput
    upsert?: SupplierUpsertWithoutBatchesInput
    connect?: SupplierWhereUniqueInput
    update?: XOR<XOR<SupplierUpdateToOneWithWhereWithoutBatchesInput, SupplierUpdateWithoutBatchesInput>, SupplierUncheckedUpdateWithoutBatchesInput>
  }

  export type UserCreateNestedOneWithoutStockIssusancesInput = {
    create?: XOR<UserCreateWithoutStockIssusancesInput, UserUncheckedCreateWithoutStockIssusancesInput>
    connectOrCreate?: UserCreateOrConnectWithoutStockIssusancesInput
    connect?: UserWhereUniqueInput
  }

  export type IssuanceItemCreateNestedManyWithoutIssuanceInput = {
    create?: XOR<IssuanceItemCreateWithoutIssuanceInput, IssuanceItemUncheckedCreateWithoutIssuanceInput> | IssuanceItemCreateWithoutIssuanceInput[] | IssuanceItemUncheckedCreateWithoutIssuanceInput[]
    connectOrCreate?: IssuanceItemCreateOrConnectWithoutIssuanceInput | IssuanceItemCreateOrConnectWithoutIssuanceInput[]
    createMany?: IssuanceItemCreateManyIssuanceInputEnvelope
    connect?: IssuanceItemWhereUniqueInput | IssuanceItemWhereUniqueInput[]
  }

  export type IssuanceItemUncheckedCreateNestedManyWithoutIssuanceInput = {
    create?: XOR<IssuanceItemCreateWithoutIssuanceInput, IssuanceItemUncheckedCreateWithoutIssuanceInput> | IssuanceItemCreateWithoutIssuanceInput[] | IssuanceItemUncheckedCreateWithoutIssuanceInput[]
    connectOrCreate?: IssuanceItemCreateOrConnectWithoutIssuanceInput | IssuanceItemCreateOrConnectWithoutIssuanceInput[]
    createMany?: IssuanceItemCreateManyIssuanceInputEnvelope
    connect?: IssuanceItemWhereUniqueInput | IssuanceItemWhereUniqueInput[]
  }

  export type EnumIssuanceStatusFieldUpdateOperationsInput = {
    set?: $Enums.IssuanceStatus
  }

  export type UserUpdateOneRequiredWithoutStockIssusancesNestedInput = {
    create?: XOR<UserCreateWithoutStockIssusancesInput, UserUncheckedCreateWithoutStockIssusancesInput>
    connectOrCreate?: UserCreateOrConnectWithoutStockIssusancesInput
    upsert?: UserUpsertWithoutStockIssusancesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStockIssusancesInput, UserUpdateWithoutStockIssusancesInput>, UserUncheckedUpdateWithoutStockIssusancesInput>
  }

  export type IssuanceItemUpdateManyWithoutIssuanceNestedInput = {
    create?: XOR<IssuanceItemCreateWithoutIssuanceInput, IssuanceItemUncheckedCreateWithoutIssuanceInput> | IssuanceItemCreateWithoutIssuanceInput[] | IssuanceItemUncheckedCreateWithoutIssuanceInput[]
    connectOrCreate?: IssuanceItemCreateOrConnectWithoutIssuanceInput | IssuanceItemCreateOrConnectWithoutIssuanceInput[]
    upsert?: IssuanceItemUpsertWithWhereUniqueWithoutIssuanceInput | IssuanceItemUpsertWithWhereUniqueWithoutIssuanceInput[]
    createMany?: IssuanceItemCreateManyIssuanceInputEnvelope
    set?: IssuanceItemWhereUniqueInput | IssuanceItemWhereUniqueInput[]
    disconnect?: IssuanceItemWhereUniqueInput | IssuanceItemWhereUniqueInput[]
    delete?: IssuanceItemWhereUniqueInput | IssuanceItemWhereUniqueInput[]
    connect?: IssuanceItemWhereUniqueInput | IssuanceItemWhereUniqueInput[]
    update?: IssuanceItemUpdateWithWhereUniqueWithoutIssuanceInput | IssuanceItemUpdateWithWhereUniqueWithoutIssuanceInput[]
    updateMany?: IssuanceItemUpdateManyWithWhereWithoutIssuanceInput | IssuanceItemUpdateManyWithWhereWithoutIssuanceInput[]
    deleteMany?: IssuanceItemScalarWhereInput | IssuanceItemScalarWhereInput[]
  }

  export type IssuanceItemUncheckedUpdateManyWithoutIssuanceNestedInput = {
    create?: XOR<IssuanceItemCreateWithoutIssuanceInput, IssuanceItemUncheckedCreateWithoutIssuanceInput> | IssuanceItemCreateWithoutIssuanceInput[] | IssuanceItemUncheckedCreateWithoutIssuanceInput[]
    connectOrCreate?: IssuanceItemCreateOrConnectWithoutIssuanceInput | IssuanceItemCreateOrConnectWithoutIssuanceInput[]
    upsert?: IssuanceItemUpsertWithWhereUniqueWithoutIssuanceInput | IssuanceItemUpsertWithWhereUniqueWithoutIssuanceInput[]
    createMany?: IssuanceItemCreateManyIssuanceInputEnvelope
    set?: IssuanceItemWhereUniqueInput | IssuanceItemWhereUniqueInput[]
    disconnect?: IssuanceItemWhereUniqueInput | IssuanceItemWhereUniqueInput[]
    delete?: IssuanceItemWhereUniqueInput | IssuanceItemWhereUniqueInput[]
    connect?: IssuanceItemWhereUniqueInput | IssuanceItemWhereUniqueInput[]
    update?: IssuanceItemUpdateWithWhereUniqueWithoutIssuanceInput | IssuanceItemUpdateWithWhereUniqueWithoutIssuanceInput[]
    updateMany?: IssuanceItemUpdateManyWithWhereWithoutIssuanceInput | IssuanceItemUpdateManyWithWhereWithoutIssuanceInput[]
    deleteMany?: IssuanceItemScalarWhereInput | IssuanceItemScalarWhereInput[]
  }

  export type StockIssuanceCreateNestedOneWithoutItemsInput = {
    create?: XOR<StockIssuanceCreateWithoutItemsInput, StockIssuanceUncheckedCreateWithoutItemsInput>
    connectOrCreate?: StockIssuanceCreateOrConnectWithoutItemsInput
    connect?: StockIssuanceWhereUniqueInput
  }

  export type StockIssuanceUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<StockIssuanceCreateWithoutItemsInput, StockIssuanceUncheckedCreateWithoutItemsInput>
    connectOrCreate?: StockIssuanceCreateOrConnectWithoutItemsInput
    upsert?: StockIssuanceUpsertWithoutItemsInput
    connect?: StockIssuanceWhereUniqueInput
    update?: XOR<XOR<StockIssuanceUpdateToOneWithWhereWithoutItemsInput, StockIssuanceUpdateWithoutItemsInput>, StockIssuanceUncheckedUpdateWithoutItemsInput>
  }

  export type UserCreateNestedOneWithoutSalesInput = {
    create?: XOR<UserCreateWithoutSalesInput, UserUncheckedCreateWithoutSalesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSalesInput
    connect?: UserWhereUniqueInput
  }

  export type RetailerCreateNestedOneWithoutSalesInput = {
    create?: XOR<RetailerCreateWithoutSalesInput, RetailerUncheckedCreateWithoutSalesInput>
    connectOrCreate?: RetailerCreateOrConnectWithoutSalesInput
    connect?: RetailerWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutSalesInput = {
    create?: XOR<ProductCreateWithoutSalesInput, ProductUncheckedCreateWithoutSalesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSalesInput
    connect?: ProductWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSalesNestedInput = {
    create?: XOR<UserCreateWithoutSalesInput, UserUncheckedCreateWithoutSalesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSalesInput
    upsert?: UserUpsertWithoutSalesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSalesInput, UserUpdateWithoutSalesInput>, UserUncheckedUpdateWithoutSalesInput>
  }

  export type RetailerUpdateOneRequiredWithoutSalesNestedInput = {
    create?: XOR<RetailerCreateWithoutSalesInput, RetailerUncheckedCreateWithoutSalesInput>
    connectOrCreate?: RetailerCreateOrConnectWithoutSalesInput
    upsert?: RetailerUpsertWithoutSalesInput
    connect?: RetailerWhereUniqueInput
    update?: XOR<XOR<RetailerUpdateToOneWithWhereWithoutSalesInput, RetailerUpdateWithoutSalesInput>, RetailerUncheckedUpdateWithoutSalesInput>
  }

  export type ProductUpdateOneRequiredWithoutSalesNestedInput = {
    create?: XOR<ProductCreateWithoutSalesInput, ProductUncheckedCreateWithoutSalesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSalesInput
    upsert?: ProductUpsertWithoutSalesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutSalesInput, ProductUpdateWithoutSalesInput>, ProductUncheckedUpdateWithoutSalesInput>
  }

  export type UserCreateNestedOneWithoutPaymentProofsInput = {
    create?: XOR<UserCreateWithoutPaymentProofsInput, UserUncheckedCreateWithoutPaymentProofsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentProofsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumProofStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProofStatus
  }

  export type UserUpdateOneRequiredWithoutPaymentProofsNestedInput = {
    create?: XOR<UserCreateWithoutPaymentProofsInput, UserUncheckedCreateWithoutPaymentProofsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentProofsInput
    upsert?: UserUpsertWithoutPaymentProofsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentProofsInput, UserUpdateWithoutPaymentProofsInput>, UserUncheckedUpdateWithoutPaymentProofsInput>
  }

  export type EnumAuditEntityFieldUpdateOperationsInput = {
    set?: $Enums.AuditEntity
  }

  export type UserCreateNestedOneWithoutReturnsInput = {
    create?: XOR<UserCreateWithoutReturnsInput, UserUncheckedCreateWithoutReturnsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReturnsInput
    connect?: UserWhereUniqueInput
  }

  export type ReturnItemCreateNestedManyWithoutStockReturnInput = {
    create?: XOR<ReturnItemCreateWithoutStockReturnInput, ReturnItemUncheckedCreateWithoutStockReturnInput> | ReturnItemCreateWithoutStockReturnInput[] | ReturnItemUncheckedCreateWithoutStockReturnInput[]
    connectOrCreate?: ReturnItemCreateOrConnectWithoutStockReturnInput | ReturnItemCreateOrConnectWithoutStockReturnInput[]
    createMany?: ReturnItemCreateManyStockReturnInputEnvelope
    connect?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
  }

  export type ReturnItemUncheckedCreateNestedManyWithoutStockReturnInput = {
    create?: XOR<ReturnItemCreateWithoutStockReturnInput, ReturnItemUncheckedCreateWithoutStockReturnInput> | ReturnItemCreateWithoutStockReturnInput[] | ReturnItemUncheckedCreateWithoutStockReturnInput[]
    connectOrCreate?: ReturnItemCreateOrConnectWithoutStockReturnInput | ReturnItemCreateOrConnectWithoutStockReturnInput[]
    createMany?: ReturnItemCreateManyStockReturnInputEnvelope
    connect?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
  }

  export type EnumReturnStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReturnStatus
  }

  export type NullableEnumReturnDestinationFieldUpdateOperationsInput = {
    set?: $Enums.ReturnDestination | null
  }

  export type UserUpdateOneRequiredWithoutReturnsNestedInput = {
    create?: XOR<UserCreateWithoutReturnsInput, UserUncheckedCreateWithoutReturnsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReturnsInput
    upsert?: UserUpsertWithoutReturnsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReturnsInput, UserUpdateWithoutReturnsInput>, UserUncheckedUpdateWithoutReturnsInput>
  }

  export type ReturnItemUpdateManyWithoutStockReturnNestedInput = {
    create?: XOR<ReturnItemCreateWithoutStockReturnInput, ReturnItemUncheckedCreateWithoutStockReturnInput> | ReturnItemCreateWithoutStockReturnInput[] | ReturnItemUncheckedCreateWithoutStockReturnInput[]
    connectOrCreate?: ReturnItemCreateOrConnectWithoutStockReturnInput | ReturnItemCreateOrConnectWithoutStockReturnInput[]
    upsert?: ReturnItemUpsertWithWhereUniqueWithoutStockReturnInput | ReturnItemUpsertWithWhereUniqueWithoutStockReturnInput[]
    createMany?: ReturnItemCreateManyStockReturnInputEnvelope
    set?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    disconnect?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    delete?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    connect?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    update?: ReturnItemUpdateWithWhereUniqueWithoutStockReturnInput | ReturnItemUpdateWithWhereUniqueWithoutStockReturnInput[]
    updateMany?: ReturnItemUpdateManyWithWhereWithoutStockReturnInput | ReturnItemUpdateManyWithWhereWithoutStockReturnInput[]
    deleteMany?: ReturnItemScalarWhereInput | ReturnItemScalarWhereInput[]
  }

  export type ReturnItemUncheckedUpdateManyWithoutStockReturnNestedInput = {
    create?: XOR<ReturnItemCreateWithoutStockReturnInput, ReturnItemUncheckedCreateWithoutStockReturnInput> | ReturnItemCreateWithoutStockReturnInput[] | ReturnItemUncheckedCreateWithoutStockReturnInput[]
    connectOrCreate?: ReturnItemCreateOrConnectWithoutStockReturnInput | ReturnItemCreateOrConnectWithoutStockReturnInput[]
    upsert?: ReturnItemUpsertWithWhereUniqueWithoutStockReturnInput | ReturnItemUpsertWithWhereUniqueWithoutStockReturnInput[]
    createMany?: ReturnItemCreateManyStockReturnInputEnvelope
    set?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    disconnect?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    delete?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    connect?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    update?: ReturnItemUpdateWithWhereUniqueWithoutStockReturnInput | ReturnItemUpdateWithWhereUniqueWithoutStockReturnInput[]
    updateMany?: ReturnItemUpdateManyWithWhereWithoutStockReturnInput | ReturnItemUpdateManyWithWhereWithoutStockReturnInput[]
    deleteMany?: ReturnItemScalarWhereInput | ReturnItemScalarWhereInput[]
  }

  export type StockReturnCreateNestedOneWithoutItemsInput = {
    create?: XOR<StockReturnCreateWithoutItemsInput, StockReturnUncheckedCreateWithoutItemsInput>
    connectOrCreate?: StockReturnCreateOrConnectWithoutItemsInput
    connect?: StockReturnWhereUniqueInput
  }

  export type StockReturnUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<StockReturnCreateWithoutItemsInput, StockReturnUncheckedCreateWithoutItemsInput>
    connectOrCreate?: StockReturnCreateOrConnectWithoutItemsInput
    upsert?: StockReturnUpsertWithoutItemsInput
    connect?: StockReturnWhereUniqueInput
    update?: XOR<XOR<StockReturnUpdateToOneWithWhereWithoutItemsInput, StockReturnUpdateWithoutItemsInput>, StockReturnUncheckedUpdateWithoutItemsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumIssuanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.IssuanceStatus | EnumIssuanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.IssuanceStatus[] | ListEnumIssuanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.IssuanceStatus[] | ListEnumIssuanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumIssuanceStatusFilter<$PrismaModel> | $Enums.IssuanceStatus
  }

  export type NestedEnumIssuanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IssuanceStatus | EnumIssuanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.IssuanceStatus[] | ListEnumIssuanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.IssuanceStatus[] | ListEnumIssuanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumIssuanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.IssuanceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIssuanceStatusFilter<$PrismaModel>
    _max?: NestedEnumIssuanceStatusFilter<$PrismaModel>
  }

  export type NestedEnumProofStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProofStatus | EnumProofStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProofStatus[] | ListEnumProofStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProofStatus[] | ListEnumProofStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProofStatusFilter<$PrismaModel> | $Enums.ProofStatus
  }

  export type NestedEnumProofStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProofStatus | EnumProofStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProofStatus[] | ListEnumProofStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProofStatus[] | ListEnumProofStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProofStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProofStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProofStatusFilter<$PrismaModel>
    _max?: NestedEnumProofStatusFilter<$PrismaModel>
  }

  export type NestedEnumAuditEntityFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditEntity | EnumAuditEntityFieldRefInput<$PrismaModel>
    in?: $Enums.AuditEntity[] | ListEnumAuditEntityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditEntity[] | ListEnumAuditEntityFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditEntityFilter<$PrismaModel> | $Enums.AuditEntity
  }

  export type NestedEnumAuditEntityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditEntity | EnumAuditEntityFieldRefInput<$PrismaModel>
    in?: $Enums.AuditEntity[] | ListEnumAuditEntityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditEntity[] | ListEnumAuditEntityFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditEntityWithAggregatesFilter<$PrismaModel> | $Enums.AuditEntity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditEntityFilter<$PrismaModel>
    _max?: NestedEnumAuditEntityFilter<$PrismaModel>
  }

  export type NestedEnumReturnStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReturnStatus | EnumReturnStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReturnStatus[] | ListEnumReturnStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReturnStatus[] | ListEnumReturnStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReturnStatusFilter<$PrismaModel> | $Enums.ReturnStatus
  }

  export type NestedEnumReturnDestinationNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ReturnDestination | EnumReturnDestinationFieldRefInput<$PrismaModel> | null
    in?: $Enums.ReturnDestination[] | ListEnumReturnDestinationFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ReturnDestination[] | ListEnumReturnDestinationFieldRefInput<$PrismaModel> | null
    not?: NestedEnumReturnDestinationNullableFilter<$PrismaModel> | $Enums.ReturnDestination | null
  }

  export type NestedEnumReturnStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReturnStatus | EnumReturnStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReturnStatus[] | ListEnumReturnStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReturnStatus[] | ListEnumReturnStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReturnStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReturnStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReturnStatusFilter<$PrismaModel>
    _max?: NestedEnumReturnStatusFilter<$PrismaModel>
  }

  export type NestedEnumReturnDestinationNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReturnDestination | EnumReturnDestinationFieldRefInput<$PrismaModel> | null
    in?: $Enums.ReturnDestination[] | ListEnumReturnDestinationFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ReturnDestination[] | ListEnumReturnDestinationFieldRefInput<$PrismaModel> | null
    not?: NestedEnumReturnDestinationNullableWithAggregatesFilter<$PrismaModel> | $Enums.ReturnDestination | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumReturnDestinationNullableFilter<$PrismaModel>
    _max?: NestedEnumReturnDestinationNullableFilter<$PrismaModel>
  }

  export type StockIssuanceCreateWithoutUserInput = {
    id?: string
    status?: $Enums.IssuanceStatus
    totalWholesaleValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: IssuanceItemCreateNestedManyWithoutIssuanceInput
  }

  export type StockIssuanceUncheckedCreateWithoutUserInput = {
    id?: string
    status?: $Enums.IssuanceStatus
    totalWholesaleValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: IssuanceItemUncheckedCreateNestedManyWithoutIssuanceInput
  }

  export type StockIssuanceCreateOrConnectWithoutUserInput = {
    where: StockIssuanceWhereUniqueInput
    create: XOR<StockIssuanceCreateWithoutUserInput, StockIssuanceUncheckedCreateWithoutUserInput>
  }

  export type StockIssuanceCreateManyUserInputEnvelope = {
    data: StockIssuanceCreateManyUserInput | StockIssuanceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PaymentProofCreateWithoutUserInput = {
    id?: string
    transactionRedId: string
    sha256Hash: string
    amount: Decimal | DecimalJsLike | number | string
    bankName: string
    senderName?: string | null
    reasonRemark?: string | null
    receipeImageUrl?: string | null
    status?: $Enums.ProofStatus
    adminRemark?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentProofUncheckedCreateWithoutUserInput = {
    id?: string
    transactionRedId: string
    sha256Hash: string
    amount: Decimal | DecimalJsLike | number | string
    bankName: string
    senderName?: string | null
    reasonRemark?: string | null
    receipeImageUrl?: string | null
    status?: $Enums.ProofStatus
    adminRemark?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentProofCreateOrConnectWithoutUserInput = {
    where: PaymentProofWhereUniqueInput
    create: XOR<PaymentProofCreateWithoutUserInput, PaymentProofUncheckedCreateWithoutUserInput>
  }

  export type PaymentProofCreateManyUserInputEnvelope = {
    data: PaymentProofCreateManyUserInput | PaymentProofCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SaleCreateWithoutSalesRepInput = {
    id?: string
    quantity: number
    totalAmount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    createdAt?: Date | string
    retailer: RetailerCreateNestedOneWithoutSalesInput
    product: ProductCreateNestedOneWithoutSalesInput
  }

  export type SaleUncheckedCreateWithoutSalesRepInput = {
    id?: string
    retailerId: string
    productId: string
    quantity: number
    totalAmount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    createdAt?: Date | string
  }

  export type SaleCreateOrConnectWithoutSalesRepInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutSalesRepInput, SaleUncheckedCreateWithoutSalesRepInput>
  }

  export type SaleCreateManySalesRepInputEnvelope = {
    data: SaleCreateManySalesRepInput | SaleCreateManySalesRepInput[]
    skipDuplicates?: boolean
  }

  export type StockReturnCreateWithoutUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.ReturnStatus
    destination?: $Enums.ReturnDestination | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ReturnItemCreateNestedManyWithoutStockReturnInput
  }

  export type StockReturnUncheckedCreateWithoutUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.ReturnStatus
    destination?: $Enums.ReturnDestination | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ReturnItemUncheckedCreateNestedManyWithoutStockReturnInput
  }

  export type StockReturnCreateOrConnectWithoutUserInput = {
    where: StockReturnWhereUniqueInput
    create: XOR<StockReturnCreateWithoutUserInput, StockReturnUncheckedCreateWithoutUserInput>
  }

  export type StockReturnCreateManyUserInputEnvelope = {
    data: StockReturnCreateManyUserInput | StockReturnCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StockIssuanceUpsertWithWhereUniqueWithoutUserInput = {
    where: StockIssuanceWhereUniqueInput
    update: XOR<StockIssuanceUpdateWithoutUserInput, StockIssuanceUncheckedUpdateWithoutUserInput>
    create: XOR<StockIssuanceCreateWithoutUserInput, StockIssuanceUncheckedCreateWithoutUserInput>
  }

  export type StockIssuanceUpdateWithWhereUniqueWithoutUserInput = {
    where: StockIssuanceWhereUniqueInput
    data: XOR<StockIssuanceUpdateWithoutUserInput, StockIssuanceUncheckedUpdateWithoutUserInput>
  }

  export type StockIssuanceUpdateManyWithWhereWithoutUserInput = {
    where: StockIssuanceScalarWhereInput
    data: XOR<StockIssuanceUpdateManyMutationInput, StockIssuanceUncheckedUpdateManyWithoutUserInput>
  }

  export type StockIssuanceScalarWhereInput = {
    AND?: StockIssuanceScalarWhereInput | StockIssuanceScalarWhereInput[]
    OR?: StockIssuanceScalarWhereInput[]
    NOT?: StockIssuanceScalarWhereInput | StockIssuanceScalarWhereInput[]
    id?: StringFilter<"StockIssuance"> | string
    userId?: StringFilter<"StockIssuance"> | string
    status?: EnumIssuanceStatusFilter<"StockIssuance"> | $Enums.IssuanceStatus
    totalWholesaleValue?: DecimalFilter<"StockIssuance"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"StockIssuance"> | Date | string
    updatedAt?: DateTimeFilter<"StockIssuance"> | Date | string
  }

  export type PaymentProofUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentProofWhereUniqueInput
    update: XOR<PaymentProofUpdateWithoutUserInput, PaymentProofUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentProofCreateWithoutUserInput, PaymentProofUncheckedCreateWithoutUserInput>
  }

  export type PaymentProofUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentProofWhereUniqueInput
    data: XOR<PaymentProofUpdateWithoutUserInput, PaymentProofUncheckedUpdateWithoutUserInput>
  }

  export type PaymentProofUpdateManyWithWhereWithoutUserInput = {
    where: PaymentProofScalarWhereInput
    data: XOR<PaymentProofUpdateManyMutationInput, PaymentProofUncheckedUpdateManyWithoutUserInput>
  }

  export type PaymentProofScalarWhereInput = {
    AND?: PaymentProofScalarWhereInput | PaymentProofScalarWhereInput[]
    OR?: PaymentProofScalarWhereInput[]
    NOT?: PaymentProofScalarWhereInput | PaymentProofScalarWhereInput[]
    id?: StringFilter<"PaymentProof"> | string
    userId?: StringFilter<"PaymentProof"> | string
    transactionRedId?: StringFilter<"PaymentProof"> | string
    sha256Hash?: StringFilter<"PaymentProof"> | string
    amount?: DecimalFilter<"PaymentProof"> | Decimal | DecimalJsLike | number | string
    bankName?: StringFilter<"PaymentProof"> | string
    senderName?: StringNullableFilter<"PaymentProof"> | string | null
    reasonRemark?: StringNullableFilter<"PaymentProof"> | string | null
    receipeImageUrl?: StringNullableFilter<"PaymentProof"> | string | null
    status?: EnumProofStatusFilter<"PaymentProof"> | $Enums.ProofStatus
    adminRemark?: StringNullableFilter<"PaymentProof"> | string | null
    createdAt?: DateTimeFilter<"PaymentProof"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentProof"> | Date | string
  }

  export type SaleUpsertWithWhereUniqueWithoutSalesRepInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutSalesRepInput, SaleUncheckedUpdateWithoutSalesRepInput>
    create: XOR<SaleCreateWithoutSalesRepInput, SaleUncheckedCreateWithoutSalesRepInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutSalesRepInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutSalesRepInput, SaleUncheckedUpdateWithoutSalesRepInput>
  }

  export type SaleUpdateManyWithWhereWithoutSalesRepInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutSalesRepInput>
  }

  export type SaleScalarWhereInput = {
    AND?: SaleScalarWhereInput | SaleScalarWhereInput[]
    OR?: SaleScalarWhereInput[]
    NOT?: SaleScalarWhereInput | SaleScalarWhereInput[]
    id?: StringFilter<"Sale"> | string
    salesRepId?: StringFilter<"Sale"> | string
    retailerId?: StringFilter<"Sale"> | string
    productId?: StringFilter<"Sale"> | string
    quantity?: IntFilter<"Sale"> | number
    totalAmount?: DecimalFilter<"Sale"> | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFilter<"Sale"> | string
    createdAt?: DateTimeFilter<"Sale"> | Date | string
  }

  export type StockReturnUpsertWithWhereUniqueWithoutUserInput = {
    where: StockReturnWhereUniqueInput
    update: XOR<StockReturnUpdateWithoutUserInput, StockReturnUncheckedUpdateWithoutUserInput>
    create: XOR<StockReturnCreateWithoutUserInput, StockReturnUncheckedCreateWithoutUserInput>
  }

  export type StockReturnUpdateWithWhereUniqueWithoutUserInput = {
    where: StockReturnWhereUniqueInput
    data: XOR<StockReturnUpdateWithoutUserInput, StockReturnUncheckedUpdateWithoutUserInput>
  }

  export type StockReturnUpdateManyWithWhereWithoutUserInput = {
    where: StockReturnScalarWhereInput
    data: XOR<StockReturnUpdateManyMutationInput, StockReturnUncheckedUpdateManyWithoutUserInput>
  }

  export type StockReturnScalarWhereInput = {
    AND?: StockReturnScalarWhereInput | StockReturnScalarWhereInput[]
    OR?: StockReturnScalarWhereInput[]
    NOT?: StockReturnScalarWhereInput | StockReturnScalarWhereInput[]
    id?: StringFilter<"StockReturn"> | string
    userId?: StringFilter<"StockReturn"> | string
    totalValue?: DecimalFilter<"StockReturn"> | Decimal | DecimalJsLike | number | string
    reason?: StringFilter<"StockReturn"> | string
    status?: EnumReturnStatusFilter<"StockReturn"> | $Enums.ReturnStatus
    destination?: EnumReturnDestinationNullableFilter<"StockReturn"> | $Enums.ReturnDestination | null
    createdAt?: DateTimeFilter<"StockReturn"> | Date | string
    updatedAt?: DateTimeFilter<"StockReturn"> | Date | string
  }

  export type InventoryBatchCreateWithoutSupplierInput = {
    id?: string
    batchCode: string
    quantityRecieved: number
    remainingQty: number
    unitCostPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutBatchesInput
  }

  export type InventoryBatchUncheckedCreateWithoutSupplierInput = {
    id?: string
    batchCode: string
    productId: string
    quantityRecieved: number
    remainingQty: number
    unitCostPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InventoryBatchCreateOrConnectWithoutSupplierInput = {
    where: InventoryBatchWhereUniqueInput
    create: XOR<InventoryBatchCreateWithoutSupplierInput, InventoryBatchUncheckedCreateWithoutSupplierInput>
  }

  export type InventoryBatchCreateManySupplierInputEnvelope = {
    data: InventoryBatchCreateManySupplierInput | InventoryBatchCreateManySupplierInput[]
    skipDuplicates?: boolean
  }

  export type InventoryBatchUpsertWithWhereUniqueWithoutSupplierInput = {
    where: InventoryBatchWhereUniqueInput
    update: XOR<InventoryBatchUpdateWithoutSupplierInput, InventoryBatchUncheckedUpdateWithoutSupplierInput>
    create: XOR<InventoryBatchCreateWithoutSupplierInput, InventoryBatchUncheckedCreateWithoutSupplierInput>
  }

  export type InventoryBatchUpdateWithWhereUniqueWithoutSupplierInput = {
    where: InventoryBatchWhereUniqueInput
    data: XOR<InventoryBatchUpdateWithoutSupplierInput, InventoryBatchUncheckedUpdateWithoutSupplierInput>
  }

  export type InventoryBatchUpdateManyWithWhereWithoutSupplierInput = {
    where: InventoryBatchScalarWhereInput
    data: XOR<InventoryBatchUpdateManyMutationInput, InventoryBatchUncheckedUpdateManyWithoutSupplierInput>
  }

  export type InventoryBatchScalarWhereInput = {
    AND?: InventoryBatchScalarWhereInput | InventoryBatchScalarWhereInput[]
    OR?: InventoryBatchScalarWhereInput[]
    NOT?: InventoryBatchScalarWhereInput | InventoryBatchScalarWhereInput[]
    id?: StringFilter<"InventoryBatch"> | string
    batchCode?: StringFilter<"InventoryBatch"> | string
    productId?: StringFilter<"InventoryBatch"> | string
    supplierId?: StringFilter<"InventoryBatch"> | string
    quantityRecieved?: IntFilter<"InventoryBatch"> | number
    remainingQty?: IntFilter<"InventoryBatch"> | number
    unitCostPrice?: DecimalFilter<"InventoryBatch"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"InventoryBatch"> | Date | string
    updatedAt?: DateTimeFilter<"InventoryBatch"> | Date | string
  }

  export type InventoryBatchCreateWithoutProductInput = {
    id?: string
    batchCode: string
    quantityRecieved: number
    remainingQty: number
    unitCostPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    supplier: SupplierCreateNestedOneWithoutBatchesInput
  }

  export type InventoryBatchUncheckedCreateWithoutProductInput = {
    id?: string
    batchCode: string
    supplierId: string
    quantityRecieved: number
    remainingQty: number
    unitCostPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InventoryBatchCreateOrConnectWithoutProductInput = {
    where: InventoryBatchWhereUniqueInput
    create: XOR<InventoryBatchCreateWithoutProductInput, InventoryBatchUncheckedCreateWithoutProductInput>
  }

  export type InventoryBatchCreateManyProductInputEnvelope = {
    data: InventoryBatchCreateManyProductInput | InventoryBatchCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type SaleCreateWithoutProductInput = {
    id?: string
    quantity: number
    totalAmount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    createdAt?: Date | string
    salesRep: UserCreateNestedOneWithoutSalesInput
    retailer: RetailerCreateNestedOneWithoutSalesInput
  }

  export type SaleUncheckedCreateWithoutProductInput = {
    id?: string
    salesRepId: string
    retailerId: string
    quantity: number
    totalAmount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    createdAt?: Date | string
  }

  export type SaleCreateOrConnectWithoutProductInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutProductInput, SaleUncheckedCreateWithoutProductInput>
  }

  export type SaleCreateManyProductInputEnvelope = {
    data: SaleCreateManyProductInput | SaleCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type InventoryBatchUpsertWithWhereUniqueWithoutProductInput = {
    where: InventoryBatchWhereUniqueInput
    update: XOR<InventoryBatchUpdateWithoutProductInput, InventoryBatchUncheckedUpdateWithoutProductInput>
    create: XOR<InventoryBatchCreateWithoutProductInput, InventoryBatchUncheckedCreateWithoutProductInput>
  }

  export type InventoryBatchUpdateWithWhereUniqueWithoutProductInput = {
    where: InventoryBatchWhereUniqueInput
    data: XOR<InventoryBatchUpdateWithoutProductInput, InventoryBatchUncheckedUpdateWithoutProductInput>
  }

  export type InventoryBatchUpdateManyWithWhereWithoutProductInput = {
    where: InventoryBatchScalarWhereInput
    data: XOR<InventoryBatchUpdateManyMutationInput, InventoryBatchUncheckedUpdateManyWithoutProductInput>
  }

  export type SaleUpsertWithWhereUniqueWithoutProductInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutProductInput, SaleUncheckedUpdateWithoutProductInput>
    create: XOR<SaleCreateWithoutProductInput, SaleUncheckedCreateWithoutProductInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutProductInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutProductInput, SaleUncheckedUpdateWithoutProductInput>
  }

  export type SaleUpdateManyWithWhereWithoutProductInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutProductInput>
  }

  export type SaleCreateWithoutRetailerInput = {
    id?: string
    quantity: number
    totalAmount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    createdAt?: Date | string
    salesRep: UserCreateNestedOneWithoutSalesInput
    product: ProductCreateNestedOneWithoutSalesInput
  }

  export type SaleUncheckedCreateWithoutRetailerInput = {
    id?: string
    salesRepId: string
    productId: string
    quantity: number
    totalAmount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    createdAt?: Date | string
  }

  export type SaleCreateOrConnectWithoutRetailerInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutRetailerInput, SaleUncheckedCreateWithoutRetailerInput>
  }

  export type SaleCreateManyRetailerInputEnvelope = {
    data: SaleCreateManyRetailerInput | SaleCreateManyRetailerInput[]
    skipDuplicates?: boolean
  }

  export type SaleUpsertWithWhereUniqueWithoutRetailerInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutRetailerInput, SaleUncheckedUpdateWithoutRetailerInput>
    create: XOR<SaleCreateWithoutRetailerInput, SaleUncheckedCreateWithoutRetailerInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutRetailerInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutRetailerInput, SaleUncheckedUpdateWithoutRetailerInput>
  }

  export type SaleUpdateManyWithWhereWithoutRetailerInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutRetailerInput>
  }

  export type ProductCreateWithoutBatchesInput = {
    id?: string
    name: string
    description?: string | null
    category?: string | null
    imageUrl?: string | null
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutBatchesInput = {
    id?: string
    name: string
    description?: string | null
    category?: string | null
    imageUrl?: string | null
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutBatchesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutBatchesInput, ProductUncheckedCreateWithoutBatchesInput>
  }

  export type SupplierCreateWithoutBatchesInput = {
    id?: string
    name: string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierUncheckedCreateWithoutBatchesInput = {
    id?: string
    name: string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierCreateOrConnectWithoutBatchesInput = {
    where: SupplierWhereUniqueInput
    create: XOR<SupplierCreateWithoutBatchesInput, SupplierUncheckedCreateWithoutBatchesInput>
  }

  export type ProductUpsertWithoutBatchesInput = {
    update: XOR<ProductUpdateWithoutBatchesInput, ProductUncheckedUpdateWithoutBatchesInput>
    create: XOR<ProductCreateWithoutBatchesInput, ProductUncheckedCreateWithoutBatchesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutBatchesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutBatchesInput, ProductUncheckedUpdateWithoutBatchesInput>
  }

  export type ProductUpdateWithoutBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUncheckedUpdateManyWithoutProductNestedInput
  }

  export type SupplierUpsertWithoutBatchesInput = {
    update: XOR<SupplierUpdateWithoutBatchesInput, SupplierUncheckedUpdateWithoutBatchesInput>
    create: XOR<SupplierCreateWithoutBatchesInput, SupplierUncheckedCreateWithoutBatchesInput>
    where?: SupplierWhereInput
  }

  export type SupplierUpdateToOneWithWhereWithoutBatchesInput = {
    where?: SupplierWhereInput
    data: XOR<SupplierUpdateWithoutBatchesInput, SupplierUncheckedUpdateWithoutBatchesInput>
  }

  export type SupplierUpdateWithoutBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateWithoutBatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutStockIssusancesInput = {
    id?: string
    fullName: string
    username: string
    passwordHash: string
    profilePic?: string | null
    role?: $Enums.Role
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: Decimal | DecimalJsLike | number | string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentProofs?: PaymentProofCreateNestedManyWithoutUserInput
    sales?: SaleCreateNestedManyWithoutSalesRepInput
    returns?: StockReturnCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStockIssusancesInput = {
    id?: string
    fullName: string
    username: string
    passwordHash: string
    profilePic?: string | null
    role?: $Enums.Role
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: Decimal | DecimalJsLike | number | string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentProofs?: PaymentProofUncheckedCreateNestedManyWithoutUserInput
    sales?: SaleUncheckedCreateNestedManyWithoutSalesRepInput
    returns?: StockReturnUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStockIssusancesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStockIssusancesInput, UserUncheckedCreateWithoutStockIssusancesInput>
  }

  export type IssuanceItemCreateWithoutIssuanceInput = {
    id?: string
    productId: string
    wholesalePrice: Decimal | DecimalJsLike | number | string
    qtyIssued: number
    qtyRemaining: number
    cogsCalculated: Decimal | DecimalJsLike | number | string
  }

  export type IssuanceItemUncheckedCreateWithoutIssuanceInput = {
    id?: string
    productId: string
    wholesalePrice: Decimal | DecimalJsLike | number | string
    qtyIssued: number
    qtyRemaining: number
    cogsCalculated: Decimal | DecimalJsLike | number | string
  }

  export type IssuanceItemCreateOrConnectWithoutIssuanceInput = {
    where: IssuanceItemWhereUniqueInput
    create: XOR<IssuanceItemCreateWithoutIssuanceInput, IssuanceItemUncheckedCreateWithoutIssuanceInput>
  }

  export type IssuanceItemCreateManyIssuanceInputEnvelope = {
    data: IssuanceItemCreateManyIssuanceInput | IssuanceItemCreateManyIssuanceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutStockIssusancesInput = {
    update: XOR<UserUpdateWithoutStockIssusancesInput, UserUncheckedUpdateWithoutStockIssusancesInput>
    create: XOR<UserCreateWithoutStockIssusancesInput, UserUncheckedCreateWithoutStockIssusancesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStockIssusancesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStockIssusancesInput, UserUncheckedUpdateWithoutStockIssusancesInput>
  }

  export type UserUpdateWithoutStockIssusancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    requiresPasswordChange?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProofs?: PaymentProofUpdateManyWithoutUserNestedInput
    sales?: SaleUpdateManyWithoutSalesRepNestedInput
    returns?: StockReturnUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStockIssusancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    requiresPasswordChange?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProofs?: PaymentProofUncheckedUpdateManyWithoutUserNestedInput
    sales?: SaleUncheckedUpdateManyWithoutSalesRepNestedInput
    returns?: StockReturnUncheckedUpdateManyWithoutUserNestedInput
  }

  export type IssuanceItemUpsertWithWhereUniqueWithoutIssuanceInput = {
    where: IssuanceItemWhereUniqueInput
    update: XOR<IssuanceItemUpdateWithoutIssuanceInput, IssuanceItemUncheckedUpdateWithoutIssuanceInput>
    create: XOR<IssuanceItemCreateWithoutIssuanceInput, IssuanceItemUncheckedCreateWithoutIssuanceInput>
  }

  export type IssuanceItemUpdateWithWhereUniqueWithoutIssuanceInput = {
    where: IssuanceItemWhereUniqueInput
    data: XOR<IssuanceItemUpdateWithoutIssuanceInput, IssuanceItemUncheckedUpdateWithoutIssuanceInput>
  }

  export type IssuanceItemUpdateManyWithWhereWithoutIssuanceInput = {
    where: IssuanceItemScalarWhereInput
    data: XOR<IssuanceItemUpdateManyMutationInput, IssuanceItemUncheckedUpdateManyWithoutIssuanceInput>
  }

  export type IssuanceItemScalarWhereInput = {
    AND?: IssuanceItemScalarWhereInput | IssuanceItemScalarWhereInput[]
    OR?: IssuanceItemScalarWhereInput[]
    NOT?: IssuanceItemScalarWhereInput | IssuanceItemScalarWhereInput[]
    id?: StringFilter<"IssuanceItem"> | string
    issuanceId?: StringFilter<"IssuanceItem"> | string
    productId?: StringFilter<"IssuanceItem"> | string
    wholesalePrice?: DecimalFilter<"IssuanceItem"> | Decimal | DecimalJsLike | number | string
    qtyIssued?: IntFilter<"IssuanceItem"> | number
    qtyRemaining?: IntFilter<"IssuanceItem"> | number
    cogsCalculated?: DecimalFilter<"IssuanceItem"> | Decimal | DecimalJsLike | number | string
  }

  export type StockIssuanceCreateWithoutItemsInput = {
    id?: string
    status?: $Enums.IssuanceStatus
    totalWholesaleValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStockIssusancesInput
  }

  export type StockIssuanceUncheckedCreateWithoutItemsInput = {
    id?: string
    userId: string
    status?: $Enums.IssuanceStatus
    totalWholesaleValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockIssuanceCreateOrConnectWithoutItemsInput = {
    where: StockIssuanceWhereUniqueInput
    create: XOR<StockIssuanceCreateWithoutItemsInput, StockIssuanceUncheckedCreateWithoutItemsInput>
  }

  export type StockIssuanceUpsertWithoutItemsInput = {
    update: XOR<StockIssuanceUpdateWithoutItemsInput, StockIssuanceUncheckedUpdateWithoutItemsInput>
    create: XOR<StockIssuanceCreateWithoutItemsInput, StockIssuanceUncheckedCreateWithoutItemsInput>
    where?: StockIssuanceWhereInput
  }

  export type StockIssuanceUpdateToOneWithWhereWithoutItemsInput = {
    where?: StockIssuanceWhereInput
    data: XOR<StockIssuanceUpdateWithoutItemsInput, StockIssuanceUncheckedUpdateWithoutItemsInput>
  }

  export type StockIssuanceUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumIssuanceStatusFieldUpdateOperationsInput | $Enums.IssuanceStatus
    totalWholesaleValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStockIssusancesNestedInput
  }

  export type StockIssuanceUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumIssuanceStatusFieldUpdateOperationsInput | $Enums.IssuanceStatus
    totalWholesaleValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutSalesInput = {
    id?: string
    fullName: string
    username: string
    passwordHash: string
    profilePic?: string | null
    role?: $Enums.Role
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: Decimal | DecimalJsLike | number | string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stockIssusances?: StockIssuanceCreateNestedManyWithoutUserInput
    paymentProofs?: PaymentProofCreateNestedManyWithoutUserInput
    returns?: StockReturnCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSalesInput = {
    id?: string
    fullName: string
    username: string
    passwordHash: string
    profilePic?: string | null
    role?: $Enums.Role
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: Decimal | DecimalJsLike | number | string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stockIssusances?: StockIssuanceUncheckedCreateNestedManyWithoutUserInput
    paymentProofs?: PaymentProofUncheckedCreateNestedManyWithoutUserInput
    returns?: StockReturnUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSalesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSalesInput, UserUncheckedCreateWithoutSalesInput>
  }

  export type RetailerCreateWithoutSalesInput = {
    id?: string
    name: string
    phone?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RetailerUncheckedCreateWithoutSalesInput = {
    id?: string
    name: string
    phone?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RetailerCreateOrConnectWithoutSalesInput = {
    where: RetailerWhereUniqueInput
    create: XOR<RetailerCreateWithoutSalesInput, RetailerUncheckedCreateWithoutSalesInput>
  }

  export type ProductCreateWithoutSalesInput = {
    id?: string
    name: string
    description?: string | null
    category?: string | null
    imageUrl?: string | null
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    batches?: InventoryBatchCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutSalesInput = {
    id?: string
    name: string
    description?: string | null
    category?: string | null
    imageUrl?: string | null
    price: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    batches?: InventoryBatchUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutSalesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSalesInput, ProductUncheckedCreateWithoutSalesInput>
  }

  export type UserUpsertWithoutSalesInput = {
    update: XOR<UserUpdateWithoutSalesInput, UserUncheckedUpdateWithoutSalesInput>
    create: XOR<UserCreateWithoutSalesInput, UserUncheckedCreateWithoutSalesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSalesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSalesInput, UserUncheckedUpdateWithoutSalesInput>
  }

  export type UserUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    requiresPasswordChange?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stockIssusances?: StockIssuanceUpdateManyWithoutUserNestedInput
    paymentProofs?: PaymentProofUpdateManyWithoutUserNestedInput
    returns?: StockReturnUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    requiresPasswordChange?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stockIssusances?: StockIssuanceUncheckedUpdateManyWithoutUserNestedInput
    paymentProofs?: PaymentProofUncheckedUpdateManyWithoutUserNestedInput
    returns?: StockReturnUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RetailerUpsertWithoutSalesInput = {
    update: XOR<RetailerUpdateWithoutSalesInput, RetailerUncheckedUpdateWithoutSalesInput>
    create: XOR<RetailerCreateWithoutSalesInput, RetailerUncheckedCreateWithoutSalesInput>
    where?: RetailerWhereInput
  }

  export type RetailerUpdateToOneWithWhereWithoutSalesInput = {
    where?: RetailerWhereInput
    data: XOR<RetailerUpdateWithoutSalesInput, RetailerUncheckedUpdateWithoutSalesInput>
  }

  export type RetailerUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RetailerUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpsertWithoutSalesInput = {
    update: XOR<ProductUpdateWithoutSalesInput, ProductUncheckedUpdateWithoutSalesInput>
    create: XOR<ProductCreateWithoutSalesInput, ProductUncheckedCreateWithoutSalesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutSalesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutSalesInput, ProductUncheckedUpdateWithoutSalesInput>
  }

  export type ProductUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batches?: InventoryBatchUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batches?: InventoryBatchUncheckedUpdateManyWithoutProductNestedInput
  }

  export type UserCreateWithoutPaymentProofsInput = {
    id?: string
    fullName: string
    username: string
    passwordHash: string
    profilePic?: string | null
    role?: $Enums.Role
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: Decimal | DecimalJsLike | number | string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stockIssusances?: StockIssuanceCreateNestedManyWithoutUserInput
    sales?: SaleCreateNestedManyWithoutSalesRepInput
    returns?: StockReturnCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPaymentProofsInput = {
    id?: string
    fullName: string
    username: string
    passwordHash: string
    profilePic?: string | null
    role?: $Enums.Role
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: Decimal | DecimalJsLike | number | string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stockIssusances?: StockIssuanceUncheckedCreateNestedManyWithoutUserInput
    sales?: SaleUncheckedCreateNestedManyWithoutSalesRepInput
    returns?: StockReturnUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPaymentProofsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentProofsInput, UserUncheckedCreateWithoutPaymentProofsInput>
  }

  export type UserUpsertWithoutPaymentProofsInput = {
    update: XOR<UserUpdateWithoutPaymentProofsInput, UserUncheckedUpdateWithoutPaymentProofsInput>
    create: XOR<UserCreateWithoutPaymentProofsInput, UserUncheckedCreateWithoutPaymentProofsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentProofsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentProofsInput, UserUncheckedUpdateWithoutPaymentProofsInput>
  }

  export type UserUpdateWithoutPaymentProofsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    requiresPasswordChange?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stockIssusances?: StockIssuanceUpdateManyWithoutUserNestedInput
    sales?: SaleUpdateManyWithoutSalesRepNestedInput
    returns?: StockReturnUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentProofsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    requiresPasswordChange?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stockIssusances?: StockIssuanceUncheckedUpdateManyWithoutUserNestedInput
    sales?: SaleUncheckedUpdateManyWithoutSalesRepNestedInput
    returns?: StockReturnUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutReturnsInput = {
    id?: string
    fullName: string
    username: string
    passwordHash: string
    profilePic?: string | null
    role?: $Enums.Role
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: Decimal | DecimalJsLike | number | string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stockIssusances?: StockIssuanceCreateNestedManyWithoutUserInput
    paymentProofs?: PaymentProofCreateNestedManyWithoutUserInput
    sales?: SaleCreateNestedManyWithoutSalesRepInput
  }

  export type UserUncheckedCreateWithoutReturnsInput = {
    id?: string
    fullName: string
    username: string
    passwordHash: string
    profilePic?: string | null
    role?: $Enums.Role
    requiresPasswordChange?: boolean
    isActive?: boolean
    creditLimit?: Decimal | DecimalJsLike | number | string
    creditBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stockIssusances?: StockIssuanceUncheckedCreateNestedManyWithoutUserInput
    paymentProofs?: PaymentProofUncheckedCreateNestedManyWithoutUserInput
    sales?: SaleUncheckedCreateNestedManyWithoutSalesRepInput
  }

  export type UserCreateOrConnectWithoutReturnsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReturnsInput, UserUncheckedCreateWithoutReturnsInput>
  }

  export type ReturnItemCreateWithoutStockReturnInput = {
    id?: string
    itemId: string
    quantity: number
  }

  export type ReturnItemUncheckedCreateWithoutStockReturnInput = {
    id?: string
    itemId: string
    quantity: number
  }

  export type ReturnItemCreateOrConnectWithoutStockReturnInput = {
    where: ReturnItemWhereUniqueInput
    create: XOR<ReturnItemCreateWithoutStockReturnInput, ReturnItemUncheckedCreateWithoutStockReturnInput>
  }

  export type ReturnItemCreateManyStockReturnInputEnvelope = {
    data: ReturnItemCreateManyStockReturnInput | ReturnItemCreateManyStockReturnInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutReturnsInput = {
    update: XOR<UserUpdateWithoutReturnsInput, UserUncheckedUpdateWithoutReturnsInput>
    create: XOR<UserCreateWithoutReturnsInput, UserUncheckedCreateWithoutReturnsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReturnsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReturnsInput, UserUncheckedUpdateWithoutReturnsInput>
  }

  export type UserUpdateWithoutReturnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    requiresPasswordChange?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stockIssusances?: StockIssuanceUpdateManyWithoutUserNestedInput
    paymentProofs?: PaymentProofUpdateManyWithoutUserNestedInput
    sales?: SaleUpdateManyWithoutSalesRepNestedInput
  }

  export type UserUncheckedUpdateWithoutReturnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    requiresPasswordChange?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stockIssusances?: StockIssuanceUncheckedUpdateManyWithoutUserNestedInput
    paymentProofs?: PaymentProofUncheckedUpdateManyWithoutUserNestedInput
    sales?: SaleUncheckedUpdateManyWithoutSalesRepNestedInput
  }

  export type ReturnItemUpsertWithWhereUniqueWithoutStockReturnInput = {
    where: ReturnItemWhereUniqueInput
    update: XOR<ReturnItemUpdateWithoutStockReturnInput, ReturnItemUncheckedUpdateWithoutStockReturnInput>
    create: XOR<ReturnItemCreateWithoutStockReturnInput, ReturnItemUncheckedCreateWithoutStockReturnInput>
  }

  export type ReturnItemUpdateWithWhereUniqueWithoutStockReturnInput = {
    where: ReturnItemWhereUniqueInput
    data: XOR<ReturnItemUpdateWithoutStockReturnInput, ReturnItemUncheckedUpdateWithoutStockReturnInput>
  }

  export type ReturnItemUpdateManyWithWhereWithoutStockReturnInput = {
    where: ReturnItemScalarWhereInput
    data: XOR<ReturnItemUpdateManyMutationInput, ReturnItemUncheckedUpdateManyWithoutStockReturnInput>
  }

  export type ReturnItemScalarWhereInput = {
    AND?: ReturnItemScalarWhereInput | ReturnItemScalarWhereInput[]
    OR?: ReturnItemScalarWhereInput[]
    NOT?: ReturnItemScalarWhereInput | ReturnItemScalarWhereInput[]
    id?: StringFilter<"ReturnItem"> | string
    stockReturnId?: StringFilter<"ReturnItem"> | string
    itemId?: StringFilter<"ReturnItem"> | string
    quantity?: IntFilter<"ReturnItem"> | number
  }

  export type StockReturnCreateWithoutItemsInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.ReturnStatus
    destination?: $Enums.ReturnDestination | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReturnsInput
  }

  export type StockReturnUncheckedCreateWithoutItemsInput = {
    id?: string
    userId: string
    totalValue: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.ReturnStatus
    destination?: $Enums.ReturnDestination | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockReturnCreateOrConnectWithoutItemsInput = {
    where: StockReturnWhereUniqueInput
    create: XOR<StockReturnCreateWithoutItemsInput, StockReturnUncheckedCreateWithoutItemsInput>
  }

  export type StockReturnUpsertWithoutItemsInput = {
    update: XOR<StockReturnUpdateWithoutItemsInput, StockReturnUncheckedUpdateWithoutItemsInput>
    create: XOR<StockReturnCreateWithoutItemsInput, StockReturnUncheckedCreateWithoutItemsInput>
    where?: StockReturnWhereInput
  }

  export type StockReturnUpdateToOneWithWhereWithoutItemsInput = {
    where?: StockReturnWhereInput
    data: XOR<StockReturnUpdateWithoutItemsInput, StockReturnUncheckedUpdateWithoutItemsInput>
  }

  export type StockReturnUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumReturnStatusFieldUpdateOperationsInput | $Enums.ReturnStatus
    destination?: NullableEnumReturnDestinationFieldUpdateOperationsInput | $Enums.ReturnDestination | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReturnsNestedInput
  }

  export type StockReturnUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumReturnStatusFieldUpdateOperationsInput | $Enums.ReturnStatus
    destination?: NullableEnumReturnDestinationFieldUpdateOperationsInput | $Enums.ReturnDestination | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockIssuanceCreateManyUserInput = {
    id?: string
    status?: $Enums.IssuanceStatus
    totalWholesaleValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentProofCreateManyUserInput = {
    id?: string
    transactionRedId: string
    sha256Hash: string
    amount: Decimal | DecimalJsLike | number | string
    bankName: string
    senderName?: string | null
    reasonRemark?: string | null
    receipeImageUrl?: string | null
    status?: $Enums.ProofStatus
    adminRemark?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleCreateManySalesRepInput = {
    id?: string
    retailerId: string
    productId: string
    quantity: number
    totalAmount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    createdAt?: Date | string
  }

  export type StockReturnCreateManyUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.ReturnStatus
    destination?: $Enums.ReturnDestination | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockIssuanceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumIssuanceStatusFieldUpdateOperationsInput | $Enums.IssuanceStatus
    totalWholesaleValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: IssuanceItemUpdateManyWithoutIssuanceNestedInput
  }

  export type StockIssuanceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumIssuanceStatusFieldUpdateOperationsInput | $Enums.IssuanceStatus
    totalWholesaleValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: IssuanceItemUncheckedUpdateManyWithoutIssuanceNestedInput
  }

  export type StockIssuanceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumIssuanceStatusFieldUpdateOperationsInput | $Enums.IssuanceStatus
    totalWholesaleValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentProofUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionRedId?: StringFieldUpdateOperationsInput | string
    sha256Hash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    bankName?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    reasonRemark?: NullableStringFieldUpdateOperationsInput | string | null
    receipeImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProofStatusFieldUpdateOperationsInput | $Enums.ProofStatus
    adminRemark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentProofUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionRedId?: StringFieldUpdateOperationsInput | string
    sha256Hash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    bankName?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    reasonRemark?: NullableStringFieldUpdateOperationsInput | string | null
    receipeImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProofStatusFieldUpdateOperationsInput | $Enums.ProofStatus
    adminRemark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentProofUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionRedId?: StringFieldUpdateOperationsInput | string
    sha256Hash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    bankName?: StringFieldUpdateOperationsInput | string
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    reasonRemark?: NullableStringFieldUpdateOperationsInput | string | null
    receipeImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProofStatusFieldUpdateOperationsInput | $Enums.ProofStatus
    adminRemark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleUpdateWithoutSalesRepInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    retailer?: RetailerUpdateOneRequiredWithoutSalesNestedInput
    product?: ProductUpdateOneRequiredWithoutSalesNestedInput
  }

  export type SaleUncheckedUpdateWithoutSalesRepInput = {
    id?: StringFieldUpdateOperationsInput | string
    retailerId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleUncheckedUpdateManyWithoutSalesRepInput = {
    id?: StringFieldUpdateOperationsInput | string
    retailerId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockReturnUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumReturnStatusFieldUpdateOperationsInput | $Enums.ReturnStatus
    destination?: NullableEnumReturnDestinationFieldUpdateOperationsInput | $Enums.ReturnDestination | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ReturnItemUpdateManyWithoutStockReturnNestedInput
  }

  export type StockReturnUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumReturnStatusFieldUpdateOperationsInput | $Enums.ReturnStatus
    destination?: NullableEnumReturnDestinationFieldUpdateOperationsInput | $Enums.ReturnDestination | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ReturnItemUncheckedUpdateManyWithoutStockReturnNestedInput
  }

  export type StockReturnUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumReturnStatusFieldUpdateOperationsInput | $Enums.ReturnStatus
    destination?: NullableEnumReturnDestinationFieldUpdateOperationsInput | $Enums.ReturnDestination | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryBatchCreateManySupplierInput = {
    id?: string
    batchCode: string
    productId: string
    quantityRecieved: number
    remainingQty: number
    unitCostPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InventoryBatchUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchCode?: StringFieldUpdateOperationsInput | string
    quantityRecieved?: IntFieldUpdateOperationsInput | number
    remainingQty?: IntFieldUpdateOperationsInput | number
    unitCostPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutBatchesNestedInput
  }

  export type InventoryBatchUncheckedUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchCode?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantityRecieved?: IntFieldUpdateOperationsInput | number
    remainingQty?: IntFieldUpdateOperationsInput | number
    unitCostPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryBatchUncheckedUpdateManyWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchCode?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantityRecieved?: IntFieldUpdateOperationsInput | number
    remainingQty?: IntFieldUpdateOperationsInput | number
    unitCostPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryBatchCreateManyProductInput = {
    id?: string
    batchCode: string
    supplierId: string
    quantityRecieved: number
    remainingQty: number
    unitCostPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleCreateManyProductInput = {
    id?: string
    salesRepId: string
    retailerId: string
    quantity: number
    totalAmount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    createdAt?: Date | string
  }

  export type InventoryBatchUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchCode?: StringFieldUpdateOperationsInput | string
    quantityRecieved?: IntFieldUpdateOperationsInput | number
    remainingQty?: IntFieldUpdateOperationsInput | number
    unitCostPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplier?: SupplierUpdateOneRequiredWithoutBatchesNestedInput
  }

  export type InventoryBatchUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchCode?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    quantityRecieved?: IntFieldUpdateOperationsInput | number
    remainingQty?: IntFieldUpdateOperationsInput | number
    unitCostPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryBatchUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchCode?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    quantityRecieved?: IntFieldUpdateOperationsInput | number
    remainingQty?: IntFieldUpdateOperationsInput | number
    unitCostPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    salesRep?: UserUpdateOneRequiredWithoutSalesNestedInput
    retailer?: RetailerUpdateOneRequiredWithoutSalesNestedInput
  }

  export type SaleUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    salesRepId?: StringFieldUpdateOperationsInput | string
    retailerId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    salesRepId?: StringFieldUpdateOperationsInput | string
    retailerId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleCreateManyRetailerInput = {
    id?: string
    salesRepId: string
    productId: string
    quantity: number
    totalAmount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    createdAt?: Date | string
  }

  export type SaleUpdateWithoutRetailerInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    salesRep?: UserUpdateOneRequiredWithoutSalesNestedInput
    product?: ProductUpdateOneRequiredWithoutSalesNestedInput
  }

  export type SaleUncheckedUpdateWithoutRetailerInput = {
    id?: StringFieldUpdateOperationsInput | string
    salesRepId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleUncheckedUpdateManyWithoutRetailerInput = {
    id?: StringFieldUpdateOperationsInput | string
    salesRepId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IssuanceItemCreateManyIssuanceInput = {
    id?: string
    productId: string
    wholesalePrice: Decimal | DecimalJsLike | number | string
    qtyIssued: number
    qtyRemaining: number
    cogsCalculated: Decimal | DecimalJsLike | number | string
  }

  export type IssuanceItemUpdateWithoutIssuanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    wholesalePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qtyIssued?: IntFieldUpdateOperationsInput | number
    qtyRemaining?: IntFieldUpdateOperationsInput | number
    cogsCalculated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type IssuanceItemUncheckedUpdateWithoutIssuanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    wholesalePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qtyIssued?: IntFieldUpdateOperationsInput | number
    qtyRemaining?: IntFieldUpdateOperationsInput | number
    cogsCalculated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type IssuanceItemUncheckedUpdateManyWithoutIssuanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    wholesalePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qtyIssued?: IntFieldUpdateOperationsInput | number
    qtyRemaining?: IntFieldUpdateOperationsInput | number
    cogsCalculated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ReturnItemCreateManyStockReturnInput = {
    id?: string
    itemId: string
    quantity: number
  }

  export type ReturnItemUpdateWithoutStockReturnInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type ReturnItemUncheckedUpdateWithoutStockReturnInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type ReturnItemUncheckedUpdateManyWithoutStockReturnInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}