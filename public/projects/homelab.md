# My Homelab Setup: Arch Linux, Containers, and Self-Hosting

Over the past few months, I’ve been building a personal homelab — a self-hosted environment that runs on modest hardware but offers flexibility, control, and room to experiment. This post is a breakdown of my current setup, what it's running, and why I chose each component and architecture.

<div align="center">
  <img src="/Homelab%20Network%20and%20Storage%20Diagram.png" alt="Homelab Network and Storage Diagram" width="450" style="margin-top: 2.5em;" />
</div>


## Hardware Specs

I'm using consumer-grade hardware that balances performance with power efficiency. It handles containers, VMs, and network services with headroom to spare.

- **CPU:** Intel i7-8700
- **GPU:** NVIDIA Quadro M2000
- **Memory:** 56 GB DDR4
- **Storage:**
  - 12TB HDD (partitioned into 9TB + 1TB)
  - 1TB HDD
  - 256GB M.2 SSD (OS drive)
- **Power Supply:** 500W

The storage setup is split for different purposes — general files, RAID array for NAS, and dedicated VM storage.



## Operating System

The server runs **Arch Linux LTS**, which gives me a lean, customizable environment with long-term stability. 

When I got started with linux, I tried ubuntu like everyone else, thinking it is going to be a easy transition. At firt it really was, everything worked like a charm without any additional settings to be worried about, all I have to do is run `sudo apt update && sudo apt upgrade -y` occationally to feel like a hacker. 

As I dive deeper into the linux world, I realize I haven't really learned much from using ubuntu everything is within a google search away, all I have to do is copy and paste, and I still lack the ability to debug or troubleshoot if any issue arises. 

I ended up choosing Arch because it’s simple, transparent, and gives full control over package management and service configuration, but more importantly I can tell people "I use arch btw". People often say Arch linux is not for the beginner, but I think it's quite the contrary. The arch community has, in my opinion, one of the best documentation on every single aspect of administering a linux system, from installation to how everything works. It encourages you to The LTS kernel provides a good balance between upstream updates and long-term support so that I don't accidentally break one of my services if the new update breaks it.



## Services and Applications

### Docker: Media Server

I'm using Docker to deploy my **YAMS (Yet Another Media Server)** stack. Docker allows for fast, reproducible deployments and makes updates easy. The containers run in bridge networking mode, which keeps things isolated while still offering flexibility in routing and access.

### Virtual Machines: Home Assistant

Home Assistant runs in its own VM. This gives it a clean boundary from the host system and allows for snapshot management, resource tuning, and easier debugging if something goes wrong. Like the Docker containers, the VM uses bridged networking so it gets its own IP address on the LAN.



## NAS Setup

For file storage and backups, I’ve set up a NAS directly on the host (bare metal). The storage configuration looks like this:

- **Btrfs RAID 1** using:
  - 1TB partition from the 12TB HDD
  - A separate 1TB HDD

This provides redundancy and copy-on-write protection, plus access to features like snapshots and checksumming. The remaining 9TB partition on the 12TB drive is used for general-purpose file storage. Another 1TB volume is reserved for mounting inside VMs as block storage.



## Networking

### Tailscale

Right now, I use Tailscale for remote access to the homelab. It’s lightweight and secure, letting me access services from anywhere without opening ports or configuring dynamic DNS.

### Bridged Networking

Both Docker and VMs run in bridge mode. This gives each service a real IP address on the LAN, simplifying integration with other systems and avoiding NAT headaches.




## What’s Next

This setup is stable, but I’m planning a few upgrades:

- Replace Tailscale with a self-hosted VPN (possibly WireGuard)
- Set up a personal website hosted from the homelab
- Publicly expose select services and APIs, like language models or automation endpoints
- Add VLAN segmentation to isolate IoT, infrastructure, and admin networks



## Closing Thoughts

This homelab is a constantly evolving project. It started as a way to learn more about Linux and self-hosting, but it’s grown into a critical part of my workflow. From running smart home automation to hosting custom services, it gives me control and reliability without depending on the cloud.

If you're planning a similar setup, or just starting out, feel free to borrow ideas or ask questions. I’ve learned a lot from the homelab community — and I’m still learning every day.
