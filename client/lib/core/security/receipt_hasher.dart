import 'dart:io';
import 'package:crypto/crypto.dart';

class ReceiptHasher {
  ReceiptHasher._();

  static Future<String> hashImageFile(File imageFile) async {
    final bytes = await imageFile.readAsBytes();
    final digest = sha256.convert(bytes);
    return digest.toString();
  }
}