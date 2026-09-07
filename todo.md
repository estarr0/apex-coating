
## Homepage three-stage flow
- [x] Inspect the current homepage hero, introduction, and feature dashboard structure.
- [x] Implement a clear three-stage homepage flow with responsive navigation cards for Visualizer, Color Chart, Color Mixer, Products Catalog, and About.
- [x] Verify desktop and mobile navigation behavior and save a checkpoint.


## Color visualizer wall masking
- [x] Inspect the current scene rendering and wall-mask geometry.
- [x] Ensure selected colors apply only to wall surfaces with preserved texture, shadows, and highlights.
- [x] Verify representative scenes and save a checkpoint.


## Wall-mask coverage and cart simplification
- [x] Inspect the current SVG wall masks and cart fulfillment state/UI.
- [x] Extend wall masks with continuous coverage, overlap, and feathering; remove delivery and pickup logic from the cart.
- [x] Validate visualizer and cart flows and save a checkpoint.


## Full-coverage visualizer wall layer
- [x] Inspect the current scene-layer and foreground stacking architecture.
- [x] Refactor each scene to use a continuous full-coverage wall layer with multiply blending and natural foreground protection.
- [x] Validate representative scenes and save a checkpoint.


## Solid-color visualizer fill
- [x] Inspect the current visualizer color rendering and swatch state.
- [x] Remove blend modes, opacity, hue filters, and implement exact solid hex wall fills with a clean transition.
- [x] Validate shade selection and save a checkpoint.


## Standalone single-file HTML conversion
- [ ] Inspect current product, shade, pricing, cart, and mixer data needed for the standalone file.
- [ ] Author one executable index.html using Tailwind CDN and embedded vanilla JavaScript only.
- [ ] Run syntax and interaction checks, then package the single-file deliverable.


## Texstar Emulsion image replacement
- [x] Upload the user-provided Texstar Emulsion product photo to the web project asset store.
- [x] Update the Texstar Emulsion image mapping in the React catalog and regenerate the standalone `standalone/index.html`.
- [x] Verify the image reference, syntax, and rendered product card.
- [ ] Save a checkpoint for the updated website.

## Standalone catalog and solid-color visualizer update
- [x] Audit the current standalone product, contact, and visualizer logic.
- [x] Update email, hours, Serafric 3260 MM, Serafric Trade image, NC Wood Care naming, and remove the requested products.
- [x] Restore full solid hue/shade block visualizer behavior in the standalone file.
- [x] Regenerate and validate the complete single-file `index.html`.
- [ ] Save a checkpoint and deliver the updated standalone file.

## Remove Bituminous Black product
- [x] Locate every Bituminous Black product record and standalone occurrence.
- [x] Remove the product from the catalog source and regenerate the standalone index.html.
- [x] Verify the product is absent and save a published checkpoint.

## Contact and SVG wall visualizer update
- [x] Audit all standalone email, hours, and visualizer occurrences.
- [x] Update contact email to ccare@apexcoating.co.ke and hours to Monday–Friday, 7:30 AM–5:30 PM.
- [x] Replace the solid visualizer block with an SVG #wall-surface overlay using multiply blending and 0.72 opacity.
- [x] Validate shade-driven fill updates and deliver the complete standalone index.html.

## Nitrocellulose Wood Finish photo replacement
- [x] Locate the current Nitrocellulose Wood Finish product image mapping.
- [x] Upload `nc.jpeg` and apply it to the React catalog and standalone index.html.
- [x] Verify the replacement image renders and save a published checkpoint.
