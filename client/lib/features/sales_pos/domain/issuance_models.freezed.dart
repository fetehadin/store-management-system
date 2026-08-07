// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint, type=warning, deprecated_member_use, deprecated_member_use_from_same_package
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'issuance_models.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$IssuanceItemModel {

 String get id; String get issuanceId; String get productId;@JsonKey(name: 'wholesalePrice', defaultValue: 0.0) double get wholesalePrice; int get qtyIssued;@JsonKey(name: 'cogsCalculated', defaultValue: 0.0) double get cogsCalculated;
/// Create a copy of IssuanceItemModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$IssuanceItemModelCopyWith<IssuanceItemModel> get copyWith => _$IssuanceItemModelCopyWithImpl<IssuanceItemModel>(this as IssuanceItemModel, _$identity);

  /// Serializes this IssuanceItemModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is IssuanceItemModel&&(identical(other.id, id) || other.id == id)&&(identical(other.issuanceId, issuanceId) || other.issuanceId == issuanceId)&&(identical(other.productId, productId) || other.productId == productId)&&(identical(other.wholesalePrice, wholesalePrice) || other.wholesalePrice == wholesalePrice)&&(identical(other.qtyIssued, qtyIssued) || other.qtyIssued == qtyIssued)&&(identical(other.cogsCalculated, cogsCalculated) || other.cogsCalculated == cogsCalculated));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,issuanceId,productId,wholesalePrice,qtyIssued,cogsCalculated);

@override
String toString() {
  return 'IssuanceItemModel(id: $id, issuanceId: $issuanceId, productId: $productId, wholesalePrice: $wholesalePrice, qtyIssued: $qtyIssued, cogsCalculated: $cogsCalculated)';
}


}

/// @nodoc
abstract mixin class $IssuanceItemModelCopyWith<$Res>  {
  factory $IssuanceItemModelCopyWith(IssuanceItemModel value, $Res Function(IssuanceItemModel) _then) = _$IssuanceItemModelCopyWithImpl;
@useResult
$Res call({
 String id, String issuanceId, String productId,@JsonKey(name: 'wholesalePrice', defaultValue: 0.0) double wholesalePrice, int qtyIssued,@JsonKey(name: 'cogsCalculated', defaultValue: 0.0) double cogsCalculated
});




}
/// @nodoc
class _$IssuanceItemModelCopyWithImpl<$Res>
    implements $IssuanceItemModelCopyWith<$Res> {
  _$IssuanceItemModelCopyWithImpl(this._self, this._then);

  final IssuanceItemModel _self;
  final $Res Function(IssuanceItemModel) _then;

/// Create a copy of IssuanceItemModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? issuanceId = null,Object? productId = null,Object? wholesalePrice = null,Object? qtyIssued = null,Object? cogsCalculated = null,}) {
  return _then(IssuanceItemModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,issuanceId: null == issuanceId ? _self.issuanceId : issuanceId // ignore: cast_nullable_to_non_nullable
as String,productId: null == productId ? _self.productId : productId // ignore: cast_nullable_to_non_nullable
as String,wholesalePrice: null == wholesalePrice ? _self.wholesalePrice : wholesalePrice // ignore: cast_nullable_to_non_nullable
as double,qtyIssued: null == qtyIssued ? _self.qtyIssued : qtyIssued // ignore: cast_nullable_to_non_nullable
as int,cogsCalculated: null == cogsCalculated ? _self.cogsCalculated : cogsCalculated // ignore: cast_nullable_to_non_nullable
as double,
  ));
}

}


