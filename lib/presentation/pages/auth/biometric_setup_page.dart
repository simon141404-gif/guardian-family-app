import 'package:flutter/material.dart';

class BiometricSetupPage extends StatelessWidget {
  const BiometricSetupPage({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Biometric Setup')),
      body: const Center(child: Text('Biometric Setup Page')),
    );
  }
}
