#!/bin/bash
#
# Brownfield Modernization Checkpoint Update Script
#
# This script safely updates agent progress in the shared checkpoint file
# without overwriting other agents' sections. It uses atomic writes to
# prevent race conditions when multiple agents update concurrently.
#
# Usage:
#   update-progress.sh <agent-name> <status> <current-focus> [completed-items]
#
# Arguments:
#   agent-name     - Name of the agent (e.g., "codebase-analyzer")
#   status         - Status: Pending, In Progress, Complete, Blocked
#   current-focus  - What the agent is currently working on
#   completed-items - (Optional) Comma-separated list of completed tasks
#
# Example:
#   ./update-progress.sh "codebase-analyzer" "In Progress" "Running AST parser" "Dependency audit"
#

set -euo pipefail

# Configuration
CHECKPOINT_FILE="${CHECKPOINT_FILE:-.claude/agent-progress.md}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../../.." && pwd)"
CHECKPOINT_PATH="${PROJECT_ROOT}/${CHECKPOINT_FILE}"

# Arguments
AGENT_NAME="${1:-}"
STATUS="${2:-}"
CURRENT_FOCUS="${3:-}"
COMPLETED_ITEMS="${4:-}"

# Timestamp
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")

# Validation
if [[ -z "$AGENT_NAME" ]] || [[ -z "$STATUS" ]]; then
    echo "Error: agent-name and status are required"
    echo "Usage: update-progress.sh <agent-name> <status> <current-focus> [completed-items]"
    exit 1
fi

# Validate status
case "$STATUS" in
    "Pending"|"In Progress"|"Complete"|"Blocked"|"Waiting")
        ;;
    *)
        echo "Warning: Non-standard status '$STATUS'. Expected: Pending, In Progress, Complete, Blocked, Waiting"
        ;;
esac

# Ensure checkpoint directory exists
mkdir -p "$(dirname "$CHECKPOINT_PATH")"

# Initialize checkpoint if it doesn't exist
if [[ ! -f "$CHECKPOINT_PATH" ]]; then
    REPO_NAME=$(basename "$PROJECT_ROOT")
    cat > "$CHECKPOINT_PATH" << EOF
# Brownfield Modernization Progress

**Last Updated**: ${TIMESTAMP}
**Session ID**: $(date +%s)-$$
**Repository**: ${REPO_NAME}

## Overall Status
- Started: ${TIMESTAMP}
- Current Phase: 1
- Completion: 0%

## Agent Status

### Agent: codebase-analyzer
- Status: Pending
- Progress: 0%
- Current Focus: Not started
- Completed: None
- Blockers: None
- Agent ID: pending

### Agent: validation-setup
- Status: Pending
- Progress: 0%
- Current Focus: Not started
- Completed: None
- Blockers: None
- Agent ID: pending

### Agent: architecture-documenter
- Status: Pending
- Progress: 0%
- Current Focus: Not started
- Completed: None
- Blockers: None
- Agent ID: pending

### Agent: modernization-planner
- Status: Pending
- Progress: 0%
- Current Focus: Not started
- Completed: None
- Blockers: None
- Agent ID: pending

### Agent: cicd-developer
- Status: Pending
- Progress: 0%
- Current Focus: Not started
- Completed: None
- Blockers: None
- Agent ID: pending

### Agent: review-validator
- Status: Pending
- Progress: 0%
- Current Focus: Not started
- Completed: None
- Blockers: None
- Agent ID: pending

### Agent: documentation-generator
- Status: Pending
- Progress: 0%
- Current Focus: Not started
- Completed: None
- Blockers: None
- Agent ID: pending

## Shared Findings

*No findings recorded yet.*

## Resumption Points

*No resumption points recorded yet.*

---
*This file is automatically updated by modernization agents. Do not edit manually unless necessary.*
EOF
    echo "Initialized checkpoint at ${CHECKPOINT_PATH}"
fi

# Create temporary file for atomic write
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT

# Update the Last Updated timestamp
sed "s/\*\*Last Updated\*\*: .*/\*\*Last Updated\*\*: ${TIMESTAMP}/" "$CHECKPOINT_PATH" > "$TEMP_FILE"
mv "$TEMP_FILE" "$CHECKPOINT_PATH"
TEMP_FILE=$(mktemp)

# Check if agent section exists
if ! grep -q "### Agent: ${AGENT_NAME}" "$CHECKPOINT_PATH"; then
    echo "Warning: Agent '${AGENT_NAME}' not found in checkpoint. Adding new section."

    # Add new agent section before "## Shared Findings"
    awk -v agent="$AGENT_NAME" -v status="$STATUS" -v focus="$CURRENT_FOCUS" -v completed="$COMPLETED_ITEMS" '
    /^## Shared Findings/ {
        print "### Agent: " agent
        print "- Status: " status
        print "- Progress: 0%"
        print "- Current Focus: " (focus ? focus : "Initializing")
        print "- Completed: " (completed ? completed : "None")
        print "- Blockers: None"
        print "- Agent ID: pending"
        print ""
    }
    { print }
    ' "$CHECKPOINT_PATH" > "$TEMP_FILE"
    mv "$TEMP_FILE" "$CHECKPOINT_PATH"
    TEMP_FILE=$(mktemp)
