import 'package:flutter/material.dart';

class AppColors {
  AppColors._();

  static const Color primaryBlue = Color(0xFF1D63ED);
  static const Color oceanTeal = Color(0xFF0D9E8F);
  static const Color warmTerracotta = Color(0xFFE05D3A);

  static const Color canvasLight = Color(0xFFF3F4F6);
  static const Color surfaceWhite = Color(0xFFFFFFFF);
  static const Color borderLight = Color(0xFFE2E8F0);

  static const Color textCharcoal = Color(0xFF151413);
  static const Color textSlate = Color(0xFF64748B);

  static const Color emeraldGreen = Color(0xFF10B981);
  static const Color emeraldBg = Color(0xFFE8F8F5);
  static const Color warningRed = Color(0xFFEF4444);
  static const Color warningBg = Color(0xFFFDE8E8);

  static const LinearGradient heroCardGradient = LinearGradient(
    colors: [primaryBlue, oceanTeal],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}