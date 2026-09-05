## Color Visualizer Inspection

The visualizer currently renders the selected color as a single absolutely positioned rectangle clipped by a broad CSS polygon. The polygon reaches across the full top of each scene and uses approximate lower boundaries, so it can tint windows, wall-mounted objects, and other non-wall details. The underlying room photo already provides lighting and texture, but the overlay needs precise scene-specific SVG masks with excluded object cut-outs. The visualizer route is `/visualizer`, and the main preview is a 16:10 image stage.

Planned correction: keep the original image as the base, add a masked paint layer using inline SVG `<mask>` geometry for each scene, use `mix-blend-mode: multiply` with controlled opacity, and preserve the existing lighting filter on the base image only.
