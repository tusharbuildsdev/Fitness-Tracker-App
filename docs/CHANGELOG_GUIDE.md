# Changelog guide

Return to the [README](../README.md).

The changelog records meaningful user-facing, contributor-facing, and operational changes. It uses the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) categories and aims for [Semantic Versioning](https://semver.org/).

## Categories

| Category | Use for |
| --- | --- |
| Added | New capabilities. |
| Changed | Behavior changes to existing capabilities. |
| Deprecated | Still-supported behavior scheduled for removal. |
| Removed | Deleted capabilities. |
| Fixed | Corrected defects. |
| Security | Vulnerability fixes or hardening. |

## Workflow

1. Add a concise entry under `[Unreleased]` in `CHANGELOG.md` as part of the pull request.
2. Link relevant issue or pull request numbers when public and helpful.
3. At release, move entries into a dated, versioned heading and create the matching tag/release.
4. Keep entries user-focused: state the outcome, not an internal refactor unless it changes contributor behavior.

Example: `- Fixed hydration entries being counted twice after a retry.`
