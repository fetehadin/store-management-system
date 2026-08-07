import 'package:json_annotation/json_annotation.dart';

// --- prisma: enum Role ---
enum Role {
  @JsonValue('ADMIN')
  admin,
  @JsonValue('SALES_REP')
  salesRep;

  bool get isAdmin => this == Role.admin;
  bool get isSalesRep => this == Role.salesRep;
}

// --- prisma: enum ProofStatus ---
enum ProofStatus {
  @JsonValue('PENDING')
  pending,
  @JsonValue('APPROVED')
  approved,
  @JsonValue('REJECTED')
  rejected;
}

// --- prisma: enum AuditEntity ---
enum AuditEntity {
  @JsonValue('ADMIN_STORE')
  adminStore,
  @JsonValue('SALES_REP')
  salesRep,
  @JsonValue('SUPPLIER')
  supplier,
  @JsonValue('DIRECT_BUYER')
  directBuyer;
}

// --- prisma: enum IssuanceStatus ---
enum IssuanceStatus {
  @JsonValue('ISSUED')
  issued,
  @JsonValue('RETURNED')
  returned,
  @JsonValue('PARTIAL_RETURNED')
  partialReturned;
}