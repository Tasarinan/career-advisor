# Missing Dependencies for Full Roadmap Visualization

## Required npm Packages

To enable full graph-based visualization with download functionality, you need to install the following packages:

### 1. ReactFlow
**Purpose**: Interactive graph visualization library for building node-based UIs

```bash
npm install reactflow
```

**Features provided**:
- Draggable nodes and edges
- Zoom and pan controls
- Minimap for navigation
- Custom node styling
- Auto-layout algorithms

### 2. html-to-image
**Purpose**: Convert DOM nodes to images for download functionality

```bash
npm install html-to-image
```

**Features provided**:
- Export roadmap as PNG image
- High-resolution output
- Browser-compatible

## Installation Command

Run both installations in one command:

```bash
npm install reactflow html-to-image
```

## Current Status

- ✅ **SearchInput**: Fully functional
- ✅ **LoadingAnimation**: Fully functional (10 stages)
- ✅ **API Endpoint**: Fully functional (OpenRouter integration)
- ✅ **Homepage**: Fully functional
- ⚠️ **RoadmapVisualizer**: Currently using simplified card layout (works without ReactFlow)
  - Will upgrade to graph visualization once ReactFlow is installed

## After Installation

Once packages are installed:

1. The build should complete without errors
2. RoadmapVisualizer can be upgraded to use ReactFlow
3. Download functionality will become available
4. Full graph-based visualization will be enabled

## Alternative: Keep Simplified Version

If you prefer not to install ReactFlow, the current card-based layout is fully functional and displays all roadmap information in an organized, hierarchical format:

- Primary skills (blue cards)
- Secondary skills (yellow cards)
- Tertiary skills (orange cards)

The simplified version:
- ✅ Works without additional dependencies
- ✅ Mobile-responsive
- ✅ Shows all roadmap data
- ✅ Animated hover effects
- ❌ No graph visualization
- ❌ No download feature

## Upgrade Path

To upgrade RoadmapVisualizer to use ReactFlow after installation:

1. Import ReactFlow components
2. Convert card layout to node/edge format
3. Implement auto-layout algorithm
4. Add download button with html-to-image
5. Configure ReactFlow controls (zoom, pan, minimap)

The structure is already designed to support this upgrade with minimal code changes.
