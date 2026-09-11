import { html, nothing, type TemplateResult } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { sidebarDock, sidebarMainPanel, isSidebarSlotVisible } from "./sidebar-layout-geometry.ts";
import type { SidebarLayout } from "./sidebar-layout-types.ts";

export function renderSidebarRegionFrame(params: {
  layout: SidebarLayout;
  collapsed: boolean;
  header?: TemplateResult | typeof nothing;
  primary: TemplateResult;
  controller?: TemplateResult | typeof nothing | null;
  runtime?: TemplateResult | typeof nothing | null;
}) {
  const column = params.layout.columns[0];
  const main = sidebarMainPanel(params.layout);
  const chatMain = !main || main.slot === "conversation";
  return html`<div
    class="sidebar-region ${params.collapsed ? "sidebar-region--narrow" : ""} ${
      params.layout.expanded ? "sidebar-region--expanded" : ""
    } ${params.layout.expanded && params.layout.expandedSide ? "sidebar-region--expanded-side" : ""} sidebar-region--${sidebarDock(params.layout)} ${params.layout.open === true ? "sidebar-region--open" : ""}"
    style=${styleMap({
      "--side-panel-width": `${column?.width ?? 480}px`,
      "--side-panel-height": `${column?.height ?? 360}px`,
    })}
  >
    <div class="sidebar-region__header">${params.header ?? nothing}</div>
    ${params.controller ?? nothing}
    <div
      class="sidebar-region__primary"
      data-region=${chatMain ? "main" : "side"}
      ?hidden=${!isSidebarSlotVisible(params.layout, "conversation")}
    >
      ${params.primary}
    </div>
    <div class="sidebar-region__right-runtime">${params.runtime ?? nothing}</div>
  </div>`;
}