/// Adds pattern-matching-related methods to [IssuanceItemModel].
extension IssuanceItemModelPatterns on IssuanceItemModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _IssuanceItemModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _IssuanceItemModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _IssuanceItemModel value)  $default,){
final _that = this;
switch (_that) {
case _IssuanceItemModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _IssuanceItemModel value)?  $default,){
final _that = this;
switch (_that) {
case _IssuanceItemModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String issuanceId,  String productId, @JsonKey(name: 'wholesalePrice', defaultValue: 0.0)  double wholesalePrice,  int qtyIssued, @JsonKey(name: 'cogsCalculated', defaultValue: 0.0)  double cogsCalculated)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _IssuanceItemModel() when $default != null:
return $default(_that.id,_that.issuanceId,_that.productId,_that.wholesalePrice,_that.qtyIssued,_that.cogsCalculated);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String issuanceId,  String productId, @JsonKey(name: 'wholesalePrice', defaultValue: 0.0)  double wholesalePrice,  int qtyIssued, @JsonKey(name: 'cogsCalculated', defaultValue: 0.0)  double cogsCalculated)  $default,) {final _that = this;
switch (_that) {
case _IssuanceItemModel():
return $default(_that.id,_that.issuanceId,_that.productId,_that.wholesalePrice,_that.qtyIssued,_that.cogsCalculated);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String issuanceId,  String productId, @JsonKey(name: 'wholesalePrice', defaultValue: 0.0)  double wholesalePrice,  int qtyIssued, @JsonKey(name: 'cogsCalculated', defaultValue: 0.0)  double cogsCalculated)?  $default,) {final _that = this;
switch (_that) {
case _IssuanceItemModel() when $default != null:
return $default(_that.id,_that.issuanceId,_that.productId,_that.wholesalePrice,_that.qtyIssued,_that.cogsCalculated);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _IssuanceItemModel implements IssuanceItemModel {
  const _IssuanceItemModel({required this.id, required this.issuanceId, required this.productId, @JsonKey(name: 'wholesalePrice', defaultValue: 0.0) required this.wholesalePrice, required this.qtyIssued, @JsonKey(name: 'cogsCalculated', defaultValue: 0.0) required this.cogsCalculated});
  factory _IssuanceItemModel.fromJson(Map<String, dynamic> json) => _$IssuanceItemModelFromJson(json);

@override final  String id;
@override final  String issuanceId;
@override final  String productId;
@override@JsonKey(name: 'wholesalePrice', defaultValue: 0.0) final  double wholesalePrice;
@override final  int qtyIssued;
@override@JsonKey(name: 'cogsCalculated', defaultValue: 0.0) final  double cogsCalculated;

/// Create a copy of IssuanceItemModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$IssuanceItemModelCopyWith<_IssuanceItemModel> get copyWith => __$IssuanceItemModelCopyWithImpl<_IssuanceItemModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$IssuanceItemModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _IssuanceItemModel&&(identical(other.id, id) || other.id == id)&&(identical(other.issuanceId, issuanceId) || other.issuanceId == issuanceId)&&(identical(other.productId, productId) || other.productId == productId)&&(identical(other.wholesalePrice, wholesalePrice) || other.wholesalePrice == wholesalePrice)&&(identical(other.qtyIssued, qtyIssued) || other.qtyIssued == qtyIssued)&&(identical(other.cogsCalculated, cogsCalculated) || other.cogsCalculated == cogsCalculated));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,issuanceId,productId,wholesalePrice,qtyIssued,cogsCalculated);

@override
String toString() {
  return 'IssuanceItemModel(id: $id, issuanceId: $issuanceId, productId: $productId, wholesalePrice: $wholesalePrice, qtyIssued: $qtyIssued, cogsCalculated: $cogsCalculated)';
}


}

/// @nodoc
abstract mixin class _$IssuanceItemModelCopyWith<$Res> implements $IssuanceItemModelCopyWith<$Res> {
  factory _$IssuanceItemModelCopyWith(_IssuanceItemModel value, $Res Function(_IssuanceItemModel) _then) = __$IssuanceItemModelCopyWithImpl;
@override @useResult
$Res call({
 String id, String issuanceId, String productId,@JsonKey(name: 'wholesalePrice', defaultValue: 0.0) double wholesalePrice, int qtyIssued,@JsonKey(name: 'cogsCalculated', defaultValue: 0.0) double cogsCalculated
});




}
/// @nodoc
class __$IssuanceItemModelCopyWithImpl<$Res>
    implements _$IssuanceItemModelCopyWith<$Res> {
  __$IssuanceItemModelCopyWithImpl(this._self, this._then);

  final _IssuanceItemModel _self;
  final $Res Function(_IssuanceItemModel) _then;

/// Create a copy of IssuanceItemModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? issuanceId = null,Object? productId = null,Object? wholesalePrice = null,Object? qtyIssued = null,Object? cogsCalculated = null,}) {
  return _then(_IssuanceItemModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,issuanceId: null == issuanceId ? _self.issuanceId : issuanceId // ignore: cast_nullable_to_non_nullable
as String,productId: null == productId ? _self.productId : productId // ignore: cast_nullable_to_non_nullable
as String,wholesalePrice: null == wholesalePrice ? _self.wholesalePrice : wholesalePrice // ignore: cast_nullable_to_non_nullable
as double,qtyIssued: null == qtyIssued ? _self.qtyIssued : qtyIssued // ignore: cast_nullable_to_non_nullable
as int,cogsCalculated: null == cogsCalculated ? _self.cogsCalculated : cogsCalculated // ignore: cast_nullable_to_non_nullable
as double,
  ));
}


}


