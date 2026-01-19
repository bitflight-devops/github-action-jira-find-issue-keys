---
name: brownfield-modernize
description: Orchestrates concurrent agents to modernize a brownfield codebase using the AI-Assisted Brownfield Modernization Checklist. Spawns specialized subagents for each phase that update a shared progress checkpoint for resumption capability. Use when starting or resuming brownfield modernization work.
allowed-tools: Read, Write, Bash, Edit, Glob, Grep, Task, TodoWrite
context: fork
---

# Brownfield Modernization Orchestrator

This skill coordinates multiple specialized agents to systematically modernize a brownfield codebase following the checklist at `docs/AI-ASSISTED-BROWNFIELD-MODERNIZATION-CHECKLIST.md`.

## Overview

The orchestrator spawns concurrent subagents for different modernization phases:

| Agent | Phase | Focus |
|-------|-------|-------|
| `codebase-analyzer` | Phase 1 | Repository analysis, AST parsing, CodeQL, security baseline |
| `validation-setup` | Phase 2 | Type checking, linting, test harness configuration |
| `architecture-documenter` | Phase 3 | System architecture mapping, component documentation |
| `modernization-planner` | Phase 4 | Task breakdown, risk assessment, migration strategy |
| `cicd-developer` | Phase 5 | Pipeline design, Docker optimization, environment parity |
| `review-validator` | Phase 6 | Hallucination detection, fact-checking, CoVe protocol |
| `documentation-generator` | Phase 7 | Per-directory READMEs, API docs, navigation structure |

## Checkpoint System

All agents share a progress checkpoint at `.claude/agent-progress.md` that enables:

1. **Progress Tracking** - Real-time status of each agent's work
2. **Resumption** - New agents can continue from last checkpoint
3. **Inter-agent Communication** - Shared context and findings
4. **Dependency Management** - Agents can wait for prerequisites

### Checkpoint Format

```markdown
# Brownfield Modernization Progress

**Last Updated**: [timestamp]
**Session ID**: [session_id]
**Repository**: [repo_name]

## Overall Status
- Started: [timestamp]
- Current Phase: [phase_number]
- Completion: [percentage]%

## Agent Status

### Agent: codebase-analyzer
- Status: [Pending|In Progress|Complete|Blocked]
- Progress: [percentage]%
- Current Focus: [current_task]
- Completed: [list_of_completed_items]
- Blockers: [any_blockers]
- Agent ID: [agent_id_for_resumption]

[...repeat for each agent...]

## Shared Findings
[Key discoveries, issues found, important decisions]

## Resumption Points
[Agent-specific resumption instructions]
```

## Orchestration Workflow

### Starting Fresh

When invoked on a new project:

1. **Initialize Checkpoint**
   ```
   Create .claude/agent-progress.md with initial state
   Set all agents to "Pending" status
   Record session start time
   ```

2. **Analyze Dependencies**
   - Phase 1 (codebase-analyzer) runs first - provides baseline for all others
   - Phase 2 (validation-setup) can start after Phase 1 begins AST analysis
   - Phase 3-4 depend on Phase 1 completion
   - Phase 5 can run in parallel with Phase 3-4
   - Phase 6-7 depend on earlier phases

3. **Spawn Initial Agents**
   ```
   Spawn codebase-analyzer in background (Phase 1)
   Wait for initial AST analysis (~30%)
   Spawn validation-setup in background (Phase 2)
   ```

4. **Monitor and Coordinate**
   - Check checkpoint every few minutes
   - Spawn next agents when dependencies complete
   - Handle blockers by adjusting agent priorities

### Resuming from Checkpoint

When invoked with existing checkpoint:

1. **Read Checkpoint**
   ```
   Read .claude/agent-progress.md
   Identify incomplete agents
   Check for blockers
   ```

2. **Resume Incomplete Agents**
   ```
   For each agent with Status != Complete:
     - Read their last checkpoint
     - Resume agent with stored Agent ID if available
     - Or spawn new agent with resumption context
   ```

