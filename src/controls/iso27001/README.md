# ISO 27001 Controls Directory

This directory contains the implementation of ISO 27001:2022 controls, organized by annex sections.

## Directory Structure

```
iso27001/
├── README.md                     # This file
├── controls-registry.ts          # Main controls registry
├── annex-a/                     # Annex A controls implementation
│   ├── a5-organizational.ts     # A.5 Organizational controls
│   ├── a6-people.ts            # A.6 People controls
│   ├── a7-physical.ts          # A.7 Physical and environmental controls
│   ├── a8-technological.ts     # A.8 Technological controls
│   └── index.ts                # Exports all annex controls
├── documentation/              # Control documentation
│   ├── implementation-guides/  # Implementation guidance
│   ├── policies/              # Policy templates
│   └── procedures/            # Procedure templates
└── assessments/              # Assessment tools
    ├── self-assessment.ts    # Self-assessment framework
    └── audit-checklist.ts   # Audit checklist
```

## ISO 27001:2022 Control Categories

### A.5 Organizational Controls (37 controls)
- Information security policies
- Information security roles and responsibilities
- Segregation of duties
- Management responsibilities
- Contact with authorities
- And more...

### A.6 People Controls (8 controls)
- Screening
- Terms and conditions of employment
- Disciplinary process
- Information security responsibilities
- Remote working
- Information security awareness and training

### A.7 Physical and Environmental Security Controls (14 controls)
- Physical security perimeters
- Physical entry controls
- Protection against environmental threats
- Equipment maintenance
- Secure disposal or reuse of equipment
- And more...

### A.8 Technological Controls (34 controls)
- User access management
- Privileged access rights
- Information access restriction
- Cryptography
- System security
- Network security controls
- And more...

## Usage

```typescript
import { ISO27001ControlsRegistry } from './controls-registry';

const registry = new ISO27001ControlsRegistry();
const controls = await registry.getAllControls();
const organizationalControls = await registry.getControlsByCategory('A.5');
```

## Implementation Status

- ✅ Registry structure defined
- ✅ Control categories mapped
- 🚧 Individual control implementations (in progress)
- ⏳ Documentation templates (pending)
- ⏳ Assessment tools (pending)

## Compliance Mapping

These controls are mapped to:
- SOC 2 Type II controls
- PCI DSS requirements
- NIST Cybersecurity Framework
- Other relevant standards

---

*Last updated: 2024-01-01*
*ISO 27001:2022 version*
