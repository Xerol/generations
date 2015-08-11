# Generations
Conway's Game of Life, in 3D, with time on the vertical axis.

## About
Generations started as a FreeBASIC project sometime around 2007 where I had the idea of doing Conway's Game of Life in 3D, except unlike other 3D interpretations, the actual CA itself would be 2D but the past generations (hence the name) would be visible as layers on the vertical axis. The old project page (not updated since 2009) can be viewed [here](http://xerol.org/generations/). Originally it was just intended as a neat visualizaton, but has potential as a tool for in-depth study of 2D cellular automata.

This version is intended to recreate the original, and add new features, in WebGL using three.js.

## Features
Currently this version is very barebones, as I get the various original features re-added and make additional optimizations for WebGL. The planned features are as follows:

* Arbitrary world sizes (up to a reasonable amount) with selectable edge rules (toroidal, etc.)
* Custom rule sets (birth/survival/death rules)
* Variable simulation speed, including "rewind"
* Pattern import/export in a variety of formats, including "templates" that can be plopped into the middle of an active simulation.
* Selectable color schemes that can be based upon things such as cell lifetime, position, or function (static, glider, etc.)
* Analysis tools such as "slicing" (being able to take a side-on view of any row or column) and tracking of glider/spaceship-type objects.
* Image export
* Shader-based hardware-accelerated processing (which will allow larger world sizes and time depths)

Some of these are easier, and I just need the time to get to them, and some are harder and may take a while or eventually be dropped.

## Roadmap
As of August 11, 2015, Generations is in version 0.20. The older FreeBASIC versions will not be continued and "stop" at 0.15, with the unreleased features of "0.25" incorporated in this roadmap.

**0.2x - Basic features / catching up with the old versions**
* Get simulation running in a shader
* Basic camera controls (similar to old versions)
* Basic UI, Menus (configuration, load/save state)
* Time controls

**0.3x - Customization**
* Allow different rulesets
* More configuration options (color schemes, etc.)
* Better controls

**0.4x - Getting down to business**
* Mouse-based cell control (ploppable templates, set/unset cells, etc.)
* Basic pattern import/export
* Alternative views (slicing, split screen)

**0.5x - Making it useful**
* Analysis tools (TBD, feedback appreciated)
* Object tracking
* Support for common file formats for import/export
* Image export/saving/sharing

**0.6x and beyond - Polish and cleanup**
* Variety of visual options from simple flat cubes ("classic") to custom shapes with effects.
* User-friendly UI
* Social features? Does anyone want these?

I will generally tackle each group as a single block of features between updates, but may push smaller single-note updates for larger features.

## Live Demo
You can view a live demo of the most recent stable version at http://xerol.org/generations/new/
