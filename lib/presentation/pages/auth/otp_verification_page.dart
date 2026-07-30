import 'package:flutter/material.dart';

class OtpVerificationPage extends StatelessWidget {
  final String verificationId;
  final bool isPasswordReset;
  const OtpVerificationPage({super.key, required this.verificationId, required this.isPasswordReset});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Verify OTP')),
      body: const Center(child: Text('OTP Verification Page')),
    );
  }
}