/// @nodoc
mixin _$StockIssuanceModel {

 String get id; String get userId; IssuanceStatus get status;@JsonKey(name: 'totalWholesaleValue', defaultValue: 0.0) double get totalWholesaleValue; DateTime? get createdAt; DateTime? get updatedAt; List<IssuanceItemModel> get items; UserModel? get user;
/// Create a copy of StockIssuanceModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$StockIssuanceModelCopyWith<StockIssuanceModel> get copyWith => _$StockIssuanceModelCopyWithImpl<StockIssuanceModel>(this as StockIssuanceModel, _$identity);

  /// Serializes this StockIssuanceModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is StockIssuanceModel&&(identical(other.id, id) || other.id == id)&&(identical(other.userId, userId) || other.userId == userId)&&(identical(other.status, status) || other.status == status)&&(identical(other.totalWholesaleValue, totalWholesaleValue) || other.totalWholesaleValue == totalWholesaleValue)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.updatedAt, updatedAt) || other.updatedAt == updatedAt)&&const DeepCollectionEquality().equals(other.items, items)&&(identical(other.user, user) || other.user == user));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,userId,status,totalWholesaleValue,createdAt,updatedAt,const DeepCollectionEquality().hash(items),user);

@override
String toString() {
  return 'StockIssuanceModel(id: $id, userId: $userId, status: $status, totalWholesaleValue: $totalWholesaleValue, createdAt: $createdAt, updatedAt: $updatedAt, items: $items, user: $user)';
}


}

/// @nodoc
abstract mixin class $StockIssuanceModelCopyWith<$Res>  {
  factory $StockIssuanceModelCopyWith(StockIssuanceModel value, $Res Function(StockIssuanceModel) _then) = _$StockIssuanceModelCopyWithImpl;
@useResult
$Res call({
 String id, String userId, IssuanceStatus status,@JsonKey(name: 'totalWholesaleValue', defaultValue: 0.0) double totalWholesaleValue, DateTime? createdAt, DateTime? updatedAt, List<IssuanceItemModel> items, UserModel? user
});


$UserModelCopyWith<$Res>? get user;

}
/// @nodoc
class _$StockIssuanceModelCopyWithImpl<$Res>
    implements $StockIssuanceModelCopyWith<$Res> {
  _$StockIssuanceModelCopyWithImpl(this._self, this._then);

  final StockIssuanceModel _self;
  final $Res Function(StockIssuanceModel) _then;

/// Create a copy of StockIssuanceModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? userId = null,Object? status = null,Object? totalWholesaleValue = null,Object? createdAt = freezed,Object? updatedAt = freezed,Object? items = null,Object? user = freezed,}) {
  return _then(StockIssuanceModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,userId: null == userId ? _self.userId : userId // ignore: cast_nullable_to_non_nullable
as String,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as IssuanceStatus,totalWholesaleValue: null == totalWholesaleValue ? _self.totalWholesaleValue : totalWholesaleValue // ignore: cast_nullable_to_non_nullable
as double,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,updatedAt: freezed == updatedAt ? _self.updatedAt : updatedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,items: null == items ? _self.items : items // ignore: cast_nullable_to_non_nullable
as List<IssuanceItemModel>,user: freezed == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as UserModel?,
  ));
}
/// Create a copy of StockIssuanceModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$UserModelCopyWith<$Res>? get user {
    if (_self.user == null) {
    return null;
  }

  return $UserModelCopyWith<$Res>(_self.user!, (value) {
    return _then(_self.copyWith(user: value));
  });
}
}


