import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class OnboardingPage extends StatefulWidget {
  const OnboardingPage({super.key});
  @override
  State<OnboardingPage> createState() => _OnboardingPageState();
}

class _OnboardingPageState extends State<OnboardingPage> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<Map<String, dynamic>> _items = [
    {'icon': Icons.shield, 'title': 'Protect Your Family', 'desc': 'Keep your children safe with real-time monitoring and location tracking.'},
    {'icon': Icons.connect_without_contact, 'title': 'Stay Connected', 'desc': 'Video calls, voice calls, and instant messaging with your family.'},
    {'icon': Icons.timeline, 'title': 'Manage Screen Time', 'desc': 'Set limits, block apps, and monitor usage across all devices.'},
    {'icon': Icons.emergency, 'title': 'Emergency Response', 'desc': 'One-tap SOS alerts with live location to keep your family safe.'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                itemCount: _items.length,
                onPageChanged: (index) => setState(() => _currentPage = index),
                itemBuilder: (context, index) {
                  return Padding(
                    padding: const EdgeInsets.all(32),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(_items[index]['icon'], size: 120, color: Theme.of(context).colorScheme.primary),
                        const SizedBox(height: 48),
                        Text(_items[index]['title'], style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.bold), textAlign: TextAlign.center),
                        const SizedBox(height: 16),
                        Text(_items[index]['desc'], style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: Colors.grey), textAlign: TextAlign.center),
                      ],
                    ),
                  );
                },
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(_items.length, (index) {
                return AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  width: _currentPage == index ? 24 : 8,
                  height: 8,
                  decoration: BoxDecoration(color: _currentPage == index ? Theme.of(context).colorScheme.primary : Colors.grey, borderRadius: BorderRadius.circular(4)),
                );
              }),
            ),
            const SizedBox(height: 32),
            Padding(
              padding: const EdgeInsets.all(24),
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => context.go('/login'),
                  child: Text(_currentPage == _items.length - 1 ? 'Get Started' : 'Next'),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
