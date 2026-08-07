import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app/router/app_router.dart';
import 'app/theme/app_theme.dart';

void main() {
  // Ensure native bindings (like local_auth biometrics and secure storage) are ready
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    // ProviderScope is mandatory for Riverpod to work across the app
    const ProviderScope(
      child: IbnTajuDmsApp(),
    ),
  );
}

class IbnTajuDmsApp extends ConsumerWidget {
  const IbnTajuDmsApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Watch our GoRouter provider from Stage 4
    final goRouter = ref.watch(appRouterProvider);

    return MaterialApp.router(
      title: 'ibnTaju DMS',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.light,
      routerConfig: goRouter,
    );
  }
}