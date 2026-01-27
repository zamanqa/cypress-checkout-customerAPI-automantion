# Claude Default Instructions

**Priority: MINIMIZE TOKEN USAGE AT ALL TIMES**

## Core Principles

### 1. Always Read Memory Files First (MANDATORY)
Before accessing chat history or doing anything else:

```
STEP 1: Read .claude-memory/project-context.md
STEP 2: Read .claude-memory/session-history.md (if exists)
STEP 3: Only then access chat history if absolutely necessary
```

**Token Cost Comparison:**
- Reading memory files: ~2,000 tokens
- Searching chat history: 10,000-50,000+ tokens
- **Savings: 80-95%**

### 2. Token Efficiency Rules

#### DO (Low Token Cost)
✅ Read local memory files first
✅ Use Glob/Grep for specific searches
✅ Read only files you need
✅ Use --limit and --offset for large files
✅ Make parallel tool calls when independent
✅ Ask clarifying questions before large operations
✅ Cache information in memory files

#### DON'T (High Token Cost)
❌ Search through entire chat history
❌ Read files you don't need
❌ Re-read the same file multiple times
❌ Make sequential calls when parallel is possible
❌ Guess - ask the user if unclear
❌ Generate verbose explanations when concise will do

### 3. Memory File Management

#### Before Starting Any Task
```
1. Read: .claude-memory/project-context.md
2. Read: .claude-memory/session-history.md (current session notes)
3. Understand context from files (NOT chat history)
4. Proceed with task
```

#### After Completing Significant Tasks
```
1. Update: .claude-memory/session-history.md
   - Add what was done (brief bullet points)
   - Note any important decisions
   - Record current state

2. Update: .claude-memory/project-context.md (if needed)
   - Major changes only
   - Configuration updates
   - New features/structure changes
```

#### End of Session (When User Says "Done" or Similar)
```
1. Review: .claude-memory/session-history.md
2. Merge important items into: .claude-memory/project-context.md
3. Clear: .claude-memory/session-history.md for next session
4. Confirm updates complete
```

## File Reading Strategy

### Use Specific Tools
```
✅ Glob: "**/*.spec.js" - Find files by pattern
✅ Grep: Search for specific content
✅ Read: Read specific files with limits
❌ Task tool with "explore" - Only when truly necessary
```

### Read Efficiently
```javascript
// Good - Read with limit
Read("file.js", offset: 0, limit: 50)

// Bad - Read entire large file
Read("file.js")

// Good - Grep for specific content
Grep(pattern: "function checkout", output_mode: "content", head_limit: 10)

// Bad - Read all files then search
Read("file1.js"), Read("file2.js"), Read("file3.js")...
```

## Task Execution Strategy

### 1. Understand First (Minimize Cost)
```
User asks: "Fix the checkout test"

Step 1: Read memory - what checkout tests exist?
Step 2: Ask user - which specific test? Which platform?
Step 3: Read only that test file
Step 4: Fix issue
Step 5: Update session history

❌ DON'T: Read all checkout tests, search chat history
```

### 2. Batch Operations
```
✅ Make parallel tool calls when independent:
   - Read multiple unrelated files at once
   - Run multiple git commands simultaneously

❌ DON'T: Make sequential calls for independent operations
```

### 3. Progressive Disclosure
```
✅ Read file with limit first, expand if needed
✅ Ask user to confirm before large operations
✅ Search specifically, not broadly

❌ DON'T: Read everything "just in case"
```

## Communication Style

### Be Concise
```
✅ "Updated Cypress to v13.17.0"
❌ "I have successfully completed the upgrade process of Cypress from version 10.11.0 to version 13.17.0, which involved modifying the package.json file..."

✅ "Tests passing. 3 files updated."
❌ "I'm pleased to report that all tests are now passing successfully. I have made updates to a total of three files during this process..."
```

### Information Hierarchy
```
Priority 1: What was done (1 line)
Priority 2: Key results (bullet points)
Priority 3: Details (only if requested)

Skip: Long explanations, obvious information, reasoning
```

## Session History Format

### File: `.claude-memory/session-history.md`

```markdown
# Current Session History
**Date:** YYYY-MM-DD

## Tasks Completed
- [TIME] Task 1: Brief description → Result
- [TIME] Task 2: Brief description → Result

## Important Decisions
- Decision 1: Rationale
- Decision 2: Rationale

## Current State
- Branch: main/development
- Last commit: Hash + message
- Files modified: List
- Issues: Any blockers or notes

## Next Steps (if applicable)
- [ ] Pending item 1
- [ ] Pending item 2
```

### Update After Each Task
- **When:** After completing user request
- **What:** 1-2 line summary only
- **Format:** Bullet point with timestamp

## Token Budget Awareness

### Estimate Before Action
```
Task: "Search for all API tests"

Option 1: Grep pattern "api.*test" → ~500 tokens
Option 2: Read all test files → ~10,000 tokens
Option 3: Search chat history → ~20,000 tokens

✅ Choose Option 1
```

### Progressive Approach
```
1. Try cheapest method first
2. If insufficient, escalate to next level
3. Always inform user of cost-benefit

Example:
"I can search files (fast) or read entire codebase (thorough but uses more tokens). Which do you prefer?"
```

## Error Recovery

### If Memory Files Don't Exist
```
1. Create them immediately
2. Populate with current context
3. Continue with task
4. Update after task completion
```

### If Memory Files Are Outdated
```
1. Update them first
2. Then proceed with task
3. Note in session history that sync was needed
```

### If Uncertain
```
✅ Ask user (costs ~100 tokens)
❌ Search chat history (costs 10,000+ tokens)
```

## Commit Memory Files

### When to Commit
After significant updates:
```bash
git add .claude-memory/
git commit -m "Update context: [brief description]"
git push origin <current-branch>
```

### Don't Commit
- Temporary session notes mid-task
- Incomplete information
- Redundant updates

## Summary: Token Minimization Checklist

Before every action, ask:
- [ ] Have I read memory files first?
- [ ] Is there a cheaper way to get this information?
- [ ] Do I really need to read this file?
- [ ] Can I ask the user instead of searching?
- [ ] Can I use Grep instead of Read?
- [ ] Can these calls be made in parallel?
- [ ] Am I being concise in responses?

**Goal: Use <5,000 tokens per conversation**
**Stretch Goal: Use <2,000 tokens per conversation**

---

## For User

If I'm using too many tokens or being inefficient:
- Say: "Use less tokens" or "Be more efficient"
- I'll immediately adjust my approach
- Memory files will be updated to prevent future issues

## Monitoring Usage

Track token usage mentally:
- Memory file read: ~2,000
- File read (small): ~500
- File read (large): ~5,000+
- Chat history search: ~10,000+
- Grep search: ~500
- Response text: ~200-500

**Daily budget target: <50,000 tokens total**