/// Adds pattern-matching-related methods to [StockIssuanceModel].
extension StockIssuanceModelPatterns on StockIssuanceModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _StockIssuanceModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _StockIssuanceModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _StockIssuanceModel value)  $default,){
final _that = this;
switch (_that) {
case _StockIssuanceModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _StockIssuanceModel value)?  $default,){
final _that = this;
switch (_that) {
case _StockIssuanceModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String userId,  IssuanceStatus status, @JsonKey(name: 'totalWholesaleValue', defaultValue: 0.0)  double totalWholesaleValue,  DateTime? createdAt,  DateTime? updatedAt,  List<IssuanceItemModel> items,  UserModel? user)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _StockIssuanceModel() when $default != null:
return $default(_that.id,_that.userId,_that.status,_that.totalWholesaleValue,_that.createdAt,_that.updatedAt,_that.items,_that.user);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String userId,  IssuanceStatus status, @JsonKey(name: 'totalWholesaleValue', defaultValue: 0.0)  double totalWholesaleValue,  DateTime? createdAt,  DateTime? updatedAt,  List<IssuanceItemModel> items,  UserModel? user)  $default,) {final _that = this;
switch (_that) {
case _StockIssuanceModel():
return $default(_that.id,_that.userId,_that.status,_that.totalWholesaleValue,_that.createdAt,_that.updatedAt,_that.items,_that.user);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String userId,  IssuanceStatus status, @JsonKey(name: 'totalWholesaleValue', defaultValue: 0.0)  double totalWholesaleValue,  DateTime? createdAt,  DateTime? updatedAt,  List<IssuanceItemModel> items,  UserModel? user)?  $default,) {final _that = this;
switch (_that) {
case _StockIssuanceModel() when $default != null:
return $default(_that.id,_that.userId,_that.status,_that.totalWholesaleValue,_that.createdAt,_that.updatedAt,_that.items,_that.user);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _StockIssuanceModel implements StockIssuanceModel {
  const _StockIssuanceModel({required this.id, required this.userId, this.status = IssuanceStatus.issued, @JsonKey(name: 'totalWholesaleValue', defaultValue: 0.0) required this.totalWholesaleValue, this.createdAt, this.updatedAt,  List<IssuanceItemModel> items = const [], this.user}): _items = items;
  factory _StockIssuanceModel.fromJson(Map<String, dynamic> json) => _$StockIssuanceModelFromJson(json);

@override final  String id;
@override final  String userId;
@override@JsonKey() final  IssuanceStatus status;
@override@JsonKey(name: 'totalWholesaleValue', defaultValue: 0.0) final  double totalWholesaleValue;
@override final  DateTime? createdAt;
@override final  DateTime? updatedAt;
 final  List<IssuanceItemModel> _items;
@override@JsonKey() List<IssuanceItemModel> get items {
  if (_items is EqualUnmodifiableListView) return _items;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_items);
}

@override final  UserModel? user;

/// Create a copy of StockIssuanceModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$StockIssuanceModelCopyWith<_StockIssuanceModel> get copyWith => __$StockIssuanceModelCopyWithImpl<_StockIssuanceModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$StockIssuanceModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _StockIssuanceModel&&(identical(other.id, id) || other.id == id)&&(identical(other.userId, userId) || other.userId == userId)&&(identical(other.status, status) || other.status == status)&&(identical(other.totalWholesaleValue, totalWholesaleValue) || other.totalWholesaleValue == totalWholesaleValue)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.updatedAt, updatedAt) || other.updatedAt == updatedAt)&&const DeepCollectionEquality().equals(other._items, _items)&&(identical(other.user, user) || other.user == user));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,userId,status,totalWholesaleValue,createdAt,updatedAt,const DeepCollectionEquality().hash(_items),user);

@override
String toString() {
  return 'StockIssuanceModel(id: $id, userId: $userId, status: $status, totalWholesaleValue: $totalWholesaleValue, createdAt: $createdAt, updatedAt: $updatedAt, items: $items, user: $user)';
}


}

/// @nodoc
abstract mixin class _$StockIssuanceModelCopyWith<$Res> implements $StockIssuanceModelCopyWith<$Res> {
  factory _$StockIssuanceModelCopyWith(_StockIssuanceModel value, $Res Function(_StockIssuanceModel) _then) = __$StockIssuanceModelCopyWithImpl;
@override @useResult
$Res call({
 String id, String userId, IssuanceStatus status,@JsonKey(name: 'totalWholesaleValue', defaultValue: 0.0) double totalWholesaleValue, DateTime? createdAt, DateTime? updatedAt, List<IssuanceItemModel> items, UserModel? user
});


@override $UserModelCopyWith<$Res>? get user;

}
/// @nodoc
class __$StockIssuanceModelCopyWithImpl<$Res>
    implements _$StockIssuanceModelCopyWith<$Res> {
  __$StockIssuanceModelCopyWithImpl(this._self, this._then);

  final _StockIssuanceModel _self;
  final $Res Function(_StockIssuanceModel) _then;

/// Create a copy of StockIssuanceModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? userId = null,Object? status = null,Object? totalWholesaleValue = null,Object? createdAt = freezed,Object? updatedAt = freezed,Object? items = null,Object? user = freezed,}) {
  return _then(_StockIssuanceModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,userId: null == userId ? _self.userId : userId // ignore: cast_nullable_to_non_nullable
as String,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as IssuanceStatus,totalWholesaleValue: null == totalWholesaleValue ? _self.totalWholesaleValue : totalWholesaleValue // ignore: cast_nullable_to_non_nullable
as double,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,updatedAt: freezed == updatedAt ? _self.updatedAt : updatedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,items: null == items ? _self._items : items // ignore: cast_nullable_to_non_nullable
as List<IssuanceItemModel>,user: freezed == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as UserModel?,
  ));
}

/// Create a copy of StockIssuanceModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$UserModelCopyWith<$Res>? get user {
    if (_self.user == null) {
    return null;
  }

  return $UserModelCopyWith<$Res>(_self.user!, (value) {
    return _then(_self.copyWith(user: value));
  });
}
}

// dart format on
