# Turning OPNsense into a Basic Network Switch for My Home Lab

In my ongoing effort to streamline and expand my home lab network, I recently needed to **add more LAN ports** without investing in a separate switch. I was already using OPNsense as my primary router/firewall, and I had a few unused NICs on the same box — so I asked myself:

**Can I use OPNsense as a basic Layer 2 switch?**

The answer turned out to be *yes*, with a few trade-offs. Here's how and why I did it.

## 💡 Why I Did This Project

I’m working toward a more modular and flexible home lab setup, and I prefer to **repurpose existing hardware** where possible. Instead of buying a managed switch just to get a few extra ports on my LAN, I decided to **bridge multiple interfaces on OPNsense** to simulate a switch-like environment.

It’s not a perfect replacement for a real switch, but for my current needs — mostly low-to-moderate traffic between test devices — it's a practical and cost-effective solution.

## 🧠 Why OPNsense?

I chose OPNsense because it strikes a great balance between **power, flexibility, and transparency**.

- **Open Source & Actively Maintained**: OPNsense is community-driven, stable, and regularly updated.
- **Feature-Rich**: It offers a full suite of advanced firewall, routing, VPN, and monitoring tools.
- **Clean UI**: Compared to alternatives, I find OPNsense's interface more intuitive and less cluttered.
- **Bridging Support**: It allows software-based bridging of interfaces — perfect for this kind of repurposing.
- **Extendable**: With plugins and shell access, it gives me the freedom to experiment and automate.

I’ve used other solutions like pfSense in the past, but I personally find OPNsense to be more modern and community-focused. Since I already rely on it for routing and firewalling, it made sense to extend its role rather than add another device to the stack.

## 🛠️ Setup: Bridging Interfaces on OPNsense

The idea is to make multiple physical ports on my OPNsense box act like they’re on the same switch. This is done by **creating a bridge interface** that links them all together at Layer 2.

### Step-by-Step Process

1. **Assign Unused Interfaces**  
   Go to `Interfaces > Assignments` and add your spare NICs (e.g., `OPT1`, `OPT2`, etc.).

2. **Create a Bridge Interface**  
   Navigate to `Interfaces > Other Types > Bridge`  
   - Create a new bridge  
   - Add the existing LAN and any OPT interfaces you want to behave like switch ports

3. **Assign and Configure the Bridge**  
   - Assign the new bridge as an interface (e.g., `BRIDGE0`)
   - Configure it with an IP address and optional DHCP server
   - Disable the IP configuration on the individual member interfaces

4. **Firewall Rules**  
   - Set your firewall rules on the bridge interface to allow traffic as needed  
   - You can disable rules on the individual OPT interfaces to simplify things

## ⚠️ Things to Keep in Mind

While this works well for my use case, there are limitations:

- **Performance**: Bridging is done in software, so high-throughput setups will stress the CPU.
- **Not a Managed Switch**: You don’t get VLAN tagging, link aggregation, or STP out of the box.
- **Manual Setup**: It takes a bit more effort to configure compared to plug-and-play switches.

## ✅ Why This Works for Me

- My traffic load is modest — mostly smart home devices, test VMs, and the occasional file transfer.
- I value **flexibility over peak performance**.
- I’m comfortable with the OPNsense interface and firewall model.
- It lets me grow my network without buying another box or device.

---

**TL;DR**: I used OPNsense to create a simple software-based switch by bridging interfaces together. It’s not a hardware switch replacement, but for a home lab where you want to repurpose existing hardware, it’s a clever and functional workaround.

