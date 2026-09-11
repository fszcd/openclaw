import { html, nothing, type TemplateResult } from "lit";
import { ref, type RefOrCallback } from "lit/directives/ref.js";
import "../styles/rail-header.css";
import "../styles/chat/startup-layout.css";
import "../styles/chat/composer-surface.css";

type ComposerContent = TemplateResult | typeof nothing;

type ChatComposerSurfaceInput = {
  offline?: boolean;
  dictating?: boolean;
  busy?: boolean;
  inputRef?: RefOrCallback;
  events?: {
    show: (event: Event) => void;
    afterShow: (event: Event) => void;
    dismissInvocations: () => void;
    click: (event: MouseEvent) => void;
    pointerDown: (event: PointerEvent) => void;
  };
  menus?: ComposerContent;
  lede?: ComposerContent;
  editor: ComposerContent;
  lead: ComposerContent;
  context?: ComposerContent;
  controls?: ComposerContent;
  actions: ComposerContent;
};

export function renderChatComposerSurface(props: {
  questionComposer?: boolean;
  overlay?: ComposerContent;
  beforeInput?: ComposerContent;
  afterInput?: ComposerContent;
  input?: ChatComposerSurfaceInput;
}) {
  const input = props.input;
  return html`
    <div
      class="agent-chat__composer-shell ${
        props.questionComposer ? "agent-chat__composer-shell--question-composer" : ""
      }"
    >
      <div class="agent-chat__composer-overlay">${props.overlay}</div>
      ${props.beforeInput}
      ${
        input
          ? html`
              <div
                class="agent-chat__input agent-chat__input--chat agent-chat__input--mobile-toolbar ${input.offline ? "agent-chat__input--offline" : ""}${input.dictating ? " agent-chat__input--dictating" : ""}"
                aria-busy=${input.busy ? "true" : "false"}
                @wa-show=${input.events?.show}
                @wa-after-show=${input.events?.afterShow}
                @openclaw-composer-dismiss-invocations=${input.events?.dismissInvocations}
                @click=${input.events?.click}
                @pointerdown=${input.events?.pointerDown}
                ${ref(input.inputRef)}
              >
                ${input.menus}
                <div class="agent-chat__composer-lede">${input.lede}</div>
                <div class="agent-chat__composer-input-row">
                  <div class="agent-chat__composer-combobox">${input.editor}</div>
                </div>
                <div class="agent-chat__composer-footer">
                  <div class="agent-chat__composer-lead agent-chat__composer-meta">
                    ${input.lead}
                  </div>
                  <div class="agent-chat__composer-trail">
                    <div class="agent-chat__composer-meta agent-chat__composer-context">
                      ${input.context}
                    </div>
                    ${input.controls !== nothing ? html` <div class="agent-chat__composer-controls">${input.controls}</div> ` : nothing}
                    <div class="agent-chat__composer-actions">${input.actions}</div>
                  </div>
                </div>
              </div>
            `
          : nothing
      }
      ${props.afterInput}
    </div>
  `;
}
