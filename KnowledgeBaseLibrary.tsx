import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Book, Search, Filter, Eye, Download, 
  FileText, AlertTriangle, Shield, Wrench, Zap,
  Users, Clock, Star, Tag, Plus, Edit, Trash2
} from 'lucide-react';
import Logo from './Logo';

interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  category: 'SOP' | 'Emergency Plan' | 'Best Practice' | 'Training' | 'Compliance' | 'Safety';
  subcategory: string;
  content: string;
  tags: string[];
  lastUpdated: string;
  author: string;
  version: string;
  status: 'Active' | 'Draft' | 'Archived' | 'Under Review';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  attachments: string[];
  relatedItems: string[];
  viewCount: number;
  rating: number;
}

const KnowledgeBaseLibrary = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Mock knowledge base data
  const mockKnowledgeItems: KnowledgeItem[] = [
    {
      id: 'KB-001',
      title: 'HVAC Emergency Shutdown Procedure',
      description: 'Step-by-step emergency shutdown procedure for all HVAC systems during fire alarms or gas leaks.',
      category: 'Emergency Plan',
      subcategory: 'HVAC Emergency',
      content: `# HVAC Emergency Shutdown Procedure

## When to Use This Procedure
- Fire alarm activation
- Gas leak detection
- Smoke detection in HVAC system
- Emergency evacuation order

## Step-by-Step Instructions

### 1. Immediate Actions (0-2 minutes)
- **STOP** all HVAC operations immediately
- Locate main HVAC control panel (Building A: Basement Level, Room B-12)
- Press **RED EMERGENCY STOP** button
- Verify all air handling units have stopped

### 2. System Isolation (2-5 minutes)
- Turn off main electrical supply to HVAC systems
- Close all dampers manually if automatic closure fails
- Shut off gas supply to heating units (if applicable)
- Document time of shutdown

### 3. Verification (5-10 minutes)
- Walk through all floors to verify air flow has stopped
- Check that all vents are closed
- Confirm no unusual sounds or vibrations
- Report completion to Emergency Coordinator

### 4. Post-Emergency
- Do NOT restart systems until cleared by Fire Department
- Document all actions taken
- Schedule professional inspection before restart

## Emergency Contacts
- Fire Department: 911
- Emergency Coordinator: (555) 123-4567
- HVAC Contractor: Arctic Air Solutions (555) 987-6543

## Related Procedures
- Fire Evacuation Plan (KB-003)
- Gas Leak Response (KB-005)`,
      tags: ['emergency', 'hvac', 'shutdown', 'fire', 'safety'],
      lastUpdated: '2024-01-15',
      author: 'Safety Manager',
      version: '2.1',
      status: 'Active',
      priority: 'Critical',
      attachments: ['hvac_shutdown_checklist.pdf', 'emergency_contacts.pdf'],
      relatedItems: ['KB-003', 'KB-005'],
      viewCount: 247,
      rating: 4.9
    },
    {
      id: 'KB-002',
      title: 'Preventive Maintenance Best Practices',
      description: 'Comprehensive guide to implementing effective preventive maintenance programs.',
      category: 'Best Practice',
      subcategory: 'Maintenance Management',
      content: `# Preventive Maintenance Best Practices

## Overview
Preventive maintenance is the foundation of effective facility management. This guide outlines proven strategies for implementing and maintaining a successful PM program.

## Key Principles

### 1. Asset Prioritization
- **Critical Assets**: Equipment failure causes immediate safety risk or business disruption
- **Important Assets**: Equipment failure causes significant operational impact
- **Standard Assets**: Equipment failure causes minor inconvenience

### 2. Maintenance Scheduling
- **Time-Based**: Regular intervals (daily, weekly, monthly, quarterly)
- **Usage-Based**: Based on operating hours or cycles
- **Condition-Based**: Based on equipment condition monitoring

### 3. Documentation Standards
- All maintenance activities must be documented
- Use standardized work order forms
- Include photos of completed work
- Track parts and materials used

## Implementation Steps

### Phase 1: Asset Inventory (Weeks 1-2)
1. Complete asset registry with QR codes
2. Categorize assets by criticality
3. Gather manufacturer maintenance recommendations
4. Establish baseline condition assessments

### Phase 2: Schedule Development (Weeks 3-4)
1. Create maintenance calendars for each asset
2. Balance workload across time periods
3. Coordinate with operational schedules
4. Build in buffer time for emergencies

### Phase 3: Vendor Coordination (Week 5)
1. Establish preferred vendor relationships
2. Negotiate service level agreements
3. Set up emergency response protocols
4. Implement vendor performance tracking

## Success Metrics
- **Compliance Rate**: Target 95%+ completion
- **Cost per Asset**: Track maintenance costs
- **Downtime Reduction**: Measure equipment availability
- **Emergency Calls**: Reduce by 30%+

## Common Pitfalls to Avoid
- Over-maintaining low-critical assets
- Under-maintaining critical equipment
- Poor documentation practices
- Inadequate vendor oversight`,
      tags: ['maintenance', 'best-practice', 'preventive', 'planning'],
      lastUpdated: '2024-01-10',
      author: 'Maintenance Director',
      version: '1.3',
      status: 'Active',
      priority: 'High',
      attachments: ['pm_checklist_template.xlsx', 'vendor_sla_template.docx'],
      relatedItems: ['KB-007', 'KB-012'],
      viewCount: 189,
      rating: 4.7
    },
    {
      id: 'KB-003',
      title: 'Fire Evacuation Plan - All Buildings',
      description: 'Comprehensive fire evacuation procedures for all facility buildings and floors.',
      category: 'Emergency Plan',
      subcategory: 'Fire Safety',
      content: `# Fire Evacuation Plan

## Immediate Actions Upon Fire Alarm

### All Personnel Must:
1. **STOP** current activities immediately
2. **LISTEN** for evacuation announcements
3. **MOVE** to nearest exit (do not use elevators)
4. **ASSIST** others who need help
5. **REPORT** to designated assembly areas

## Building-Specific Routes

### Building A (5 floors)
- **Floors 1-2**: Exit via main lobby or east stairwell
- **Floors 3-5**: Use east or west stairwells only
- **Assembly Point**: Parking Lot A (north side)

### Building B (3 floors)
- **All Floors**: Exit via central stairwell or emergency exits
- **Assembly Point**: Parking Lot B (south side)

## Special Procedures

### For Mobility-Impaired Individuals
- Remain in stairwell landing
- Call 911 and report location
- Wait for emergency responders
- Buddy system: Assign helper if possible

### For Visitors
- Employees must assist visitors to exits
- Visitors report to main assembly point
- Security will account for all visitors

## Floor Wardens Responsibilities
1. Sweep assigned areas for remaining personnel
2. Close doors (do not lock)
3. Report to Incident Commander at assembly point
4. Provide headcount and status report

## Do NOT Re-enter Building Until:
- Fire Department gives all-clear
- Incident Commander authorizes return
- Building systems are verified operational

## Emergency Contacts
- Fire Department: 911
- Building Security: (555) 123-4567
- Incident Commander: (555) 234-5678`,
      tags: ['fire', 'evacuation', 'emergency', 'safety', 'procedures'],
      lastUpdated: '2024-01-20',
      author: 'Fire Safety Officer',
      version: '3.0',
      status: 'Active',
      priority: 'Critical',
      attachments: ['evacuation_map_building_a.pdf', 'evacuation_map_building_b.pdf'],
      relatedItems: ['KB-001', 'KB-004'],
      viewCount: 312,
      rating: 4.8
    },
    {
      id: 'KB-004',
      title: 'Vendor Management SOP',
      description: 'Standard operating procedures for vendor selection, management, and performance evaluation.',
      category: 'SOP',
      subcategory: 'Vendor Management',
      content: `# Vendor Management Standard Operating Procedure

## Purpose
This SOP establishes standardized processes for vendor selection, onboarding, management, and performance evaluation to ensure consistent service quality and cost effectiveness.

## Vendor Selection Process

### 1. Qualification Criteria
**Mandatory Requirements:**
- Valid business license
- General liability insurance ($1M minimum)
- Workers compensation insurance
- Relevant trade certifications
- 3+ years industry experience

**Preferred Qualifications:**
- Local presence (within 50 miles)
- 24/7 emergency availability
- Digital work order capabilities
- Positive client references

### 2. Evaluation Process
1. **Initial Screening**: Verify mandatory requirements
2. **Reference Checks**: Contact 3 recent clients
3. **Insurance Verification**: Confirm coverage amounts
4. **Financial Stability**: Review business standing
5. **Site Visit**: Assess capabilities and professionalism

### 3. Selection Criteria Scoring
- **Price Competitiveness**: 30%
- **Quality of Work**: 25%
- **Response Time**: 20%
- **Insurance/Licensing**: 15%
- **References**: 10%

## Vendor Onboarding

### Required Documentation
- W-9 tax form
- Certificate of insurance
- Business license copy
- Trade certifications
- Emergency contact information

### System Setup
1. Create vendor profile in FFM system
2. Assign vendor categories and specialties
3. Set up billing and payment terms
4. Configure alert preferences
5. Provide system training

## Performance Management

### Key Performance Indicators
- **Response Time**: Target <2 hours for standard, <30 minutes for emergency
- **Work Quality**: Client satisfaction rating >4.5/5
- **Budget Adherence**: Stay within 5% of approved estimates
- **Safety Record**: Zero incidents target
- **Communication**: Timely updates and reporting

### Monthly Performance Reviews
1. Compile performance metrics
2. Review client feedback
3. Assess compliance with SOP requirements
4. Document any issues or concerns
5. Provide feedback to vendor

### Performance Improvement Plans
For vendors not meeting standards:
1. **30-Day Notice**: Identify specific deficiencies
2. **Improvement Plan**: Set measurable goals and timeline
3. **Progress Monitoring**: Weekly check-ins
4. **Final Review**: Assess improvement after 30 days
5. **Decision**: Continue, extend plan, or terminate

## Vendor Termination Process

### Grounds for Immediate Termination
- Safety violations
- Insurance lapse
- License suspension/revocation
- Fraudulent billing
- Breach of confidentiality

### Standard Termination Process
1. **30-Day Notice**: Written notification of termination
2. **Work Completion**: Finish all active projects
3. **Final Billing**: Process outstanding invoices
4. **System Deactivation**: Remove access to systems
5. **Documentation**: Archive all vendor records`,
      tags: ['vendor', 'management', 'sop', 'performance', 'selection'],
      lastUpdated: '2024-01-12',
      author: 'Procurement Manager',
      version: '2.0',
      status: 'Active',
      priority: 'High',
      attachments: ['vendor_scorecard_template.xlsx', 'vendor_agreement_template.docx'],
      relatedItems: ['KB-008', 'KB-011'],
      viewCount: 156,
      rating: 4.6
    },
    {
      id: 'KB-005',
      title: 'Gas Leak Response Procedures',
      description: 'Emergency response procedures for natural gas leaks and related safety protocols.',
      category: 'Emergency Plan',
      subcategory: 'Gas Emergency',
      content: `# Gas Leak Response Procedures

## Immediate Response Actions

### Gas Leak Detection
1. **Evacuate** the area immediately
2. **Do NOT** use electrical switches, phones, or create sparks
3. **Call 911** from a safe location
4. **Shut off** gas supply at meter if safely accessible
5. **Ventilate** area by opening doors and windows

### Warning Signs of Gas Leaks
- Strong sulfur or "rotten egg" smell
- Hissing sound near gas lines
- Dead vegetation near gas lines
- Dirt or dust blowing from underground
- Bubbles in standing water near gas lines

## Emergency Contacts
- **Emergency Services**: 911
- **Gas Company Emergency**: (555) GAS-LEAK
- **Building Security**: (555) 123-4567
- **Facilities Manager**: (555) 234-5678

## Safety Procedures

### Do NOT:
- Use electrical equipment or switches
- Light matches or lighters
- Use phones in the area
- Try to locate the leak source
- Re-enter area until cleared

### DO:
- Leave area immediately
- Call from safe location
- Keep others away from area
- Wait for emergency responders
- Provide information to responders`,
      tags: ['gas', 'leak', 'emergency', 'evacuation', 'safety'],
      lastUpdated: '2024-01-17',
      author: 'Emergency Response Coordinator',
      version: '1.4',
      status: 'Active',
      priority: 'Critical',
      attachments: ['gas_shutoff_locations.pdf', 'emergency_contacts.pdf'],
      relatedItems: ['KB-001', 'KB-003'],
      viewCount: 156,
      rating: 4.8
    },
    {
      id: 'KB-011',
      title: 'Electrical Safety Procedures',
      description: 'Safety procedures for electrical work, lockout/tagout, and emergency response.',
      category: 'Safety',
      subcategory: 'Electrical Safety',
      content: `# Electrical Safety Procedures

## General Safety Rules

### Before Any Electrical Work
1. **De-energize** circuits at source
2. **Test** circuits with approved tester
3. **Lock Out/Tag Out** all energy sources
4. **Verify** zero energy state
5. **Use** appropriate PPE

### Personal Protective Equipment (PPE)
- **Required**: Safety glasses, insulated gloves, hard hat
- **Arc Flash**: Arc-rated clothing for >40 cal/cm²
- **Footwear**: Electrical hazard rated boots
- **Tools**: Insulated tools only

## Lockout/Tagout Procedure

### Step 1: Preparation
- Identify all energy sources
- Notify affected personnel
- Gather LOTO devices and tags

### Step 2: Shutdown
- Turn off equipment using normal controls
- Allow equipment to come to complete stop

### Step 3: Isolation
- Disconnect or isolate all energy sources
- Apply lockout devices
- Attach personal danger tags

### Step 4: Verification
- Test equipment controls (should not start)
- Use voltage tester to verify zero energy
- Document LOTO application

### Step 5: Work Completion
- Remove tools and materials
- Ensure all personnel are clear
- Remove LOTO devices in reverse order
- Test equipment operation

## Emergency Procedures

### Electrical Shock Response
1. **Do NOT touch** the victim directly
2. **Turn OFF** power source if safely possible
3. **Call 911** immediately
4. **Use non-conductive object** to separate victim from source
5. **Begin CPR** if trained and victim is unconscious
6. **Treat for shock** and burns

### Electrical Fire Response
1. **Call Fire Department** (911)
2. **De-energize** if safely possible
3. **Use Class C fire extinguisher** only
4. **Evacuate** if fire spreads
5. **Do NOT use water** on electrical fires

## Arc Flash Safety

### Risk Assessment Required For:
- Work on energized equipment >50V
- Equipment with potential arc flash hazard
- Work within arc flash boundary

### Protection Strategies
1. **De-energize** when possible (preferred)
2. **Remote operation** when available
3. **Arc-rated PPE** when work must be energized
4. **Proper boundaries** and barriers

## Qualified vs Unqualified Persons

### Qualified Electrical Workers Can:
- Work on or near exposed energized parts
- Perform electrical installations
- Conduct electrical testing
- Apply LOTO procedures

### Unqualified Persons Must:
- Stay outside electrical work boundaries
- Report electrical hazards immediately
- Never attempt electrical repairs
- Use only approved electrical equipment`,
      tags: ['electrical', 'safety', 'lockout', 'tagout', 'emergency'],
      lastUpdated: '2024-01-18',
      author: 'Safety Director',
      version: '1.5',
      status: 'Active',
      priority: 'Critical',
      attachments: ['loto_checklist.pdf', 'arc_flash_ppe_guide.pdf'],
      relatedItems: ['KB-009', 'KB-010'],
      viewCount: 203,
      rating: 4.9
    },
    {
      id: 'KB-006',
      title: 'Plumbing Emergency Response',
      description: 'Emergency procedures for water leaks, pipe bursts, and plumbing system failures.',
      category: 'Emergency Plan',
      subcategory: 'Plumbing Emergency',
      content: `# Plumbing Emergency Response Plan

## Immediate Response Actions

### Water Leak Detection
1. **Locate** the source of the leak
2. **Shut off** water supply at nearest valve
3. **Document** with photos if safe to do so
4. **Call** emergency plumbing service
5. **Notify** building occupants if necessary

### Main Water Line Shut-off Locations
- **Building A**: Basement mechanical room, east wall
- **Building B**: Ground floor utility closet
- **Building C**: Exterior meter vault, north side

### Pipe Burst Emergency
1. **IMMEDIATELY** shut off main water supply
2. **Evacuate** affected areas if flooding occurs
3. **Call 911** if electrical hazards present
4. **Contact** emergency plumbing contractor
5. **Begin** water extraction if safe

## Emergency Contacts
- **Emergency Plumbing**: FastFlow Emergency (555) 911-PIPE
- **Water Utility**: City Water Dept (555) 123-WATER
- **Building Security**: (555) 123-4567
- **Facilities Manager**: (555) 234-5678

## Water Damage Prevention

### Immediate Actions
- Move electronics and furniture away from water
- Place buckets to catch dripping water
- Use towels and mops to contain spread
- Turn off electricity to affected areas
- Document damage with photos

### Do NOT:
- Enter flooded areas with electrical equipment
- Use electrical appliances in wet areas
- Ignore small leaks (they can become big problems)
- Attempt major repairs without qualified personnel

## Post-Emergency Procedures
1. **Assess** total damage and document
2. **Contact** insurance company if applicable
3. **Schedule** professional water extraction
4. **Test** water pressure and system function
5. **Update** emergency response procedures if needed`,
      tags: ['plumbing', 'emergency', 'water', 'leak', 'burst'],
      lastUpdated: '2024-01-16',
      author: 'Emergency Response Coordinator',
      version: '2.2',
      status: 'Active',
      priority: 'Critical',
      attachments: ['water_shutoff_map.pdf', 'emergency_contacts.pdf'],
      relatedItems: ['KB-001', 'KB-007'],
      viewCount: 178,
      rating: 4.8
    },
    {
      id: 'KB-007',
      title: 'Elevator Emergency Procedures',
      description: 'Emergency response procedures for elevator entrapment and mechanical failures.',
      category: 'Emergency Plan',
      subcategory: 'Elevator Emergency',
      content: `# Elevator Emergency Procedures

## Elevator Entrapment Response

### If Someone is Trapped
1. **Stay calm** and reassure trapped passengers
2. **Use** elevator emergency phone to contact monitoring service
3. **Call** building security: (555) 123-4567
4. **Do NOT** attempt to force doors open
5. **Wait** for qualified elevator technicians

### Communication with Trapped Passengers
- Speak through elevator doors calmly
- Inform them help is on the way
- Ask about medical emergencies
- Keep them updated on rescue progress
- Do not leave them alone

## Elevator Mechanical Failure

### Power Outage
- Elevators will automatically stop at nearest floor
- Emergency lighting will activate
- Backup power will lower elevators to ground floor
- Use stairs for all movement during outage

### Strange Noises or Vibrations
1. **Immediately** take elevator out of service
2. **Post** "Out of Order" signs
3. **Call** elevator service company
4. **Document** the issue and time
5. **Notify** all building occupants

## Emergency Contacts
- **Elevator Service**: SafeLift Emergency (555) 987-LIFT
- **Fire Department**: 911
- **Building Security**: (555) 123-4567
- **Facilities Manager**: (555) 234-5678

## Monthly Inspection Requirements
- Test emergency phones in all elevators
- Verify emergency lighting function
- Check door operation and safety sensors
- Test emergency stop buttons
- Document all tests and findings

## Elevator Safety Rules
- Never exceed weight capacity
- Hold doors only briefly
- Report unusual sounds immediately
- Keep elevator doors clear
- Use stairs during fire alarms`,
      tags: ['elevator', 'emergency', 'entrapment', 'safety', 'rescue'],
      lastUpdated: '2024-01-14',
      author: 'Building Safety Manager',
      version: '1.8',
      status: 'Active',
      priority: 'Critical',
      attachments: ['elevator_emergency_contacts.pdf', 'inspection_checklist.pdf'],
      relatedItems: ['KB-003', 'KB-008'],
      viewCount: 145,
      rating: 4.7
    },
    {
      id: 'KB-008',
      title: 'Cleaning & Sanitization Protocols',
      description: 'Standard operating procedures for facility cleaning and sanitization.',
      category: 'SOP',
      subcategory: 'Cleaning Operations',
      content: `# Cleaning & Sanitization Standard Operating Procedures

## Daily Cleaning Checklist

### Office Areas
- **Empty** all trash receptacles
- **Vacuum** carpeted areas
- **Mop** hard surface floors
- **Clean** and disinfect restrooms
- **Wipe down** common surfaces
- **Restock** paper products and soap

### Common Areas
- **Clean** lobby and reception areas
- **Sanitize** elevator buttons and handrails
- **Empty** and clean break room
- **Wipe** glass doors and windows
- **Vacuum** entrance mats

## Weekly Deep Cleaning

### Restroom Deep Clean
1. **Apply** disinfectant to all surfaces
2. **Scrub** toilets, sinks, and fixtures
3. **Clean** mirrors and dispensers
4. **Mop** floors with disinfectant
5. **Restock** all supplies
6. **Check** plumbing for issues

### Kitchen/Break Room
- **Clean** refrigerator interior
- **Sanitize** microwave and appliances
- **Deep clean** sink and countertops
- **Empty** and clean coffee makers
- **Wipe** cabinet exteriors

## Monthly Maintenance Cleaning

### HVAC System
- **Replace** air fresheners
- **Clean** vent covers and grilles
- **Check** for dust buildup
- **Report** any unusual odors

### Floor Care
- **Strip** and wax hard floors
- **Deep clean** carpets
- **Clean** baseboards and corners
- **Polish** metal fixtures

## Cleaning Supply Management

### Required Supplies
- **Disinfectants**: EPA-approved for COVID-19
- **Paper Products**: Toilet paper, paper towels, tissues
- **Cleaning Tools**: Mops, vacuums, microfiber cloths
- **Safety Equipment**: Gloves, masks, eye protection

### Chemical Safety
- **Never mix** different cleaning chemicals
- **Use** proper ventilation
- **Wear** appropriate PPE
- **Store** chemicals safely and securely
- **Follow** manufacturer instructions exactly

## Quality Control

### Daily Inspections
- **Walk through** all cleaned areas
- **Check** supply levels
- **Document** any issues
- **Take** photos of problem areas
- **Report** to facilities manager

### Client Feedback
- **Respond** to complaints within 2 hours
- **Document** all feedback
- **Implement** corrective actions
- **Follow up** to ensure satisfaction`,
      tags: ['cleaning', 'sanitization', 'protocols', 'maintenance', 'quality'],
      lastUpdated: '2024-01-12',
      author: 'Cleaning Operations Manager',
      version: '3.1',
      status: 'Active',
      priority: 'High',
      attachments: ['daily_checklist.pdf', 'chemical_safety_guide.pdf'],
      relatedItems: ['KB-009', 'KB-013'],
      viewCount: 234,
      rating: 4.5
    },
    {
      id: 'KB-009',
      title: 'Landscaping Maintenance Best Practices',
      description: 'Seasonal landscaping maintenance procedures and best practices.',
      category: 'Best Practice',
      subcategory: 'Landscaping',
      content: `# Landscaping Maintenance Best Practices

## Seasonal Maintenance Calendar

### Spring (March - May)
- **Cleanup** winter debris and dead vegetation
- **Prune** trees and shrubs before new growth
- **Apply** pre-emergent herbicides
- **Fertilize** lawn areas
- **Plant** new flowers and shrubs
- **Inspect** irrigation systems

### Summer (June - August)
- **Water** regularly during dry periods
- **Mow** grass weekly at proper height
- **Deadhead** flowers to encourage blooming
- **Monitor** for pests and diseases
- **Trim** hedges and bushes
- **Maintain** irrigation systems

### Fall (September - November)
- **Rake** and remove fallen leaves
- **Aerate** lawn areas
- **Apply** winter fertilizer
- **Plant** spring bulbs
- **Winterize** irrigation systems
- **Prune** dormant trees

### Winter (December - February)
- **Protect** sensitive plants from frost
- **Remove** snow from plant branches
- **Plan** next year's landscaping projects
- **Service** equipment and tools
- **Order** seeds and plants for spring

## Lawn Care Standards

### Mowing Guidelines
- **Height**: Never cut more than 1/3 of grass blade
- **Frequency**: Weekly during growing season
- **Pattern**: Alternate mowing directions
- **Equipment**: Keep blades sharp and clean
- **Timing**: Avoid mowing wet grass

### Fertilization Program
- **Spring**: High nitrogen for growth
- **Summer**: Balanced fertilizer
- **Fall**: High potassium for winter prep
- **Organic**: Use organic options when possible

## Irrigation Management

### Watering Best Practices
- **Early morning** watering (6-10 AM)
- **Deep, infrequent** watering preferred
- **Adjust** for rainfall and season
- **Monitor** soil moisture levels
- **Check** sprinkler coverage regularly

### System Maintenance
- **Monthly**: Check all sprinkler heads
- **Quarterly**: Test system pressure
- **Seasonally**: Adjust timer settings
- **Annually**: Professional system inspection

## Pest and Disease Management

### Integrated Pest Management
1. **Monitor** regularly for problems
2. **Identify** pests and diseases accurately
3. **Use** least toxic methods first
4. **Apply** treatments only when necessary
5. **Evaluate** treatment effectiveness

### Common Issues
- **Grubs**: Apply beneficial nematodes
- **Weeds**: Use selective herbicides
- **Fungal diseases**: Improve air circulation
- **Aphids**: Encourage beneficial insects`,
      tags: ['landscaping', 'maintenance', 'seasonal', 'lawn', 'irrigation'],
      lastUpdated: '2024-01-10',
      author: 'Landscape Manager',
      version: '2.4',
      status: 'Active',
      priority: 'Medium',
      attachments: ['seasonal_calendar.pdf', 'plant_care_guide.pdf'],
      relatedItems: ['KB-010', 'KB-014'],
      viewCount: 167,
      rating: 4.6
    },
    {
      id: 'KB-010',
      title: 'Security System Operations',
      description: 'Operating procedures for access control, CCTV, and alarm systems.',
      category: 'SOP',
      subcategory: 'Security Operations',
      content: `# Security System Operations Manual

## Access Control System

### Daily Operations
- **Monitor** entry/exit logs
- **Check** door lock status
- **Verify** card reader function
- **Review** after-hours access
- **Update** access permissions as needed

### Adding New Users
1. **Verify** authorization from HR/Management
2. **Program** access card with appropriate permissions
3. **Test** card at all authorized doors
4. **Document** user in access control database
5. **Provide** user with security briefing

### Removing Access
1. **Immediately** deactivate card upon termination
2. **Collect** physical access cards
3. **Update** database records
4. **Generate** report of user's access history
5. **Notify** security team of deactivation

## CCTV System Management

### Daily Monitoring
- **Check** all camera feeds for clarity
- **Verify** recording function
- **Review** motion detection alerts
- **Clean** camera lenses if needed
- **Document** any system issues

### Video Storage
- **Retention**: 30 days minimum
- **Backup**: Weekly backup to secure storage
- **Access**: Authorized personnel only
- **Quality**: High resolution for identification
- **Privacy**: Comply with privacy regulations

## Alarm System Procedures

### Alarm Response
1. **Verify** alarm type and location
2. **Check** CCTV for visual confirmation
3. **Contact** appropriate response team
4. **Document** incident details
5. **Follow up** on resolution

### System Testing
- **Weekly**: Test all alarm zones
- **Monthly**: Test communication links
- **Quarterly**: Full system inspection
- **Annually**: Professional system review

## Emergency Procedures

### Lockdown Protocol
1. **Activate** lockdown from security console
2. **Secure** all entry points
3. **Notify** law enforcement
4. **Account** for all personnel
5. **Maintain** communication with authorities

### Power Outage
- **Verify** backup power activation
- **Check** critical system function
- **Monitor** battery levels
- **Prepare** for manual operations
- **Document** outage duration and impact

## Visitor Management

### Check-in Procedure
1. **Verify** visitor identity
2. **Check** appointment or authorization
3. **Issue** temporary access badge
4. **Escort** to destination if required
5. **Log** entry time and purpose

### Check-out Procedure
- **Collect** temporary badge
- **Log** exit time
- **Verify** visitor has left premises
- **Update** visitor log
- **Report** any incidents`,
      tags: ['security', 'access_control', 'cctv', 'alarms', 'procedures'],
      lastUpdated: '2024-01-08',
      author: 'Security Manager',
      version: '1.9',
      status: 'Active',
      priority: 'Critical',
      attachments: ['access_control_manual.pdf', 'emergency_procedures.pdf'],
      relatedItems: ['KB-003', 'KB-011'],
      viewCount: 198,
      rating: 4.8
    }
  ];

  const getCategoryIcon = (category: string) => {
    const icons = {
      'SOP': FileText,
      'Emergency Plan': AlertTriangle,
      'Best Practice': Star,
      'Training': Users,
      'Compliance': Shield,
      'Safety': Zap
    };
    return icons[category as keyof typeof icons] || Book;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'SOP': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Emergency Plan': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Best Practice': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Training': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Compliance': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Safety': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Critical': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const filteredItems = mockKnowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag && typeof tag === 'string' && tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const renderBrowse = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search knowledge base..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Categories</option>
            <option value="SOP">SOPs</option>
            <option value="Emergency Plan">Emergency Plans</option>
            <option value="Best Practice">Best Practices</option>
            <option value="Training">Training</option>
            <option value="Compliance">Compliance</option>
            <option value="Safety">Safety</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold">
          <Plus size={16} />
          <span>Add Document</span>
        </button>
      </div>

      {/* Knowledge Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => {
          const IconComponent = getCategoryIcon(item.category);
          return (
            <div key={item.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getCategoryColor(item.category)}`}>
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.subcategory}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                    #{tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs">
                    +{item.tags.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                  <span>v{item.version}</span>
                  <span>•</span>
                  <span>{item.viewCount} views</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400" size={12} />
                    <span>{item.rating}</span>
                  </div>
                </div>
                <span>Updated: {new Date(item.lastUpdated).toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">By: {item.author}</span>
                <div className="flex items-center space-x-2">
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors">
                    <Download size={14} className="inline mr-1" />
                    Export
                  </button>
                  <button
                    onClick={() => setSelectedItem(item.id)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    <Eye size={14} className="inline mr-1" />
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderItemDetail = () => {
    const item = mockKnowledgeItems.find(i => i.id === selectedItem);
    if (!item) return null;

    const IconComponent = getCategoryIcon(item.category);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedItem(null)}
            className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <Home size={20} />
            <span>Back to Knowledge Base</span>
          </button>
          <div className="flex items-center space-x-2">
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Edit size={16} className="inline mr-2" />
              Edit
            </button>
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Download size={16} className="inline mr-2" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Item Header */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center border ${getCategoryColor(item.category)}`}>
                <IconComponent size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">{item.title}</h2>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(item.category)}`}>
                {item.category}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                {item.priority}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-lg font-bold text-blue-400">v{item.version}</div>
              <div className="text-xs text-blue-300">Version</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-lg font-bold text-green-400">{item.viewCount}</div>
              <div className="text-xs text-green-300">Views</div>
            </div>
            <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="text-lg font-bold text-yellow-400">{item.rating}</div>
              <div className="text-xs text-yellow-300">Rating</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-lg font-bold text-purple-400">{item.status}</div>
              <div className="text-xs text-purple-300">Status</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
              {item.content}
            </div>
          </div>
        </div>

        {/* Attachments & Related Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {item.attachments.length > 0 && (
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
              <h3 className="text-lg font-semibold text-white mb-4">Attachments</h3>
              <div className="space-y-2">
                {item.attachments.map((attachment, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-700/20 rounded-lg">
                    <span className="text-white">{attachment}</span>
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition-colors">
                      <Download size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {item.relatedItems.length > 0 && (
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700/30">
              <h3 className="text-lg font-semibold text-white mb-4">Related Items</h3>
              <div className="space-y-2">
                {item.relatedItems.map((relatedId, index) => {
                  const relatedItem = mockKnowledgeItems.find(i => i.id === relatedId);
                  return relatedItem ? (
                    <div key={index} className="p-3 bg-gray-700/20 rounded-lg">
                      <div className="text-white font-medium">{relatedItem.title}</div>
                      <div className="text-gray-400 text-sm">{relatedItem.category}</div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="transform scale-75 origin-left">
              <Logo />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Knowledge Base Library</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">SOPs • Emergency Plans • Best Practices • Training Materials</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-slate-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 border-2 border-slate-800 hover:border-teal-500 hover:text-slate-900"
          >
            ← Back to Home
          </button>
        </div>
        <div className="mt-4 text-xs text-gray-400 bg-slate-900/50 p-2 rounded border border-gray-700/30">
          <strong className="text-teal-400">Knowledge Repository:</strong> Comprehensive library of standard operating procedures, emergency response plans, best practices, and training materials for facility management operations.
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Content */}
        {selectedItem ? renderItemDetail() : renderBrowse()}
      </div>
    </div>
  );
};

export default KnowledgeBaseLibrary;