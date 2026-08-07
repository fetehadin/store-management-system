import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/domain/enums.dart';
import '../../features/auth/presentation/providers/auth_provider.dart';

// --- Temporary Placeholder Screens (We replace these in Stage 5) ---
class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});
  @override
  Widget build(BuildContext context) => const Scaffold(
        body: Center(child: Text('Page 1: PIN & Biometric Login')),
      );
}

class AdminHomeScreen extends StatelessWidget {
  const AdminHomeScreen({super.key});
  @override
  Widget build(BuildContext context) => const Scaffold(
        body: Center(child: Text('Page 2: Admin Command Center')),
      );
}

class SalesRepPortalScreen extends StatelessWidget {
  const SalesRepPortalScreen({super.key});
  @override
  Widget build(BuildContext context) => const Scaffold(
        body: Center(child: Text('Page 8: Sales Rep Wholesale Portal')),
      );
}

// --- Riverpod GoRouter Provider ---
final appRouterProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authStateProvider);

  return GoRouter(
    initialLocation: '/login',
    debugLogDiagnostics: true,
    redirect: (context, state) {
      final isLoggingIn = state.matchedLocation == '/login';
      final user = authState.value;

      // 1. If still loading session on startup, don't redirect yet
      if (authState.isLoading) return null;

      // 2. If unauthenticated and NOT on login screen -> kick to /login
      if (user == null) {
        return isLoggingIn ? null : '/login';
      }

      // 3. If authenticated and currently on /login -> route by role
      if (isLoggingIn) {
        return user.role == Role.admin ? '/admin' : '/sales-rep';
      }

      // 4. Role Guardrail: Prevent Sales Reps from accessing /admin routes
      if (user.role == Role.salesRep &&
          state.matchedLocation.startsWith('/admin')) {
        return '/sales-rep';
      }

      return null;
    },
    routes: [
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/admin',
        builder: (context, state) => const AdminHomeScreen(),
      ),
      GoRoute(
        path: '/sales-rep',
        builder: (context, state) => const SalesRepPortalScreen(),
      ),
    ],
  );
});