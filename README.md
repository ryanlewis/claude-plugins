# Ryan's Claude Code Plugins

A personal marketplace of Claude Code plugins.

## Plugins

| Plugin | Description |
|--------|-------------|
| [youtube-tools](https://github.com/ryanlewis/claude-youtube-tools) | YouTube toolkit: summarize, comments, download audio/video |
| [isthereanydeal](https://github.com/ryanlewis/claude-isthereanydeal) | Find game deals and price history using the IsThereAnyDeal API |
| [checkpoint](plugins/checkpoint/) | Lets a session compact its own context at a checkpoint, with its own instructions, then carry on |

## Adding This Marketplace

You can add this marketplace to your Claude Code installation to browse and install plugins:

```
/plugin marketplace add ryanlewis/claude-plugins
```

Or from the command line:

```bash
claude plugin marketplace add ryanlewis/claude-plugins
```

## Installation

Then install any plugin from it:

```
/plugin install <plugin-name>@ryanlewis-plugins
```

Or from the command line:

```bash
claude plugin install <plugin-name>@ryanlewis-plugins
```

For example:
```
/plugin install youtube-tools@ryanlewis-plugins
```

## Validation

Validate a plugin or marketplace manifest:

```bash
claude plugin validate .
```
