# Ryan's Claude Code Plugins

A personal marketplace of Claude Code plugins.

## Plugins

| Plugin | Description |
|--------|-------------|
| [youtube-tools](https://github.com/ryanlewis/claude-youtube-tools) | YouTube toolkit: summarize, comments, download audio/video |
| [isthereanydeal](https://github.com/ryanlewis/claude-isthereanydeal) | Find game deals and price history using the IsThereAnyDeal API |
| [spec-dev](spec-dev/) | Spec-driven development: structured specifications with traceable requirements and stories |

## Installation

Install any plugin from this marketplace:

```
/plugin install <plugin-name>@https://github.com/ryanlewis/claude-plugins
```

Or from the command line:

```bash
claude plugin install <plugin-name>@https://github.com/ryanlewis/claude-plugins
```

For example:
```
/plugin install youtube-tools@https://github.com/ryanlewis/claude-plugins
```

## Adding This Marketplace

You can add this marketplace to your Claude Code installation to browse and install plugins:

```
/plugin marketplace add https://github.com/ryanlewis/claude-plugins
```

Or from the command line:

```bash
claude plugin marketplace add https://github.com/ryanlewis/claude-plugins
```

## Validation

Validate a plugin or marketplace manifest:

```bash
claude plugin validate .
```