3. **Continue Coordination**
   - Same monitoring as fresh start
   - Skip already-completed phases

## Agent Spawning Commands

### Spawn All Initial Agents (Parallel Start)

```
I need to start brownfield modernization. Please:

1. Initialize the checkpoint at .claude/agent-progress.md
2. Spawn these agents in the background:
   - codebase-analyzer: Start Phase 1 analysis
   - validation-setup: Start Phase 2 setup (can begin type/lint config)
3. Both agents should update .claude/agent-progress.md as they work
4. Report back when initial analysis is complete
```

### Spawn Subsequent Agents

```
Phase 1 is partially complete. Please:

1. Check .claude/agent-progress.md for Phase 1 progress
2. If AST analysis is done, spawn architecture-documenter
3. If security baseline is done, spawn modernization-planner
4. Run cicd-developer in parallel with architecture work
```

### Resume Specific Agent

```
Resume the [agent-name] agent from checkpoint.

Read .claude/agent-progress.md for:
- Last completed task
- Current focus
- Any blockers

Continue from where it stopped, updating checkpoint as you progress.
```

## Checkpoint Update Protocol

**CRITICAL**: Agents must NEVER overwrite the entire checkpoint file. Use the update script:

```bash
# Update agent status
./.claude/skills/brownfield-modernize/scripts/update-progress.sh \
  "agent-name" \
  "status" \
  "current-focus" \
  "completed-items"

# Example
./.claude/skills/brownfield-modernize/scripts/update-progress.sh \
  "codebase-analyzer" \
  "In Progress" \
  "Running CodeQL security analysis" \
  "AST parsing complete, dependency graph built"
```

## Phase Dependencies Graph

```
Phase 1 (codebase-analyzer)
    ├──> Phase 2 (validation-setup) [can start early]
    ├──> Phase 3 (architecture-documenter) [needs Phase 1 complete]
    ├──> Phase 4 (modernization-planner) [needs Phase 1 complete]
    │
    └──> Phase 5 (cicd-developer) [can run parallel to 3-4]
              │
              v
         Phase 6 (review-validator) [needs 1-5 artifacts]
              │
              v
         Phase 7 (documentation-generator) [needs all prior]
              │
              v
         Phase 8 (continuous validation) [ongoing]
```

## Handling Blockers

When an agent reports a blocker:

1. Check if another agent can resolve it
2. If not, escalate to human review
3. Mark dependent agents as "Waiting"
4. Update checkpoint with blocker details

Example blocker handling:
```
Blocker detected: codebase-analyzer cannot run CodeQL (not installed)

Options:
1. Skip CodeQL analysis (reduce security coverage)
2. Install CodeQL and resume
3. Use alternative security scanner

Decision recorded in checkpoint for audit trail.
```

## Completion Criteria

Modernization is complete when:

- [ ] All 7 phase agents report "Complete" status
- [ ] No unresolved blockers in checkpoint
- [ ] All generated documentation passes validation
- [ ] CI/CD pipeline is functional
- [ ] Test coverage meets thresholds

## Example Invocations

### Start Fresh Modernization
```
/brownfield-modernize

Start fresh brownfield modernization for this repository.
Initialize checkpoint and spawn Phase 1-2 agents.
```

### Resume Interrupted Work
```
/brownfield-modernize

Resume brownfield modernization from checkpoint.
Check .claude/agent-progress.md and continue incomplete work.
```

### Check Status Only
```
/brownfield-modernize

Show current modernization status from checkpoint.
Don't spawn new agents, just report progress.
```

### Focus on Specific Phase
```
/brownfield-modernize

Focus on Phase 5 (CI/CD) only.
Spawn cicd-developer agent and coordinate its work.
```

## Reference Documentation

- **Full Checklist**: `docs/AI-ASSISTED-BROWNFIELD-MODERNIZATION-CHECKLIST.md`
- **Agent Definitions**: `.claude/agents/*.md`
- **Checkpoint**: `.claude/agent-progress.md`
- **Update Script**: `.claude/skills/brownfield-modernize/scripts/update-progress.sh`
