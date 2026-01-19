# Claude Code Configuration

This directory contains Claude Code skills, agents, and configuration for AI-assisted development.

## Directory Structure

```
.claude/
├── README.md                    # This file
├── agent-progress.md            # Shared checkpoint for multi-agent orchestration
├── skills/
│   └── brownfield-modernize/    # Brownfield modernization skill
│       ├── SKILL.md             # Main skill definition
│       └── scripts/
│           └── update-progress.sh  # Checkpoint update utility
└── agents/
    ├── codebase-analyzer.md     # Phase 1: Repository analysis
    ├── validation-setup.md      # Phase 2: Validation harness setup
    ├── architecture-documenter.md # Phase 3: Architecture documentation
    ├── modernization-planner.md # Phase 4: Modernization planning
    ├── cicd-developer.md        # Phase 5: CI/CD pipeline development
    ├── review-validator.md      # Phase 6: Review & hallucination detection
    └── documentation-generator.md # Phase 7: Documentation generation
```

## Usage

### Start Brownfield Modernization

```
/brownfield-modernize

Start fresh brownfield modernization for this repository.
```

### Resume Interrupted Work

```
/brownfield-modernize

Resume from checkpoint at .claude/agent-progress.md
```

### Check Progress

```
/brownfield-modernize

Show current modernization status only.
```

## How It Works

1. **Skill Invocation**: `/brownfield-modernize` activates the orchestrator
2. **Agent Spawning**: Orchestrator spawns specialized subagents concurrently
3. **Progress Tracking**: Agents update `agent-progress.md` as they work
4. **Resumption**: If interrupted, new sessions can resume from checkpoint

## Agents Overview

| Agent | Phase | Purpose |
|-------|-------|---------|
| codebase-analyzer | 1 | AST parsing, dependency graphs, security baseline |
| validation-setup | 2 | TypeScript, ESLint, Jest configuration |
| architecture-documenter | 3 | System architecture mapping |
| modernization-planner | 4 | Task breakdown, risk assessment |
| cicd-developer | 5 | Pipeline design, Docker optimization |
| review-validator | 6 | Hallucination detection, fact-checking |
| documentation-generator | 7 | Per-directory READMEs, API docs |

## Reference

- **Full Checklist**: `docs/AI-ASSISTED-BROWNFIELD-MODERNIZATION-CHECKLIST.md`
- **Checkpoint**: `.claude/agent-progress.md`

---

*See the brownfield modernization checklist for detailed best practices and examples.*
