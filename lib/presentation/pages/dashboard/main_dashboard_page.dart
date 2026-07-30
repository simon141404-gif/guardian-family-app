import "package:flutter/material.dart";
import "package:go_router/go_router.dart";

class MainDashboardPage extends StatefulWidget {
  const MainDashboardPage({super.key});
  @override
  State<MainDashboardPage> createState() => _MainDashboardPageState();
}

class _MainDashboardPageState extends State<MainDashboardPage> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Guardian Family"),
        actions: [
          IconButton(icon: const Icon(Icons.notifications), onPressed: () {}),
          IconButton(icon: const Icon(Icons.sos), onPressed: () => context.push("/sos")),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Icon(Icons.family_restroom, size: 100, color: Theme.of(context).colorScheme.primary),
            const SizedBox(height: 20),
            const Text("Welcome to Guardian Family", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 40),
            _buildMenuCard(context, Icons.family_restroom, "Family", "/family"),
            _buildMenuCard(context, Icons.child_care, "Children", "/children"),
            _buildMenuCard(context, Icons.location_on, "Location", "/location"),
            _buildMenuCard(context, Icons.timer, "Screen Time", "/screen-time"),
            _buildMenuCard(context, Icons.apps, "App Management", "/app-management"),
            _buildMenuCard(context, Icons.phone_android, "Device Info", "/device-info"),
            _buildMenuCard(context, Icons.chat, "Chat", "/chat"),
            _buildMenuCard(context, Icons.phone, "Calls", "/calls"),
            _buildMenuCard(context, Icons.sos, "SOS", "/sos"),
            _buildMenuCard(context, Icons.settings, "Settings", "/settings"),
          ],
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (i) => setState(() => _currentIndex = i),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: "Home"),
          NavigationDestination(icon: Icon(Icons.family_restroom_outlined), selectedIcon: Icon(Icons.family_restroom), label: "Family"),
          NavigationDestination(icon: Icon(Icons.child_care_outlined), selectedIcon: Icon(Icons.child_care), label: "Children"),
          NavigationDestination(icon: Icon(Icons.analytics_outlined), selectedIcon: Icon(Icons.analytics), label: "Reports"),
          NavigationDestination(icon: Icon(Icons.settings_outlined), selectedIcon: Icon(Icons.settings), label: "Settings"),
        ],
      ),
    );
  }

  Widget _buildMenuCard(BuildContext context, IconData icon, String title, String route) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: Icon(icon, color: Theme.of(context).colorScheme.primary),
        title: Text(title),
        trailing: const Icon(Icons.arrow_forward_ios, size: 16),
        onTap: () => context.push(route),
      ),
    );
  }
}
