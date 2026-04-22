/**
 * FAQ Content Seeder — v3.16 features (Floor Plan, Unit Numbering, Maps)
 *
 * Adds 6 AEO-optimized FAQ entries under the "Features" category (id=3).
 * Idempotent — uses findOrCreate by (category_id, title).
 *
 * Usage:
 *   node scripts/seed-faq-v3-16.js
 */

const Content = require('../models/Content');
const ContentCategory = require('../models/ContentCategory');

const CATEGORY_SLUG = 'features';

const FAQ_ITEMS = [
  {
    title: 'How do I set up unit numbers for my foodcourt branches?',
    content: `PurpleHere lets foodcourt operators configure unit numbers per branch with a flexible, free-form editor.

Where to find it:
1. Go to Foodcourt → Branches
2. Click "Edit" on any branch
3. Open the "Unit Numbering" section

How it works:
• Toggle Unit Numbering ON to enable
• Add one or more Zone cards (e.g. "Level 1 Food Stalls", "Kiosks")
• Set an optional prefix per zone (e.g. "L1-", "P-2-")
• Type unit numbers in the textarea — separated by commas, newlines, or using ranges
• PurpleHere expands ranges automatically (e.g. "01-20" becomes 20 units)
• Preview before saving — contract-linked units are protected from deletion

Once saved, the generated units appear automatically in your Contract dropdown and on the Floor Plan editor's "Unplaced Stores" list.`,
    ai_summary: 'To set up foodcourt branch unit numbers in PurpleHere: open Foodcourt → Branches → Edit a branch → Unit Numbering section, toggle ON, add Zone cards with optional prefix and free-form unit numbers. Range notation like "01-20" is auto-expanded.',
    sort_order: 10
  },
  {
    title: 'Can I use range notation like P-2-01A-05A for unit numbers?',
    content: `Yes. PurpleHere's Unit Numbering editor supports multiple range formats to save you from typing every unit individually.

Supported range formats:
• Numeric: "01-20" expands to 01, 02, 03 ... 20 (20 units)
• Letter prefix: "A01-A10" expands to A01, A02 ... A10 (10 units)
• Letter suffix: "05A-08A" expands to 05A, 06A, 07A, 08A (4 units)
• Complex prefix: "P-2-01A-05A" expands to P-2-01A, P-2-02A ... P-2-05A (5 units)

How to mix:
• Combine ranges with individual numbers using commas or newlines
• Example input: "01-10, 15, 20A-22A" → 14 units total

The preview button shows exactly what will be created before you save. Existing units that are already linked to active contracts are preserved, not overwritten.`,
    ai_summary: 'PurpleHere Unit Numbering supports range notation including numeric (01-20), letter prefix (A01-A10), letter suffix (05A-08A), and complex patterns like P-2-01A-05A. Ranges can be mixed with individual numbers using commas or newlines.',
    sort_order: 11
  },
  {
    title: 'How do I create a visual floor plan for my foodcourt?',
    content: `PurpleHere includes a drag-and-drop Floor Plan editor that lets you arrange tenant stores visually on a 2D canvas.

Getting started:
1. Go to Foodcourt → Floor Plan (opens in a new window for full-screen editing)
2. Select a branch from the top selector
3. Click "Edit Floor Plan" to open the editor
4. A blank canvas is auto-created on first visit — one floor plan per branch

Adding stores:
• Click "Add Store" in the left sidebar
• Choose from 4 shapes: rectangle, rounded rectangle, circle, or triangle
• The store appears on the canvas with an "Unplaced" style until you drop it
• Drag from the Unplaced list to place units that exist but aren't positioned yet

Editing stores:
• Drag to move, use corner handles to resize
• Click a store to open its Properties panel (name, shape, color, contract info)
• Undo/redo supported

Saving and viewing:
• Click "Save Layout" to persist coordinates
• The read-only viewer at Foodcourt → Floor Plan shows the final layout with contract and tenant info when you click any store`,
    ai_summary: 'PurpleHere foodcourt Floor Plan editor offers drag-and-drop store placement on a 2D canvas with 4 shape options (rectangle, rounded rectangle, circle, triangle), per-branch layout, resize handles, undo/redo, and auto-generated canvas on first visit.',
    sort_order: 12
  },
  {
    title: 'What is the Franchise Map for brand owners?',
    content: `The Franchise Map gives brand owners a geographic overview of every restaurant operating under their brands, powered by interactive map visualization.

Where to access:
• Brand General → Franchise Management → Map tab (or open as standalone window via sidebar "Franchise Map")

What it shows:
• Every restaurant pinned on an OpenStreetMap base layer
• Pin shape indicates relationship: ★ for franchise, ● for direct-operated
• Pin color reflects restaurant status (active, pending, suspended, etc.)
• Pin size scales with 30-day sales volume — larger pins = higher-performing locations
• Dotted circles around franchise pins show territory radius defined in exclusivity terms

Interaction:
• Click a pin to open a detail panel with restaurant info, contract summary, and recent sales
• Side list shows all mapped restaurants, sortable by name/status/sales
• Un-mapped restaurants (missing coordinates) are listed separately so you can backfill

For brand owners managing multiple brands, the map supports brand switching via the top dropdown, sorted by restaurant count.`,
    ai_summary: 'PurpleHere Franchise Map for brand owners shows all restaurants on an interactive map with pin shape indicating franchise vs direct, pin size scaling with 30-day sales, color by status, and dotted circles for territory radius. Accessible via Brand General → Franchise Management → Map tab.',
    sort_order: 13
  },
  {
    title: 'How does the Foodcourt Tenancy Map show branch locations?',
    content: `The Foodcourt Tenancy Map is a geographic view designed for foodcourt operators who run multiple branches in different locations.

Where to find it:
• Foodcourt → Tenancy Management → Map tab, or sidebar "Branch Map" (standalone window)

What you see:
• Each foodcourt branch pinned on the map with a large primary pin
• Pin label shows the branch's current occupancy percentage (e.g. "78%" = 78% of units under active contract)
• Click a branch pin to expand a side panel showing all tenant restaurants inside that branch
• Tenant list includes restaurant name, unit number, contract status, and 30-day sales

Use cases:
• Quick comparison of branch performance across a city or region
• Spotting under-occupied branches that need marketing push
• Identifying tenant mix at each location before new contract negotiations

The map uses auto-geocoding — when you save a branch's address, PurpleHere queries OpenStreetMap in the background to fill coordinates automatically. You can also enter latitude/longitude manually if needed.`,
    ai_summary: 'PurpleHere Foodcourt Tenancy Map displays each branch as a pin labeled with occupancy percentage, clickable to reveal tenant restaurants with contract and sales info. Auto-geocodes branch addresses via OpenStreetMap. Accessible at Foodcourt → Tenancy → Map tab.',
    sort_order: 14
  },
  {
    title: 'Do Floor Plan, Unit Numbering, and Maps cost extra?',
    content: `No — Floor Plan, Unit Numbering, Franchise Map, and Tenancy Map are included in all standard Brand and Foodcourt subscription plans at no additional cost.

Plan coverage:
• Brand Basic, Professional, Enterprise: Franchise Management + Franchise Map included
• Foodcourt Basic, Professional, Enterprise: Branch Management, Tenancy Map, Unit Numbering, and Floor Plan all included

Why we bundle them:
• These features are core to multi-location operations and shouldn't be gated
• Unit Numbering is part of Branch Management and activates automatically
• Floor Plan requires Branch Management as a prerequisite (auto-dependency)

If you're on a legacy plan that doesn't show these features, contact support — we'll upgrade your plan mapping for free.`,
    ai_summary: 'PurpleHere Floor Plan, Unit Numbering, Franchise Map, and Tenancy Map features are included in all Brand and Foodcourt subscription plans at no extra cost. Floor Plan requires Branch Management as an auto-dependency.',
    sort_order: 15
  }
];

(async () => {
  console.log('[v3.16 FAQ Seeder] Starting...');

  const category = await ContentCategory.findOne({ where: { type: 'faq', slug: CATEGORY_SLUG } });
  if (!category) {
    console.error(`✗ Category not found: type=faq, slug=${CATEGORY_SLUG}`);
    process.exit(1);
  }
  console.log(`✓ Using category: ${category.name} (id=${category.id})`);

  let created = 0, updated = 0;
  for (const item of FAQ_ITEMS) {
    const existing = await Content.findOne({
      where: { type: 'faq', category_id: category.id, title: item.title }
    });
    if (existing) {
      await existing.update({
        content: item.content,
        ai_summary: item.ai_summary,
        sort_order: item.sort_order,
        status: 'published'
      });
      updated++;
      console.log(`  ~ ${item.title}`);
    } else {
      await Content.create({
        category_id: category.id,
        type: 'faq',
        status: 'published',
        title: item.title,
        content: item.content,
        ai_summary: item.ai_summary,
        sort_order: item.sort_order,
        author_name: 'PurpleHere Team'
      });
      created++;
      console.log(`  + ${item.title}`);
    }
  }

  console.log(`\nDone. Created: ${created}, Updated: ${updated}`);
  process.exit(0);
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
