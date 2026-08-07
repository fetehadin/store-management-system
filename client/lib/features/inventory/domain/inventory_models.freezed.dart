// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint, type=warning, deprecated_member_use, deprecated_member_use_from_same_package
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'inventory_models.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$SupplierModel {

 String get id; String get name; String get phone;@JsonKey(name: 'creditBalance', defaultValue: 0.0) double get creditBalance; DateTime? get createdAt; DateTime? get updatedAt;
/// Create a copy of SupplierModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SupplierModelCopyWith<SupplierModel> get copyWith => _$SupplierModelCopyWithImpl<SupplierModel>(this as SupplierModel, _$identity);

  /// Serializes this SupplierModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SupplierModel&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.phone, phone) || other.phone == phone)&&(identical(other.creditBalance, creditBalance) || other.creditBalance == creditBalance)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.updatedAt, updatedAt) || other.updatedAt == updatedAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name,phone,creditBalance,createdAt,updatedAt);

@override
String toString() {
  return 'SupplierModel(id: $id, name: $name, phone: $phone, creditBalance: $creditBalance, createdAt: $createdAt, updatedAt: $updatedAt)';
}


}

/// @nodoc
abstract mixin class $SupplierModelCopyWith<$Res>  {
  factory $SupplierModelCopyWith(SupplierModel value, $Res Function(SupplierModel) _then) = _$SupplierModelCopyWithImpl;
@useResult
$Res call({
 String id, String name, String phone,@JsonKey(name: 'creditBalance', defaultValue: 0.0) double creditBalance, DateTime? createdAt, DateTime? updatedAt
});




}
/// @nodoc
class _$SupplierModelCopyWithImpl<$Res>
    implements $SupplierModelCopyWith<$Res> {
  _$SupplierModelCopyWithImpl(this._self, this._then);

  final SupplierModel _self;
  final $Res Function(SupplierModel) _then;

/// Create a copy of SupplierModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? name = null,Object? phone = null,Object? creditBalance = null,Object? createdAt = freezed,Object? updatedAt = freezed,}) {
  return _then(SupplierModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,phone: null == phone ? _self.phone : phone // ignore: cast_nullable_to_non_nullable
as String,creditBalance: null == creditBalance ? _self.creditBalance : creditBalance // ignore: cast_nullable_to_non_nullable
as double,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,updatedAt: freezed == updatedAt ? _self.updatedAt : updatedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

}


/// Adds pattern-matching-related methods to [SupplierModel].
extension SupplierModelPatterns on SupplierModel {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _SupplierModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _SupplierModel() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _SupplierModel value)  $default,){
final _that = this;
switch (_that) {
case _SupplierModel():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _SupplierModel value)?  $default,){
final _that = this;
switch (_that) {
case _SupplierModel() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String name,  String phone, @JsonKey(name: 'creditBalance', defaultValue: 0.0)  double creditBalance,  DateTime? createdAt,  DateTime? updatedAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _SupplierModel() when $default != null:
return $default(_that.id,_that.name,_that.phone,_that.creditBalance,_that.createdAt,_that.updatedAt);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String name,  String phone, @JsonKey(name: 'creditBalance', defaultValue: 0.0)  double creditBalance,  DateTime? createdAt,  DateTime? updatedAt)  $default,) {final _that = this;
switch (_that) {
case _SupplierModel():
return $default(_that.id,_that.name,_that.phone,_that.creditBalance,_that.createdAt,_that.updatedAt);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String name,  String phone, @JsonKey(name: 'creditBalance', defaultValue: 0.0)  double creditBalance,  DateTime? createdAt,  DateTime? updatedAt)?  $default,) {final _that = this;
switch (_that) {
case _SupplierModel() when $default != null:
return $default(_that.id,_that.name,_that.phone,_that.creditBalance,_that.createdAt,_that.updatedAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _SupplierModel implements SupplierModel {
  const _SupplierModel({required this.id, required this.name, required this.phone, @JsonKey(name: 'creditBalance', defaultValue: 0.0) required this.creditBalance, this.createdAt, this.updatedAt});
  factory _SupplierModel.fromJson(Map<String, dynamic> json) => _$SupplierModelFromJson(json);

@override final  String id;
@override final  String name;
@override final  String phone;
@override@JsonKey(name: 'creditBalance', defaultValue: 0.0) final  double creditBalance;
@override final  DateTime? createdAt;
@override final  DateTime? updatedAt;

/// Create a copy of SupplierModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$SupplierModelCopyWith<_SupplierModel> get copyWith => __$SupplierModelCopyWithImpl<_SupplierModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$SupplierModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _SupplierModel&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.phone, phone) || other.phone == phone)&&(identical(other.creditBalance, creditBalance) || other.creditBalance == creditBalance)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.updatedAt, updatedAt) || other.updatedAt == updatedAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name,phone,creditBalance,createdAt,updatedAt);

@override
String toString() {
  return 'SupplierModel(id: $id, name: $name, phone: $phone, creditBalance: $creditBalance, createdAt: $createdAt, updatedAt: $updatedAt)';
}


}

/// @nodoc
abstract mixin class _$SupplierModelCopyWith<$Res> implements $SupplierModelCopyWith<$Res> {
  factory _$SupplierModelCopyWith(_SupplierModel value, $Res Function(_SupplierModel) _then) = __$SupplierModelCopyWithImpl;
@override @useResult
$Res call({
 String id, String name, String phone,@JsonKey(name: 'creditBalance', defaultValue: 0.0) double creditBalance, DateTime? createdAt, DateTime? updatedAt
});




}
/// @nodoc
class __$SupplierModelCopyWithImpl<$Res>
    implements _$SupplierModelCopyWith<$Res> {
  __$SupplierModelCopyWithImpl(this._self, this._then);

  final _SupplierModel _self;
  final $Res Function(_SupplierModel) _then;

/// Create a copy of SupplierModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? name = null,Object? phone = null,Object? creditBalance = null,Object? createdAt = freezed,Object? updatedAt = freezed,}) {
  return _then(_SupplierModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,phone: null == phone ? _self.phone : phone // ignore: cast_nullable_to_non_nullable
as String,creditBalance: null == creditBalance ? _self.creditBalance : creditBalance // ignore: cast_nullable_to_non_nullable
as double,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,updatedAt: freezed == updatedAt ? _self.updatedAt : updatedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}


}


/// @nodoc
mixin _$ProductModel {

 String get id; String get name; String? get description;@JsonKey(name: 'price', defaultValue: 0.0) double get price; DateTime? get createdAt; DateTime? get updatedAt;
/// Create a copy of ProductModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ProductModelCopyWith<ProductModel> get copyWith => _$ProductModelCopyWithImpl<ProductModel>(this as ProductModel, _$identity);

  /// Serializes this ProductModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ProductModel&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.description, description) || other.description == description)&&(identical(other.price, price) || other.price == price)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.updatedAt, updatedAt) || other.updatedAt == updatedAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name,description,price,createdAt,updatedAt);

@override
String toString() {
  return 'ProductModel(id: $id, name: $name, description: $description, price: $price, createdAt: $createdAt, updatedAt: $updatedAt)';
}


}

/// @nodoc
abstract mixin class $ProductModelCopyWith<$Res>  {
  factory $ProductModelCopyWith(ProductModel value, $Res Function(ProductModel) _then) = _$ProductModelCopyWithImpl;
@useResult
$Res call({
 String id, String name, String? description,@JsonKey(name: 'price', defaultValue: 0.0) double price, DateTime? createdAt, DateTime? updatedAt
});




}
/// @nodoc
class _$ProductModelCopyWithImpl<$Res>
    implements $ProductModelCopyWith<$Res> {
  _$ProductModelCopyWithImpl(this._self, this._then);

  final ProductModel _self;
  final $Res Function(ProductModel) _then;

/// Create a copy of ProductModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? name = null,Object? description = freezed,Object? price = null,Object? createdAt = freezed,Object? updatedAt = freezed,}) {
  return _then(ProductModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,description: freezed == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String?,price: null == price ? _self.price : price // ignore: cast_nullable_to_non_nullable
as double,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,updatedAt: freezed == updatedAt ? _self.updatedAt : updatedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

}


/// Adds pattern-matching-related methods to [ProductModel].
extension ProductModelPatterns on ProductModel {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ProductModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ProductModel() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ProductModel value)  $default,){
final _that = this;
switch (_that) {
case _ProductModel():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ProductModel value)?  $default,){
final _that = this;
switch (_that) {
case _ProductModel() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String name,  String? description, @JsonKey(name: 'price', defaultValue: 0.0)  double price,  DateTime? createdAt,  DateTime? updatedAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ProductModel() when $default != null:
return $default(_that.id,_that.name,_that.description,_that.price,_that.createdAt,_that.updatedAt);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String name,  String? description, @JsonKey(name: 'price', defaultValue: 0.0)  double price,  DateTime? createdAt,  DateTime? updatedAt)  $default,) {final _that = this;
switch (_that) {
case _ProductModel():
return $default(_that.id,_that.name,_that.description,_that.price,_that.createdAt,_that.updatedAt);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String name,  String? description, @JsonKey(name: 'price', defaultValue: 0.0)  double price,  DateTime? createdAt,  DateTime? updatedAt)?  $default,) {final _that = this;
switch (_that) {
case _ProductModel() when $default != null:
return $default(_that.id,_that.name,_that.description,_that.price,_that.createdAt,_that.updatedAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ProductModel implements ProductModel {
  const _ProductModel({required this.id, required this.name, this.description, @JsonKey(name: 'price', defaultValue: 0.0) required this.price, this.createdAt, this.updatedAt});
  factory _ProductModel.fromJson(Map<String, dynamic> json) => _$ProductModelFromJson(json);

@override final  String id;
@override final  String name;
@override final  String? description;
@override@JsonKey(name: 'price', defaultValue: 0.0) final  double price;
@override final  DateTime? createdAt;
@override final  DateTime? updatedAt;

/// Create a copy of ProductModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ProductModelCopyWith<_ProductModel> get copyWith => __$ProductModelCopyWithImpl<_ProductModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ProductModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ProductModel&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.description, description) || other.description == description)&&(identical(other.price, price) || other.price == price)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.updatedAt, updatedAt) || other.updatedAt == updatedAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name,description,price,createdAt,updatedAt);

@override
String toString() {
  return 'ProductModel(id: $id, name: $name, description: $description, price: $price, createdAt: $createdAt, updatedAt: $updatedAt)';
}


}

/// @nodoc
abstract mixin class _$ProductModelCopyWith<$Res> implements $ProductModelCopyWith<$Res> {
  factory _$ProductModelCopyWith(_ProductModel value, $Res Function(_ProductModel) _then) = __$ProductModelCopyWithImpl;
@override @useResult
$Res call({
 String id, String name, String? description,@JsonKey(name: 'price', defaultValue: 0.0) double price, DateTime? createdAt, DateTime? updatedAt
});




}
/// @nodoc
class __$ProductModelCopyWithImpl<$Res>
    implements _$ProductModelCopyWith<$Res> {
  __$ProductModelCopyWithImpl(this._self, this._then);

  final _ProductModel _self;
  final $Res Function(_ProductModel) _then;

/// Create a copy of ProductModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? name = null,Object? description = freezed,Object? price = null,Object? createdAt = freezed,Object? updatedAt = freezed,}) {
  return _then(_ProductModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,description: freezed == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String?,price: null == price ? _self.price : price // ignore: cast_nullable_to_non_nullable
as double,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,updatedAt: freezed == updatedAt ? _self.updatedAt : updatedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}


}


/// @nodoc
mixin _$InventoryBatchModel {

 String get id; String get batchCode; String get productId; String get supplierId;@JsonKey(name: 'quantityRecieved') int get quantityReceived; int get remainingQty;@JsonKey(name: 'unitCostPrice', defaultValue: 0.0) double get unitCostPrice; DateTime? get createdAt; DateTime? get updatedAt; ProductModel? get product; SupplierModel? get supplier;
/// Create a copy of InventoryBatchModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$InventoryBatchModelCopyWith<InventoryBatchModel> get copyWith => _$InventoryBatchModelCopyWithImpl<InventoryBatchModel>(this as InventoryBatchModel, _$identity);

  /// Serializes this InventoryBatchModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is InventoryBatchModel&&(identical(other.id, id) || other.id == id)&&(identical(other.batchCode, batchCode) || other.batchCode == batchCode)&&(identical(other.productId, productId) || other.productId == productId)&&(identical(other.supplierId, supplierId) || other.supplierId == supplierId)&&(identical(other.quantityReceived, quantityReceived) || other.quantityReceived == quantityReceived)&&(identical(other.remainingQty, remainingQty) || other.remainingQty == remainingQty)&&(identical(other.unitCostPrice, unitCostPrice) || other.unitCostPrice == unitCostPrice)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.updatedAt, updatedAt) || other.updatedAt == updatedAt)&&(identical(other.product, product) || other.product == product)&&(identical(other.supplier, supplier) || other.supplier == supplier));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,batchCode,productId,supplierId,quantityReceived,remainingQty,unitCostPrice,createdAt,updatedAt,product,supplier);

@override
String toString() {
  return 'InventoryBatchModel(id: $id, batchCode: $batchCode, productId: $productId, supplierId: $supplierId, quantityReceived: $quantityReceived, remainingQty: $remainingQty, unitCostPrice: $unitCostPrice, createdAt: $createdAt, updatedAt: $updatedAt, product: $product, supplier: $supplier)';
}


}

/// @nodoc
abstract mixin class $InventoryBatchModelCopyWith<$Res>  {
  factory $InventoryBatchModelCopyWith(InventoryBatchModel value, $Res Function(InventoryBatchModel) _then) = _$InventoryBatchModelCopyWithImpl;
@useResult
$Res call({
 String id, String batchCode, String productId, String supplierId,@JsonKey(name: 'quantityRecieved') int quantityReceived, int remainingQty,@JsonKey(name: 'unitCostPrice', defaultValue: 0.0) double unitCostPrice, DateTime? createdAt, DateTime? updatedAt, ProductModel? product, SupplierModel? supplier
});


$ProductModelCopyWith<$Res>? get product;$SupplierModelCopyWith<$Res>? get supplier;

}
/// @nodoc
class _$InventoryBatchModelCopyWithImpl<$Res>
    implements $InventoryBatchModelCopyWith<$Res> {
  _$InventoryBatchModelCopyWithImpl(this._self, this._then);

  final InventoryBatchModel _self;
  final $Res Function(InventoryBatchModel) _then;

/// Create a copy of InventoryBatchModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? batchCode = null,Object? productId = null,Object? supplierId = null,Object? quantityReceived = null,Object? remainingQty = null,Object? unitCostPrice = null,Object? createdAt = freezed,Object? updatedAt = freezed,Object? product = freezed,Object? supplier = freezed,}) {
  return _then(InventoryBatchModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,batchCode: null == batchCode ? _self.batchCode : batchCode // ignore: cast_nullable_to_non_nullable
as String,productId: null == productId ? _self.productId : productId // ignore: cast_nullable_to_non_nullable
as String,supplierId: null == supplierId ? _self.supplierId : supplierId // ignore: cast_nullable_to_non_nullable
as String,quantityReceived: null == quantityReceived ? _self.quantityReceived : quantityReceived // ignore: cast_nullable_to_non_nullable
as int,remainingQty: null == remainingQty ? _self.remainingQty : remainingQty // ignore: cast_nullable_to_non_nullable
as int,unitCostPrice: null == unitCostPrice ? _self.unitCostPrice : unitCostPrice // ignore: cast_nullable_to_non_nullable
as double,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,updatedAt: freezed == updatedAt ? _self.updatedAt : updatedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,product: freezed == product ? _self.product : product // ignore: cast_nullable_to_non_nullable
as ProductModel?,supplier: freezed == supplier ? _self.supplier : supplier // ignore: cast_nullable_to_non_nullable
as SupplierModel?,
  ));
}
/// Create a copy of InventoryBatchModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ProductModelCopyWith<$Res>? get product {
    if (_self.product == null) {
    return null;
  }

  return $ProductModelCopyWith<$Res>(_self.product!, (value) {
    return _then(_self.copyWith(product: value));
  });
}/// Create a copy of InventoryBatchModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$SupplierModelCopyWith<$Res>? get supplier {
    if (_self.supplier == null) {
    return null;
  }

  return $SupplierModelCopyWith<$Res>(_self.supplier!, (value) {
    return _then(_self.copyWith(supplier: value));
  });
}
}


/// Adds pattern-matching-related methods to [InventoryBatchModel].
extension InventoryBatchModelPatterns on InventoryBatchModel {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _InventoryBatchModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _InventoryBatchModel() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _InventoryBatchModel value)  $default,){
final _that = this;
switch (_that) {
case _InventoryBatchModel():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _InventoryBatchModel value)?  $default,){
final _that = this;
switch (_that) {
case _InventoryBatchModel() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String batchCode,  String productId,  String supplierId, @JsonKey(name: 'quantityRecieved')  int quantityReceived,  int remainingQty, @JsonKey(name: 'unitCostPrice', defaultValue: 0.0)  double unitCostPrice,  DateTime? createdAt,  DateTime? updatedAt,  ProductModel? product,  SupplierModel? supplier)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _InventoryBatchModel() when $default != null:
return $default(_that.id,_that.batchCode,_that.productId,_that.supplierId,_that.quantityReceived,_that.remainingQty,_that.unitCostPrice,_that.createdAt,_that.updatedAt,_that.product,_that.supplier);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String batchCode,  String productId,  String supplierId, @JsonKey(name: 'quantityRecieved')  int quantityReceived,  int remainingQty, @JsonKey(name: 'unitCostPrice', defaultValue: 0.0)  double unitCostPrice,  DateTime? createdAt,  DateTime? updatedAt,  ProductModel? product,  SupplierModel? supplier)  $default,) {final _that = this;
switch (_that) {
case _InventoryBatchModel():
return $default(_that.id,_that.batchCode,_that.productId,_that.supplierId,_that.quantityReceived,_that.remainingQty,_that.unitCostPrice,_that.createdAt,_that.updatedAt,_that.product,_that.supplier);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String batchCode,  String productId,  String supplierId, @JsonKey(name: 'quantityRecieved')  int quantityReceived,  int remainingQty, @JsonKey(name: 'unitCostPrice', defaultValue: 0.0)  double unitCostPrice,  DateTime? createdAt,  DateTime? updatedAt,  ProductModel? product,  SupplierModel? supplier)?  $default,) {final _that = this;
switch (_that) {
case _InventoryBatchModel() when $default != null:
return $default(_that.id,_that.batchCode,_that.productId,_that.supplierId,_that.quantityReceived,_that.remainingQty,_that.unitCostPrice,_that.createdAt,_that.updatedAt,_that.product,_that.supplier);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _InventoryBatchModel implements InventoryBatchModel {
  const _InventoryBatchModel({required this.id, required this.batchCode, required this.productId, required this.supplierId, @JsonKey(name: 'quantityRecieved') required this.quantityReceived, required this.remainingQty, @JsonKey(name: 'unitCostPrice', defaultValue: 0.0) required this.unitCostPrice, this.createdAt, this.updatedAt, this.product, this.supplier});
  factory _InventoryBatchModel.fromJson(Map<String, dynamic> json) => _$InventoryBatchModelFromJson(json);

@override final  String id;
@override final  String batchCode;
@override final  String productId;
@override final  String supplierId;
@override@JsonKey(name: 'quantityRecieved') final  int quantityReceived;
@override final  int remainingQty;
@override@JsonKey(name: 'unitCostPrice', defaultValue: 0.0) final  double unitCostPrice;
@override final  DateTime? createdAt;
@override final  DateTime? updatedAt;
@override final  ProductModel? product;
@override final  SupplierModel? supplier;

/// Create a copy of InventoryBatchModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$InventoryBatchModelCopyWith<_InventoryBatchModel> get copyWith => __$InventoryBatchModelCopyWithImpl<_InventoryBatchModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$InventoryBatchModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _InventoryBatchModel&&(identical(other.id, id) || other.id == id)&&(identical(other.batchCode, batchCode) || other.batchCode == batchCode)&&(identical(other.productId, productId) || other.productId == productId)&&(identical(other.supplierId, supplierId) || other.supplierId == supplierId)&&(identical(other.quantityReceived, quantityReceived) || other.quantityReceived == quantityReceived)&&(identical(other.remainingQty, remainingQty) || other.remainingQty == remainingQty)&&(identical(other.unitCostPrice, unitCostPrice) || other.unitCostPrice == unitCostPrice)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.updatedAt, updatedAt) || other.updatedAt == updatedAt)&&(identical(other.product, product) || other.product == product)&&(identical(other.supplier, supplier) || other.supplier == supplier));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,batchCode,productId,supplierId,quantityReceived,remainingQty,unitCostPrice,createdAt,updatedAt,product,supplier);

@override
String toString() {
  return 'InventoryBatchModel(id: $id, batchCode: $batchCode, productId: $productId, supplierId: $supplierId, quantityReceived: $quantityReceived, remainingQty: $remainingQty, unitCostPrice: $unitCostPrice, createdAt: $createdAt, updatedAt: $updatedAt, product: $product, supplier: $supplier)';
}


}

/// @nodoc
abstract mixin class _$InventoryBatchModelCopyWith<$Res> implements $InventoryBatchModelCopyWith<$Res> {
  factory _$InventoryBatchModelCopyWith(_InventoryBatchModel value, $Res Function(_InventoryBatchModel) _then) = __$InventoryBatchModelCopyWithImpl;
@override @useResult
$Res call({
 String id, String batchCode, String productId, String supplierId,@JsonKey(name: 'quantityRecieved') int quantityReceived, int remainingQty,@JsonKey(name: 'unitCostPrice', defaultValue: 0.0) double unitCostPrice, DateTime? createdAt, DateTime? updatedAt, ProductModel? product, SupplierModel? supplier
});


@override $ProductModelCopyWith<$Res>? get product;@override $SupplierModelCopyWith<$Res>? get supplier;

}
/// @nodoc
class __$InventoryBatchModelCopyWithImpl<$Res>
    implements _$InventoryBatchModelCopyWith<$Res> {
  __$InventoryBatchModelCopyWithImpl(this._self, this._then);

  final _InventoryBatchModel _self;
  final $Res Function(_InventoryBatchModel) _then;

/// Create a copy of InventoryBatchModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? batchCode = null,Object? productId = null,Object? supplierId = null,Object? quantityReceived = null,Object? remainingQty = null,Object? unitCostPrice = null,Object? createdAt = freezed,Object? updatedAt = freezed,Object? product = freezed,Object? supplier = freezed,}) {
  return _then(_InventoryBatchModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,batchCode: null == batchCode ? _self.batchCode : batchCode // ignore: cast_nullable_to_non_nullable
as String,productId: null == productId ? _self.productId : productId // ignore: cast_nullable_to_non_nullable
as String,supplierId: null == supplierId ? _self.supplierId : supplierId // ignore: cast_nullable_to_non_nullable
as String,quantityReceived: null == quantityReceived ? _self.quantityReceived : quantityReceived // ignore: cast_nullable_to_non_nullable
as int,remainingQty: null == remainingQty ? _self.remainingQty : remainingQty // ignore: cast_nullable_to_non_nullable
as int,unitCostPrice: null == unitCostPrice ? _self.unitCostPrice : unitCostPrice // ignore: cast_nullable_to_non_nullable
as double,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,updatedAt: freezed == updatedAt ? _self.updatedAt : updatedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,product: freezed == product ? _self.product : product // ignore: cast_nullable_to_non_nullable
as ProductModel?,supplier: freezed == supplier ? _self.supplier : supplier // ignore: cast_nullable_to_non_nullable
as SupplierModel?,
  ));
}

/// Create a copy of InventoryBatchModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ProductModelCopyWith<$Res>? get product {
    if (_self.product == null) {
    return null;
  }

  return $ProductModelCopyWith<$Res>(_self.product!, (value) {
    return _then(_self.copyWith(product: value));
  });
}/// Create a copy of InventoryBatchModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$SupplierModelCopyWith<$Res>? get supplier {
    if (_self.supplier == null) {
    return null;
  }

  return $SupplierModelCopyWith<$Res>(_self.supplier!, (value) {
    return _then(_self.copyWith(supplier: value));
  });
}
}

// dart format on
