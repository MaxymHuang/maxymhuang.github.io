# Git CLI Is Powerful — But It Isn't Friendly (And What I Did About It)

When you live in Git every day, the CLI feels like home. For many non-technical teammates though, Git is a wall of cryptic commands, abstract concepts, and failure messages that feel catastrophic. I built a small WPF app — a Git GUI for Windows — to make common version control tasks safer and more understandable without replacing Git’s power.

## Why Git CLI Can Feel Hostile

- Cognitive load: Staging vs. committing vs. pushing vs. rebasing — these are layered ideas with minimal affordances in the terminal.
- Cryptic errors: “detached HEAD”, “non-fast-forward”, “merge conflict” rarely comes with guidance.
- Destructive commands: `reset --hard`, `clean -fd`, or a mistaken `checkout` can nuke work instantly.
- Low observability: You can’t “see” where you are. The mental model is in your head, not the interface.

The result? Non-technical collaborators feel anxious touching repos. Even technical users make avoidable mistakes under time pressure.

## A Friendlier Path: Visual Git for Everyday Tasks

I built a Windows WPF (.NET 9) desktop app using LibGit2Sharp to visualize the repo and make common operations explicit.

What it emphasizes:

- Visual commit history with clear author/time/messages
- Click a commit to see full details (ID, author, email, message)
- File selection and staging as a simple checklist
- Repository explorer (tree) to improve context
- Hard reset with an explicit confirmation dialog that explains the impact

This is not meant to replace advanced Git workflows — it’s designed to reduce fear and prevent footguns.

## Design Principles

- Make state visible: Always show current branch, status, and what’s staged.
- Make destructive actions deliberate: confirmations with plain-language summaries.
- Progressive disclosure: Start with basics; advanced operations can come later.

## Tech Stack

- .NET 9 WPF UI
- LibGit2Sharp (C# wrapper for libgit2)
- Windows Desktop

## Repo

- GitHub: https://github.com/MaxymHuang/version-control

## A Simple Flow

1. Open or initialize a repository
2. Review commit history and details
3. Stage selected files and commit with author info
4. If needed, hard reset to a prior commit (with confirmation)

This is an MVP. If it helps even one teammate contribute with confidence, it’s a win. Future ideas: branches, remotes, diffs, and conflict helpers.