fi

# Update agent section using awk for precise field updates
awk -v agent="$AGENT_NAME" -v status="$STATUS" -v focus="$CURRENT_FOCUS" -v completed="$COMPLETED_ITEMS" -v ts="$TIMESTAMP" '
BEGIN { in_agent = 0 }

/^### Agent: / {
    if ($0 ~ "### Agent: " agent "$") {
        in_agent = 1
    } else {
        in_agent = 0
    }
    print
    next
}

in_agent && /^- Status:/ {
    print "- Status: " status
    next
}

in_agent && /^- Current Focus:/ {
    if (focus != "") {
        print "- Current Focus: " focus
    } else {
        print
    }
    next
}

in_agent && /^- Completed:/ {
    if (completed != "") {
        # Append to existing completed items if not "None"
        if ($0 ~ /: None$/) {
            print "- Completed: " completed
        } else {
            # Get existing items
            existing = substr($0, index($0, ": ") + 2)
            print "- Completed: " existing ", " completed
        }
    } else {
        print
    }
    next
}

# Detect end of agent section
in_agent && /^### Agent: |^## / {
    in_agent = 0
}

{ print }
' "$CHECKPOINT_PATH" > "$TEMP_FILE"

# Atomic move
mv "$TEMP_FILE" "$CHECKPOINT_PATH"

# Calculate and update overall progress
calculate_progress() {
    local total=0
    local complete=0

    while IFS= read -r line; do
        if [[ "$line" =~ ^-\ Status:\ (.+)$ ]]; then
            total=$((total + 1))
            if [[ "${BASH_REMATCH[1]}" == "Complete" ]]; then
                complete=$((complete + 1))
            fi
        fi
    done < "$CHECKPOINT_PATH"

    if [[ $total -gt 0 ]]; then
        echo $(( (complete * 100) / total ))
    else
        echo 0
    fi
}

OVERALL_PROGRESS=$(calculate_progress)

# Update overall completion percentage
TEMP_FILE=$(mktemp)
sed "s/- Completion: [0-9]*%/- Completion: ${OVERALL_PROGRESS}%/" "$CHECKPOINT_PATH" > "$TEMP_FILE"
mv "$TEMP_FILE" "$CHECKPOINT_PATH"

# Determine current phase based on agent statuses
determine_phase() {
    local phase=1

    # Read statuses
    local analyzer_status=$(grep -A1 "### Agent: codebase-analyzer" "$CHECKPOINT_PATH" | grep "Status:" | sed 's/.*: //')
    local validation_status=$(grep -A1 "### Agent: validation-setup" "$CHECKPOINT_PATH" | grep "Status:" | sed 's/.*: //')
    local arch_status=$(grep -A1 "### Agent: architecture-documenter" "$CHECKPOINT_PATH" | grep "Status:" | sed 's/.*: //')
    local plan_status=$(grep -A1 "### Agent: modernization-planner" "$CHECKPOINT_PATH" | grep "Status:" | sed 's/.*: //')
    local cicd_status=$(grep -A1 "### Agent: cicd-developer" "$CHECKPOINT_PATH" | grep "Status:" | sed 's/.*: //')
    local review_status=$(grep -A1 "### Agent: review-validator" "$CHECKPOINT_PATH" | grep "Status:" | sed 's/.*: //')
    local doc_status=$(grep -A1 "### Agent: documentation-generator" "$CHECKPOINT_PATH" | grep "Status:" | sed 's/.*: //')

    [[ "$analyzer_status" == "Complete" ]] && phase=2
    [[ "$validation_status" == "Complete" ]] && phase=3
    [[ "$arch_status" == "Complete" && "$plan_status" == "Complete" ]] && phase=5
    [[ "$cicd_status" == "Complete" ]] && phase=6
    [[ "$review_status" == "Complete" ]] && phase=7
    [[ "$doc_status" == "Complete" ]] && phase=8

    echo $phase
}

CURRENT_PHASE=$(determine_phase)
TEMP_FILE=$(mktemp)
sed "s/- Current Phase: [0-9]*/- Current Phase: ${CURRENT_PHASE}/" "$CHECKPOINT_PATH" > "$TEMP_FILE"
mv "$TEMP_FILE" "$CHECKPOINT_PATH"

echo "Updated checkpoint for agent '${AGENT_NAME}':"
echo "  Status: ${STATUS}"
echo "  Current Focus: ${CURRENT_FOCUS:-unchanged}"
echo "  Overall Progress: ${OVERALL_PROGRESS}%"
echo "  Current Phase: ${CURRENT_PHASE}"
