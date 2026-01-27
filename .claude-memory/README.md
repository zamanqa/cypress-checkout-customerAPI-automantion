# Claude Memory System

This directory contains context files that Claude can reference to quickly understand your project without searching through lengthy chat histories.

## Purpose

Instead of using tokens to search through previous conversations, Claude can:
1. Read these concise context files at the start of new conversations
2. Quickly understand your project structure and decisions
3. Save your credits by avoiding lengthy history searches

## Files

### `project-context.md`
**Main memory file** - Contains:
- Project information and structure
- Technology stack and versions
- Important configurations
- Recent changes and decisions
- Development workflow
- Known issues

## How It Works

### For You (User)
- ✅ **No action needed** - Files are maintained automatically
- ✅ **Save credits** - Reduced token usage for context retrieval
- ✅ **Faster responses** - Claude gets context immediately
- ℹ️ **Optional:** Review files occasionally to ensure accuracy

### For Claude (AI Assistant)
**At the start of each new conversation:**

1. **Read the context file first**
   ```
   Read: .claude-memory/project-context.md
   ```

2. **Use this context instead of chat history**
   - Project structure
   - Recent changes
   - Configuration details
   - Important decisions

3. **Update the file when needed**
   - After major changes
   - When important decisions are made
   - After resolving significant issues
   - When project structure changes

## Update Guidelines

### When to Update
- ✅ Major version upgrades (e.g., Cypress 13.17.0)
- ✅ Project structure changes
- ✅ New test suites or significant features
- ✅ Configuration changes
- ✅ Important issues resolved
- ✅ Repository or branch changes
- ❌ Minor test data changes
- ❌ Temporary debugging information
- ❌ Individual test runs

### How to Update
1. Read the existing file
2. Update relevant sections (don't duplicate information)
3. Add entry to "Recent Changes" with date
4. Update "Last Updated" date at top
5. Remove outdated information

### Keep It Concise
- Focus on **what** and **why**, not **how**
- Summarize decisions, don't document every step
- Remove information that's no longer relevant
- Keep it under 500 lines if possible

## Benefits

### Token Savings
- **Before:** 10,000+ tokens to search chat history
- **After:** ~2,000 tokens to read context file
- **Savings:** 80%+ reduction in context loading

### Response Quality
- Immediate access to all project context
- Consistent understanding across conversations
- No information lost between sessions

### Maintenance
- Living document that grows with your project
- Always up-to-date with latest changes
- Easy to review what's been done

## Example Usage

**New conversation starts:**

```
User: "Add a new test for Stripe SEPA payments"

Claude:
1. [Reads .claude-memory/project-context.md]
2. [Understands project structure, test patterns, etc.]
3. [Creates test following existing patterns]
4. [Updates context file with new test added]
```

**Without memory system:**
```
User: "Add a new test for Stripe SEPA payments"

Claude:
1. [Searches through 50+ messages of chat history]
2. [Uses 10,000+ tokens]
3. [May miss important context from earlier]
4. [Takes longer to respond]
```

## File Management

### Location
```
C:\Users\shahi\Circuly Project\checkoutCutomerApi e2e\
└── .claude-memory/
    ├── README.md              # This file
    └── project-context.md     # Main context file
```

### Git Tracking
These files **should be committed to git** so they:
- ✅ Stay synchronized across machines
- ✅ Maintain history of project evolution
- ✅ Can be shared with team members

### Backup
Consider backing up these files as they contain valuable project knowledge that's refined over time.

---

**Questions or issues?** These files are designed to be self-maintaining. If something seems outdated, just ask Claude to update the relevant section.
